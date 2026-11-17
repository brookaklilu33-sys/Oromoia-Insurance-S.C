import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import {
  getAuth,
  Auth,
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth';
import {
  getFirestore,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  doc,
  getDocFromServer,
  Firestore
} from 'firebase/firestore';
import appletConfig from '../../firebase-applet-config.json';

export interface FirebaseClientConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  firestoreDatabaseId?: string;
  oAuthClientId?: string;
}

export const firebaseConfig: FirebaseClientConfig = {
  apiKey: appletConfig.apiKey,
  authDomain: appletConfig.authDomain,
  projectId: appletConfig.projectId,
  storageBucket: appletConfig.storageBucket,
  messagingSenderId: appletConfig.messagingSenderId,
  appId: appletConfig.appId,
  firestoreDatabaseId: appletConfig.firestoreDatabaseId,
  oAuthClientId: appletConfig.oAuthClientId
};

export const isFirebaseConfigured = (): boolean => {
  return Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);
};

export const firebaseApp: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth: Auth = getAuth(firebaseApp);
setPersistence(auth, browserLocalPersistence).catch(() => {
  // Persistence fallback handled by Firebase Auth
});

function createFirestoreInstance(): Firestore {
  const dbId = firebaseConfig.firestoreDatabaseId;
  try {
    return dbId
      ? initializeFirestore(
          firebaseApp,
          { localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }) },
          dbId
        )
      : initializeFirestore(firebaseApp, {
          localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() })
        });
  } catch {
    return dbId ? getFirestore(firebaseApp, dbId) : getFirestore(firebaseApp);
  }
}

export const db: Firestore = createFirestoreInstance();

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

let connectionTested = false;
async function testFirestoreConnection(): Promise<void> {
  if (connectionTested || typeof window === 'undefined' || !isFirebaseConfigured()) return;
  connectionTested = true;
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('Please check your Oromia Insurance Firebase configuration.');
    }
  }
}
void testFirestoreConnection();
