import React, { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { store } from '../../services/store';
import {
  Phone,
  CheckCircle2,
  Clock,
  Shield,
  HeartPulse,
  Sprout,
  MoonStar,
  Send
} from 'lucide-react';

interface ClaimsPageProps {
  navigate: (route: string) => void;
}

export const ClaimsPage: React.FC<ClaimsPageProps> = ({ navigate }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'procedure' | 'notify' | 'requirements'>('procedure');
  const [selectedClass, setSelectedClass] = useState<string>('non_life');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submittedClaimRef, setSubmittedClaimRef] = useState('');
  const [claimForm, setClaimForm] = useState({
    policyNumber: '',
    claimantName: '',
    phone: '',
    email: '',
    insuranceClass: 'non_life',
    dateOfLoss: '',
    locationOfLoss: '',
    lossDescription: '',
    estimatedLossETB: ''
  });

  const handleClaimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const claimRef = `OIC-CLM-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date().toISOString();
    const currentUser = store.getCurrentUser();
    const matchedPolicy = store
      .getPolicies()
      .find((p) => p.policyNumber.toUpperCase() === claimForm.policyNumber.trim().toUpperCase());
    const matchedCustomer = currentUser
      ? store.getCustomers().find((c) => c.authUid === currentUser.uid)
      : undefined;

    store.saveClaim({
      claimId: `CLM-${Date.now()}`,
      claimNumber: claimRef,
      policyId: matchedPolicy?.policyId || 'POL-ONLINE-NOTICE',
      policyNumber: claimForm.policyNumber.trim(),
      customerId: matchedPolicy?.customerId || matchedCustomer?.customerId || currentUser?.uid || 'PUBLIC-CLAIMANT',
      customerName: claimForm.claimantName.trim(),
      incidentDate: claimForm.dateOfLoss || now.split('T')[0],
      incidentLocation: claimForm.locationOfLoss.trim(),
      description: `${claimForm.insuranceClass.toUpperCase()} — ${claimForm.lossDescription.trim()} (Tel: ${claimForm.phone.trim()})`,
      estimatedLossETB: parseFloat(claimForm.estimatedLossETB) || 0,
      uploadedEvidenceIds: [],
      claimStatus: 'submitted',
      createdAt: now,
      updatedAt: now
    });

    setSubmittedClaimRef(claimRef);
    setFormSubmitted(true);
  };

  const requirementsData: Record<string, { title: string; docs: string[]; timeline: string }> = {
    non_life: {
      title: 'General (Non-Life) Insurance: Motor, Fire, Engineering, Marine & Liability Claims',
      docs: [
        'Completed Oromia Insurance S.C. Claim Notification Form',
        'Traffic Police / Fire Brigade / Customs Investigation Report as applicable',
        'Valid Driver’s License & Vehicle Ownership Libre (for Motor claims)',
        'Commercial Invoices, Packing List, Bill of Lading & Survey Report (for Marine Cargo)',
        'Itemized repair quotation, replacement invoice, or engineering assessor report'
      ],
      timeline: 'Immediate inspection coordination via Claims Management Directorate (+251-115-589-676).'
    },
    life_health: {
      title: 'Life & Health Insurance Claims',
      docs: [
        'Attending Physician Medical Report, diagnosis & prescription receipts',
        'Official Hospital Discharge Summary and itemized medical bills',
        'Employer attestation for Group Term Life / Group Medical policies',
        'Official Vital Events Death Certificate & beneficiary verification (for Life claims)'
      ],
      timeline: 'Handled with confidentiality and priority by Life & Health Insurance Directorate (+251-115-572-128).'
    },
    agri_micro: {
      title: 'Agriculture & Microinsurance Claims (Crop, Livestock & Credit Life)',
      docs: [
        'Farmer / Cooperative Union enrollment roster and plot/livestock ID schedule',
        'Index trigger verification report (for Weather/Vegetation/Area Yield Crop or IBLI)',
        'Veterinary post-mortem or local agricultural office loss attestation (for Multi-Peril)',
        'SACCO / MFI credit balance statement (for Credit Life claims)'
      ],
      timeline: 'Coordinated directly with Agricultural & Microinsurance Directorate (+251-115-572-135) and Cooperative Unions.'
    },
    halal_takaful: {
      title: 'Halal Takaful Insurance Claims (Sharia Supervised)',
      docs: [
        'Participant Takaful Certificate reference and official Claim Notification',
        'Police, Fire Brigade, or Engineering loss assessment documentation',
        'Repair estimate or itemized property/consignment schedule',
        'Verification against Sharia Advisory Committee approved Takaful Tabarru terms'
      ],
      timeline: 'Processed via Takaful Insurance Directorate (+251-115-572-137) across all 62 OIC branches.'
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-6 sm:py-12">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-6 sm:space-y-10">
        {/* Header */}
        <div className="max-w-3xl space-y-2 sm:space-y-3">
          <div className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-[#006B6E] uppercase tracking-wider">
            <span>{t('nav.claims')}</span>
            <span aria-hidden="true">·</span>
            <span>Speed &amp; Fairness · Rest. Assured.</span>
          </div>
          <h1 className="text-2xl sm:text-5xl font-bold text-[#006B6E] tracking-tight leading-tight">
            {t('pages.claimsTitle')}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Settling claims with speed and fairness is at the heart of Oromia Insurance S.C.’s mission — exemplified by our historic ETB 40 Million Crop Insurance payout to farmers in the Amhara region and prompt claims resolution across our 62 branches and 2 contact offices.
          </p>
        </div>

        {/* Claims Management Directorate Banner */}
        <div className="bg-gradient-to-r from-[#022b2d] via-[#005254] to-[#006B6E] text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#9ad864]">
              OIC Claims Management Directorate
            </span>
            <h3 className="text-xl font-bold text-white">Report an Incident or Request Surveyor Dispatch</h3>
            <p className="text-xs text-slate-200 max-w-xl">
              Contact our Claims Management Directorate directly or reach Oromia Insurance Headquarters at Lideya Plaza for guidance across all 62 branches.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="tel:+251115589676"
              className="bg-[#7DC242] hover:bg-[#6db334] text-[#022b2d] text-xs sm:text-sm font-bold px-5 py-3 rounded-xl transition-all shadow-md flex items-center gap-2 whitespace-nowrap"
            >
              <Phone className="w-4 h-4" />
              <span>Claims Desk: +251-115-589-676</span>
            </a>
            <button
              onClick={() => setActiveTab('notify')}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs sm:text-sm font-semibold px-5 py-3 rounded-xl transition-all whitespace-nowrap cursor-pointer"
            >
              Submit Notice Online
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 gap-4 sm:gap-8 text-xs sm:text-sm font-semibold overflow-x-auto">
          <button
            onClick={() => setActiveTab('procedure')}
            className={`pb-4 px-2 whitespace-nowrap border-b-2 cursor-pointer ${
              activeTab === 'procedure' ? 'border-[#006B6E] text-[#006B6E]' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Claims Procedure
          </button>
          <button
            onClick={() => setActiveTab('requirements')}
            className={`pb-4 px-2 whitespace-nowrap border-b-2 cursor-pointer ${
              activeTab === 'requirements' ? 'border-[#006B6E] text-[#006B6E]' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Required Documents by Business Line
          </button>
          <button
            onClick={() => setActiveTab('notify')}
            className={`pb-4 px-2 whitespace-nowrap border-b-2 cursor-pointer ${
              activeTab === 'notify' ? 'border-[#006B6E] text-[#006B6E]' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Online Claim Notification
          </button>
        </div>

        {/* Tab 1 */}
        {activeTab === 'procedure' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {[
              {
                step: '1',
                title: 'Notify Immediately',
                body: 'Report the loss online, via Claims Management (+251-115-589-676), Head Office (+251-115-572121), or at your nearest OIC branch.'
              },
              {
                step: '2',
                title: 'Survey & Assessment',
                body: 'OIC Engineering Services & Claims assessors inspect damaged property, vehicles, cargo, or cooperative plots.'
              },
              {
                step: '3',
                title: 'Submit Supporting Docs',
                body: 'Provide police reports, invoices, medical bills, or cooperative schedules through the Customer Portal or branch desk.'
              },
              {
                step: '4',
                title: 'Fair Settlement',
                body: 'Claims are settled with speed and fairness directly to the policyholder or authorized repair partner.'
              }
            ].map((item) => (
              <div key={item.step} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-[#006B6E] text-[#9ad864] font-bold text-base flex items-center justify-center">
                  {item.step}
                </div>
                <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2 */}
        {activeTab === 'requirements' && (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'non_life', label: 'General (Non-Life)', icon: Shield },
                { id: 'life_health', label: 'Life & Health', icon: HeartPulse },
                { id: 'agri_micro', label: 'Agriculture & Microinsurance', icon: Sprout },
                { id: 'halal_takaful', label: 'Halal Takaful', icon: MoonStar }
              ].map((c) => {
                const Icon = c.icon;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedClass(c.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      selectedClass === c.id
                        ? 'bg-[#006B6E] text-white shadow-md'
                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{c.label}</span>
                  </button>
                );
              })}
            </div>

            {requirementsData[selectedClass] && (
              <div className="bg-white border border-slate-200 rounded-2xl p-7 space-y-5 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900">{requirementsData[selectedClass].title}</h3>
                <ul className="space-y-2.5 text-xs text-slate-600">
                  {requirementsData[selectedClass].docs.map((doc, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#5f9e2b] shrink-0 mt-0.5" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-4 border-t border-slate-100 flex items-start gap-3 bg-slate-50 p-4 rounded-xl text-xs">
                  <Clock className="w-5 h-5 text-[#006B6E] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">Directorate Coordination</strong>
                    <span className="text-slate-600">{requirementsData[selectedClass].timeline}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 3 */}
        {activeTab === 'notify' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-7 sm:p-10 shadow-sm max-w-3xl space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#006B6E]">Online Claim Intake</span>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">Submit Incident Notification</h2>
              <p className="text-xs text-slate-500 mt-1">
                Creates an Oromia Insurance S.C. claim notification record routed to the Claims Management Directorate.
              </p>
            </div>

            {formSubmitted ? (
              <div className="p-8 rounded-2xl bg-[#eef8e6] border border-[#7DC242]/50 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-[#5f9e2b] mx-auto" />
                <h3 className="text-lg font-bold text-[#022b2d]">Claim Notification Logged</h3>
                <p className="text-xs text-slate-700 max-w-md mx-auto">
                  Reference <strong className="font-bold text-slate-900 tabular-nums">{submittedClaimRef}</strong> has been logged. For urgent assistance, call Claims Management at <strong className="font-bold text-slate-900 tabular-nums">+251-115-589-676</strong>.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => navigate('/portal')}
                    className="bg-[#006B6E] text-white px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    Open Customer Portal
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFormSubmitted(false);
                      setSubmittedClaimRef('');
                    }}
                    className="bg-white border border-slate-300 text-slate-800 px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    Submit Another Claim Notice
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleClaimSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Policy Number / Code *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. OIC/POL/2026/001042"
                      value={claimForm.policyNumber}
                      onChange={(e) => setClaimForm({ ...claimForm, policyNumber: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#006B6E]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Insurance Business Line *</label>
                    <select
                      value={claimForm.insuranceClass}
                      onChange={(e) => setClaimForm({ ...claimForm, insuranceClass: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#006B6E]"
                    >
                      <option value="non_life">General (Non-Life) Insurance</option>
                      <option value="life_health">Life &amp; Health Insurance</option>
                      <option value="agri_micro">Agriculture &amp; Microinsurance</option>
                      <option value="halal_takaful">Halal Takaful Insurance</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Claimant Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Full Name / Cooperative / Business"
                      value={claimForm.claimantName}
                      onChange={(e) => setClaimForm({ ...claimForm, claimantName: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#006B6E]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+251 9..."
                      value={claimForm.phone}
                      onChange={(e) => setClaimForm({ ...claimForm, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#006B6E]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="claimant@example.com"
                      value={claimForm.email}
                      onChange={(e) => setClaimForm({ ...claimForm, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#006B6E]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Date of Loss *</label>
                    <input
                      type="date"
                      required
                      value={claimForm.dateOfLoss}
                      onChange={(e) => setClaimForm({ ...claimForm, dateOfLoss: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#006B6E]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Incident Location *</label>
                    <input
                      type="text"
                      required
                      placeholder="City / Zone / Sub-city"
                      value={claimForm.locationOfLoss}
                      onChange={(e) => setClaimForm({ ...claimForm, locationOfLoss: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#006B6E]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Estimated Loss (ETB)</label>
                    <input
                      type="number"
                      placeholder="Approximate ETB"
                      value={claimForm.estimatedLossETB}
                      onChange={(e) => setClaimForm({ ...claimForm, estimatedLossETB: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#006B6E]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Loss Circumstances *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe the incident, parties involved, and police/authority report details..."
                    value={claimForm.lossDescription}
                    onChange={(e) => setClaimForm({ ...claimForm, lossDescription: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#006B6E]"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[#006B6E] hover:bg-[#005254] text-white px-7 py-3 rounded-xl font-semibold text-xs flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <Send className="w-4 h-4 text-[#9ad864]" />
                  <span>Submit Claim Notification</span>
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
