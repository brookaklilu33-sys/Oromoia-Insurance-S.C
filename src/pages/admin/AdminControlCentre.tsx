import React, { useState, useEffect, useMemo } from 'react';
import { store, EMPLOYEE_ONBOARDING_ROLES } from '../../services/store';
import {
  Shield,
  Layers,
  Users,
  Briefcase,
  FileCheck,
  CreditCard,
  Mail,
  History,
  Plus,
  Edit,
  CheckCircle2,
  AlertTriangle,
  Search,
  Lock,
  Send,
  Globe,
  Trash2,
  Phone,
  Newspaper,
  Download,
  Eye,
  FileCheck2,
  FolderOpen,
  BookOpen,
  UserPlus,
  Filter,
  Building,
  AlertCircle,
  BarChart3
} from 'lucide-react';
import { PlatformGuideModule } from '../../components/PlatformGuideModule';
import {
  InsuranceProduct,
  InsuranceBusinessLine,
  InsurancePolicy,
  InsuranceClaim,
  EmailTemplate,
  AuditLogEntry,
  AdminUploadedDocument,
  SiteCmsConfig,
  NewsArticle,
  Branch,
  AgentProfile,
  BrokerProfile,
  BusinessReport,
  UserRole
} from '../../types/insurance';

interface AdminControlCentreProps {
  navigate: (route: string) => void;
}

export const AdminControlCentre: React.FC<AdminControlCentreProps> = ({ navigate }) => {
  const currentUser = store.getCurrentUser();
  const currentRole: UserRole = currentUser?.accountType || 'admin';
  const isAdmin = EMPLOYEE_ONBOARDING_ROLES.includes(currentRole);
  const isOperator = currentRole === 'operator';
  const isFinance = currentRole === 'finance';
  const isMarketing = currentRole === 'marketing';
  const isClaimsOfficer = currentRole === 'claims_officer';

  // Role Permissions Matrix
  const canOnboardEmployees = isAdmin;
  const canEditOperations = [
    'super_admin',
    'admin',
    'executive',
    'department_manager',
    'branch_manager',
    'operator',
    'marketing'
  ].includes(currentRole);
  const canEditPolicies = [
    'super_admin',
    'admin',
    'executive',
    'department_manager',
    'branch_manager',
    'operator',
    'underwriter',
    'staff'
  ].includes(currentRole);

  type AdminTab =
    | 'overview'
    | 'content'
    | 'documents'
    | 'subscribers'
    | 'products'
    | 'customers'
    | 'operators'
    | 'branches'
    | 'agents_brokers'
    | 'claims'
    | 'policies'
    | 'payments'
    | 'reports'
    | 'emails'
    | 'audit'
    | 'guide';

  const allowedTabs: AdminTab[] = isFinance
    ? ['overview', 'policies', 'payments', 'reports', 'audit', 'guide']
    : isMarketing
    ? ['overview', 'content', 'documents', 'subscribers', 'products', 'reports', 'guide']
    : isClaimsOfficer
    ? ['overview', 'claims', 'policies', 'reports', 'guide']
    : [
        'overview',
        'content',
        'documents',
        'subscribers',
        'products',
        'customers',
        'operators',
        'branches',
        'agents_brokers',
        'claims',
        'policies',
        'payments',
        'reports',
        'emails',
        'audit',
        'guide'
      ];

  const [activeTab, setActiveTab] = useState<AdminTab>(isFinance ? 'payments' : isClaimsOfficer ? 'claims' : 'overview');

  useEffect(() => {
    if (!allowedTabs.includes(activeTab)) {
      setActiveTab(isFinance ? 'payments' : isClaimsOfficer ? 'claims' : 'overview');
    }
  }, [currentRole]);

  const products = store.getProducts();
  const customers = store.getCustomers();
  const operators = store.getOperators();
  const staffMembers = store.getStaff();
  const branches = store.getBranches();
  const departments = store.getDepartments();
  const agents = store.getAgents();
  const brokers = store.getBrokers();
  const claims = store.getClaims();
  const reports = store.getReports();
  const policies = store.getPolicies();
  const applications = store.getApplications();
  const paymentAttempts = store.getPaymentAttempts();
  const emailTemplates = store.getEmailTemplates();
  const emailJobs = store.getEmailJobs();
  const auditLogs = store.getAuditLogs();
  const verificationLogs = store.getVerificationLogs();
  const subscribers = store.getSubscribers();

  const [subscriberSearch, setSubscriberSearch] = useState('');
  const [newManualSubEmail, setNewManualSubEmail] = useState('');
  const [newManualSubName, setNewManualSubName] = useState('');

  // Inline confirmation state (iFrame-safe replacement for browser confirm())
  const [confirmDeleteDocId, setConfirmDeleteDocId] = useState<string | null>(null);
  const [confirmArchiveProductId, setConfirmArchiveProductId] = useState<string | null>(null);

  // Employee Onboarding State (Admin Only)
  const [showOnboardForm, setShowOnboardForm] = useState(false);
  const [employeeForm, setEmployeeForm] = useState({
    name: '',
    email: '',
    phone: '+251 ',
    role: 'operator' as UserRole,
    branchId: branches[0]?.branchId || 'BR-OIC-HQ',
    departmentId: departments[0]?.departmentId || 'DEPT-HQ-01'
  });
  const [employeeFeedback, setEmployeeFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Branches / Agents / Brokers / Reports interactive form states
  const [branchSearch, setBranchSearch] = useState('');
  const [showNewBranchForm, setShowNewBranchForm] = useState(false);
  const [newBranchForm, setNewBranchForm] = useState<{
    name: string;
    region: Branch['region'];
    city: string;
    phone: string;
    email: string;
    managerName: string;
    address: string;
    openingHours: string;
  }>({
    name: '',
    region: 'finfinne',
    city: 'Addis Ababa',
    phone: '+251-115-572121',
    email: 'info@oromiainsurance.com',
    managerName: 'Branch Manager',
    address: '',
    openingHours: 'Mon–Fri 8:00 AM – 5:00 PM · Sat 8:00 AM – 12:00 PM'
  });
  const [agentForm, setAgentForm] = useState({
    name: '',
    licenseNumber: '',
    phone: '+251 ',
    email: '',
    branchId: 'BR-OIC-HQ'
  });
  const [brokerForm, setBrokerForm] = useState({
    companyName: '',
    nbeLicenseRef: '',
    contactPerson: '',
    phone: '+251 ',
    email: ''
  });
  const [networkFeedback, setNetworkFeedback] = useState<string | null>(null);
  const [reportTypeToGen, setReportTypeToGen] = useState<BusinessReport['reportType']>('production_summary');
  const [reportFeedback, setReportFeedback] = useState<string | null>(null);
  const [claimFeedback, setClaimFeedback] = useState<string | null>(null);

  // Policy Edit State
  const [editingPolicy, setEditingPolicy] = useState<InsurancePolicy | null>(null);
  const [policyFeedback, setPolicyFeedback] = useState<string | null>(null);

  // Finance / Payment Ledger Filter & Export State
  const [txSearch, setTxSearch] = useState('');
  const [txStatusFilter, setTxStatusFilter] = useState<'all' | 'successful' | 'pending' | 'failed'>('all');
  const [txVerifyFilter, setTxVerifyFilter] = useState<'all' | 'verified_server' | 'unverified' | 'failed_verification'>('all');
  const [txDateFrom, setTxDateFrom] = useState('');
  const [txDateTo, setTxDateTo] = useState('');
  const [txMinAmount, setTxMinAmount] = useState('');
  const [txMaxAmount, setTxMaxAmount] = useState('');
  const [txExportFeedback, setTxExportFeedback] = useState<string | null>(null);

  // Official Policy Documents Management State
  const [adminDocs, setAdminDocs] = useState<AdminUploadedDocument[]>(() => store.getAdminDocuments());
  const [docSearch, setDocSearch] = useState('');
  const [selectedDocCategory, setSelectedDocCategory] = useState<string>('all');
  const [selectedDocProductFilter, setSelectedDocProductFilter] = useState<string>('all');
  const [isEditingDoc, setIsEditingDoc] = useState(false);
  const [editingDoc, setEditingDoc] = useState<Partial<AdminUploadedDocument> | null>(null);
  const [previewingDoc, setPreviewingDoc] = useState<AdminUploadedDocument | null>(null);
  const [docSavedFeedback, setDocSavedFeedback] = useState<string | null>(null);

  // Website Content & CMS Editor State (synced with OICStore)
  const [contentSavedFeedback, setContentSavedFeedback] = useState<string | null>(null);
  const [contentConfig, setContentConfig] = useState<SiteCmsConfig>(() => store.getCmsConfig());

  // News & Announcements Publishing State (synced with OICStore)
  const [newsList, setNewsList] = useState<NewsArticle[]>(() => store.getNews());
  const [newArticle, setNewArticle] = useState({
    title: '',
    tag: 'Corporate News',
    date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    summary: '',
    category: 'news' as NewsArticle['category'],
    image: '/assets/oic/hero_homepage.png',
    isFeatured: false
  });

  const handleAddNewsArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newArticle.title || !newArticle.summary) return;
    const article: NewsArticle = {
      ...newArticle,
      id: `OIC-NEWS-${Date.now()}`
    };
    store.saveNewsArticle(article);
    setNewsList(store.getNews());
    setNewArticle({
      title: '',
      tag: 'Corporate News',
      date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      summary: '',
      category: 'news',
      image: '/assets/oic/hero_homepage.png',
      isFeatured: false
    });
    setContentSavedFeedback('News article published to Oromia Insurance S.C. newsroom.');
    setTimeout(() => setContentSavedFeedback(null), 3000);
  };

  const handleDeleteNewsArticle = (id: string) => {
    store.deleteNewsArticle(id);
    setNewsList(store.getNews());
  };

  const handleSaveContentConfig = (e: React.FormEvent) => {
    e.preventDefault();
    store.saveCmsConfig(contentConfig);
    setContentSavedFeedback('Website content and OIC corporate parameters saved successfully.');
    setTimeout(() => setContentSavedFeedback(null), 3000);
  };

  // Product CMS modal / form state
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<InsuranceProduct> | null>(null);
  const [productSavedFeedback, setProductSavedFeedback] = useState<string | null>(null);

  // Email test send state
  const [testEmailRecipient, setTestEmailRecipient] = useState('customer@example.et');
  const [testEmailFeedback, setTestEmailFeedback] = useState<string | null>(null);

  // Search filter for CRM
  const [crmSearch, setCrmSearch] = useState('');

  // Calculate real metrics directly from store
  const totalCustomers = customers.length;
  const activePoliciesCount = policies.filter((p) => p.policyStatus === 'active').length;
  const grossPremiumETB = policies.reduce((acc, p) => acc + (p.totalPremiumETB || 0), 0);
  const pendingUnderwritingCount = applications.filter((a) => a.applicationStatus === 'submitted' || a.applicationStatus === 'under_review').length;
  const totalEmailsSent = emailJobs.filter((e) => e.status === 'delivered').length;

  const handleCreateNewProduct = () => {
    const newId = `PRD-NEW-${Math.floor(100 + Math.random() * 900)}`;
    setEditingProduct({
      productId: newId,
      slug: `oic-product-${newId.toLowerCase()}`,
      productName: 'OIC Commercial Protection Line',
      productCategory: 'non_life',
      shortDescription: 'Comprehensive corporate asset protection and underwriting schedule.',
      fullDescription: 'Underwritten in full conformity with National Bank of Ethiopia regulatory directives and Oromia Insurance S.C. corporate underwriting parameters.',
      heroImage: '/assets/oic/cat_non_life.jpg',
      disclaimer: 'Official Oromia Insurance S.C. Policy Schedule · Regulated by the National Bank of Ethiopia',
      isDemonstration: false,
      benefits: ['Direct damage indemnification', 'Emergency inspection & rapid claims processing'],
      coverageSections: [
        { title: 'Standard Coverage Section', description: 'Certified risk exposure and agreed schedule limits', limitOrFormula: '100% of declared value' }
      ],
      exclusions: ['Willful misconduct or unauthorized operations', 'War and nuclear contamination'],
      eligibilityRules: ['Resident or registered business entity in Ethiopia with valid TIN'],
      requiredDocuments: [
        { code: 'DOC_KYC', title: 'National ID / Commercial Registration', description: 'Valid government ID or commercial registration certificate', mandatory: true }
      ],
      faq: [{ question: 'What is the claims notification window?', answer: 'Notice must be given promptly to Oromia Insurance S.C. Claims Management Directorate (+251-115-589-676) or any OIC branch.' }],
      applicationSchema: [
        {
          stepTitle: 'Primary Risk Schedule',
          fields: [
            { id: 'declaredValue', label: 'Insured Value (ETB)', type: 'number', required: true }
          ]
        }
      ],
      quotationConfiguration: {
        baseRateDescription: 'Standard regulatory tariff: indicative calculation subject to formal underwriting',
        standardMinimumPremiumETB: 3500,
        taxRatePercent: 15,
        stampDutyETB: 50,
        indicativeCalculationSample: 'Insured Value * tariff + 15% VAT + 50 ETB Stamp Duty'
      },
      underwritingConfiguration: {
        requiresInspection: false,
        makerCheckerRequired: false,
        autoQuoteEligible: true,
        maxAutoQuoteAmountETB: 10000000
      },
      policyTemplateId: 'TPL-OIC-NBE',
      renewalConfiguration: {
        defaultTenureMonths: 12,
        gracePeriodDays: 14,
        reminderCadenceDays: [30, 14, 7, 0]
      },
      publicStatus: 'draft',
      availability: 'online_and_operator',
      version: 1,
      createdBy: currentUser?.uid || 'OIC-ADMIN'
    });
    setIsEditingProduct(true);
  };

  // Official Policy Documents Management Handlers
  const handleCreateNewDoc = () => {
    const newDocId = `DOC-OIC-${Date.now().toString().slice(-4)}`;
    setEditingDoc({
      id: newDocId,
      title: 'Official OIC Endorsement & Policy Schedule',
      productId: 'all',
      productName: 'All Products / OIC Corporate General',
      category: 'policy_wording',
      fileType: 'pdf',
      fileSize: '1.8 MB',
      uploadDate: new Date().toISOString().split('T')[0],
      downloadUrl: '#',
      description: 'Official policy document approved by Oromia Insurance S.C. Underwriting Directorate.',
      uploadedBy: 'Underwriting Directorate (Lideya Plaza HQ)',
      version: 'v2.4 (2026)',
      isPublic: true,
      contentSummary: 'Certified statutory documentation compliant with National Bank of Ethiopia directives.',
      sections: [
        {
          heading: 'Operative Clause & Schedule',
          body: 'This document constitutes an official policy record of Oromia Insurance S.C. subject to Ethiopian maritime, commercial, and insurance codes.'
        },
        {
          heading: 'Claims Notice & Settlement Protocol',
          body: 'Notice of loss must be reported promptly within statutory timelines to the OIC Claims Management Directorate (+251-115-589-676) or any of our 65 branch offices.'
        }
      ]
    });
    setIsEditingDoc(true);
  };

  const handleSaveDoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDoc || !editingDoc.title) return;
    const docToSave: AdminUploadedDocument = {
      id: editingDoc.id || `DOC-OIC-${Date.now().toString().slice(-6)}`,
      title: editingDoc.title,
      productId: editingDoc.productId || 'all',
      productName: editingDoc.productId === 'all'
        ? 'All Products / OIC Corporate General'
        : (products.find((p) => p.productId === editingDoc.productId)?.productName || editingDoc.productName || 'General Policy'),
      category: (editingDoc.category as AdminUploadedDocument['category']) || 'policy_wording',
      fileType: (editingDoc.fileType as AdminUploadedDocument['fileType']) || 'pdf',
      fileSize: editingDoc.fileSize || '1.8 MB',
      uploadDate: editingDoc.uploadDate || new Date().toISOString().split('T')[0],
      downloadUrl: editingDoc.downloadUrl || '#',
      description: editingDoc.description || 'Official document approved by OIC Underwriting Directorate.',
      uploadedBy: editingDoc.uploadedBy || 'Underwriting Directorate (Lideya Plaza HQ)',
      version: editingDoc.version || 'v2.4 (2026)',
      isPublic: editingDoc.isPublic !== undefined ? editingDoc.isPublic : true,
      contentSummary: editingDoc.contentSummary || 'Certified statutory document under National Bank of Ethiopia regulations.',
      sections: editingDoc.sections && editingDoc.sections.length > 0 ? editingDoc.sections : [
        {
          heading: 'Operative Clause & Schedule',
          body: 'This document constitutes an official policy record of Oromia Insurance S.C. subject to Ethiopian maritime, commercial, and insurance codes.'
        }
      ]
    };
    store.saveAdminDocument(docToSave);
    setAdminDocs(store.getAdminDocuments());
    setDocSavedFeedback(`Official document "${docToSave.title}" published & synced to policy pages.`);
    setTimeout(() => {
      setDocSavedFeedback(null);
      setIsEditingDoc(false);
      setEditingDoc(null);
    }, 1200);
  };

  const handleDeleteDoc = (docId: string, title: string) => {
    store.deleteAdminDocument(docId);
    setAdminDocs(store.getAdminDocuments());
    setConfirmDeleteDocId(null);
    setDocSavedFeedback(`Document "${title}" deleted and unlinked from public product pages.`);
    setTimeout(() => setDocSavedFeedback(null), 2500);
  };

  const handleDownloadDoc = (doc: AdminUploadedDocument) => {
    const lines = [
      `OROMIA INSURANCE S.C.`,
      `HEAD OFFICE: LIDEYA PLAZA, ETHIO-CHINA FRIENDSHIP AVE., ADDIS ABABA, ETHIOPIA`,
      `DOCUMENT CONTROL NUMBER: ${doc.id}`,
      `TITLE: ${doc.title.toUpperCase()}`,
      `APPLICABLE PRODUCT: ${doc.productName}`,
      `CATEGORY: ${doc.category.toUpperCase().replace(/_/g, ' ')} | VERSION: ${doc.version}`,
      `ISSUANCE DATE: ${doc.uploadDate} | ISSUING DEPT: ${doc.uploadedBy}`,
      `SUPERVISORY AUTHORITY: LICENSED & REGULATED BY THE NATIONAL BANK OF ETHIOPIA`,
      `================================================================================`,
      ``,
      `SUMMARY / SCOPE OF DOCUMENT:`,
      doc.description,
      ``,
      doc.contentSummary ? `CONTENT SUMMARY:\n${doc.contentSummary}\n` : '',
      `OFFICIAL POLICY CLAUSES & SECTIONS:`,
      `--------------------------------------------------------------------------------`,
      ...(doc.sections || []).flatMap((sec, idx) => [
        `\n[SECTION ${idx + 1}] ${sec.heading.toUpperCase()}`,
        sec.body,
        `--------------------------------------------------------------------------------`
      ]),
      ``,
      `================================================================================`,
      `AUTHENTICITY CONFIRMATION:`,
      `This document is certified by Oromia Insurance S.C. For verification`,
      `or claims notification, contact our Head Office switchboard at +251-115-572121`,
      `or Claims Directorate at +251-115-589-676 (info@oromiainsurance.com).`,
      `================================================================================`
    ].join('\n');

    const blob = new Blob([lines], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${doc.id}_${doc.title.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct || !editingProduct.productId) return;
    store.saveProduct(editingProduct as InsuranceProduct);
    setProductSavedFeedback(`Product "${editingProduct.productName}" saved successfully.`);
    setTimeout(() => {
      setProductSavedFeedback(null);
      setIsEditingProduct(false);
      setEditingProduct(null);
    }, 1200);
  };

  const handleDuplicateProduct = (prd: InsuranceProduct) => {
    const dupId = `PRD-DUP-${Date.now().toString().slice(-4)}`;
    const duplicate: InsuranceProduct = {
      ...prd,
      productId: dupId,
      slug: `${prd.slug}-draft-copy`,
      productName: `${prd.productName} (Draft Copy)`,
      publicStatus: 'draft',
      version: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    store.saveProduct(duplicate);
  };

  const handleArchiveProduct = (productId: string) => {
    store.archiveProduct(productId);
    setConfirmArchiveProductId(null);
    setProductSavedFeedback('Product archived cleanly. Existing active policies remain intact.');
    setTimeout(() => setProductSavedFeedback(null), 2500);
  };

  const handleToggleOperator = (opId: string, currentStatus: string) => {
    if (!canOnboardEmployees) return;
    const newStatus = currentStatus === 'active' ? 'suspended' : 'active';
    store.toggleOperatorStatus(opId, newStatus);
  };

  const handleToggleStaff = (staffId: string, currentStatus: string) => {
    if (!canOnboardEmployees) return;
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    store.toggleStaffStatus(staffId, newStatus);
  };

  const handleOnboardEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canOnboardEmployees) {
      setEmployeeFeedback({ type: 'error', text: 'Only Administrators may onboard new employees.' });
      return;
    }
    const res = store.onboardEmployee(employeeForm);
    setEmployeeFeedback({ type: res.success ? 'success' : 'error', text: res.message });
    if (res.success) {
      setEmployeeForm({
        name: '',
        email: '',
        phone: '+251 ',
        role: 'operator',
        branchId: branches[0]?.branchId || 'BR-OIC-HQ',
        departmentId: departments[0]?.departmentId || 'DEPT-HQ-01'
      });
      setShowOnboardForm(false);
    }
    setTimeout(() => setEmployeeFeedback(null), 3500);
  };

  const handleSaveBranch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBranchForm.name.trim()) return;
    const newBranch: Branch = {
      branchId: `BR-OIC-${Date.now().toString().slice(-4)}`,
      name: newBranchForm.name.trim(),
      region: newBranchForm.region || 'finfinne',
      city: newBranchForm.city.trim() || 'Addis Ababa',
      address: newBranchForm.address.trim() || 'Addis Ababa, Ethiopia',
      phone: newBranchForm.phone.trim() || '+251-115-572121',
      email: newBranchForm.email.trim() || 'info@oromiainsurance.com',
      managerName: newBranchForm.managerName.trim() || 'Branch Manager',
      status: 'active',
      openingHours: newBranchForm.openingHours.trim() || 'Mon–Fri 8:00 AM – 5:00 PM'
    };
    store.saveBranch(newBranch);
    setNewBranchForm({
      name: '',
      region: 'finfinne',
      city: 'Addis Ababa',
      phone: '+251-115-572121',
      email: 'info@oromiainsurance.com',
      managerName: 'Branch Manager',
      address: '',
      openingHours: 'Mon–Fri 8:00 AM – 5:00 PM · Sat 8:00 AM – 12:00 PM'
    });
    setShowNewBranchForm(false);
    setNetworkFeedback(`Branch "${newBranch.name}" added to OIC National Directory.`);
    setTimeout(() => setNetworkFeedback(null), 3000);
  };

  const handleAddAgent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agentForm.name.trim() || !agentForm.licenseNumber.trim()) return;
    const now = new Date().toISOString();
    const agent: AgentProfile = {
      agentId: `OIC-AGT-${Date.now().toString().slice(-4)}`,
      name: agentForm.name.trim(),
      licenseNumber: agentForm.licenseNumber.trim(),
      phone: agentForm.phone.trim(),
      email: agentForm.email.trim(),
      branchId: agentForm.branchId,
      businessLines: ['non_life', 'life_health'],
      commissionRateStatus: 'pending_confirmation',
      status: 'active',
      createdAt: now,
      updatedAt: now
    };
    store.saveAgent(agent);
    setAgentForm({ name: '', licenseNumber: '', phone: '+251 ', email: '', branchId: 'BR-OIC-HQ' });
    setNetworkFeedback(`Licensed agent ${agent.name} registered.`);
    setTimeout(() => setNetworkFeedback(null), 3000);
  };

  const handleAddBroker = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brokerForm.companyName.trim() || !brokerForm.nbeLicenseRef.trim()) return;
    const now = new Date().toISOString();
    const broker: BrokerProfile = {
      brokerId: `OIC-BRK-${Date.now().toString().slice(-4)}`,
      companyName: brokerForm.companyName.trim(),
      contactPerson: brokerForm.contactPerson.trim(),
      nbeLicenseRef: brokerForm.nbeLicenseRef.trim(),
      phone: brokerForm.phone.trim(),
      email: brokerForm.email.trim(),
      partnerBranches: ['BR-OIC-HQ'],
      status: 'active',
      createdAt: now,
      updatedAt: now
    };
    store.saveBroker(broker);
    setBrokerForm({ companyName: '', nbeLicenseRef: '', contactPerson: '', phone: '+251 ', email: '' });
    setNetworkFeedback(`Partner brokerage ${broker.companyName} registered.`);
    setTimeout(() => setNetworkFeedback(null), 3000);
  };

  const handleUpdateClaimStatus = (
    claim: InsuranceClaim,
    nextStatus: InsuranceClaim['claimStatus'],
    note: string
  ) => {
    store.saveClaim({
      ...claim,
      claimStatus: nextStatus,
      assignedAdjusterId: currentUser?.uid || 'OIC-CLM-01',
      adjudicationNotes: note
    });
    store.logAudit({
      actorUid: currentUser?.uid || 'OIC-ADMIN',
      actorName: currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'OIC Claims Officer',
      actorRole: currentRole,
      action: `CLAIM_${nextStatus.toUpperCase()}`,
      resourceType: 'claim',
      resourceId: claim.claimId,
      reason: `Claim ${claim.claimNumber} transitioned to ${nextStatus.replace('_', ' ')}`,
      correlationId: `CLM-ADJ-${Date.now()}`
    });
    setClaimFeedback(`Claim ${claim.claimNumber} updated to ${nextStatus.replace('_', ' ').toUpperCase()}.`);
    setTimeout(() => setClaimFeedback(null), 2500);
  };

  const handleGenerateReport = () => {
    const grossPrem = policies.reduce((acc, p) => acc + (p.totalPremiumETB || 0), 0);
    const totalClaimsLoss = claims.reduce((acc, c) => acc + (c.estimatedLossETB || 0), 0);
    const labelMap: Record<BusinessReport['reportType'], string> = {
      production_summary: 'Gross Underwriting Production Summary',
      claims_register: 'Claims Register & Loss Ratio Snapshot',
      financial_settlements: 'Chapa Financial Settlements Report',
      branch_performance: 'National Branch Network Performance',
      takaful_fund: 'Halal Takaful Fund & Participant Overview',
      agri_micro_outreach: 'Agriculture & Microinsurance Outreach'
    };
    const rpt: BusinessReport = {
      reportId: `OIC-RPT-${Date.now().toString().slice(-6)}`,
      title: labelMap[reportTypeToGen],
      reportType: reportTypeToGen,
      periodLabel: `FY 2026 · ${new Date().toISOString().split('T')[0]}`,
      generatedBy: currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'OIC Control Centre',
      generatedByUid: currentUser?.uid || 'OIC-ADMIN',
      format: 'json',
      metricsSnapshot: {
        totalPolicies: policies.length,
        grossPremiumETB: grossPrem,
        claimsCount: claims.length,
        claimsLossETB: totalClaimsLoss,
        activeBranches: branches.length,
        registeredCustomers: customers.length
      },
      createdAt: new Date().toISOString()
    };
    store.saveReport(rpt);
    setReportFeedback(`Report ${rpt.reportId} generated and archived in ledger.`);
    setTimeout(() => setReportFeedback(null), 3000);
  };

  const handleSavePolicyEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canEditPolicies || !editingPolicy) return;
    const res = store.savePolicy(editingPolicy);
    setPolicyFeedback(res.message);
    if (res.success) {
      setEditingPolicy(null);
    }
    setTimeout(() => setPolicyFeedback(null), 3000);
  };

  // Enrich & filter payment transactions cleanly
  const enrichedTransactions = useMemo(() => {
    return paymentAttempts.map((tx) => {
      const linkedPolicy = policies.find(
        (p) =>
          p.applicationId === tx.applicationId ||
          p.paymentReference === tx.providerReference ||
          p.paymentReference === tx.merchantReference
      );
      const linkedCustomer = customers.find(
        (c) => c.customerId === tx.customerId || c.authUid === tx.customerId
      );
      const linkedApp = applications.find((a) => a.applicationId === tx.applicationId);

      return {
        ...tx,
        customerName:
          linkedCustomer?.personalInformation.fullName ||
          linkedPolicy?.customerName ||
          linkedApp?.customerName ||
          tx.customerId,
        policyNumber: linkedPolicy?.policyNumber || 'Pending Issuance',
        productName: linkedPolicy?.productName || linkedApp?.productName || 'Insurance Premium'
      };
    });
  }, [paymentAttempts, policies, customers, applications]);

  const filteredTransactions = useMemo(() => {
    const q = txSearch.trim().toLowerCase();
    const minVal = txMinAmount ? parseFloat(txMinAmount) : null;
    const maxVal = txMaxAmount ? parseFloat(txMaxAmount) : null;

    return enrichedTransactions.filter((tx) => {
      if (txStatusFilter !== 'all' && tx.paymentStatus !== txStatusFilter) return false;
      if (txVerifyFilter !== 'all' && tx.verificationStatus !== txVerifyFilter) return false;
      if (minVal !== null && Number.isFinite(minVal) && tx.amountETB < minVal) return false;
      if (maxVal !== null && Number.isFinite(maxVal) && tx.amountETB > maxVal) return false;

      const txDate = (tx.verifiedAt || tx.createdAt || '').slice(0, 10);
      if (txDateFrom && txDate && txDate < txDateFrom) return false;
      if (txDateTo && txDate && txDate > txDateTo) return false;

      if (q) {
        const matches =
          tx.merchantReference.toLowerCase().includes(q) ||
          (tx.providerReference || '').toLowerCase().includes(q) ||
          tx.paymentAttemptId.toLowerCase().includes(q) ||
          tx.customerId.toLowerCase().includes(q) ||
          tx.customerName.toLowerCase().includes(q) ||
          tx.policyNumber.toLowerCase().includes(q) ||
          tx.productName.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    });
  }, [enrichedTransactions, txSearch, txStatusFilter, txVerifyFilter, txDateFrom, txDateTo, txMinAmount, txMaxAmount]);

  const filteredPaidTotalETB = useMemo(
    () =>
      filteredTransactions
        .filter((t) => t.paymentStatus === 'successful')
        .reduce((sum, t) => sum + (t.amountETB || 0), 0),
    [filteredTransactions]
  );

  const filteredPaidCount = useMemo(
    () => filteredTransactions.filter((t) => t.paymentStatus === 'successful').length,
    [filteredTransactions]
  );

  const escapeCsvCell = (val: string | number | undefined | null): string => {
    const str = String(val ?? '');
    if (/[",\n\r]/.test(str)) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const triggerDownloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExportTransactionsCsv = () => {
    const headers = [
      'Payment ID',
      'Merchant Reference',
      'Provider Reference',
      'Customer Name',
      'Customer ID',
      'Policy Number',
      'Product',
      'Amount (ETB)',
      'Currency',
      'Payment Status',
      'Verification Status',
      'Verified At',
      'Created At'
    ];
    const rows = filteredTransactions.map((tx) =>
      [
        tx.paymentAttemptId,
        tx.merchantReference,
        tx.providerReference || '',
        tx.customerName,
        tx.customerId,
        tx.policyNumber,
        tx.productName,
        tx.amountETB,
        tx.currency,
        tx.paymentStatus,
        tx.verificationStatus,
        tx.verifiedAt || '',
        tx.createdAt
      ]
        .map(escapeCsvCell)
        .join(',')
    );
    const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\n');
    const dateStamp = new Date().toISOString().split('T')[0];
    triggerDownloadFile(csvContent, `oic-transactions-${dateStamp}.csv`, 'text/csv;charset=utf-8;');

    store.logAudit({
      actorUid: currentUser?.uid || 'SYSTEM',
      actorName: currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'Staff',
      actorRole: currentRole,
      action: 'FINANCE_DATA_EXPORTED',
      resourceType: 'payment',
      resourceId: `CSV-${dateStamp}`,
      reason: `Exported ${filteredTransactions.length} transaction records as CSV`,
      correlationId: `EXP-CSV-${Date.now()}`
    });
    setTxExportFeedback(`Exported ${filteredTransactions.length} transactions to CSV.`);
    setTimeout(() => setTxExportFeedback(null), 3000);
  };

  const handleExportTransactionsJson = () => {
    const dateStamp = new Date().toISOString().split('T')[0];
    const payload = {
      exportedAt: new Date().toISOString(),
      exportedBy: currentUser?.email || currentRole,
      role: currentRole,
      totalRecords: filteredTransactions.length,
      paidTotalETB: filteredPaidTotalETB,
      transactions: filteredTransactions
    };
    triggerDownloadFile(
      JSON.stringify(payload, null, 2),
      `oic-transactions-${dateStamp}.json`,
      'application/json;charset=utf-8;'
    );

    store.logAudit({
      actorUid: currentUser?.uid || 'SYSTEM',
      actorName: currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'Staff',
      actorRole: currentRole,
      action: 'FINANCE_DATA_EXPORTED',
      resourceType: 'payment',
      resourceId: `JSON-${dateStamp}`,
      reason: `Exported ${filteredTransactions.length} transaction records as JSON`,
      correlationId: `EXP-JSON-${Date.now()}`
    });
    setTxExportFeedback(`Exported ${filteredTransactions.length} transactions to JSON.`);
    setTimeout(() => setTxExportFeedback(null), 3000);
  };

  const handleExportPoliciesCsv = () => {
    const headers = [
      'Policy Number',
      'Verification Code',
      'Customer Name',
      'Product',
      'Insured Subject',
      'Premium (ETB)',
      'Start Date',
      'Expiry Date',
      'Status'
    ];
    const rows = policies.map((p) =>
      [
        p.policyNumber,
        p.verificationCode,
        p.customerName,
        p.productName,
        p.insuredSubject,
        p.totalPremiumETB,
        p.startDate,
        p.expiryDate,
        p.policyStatus
      ]
        .map(escapeCsvCell)
        .join(',')
    );
    const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\n');
    const dateStamp = new Date().toISOString().split('T')[0];
    triggerDownloadFile(csvContent, `oic-policies-register-${dateStamp}.csv`, 'text/csv;charset=utf-8;');

    store.logAudit({
      actorUid: currentUser?.uid || 'SYSTEM',
      actorName: currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'Staff',
      actorRole: currentRole,
      action: 'POLICIES_EXPORTED_CSV',
      resourceType: 'policy',
      resourceId: `POL-CSV-${dateStamp}`,
      reason: `Exported ${policies.length} policies as CSV`,
      correlationId: `POL-EXP-${Date.now()}`
    });
  };

  const handleSendTestEmail = (template: EmailTemplate) => {
    store.enqueueEmailJob({
      emailJobId: `EML-TEST-${Date.now()}`,
      eventId: `EVT-TEST-${Date.now()}`,
      recipient: testEmailRecipient,
      recipientName: 'Valued Client',
      templateId: template.templateId,
      category: template.category,
      subject: template.subject.replace('{{customerName}}', 'Valued Client').replace('{{policyNumber}}', 'OIC/NLF/2026/004812'),
      scheduledAt: new Date().toISOString(),
      status: 'delivered',
      attemptCount: 1,
      deliveredAt: new Date().toISOString(),
      providerMessageId: `oic_mail_tx_${Date.now()}`,
      createdAt: new Date().toISOString()
    });

    setTestEmailFeedback(`Test email dispatched using template "${template.templateName}" to ${testEmailRecipient}`);
    setTimeout(() => setTestEmailFeedback(null), 2500);
  };

  const filteredCustomers = customers.filter((c) =>
    c.personalInformation.fullName.toLowerCase().includes(crmSearch.toLowerCase()) ||
    c.customerNumber.toLowerCase().includes(crmSearch.toLowerCase()) ||
    c.contactInformation.primaryPhone.includes(crmSearch)
  );

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-x-hidden">
      {/* Role-Aware Persistent Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-[#022b2d] to-[#005254] text-slate-200 flex flex-col justify-between shrink-0 hidden md:flex border-r border-[#006B6E]/40">
        <div>
          {/* Workspace Title */}
          <div className="p-5 border-b border-white/10 flex items-center gap-3">
            <img
              src="/assets/oic/oic_logo.png"
              alt="Oromia Insurance S.C."
              className="w-9 h-9 rounded-lg object-contain bg-white p-1 shrink-0 shadow"
            />
            <div>
              <h2 className="text-sm font-bold text-white leading-tight">
                {isFinance ? 'Finance Ledger' : isOperator ? 'Operator Console' : 'OIC Control Centre'}
              </h2>
              <span className="text-[11px] text-[#9ad864] font-mono">
                {isFinance ? 'Treasury & Reconciliation' : isOperator ? 'Branch Operations' : 'Oromia Insurance S.C.'}
              </span>
            </div>
          </div>

          <nav className="p-3 space-y-1 text-xs font-medium">
            {allowedTabs.includes('overview') && (
              <button
                onClick={() => { setActiveTab('overview'); setIsEditingProduct(false); }}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'overview' ? 'bg-[#7DC242] text-[#022b2d] font-bold shadow-sm' : 'hover:bg-[#006B6E]/70 text-slate-200'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Executive Overview</span>
              </button>
            )}

            {allowedTabs.includes('content') && (
              <button
                onClick={() => { setActiveTab('content'); setIsEditingProduct(false); }}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'content' ? 'bg-[#7DC242] text-[#022b2d] font-bold shadow-sm' : 'hover:bg-[#006B6E]/70 text-slate-200'
                }`}
              >
                <Globe className="w-4 h-4" />
                <span>Website Content & CMS</span>
              </button>
            )}

            {allowedTabs.includes('subscribers') && (
              <button
                onClick={() => { setActiveTab('subscribers'); setIsEditingProduct(false); }}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'subscribers' ? 'bg-[#7DC242] text-[#022b2d] font-bold shadow-sm' : 'hover:bg-[#006B6E]/70 text-slate-200'
                }`}
              >
                <Mail className="w-4 h-4" />
                <span>Newsletter Subscribers ({subscribers.length})</span>
              </button>
            )}

            {allowedTabs.includes('documents') && (
              <button
                onClick={() => { setActiveTab('documents'); setIsEditingProduct(false); setIsEditingDoc(false); }}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'documents' ? 'bg-[#7DC242] text-[#022b2d] font-bold shadow-sm' : 'hover:bg-[#006B6E]/70 text-slate-200'
                }`}
              >
                <FileCheck2 className="w-4 h-4" />
                <span>Publications & Docs ({adminDocs.length})</span>
              </button>
            )}

            {allowedTabs.includes('products') && (
              <button
                onClick={() => { setActiveTab('products'); setIsEditingProduct(false); }}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'products' ? 'bg-[#7DC242] text-[#022b2d] font-bold shadow-sm' : 'hover:bg-[#006B6E]/70 text-slate-200'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Product CMS ({products.length})</span>
              </button>
            )}

            {allowedTabs.includes('customers') && (
              <button
                onClick={() => { setActiveTab('customers'); setIsEditingProduct(false); }}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'customers' ? 'bg-[#7DC242] text-[#022b2d] font-bold shadow-sm' : 'hover:bg-[#006B6E]/70 text-slate-200'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Customer CRM (360)</span>
              </button>
            )}

            {allowedTabs.includes('operators') && (
              <button
                onClick={() => { setActiveTab('operators'); setIsEditingProduct(false); }}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'operators' ? 'bg-[#7DC242] text-[#022b2d] font-bold shadow-sm' : 'hover:bg-[#006B6E]/70 text-slate-200'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>Staff & Operators ({operators.length + staffMembers.length})</span>
              </button>
            )}

            {allowedTabs.includes('branches') && (
              <button
                onClick={() => { setActiveTab('branches'); setIsEditingProduct(false); }}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'branches' ? 'bg-[#7DC242] text-[#022b2d] font-bold shadow-sm' : 'hover:bg-[#006B6E]/70 text-slate-200'
                }`}
              >
                <Building className="w-4 h-4" />
                <span>Branches & Directorates ({branches.length})</span>
              </button>
            )}

            {allowedTabs.includes('agents_brokers') && (
              <button
                onClick={() => { setActiveTab('agents_brokers'); setIsEditingProduct(false); }}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'agents_brokers' ? 'bg-[#7DC242] text-[#022b2d] font-bold shadow-sm' : 'hover:bg-[#006B6E]/70 text-slate-200'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Agents & Brokers ({agents.length + brokers.length})</span>
              </button>
            )}

            {allowedTabs.includes('claims') && (
              <button
                onClick={() => { setActiveTab('claims'); setIsEditingProduct(false); }}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'claims' ? 'bg-[#7DC242] text-[#022b2d] font-bold shadow-sm' : 'hover:bg-[#006B6E]/70 text-slate-200'
                }`}
              >
                <AlertCircle className="w-4 h-4" />
                <span>Claims Oversight ({claims.length})</span>
              </button>
            )}

            {allowedTabs.includes('policies') && (
              <button
                onClick={() => { setActiveTab('policies'); setIsEditingProduct(false); }}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'policies' ? 'bg-[#7DC242] text-[#022b2d] font-bold shadow-sm' : 'hover:bg-[#006B6E]/70 text-slate-200'
                }`}
              >
                <FileCheck className="w-4 h-4" />
                <span>E-Policy Registry {isFinance ? '(Read-Only)' : '& Verifications'}</span>
              </button>
            )}

            {allowedTabs.includes('payments') && (
              <button
                onClick={() => { setActiveTab('payments'); setIsEditingProduct(false); }}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'payments' ? 'bg-[#7DC242] text-[#022b2d] font-bold shadow-sm' : 'hover:bg-[#006B6E]/70 text-slate-200'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>{isFinance ? 'Paid Transactions & Export' : 'Chapa V2 Gateway'}</span>
              </button>
            )}

            {allowedTabs.includes('reports') && (
              <button
                onClick={() => { setActiveTab('reports'); setIsEditingProduct(false); }}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'reports' ? 'bg-[#7DC242] text-[#022b2d] font-bold shadow-sm' : 'hover:bg-[#006B6E]/70 text-slate-200'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Executive Reports ({reports.length})</span>
              </button>
            )}

            {allowedTabs.includes('emails') && (
              <button
                onClick={() => { setActiveTab('emails'); setIsEditingProduct(false); }}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'emails' ? 'bg-[#7DC242] text-[#022b2d] font-bold shadow-sm' : 'hover:bg-[#006B6E]/70 text-slate-200'
                }`}
              >
                <Mail className="w-4 h-4" />
                <span>Email & Automation</span>
              </button>
            )}

            {allowedTabs.includes('audit') && (
              <button
                onClick={() => { setActiveTab('audit'); setIsEditingProduct(false); }}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'audit' ? 'bg-[#7DC242] text-[#022b2d] font-bold shadow-sm' : 'hover:bg-[#006B6E]/70 text-slate-200'
                }`}
              >
                <History className="w-4 h-4" />
                <span>Immutable Audit Logs</span>
              </button>
            )}

            <div className="pt-3 mt-3 border-t border-white/15 space-y-1">
              <div className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-300">
                Documentation
              </div>
              <button
                onClick={() => { setActiveTab('guide'); setIsEditingProduct(false); setIsEditingDoc(false); }}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'guide' ? 'bg-[#7DC242] text-[#022b2d] font-bold shadow-sm' : 'hover:bg-[#006B6E]/70 text-slate-200'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Platform Guide</span>
              </button>
            </div>
          </nav>
        </div>

        <div className="p-4 border-t border-white/10 text-xs text-slate-200">
          <div className="text-white font-semibold capitalize">
            {currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'Administrator'}
          </div>
          <div className="text-[11px] font-mono text-[#9ad864] uppercase">
            Role: {currentRole.replace('_', ' ')} · NBE Audit
          </div>
        </div>
      </aside>

      {/* Main Viewport */}
      <main className="flex-1 min-w-0 p-3 sm:p-6 lg:p-10 max-w-6xl mx-auto space-y-4 sm:space-y-8 overflow-y-auto overflow-x-hidden">
        {/* Mobile Navigation Bar */}
        <div className="md:hidden -mx-3 px-3 pb-2.5 border-b border-slate-200 flex items-center gap-1.5 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'content', label: 'CMS' },
            { id: 'documents', label: `Docs (${adminDocs.length})` },
            { id: 'subscribers', label: `Subscribers (${subscribers.length})` },
            { id: 'products', label: `Products (${products.length})` },
            { id: 'customers', label: `Customers (${customers.length})` },
            { id: 'operators', label: `Staff (${operators.length + staffMembers.length})` },
            { id: 'branches', label: `Branches (${branches.length})` },
            { id: 'agents_brokers', label: `Partners (${agents.length + brokers.length})` },
            { id: 'claims', label: `Claims (${claims.length})` },
            { id: 'policies', label: isFinance ? 'Policies (Read-Only)' : 'E-Policies' },
            { id: 'payments', label: isFinance ? 'Paid Transactions' : 'Chapa' },
            { id: 'reports', label: 'Reports' },
            { id: 'emails', label: 'Emails' },
            { id: 'audit', label: 'Audit' },
            { id: 'guide', label: 'Guide' }
          ]
            .filter((t) => allowedTabs.includes(t.id as AdminTab))
            .map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id as AdminTab);
                  setIsEditingProduct(false);
                  setIsEditingDoc(false);
                }}
                className={`shrink-0 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === tab.id
                    ? 'bg-[#006B6E] text-white'
                    : 'bg-white border border-slate-200 text-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#006B6E] uppercase tracking-wider">
              <span>
                {isFinance
                  ? 'Finance & Treasury Operations'
                  : isOperator
                  ? 'Operator Control Workspace'
                  : 'Oromia Insurance S.C. Executive System Control'}
              </span>
              <span aria-hidden="true">·</span>
              <span>Headquarters (Lideya Plaza)</span>
            </div>
            <h1 className="text-xl sm:text-3xl font-bold text-slate-900 mt-1">
              Oromia Insurance S.C. Operations Centre
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {activeTab === 'documents' && canEditOperations && (
              <button
                onClick={handleCreateNewDoc}
                className="bg-[#006B6E] hover:bg-[#005254] text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors flex items-center gap-2 shadow-sm shrink-0 self-start sm:self-auto cursor-pointer"
              >
                <Plus className="w-4 h-4 text-[#9ad864]" />
                <span>Upload / Register Document</span>
              </button>
            )}

            {activeTab === 'products' && canEditOperations && (
              <button
                onClick={handleCreateNewProduct}
                className="bg-[#006B6E] hover:bg-[#005254] text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors flex items-center gap-2 shadow-sm shrink-0 self-start sm:self-auto cursor-pointer"
              >
                <Plus className="w-4 h-4 text-[#9ad864]" />
                <span>Add Insurance Product</span>
              </button>
            )}

            {activeTab === 'operators' && canOnboardEmployees && (
              <button
                type="button"
                onClick={() => setShowOnboardForm(!showOnboardForm)}
                className="bg-[#006B6E] hover:bg-[#005254] text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors flex items-center gap-2 shadow-sm shrink-0 self-start sm:self-auto cursor-pointer"
              >
                <UserPlus className="w-4 h-4 text-[#9ad864]" />
                <span>{showOnboardForm ? 'Close Onboarding Form' : 'Onboard New Employee'}</span>
              </button>
            )}

            {activeTab === 'branches' && canOnboardEmployees && (
              <button
                type="button"
                onClick={() => setShowNewBranchForm(!showNewBranchForm)}
                className="bg-[#006B6E] hover:bg-[#005254] text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors flex items-center gap-2 shadow-sm shrink-0 self-start sm:self-auto cursor-pointer"
              >
                <Plus className="w-4 h-4 text-[#9ad864]" />
                <span>{showNewBranchForm ? 'Close Branch Form' : 'Add Branch Office'}</span>
              </button>
            )}
          </div>
        </div>

        <div key={activeTab} className="oic-view-transition space-y-4 sm:space-y-8">
        {/* TAB 1: OVERVIEW & REAL DATABASE METRICS */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              <div className="relative overflow-hidden bg-white border border-slate-200/90 hover:border-[#006B6E]/35 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all">
                <span className="absolute inset-x-0 top-0 h-1 bg-[#006B6E]" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#006B6E]/80 block">
                  Registered Customers
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 tabular-nums mt-1.5">
                  {totalCustomers.toLocaleString()}
                </div>
                <span className="text-xs text-slate-600 font-medium block mt-1.5">
                  Synced with Firestore customers
                </span>
              </div>

              <div className="relative overflow-hidden bg-white border border-slate-200/90 hover:border-[#7DC242]/50 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all">
                <span className="absolute inset-x-0 top-0 h-1 bg-[#7DC242]" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#5f9e2b] block">
                  Active Issued Policies
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#006B6E] tabular-nums mt-1.5">
                  {activePoliciesCount.toLocaleString()}
                </div>
                <span className="text-xs text-emerald-700 font-semibold block mt-1.5">
                  100% Verifiable SHA-256
                </span>
              </div>

              <div className="relative overflow-hidden bg-white border border-slate-200/90 hover:border-[#006B6E]/35 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all">
                <span className="absolute inset-x-0 top-0 h-1 bg-[#006B6E]" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#006B6E]/80 block">
                  Gross Issued Premium
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 tabular-nums mt-1.5">
                  ETB {grossPremiumETB.toLocaleString()}
                </div>
                <span className="text-xs text-slate-600 font-medium block mt-1.5">
                  Settled via Chapa V2
                </span>
              </div>

              <div className="relative overflow-hidden bg-white border border-slate-200/90 hover:border-amber-400/50 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all">
                <span className="absolute inset-x-0 top-0 h-1 bg-amber-500" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 block">
                  Underwriting Backlog
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 tabular-nums mt-1.5">
                  {pendingUnderwritingCount.toLocaleString()}
                </div>
                <span className="text-xs text-amber-700 font-medium block mt-1.5">
                  Awaiting directorate review
                </span>
              </div>
            </div>

            {/* Quick Status of Payment and Verification Pipelines */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-3 text-xs">
                <h3 className="text-sm font-bold text-[#006B6E] uppercase tracking-wider">
                  Payment Gateway Integration Health
                </h3>
                <div className="space-y-2 text-slate-600">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span>Provider:</span>
                    <strong className="text-slate-900">Chapa (V2 REST Integration)</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span>Server Verification:</span>
                    <span className="text-emerald-700 font-semibold">Operational (Independent Server-to-Server)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span>Currencies Supported:</span>
                    <span className="font-semibold text-slate-900">ETB (Ethiopian Birr)</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Total Payment Attempts:</span>
                    <span className="font-bold text-slate-900 tabular-nums">{paymentAttempts.length}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-3 text-xs">
                <h3 className="text-sm font-bold text-[#006B6E] uppercase tracking-wider">
                  Email Delivery &amp; Automation Outbox
                </h3>
                <div className="space-y-2 text-slate-600">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span>Delivery Adapter:</span>
                    <strong className="text-slate-900">Dedicated Transactional Provider Adapter</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span>Renewal Cadence:</span>
                    <span className="font-semibold text-slate-900 tabular-nums">30d, 14d, 7d, Expiry Day</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span>Promotional Campaigns:</span>
                    <span className="text-slate-900">4-Month Interval (Consent Enforced)</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Delivered Jobs:</span>
                    <span className="font-bold text-slate-900 tabular-nums">{totalEmailsSent}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 1.5: WEBSITE CONTENT & CMS MANAGER */}
        {activeTab === 'content' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {contentSavedFeedback && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs font-semibold flex items-center gap-2 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{contentSavedFeedback}</span>
              </div>
            )}

            {/* Content Edit Form */}
            <form onSubmit={handleSaveContentConfig} className="space-y-8">
              {/* Card 1: Corporate Identity & Slogans */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs font-semibold text-[#006B6E] uppercase tracking-wider">Brand &amp; Messaging</span>
                    <h3 className="text-lg font-bold text-slate-900 mt-0.5">Corporate Identity &amp; Official Slogans</h3>
                  </div>
                  <Globe className="w-5 h-5 text-[#7DC242]" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Corporate Slogan / Motto (English)</label>
                    <input
                      type="text"
                      required
                      value={contentConfig.motto}
                      onChange={(e) => setContentConfig({ ...contentConfig, motto: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-medium focus:bg-white focus:outline-none focus:border-[#006B6E]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Corporate Slogan / Motto (Amharic)</label>
                    <input
                      type="text"
                      required
                      value={contentConfig.mottoAmharic}
                      onChange={(e) => setContentConfig({ ...contentConfig, mottoAmharic: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-medium focus:bg-white focus:outline-none focus:border-[#006B6E]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-slate-700 mb-1">Vision Statement</label>
                    <textarea
                      rows={2}
                      required
                      value={contentConfig.vision}
                      onChange={(e) => setContentConfig({ ...contentConfig, vision: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:bg-white focus:outline-none focus:border-[#006B6E]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-slate-700 mb-1">Mission Statement</label>
                    <textarea
                      rows={2}
                      required
                      value={contentConfig.mission}
                      onChange={(e) => setContentConfig({ ...contentConfig, mission: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:bg-white focus:outline-none focus:border-[#006B6E]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-slate-700 mb-1">Capital &amp; Solvency Milestone Text</label>
                    <input
                      type="text"
                      required
                      value={contentConfig.capitalNotice}
                      onChange={(e) => setContentConfig({ ...contentConfig, capitalNotice: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-medium focus:bg-white focus:outline-none focus:border-[#006B6E]"
                    />
                  </div>
                </div>
              </div>

              {/* Card 2: Contact, Switchboard & Emergency Helpline */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs font-semibold text-[#006B6E] uppercase tracking-wider">Communication Channels</span>
                    <h3 className="text-lg font-bold text-slate-900 mt-0.5">Headquarters &amp; Emergency Helplines</h3>
                  </div>
                  <Phone className="w-5 h-5 text-[#7DC242]" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Head Office Switchboards</label>
                    <input
                      type="text"
                      required
                      value={contentConfig.headOfficePhone}
                      onChange={(e) => setContentConfig({ ...contentConfig, headOfficePhone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 font-medium text-slate-900 tabular-nums focus:bg-white focus:outline-none focus:border-[#006B6E]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Official Contact Email</label>
                    <input
                      type="email"
                      required
                      value={contentConfig.headOfficeEmail}
                      onChange={(e) => setContentConfig({ ...contentConfig, headOfficeEmail: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 font-medium text-slate-900 focus:bg-white focus:outline-none focus:border-[#006B6E]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">24/7 Claims Emergency Line</label>
                    <input
                      type="text"
                      required
                      value={contentConfig.emergencyHelpline}
                      onChange={(e) => setContentConfig({ ...contentConfig, emergencyHelpline: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 font-medium text-slate-900 tabular-nums focus:bg-white focus:outline-none focus:border-[#006B6E]"
                    />
                  </div>
                </div>
              </div>

              {/* Submit / Save Bar */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-slate-500">
                  Updates take effect across all public views immediately upon saving.
                </span>
                <button
                  type="submit"
                  className="bg-[#006B6E] hover:bg-[#005254] text-white px-6 py-2.5 rounded-xl font-semibold text-xs tracking-tight transition-all flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 text-[#9ad864]" />
                  <span>Save Website Content Updates</span>
                </button>
              </div>
            </form>

            {/* Card 3: Publish & Onboard News Articles and Announcements */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-semibold text-[#006B6E] uppercase tracking-wider">Newsroom Onboarding</span>
                  <h3 className="text-lg font-bold text-slate-900 mt-0.5">Publish New Corporate Press Release or Milestone</h3>
                  <p className="text-xs text-slate-500">Articles published here appear immediately in the About Us and Media newsrooms.</p>
                </div>
                <Newspaper className="w-5 h-5 text-[#7DC242]" />
              </div>

              <form onSubmit={handleAddNewsArticle} className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">Article Title / Headline</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Oromia Insurance Expands Branch & Digital Claims Service in Finfinne"
                    value={newArticle.title}
                    onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:bg-white focus:outline-none focus:border-[#006B6E]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category &amp; Tag</label>
                  <select
                    value={newArticle.category}
                    onChange={(e) => setNewArticle({ ...newArticle, category: e.target.value, tag: e.target.value === 'announcements' ? 'Corporate Announcement' : 'Corporate News' })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:bg-white focus:outline-none focus:border-[#006B6E]"
                  >
                    <option value="news">Corporate News</option>
                    <option value="announcements">Announcement / Tender</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">Cover Image Asset</label>
                  <select
                    value={newArticle.image}
                    onChange={(e) => setNewArticle({ ...newArticle, image: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:bg-white focus:outline-none focus:border-[#006B6E]"
                  >
                    <option value="/assets/oic/hero_homepage.png">Lideya Plaza Head Office (Finfinne)</option>
                    <option value="/assets/oic/cat_non_life.jpg">General Non-Life &amp; Commercial Coverage</option>
                    <option value="/assets/oic/hero_motor.jpg">Motor &amp; Fleet Logistics</option>
                    <option value="/assets/oic/hero_life.jpg">Life &amp; Family Medical Protection</option>
                    <option value="/assets/oic/hero_crop.jpg">Agriculture &amp; Microinsurance Outreach</option>
                    <option value="/assets/oic/cat_takaful.jpg">Halal Takaful Window</option>
                    <option value="/assets/oic/news_amhara_payout.jpg">Corporate Claims Settlement Milestone</option>
                    <option value="/assets/oic/news_deborah.jpg">Community &amp; CSR Partnership</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <label className="flex items-center gap-2 font-semibold text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newArticle.isFeatured}
                      onChange={(e) => setNewArticle({ ...newArticle, isFeatured: e.target.checked })}
                      className="w-4 h-4 text-[#006B6E] rounded border-slate-300 focus:ring-[#006B6E]"
                    />
                    <span>Set as Top Hero Story</span>
                  </label>
                </div>

                <div className="sm:col-span-3">
                  <label className="block font-semibold text-slate-700 mb-1">Full Summary / Body Text</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Enter comprehensive announcement details, resolutions, or public disclosure text..."
                    value={newArticle.summary}
                    onChange={(e) => setNewArticle({ ...newArticle, summary: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:bg-white focus:outline-none focus:border-[#006B6E] leading-relaxed"
                  />
                </div>

                <div className="sm:col-span-3 flex justify-end">
                  <button
                    type="submit"
                    className="bg-[#006B6E] hover:bg-[#005254] text-white px-5 py-2.5 rounded-xl font-semibold text-xs tracking-tight transition-all flex items-center gap-2 shadow-sm cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#9ad864]" />
                    <span>Publish Article</span>
                  </button>
                </div>
              </form>

              {/* Published Articles List with Hero Indicator */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Active News &amp; Announcements on Website ({newsList.length})
                </h4>
                <div className="space-y-2">
                  {newsList.map((article: NewsArticle) => (
                    <div key={article.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        {article.image && (
                          <img
                            src={article.image}
                            alt=""
                            className="w-16 h-12 rounded-lg object-cover border border-slate-200 shrink-0 mt-0.5"
                          />
                        )}
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            {article.isFeatured && (
                              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                                Top Hero Story
                              </span>
                            )}
                            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-teal-100 text-[#006B6E]">
                              {article.tag || article.category}
                            </span>
                            <span className="text-[11px] font-semibold text-slate-400 tabular-nums">{article.date}</span>
                          </div>
                          <h5 className="text-xs font-bold text-slate-900">{article.title}</h5>
                          <p className="text-xs text-slate-600 line-clamp-2">{article.summary}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {!article.isFeatured && (
                          <button
                            onClick={() => {
                              store.setFeaturedNewsArticle(article.id);
                              setNewsList(store.getNews());
                            }}
                            className="text-xs text-[#006B6E] hover:text-[#005254] font-semibold px-2 py-1 rounded hover:bg-slate-200 transition-colors cursor-pointer"
                          >
                            Make Hero
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteNewsArticle(article.id)}
                          className="text-xs text-rose-600 hover:text-rose-800 px-2.5 py-1 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: NEWSLETTER SUBSCRIBERS MANAGEMENT */}
        {activeTab === 'subscribers' && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#006B6E] uppercase tracking-wider">
                    <Mail className="w-4 h-4 text-[#7DC242]" />
                    <span>Audience Engagement</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mt-1">
                    OIC Corporate Gazette &amp; Newsletter Subscribers ({subscribers.length})
                  </h3>
                  <p className="text-xs text-slate-500">
                    Real-time database of clients and corporate stakeholders subscribed via footer or customer portal.
                  </p>
                </div>

                {/* Manual Add Subscriber */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!newManualSubEmail) return;
                    store.addSubscriber(newManualSubEmail, newManualSubName || undefined, 'weekly', 'admin_manual');
                    setNewManualSubEmail('');
                    setNewManualSubName('');
                  }}
                  className="flex flex-col sm:flex-row items-center gap-2"
                >
                  <input
                    type="text"
                    placeholder="Full Name (opt)"
                    value={newManualSubName}
                    onChange={(e) => setNewManualSubName(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#006B6E] w-full sm:w-36"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Enter email to add"
                    value={newManualSubEmail}
                    onChange={(e) => setNewManualSubEmail(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#006B6E] w-full sm:w-48"
                  />
                  <button
                    type="submit"
                    className="bg-[#006B6E] hover:bg-[#005254] text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm shrink-0 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#9ad864]" />
                    <span>Add</span>
                  </button>
                </form>
              </div>

              {/* Search & Metrics */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={subscriberSearch}
                    onChange={(e) => setSubscriberSearch(e.target.value)}
                    placeholder="Search by email, name, or source..."
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:border-[#006B6E]"
                  />
                </div>

                <div className="flex items-center gap-3 text-xs font-mono text-slate-500">
                  <span>Active: <strong className="text-emerald-700">{subscribers.filter(s => s.status === 'active').length}</strong></span>
                  <span>·</span>
                  <span>Unsubscribed: <strong className="text-slate-700">{subscribers.filter(s => s.status === 'unsubscribed').length}</strong></span>
                </div>
              </div>

              {/* Table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="p-3">ID</th>
                      <th className="p-3">Subscriber Email</th>
                      <th className="p-3">Name</th>
                      <th className="p-3">Frequency</th>
                      <th className="p-3">Source</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Subscribed Date</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {subscribers
                      .filter(s =>
                        s.email.toLowerCase().includes(subscriberSearch.toLowerCase()) ||
                        (s.fullName && s.fullName.toLowerCase().includes(subscriberSearch.toLowerCase())) ||
                        s.source.includes(subscriberSearch.toLowerCase())
                      ).length === 0 ? (
                      <tr>
                        <td colSpan={8} className="p-6 text-center text-slate-500">
                          No newsletter subscribers recorded yet.
                        </td>
                      </tr>
                    ) : (
                      subscribers
                        .filter(s =>
                          s.email.toLowerCase().includes(subscriberSearch.toLowerCase()) ||
                          (s.fullName && s.fullName.toLowerCase().includes(subscriberSearch.toLowerCase())) ||
                          s.source.includes(subscriberSearch.toLowerCase())
                        )
                        .map((sub) => (
                          <tr key={sub.subscriberId} className="hover:bg-slate-50">
                            <td className="p-3 font-mono text-slate-500">{sub.subscriberId}</td>
                            <td className="p-3 font-semibold text-slate-900">{sub.email}</td>
                            <td className="p-3 text-slate-700">{sub.fullName || '—'}</td>
                            <td className="p-3">
                              <span className="capitalize px-2 py-0.5 rounded bg-slate-100 font-medium text-slate-700">
                                {sub.frequency.replace('_', ' ')}
                              </span>
                            </td>
                            <td className="p-3 font-mono text-[11px] text-slate-500">{sub.source}</td>
                            <td className="p-3">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                sub.status === 'active'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-slate-100 text-slate-500'
                              }`}>
                                {sub.status}
                              </span>
                            </td>
                            <td className="p-3 text-slate-400 font-mono text-[11px]">
                              {new Date(sub.subscribedAt).toLocaleDateString()}
                            </td>
                            <td className="p-3 text-right space-x-2">
                              {sub.status === 'active' ? (
                                <button
                                  onClick={() => store.updateSubscriberStatus(sub.subscriberId, 'unsubscribed')}
                                  className="text-[11px] text-amber-700 hover:underline cursor-pointer"
                                >
                                  Pause
                                </button>
                              ) : (
                                <button
                                  onClick={() => store.updateSubscriberStatus(sub.subscriberId, 'active')}
                                  className="text-[11px] text-emerald-700 hover:underline cursor-pointer"
                                >
                                  Activate
                                </button>
                              )}
                              <button
                                onClick={() => store.deleteSubscriber(sub.subscriberId)}
                                className="text-[11px] text-rose-600 hover:underline cursor-pointer"
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCT CMS & VERSIONING */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            {productSavedFeedback && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{productSavedFeedback}</span>
              </div>
            )}

            {isEditingProduct && editingProduct ? (
              /* PRODUCT EDIT FORM */
              <form onSubmit={handleSaveProduct} className="bg-white border border-slate-300 rounded-2xl p-6 sm:p-8 space-y-6 text-xs">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <h3 className="text-base font-bold text-[#006B6E]">
                    Configure Insurance Product: {editingProduct.productName}
                  </h3>
                  <button
                    type="button"
                    onClick={() => { setIsEditingProduct(false); setEditingProduct(null); }}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-slate-700 mb-1">Product Commercial Name</label>
                    <input
                      type="text"
                      required
                      value={editingProduct.productName || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, productName: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Business Line</label>
                    <select
                      value={editingProduct.productCategory || 'non_life'}
                      onChange={(e) => setEditingProduct({ ...editingProduct, productCategory: e.target.value as InsuranceBusinessLine })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900"
                    >
                      <option value="non_life">General Insurance (Non-Life)</option>
                      <option value="life_health">Life &amp; Health Insurance</option>
                      <option value="agri_micro">Agriculture &amp; Microinsurance</option>
                      <option value="halal_takaful">Halal Takaful Insurance</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Customer-Facing Summary Description</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.shortDescription || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, shortDescription: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Full Detailed Description</label>
                  <textarea
                    rows={3}
                    value={editingProduct.fullDescription || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, fullDescription: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900"
                  />
                </div>

                {/* Official Regulatory & Policy Disclaimer Input */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-1">
                  <label className="block font-semibold text-[#006B6E]">Official Regulatory &amp; Policy Disclaimer</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.disclaimer || 'Official Oromia Insurance S.C. Policy Schedule · Regulated by the National Bank of Ethiopia'}
                    onChange={(e) => setEditingProduct({ ...editingProduct, disclaimer: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-slate-900 font-semibold"
                  />
                  <span className="text-[10px] text-slate-600">Displayed on policy schedules and underwriting disclosures.</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Standard Min Premium (ETB)</label>
                    <input
                      type="number"
                      value={editingProduct.quotationConfiguration?.standardMinimumPremiumETB || 3000}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          quotationConfiguration: {
                            ...editingProduct.quotationConfiguration!,
                            standardMinimumPremiumETB: parseFloat(e.target.value) || 0
                          }
                        })
                      }
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 font-bold text-slate-900 tabular-nums"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Publication Status</label>
                    <select
                      value={editingProduct.publicStatus || 'draft'}
                      onChange={(e) => setEditingProduct({ ...editingProduct, publicStatus: e.target.value as InsuranceProduct['publicStatus'] })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-semibold"
                    >
                      <option value="draft">Draft (Private)</option>
                      <option value="submitted">Submitted for Approval</option>
                      <option value="published">Published (Live in Catalogue)</option>
                      <option value="inactive">Inactive</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Availability Channel</label>
                    <select
                      value={editingProduct.availability || 'online_and_operator'}
                      onChange={(e) => setEditingProduct({ ...editingProduct, availability: e.target.value as InsuranceProduct['availability'] })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900"
                    >
                      <option value="online_and_operator">Online &amp; Operator Assisted</option>
                      <option value="operator_only">Operator Assisted Only</option>
                      <option value="restricted">Restricted Corporate</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => { setIsEditingProduct(false); setEditingProduct(null); }}
                    className="px-4 py-2 bg-slate-100 rounded-lg text-slate-700 font-semibold text-xs cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#006B6E] text-white rounded-lg font-semibold text-xs shadow-sm hover:bg-[#005254] cursor-pointer"
                  >
                    Save Product Configuration
                  </button>
                </div>
              </form>
            ) : (
              /* PRODUCTS LIST TABLE */
              <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#006B6E] uppercase tracking-wider">
                    Insurance Product Catalogue &amp; CMS
                  </h3>
                  <span className="text-xs font-semibold text-slate-500 tabular-nums">{products.length} Products Configured</span>
                </div>

                <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                      <tr>
                        <th className="p-3">Product Name</th>
                        <th className="p-3">Business Line</th>
                        <th className="p-3">Min Premium</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Version</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {products.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="p-6 text-center text-slate-500">
                            No insurance products configured yet.
                          </td>
                        </tr>
                      ) : (
                        products.map((p) => (
                          <tr key={p.productId} className="hover:bg-slate-50">
                            <td className="p-3 font-semibold text-slate-900">
                              <div>{p.productName}</div>
                              <span className="text-[10px] text-slate-400 font-mono">{p.productId}</span>
                            </td>
                            <td className="p-3 capitalize">{p.productCategory.replace('_', ' ')}</td>
                            <td className="p-3 font-bold text-slate-900 tabular-nums">
                              ETB {p.quotationConfiguration.standardMinimumPremiumETB.toLocaleString()}
                            </td>
                            <td className="p-3">
                              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded uppercase ${
                                p.publicStatus === 'published' ? 'bg-emerald-100 text-emerald-800' : p.publicStatus === 'archived' ? 'bg-rose-100 text-rose-800' : 'bg-slate-200 text-slate-700'
                              }`}>
                                {p.publicStatus}
                              </span>
                            </td>
                            <td className="p-3 font-semibold text-slate-700 tabular-nums">v{p.version}.0</td>
                            <td className="p-3 text-right space-x-2">
                              <button
                                onClick={() => { setEditingProduct(p); setIsEditingProduct(true); }}
                                className="text-[#006B6E] font-semibold hover:underline cursor-pointer"
                                title="Edit product"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDuplicateProduct(p)}
                                className="text-slate-600 font-semibold hover:underline cursor-pointer"
                                title="Duplicate as draft"
                              >
                                Duplicate
                              </button>
                              {p.publicStatus !== 'archived' && (
                                confirmArchiveProductId === p.productId ? (
                                  <span className="inline-flex items-center gap-1.5">
                                    <button
                                      type="button"
                                      onClick={() => handleArchiveProduct(p.productId)}
                                      className="bg-rose-600 text-white px-2 py-0.5 rounded text-[11px] font-semibold cursor-pointer"
                                    >
                                      Confirm
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => setConfirmArchiveProductId(null)}
                                      className="text-slate-500 hover:text-slate-700 text-[11px] font-semibold cursor-pointer"
                                    >
                                      Cancel
                                    </button>
                                  </span>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => setConfirmArchiveProductId(p.productId)}
                                    className="text-rose-600 font-semibold hover:underline cursor-pointer"
                                    title="Archive product"
                                  >
                                    Archive
                                  </button>
                                )
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: CUSTOMER CRM 360 */}
        {activeTab === 'customers' && (
          <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-[#006B6E] uppercase tracking-wider">
                  Customer Database, Onboarding &amp; KYC Control
                </h3>
                <p className="text-xs text-slate-500">Search customer profiles, verify KYC status, and manage account access.</p>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search customer, phone, ID..."
                  value={crmSearch}
                  onChange={(e) => setCrmSearch(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-xs pl-9 pr-3 py-2 rounded-lg"
                />
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-x-auto text-xs">
              <table className="w-full text-left min-w-[700px]">
                <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Customer ID</th>
                    <th className="p-3">Full Name</th>
                    <th className="p-3">Phone</th>
                    <th className="p-3">KYC Status</th>
                    <th className="p-3">Account Status</th>
                    <th className="p-3">Channel</th>
                    <th className="p-3 text-right">Admin Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredCustomers.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-6 text-center text-slate-500">
                        No registered customer profiles found.
                      </td>
                    </tr>
                  ) : (
                    filteredCustomers.map((c) => (
                      <tr key={c.customerId} className="hover:bg-slate-50">
                        <td className="p-3 font-mono font-semibold text-slate-900">{c.customerNumber}</td>
                        <td className="p-3 font-semibold text-slate-900">{c.personalInformation.fullName}</td>
                        <td className="p-3 font-medium text-slate-600 tabular-nums">{c.contactInformation.primaryPhone}</td>
                        <td className="p-3">
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded uppercase ${
                            c.identityVerificationStatus === 'verified'
                              ? 'bg-emerald-100 text-emerald-800'
                              : c.identityVerificationStatus === 'pending'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-slate-100 text-slate-700'
                          }`}>
                            {c.identityVerificationStatus}
                          </span>
                        </td>
                        <td className="p-3">
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded uppercase ${
                            c.accountStatus === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                          }`}>
                            {c.accountStatus}
                          </span>
                        </td>
                        <td className="p-3 capitalize">{c.registrationChannel.replace('_', ' ')}</td>
                        <td className="p-3 text-right space-x-2 whitespace-nowrap">
                          {c.identityVerificationStatus !== 'verified' && (
                            <button
                              type="button"
                              onClick={() => {
                                store.saveCustomer({ ...c, identityVerificationStatus: 'verified', updatedAt: new Date().toISOString() });
                                store.logAudit({
                                  actorUid: currentUser?.uid || 'OIC-ADMIN',
                                  actorName: currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'OIC Administrator',
                                  actorRole: currentRole,
                                  action: 'CUSTOMER_KYC_VERIFIED',
                                  resourceType: 'customer',
                                  resourceId: c.customerId,
                                  reason: `Verified KYC for ${c.personalInformation.fullName}`,
                                  correlationId: `KYC-${Date.now()}`
                                });
                              }}
                              className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-semibold px-2.5 py-1 rounded cursor-pointer"
                            >
                              Verify KYC
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => {
                              const nextStatus = c.accountStatus === 'active' ? 'suspended' : 'active';
                              store.saveCustomer({ ...c, accountStatus: nextStatus, updatedAt: new Date().toISOString() });
                            }}
                            className={`font-semibold px-2.5 py-1 rounded cursor-pointer ${
                              c.accountStatus === 'active'
                                ? 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                            }`}
                          >
                            {c.accountStatus === 'active' ? 'Suspend' : 'Activate'}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: EMPLOYEES & DIRECT-SALES OPERATORS (ONBOARDING ADMIN ONLY) */}
        {activeTab === 'operators' && (
          <div className="space-y-6">
            {employeeFeedback && (
              <div
                className={`p-4 rounded-xl text-xs font-semibold flex items-center gap-2 border ${
                  employeeFeedback.type === 'success'
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : 'bg-rose-50 border-rose-200 text-rose-900'
                }`}
              >
                {employeeFeedback.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                )}
                <span>{employeeFeedback.text}</span>
              </div>
            )}

            {!canOnboardEmployees && (
              <div className="p-4 bg-slate-100 border border-slate-300 rounded-xl text-xs text-slate-700 flex items-center gap-2.5">
                <Lock className="w-4 h-4 text-[#006B6E] shrink-0" />
                <span>
                  <strong>Administrator-Only Action:</strong> Your role ({currentRole}) has operational edit rights across customers, products, and policies, but cannot onboard or alter employee accounts.
                </span>
              </div>
            )}

            {canOnboardEmployees && showOnboardForm && (
              <form onSubmit={handleOnboardEmployee} className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 text-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h4 className="text-sm font-bold text-[#006B6E]">Onboard New OIC Employee</h4>
                    <p className="text-slate-500">Provision a Direct-Sales Operator, Finance Officer, Underwriter, Claims Officer, or Manager account.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowOnboardForm(false)}
                    className="text-slate-500 hover:text-slate-800 font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={employeeForm.name}
                      onChange={(e) => setEmployeeForm({ ...employeeForm, name: e.target.value })}
                      placeholder="e.g. Tolosa Bekele"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-base sm:text-xs text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Corporate Email *</label>
                    <input
                      type="email"
                      required
                      value={employeeForm.email}
                      onChange={(e) => setEmployeeForm({ ...employeeForm, email: e.target.value })}
                      placeholder="name@oromiainsurance.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-base sm:text-xs text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Phone Number *</label>
                    <input
                      type="text"
                      required
                      value={employeeForm.phone}
                      onChange={(e) => setEmployeeForm({ ...employeeForm, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-base sm:text-xs text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Employee Role *</label>
                    <select
                      value={employeeForm.role}
                      onChange={(e) => setEmployeeForm({ ...employeeForm, role: e.target.value as UserRole })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-base sm:text-xs text-slate-900 font-semibold"
                    >
                      <option value="operator">Direct-Sales Operator</option>
                      <option value="underwriter">Underwriting Officer</option>
                      <option value="claims_officer">Claims Officer</option>
                      <option value="finance">Finance Officer</option>
                      <option value="marketing">Marketing &amp; Comms Officer</option>
                      <option value="branch_manager">Branch Manager</option>
                      <option value="department_manager">Department Director</option>
                      <option value="executive">Executive Oversight</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Assigned Branch *</label>
                    <select
                      value={employeeForm.branchId}
                      onChange={(e) => setEmployeeForm({ ...employeeForm, branchId: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-base sm:text-xs text-slate-900"
                    >
                      {branches.map((b) => (
                        <option key={b.branchId} value={b.branchId}>
                          {b.branchId} — {b.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">HQ Directorate / Dept</label>
                    <select
                      value={employeeForm.departmentId}
                      onChange={(e) => setEmployeeForm({ ...employeeForm, departmentId: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-base sm:text-xs text-slate-900"
                    >
                      {departments.map((d) => (
                        <option key={d.departmentId} value={d.departmentId}>
                          {d.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="bg-[#006B6E] hover:bg-[#005254] text-white font-semibold px-5 py-2.5 rounded-lg cursor-pointer"
                  >
                    Create &amp; Activate Employee Record
                  </button>
                </div>
              </form>
            )}

            {/* Direct-Sales Operators Table */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#006B6E] uppercase tracking-wider">
                  Direct-Sales Operators ({operators.length})
                </h3>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-x-auto text-xs">
                <table className="w-full text-left min-w-[680px]">
                  <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Operator ID</th>
                      <th className="p-3">Operator Name</th>
                      <th className="p-3">Email</th>
                      <th className="p-3">Branch</th>
                      <th className="p-3">Training Status</th>
                      <th className="p-3">Account Status</th>
                      {canOnboardEmployees && <th className="p-3 text-right">Access Control</th>}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {operators.length === 0 ? (
                      <tr>
                        <td colSpan={canOnboardEmployees ? 7 : 6} className="p-6 text-center text-slate-500">
                          No direct-sales operators provisioned yet.
                        </td>
                      </tr>
                    ) : (
                      operators.map((op) => (
                        <tr key={op.operatorId} className="hover:bg-slate-50">
                          <td className="p-3 font-mono font-semibold text-slate-900">{op.operatorId}</td>
                          <td className="p-3 font-semibold text-slate-900">{op.name}</td>
                          <td className="p-3 font-mono text-slate-600">{op.email}</td>
                          <td className="p-3 font-mono">{op.branchId}</td>
                          <td className="p-3">
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded uppercase ${
                              op.trainingStatus === 'certified' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                            }`}>
                              {op.trainingStatus.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="p-3">
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded uppercase ${
                              op.accountStatus === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                            }`}>
                              {op.accountStatus}
                            </span>
                          </td>
                          {canOnboardEmployees && (
                            <td className="p-3 text-right">
                              <button
                                onClick={() => handleToggleOperator(op.operatorId, op.accountStatus)}
                                className={`text-xs font-semibold px-3 py-1 rounded transition-colors cursor-pointer ${
                                  op.accountStatus === 'active'
                                    ? 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                                    : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                                }`}
                              >
                                {op.accountStatus === 'active' ? 'Suspend Access' : 'Activate Access'}
                              </button>
                            </td>
                          )}
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Headquarters Staff & Finance Roster */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6 space-y-4">
              <h3 className="text-sm font-bold text-[#006B6E] uppercase tracking-wider">
                Internal Staff, Finance &amp; Underwriting Officers ({staffMembers.length})
              </h3>
              <div className="border border-slate-200 rounded-xl overflow-x-auto text-xs">
                <table className="w-full text-left min-w-[680px]">
                  <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Staff ID</th>
                      <th className="p-3">Full Name</th>
                      <th className="p-3">Email</th>
                      <th className="p-3">Role</th>
                      <th className="p-3">Branch</th>
                      <th className="p-3">Status</th>
                      {canOnboardEmployees && <th className="p-3 text-right">Access Control</th>}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {staffMembers.length === 0 ? (
                      <tr>
                        <td colSpan={canOnboardEmployees ? 7 : 6} className="p-6 text-center text-slate-500">
                          No internal staff records provisioned yet.
                        </td>
                      </tr>
                    ) : (
                      staffMembers.map((st) => (
                        <tr key={st.staffId} className="hover:bg-slate-50">
                          <td className="p-3 font-mono font-semibold text-slate-900">{st.staffId}</td>
                          <td className="p-3 font-semibold text-slate-900">{st.name}</td>
                          <td className="p-3 font-mono text-slate-600">{st.email}</td>
                          <td className="p-3 uppercase font-semibold text-[#006B6E]">{st.role.replace('_', ' ')}</td>
                          <td className="p-3 font-mono">{st.branchId}</td>
                          <td className="p-3">
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded uppercase ${
                              st.accountStatus === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                            }`}>
                              {st.accountStatus}
                            </span>
                          </td>
                          {canOnboardEmployees && (
                            <td className="p-3 text-right">
                              {st.role !== 'admin' && st.role !== 'super_admin' && (
                                <button
                                  onClick={() => handleToggleStaff(st.staffId, st.accountStatus)}
                                  className={`text-xs font-semibold px-3 py-1 rounded transition-colors cursor-pointer ${
                                    st.accountStatus === 'active'
                                      ? 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                                      : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                                  }`}
                                >
                                  {st.accountStatus === 'active' ? 'Deactivate' : 'Activate'}
                                </button>
                              )}
                            </td>
                          )}
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4.1: BRANCHES & HQ DIRECTORATES */}
        {activeTab === 'branches' && (
          <div className="space-y-6 text-xs">
            {networkFeedback && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{networkFeedback}</span>
              </div>
            )}

            <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-[#006B6E] uppercase tracking-wider flex items-center gap-2">
                    <Building className="w-4 h-4 text-[#7DC242]" />
                    <span>National Branch &amp; Regional Office Directory ({branches.length})</span>
                  </h3>
                  <p className="text-slate-500 mt-0.5">Finfinne (Addis Ababa), Regional Upcountry Branches, and Contact Offices across Ethiopia.</p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative w-full sm:w-56">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={branchSearch}
                      onChange={(e) => setBranchSearch(e.target.value)}
                      placeholder="Filter branch or city..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-2 text-slate-900"
                    />
                  </div>
                  {canEditOperations && (
                    <button
                      type="button"
                      onClick={() => setShowNewBranchForm(!showNewBranchForm)}
                      className="bg-[#006B6E] hover:bg-[#005254] text-white font-semibold px-3.5 py-2 rounded-lg flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5 text-[#9ad864]" />
                      <span>{showNewBranchForm ? 'Close Form' : 'Add Branch'}</span>
                    </button>
                  )}
                </div>
              </div>

              {showNewBranchForm && canEditOperations && (
                <form onSubmit={handleSaveBranch} className="bg-slate-50 border border-slate-200 rounded-xl p-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Branch Name *</label>
                    <input
                      type="text"
                      required
                      value={newBranchForm.name}
                      onChange={(e) => setNewBranchForm({ ...newBranchForm, name: e.target.value })}
                      placeholder="e.g. Dire Dawa Regional Branch"
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Network Region</label>
                    <select
                      value={newBranchForm.region || 'finfinne'}
                      onChange={(e) => setNewBranchForm({ ...newBranchForm, region: e.target.value as Branch['region'] })}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900"
                    >
                      <option value="finfinne">Finfinne (Addis Ababa)</option>
                      <option value="upcountry">Upcountry Regional Branch</option>
                      <option value="contact_office">Contact Office</option>
                      <option value="headquarters">Headquarters</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">City *</label>
                    <input
                      type="text"
                      required
                      value={newBranchForm.city}
                      onChange={(e) => setNewBranchForm({ ...newBranchForm, city: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Phone *</label>
                    <input
                      type="text"
                      required
                      value={newBranchForm.phone}
                      onChange={(e) => setNewBranchForm({ ...newBranchForm, phone: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Branch Manager</label>
                    <input
                      type="text"
                      value={newBranchForm.managerName}
                      onChange={(e) => setNewBranchForm({ ...newBranchForm, managerName: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Street / Plaza Address</label>
                    <input
                      type="text"
                      value={newBranchForm.address}
                      onChange={(e) => setNewBranchForm({ ...newBranchForm, address: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900"
                    />
                  </div>
                  <div className="sm:col-span-3 flex justify-end">
                    <button
                      type="submit"
                      className="bg-[#006B6E] hover:bg-[#005254] text-white font-semibold px-5 py-2 rounded-lg cursor-pointer"
                    >
                      Save Branch to Directory
                    </button>
                  </div>
                </form>
              )}

              <div className="border border-slate-200 rounded-xl overflow-x-auto">
                <table className="w-full text-left min-w-[740px]">
                  <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Branch ID</th>
                      <th className="p-3">Branch Name</th>
                      <th className="p-3">Region / City</th>
                      <th className="p-3">Phone</th>
                      <th className="p-3">Manager</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {branches
                      .filter((b) =>
                        b.name.toLowerCase().includes(branchSearch.toLowerCase()) ||
                        b.city.toLowerCase().includes(branchSearch.toLowerCase()) ||
                        b.branchId.toLowerCase().includes(branchSearch.toLowerCase())
                      )
                      .map((b) => (
                        <tr key={b.branchId} className="hover:bg-slate-50">
                          <td className="p-3 font-mono font-semibold text-[#006B6E]">{b.branchId}</td>
                          <td className="p-3 font-semibold text-slate-900">
                            <div>{b.name}</div>
                            <div className="text-[11px] text-slate-500 font-normal truncate max-w-[260px]">{b.address}</div>
                          </td>
                          <td className="p-3 capitalize">{(b.region || 'branch').replace('_', ' ')} · {b.city}</td>
                          <td className="p-3 font-medium text-slate-700 tabular-nums">{b.phone}</td>
                          <td className="p-3 text-slate-700">{b.managerName}</td>
                          <td className="p-3">
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded uppercase bg-emerald-100 text-emerald-800">
                              {b.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* HQ Directorates */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 space-y-4">
              <h3 className="text-sm font-bold text-[#006B6E] uppercase tracking-wider">
                Lideya Plaza HQ Departments &amp; Directorates ({departments.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {departments.map((d) => (
                  <div key={d.departmentId} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono text-[#006B6E] font-bold">{d.departmentId}</span>
                      <span className="text-[10px] uppercase px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-600">
                        {d.category.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="font-bold text-slate-900 text-xs">{d.name}</div>
                    <div className="text-[11px] text-slate-600">{d.headTitle}</div>
                    <div className="text-[11px] font-medium text-slate-500 tabular-nums pt-1">{d.telephone}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4.2: LICENSED AGENTS & PARTNER BROKERS */}
        {activeTab === 'agents_brokers' && (
          <div className="space-y-6 text-xs">
            {networkFeedback && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{networkFeedback}</span>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Agents Card */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
                <h3 className="text-sm font-bold text-[#006B6E] uppercase tracking-wider">
                  Licensed Insurance Agents ({agents.length})
                </h3>
                {canEditOperations && (
                  <form onSubmit={handleAddAgent} className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                    <input
                      type="text"
                      required
                      placeholder="Agent Full Name *"
                      value={agentForm.name}
                      onChange={(e) => setAgentForm({ ...agentForm, name: e.target.value })}
                      className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900"
                    />
                    <input
                      type="text"
                      required
                      placeholder="NBE License Ref *"
                      value={agentForm.licenseNumber}
                      onChange={(e) => setAgentForm({ ...agentForm, licenseNumber: e.target.value })}
                      className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-mono"
                    />
                    <input
                      type="text"
                      placeholder="Phone"
                      value={agentForm.phone}
                      onChange={(e) => setAgentForm({ ...agentForm, phone: e.target.value })}
                      className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-mono"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={agentForm.email}
                      onChange={(e) => setAgentForm({ ...agentForm, email: e.target.value })}
                      className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900"
                    />
                    <select
                      value={agentForm.branchId}
                      onChange={(e) => setAgentForm({ ...agentForm, branchId: e.target.value })}
                      className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900"
                    >
                      {branches.map((b) => (
                        <option key={b.branchId} value={b.branchId}>
                          {b.branchId} — {b.name}
                        </option>
                      ))}
                    </select>
                    <button
                      type="submit"
                      className="bg-[#006B6E] hover:bg-[#005254] text-white font-semibold px-4 py-2 rounded-lg cursor-pointer"
                    >
                      Register Agent
                    </button>
                  </form>
                )}

                <div className="border border-slate-200 rounded-xl overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                      <tr>
                        <th className="p-2.5">Agent / License</th>
                        <th className="p-2.5">Branch</th>
                        <th className="p-2.5">Status</th>
                        <th className="p-2.5 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {agents.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="p-5 text-center text-slate-500">
                            No licensed agents registered yet.
                          </td>
                        </tr>
                      ) : (
                        agents.map((a) => (
                          <tr key={a.agentId} className="hover:bg-slate-50">
                            <td className="p-2.5">
                              <div className="font-semibold text-slate-900">{a.name}</div>
                              <div className="text-[11px] font-mono text-slate-500">{a.licenseNumber}</div>
                            </td>
                            <td className="p-2.5 font-mono">{a.branchId}</td>
                            <td className="p-2.5">
                              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded uppercase ${
                                a.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                              }`}>
                                {a.status}
                              </span>
                            </td>
                            <td className="p-2.5 text-right">
                              <button
                                type="button"
                                onClick={() =>
                                  store.saveAgent({
                                    ...a,
                                    status: a.status === 'active' ? 'suspended' : 'active'
                                  })
                                }
                                className="text-[#006B6E] font-semibold hover:underline cursor-pointer"
                              >
                                {a.status === 'active' ? 'Suspend' : 'Activate'}
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Brokers Card */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
                <h3 className="text-sm font-bold text-[#006B6E] uppercase tracking-wider">
                  Partner Insurance Brokerage Firms ({brokers.length})
                </h3>
                {canEditOperations && (
                  <form onSubmit={handleAddBroker} className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                    <input
                      type="text"
                      required
                      placeholder="Brokerage Firm Name *"
                      value={brokerForm.companyName}
                      onChange={(e) => setBrokerForm({ ...brokerForm, companyName: e.target.value })}
                      className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900"
                    />
                    <input
                      type="text"
                      required
                      placeholder="NBE Broker License *"
                      value={brokerForm.nbeLicenseRef}
                      onChange={(e) => setBrokerForm({ ...brokerForm, nbeLicenseRef: e.target.value })}
                      className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-mono"
                    />
                    <input
                      type="text"
                      placeholder="Primary Contact Person"
                      value={brokerForm.contactPerson}
                      onChange={(e) => setBrokerForm({ ...brokerForm, contactPerson: e.target.value })}
                      className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900"
                    />
                    <input
                      type="text"
                      placeholder="Phone"
                      value={brokerForm.phone}
                      onChange={(e) => setBrokerForm({ ...brokerForm, phone: e.target.value })}
                      className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-mono"
                    />
                    <input
                      type="email"
                      placeholder="Corporate Email"
                      value={brokerForm.email}
                      onChange={(e) => setBrokerForm({ ...brokerForm, email: e.target.value })}
                      className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900"
                    />
                    <button
                      type="submit"
                      className="bg-[#006B6E] hover:bg-[#005254] text-white font-semibold px-4 py-2 rounded-lg cursor-pointer"
                    >
                      Register Broker
                    </button>
                  </form>
                )}

                <div className="border border-slate-200 rounded-xl overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                      <tr>
                        <th className="p-2.5">Firm / License</th>
                        <th className="p-2.5">Contact</th>
                        <th className="p-2.5">Status</th>
                        <th className="p-2.5 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {brokers.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="p-5 text-center text-slate-500">
                            No partner brokerage firms registered yet.
                          </td>
                        </tr>
                      ) : (
                        brokers.map((b) => (
                          <tr key={b.brokerId} className="hover:bg-slate-50">
                            <td className="p-2.5">
                              <div className="font-semibold text-slate-900">{b.companyName}</div>
                              <div className="text-[11px] font-mono text-slate-500">{b.nbeLicenseRef}</div>
                            </td>
                            <td className="p-2.5 text-slate-700">{b.contactPerson || '—'}</td>
                            <td className="p-2.5">
                              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded uppercase ${
                                b.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                              }`}>
                                {b.status}
                              </span>
                            </td>
                            <td className="p-2.5 text-right">
                              <button
                                type="button"
                                onClick={() =>
                                  store.saveBroker({
                                    ...b,
                                    status: b.status === 'active' ? 'suspended' : 'active'
                                  })
                                }
                                className="text-[#006B6E] font-semibold hover:underline cursor-pointer"
                              >
                                {b.status === 'active' ? 'Suspend' : 'Activate'}
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4.3: CLAIMS MANAGEMENT OVERSIGHT */}
        {activeTab === 'claims' && (
          <div className="space-y-6 text-xs">
            {claimFeedback && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{claimFeedback}</span>
              </div>
            )}

            <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold text-[#006B6E] uppercase tracking-wider flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-[#7DC242]" />
                    <span>Claims Management Directorate Queue ({claims.length})</span>
                  </h3>
                  <p className="text-slate-500 mt-0.5">Review FNOL filings, assign loss assessors, and record claim settlement determinations (+251-115-589-676).</p>
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-x-auto">
                <table className="w-full text-left min-w-[780px]">
                  <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Claim #</th>
                      <th className="p-3">Policy &amp; Claimant</th>
                      <th className="p-3">Incident &amp; Location</th>
                      <th className="p-3">Est. Loss (ETB)</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Adjudication Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {claims.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-slate-500">
                          No claims notices submitted yet. Claims filed by policyholders appear here for surveyor assignment and settlement.
                        </td>
                      </tr>
                    ) : (
                      claims.map((clm) => (
                        <tr key={clm.claimId} className="hover:bg-slate-50">
                          <td className="p-3 font-mono font-bold text-[#006B6E]">{clm.claimNumber}</td>
                          <td className="p-3">
                            <div className="font-semibold text-slate-900">{clm.customerName}</div>
                            <div className="text-[11px] font-mono text-slate-500">{clm.policyNumber}</div>
                          </td>
                          <td className="p-3 max-w-xs">
                            <div className="font-medium text-slate-800">{clm.incidentDate} · {clm.incidentLocation}</div>
                            <div className="text-[11px] text-slate-500 truncate">{clm.description}</div>
                          </td>
                          <td className="p-3 font-bold text-slate-900 tabular-nums">ETB {clm.estimatedLossETB.toLocaleString()}</td>
                          <td className="p-3">
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded uppercase ${
                              clm.claimStatus === 'settled' || clm.claimStatus === 'approved'
                                ? 'bg-emerald-100 text-emerald-800'
                                : clm.claimStatus === 'declined'
                                ? 'bg-rose-100 text-rose-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}>
                              {clm.claimStatus.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="p-3 text-right space-x-1.5 whitespace-nowrap">
                            <button
                              type="button"
                              onClick={() => handleUpdateClaimStatus(clm, 'surveyor_assigned', 'Loss assessor dispatched for physical inspection.')}
                              className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold cursor-pointer"
                            >
                              Assign Surveyor
                            </button>
                            <button
                              type="button"
                              onClick={() => handleUpdateClaimStatus(clm, 'approved', 'Approved for disbursement by OIC Claims Directorate.')}
                              className="px-2 py-1 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold cursor-pointer"
                            >
                              Approve
                            </button>
                            <button
                              type="button"
                              onClick={() => handleUpdateClaimStatus(clm, 'settled', 'Settlement payment executed.')}
                              className="px-2 py-1 rounded bg-[#006B6E] hover:bg-[#005254] text-white font-semibold cursor-pointer"
                            >
                              Settle
                            </button>
                            <button
                              type="button"
                              onClick={() => handleUpdateClaimStatus(clm, 'declined', 'Claim declined after policy condition review.')}
                              className="px-2 py-1 rounded bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold cursor-pointer"
                            >
                              Decline
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4.4: EXECUTIVE & REGULATORY REPORTS */}
        {activeTab === 'reports' && (
          <div className="space-y-6 text-xs">
            {reportFeedback && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{reportFeedback}</span>
              </div>
            )}

            <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-sm font-bold text-[#006B6E] uppercase tracking-wider flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-[#7DC242]" />
                    <span>Executive &amp; NBE Regulatory Report Generator</span>
                  </h3>
                  <p className="text-slate-500 mt-0.5">Generate live point-in-time production, claims, Takaful, and settlement snapshots.</p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={reportTypeToGen}
                    onChange={(e) => setReportTypeToGen(e.target.value as BusinessReport['reportType'])}
                    className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-semibold"
                  >
                    <option value="production_summary">Gross Production Summary</option>
                    <option value="financial_settlements">Chapa Financial Settlements</option>
                    <option value="claims_register">Claims Register &amp; Loss Ratio</option>
                    <option value="branch_performance">National Branch Performance</option>
                    <option value="takaful_fund">Halal Takaful Fund Report</option>
                    <option value="agri_micro_outreach">Agriculture &amp; Microinsurance Outreach</option>
                  </select>
                  <button
                    type="button"
                    onClick={handleGenerateReport}
                    className="bg-[#006B6E] hover:bg-[#005254] text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#9ad864]" />
                    <span>Generate Report</span>
                  </button>
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-x-auto">
                <table className="w-full text-left min-w-[700px]">
                  <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Report ID</th>
                      <th className="p-3">Report Title &amp; Period</th>
                      <th className="p-3">Generated By</th>
                      <th className="p-3">Key Metrics Snapshot</th>
                      <th className="p-3 text-right">Export</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {reports.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-slate-500">
                          No executive reports archived yet. Select a report category above and click Generate Report.
                        </td>
                      </tr>
                    ) : (
                      reports.map((r) => (
                        <tr key={r.reportId} className="hover:bg-slate-50">
                          <td className="p-3 font-mono font-semibold text-[#006B6E]">{r.reportId}</td>
                          <td className="p-3">
                            <div className="font-semibold text-slate-900">{r.title}</div>
                            <div className="text-[11px] font-mono text-slate-500">{r.periodLabel}</div>
                          </td>
                          <td className="p-3 text-slate-700">{r.generatedBy}</td>
                          <td className="p-3 text-[11px] font-medium text-slate-600 tabular-nums">
                            Policies: {r.metricsSnapshot.totalPolicies} · Premium: ETB {Number(r.metricsSnapshot.grossPremiumETB || 0).toLocaleString()} · Claims: {r.metricsSnapshot.claimsCount}
                          </td>
                          <td className="p-3 text-right">
                            <button
                              type="button"
                              onClick={() =>
                                triggerDownloadFile(
                                  JSON.stringify(r, null, 2),
                                  `${r.reportId}.json`,
                                  'application/json;charset=utf-8;'
                                )
                              }
                              className="inline-flex items-center gap-1 text-[#006B6E] font-semibold hover:underline cursor-pointer"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>JSON</span>
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: E-POLICY REGISTRY & VERIFICATION LOGS (READ-ONLY FOR FINANCE) */}
        {activeTab === 'policies' && (
          <div className="space-y-6">
            {policyFeedback && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{policyFeedback}</span>
              </div>
            )}

            {isFinance && (
              <div className="p-4 bg-slate-100 border border-slate-300 rounded-xl text-xs text-slate-700 flex items-center gap-2.5">
                <Lock className="w-4 h-4 text-[#006B6E] shrink-0" />
                <span>
                  <strong>Finance Read-Only Mode:</strong> Finance officers can inspect and export policy schedules for financial reconciliation, but cannot edit or alter policy records.
                </span>
              </div>
            )}

            {canEditPolicies && editingPolicy && (
              <form onSubmit={handleSavePolicyEdit} className="bg-white border border-slate-300 rounded-xl p-6 space-y-4 text-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h4 className="text-sm font-bold text-[#006B6E]">
                      Edit Policy: {editingPolicy.policyNumber}
                    </h4>
                    <p className="text-slate-500">Customer: {editingPolicy.customerName} · {editingPolicy.productName}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEditingPolicy(null)}
                    className="text-slate-500 hover:text-slate-800 font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Policy Status</label>
                    <select
                      value={editingPolicy.policyStatus}
                      onChange={(e) => setEditingPolicy({ ...editingPolicy, policyStatus: e.target.value as any })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-base sm:text-xs font-semibold text-slate-900"
                    >
                      <option value="active">Active</option>
                      <option value="suspended">Suspended</option>
                      <option value="expired">Expired</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Expiry Date</label>
                    <input
                      type="date"
                      value={editingPolicy.expiryDate}
                      onChange={(e) => setEditingPolicy({ ...editingPolicy, expiryDate: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-base sm:text-xs font-mono text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Insured Subject</label>
                    <input
                      type="text"
                      value={editingPolicy.insuredSubject}
                      onChange={(e) => setEditingPolicy({ ...editingPolicy, insuredSubject: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-base sm:text-xs text-slate-900"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="bg-[#006B6E] hover:bg-[#005254] text-white font-semibold px-5 py-2 rounded-lg cursor-pointer"
                  >
                    Save Policy Changes
                  </button>
                </div>
              </form>
            )}

            <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-sm font-bold text-[#006B6E] uppercase tracking-wider">
                  Authoritative E-Policy Registry ({policies.length})
                </h3>
                <button
                  type="button"
                  onClick={handleExportPoliciesCsv}
                  className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs px-3 py-1.5 rounded-lg cursor-pointer whitespace-nowrap"
                >
                  <Download className="w-3.5 h-3.5 text-[#006B6E]" />
                  <span>Export Policies CSV</span>
                </button>
              </div>
              <div className="border border-slate-200 rounded-xl overflow-x-auto text-xs">
                <table className="w-full text-left min-w-[680px]">
                  <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Policy Number</th>
                      <th className="p-3">Verification Code</th>
                      <th className="p-3">Customer</th>
                      <th className="p-3">Premium</th>
                      <th className="p-3">Period</th>
                      <th className="p-3">Status</th>
                      {canEditPolicies && <th className="p-3 text-right">Actions</th>}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {policies.length === 0 ? (
                      <tr>
                        <td colSpan={canEditPolicies ? 7 : 6} className="p-8 text-center text-slate-500">
                          No issued e-policies are currently recorded in the Oromia Insurance S.C. registry.
                        </td>
                      </tr>
                    ) : (
                      policies.map((p) => (
                        <tr key={p.policyId} className="hover:bg-slate-50">
                          <td className="p-3 font-mono font-bold text-slate-900">{p.policyNumber}</td>
                          <td className="p-3 font-mono font-bold text-[#006B6E]">{p.verificationCode}</td>
                          <td className="p-3 font-medium text-slate-900">{p.customerName}</td>
                          <td className="p-3 font-bold text-slate-900 tabular-nums">ETB {p.totalPremiumETB.toLocaleString()}</td>
                          <td className="p-3 font-medium text-slate-500 tabular-nums">{p.startDate} to {p.expiryDate}</td>
                          <td className="p-3">
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded uppercase ${
                              p.policyStatus === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                            }`}>
                              {p.policyStatus}
                            </span>
                          </td>
                          {canEditPolicies && (
                            <td className="p-3 text-right">
                              <button
                                type="button"
                                onClick={() => setEditingPolicy({ ...p })}
                                className="text-[#006B6E] font-semibold hover:underline cursor-pointer"
                              >
                                Edit
                              </button>
                            </td>
                          )}
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Public Verification Audit Logs */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6 space-y-4">
              <h3 className="text-sm font-bold text-[#006B6E] uppercase tracking-wider">
                Public Policy Verification Access Logs
              </h3>
              <p className="text-xs text-slate-500">Every external code query is audited with timestamp, channel, and outcome.</p>

              <div className="border border-slate-200 rounded-xl overflow-x-auto text-xs">
                <table className="w-full text-left min-w-[640px]">
                  <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Verification ID</th>
                      <th className="p-3">Queried Code</th>
                      <th className="p-3">Outcome</th>
                      <th className="p-3">Channel</th>
                      <th className="p-3">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {verificationLogs.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-slate-500">
                          No public verification queries have been logged yet.
                        </td>
                      </tr>
                    ) : (
                      verificationLogs.map((log) => (
                        <tr key={log.verificationId} className="hover:bg-slate-50">
                          <td className="p-3 font-mono font-semibold text-slate-900">{log.verificationId}</td>
                          <td className="p-3 font-mono text-[#006B6E]">{log.queryCode}</td>
                          <td className="p-3">
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded uppercase ${
                              log.verificationOutcome.startsWith('verified_active') ? 'bg-emerald-100 text-emerald-800' : log.verificationOutcome.startsWith('verified_expired') ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-700'
                            }`}>
                              {log.verificationOutcome.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="p-3 capitalize">{log.channel.replace('_', ' ')}</td>
                          <td className="p-3 font-mono text-slate-500">{log.verificationTimestamp}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: PAID TRANSACTIONS LEDGER, FILTERING & EXPORT (FINANCE, ADMIN & OPERATOR) */}
        {activeTab === 'payments' && (
          <div className="space-y-6 text-xs">
            {txExportFeedback && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{txExportFeedback}</span>
              </div>
            )}

            {/* Filtered Settlement Summary KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
              <div className="relative overflow-hidden bg-white border border-slate-200/90 hover:border-[#7DC242]/50 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all">
                <span className="absolute inset-x-0 top-0 h-1 bg-[#7DC242]" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#5f9e2b] block">
                  Paid Settlements (Filtered)
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#006B6E] tabular-nums mt-1.5">
                  ETB {filteredPaidTotalETB.toLocaleString()}
                </div>
                <span className="text-xs text-emerald-700 font-semibold block mt-1.5">
                  {filteredPaidCount.toLocaleString()} verified paid settlements
                </span>
              </div>
              <div className="relative overflow-hidden bg-white border border-slate-200/90 hover:border-[#006B6E]/35 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all">
                <span className="absolute inset-x-0 top-0 h-1 bg-[#006B6E]" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#006B6E]/80 block">
                  Matching Transactions
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 tabular-nums mt-1.5">
                  {filteredTransactions.length.toLocaleString()}
                </div>
                <span className="text-xs text-slate-600 font-medium block mt-1.5">
                  Out of {enrichedTransactions.length.toLocaleString()} gateway records
                </span>
              </div>
              <div className="relative overflow-hidden bg-white border border-slate-200/90 hover:border-[#006B6E]/35 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all">
                <span className="absolute inset-x-0 top-0 h-1 bg-[#006B6E]" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#006B6E]/80 block">
                  Gateway &amp; Currency
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 tabular-nums mt-1.5">
                  Chapa V2 · ETB
                </div>
                <span className="text-xs text-slate-600 font-medium block mt-1.5">
                  HMAC-SHA256 Server Verified
                </span>
              </div>
            </div>

            {/* Filter & Export Controls Bar */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-sm font-bold text-[#006B6E] uppercase tracking-wider flex items-center gap-2">
                    <Filter className="w-4 h-4 text-[#7DC242]" />
                    <span>Transactions Ledger, Filter &amp; Export</span>
                  </h3>
                  <p className="text-slate-500 mt-0.5">
                    Inspect every paid transaction, filter by status, verification, date range, or ETB amount, and export reports.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={handleExportTransactionsCsv}
                    className="bg-[#006B6E] hover:bg-[#005254] text-white font-semibold px-3.5 py-2 rounded-lg flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    <Download className="w-3.5 h-3.5 text-[#7DC242]" />
                    <span>Export CSV</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleExportTransactionsJson}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold px-3.5 py-2 rounded-lg flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    <Download className="w-3.5 h-3.5 text-[#006B6E]" />
                    <span>Export JSON</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
                <div className="lg:col-span-2 relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={txSearch}
                    onChange={(e) => setTxSearch(e.target.value)}
                    placeholder="Search ref, customer, policy #..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-2 text-base sm:text-xs text-slate-900"
                  />
                </div>

                <select
                  value={txStatusFilter}
                  onChange={(e) => setTxStatusFilter(e.target.value as any)}
                  aria-label="Payment Status Filter"
                  className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-base sm:text-xs text-slate-800 font-semibold"
                >
                  <option value="all">All Statuses</option>
                  <option value="successful">Paid / Successful</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed / Declined</option>
                </select>

                <select
                  value={txVerifyFilter}
                  onChange={(e) => setTxVerifyFilter(e.target.value as any)}
                  aria-label="Verification Filter"
                  className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-base sm:text-xs text-slate-800"
                >
                  <option value="all">All Verification</option>
                  <option value="verified_server">Verified Server</option>
                  <option value="unverified">Pending / Unverified</option>
                  <option value="failed_verification">Failed Verify</option>
                </select>

                <input
                  type="date"
                  value={txDateFrom}
                  onChange={(e) => setTxDateFrom(e.target.value)}
                  aria-label="From Date"
                  className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-base sm:text-xs font-medium text-slate-800 tabular-nums"
                />

                <input
                  type="date"
                  value={txDateTo}
                  onChange={(e) => setTxDateTo(e.target.value)}
                  aria-label="To Date"
                  className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-base sm:text-xs font-medium text-slate-800 tabular-nums"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <div className="flex flex-wrap items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min ETB"
                    value={txMinAmount}
                    onChange={(e) => setTxMinAmount(e.target.value)}
                    className="w-28 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-base sm:text-xs font-semibold text-slate-900 tabular-nums"
                  />
                  <input
                    type="number"
                    placeholder="Max ETB"
                    value={txMaxAmount}
                    onChange={(e) => setTxMaxAmount(e.target.value)}
                    className="w-28 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-base sm:text-xs font-semibold text-slate-900 tabular-nums"
                  />
                  <button
                    type="button"
                    onClick={() => setTxStatusFilter(txStatusFilter === 'successful' ? 'all' : 'successful')}
                    className={`px-3 py-1.5 rounded-lg font-semibold border transition-colors cursor-pointer ${
                      txStatusFilter === 'successful'
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    Paid Only
                  </button>
                </div>

                {(txSearch || txStatusFilter !== 'all' || txVerifyFilter !== 'all' || txDateFrom || txDateTo || txMinAmount || txMaxAmount) && (
                  <button
                    type="button"
                    onClick={() => {
                      setTxSearch('');
                      setTxStatusFilter('all');
                      setTxVerifyFilter('all');
                      setTxDateFrom('');
                      setTxDateTo('');
                      setTxMinAmount('');
                      setTxMaxAmount('');
                    }}
                    className="text-[#006B6E] font-semibold hover:underline cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                )}
              </div>

              {/* Filtered Transactions Table */}
              <div className="border border-slate-200 rounded-xl overflow-x-auto">
                <table className="w-full text-left min-w-[820px]">
                  <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Merchant / Provider Ref</th>
                      <th className="p-3">Customer</th>
                      <th className="p-3">Policy &amp; Product</th>
                      <th className="p-3">Amount (ETB)</th>
                      <th className="p-3">Payment Status</th>
                      <th className="p-3">Verification</th>
                      <th className="p-3">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredTransactions.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-6 text-center text-slate-500">
                          No transactions matched the selected filters.
                        </td>
                      </tr>
                    ) : (
                      filteredTransactions.map((p) => (
                        <tr key={p.paymentAttemptId} className="hover:bg-slate-50">
                          <td className="p-3">
                            <div className="font-mono font-semibold text-slate-900">{p.merchantReference}</div>
                            {p.providerReference && (
                              <div className="text-[11px] font-mono text-slate-500">{p.providerReference}</div>
                            )}
                          </td>
                          <td className="p-3">
                            <div className="font-semibold text-slate-900">{p.customerName}</div>
                            <div className="text-[11px] font-mono text-slate-500">{p.customerId}</div>
                          </td>
                          <td className="p-3">
                            <div className="font-mono font-semibold text-[#006B6E]">{p.policyNumber}</div>
                            <div className="text-[11px] text-slate-500 truncate max-w-[200px]">{p.productName}</div>
                          </td>
                          <td className="p-3 font-bold tabular-nums text-slate-900">
                            ETB {p.amountETB.toLocaleString()}
                          </td>
                          <td className="p-3">
                            <span
                              className={`text-[10px] font-semibold px-2 py-0.5 rounded uppercase ${
                                p.paymentStatus === 'successful'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : p.paymentStatus === 'pending'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-rose-100 text-rose-800'
                              }`}
                            >
                              {p.paymentStatus === 'successful' ? 'paid' : p.paymentStatus}
                            </span>
                          </td>
                          <td className="p-3 font-mono text-[11px] text-slate-600">
                            {p.verificationStatus}
                          </td>
                          <td className="p-3 font-mono text-slate-500 whitespace-nowrap">
                            {(p.verifiedAt || p.createdAt).split('T')[0]}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: EMAIL & AUTOMATION ENGINE */}
        {activeTab === 'emails' && (
          <div className="space-y-6">
            {testEmailFeedback && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{testEmailFeedback}</span>
              </div>
            )}

            {/* Email Templates */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#006B6E] uppercase tracking-wider">
                    Automated Email Templates
                  </h3>
                  <p className="text-slate-500">Configured transactional notifications, renewal cadences, and campaigns.</p>
                </div>
              </div>

              <div className="space-y-3">
                {emailTemplates.map((tpl) => (
                  <div key={tpl.templateId} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{tpl.templateName}</span>
                        <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-mono uppercase">
                          {tpl.category}
                        </span>
                      </div>
                      <div className="text-slate-600">Subject: <strong className="text-slate-900">{tpl.subject}</strong></div>
                      <div className="text-[11px] text-slate-400 font-mono">Variables: {tpl.variables.join(', ')}</div>
                    </div>

                    <button
                      onClick={() => handleSendTestEmail(tpl)}
                      className="bg-[#006B6E] text-white font-semibold text-xs px-3.5 py-1.5 rounded-lg shrink-0 flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5 text-[#7DC242]" />
                      <span>Send Test Email</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Outbox Delivery Queue */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 text-xs">
              <h3 className="text-sm font-bold text-[#006B6E] uppercase tracking-wider">
                Live Outbox Delivery Queue
              </h3>
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Event ID</th>
                      <th className="p-3">Recipient</th>
                      <th className="p-3">Subject</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Delivered At</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {emailJobs.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-slate-500">
                          No email notification jobs have been queued yet.
                        </td>
                      </tr>
                    ) : (
                      emailJobs.map((j) => (
                        <tr key={j.emailJobId} className="hover:bg-slate-50">
                          <td className="p-3 font-mono font-semibold text-slate-900">{j.eventId}</td>
                          <td className="p-3 font-mono">{j.recipient}</td>
                          <td className="p-3 text-slate-800 truncate max-w-xs">{j.subject}</td>
                          <td className="p-3">
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded uppercase">
                              {j.status}
                            </span>
                          </td>
                          <td className="p-3 font-mono text-slate-500">{j.deliveredAt?.split('T')[0] || 'In Queue'}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 8: IMMUTABLE AUDIT TRAIL */}
        {activeTab === 'audit' && (
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6 text-xs">
            <div>
              <h3 className="text-sm font-bold text-[#006B6E] uppercase tracking-wider">
                Security & Regulatory Audit Trail
              </h3>
              <p className="text-slate-500">
                Tamper-resistant audit log recording every privileged operation, role switch, policy issuance, and operator onboarding action.
              </p>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Audit ID</th>
                    <th className="p-3">Actor</th>
                    <th className="p-3">Role</th>
                    <th className="p-3">Action</th>
                    <th className="p-3">Reason / Details</th>
                    <th className="p-3">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-mono">
                  {auditLogs.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center font-sans text-slate-500">
                        No audit trail events have been recorded yet.
                      </td>
                    </tr>
                  ) : (
                    auditLogs.map((log) => (
                      <tr key={log.auditId} className="hover:bg-slate-50">
                        <td className="p-3 font-semibold text-slate-900">{log.auditId}</td>
                        <td className="p-3 font-sans font-medium text-slate-800">{log.actorName}</td>
                        <td className="p-3 uppercase text-[10px] text-slate-600">{log.actorRole}</td>
                        <td className="p-3 text-[#006B6E] font-semibold">{log.action}</td>
                        <td className="p-3 font-sans text-slate-600 max-w-sm truncate">{log.reason}</td>
                        <td className="p-3 text-slate-500 text-[11px]">{log.timestamp}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {/* TAB: OFFICIAL POLICY DOCUMENTS MANAGEMENT */}
        {activeTab === 'documents' && (
          <div className="space-y-6">
            {docSavedFeedback && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{docSavedFeedback}</span>
              </div>
            )}

            {/* Document Upload / Edit Form */}
            {isEditingDoc && editingDoc ? (
              <form onSubmit={handleSaveDoc} className="bg-white border border-slate-200 rounded-xl p-6 space-y-5 text-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-base font-bold text-[#006B6E]">
                      {adminDocs.some((d) => d.id === editingDoc.id) ? 'Edit Official Policy Document' : 'Upload / Register Official Document'}
                    </h3>
                    <p className="text-slate-500">Published documents immediately appear on matching public policy pages and downloads.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => { setIsEditingDoc(false); setEditingDoc(null); }}
                    className="text-slate-500 hover:text-slate-800 font-semibold px-3 py-1.5 rounded-lg border border-slate-200 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Document Title *</label>
                    <input
                      type="text"
                      required
                      value={editingDoc.title || ''}
                      onChange={(e) => setEditingDoc({ ...editingDoc, title: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Target Insurance Product *</label>
                    <select
                      value={editingDoc.productId || 'all'}
                      onChange={(e) => setEditingDoc({ ...editingDoc, productId: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900"
                    >
                      <option value="all">All Products / Corporate General</option>
                      {products.map((p) => (
                        <option key={p.productId} value={p.productId}>
                          {p.productName} ({p.productId})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Category</label>
                    <select
                      value={editingDoc.category || 'policy_wording'}
                      onChange={(e) => setEditingDoc({ ...editingDoc, category: e.target.value as any })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900"
                    >
                      <option value="policy_wording">Policy Wording</option>
                      <option value="proposal_form">Proposal Form</option>
                      <option value="claim_guide">Claim Guide</option>
                      <option value="annual_report">Annual Report</option>
                      <option value="governance">Corporate Governance</option>
                      <option value="brochure">Corporate Brochure</option>
                      <option value="regulatory_filing">Regulatory Filing</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">File Format</label>
                    <select
                      value={editingDoc.fileType || 'pdf'}
                      onChange={(e) => setEditingDoc({ ...editingDoc, fileType: e.target.value as any })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900"
                    >
                      <option value="pdf">PDF</option>
                      <option value="doc">DOCX</option>
                      <option value="sheet">XLSX</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Version</label>
                    <input
                      type="text"
                      value={editingDoc.version || ''}
                      onChange={(e) => setEditingDoc({ ...editingDoc, version: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">File Size</label>
                    <input
                      type="text"
                      value={editingDoc.fileSize || ''}
                      onChange={(e) => setEditingDoc({ ...editingDoc, fileSize: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Description / Scope *</label>
                  <textarea
                    rows={2}
                    required
                    value={editingDoc.description || ''}
                    onChange={(e) => setEditingDoc({ ...editingDoc, description: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Executive Summary</label>
                  <textarea
                    rows={2}
                    value={editingDoc.contentSummary || ''}
                    onChange={(e) => setEditingDoc({ ...editingDoc, contentSummary: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900"
                  />
                </div>

                <div className="space-y-3 border-t border-slate-100 pt-4">
                  <div className="flex items-center justify-between">
                    <label className="font-semibold text-slate-700">Official Policy Clauses & Sections</label>
                    <button
                      type="button"
                      onClick={() =>
                        setEditingDoc({
                          ...editingDoc,
                          sections: [...(editingDoc.sections || []), { heading: 'New Clause Heading', body: '' }]
                        })
                      }
                      className="text-[#006B6E] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Clause Section</span>
                    </button>
                  </div>
                  {(editingDoc.sections || []).map((sec, idx) => (
                    <div key={idx} className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <input
                          type="text"
                          placeholder="Section Heading"
                          value={sec.heading}
                          onChange={(e) => {
                            const updated = [...(editingDoc.sections || [])];
                            updated[idx] = { ...updated[idx], heading: e.target.value };
                            setEditingDoc({ ...editingDoc, sections: updated });
                          }}
                          className="flex-1 bg-white border border-slate-200 rounded px-2.5 py-1.5 font-semibold text-slate-900"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updated = (editingDoc.sections || []).filter((_, i) => i !== idx);
                            setEditingDoc({ ...editingDoc, sections: updated });
                          }}
                          className="text-rose-600 hover:text-rose-800 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <textarea
                        rows={2}
                        placeholder="Clause wording..."
                        value={sec.body}
                        onChange={(e) => {
                          const updated = [...(editingDoc.sections || [])];
                          updated[idx] = { ...updated[idx], body: e.target.value };
                          setEditingDoc({ ...editingDoc, sections: updated });
                        }}
                        className="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-slate-800"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <label className="flex items-center gap-2 font-semibold text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingDoc.isPublic !== false}
                      onChange={(e) => setEditingDoc({ ...editingDoc, isPublic: e.target.checked })}
                      className="rounded border-slate-300 text-[#006B6E]"
                    />
                    <span>Publicly visible & downloadable on product pages</span>
                  </label>
                  <button
                    type="submit"
                    className="bg-[#006B6E] hover:bg-[#005254] text-white font-semibold px-6 py-2.5 rounded-lg transition-colors cursor-pointer"
                  >
                    Publish & Sync Document
                  </button>
                </div>
              </form>
            ) : (
              <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-5 text-xs">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-bold text-[#006B6E] uppercase tracking-wider flex items-center gap-2">
                      <FolderOpen className="w-4 h-4 text-[#7DC242]" />
                      <span>Official Policy Documentation & Regulatory Filings</span>
                    </h3>
                    <p className="text-slate-500 mt-0.5">
                      Manage policy wordings, proposal forms, claim guides, and NBE tariff schedules synced to all public policy pages.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        placeholder="Search documents..."
                        value={docSearch}
                        onChange={(e) => setDocSearch(e.target.value)}
                        className="bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-2 text-slate-900 w-48"
                      />
                    </div>
                    <select
                      value={selectedDocCategory}
                      onChange={(e) => setSelectedDocCategory(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700"
                    >
                      <option value="all">All Categories</option>
                      <option value="policy_wording">Policy Wordings</option>
                      <option value="proposal_form">Proposal Forms</option>
                      <option value="claim_guide">Claim Guides</option>
                      <option value="annual_report">Annual Reports</option>
                      <option value="governance">Corporate Governance</option>
                      <option value="brochure">Brochures</option>
                      <option value="regulatory_filing">Regulatory Filings</option>
                    </select>
                    <select
                      value={selectedDocProductFilter}
                      onChange={(e) => setSelectedDocProductFilter(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 max-w-[180px]"
                    >
                      <option value="all">All Products</option>
                      {products.map((p) => (
                        <option key={p.productId} value={p.productId}>
                          {p.productName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-xl overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                      <tr>
                        <th className="p-3">Doc ID</th>
                        <th className="p-3">Title & Description</th>
                        <th className="p-3">Target Product</th>
                        <th className="p-3">Category</th>
                        <th className="p-3">Version / Size</th>
                        <th className="p-3">Visibility</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {adminDocs
                        .filter((d) => {
                          const matchesSearch =
                            d.title.toLowerCase().includes(docSearch.toLowerCase()) ||
                            d.id.toLowerCase().includes(docSearch.toLowerCase()) ||
                            (d.productName || '').toLowerCase().includes(docSearch.toLowerCase());
                          const matchesCat = selectedDocCategory === 'all' || d.category === selectedDocCategory;
                          const matchesProd = selectedDocProductFilter === 'all' || d.productId === selectedDocProductFilter;
                          return matchesSearch && matchesCat && matchesProd;
                        })
                        .map((doc) => (
                          <tr key={doc.id} className="hover:bg-slate-50">
                            <td className="p-3 font-mono font-bold text-[#006B6E] whitespace-nowrap">{doc.id}</td>
                            <td className="p-3 max-w-xs">
                              <div className="font-semibold text-slate-900">{doc.title}</div>
                              <div className="text-[11px] text-slate-500 truncate">{doc.description}</div>
                            </td>
                            <td className="p-3 text-slate-700">{doc.productName}</td>
                            <td className="p-3">
                              <span className="uppercase text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                                {doc.category.replace('_', ' ')}
                              </span>
                            </td>
                            <td className="p-3 font-mono text-slate-600 whitespace-nowrap">
                              {doc.version} · {doc.fileSize}
                            </td>
                            <td className="p-3">
                              <span
                                className={`text-[10px] font-semibold px-2 py-0.5 rounded uppercase ${
                                  doc.isPublic ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                                }`}
                              >
                                {doc.isPublic ? 'Public' : 'Internal'}
                              </span>
                            </td>
                            <td className="p-3 text-right whitespace-nowrap space-x-1">
                              <button
                                onClick={() => setPreviewingDoc(doc)}
                                title="Preview Document"
                                className="p-1.5 text-slate-600 hover:text-[#006B6E] hover:bg-slate-100 rounded cursor-pointer"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDownloadDoc(doc)}
                                title="Download Document"
                                className="p-1.5 text-slate-600 hover:text-[#006B6E] hover:bg-slate-100 rounded cursor-pointer"
                              >
                                <Download className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => { setEditingDoc(doc); setIsEditingDoc(true); }}
                                title="Edit Document"
                                className="p-1.5 text-slate-600 hover:text-[#006B6E] hover:bg-slate-100 rounded cursor-pointer"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              {confirmDeleteDocId === doc.id ? (
                                <span className="inline-flex items-center gap-1">
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteDoc(doc.id, doc.title)}
                                    className="bg-rose-600 text-white px-2 py-0.5 rounded text-[11px] font-semibold cursor-pointer"
                                  >
                                    Confirm
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setConfirmDeleteDocId(null)}
                                    className="text-slate-500 hover:text-slate-700 px-1.5 py-0.5 text-[11px] font-semibold cursor-pointer"
                                  >
                                    Cancel
                                  </button>
                                </span>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => setConfirmDeleteDocId(doc.id)}
                                  title="Delete Document"
                                  className="p-1.5 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded cursor-pointer"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Document Preview Modal */}
            {previewingDoc && (
              <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
                  <div className="bg-[#006B6E] text-white px-6 py-4 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#9ad864]">
                        {previewingDoc.id} · {previewingDoc.version}
                      </span>
                      <h4 className="text-base font-bold">{previewingDoc.title}</h4>
                    </div>
                    <button
                      onClick={() => setPreviewingDoc(null)}
                      className="text-slate-300 hover:text-white text-xs font-semibold px-2.5 py-1 rounded border border-white/20 cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                  <div className="p-6 overflow-y-auto space-y-4 text-xs">
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-1">
                      <div className="font-bold text-[#006B6E] uppercase">Oromia Insurance S.C.</div>
                      <div className="text-slate-600">Applicable Product: {previewingDoc.productName}</div>
                      <div className="text-slate-600">Issuing Directorate: {previewingDoc.uploadedBy}</div>
                    </div>
                    <p className="text-slate-700 leading-relaxed">{previewingDoc.description}</p>
                    {previewingDoc.sections?.map((sec, idx) => (
                      <div key={idx} className="border-t border-slate-100 pt-3 space-y-1">
                        <h5 className="font-bold text-slate-900">{idx + 1}. {sec.heading}</h5>
                        <p className="text-slate-600 leading-relaxed">{sec.body}</p>
                      </div>
                    ))}
                  </div>
                  <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end gap-2">
                    <button
                      onClick={() => handleDownloadDoc(previewingDoc)}
                      className="bg-[#006B6E] hover:bg-[#005254] text-white text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Official Copy</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB: PLATFORM SYSTEM GUIDE & DOCUMENTATION */}
        {activeTab === 'guide' && (
          <PlatformGuideModule
            role={isFinance ? 'finance' : isOperator ? 'operator' : isClaimsOfficer ? 'staff' : 'admin'}
            workspace="admin"
            userId={currentUser?.uid}
            onQuickNavigate={({ tab, route }) => {
              if (route) {
                navigate(route);
              } else if (tab && allowedTabs.includes(tab as AdminTab)) {
                setIsEditingProduct(false);
                setIsEditingDoc(false);
                setActiveTab(tab as AdminTab);
              }
            }}
          />
        )}
        </div>
      </main>
    </div>
  );
};
