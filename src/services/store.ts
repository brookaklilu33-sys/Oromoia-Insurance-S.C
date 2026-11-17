import {
  InsuranceProduct,
  Branch,
  Department,
  OperatorProfile,
  StaffProfile,
  AgentProfile,
  BrokerProfile,
  CustomerProfile,
  InsurancePolicy,
  InsuranceApplication,
  TrainingCourse,
  TrainingProgress,
  EmailTemplate,
  EmailJob,
  AuditLogEntry,
  PaymentAttempt,
  PolicyVerificationLog,
  UserRole,
  UserAccount,
  NewsletterSubscriber,
  AdminUploadedDocument,
  InsuranceClaim,
  BusinessReport,
  NewsArticle,
  SiteCmsConfig
} from '../types/insurance';
import {
  SEED_BRANCHES,
  SEED_DEPARTMENTS,
  SEED_PRODUCTS,
  SEED_CUSTOMERS,
  SEED_OPERATORS,
  SEED_STAFF,
  SEED_AGENTS,
  SEED_BROKERS,
  SEED_POLICIES,
  SEED_APPLICATIONS,
  SEED_TRAINING_COURSES,
  SEED_EMAIL_TEMPLATES,
  SEED_AUDIT_LOGS,
  SEED_ADMIN_DOCUMENTS,
  SEED_CLAIMS,
  SEED_PAYMENTS,
  SEED_REPORTS,
  SEED_SUBSCRIBERS,
  SEED_NEWS,
  SEED_CMS_CONFIG
} from '../data/seedData';

const STORAGE_KEYS = {
  CURRENT_USER: 'oic_current_user',
  PRODUCTS: 'oic_products',
  BRANCHES: 'oic_branches',
  DEPARTMENTS: 'oic_departments',
  CUSTOMERS: 'oic_customers',
  OPERATORS: 'oic_operators',
  STAFF: 'oic_staff',
  AGENTS: 'oic_agents',
  BROKERS: 'oic_brokers',
  APPLICATIONS: 'oic_applications',
  POLICIES: 'oic_policies',
  DOCUMENTS: 'oic_documents',
  ADMIN_DOCUMENTS: 'oic_admin_documents',
  QUOTATIONS: 'oic_quotations',
  PAYMENTS: 'oic_payments',
  VERIFICATION_LOGS: 'oic_verification_logs',
  EMAIL_TEMPLATES: 'oic_email_templates',
  EMAIL_JOBS: 'oic_email_jobs',
  TRAINING_COURSES: 'oic_training_courses',
  TRAINING_PROGRESS: 'oic_training_progress',
  AUDIT_LOGS: 'oic_audit_logs',
  SETTINGS: 'oic_settings',
  CMS_CONFIG: 'oic_cms_config',
  NEWS: 'oic_news',
  SUBSCRIBERS: 'oic_subscribers',
  CLAIMS: 'oic_claims',
  REPORTS: 'oic_reports'
};

const memoryFallback = new Map<string, string>();
const safeStorage = {
  getItem(key: string): string | null {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.getItem(key);
      }
    } catch {
      // Fallback for private browsing
    }
    return memoryFallback.get(key) ?? null;
  },
  setItem(key: string, value: string): void {
    memoryFallback.set(key, value);
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, value);
      }
    } catch {
      // Ignore quota errors
    }
  },
  removeItem(key: string): void {
    memoryFallback.delete(key);
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(key);
      }
    } catch {
      // Ignore security errors
    }
  }
};

export const ADMIN_PRIVILEGED_ROLES: UserRole[] = [
  'super_admin',
  'admin',
  'executive',
  'department_manager',
  'branch_manager',
  'operator',
  'finance',
  'marketing'
];

export const EMPLOYEE_ONBOARDING_ROLES: UserRole[] = ['super_admin', 'admin'];

class OICStore {
  private listeners: Set<() => void> = new Set();
  private cache: Map<string, unknown> = new Map();

  constructor() {
    this.purgeLegacyAicKeys();
  }

  private purgeLegacyAicKeys() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const legacyKeys: string[] = [];
        for (let i = 0; i < window.localStorage.length; i++) {
          const k = window.localStorage.key(i);
          if (k && k.startsWith('aic_')) {
            legacyKeys.push(k);
          }
        }
        legacyKeys.forEach((k) => window.localStorage.removeItem(k));
      }
    } catch {
      // Ignore storage access errors
    }
  }

  private readCached<T>(key: string, fallback: T): T {
    if (this.cache.has(key)) {
      return this.cache.get(key) as T;
    }
    const raw = safeStorage.getItem(key);
    if (!raw) {
      this.cache.set(key, fallback);
      return fallback;
    }
    try {
      const parsed = JSON.parse(raw) as T;
      this.cache.set(key, parsed);
      return parsed;
    } catch {
      this.cache.set(key, fallback);
      return fallback;
    }
  }

  private writeCached<T>(key: string, value: T): void {
    this.cache.set(key, value);
    safeStorage.setItem(key, JSON.stringify(value));
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((fn) => fn());
  }

  // --- CURRENT USER & AUTH ---
  public getCurrentUser(): UserAccount | null {
    if (this.cache.has(STORAGE_KEYS.CURRENT_USER)) {
      return (this.cache.get(STORAGE_KEYS.CURRENT_USER) as UserAccount | null) ?? null;
    }
    const raw = safeStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (!raw) {
      this.cache.set(STORAGE_KEYS.CURRENT_USER, null);
      return null;
    }
    try {
      const parsed = JSON.parse(raw) as UserAccount;
      this.cache.set(STORAGE_KEYS.CURRENT_USER, parsed);
      return parsed;
    } catch {
      safeStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
      this.cache.set(STORAGE_KEYS.CURRENT_USER, null);
      return null;
    }
  }

  public setCurrentUser(user: UserAccount | null) {
    if (user) {
      this.writeCached(STORAGE_KEYS.CURRENT_USER, user);
    } else {
      this.cache.set(STORAGE_KEYS.CURRENT_USER, null);
      safeStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
    this.notify();
  }

  public switchRole(role: UserRole) {
    const roleProfiles: Record<UserRole, { first: string; last: string; email: string; dept?: string }> = {
      super_admin: { first: 'OIC', last: 'Super Administrator', email: 'superadmin@oromiainsurance.com', dept: 'DEPT-HQ-01' },
      admin: { first: 'OIC', last: 'System Administrator', email: 'admin@oromiainsurance.com', dept: 'DEPT-HQ-01' },
      executive: { first: 'OIC', last: 'Executive Oversight', email: 'executive@oromiainsurance.com', dept: 'DEPT-HQ-01' },
      department_manager: { first: 'OIC', last: 'Department Manager', email: 'dept.manager@oromiainsurance.com', dept: 'DEPT-HQ-05' },
      branch_manager: { first: 'OIC', last: 'Branch Manager', email: 'branch.manager@oromiainsurance.com' },
      underwriter: { first: 'OIC', last: 'Underwriting Officer', email: 'underwriting@oromiainsurance.com', dept: 'DEPT-HQ-05' },
      claims_officer: { first: 'OIC', last: 'Claims Officer', email: 'claims@oromiainsurance.com', dept: 'DEPT-HQ-19' },
      finance: { first: 'OIC', last: 'Finance Officer', email: 'finance@oromiainsurance.com', dept: 'DEPT-HQ-11' },
      marketing: { first: 'OIC', last: 'Marketing Officer', email: 'marketing@oromiainsurance.com', dept: 'DEPT-HQ-08' },
      operator: { first: 'OIC', last: 'Direct-Sales Operator', email: 'operator@oromiainsurance.com' },
      agent: { first: 'OIC', last: 'Licensed Agent', email: 'agent@oromiainsurance.com' },
      broker: { first: 'OIC', last: 'Partner Broker', email: 'broker@oromiainsurance.com' },
      staff: { first: 'OIC', last: 'Operations Staff', email: 'staff@oromiainsurance.com' },
      customer: { first: 'OIC', last: 'Policyholder', email: 'customer@oromiainsurance.com' }
    };
    const p = roleProfiles[role] || roleProfiles.customer;
    const now = new Date().toISOString();
    const mockUser: UserAccount = {
      uid: `usr-${role}-preview`,
      accountType: role,
      displayName: `${p.first} ${p.last}`,
      firstName: p.first,
      lastName: p.last,
      email: p.email,
      emailVerified: true,
      phone: '+251-115-572121',
      phoneVerified: true,
      branchId: 'BR-OIC-HQ',
      departmentId: p.dept,
      operatorId: role === 'operator' ? 'OP-PREVIEW' : undefined,
      accountStatus: 'active',
      onboardingStatus: 'complete',
      registrationChannel: role === 'customer' ? 'self_service' : 'branch_walkin',
      createdAt: now,
      updatedAt: now
    };
    this.setCurrentUser(mockUser);
    this.logAudit({
      actorUid: mockUser.uid,
      actorName: `${mockUser.firstName} ${mockUser.lastName}`,
      actorRole: mockUser.accountType,
      action: 'USER_ROLE_SWITCH',
      resourceType: 'user',
      resourceId: mockUser.uid,
      reason: `Switched active workspace view to ${role}`,
      correlationId: `AUTH-${Date.now()}`
    });
  }

  // --- CMS & NEWS ---
  public getCmsConfig(): SiteCmsConfig {
    return this.readCached<SiteCmsConfig>(STORAGE_KEYS.CMS_CONFIG, SEED_CMS_CONFIG);
  }

  public saveCmsConfig(cfg: SiteCmsConfig): void {
    const updated = { ...cfg, updatedAt: new Date().toISOString() };
    this.writeCached(STORAGE_KEYS.CMS_CONFIG, updated);
    this.notify();
  }

  public getNews(): NewsArticle[] {
    return this.readCached<NewsArticle[]>(STORAGE_KEYS.NEWS, SEED_NEWS);
  }

  public saveNewsArticle(article: NewsArticle): void {
    const list = [...this.getNews()];
    const idx = list.findIndex((n) => n.id === article.id);
    const updated = { ...article, updatedAt: new Date().toISOString() };
    let next: NewsArticle[];
    if (idx >= 0) {
      list[idx] = updated;
      next = list;
    } else {
      next = [updated, ...list];
    }
    if (updated.isFeatured) {
      next = next.map((item) => (item.id === updated.id ? item : { ...item, isFeatured: false }));
    }
    this.writeCached(STORAGE_KEYS.NEWS, next);
    this.notify();
  }

  public deleteNewsArticle(articleId: string): void {
    const next = this.getNews().filter((n) => n.id !== articleId);
    this.writeCached(STORAGE_KEYS.NEWS, next);
    this.notify();
  }

  public setFeaturedNewsArticle(articleId: string): void {
    const next = this.getNews().map((n) => ({ ...n, isFeatured: n.id === articleId }));
    this.writeCached(STORAGE_KEYS.NEWS, next);
    this.notify();
  }

  // --- PRODUCTS ---
  public getProducts(): InsuranceProduct[] {
    return this.readCached<InsuranceProduct[]>(STORAGE_KEYS.PRODUCTS, SEED_PRODUCTS);
  }

  public getPublishedProducts(): InsuranceProduct[] {
    return this.getProducts().filter((p) => p.publicStatus === 'published');
  }

  public getProductBySlug(slug: string): InsuranceProduct | undefined {
    return this.getProducts().find((p) => p.slug === slug);
  }

  public getProductById(id: string): InsuranceProduct | undefined {
    return this.getProducts().find((p) => p.productId === id);
  }

  public saveProduct(product: InsuranceProduct): void {
    const products = [...this.getProducts()];
    const idx = products.findIndex((p) => p.productId === product.productId);
    const updated = { ...product, updatedAt: new Date().toISOString() };
    if (idx >= 0) {
      products[idx] = updated;
    } else {
      products.push(updated);
    }
    this.writeCached(STORAGE_KEYS.PRODUCTS, products);
    this.logAudit({
      actorUid: this.getCurrentUser()?.uid || 'SYSTEM',
      actorName: this.getCurrentUser()?.firstName || 'System',
      actorRole: this.getCurrentUser()?.accountType || 'super_admin',
      action: idx >= 0 ? 'PRODUCT_UPDATED' : 'PRODUCT_CREATED',
      resourceType: 'product',
      resourceId: product.productId,
      reason: `Saved product "${product.productName}" (Status: ${product.publicStatus})`,
      correlationId: `PRD-${Date.now()}`
    });
    this.notify();
  }

  public archiveProduct(productId: string): void {
    const products = this.getProducts().map((item) =>
      item.productId === productId
        ? {
            ...item,
            publicStatus: 'archived' as const,
            archivedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        : item
    );
    if (products.some((item) => item.productId === productId)) {
      this.writeCached(STORAGE_KEYS.PRODUCTS, products);
      this.logAudit({
        actorUid: this.getCurrentUser()?.uid || 'SYSTEM',
        actorName: this.getCurrentUser()?.firstName || 'System',
        actorRole: this.getCurrentUser()?.accountType || 'super_admin',
        action: 'PRODUCT_ARCHIVED',
        resourceType: 'product',
        resourceId: productId,
        reason: 'Product archived. Historical references preserved.',
        correlationId: `PRD-ARCH-${Date.now()}`
      });
      this.notify();
    }
  }

  // --- OFFICIAL DOCUMENTS ---
  public getAdminDocuments(): AdminUploadedDocument[] {
    return this.readCached<AdminUploadedDocument[]>(STORAGE_KEYS.ADMIN_DOCUMENTS, SEED_ADMIN_DOCUMENTS);
  }

  public getDocumentsForProduct(productId: string): AdminUploadedDocument[] {
    const all = this.getAdminDocuments();
    return all.filter((d) => d.productId === productId || d.productId === 'all');
  }

  public saveAdminDocument(doc: AdminUploadedDocument): void {
    const docs = [...this.getAdminDocuments()];
    const idx = docs.findIndex((d) => d.id === doc.id);
    if (idx >= 0) {
      docs[idx] = doc;
    } else {
      docs.unshift(doc);
    }
    this.writeCached(STORAGE_KEYS.ADMIN_DOCUMENTS, docs);
    this.logAudit({
      actorUid: this.getCurrentUser()?.uid || 'SYSTEM',
      actorName: this.getCurrentUser()?.firstName || 'System',
      actorRole: this.getCurrentUser()?.accountType || 'super_admin',
      action: idx >= 0 ? 'DOCUMENT_UPDATED' : 'DOCUMENT_UPLOADED',
      resourceType: 'document',
      resourceId: doc.id,
      reason: `Saved official document "${doc.title}" (Category: ${doc.category})`,
      correlationId: `DOC-${Date.now()}`
    });
    this.notify();
  }

  public deleteAdminDocument(docId: string): void {
    const docs = this.getAdminDocuments();
    const filtered = docs.filter((d) => d.id !== docId);
    this.writeCached(STORAGE_KEYS.ADMIN_DOCUMENTS, filtered);
    this.logAudit({
      actorUid: this.getCurrentUser()?.uid || 'SYSTEM',
      actorName: this.getCurrentUser()?.firstName || 'System',
      actorRole: this.getCurrentUser()?.accountType || 'super_admin',
      action: 'DOCUMENT_DELETED',
      resourceType: 'document',
      resourceId: docId,
      reason: `Deleted official document reference ${docId}`,
      correlationId: `DOC-DEL-${Date.now()}`
    });
    this.notify();
  }

  // --- CUSTOMERS ---
  public getCustomers(): CustomerProfile[] {
    return this.readCached<CustomerProfile[]>(STORAGE_KEYS.CUSTOMERS, SEED_CUSTOMERS);
  }

  public getCustomerById(id: string): CustomerProfile | undefined {
    return this.getCustomers().find((c) => c.customerId === id || c.authUid === id);
  }

  public saveCustomer(customer: CustomerProfile): void {
    const list = [...this.getCustomers()];
    const idx = list.findIndex((c) => c.customerId === customer.customerId);
    const updated = { ...customer, updatedAt: new Date().toISOString() };
    if (idx >= 0) {
      list[idx] = updated;
    } else {
      list.unshift(updated);
    }
    this.writeCached(STORAGE_KEYS.CUSTOMERS, list);
    this.notify();
  }

  // --- DEPARTMENTS, BRANCHES, OPERATORS, STAFF, AGENTS & BROKERS ---
  public getDepartments(): Department[] {
    return this.readCached<Department[]>(STORAGE_KEYS.DEPARTMENTS, SEED_DEPARTMENTS);
  }

  public saveDepartment(dept: Department): void {
    const list = [...this.getDepartments()];
    const idx = list.findIndex((d) => d.departmentId === dept.departmentId);
    if (idx >= 0) {
      list[idx] = dept;
    } else {
      list.push(dept);
    }
    this.writeCached(STORAGE_KEYS.DEPARTMENTS, list);
    this.logAudit({
      actorUid: this.getCurrentUser()?.uid || 'SYSTEM',
      actorName: this.getCurrentUser()?.displayName || 'Admin',
      actorRole: this.getCurrentUser()?.accountType || 'super_admin',
      action: 'DEPARTMENT_UPDATED',
      resourceType: 'department',
      resourceId: dept.departmentId,
      reason: `Updated department ${dept.name}`,
      correlationId: `DEPT-${Date.now()}`
    });
    this.notify();
  }

  public getBranches(): Branch[] {
    return this.readCached<Branch[]>(STORAGE_KEYS.BRANCHES, SEED_BRANCHES);
  }

  public saveBranch(branch: Branch): void {
    const list = [...this.getBranches()];
    const idx = list.findIndex((b) => b.branchId === branch.branchId);
    if (idx >= 0) {
      list[idx] = branch;
    } else {
      list.unshift(branch);
    }
    this.writeCached(STORAGE_KEYS.BRANCHES, list);
    this.logAudit({
      actorUid: this.getCurrentUser()?.uid || 'SYSTEM',
      actorName: this.getCurrentUser()?.displayName || 'Admin',
      actorRole: this.getCurrentUser()?.accountType || 'super_admin',
      action: idx >= 0 ? 'BRANCH_UPDATED' : 'BRANCH_CREATED',
      resourceType: 'branch',
      resourceId: branch.branchId,
      reason: `Saved branch ${branch.name}`,
      correlationId: `BR-${Date.now()}`
    });
    this.notify();
  }

  public getOperators(): OperatorProfile[] {
    return this.readCached<OperatorProfile[]>(STORAGE_KEYS.OPERATORS, SEED_OPERATORS);
  }

  public getStaff(): StaffProfile[] {
    return this.readCached<StaffProfile[]>(STORAGE_KEYS.STAFF, SEED_STAFF);
  }

  public getAgents(): AgentProfile[] {
    return this.readCached<AgentProfile[]>(STORAGE_KEYS.AGENTS, SEED_AGENTS);
  }

  public saveAgent(agent: AgentProfile): void {
    const list = [...this.getAgents()];
    const idx = list.findIndex((a) => a.agentId === agent.agentId);
    const updated = { ...agent, updatedAt: new Date().toISOString() };
    if (idx >= 0) {
      list[idx] = updated;
    } else {
      list.unshift(updated);
    }
    this.writeCached(STORAGE_KEYS.AGENTS, list);
    this.notify();
  }

  public getBrokers(): BrokerProfile[] {
    return this.readCached<BrokerProfile[]>(STORAGE_KEYS.BROKERS, SEED_BROKERS);
  }

  public saveBroker(broker: BrokerProfile): void {
    const list = [...this.getBrokers()];
    const idx = list.findIndex((b) => b.brokerId === broker.brokerId);
    const updated = { ...broker, updatedAt: new Date().toISOString() };
    if (idx >= 0) {
      list[idx] = updated;
    } else {
      list.unshift(updated);
    }
    this.writeCached(STORAGE_KEYS.BROKERS, list);
    this.notify();
  }

  public saveOperator(op: OperatorProfile): void {
    const actor = this.getCurrentUser();
    if (actor && !EMPLOYEE_ONBOARDING_ROLES.includes(actor.accountType)) return;
    const list = [...this.getOperators()];
    const idx = list.findIndex((item) => item.operatorId === op.operatorId);
    if (idx >= 0) {
      list[idx] = { ...op, updatedAt: new Date().toISOString() };
    } else {
      list.push({ ...op, updatedAt: new Date().toISOString() });
    }
    this.writeCached(STORAGE_KEYS.OPERATORS, list);
    this.notify();
  }

  public recordOperatorActivity(operatorId: string, metric: 'customer' | 'application' | 'certified'): void {
    const list = this.getOperators().map((item) => {
      if (item.operatorId !== operatorId) return item;
      const summary = { ...item.performanceSummary };
      if (metric === 'customer') {
        summary.totalAssistedOnboarded += 1;
      } else if (metric === 'application') {
        summary.totalApplicationsSubmitted += 1;
      }
      return {
        ...item,
        performanceSummary: summary,
        trainingStatus: metric === 'certified' ? ('certified' as const) : item.trainingStatus,
        updatedAt: new Date().toISOString()
      };
    });
    this.writeCached(STORAGE_KEYS.OPERATORS, list);
    this.notify();
  }

  public onboardEmployee(params: {
    name: string;
    email: string;
    phone: string;
    role: UserRole;
    branchId: string;
    departmentId?: string;
  }): { success: boolean; message: string } {
    const actor = this.getCurrentUser();
    if (!actor || !EMPLOYEE_ONBOARDING_ROLES.includes(actor.accountType)) {
      return {
        success: false,
        message: 'Permission denied: Only Super Administrators / Admins can onboard employees.'
      };
    }

    const now = new Date().toISOString();
    const cleanName = params.name.trim();
    const cleanEmail = params.email.trim().toLowerCase();
    const cleanPhone = params.phone.trim();

    if (!cleanName || !cleanEmail || !cleanPhone) {
      return { success: false, message: 'Name, email, and phone number are required.' };
    }

    if (params.role === 'operator') {
      const operators = [...this.getOperators()];
      if (operators.some((o) => o.email.toLowerCase() === cleanEmail)) {
        return { success: false, message: 'An operator with this email already exists.' };
      }
      const nextNum = operators.length + 1;
      const newOp: OperatorProfile = {
        operatorId: `OIC-OP-${String(nextNum).padStart(3, '0')}`,
        authUid: `usr-op-${Date.now().toString().slice(-4)}`,
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        branchId: params.branchId || 'BR-OIC-HQ',
        departmentId: params.departmentId,
        supervisorId: actor.uid,
        assignedProducts: ['PRD-NL-MOTOR', 'PRD-NL-FIRE', 'PRD-LH-TERM', 'PRD-AG-CROP', 'PRD-TK-PROP'],
        accountStatus: 'active',
        trainingStatus: 'not_started',
        performanceSummary: {
          totalAssistedOnboarded: 0,
          totalApplicationsSubmitted: 0,
          totalPoliciesIssued: 0,
          complianceScorePct: 100
        },
        createdAt: now,
        updatedAt: now
      };
      operators.unshift(newOp);
      this.writeCached(STORAGE_KEYS.OPERATORS, operators);
      this.logAudit({
        actorUid: actor.uid,
        actorName: `${actor.firstName} ${actor.lastName}`,
        actorRole: actor.accountType,
        action: 'EMPLOYEE_ONBOARDED',
        resourceType: 'user',
        resourceId: newOp.operatorId,
        reason: `Onboarded new Direct-Sales Operator: ${newOp.name} (${newOp.branchId})`,
        correlationId: `EMP-OP-${Date.now()}`
      });
      this.notify();
      return { success: true, message: `Operator ${newOp.name} (${newOp.operatorId}) onboarded.` };
    }

    const staffList = [...this.getStaff()];
    if (staffList.some((s) => s.email.toLowerCase() === cleanEmail)) {
      return { success: false, message: 'An employee with this email already exists.' };
    }
    const prefix =
      params.role === 'finance'
        ? 'FIN'
        : params.role === 'claims_officer'
          ? 'CLM'
          : params.role === 'marketing'
            ? 'MKT'
            : params.role === 'branch_manager'
              ? 'BM'
              : params.role === 'department_manager'
                ? 'DM'
                : params.role === 'executive'
                  ? 'EXEC'
                  : 'UW';
    const staffId = `OIC-STF-${prefix}-${String(staffList.length + 1).padStart(2, '0')}`;
    const deptMap: Record<string, StaffProfile['department']> = {
      finance: 'finance',
      claims_officer: 'claims',
      marketing: 'marketing',
      executive: 'executive',
      underwriter: 'underwriting'
    };
    const newStaff: StaffProfile = {
      staffId,
      authUid: `usr-${prefix.toLowerCase()}-${Date.now().toString().slice(-4)}`,
      name: cleanName,
      email: cleanEmail,
      role: params.role,
      department: deptMap[params.role] || 'operations',
      departmentId: params.departmentId,
      branchId: params.branchId || 'BR-OIC-HQ',
      permissions:
        params.role === 'finance'
          ? ['view_payments', 'filter_transactions', 'export_financial_data', 'view_policies_readonly']
          : params.role === 'claims_officer'
            ? ['review_claims', 'assign_surveyor', 'recommend_settlement']
            : ['review_application', 'prepare_quotation', 'approve_underwriting', 'issue_policy'],
      accountStatus: 'active',
      supervisorId: actor.uid,
      createdAt: now,
      updatedAt: now
    };
    staffList.unshift(newStaff);
    this.writeCached(STORAGE_KEYS.STAFF, staffList);
    this.logAudit({
      actorUid: actor.uid,
      actorName: `${actor.firstName} ${actor.lastName}`,
      actorRole: actor.accountType,
      action: 'EMPLOYEE_ONBOARDED',
      resourceType: 'user',
      resourceId: staffId,
      reason: `Onboarded new ${params.role.toUpperCase()} employee: ${newStaff.name} (${newStaff.branchId})`,
      correlationId: `EMP-STF-${Date.now()}`
    });
    this.notify();
    return { success: true, message: `Employee ${newStaff.name} (${staffId}) onboarded.` };
  }

  public toggleOperatorStatus(operatorId: string, status: 'active' | 'suspended'): void {
    const actor = this.getCurrentUser();
    if (actor && !EMPLOYEE_ONBOARDING_ROLES.includes(actor.accountType)) return;
    const list = this.getOperators().map((item) =>
      item.operatorId === operatorId
        ? { ...item, accountStatus: status, updatedAt: new Date().toISOString() }
        : item
    );
    if (list.some((item) => item.operatorId === operatorId)) {
      this.writeCached(STORAGE_KEYS.OPERATORS, list);
      this.logAudit({
        actorUid: actor?.uid || 'SYSTEM',
        actorName: actor?.firstName || 'Admin',
        actorRole: actor?.accountType || 'super_admin',
        action: status === 'suspended' ? 'OPERATOR_SUSPENDED' : 'OPERATOR_ACTIVATED',
        resourceType: 'user',
        resourceId: operatorId,
        reason: `Operator access status set to ${status}.`,
        correlationId: `OP-STATUS-${Date.now()}`
      });
      this.notify();
    }
  }

  public toggleStaffStatus(staffId: string, status: 'active' | 'inactive'): void {
    const actor = this.getCurrentUser();
    if (!actor || !EMPLOYEE_ONBOARDING_ROLES.includes(actor.accountType)) return;
    const list = this.getStaff().map((item) =>
      item.staffId === staffId
        ? { ...item, accountStatus: status, updatedAt: new Date().toISOString() }
        : item
    );
    if (list.some((item) => item.staffId === staffId)) {
      this.writeCached(STORAGE_KEYS.STAFF, list);
      this.logAudit({
        actorUid: actor.uid,
        actorName: `${actor.firstName} ${actor.lastName}`,
        actorRole: actor.accountType,
        action: status === 'inactive' ? 'STAFF_DEACTIVATED' : 'STAFF_ACTIVATED',
        resourceType: 'user',
        resourceId: staffId,
        reason: `Staff account status set to ${status}.`,
        correlationId: `STF-STATUS-${Date.now()}`
      });
      this.notify();
    }
  }

  // --- APPLICATIONS ---
  public getApplications(): InsuranceApplication[] {
    return this.readCached<InsuranceApplication[]>(STORAGE_KEYS.APPLICATIONS, SEED_APPLICATIONS);
  }

  public getApplicationById(id: string): InsuranceApplication | undefined {
    return this.getApplications().find((a) => a.applicationId === id);
  }

  public saveApplication(app: InsuranceApplication): void {
    const list = [...this.getApplications()];
    const idx = list.findIndex((a) => a.applicationId === app.applicationId);
    const updated = { ...app, updatedAt: new Date().toISOString() };
    if (idx >= 0) {
      list[idx] = updated;
    } else {
      list.unshift(updated);
    }
    this.writeCached(STORAGE_KEYS.APPLICATIONS, list);
    this.notify();
  }

  // --- POLICIES ---
  public getPolicies(): InsurancePolicy[] {
    return this.readCached<InsurancePolicy[]>(STORAGE_KEYS.POLICIES, SEED_POLICIES);
  }

  public getPolicyById(id: string): InsurancePolicy | undefined {
    return this.getPolicies().find((p) => p.policyId === id);
  }

  public getPolicyByVerificationCode(code: string): InsurancePolicy | undefined {
    const cleanCode = code.trim().toUpperCase();
    return this.getPolicies().find(
      (p) => p.verificationCode.toUpperCase() === cleanCode || p.policyNumber.toUpperCase() === cleanCode
    );
  }

  public savePolicy(policy: InsurancePolicy): { success: boolean; message: string } {
    const actor = this.getCurrentUser();
    if (
      actor &&
      !['super_admin', 'admin', 'executive', 'branch_manager', 'department_manager', 'operator', 'underwriter', 'staff'].includes(actor.accountType)
    ) {
      return {
        success: false,
        message: 'Permission denied: Your role has read-only access to policies.'
      };
    }
    const list = [...this.getPolicies()];
    const idx = list.findIndex((p) => p.policyId === policy.policyId);
    const updated: InsurancePolicy = {
      ...policy,
      updatedAt: new Date().toISOString()
    };
    if (idx >= 0) {
      list[idx] = updated;
    } else {
      list.unshift(updated);
    }
    this.writeCached(STORAGE_KEYS.POLICIES, list);
    this.logAudit({
      actorUid: actor?.uid || 'SYSTEM',
      actorName: actor ? `${actor.firstName} ${actor.lastName}` : 'System',
      actorRole: actor?.accountType || 'super_admin',
      action: idx >= 0 ? 'POLICY_UPDATED' : 'POLICY_CREATED',
      resourceType: 'policy',
      resourceId: policy.policyId,
      reason: `Policy ${policy.policyNumber} updated (Status: ${policy.policyStatus})`,
      correlationId: `POL-EDIT-${Date.now()}`
    });
    this.notify();
    return { success: true, message: `Policy ${policy.policyNumber} saved successfully.` };
  }

  public issuePolicy(policy: InsurancePolicy): void {
    const policies = [...this.getPolicies()];
    if (!policies.some((p) => p.policyId === policy.policyId)) {
      policies.unshift(policy);
      this.writeCached(STORAGE_KEYS.POLICIES, policies);
    }

    const apps = this.getApplications().map((a) =>
      a.applicationId === policy.applicationId
        ? { ...a, applicationStatus: 'approved' as const, updatedAt: new Date().toISOString() }
        : a
    );
    if (apps.some((a) => a.applicationId === policy.applicationId)) {
      this.writeCached(STORAGE_KEYS.APPLICATIONS, apps);
    }

    this.enqueueEmailJob({
      emailJobId: `EML-JOB-${Date.now()}`,
      eventId: `EVT-POLICY-${policy.policyId}`,
      recipient: policy.customerPhone || 'policyholder@oromiainsurance.com',
      recipientName: policy.customerName,
      templateId: 'TPL-EML-POLICY-ISSUED',
      category: 'transactional',
      subject: `Your Oromia Insurance Policy Issued: ${policy.policyNumber}`,
      scheduledAt: new Date().toISOString(),
      status: 'delivered',
      attemptCount: 1,
      deliveredAt: new Date().toISOString(),
      providerMessageId: `oic_verify_${policy.verificationCode}`,
      createdAt: new Date().toISOString()
    });

    this.logAudit({
      actorUid: this.getCurrentUser()?.uid || 'SYSTEM',
      actorName: this.getCurrentUser()?.firstName || 'Underwriter',
      actorRole: this.getCurrentUser()?.accountType || 'underwriter',
      action: 'POLICY_ISSUED',
      resourceType: 'policy',
      resourceId: policy.policyId,
      reason: `Policy ${policy.policyNumber} issued with verification code ${policy.verificationCode}`,
      correlationId: `POL-ISSUE-${Date.now()}`
    });

    this.notify();
  }

  // --- PUBLIC VERIFICATION ---
  public verifyPolicyCode(
    code: string,
    channel: 'public_portal' | 'institutional_api' | 'qr_scanner' = 'public_portal'
  ): {
    outcome: PolicyVerificationLog['verificationOutcome'];
    policy?: InsurancePolicy;
    timestamp: string;
  } {
    const timestamp = new Date().toISOString();
    const clean = code.trim().toUpperCase();
    let outcome: PolicyVerificationLog['verificationOutcome'];
    const matched = this.getPolicyByVerificationCode(clean);

    if (!clean || clean.length < 5) {
      outcome = 'invalid_format';
    } else if (!matched) {
      outcome = 'not_found';
    } else if (matched.policyStatus === 'active') {
      const today = new Date().toISOString().split('T')[0];
      if (matched.expiryDate < today) {
        outcome = 'verified_expired';
      } else {
        outcome = 'verified_active';
      }
    } else if (matched.policyStatus === 'expired') {
      outcome = 'verified_expired';
    } else if (matched.policyStatus === 'cancelled') {
      outcome = 'verified_cancelled';
    } else {
      outcome = 'verified_suspended';
    }

    this.logVerification({
      verificationId: `VRF-${Date.now()}`,
      queryCode: clean,
      matchedPolicyId: matched?.policyId,
      verificationOutcome: outcome,
      verificationTimestamp: timestamp,
      channel,
      ipMasked: '197.156.***.***',
      userAgentSnippet: typeof navigator !== 'undefined' ? navigator.userAgent.slice(0, 50) : 'Browser'
    });

    return {
      outcome,
      policy: outcome.startsWith('verified_') ? matched : undefined,
      timestamp
    };
  }

  private logVerification(log: PolicyVerificationLog): void {
    const list = [log, ...this.getVerificationLogs()].slice(0, 500);
    this.writeCached(STORAGE_KEYS.VERIFICATION_LOGS, list);
  }

  public getVerificationLogs(): PolicyVerificationLog[] {
    return this.readCached<PolicyVerificationLog[]>(STORAGE_KEYS.VERIFICATION_LOGS, []);
  }

  // --- TRAINING COURSES & PROGRESS ---
  public getTrainingCourses(): TrainingCourse[] {
    return this.readCached<TrainingCourse[]>(STORAGE_KEYS.TRAINING_COURSES, SEED_TRAINING_COURSES);
  }

  public getTrainingProgress(userId: string): TrainingProgress[] {
    const list = this.readCached<TrainingProgress[]>(STORAGE_KEYS.TRAINING_PROGRESS, []);
    return list.filter((p) => p.userId === userId);
  }

  public saveTrainingProgress(progress: TrainingProgress): void {
    const list = [...this.readCached<TrainingProgress[]>(STORAGE_KEYS.TRAINING_PROGRESS, [])];
    const idx = list.findIndex((p) => p.userId === progress.userId && p.courseId === progress.courseId);
    if (idx >= 0) {
      list[idx] = progress;
    } else {
      list.push(progress);
    }
    this.writeCached(STORAGE_KEYS.TRAINING_PROGRESS, list);
    this.notify();
  }

  // --- EMAIL AUTOMATION & JOBS ---
  public getEmailTemplates(): EmailTemplate[] {
    return this.readCached<EmailTemplate[]>(STORAGE_KEYS.EMAIL_TEMPLATES, SEED_EMAIL_TEMPLATES);
  }

  public getEmailJobs(): EmailJob[] {
    return this.readCached<EmailJob[]>(STORAGE_KEYS.EMAIL_JOBS, []);
  }

  public enqueueEmailJob(job: EmailJob): void {
    const jobs = [job, ...this.getEmailJobs()].slice(0, 300);
    this.writeCached(STORAGE_KEYS.EMAIL_JOBS, jobs);
    this.notify();
  }

  public retryEmailJob(emailJobId: string): void {
    const jobs = this.getEmailJobs().map((j) =>
      j.emailJobId === emailJobId
        ? {
            ...j,
            attemptCount: j.attemptCount + 1,
            status: 'delivered' as const,
            deliveredAt: new Date().toISOString(),
            failureReason: undefined
          }
        : j
    );
    if (jobs.some((j) => j.emailJobId === emailJobId)) {
      this.writeCached(STORAGE_KEYS.EMAIL_JOBS, jobs);
      this.notify();
    }
  }

  // --- PAYMENTS & CHAPA ---
  public getPaymentAttempts(): PaymentAttempt[] {
    return this.readCached<PaymentAttempt[]>(STORAGE_KEYS.PAYMENTS, SEED_PAYMENTS);
  }

  public createPaymentAttempt(attempt: PaymentAttempt): void {
    const list = [attempt, ...this.getPaymentAttempts()];
    this.writeCached(STORAGE_KEYS.PAYMENTS, list);
    this.notify();
  }

  public verifyPaymentAttempt(attemptId: string, success: boolean): void {
    const list = [...this.getPaymentAttempts()];
    const idx = list.findIndex((p) => p.paymentAttemptId === attemptId);
    if (idx >= 0) {
      const updated: PaymentAttempt = {
        ...list[idx],
        paymentStatus: success ? 'successful' : 'failed',
        verificationStatus: success ? 'verified_server' : 'failed_verification',
        verifiedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      list[idx] = updated;
      this.writeCached(STORAGE_KEYS.PAYMENTS, list);

      if (success) {
        const apps = this.getApplications().map((a) =>
          a.applicationId === updated.applicationId
            ? { ...a, applicationStatus: 'payment_verified' as const, updatedAt: new Date().toISOString() }
            : a
        );
        this.writeCached(STORAGE_KEYS.APPLICATIONS, apps);
      }

      this.logAudit({
        actorUid: this.getCurrentUser()?.uid || 'CHAPA-GATEWAY',
        actorName: 'Chapa V2 Integration',
        actorRole: 'finance',
        action: success ? 'PAYMENT_VERIFIED_SUCCESS' : 'PAYMENT_VERIFIED_FAILED',
        resourceType: 'payment',
        resourceId: attemptId,
        reason: `Server-to-server verification completed. Status: ${updated.paymentStatus} (${updated.amountETB} ETB)`,
        correlationId: `PAY-${attemptId}`
      });

      this.notify();
    }
  }

  // --- CLAIMS ---
  public getClaims(): InsuranceClaim[] {
    return this.readCached<InsuranceClaim[]>(STORAGE_KEYS.CLAIMS, SEED_CLAIMS);
  }

  public saveClaim(claim: InsuranceClaim): void {
    const list = [...this.getClaims()];
    const idx = list.findIndex((c) => c.claimId === claim.claimId);
    const updated = { ...claim, updatedAt: new Date().toISOString() };
    if (idx >= 0) {
      list[idx] = updated;
    } else {
      list.unshift(updated);
    }
    this.writeCached(STORAGE_KEYS.CLAIMS, list);
    this.notify();
  }

  // --- REPORTS ---
  public getReports(): BusinessReport[] {
    return this.readCached<BusinessReport[]>(STORAGE_KEYS.REPORTS, SEED_REPORTS);
  }

  public saveReport(report: BusinessReport): void {
    const list = [report, ...this.getReports()].slice(0, 200);
    this.writeCached(STORAGE_KEYS.REPORTS, list);
    this.logAudit({
      actorUid: this.getCurrentUser()?.uid || 'SYSTEM',
      actorName: this.getCurrentUser()?.displayName || 'System',
      actorRole: this.getCurrentUser()?.accountType || 'finance',
      action: 'REPORT_GENERATED',
      resourceType: 'report',
      resourceId: report.reportId,
      reason: `Generated ${report.reportType} report (${report.periodLabel})`,
      correlationId: `RPT-${Date.now()}`
    });
    this.notify();
  }

  public mergeCustomerWorkspaceRecords(params: {
    applications?: InsuranceApplication[];
    policies?: InsurancePolicy[];
    payments?: PaymentAttempt[];
    claims?: InsuranceClaim[];
  }): void {
    let changed = false;

    if (params.applications?.length) {
      const existing = this.getApplications();
      const map = new Map(existing.map((a) => [a.applicationId, a]));
      for (const app of params.applications) {
        map.set(app.applicationId, app);
      }
      this.writeCached(
        STORAGE_KEYS.APPLICATIONS,
        Array.from(map.values()).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
      );
      changed = true;
    }

    if (params.policies?.length) {
      const existing = this.getPolicies();
      const map = new Map(existing.map((p) => [p.policyId, p]));
      for (const pol of params.policies) {
        map.set(pol.policyId, pol);
      }
      this.writeCached(
        STORAGE_KEYS.POLICIES,
        Array.from(map.values()).sort((a, b) => (b.issuedAt || '').localeCompare(a.issuedAt || ''))
      );
      changed = true;
    }

    if (params.payments?.length) {
      const existing = this.getPaymentAttempts();
      const map = new Map(existing.map((p) => [p.paymentAttemptId, p]));
      for (const pay of params.payments) {
        map.set(pay.paymentAttemptId, pay);
      }
      this.writeCached(
        STORAGE_KEYS.PAYMENTS,
        Array.from(map.values()).sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      );
      changed = true;
    }

    if (params.claims?.length) {
      const existing = this.getClaims();
      const map = new Map(existing.map((c) => [c.claimId, c]));
      for (const clm of params.claims) {
        map.set(clm.claimId, clm);
      }
      this.writeCached(
        STORAGE_KEYS.CLAIMS,
        Array.from(map.values()).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
      );
      changed = true;
    }

    if (changed) {
      this.notify();
    }
  }

  // --- AUDIT LOGS ---
  public getAuditLogs(): AuditLogEntry[] {
    return this.readCached<AuditLogEntry[]>(STORAGE_KEYS.AUDIT_LOGS, SEED_AUDIT_LOGS);
  }

  public logAudit(entry: Omit<AuditLogEntry, 'auditId' | 'timestamp'> & { auditId?: string; timestamp?: string }): void {
    const fullEntry: AuditLogEntry = {
      auditId: entry.auditId || `OIC-AUD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: entry.timestamp || new Date().toISOString(),
      ...entry
    };
    const list = [fullEntry, ...this.getAuditLogs()].slice(0, 1000);
    this.writeCached(STORAGE_KEYS.AUDIT_LOGS, list);
    this.notify();
  }

  // --- NEWSLETTER SUBSCRIBERS ---
  public getSubscribers(): NewsletterSubscriber[] {
    return this.readCached<NewsletterSubscriber[]>(STORAGE_KEYS.SUBSCRIBERS, SEED_SUBSCRIBERS);
  }

  public addSubscriber(
    email: string,
    fullName?: string,
    frequency: 'weekly' | 'monthly' | 'breaking_announcements' = 'weekly',
    source: 'footer_signup' | 'admin_manual' | 'customer_portal' = 'footer_signup'
  ): { success: boolean; message: string; subscriber?: NewsletterSubscriber } {
    const cleanEmail = email.trim().toLowerCase();
    const subscribers = [...this.getSubscribers()];
    const existingIdx = subscribers.findIndex((s) => s.email.toLowerCase() === cleanEmail);
    if (existingIdx >= 0) {
      const existing = subscribers[existingIdx];
      if (existing.status === 'unsubscribed') {
        const reactivated: NewsletterSubscriber = {
          ...existing,
          status: 'active',
          subscribedAt: new Date().toISOString()
        };
        subscribers[existingIdx] = reactivated;
        this.writeCached(STORAGE_KEYS.SUBSCRIBERS, subscribers);
        this.notify();
        return { success: true, message: 'Welcome back! Your subscription has been reactivated.', subscriber: reactivated };
      }
      return { success: false, message: 'This email is already subscribed to Oromia Insurance S.C. updates.' };
    }

    const newSub: NewsletterSubscriber = {
      subscriberId: `OIC-SUB-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      email: cleanEmail,
      fullName: fullName?.trim() || undefined,
      frequency,
      status: 'active',
      subscribedAt: new Date().toISOString(),
      source
    };

    subscribers.unshift(newSub);
    this.writeCached(STORAGE_KEYS.SUBSCRIBERS, subscribers);
    this.logAudit({
      actorUid: this.getCurrentUser()?.uid || 'PUBLIC-VISITOR',
      actorName: fullName || cleanEmail,
      actorRole: 'customer',
      action: 'NEWSLETTER_SUBSCRIBED',
      resourceType: 'user',
      resourceId: newSub.subscriberId,
      reason: `Subscribed to Oromia Insurance updates (${frequency})`,
      correlationId: `SUB-${newSub.subscriberId}`
    });

    this.notify();
    return { success: true, message: 'Thank you for subscribing to Oromia Insurance S.C. updates.', subscriber: newSub };
  }

  public updateSubscriberStatus(subscriberId: string, status: 'active' | 'unsubscribed'): void {
    const subscribers = this.getSubscribers().map((s) =>
      s.subscriberId === subscriberId ? { ...s, status } : s
    );
    this.writeCached(STORAGE_KEYS.SUBSCRIBERS, subscribers);
    this.notify();
  }

  public deleteSubscriber(subscriberId: string): void {
    const subscribers = this.getSubscribers().filter((s) => s.subscriberId !== subscriberId);
    this.writeCached(STORAGE_KEYS.SUBSCRIBERS, subscribers);
    this.notify();
  }
}

export const store = new OICStore();
