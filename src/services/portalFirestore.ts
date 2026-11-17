import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  setDoc,
  where
} from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { store } from './store';
import {
  CustomerProfile,
  InsuranceApplication,
  InsuranceClaim,
  InsurancePolicy,
  InsuranceProduct,
  PaymentAttempt,
  UserAccount
} from '../types/insurance';
import { startGlobalProgress, doneGlobalProgress } from '../components/TopProgressBar';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write'
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): void {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData.map((provider) => ({
          providerId: provider.providerId,
          displayName: provider.displayName,
          email: provider.email,
          photoUrl: provider.photoURL
        })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error:', JSON.stringify(errInfo));
}

export function calculateProductQuoteETB(
  product: InsuranceProduct,
  answers: Record<string, any>
): number {
  const cfg = product.quotationConfiguration;
  const baseMin = cfg?.standardMinimumPremiumETB || 2000;
  const taxRate = (cfg?.taxRatePercent ?? 15) / 100;
  const stampDuty = cfg?.stampDutyETB ?? 50;

  let declaredValue = 0;
  for (const [key, val] of Object.entries(answers || {})) {
    const num = Number(val);
    if (!Number.isFinite(num) || num <= 0) continue;
    const lowerKey = key.toLowerCase();
    if (
      lowerKey.includes('value') ||
      lowerKey.includes('sum') ||
      lowerKey.includes('insured') ||
      lowerKey.includes('capital') ||
      lowerKey.includes('amount')
    ) {
      declaredValue = Math.max(declaredValue, num);
    }
  }

  let rateFactor = 0.015;
  switch (product.productCategory) {
    case 'non_life':
      rateFactor = product.productId.includes('MOTOR')
        ? 0.025
        : product.productId.includes('FIRE')
          ? 0.0045
          : product.productId.includes('MAR')
            ? 0.0065
            : product.productId.includes('ENG')
              ? 0.008
              : 0.012;
      break;
    case 'life_health':
      rateFactor = 0.012;
      break;
    case 'agri_micro':
      rateFactor = 0.035;
      break;
    case 'halal_takaful':
      rateFactor = 0.018;
      break;
  }

  const rawPremium = declaredValue > 1000 ? Math.max(baseMin, Math.round(declaredValue * rateFactor)) : baseMin;
  const tax = Math.round(rawPremium * taxRate);
  return rawPremium + tax + stampDuty;
}

const WORKSPACE_SYNC_TTL_MS = 15_000;
const inFlightWorkspaceSync = new Map<string, Promise<void>>();
const lastWorkspaceSyncAt = new Map<string, number>();

export async function syncCustomerWorkspaceFromFirestore(uid: string, force = false): Promise<void> {
  if (!uid || !auth.currentUser) return;

  const existingSync = inFlightWorkspaceSync.get(uid);
  if (existingSync) {
    return existingSync;
  }

  const lastSynced = lastWorkspaceSyncAt.get(uid) || 0;
  if (!force && Date.now() - lastSynced < WORKSPACE_SYNC_TTL_MS) {
    return;
  }

  const syncTask = (async () => {
    try {
      const timeout = new Promise<void>((_, reject) =>
        setTimeout(() => reject(new Error('Workspace sync timeout')), 3000)
      );

      const fetchAll = (async () => {
        const [appsRes, policiesRes, paymentsRes, claimsRes] = await Promise.allSettled([
          getDocs(query(collection(db, 'applications'), where('customerId', '==', uid), limit(100))),
          getDocs(query(collection(db, 'policies'), where('customerId', '==', uid), limit(100))),
          getDocs(query(collection(db, 'paymentAttempts'), where('customerId', '==', uid), limit(100))),
          getDocs(query(collection(db, 'claims'), where('customerId', '==', uid), limit(100)))
        ]);

        const applications =
          appsRes.status === 'fulfilled'
            ? appsRes.value.docs.map((d) => d.data() as InsuranceApplication)
            : [];
        const policies =
          policiesRes.status === 'fulfilled'
            ? policiesRes.value.docs.map((d) => d.data() as InsurancePolicy)
            : [];
        const payments =
          paymentsRes.status === 'fulfilled'
            ? paymentsRes.value.docs.map((d) => d.data() as PaymentAttempt)
            : [];
        const claims =
          claimsRes.status === 'fulfilled'
            ? claimsRes.value.docs.map((d) => d.data() as InsuranceClaim)
            : [];

        store.mergeCustomerWorkspaceRecords({ applications, policies, payments, claims });
        lastWorkspaceSyncAt.set(uid, Date.now());
      })();

      await Promise.race([fetchAll, timeout]);
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, `workspace/${uid}`);
    }
  })();

  inFlightWorkspaceSync.set(uid, syncTask);
  try {
    await syncTask;
  } finally {
    inFlightWorkspaceSync.delete(uid);
  }
}

export async function persistApplicationToFirestore(app: InsuranceApplication): Promise<void> {
  if (!auth.currentUser) return;
  startGlobalProgress();
  try {
    await setDoc(doc(db, 'applications', app.applicationId), app, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `applications/${app.applicationId}`);
  } finally {
    doneGlobalProgress();
  }
}

export async function persistPaymentAndPolicyToFirestore(params: {
  attempt: PaymentAttempt;
  policy: InsurancePolicy;
  application?: InsuranceApplication;
}): Promise<void> {
  if (!auth.currentUser) return;
  startGlobalProgress();
  try {
    const verificationPayload = {
      verificationCode: params.policy.verificationCode,
      policyNumber: params.policy.policyNumber,
      productName: params.policy.productName,
      maskedInsuredName: params.policy.maskedInsuredName,
      insuredSubject: params.policy.insuredSubject,
      startDate: params.policy.startDate,
      expiryDate: params.policy.expiryDate,
      policyStatus: params.policy.policyStatus,
      totalPremiumETB: params.policy.totalPremiumETB,
      issuedAt: params.policy.issuedAt
    };

    const tasks: Promise<unknown>[] = [
      setDoc(doc(db, 'paymentAttempts', params.attempt.paymentAttemptId), params.attempt, { merge: true }),
      setDoc(doc(db, 'policies', params.policy.policyId), params.policy, { merge: true }),
      setDoc(
        doc(db, 'policyVerifications', params.policy.verificationCode.toUpperCase()),
        verificationPayload,
        { merge: true }
      )
    ];

    if (params.application) {
      tasks.push(
        setDoc(
          doc(db, 'applications', params.application.applicationId),
          {
            ...params.application,
            applicationStatus: 'approved',
            updatedAt: new Date().toISOString()
          },
          { merge: true }
        )
      );
    }

    await Promise.allSettled(tasks);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `policies/${params.policy.policyId}`);
  } finally {
    doneGlobalProgress();
  }
}

export async function persistClaimToFirestore(claim: InsuranceClaim): Promise<void> {
  if (!auth.currentUser) return;
  startGlobalProgress();
  try {
    await setDoc(doc(db, 'claims', claim.claimId), claim, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `claims/${claim.claimId}`);
  } finally {
    doneGlobalProgress();
  }
}

export async function lookupPublicPolicyVerification(code: string): Promise<InsurancePolicy | null> {
  const clean = code.trim().toUpperCase();
  if (!clean) return null;
  try {
    const snap = await getDoc(doc(db, 'policyVerifications', clean));
    if (!snap.exists()) return null;
    const data = snap.data() as Partial<InsurancePolicy>;
    return {
      policyId: data.policyId || clean,
      policyNumber: data.policyNumber || 'OIC-POL',
      verificationCode: data.verificationCode || clean,
      verificationCodeHash: 'verified',
      customerId: '',
      customerName: data.maskedInsuredName || 'Protected Policyholder',
      customerPhone: '',
      maskedInsuredName: data.maskedInsuredName || 'Protected Policyholder',
      productId: data.productId || '',
      productName: data.productName || 'Oromia Insurance Policy',
      productVersion: 1,
      applicationId: '',
      quotationId: '',
      paymentReference: '',
      insuredSubject: data.insuredSubject || 'Covered Risk Schedule',
      coverageSummary: [],
      exclusionsSummary: [],
      totalPremiumETB: data.totalPremiumETB || 0,
      currency: 'ETB',
      startDate: data.startDate || '',
      expiryDate: data.expiryDate || '',
      policyStatus: (data.policyStatus as InsurancePolicy['policyStatus']) || 'active',
      policyDocumentId: '',
      preparedBy: 'OIC Underwriting',
      reviewedBy: 'OIC Underwriting',
      approvedBy: 'OIC Directorate',
      digitalSignatureRef: 'OIC-SHA256-VERIFIED',
      issuedAt: data.issuedAt || new Date().toISOString(),
      createdAt: data.issuedAt || new Date().toISOString(),
      updatedAt: data.issuedAt || new Date().toISOString()
    };
  } catch {
    return null;
  }
}

export async function updateCustomerProfileInFirestore(
  uid: string,
  updates: {
    firstName: string;
    lastName: string;
    phone: string;
    city: string;
    subcity: string;
    preferredLanguage: 'amharic' | 'english' | 'oromo' | 'tigrinya';
  }
): Promise<UserAccount | null> {
  const currentUser = store.getCurrentUser();
  if (!currentUser || currentUser.uid !== uid) return null;

  startGlobalProgress();
  const now = new Date().toISOString();
  const fullName = `${updates.firstName.trim()} ${updates.lastName.trim()}`.trim() || currentUser.displayName || 'OIC Customer';

  const updatedUser: UserAccount = {
    ...currentUser,
    firstName: updates.firstName.trim(),
    lastName: updates.lastName.trim(),
    displayName: fullName,
    phone: updates.phone.trim(),
    updatedAt: now
  };

  try {
    await setDoc(
      doc(db, 'users', uid),
      {
        uid,
        accountType: currentUser.accountType || 'customer',
        accountStatus: currentUser.accountStatus || 'active',
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        displayName: updatedUser.displayName,
        phone: updatedUser.phone,
        updatedAt: now
      },
      { merge: true }
    );

    const existingCust = store.getCustomers().find((c) => c.authUid === uid);
    const updatedCustomer: CustomerProfile = {
      customerId: uid,
      authUid: uid,
      customerNumber: existingCust?.customerNumber || `OIC-CUST-${new Date().getFullYear()}-${uid.slice(0, 4).toUpperCase()}`,
      customerType: existingCust?.customerType || 'individual',
      personalInformation: {
        ...(existingCust?.personalInformation || { idType: 'national_id', idNumberMasked: 'PENDING-KYC' }),
        fullName
      },
      contactInformation: {
        primaryPhone: updatedUser.phone,
        email: currentUser.email,
        preferredLanguage: updates.preferredLanguage
      },
      address: {
        city: updates.city.trim() || 'Addis Ababa',
        subcityOrZone: updates.subcity.trim() || 'Bole',
        region: updates.city === 'Addis Ababa' ? 'Addis Ababa' : 'Ethiopia'
      },
      identityVerificationStatus: existingCust?.identityVerificationStatus || 'unverified',
      accountStatus: 'active',
      registrationChannel: 'self_service',
      createdAt: existingCust?.createdAt || now,
      updatedAt: now
    };

    await setDoc(doc(db, 'customers', uid), updatedCustomer, { merge: true });
    store.saveCustomer(updatedCustomer);
    store.setCurrentUser(updatedUser);
    return updatedUser;
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `users/${uid}`);
    store.setCurrentUser(updatedUser);
    return updatedUser;
  } finally {
    doneGlobalProgress();
  }
}
