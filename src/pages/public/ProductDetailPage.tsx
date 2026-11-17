import React, { useState } from 'react';
import { store } from '../../services/store';
import { INDICATIVE_RATE_NOTICE } from '../../data/seedData';
import {
  Shield,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  FileText,
  HelpCircle,
  Download,
  Eye,
  FileCheck2,
  X,
  ExternalLink,
  MoonStar
} from 'lucide-react';
import { AdminUploadedDocument } from '../../types/insurance';
import { ResponsiveImage, getCategoryCoverImage } from '../../components/ResponsiveImage';

interface ProductDetailPageProps {
  slug: string;
  navigate: (route: string) => void;
  embedded?: boolean;
  onBack?: () => void;
  onApply?: (productId: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  slug,
  navigate,
  embedded = false,
  onBack,
  onApply
}) => {
  const product = store.getProductBySlug(slug);
  const [selectedDoc, setSelectedDoc] = useState<AdminUploadedDocument | null>(null);
  const [downloadSuccessNotice, setDownloadSuccessNotice] = useState<string | null>(null);

  if (!product) {
    return (
      <div
        className={
          embedded
            ? 'bg-white border border-slate-200 rounded-2xl py-14 px-4 text-center'
            : 'min-h-screen bg-slate-50 py-16 text-center'
        }
      >
        <h2 className="text-xl font-bold text-slate-900">Product Not Found</h2>
        <p className="text-xs text-slate-500 mt-2">
          The requested insurance policy configuration does not exist.
        </p>
        <button
          type="button"
          onClick={() => (onBack ? onBack() : navigate('/insurance'))}
          className="mt-4 px-4 py-2 bg-[#006B6E] hover:bg-[#005254] text-white text-xs font-semibold rounded-lg cursor-pointer"
        >
          Return to Catalogue
        </button>
      </div>
    );
  }

  const officialDocs = store.getDocumentsForProduct(product.productId);

  const handleStartApplication = () => {
    if (onApply) {
      onApply(product.productId);
      return;
    }
    const user = store.getCurrentUser();
    if (!user) {
      navigate(
        `/login?redirect=${encodeURIComponent(`/portal?action=new_app&productId=${product.productId}`)}`
      );
    } else if (['operator', 'agent', 'broker'].includes(user.accountType)) {
      navigate(`/operator?action=new_app&productId=${product.productId}`);
    } else {
      navigate(`/portal?action=new_app&productId=${product.productId}`);
    }
  };

  const handleDownloadDoc = (doc: AdminUploadedDocument) => {
    if (doc.downloadUrl && doc.downloadUrl.startsWith('http')) {
      const a = document.createElement('a');
      a.href = doc.downloadUrl;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setDownloadSuccessNotice(`Opened official Oromia Insurance document "${doc.title}".`);
      setTimeout(() => setDownloadSuccessNotice(null), 4000);
      return;
    }

    const content = `================================================================================
OROMIA INSURANCE S.C. (OIC) — REST. ASSURED.
HEAD OFFICE: Ethio-China Friendship Avenue, Lideya Plaza, P.O. Box 10090, Addis Ababa
Tel: +251-115-572121 | Fax: +251-115-572122 | Email: info@oromiainsurance.com
================================================================================

DOCUMENT TITLE: ${doc.title.toUpperCase()}
REFERENCE ID:   ${doc.id}
VERSION:        ${doc.version}
CATEGORY:       ${doc.category.toUpperCase().replace('_', ' ')}
TARGET POLICY:  ${product.productName} (Code: ${product.productId})
PUBLISHED DATE: ${doc.uploadDate}
ISSUING OFFICE: ${doc.uploadedBy}

--------------------------------------------------------------------------------
1. SUMMARY & JURISDICTION
--------------------------------------------------------------------------------
${doc.description}

${doc.contentSummary || 'Official policy terms issued by Oromia Insurance S.C. under National Bank of Ethiopia supervision.'}

--------------------------------------------------------------------------------
2. CLAUSES & CONDITIONS
--------------------------------------------------------------------------------
${(doc.sections || [])
  .map(
    (s, idx) => `
[${idx + 1}] ${s.heading}
${s.body}
`
  )
  .join('\n')}
================================================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${doc.id}_${doc.title.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccessNotice(`Downloaded "${doc.title}" successfully.`);
    setTimeout(() => setDownloadSuccessNotice(null), 4000);
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'policy_wording':
        return (
          <span className="bg-teal-50 text-[#006B6E] text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
            Policy Wording
          </span>
        );
      case 'proposal_form':
        return (
          <span className="bg-[#eef8e6] text-[#49801d] text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
            Proposal Form
          </span>
        );
      case 'claim_guide':
        return (
          <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
            Claims Guide
          </span>
        );
      case 'governance':
        return (
          <span className="bg-slate-200 text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
            Governance
          </span>
        );
      case 'annual_report':
        return (
          <span className="bg-indigo-100 text-indigo-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
            Annual Report
          </span>
        );
      default:
        return (
          <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
            OIC Document
          </span>
        );
    }
  };

  const lineLabel: Record<string, string> = {
    non_life: 'General (Non-Life) Insurance',
    life_health: 'Life & Health Insurance',
    agri_micro: 'Agriculture & Microinsurance',
    halal_takaful: 'Halal Takaful Insurance'
  };

  return (
    <div className={embedded ? 'w-full' : 'min-h-screen bg-slate-50 py-6 sm:py-10'}>
      <div
        className={
          embedded
            ? 'space-y-6 sm:space-y-8'
            : 'max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-6 sm:space-y-8'
        }
      >
        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => (onBack ? onBack() : navigate('/insurance'))}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#006B6E] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            <span>{onBack ? 'Back to Services & Products' : 'Back to Products Catalogue'}</span>
          </button>
          <div className="text-xs text-slate-500 font-mono">
            ID: {product.productId} · {lineLabel[product.productCategory] || product.productCategory}
          </div>
        </div>

        {downloadSuccessNotice && (
          <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-900 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{downloadSuccessNotice}</span>
            </div>
            <button onClick={() => setDownloadSuccessNotice(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
              ✕
            </button>
          </div>
        )}

        {/* Hero Section */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-8 lg:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#006B6E] uppercase tracking-wider">
                <span>{lineLabel[product.productCategory] || product.productCategory}</span>
                {product.subCategory && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>{product.subCategory}</span>
                  </>
                )}
              </div>

              <h1 className="text-2xl sm:text-4xl font-bold text-[#006B6E] tracking-tight">
                {product.productName}
              </h1>

              <p className="text-sm text-slate-600 leading-relaxed">{product.fullDescription}</p>

              {product.shariaSupervised && (
                <div className="bg-[#eef8e6] border border-[#7DC242]/50 rounded-xl p-3.5 text-xs text-[#022b2d] flex items-start gap-3">
                  <MoonStar className="w-4 h-4 text-[#006B6E] shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-semibold">
                      Halal Takaful — Supervised by OIC Sharia Advisory Committee
                    </strong>
                    <p className="mt-0.5 text-slate-700">
                      Free from interest (riba) and uncertainty (gharar), segregated Takaful funds, available across all 62 Oromia Insurance branches and 2 contact offices.
                    </p>
                  </div>
                </div>
              )}

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-700 flex items-start gap-3">
                <Shield className="w-4 h-4 text-[#006B6E] shrink-0 mt-0.5" />
                <div>
                  <strong className="font-semibold text-slate-900">
                    Oromia Insurance S.C. (OIC) Official Product Schedule
                  </strong>
                  <p className="mt-0.5 text-slate-600">{INDICATIVE_RATE_NOTICE}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={handleStartApplication}
                  className="bg-[#006B6E] hover:bg-[#005254] text-white text-xs font-semibold px-6 py-3 rounded-lg transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
                >
                  <span>Start Online Proposal</span>
                  <ArrowRight className="w-4 h-4 text-[#9ad864]" />
                </button>
                <div className="text-xs text-slate-500">
                  <span>Indicative minimum: </span>
                  <strong className="text-slate-900 font-extrabold tracking-tight tabular-nums">
                    ETB {product.quotationConfiguration.standardMinimumPremiumETB.toLocaleString()}
                  </strong>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-md aspect-[16/10] bg-slate-100">
                <ResponsiveImage
                  src={getCategoryCoverImage(product.productCategory, product.heroImage)}
                  alt={product.productName}
                  priority={!embedded}
                  sizes="(max-width: 1023px) 94vw, 440px"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-semibold text-white">
                  <span className="bg-[#006B6E]/90 px-2.5 py-1 rounded-md">
                    Oromia Insurance S.C.
                  </span>
                  <span className="bg-slate-900/75 px-2.5 py-1 rounded-md font-semibold tracking-wide">
                    {lineLabel[product.productCategory] || product.productCategory}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Official Documentation & Proposal Forms */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-[#006B6E] uppercase tracking-wider">
                Official Oromia Insurance Downloads
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <FileCheck2 className="w-6 h-6 text-[#006B6E]" />
                <span>Proposal Forms, Governance &amp; Annual Reports</span>
              </h2>
            </div>
            <div className="text-xs text-slate-500">
              <span className="font-semibold text-slate-900">{officialDocs.length}</span> documents available
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {officialDocs.map((doc) => (
              <div
                key={doc.id}
                className="bg-slate-50/70 border border-slate-200 hover:border-[#006B6E]/40 rounded-xl p-5 flex flex-col justify-between space-y-4 hover:shadow-md transition-all group"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    {getCategoryBadge(doc.category)}
                    <span className="text-[11px] font-semibold text-slate-400 tabular-nums">
                      {doc.fileSize} · {doc.fileType.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#006B6E] transition-colors leading-snug">
                    {doc.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {doc.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 tabular-nums">
                    <span>{doc.version}</span>
                    <span>{doc.uploadDate}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => setSelectedDoc(doc)}
                      className="bg-white hover:bg-slate-100 text-[#006B6E] border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </button>
                    <button
                      onClick={() => handleDownloadDoc(doc)}
                      className="bg-[#006B6E] hover:bg-[#005254] text-white rounded-lg px-2.5 py-1.5 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      {doc.downloadUrl?.startsWith('http') ? (
                        <ExternalLink className="w-3.5 h-3.5" />
                      ) : (
                        <Download className="w-3.5 h-3.5" />
                      )}
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2-Column Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
              <h2 className="text-lg font-bold text-[#006B6E] flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#7DC242]" />
                <span>Scope of Coverage</span>
              </h2>
              <div className="space-y-4 pt-2">
                {product.coverageSections.map((sec, i) => (
                  <div key={i} className="border border-slate-100 rounded-lg p-4 bg-slate-50/50 space-y-1">
                    <h4 className="text-sm font-semibold text-slate-900">{sec.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{sec.description}</p>
                    <div className="pt-2 text-[11px] font-medium text-slate-500 tabular-nums">
                      Limit / Basis: <span className="text-slate-900 font-semibold">{sec.limitOrFormula}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
              <h2 className="text-lg font-bold text-[#006B6E] flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
                <span>Standard Exclusions</span>
              </h2>
              <ul className="space-y-2 pt-1">
                {product.exclusions.map((ex, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                    <span>{ex}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
              <h2 className="text-lg font-bold text-[#006B6E] flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#006B6E]" />
                <span>Application Intake Fields</span>
              </h2>
              <div className="space-y-4 pt-2">
                {product.applicationSchema.map((step, idx) => (
                  <div key={idx} className="border border-slate-200 rounded-lg p-4 bg-slate-50/60">
                    <h4 className="text-xs font-semibold text-[#006B6E] uppercase tracking-wider mb-2">
                      Step {idx + 1}: {step.stepTitle}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      {step.fields.map((f) => (
                        <div key={f.id} className="p-2.5 bg-white border border-slate-200 rounded">
                          <div className="font-medium text-slate-800 flex items-center justify-between">
                            <span>{f.label}</span>
                            {f.required && <span className="text-[10px] text-amber-700 font-semibold">Required</span>}
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">Type: {f.type}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
              <h2 className="text-lg font-bold text-[#006B6E] flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#7DC242]" />
                <span>Frequently Asked Questions</span>
              </h2>
              <div className="space-y-3 pt-2">
                {product.faq.map((item, i) => (
                  <div key={i} className="border border-slate-100 rounded-lg p-4 bg-slate-50/50">
                    <h4 className="text-xs font-semibold text-slate-900">{item.question}</h4>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-[#006B6E] uppercase tracking-wider">
                Required Proposal Documents
              </h3>
              <div className="space-y-3 pt-1">
                {product.requiredDocuments.map((doc) => (
                  <div key={doc.code} className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1">
                    <div className="font-semibold text-slate-900 flex items-center justify-between">
                      <span>{doc.title}</span>
                      {doc.mandatory ? (
                        <span className="text-[10px] bg-rose-50 text-rose-700 px-1.5 py-0.5 rounded font-medium">
                          Mandatory
                        </span>
                      ) : (
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium">
                          Optional
                        </span>
                      )}
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">{doc.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 text-xs">
              <h3 className="text-sm font-bold text-[#006B6E] uppercase tracking-wider">
                Underwriting Architecture
              </h3>
              <div className="space-y-2.5 text-slate-600">
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span>Pre-Risk Inspection:</span>
                  <span className="font-semibold text-slate-900">
                    {product.underwritingConfiguration.requiresInspection ? 'Required' : 'Standard'}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span>Maker-Checker Approval:</span>
                  <span className="font-semibold text-slate-900">
                    {product.underwritingConfiguration.makerCheckerRequired ? 'Directorate Approval' : 'Branch / Online'}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span>VAT &amp; Stamp Duty:</span>
                  <span className="font-bold text-slate-900 tabular-nums">
                    {product.quotationConfiguration.taxRatePercent}% + ETB {product.quotationConfiguration.stampDutyETB}
                  </span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span>Policy Template:</span>
                  <span className="font-semibold text-slate-700 tabular-nums">{product.policyTemplateId}</span>
                </div>
              </div>
              <div className="pt-2">
                <button
                  onClick={handleStartApplication}
                  className="w-full bg-[#7DC242] hover:bg-[#6db334] text-[#022b2d] font-bold text-xs py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <span>Apply Online</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Document Preview Modal */}
        {selectedDoc && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {getCategoryBadge(selectedDoc.category)}
                    <span className="text-xs font-medium text-slate-400 tabular-nums">ID: {selectedDoc.id}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{selectedDoc.title}</h3>
                </div>
                <button onClick={() => setSelectedDoc(null)} className="p-1.5 text-slate-400 hover:text-slate-700 cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-1.5">
                <div className="flex justify-between items-center text-slate-500 font-semibold text-[11px] tabular-nums">
                  <span>OROMIA INSURANCE S.C.</span>
                  <span>VERSION: {selectedDoc.version}</span>
                </div>
                <div className="text-slate-700">
                  <strong>Issuer:</strong> {selectedDoc.uploadedBy}
                </div>
                <p className="text-slate-600 pt-1">{selectedDoc.description}</p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => handleDownloadDoc(selectedDoc)}
                  className="bg-[#006B6E] hover:bg-[#005254] text-white px-5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Open / Download ({selectedDoc.fileSize})</span>
                </button>
                <button
                  onClick={() => setSelectedDoc(null)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
