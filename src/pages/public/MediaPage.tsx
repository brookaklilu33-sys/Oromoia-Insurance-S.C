import React, { useState } from 'react';
import { store } from '../../services/store';
import {
  FileText,
  Calendar,
  ArrowRight,
  ExternalLink,
  Download,
  Sparkles,
  BookOpen,
  Scale
} from 'lucide-react';
import { ResponsiveImage } from '../../components/ResponsiveImage';

interface MediaPageProps {
  navigate: (route: string) => void;
}

export const MediaPage: React.FC<MediaPageProps> = ({ navigate }) => {
  const articles = store.getNews();
  const docs = store.getAdminDocuments();
  const [activeTab, setActiveTab] = useState<'news' | 'forms' | 'reports' | 'governance'>('news');
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);

  const proposalForms = docs.filter((d) => d.category === 'proposal_form');
  const annualReports = docs.filter((d) => d.category === 'annual_report');
  const governanceDocs = docs.filter((d) => d.category === 'governance');

  return (
    <div className="min-h-screen bg-slate-50 py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#006B6E] uppercase tracking-wider">
              <span>Media, Publications &amp; Downloads</span>
              <span aria-hidden="true">·</span>
              <span>Oromia Insurance S.C.</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold text-[#006B6E] tracking-tight">
              News, Proposal Forms &amp; Annual Reports
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Access verified Oromia Insurance S.C. news milestones, official PDF proposal forms, Revised Memorandum of Association, 2026 Board Nomination Form, and Audited Annual Financial Statements.
            </p>
          </div>
        </div>

        {/* Navigation Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-white border border-slate-200 rounded-2xl p-1.5 text-xs shadow-sm w-fit">
          <button
            onClick={() => setActiveTab('news')}
            className={`px-4 py-2 rounded-xl font-semibold transition-all cursor-pointer ${
              activeTab === 'news' ? 'bg-[#006B6E] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            News &amp; Events ({articles.length})
          </button>
          <button
            onClick={() => setActiveTab('forms')}
            className={`px-4 py-2 rounded-xl font-semibold transition-all cursor-pointer ${
              activeTab === 'forms' ? 'bg-[#006B6E] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Proposal Forms ({proposalForms.length})
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`px-4 py-2 rounded-xl font-semibold transition-all cursor-pointer ${
              activeTab === 'reports' ? 'bg-[#006B6E] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Annual Reports ({annualReports.length})
          </button>
          <button
            onClick={() => setActiveTab('governance')}
            className={`px-4 py-2 rounded-xl font-semibold transition-all cursor-pointer ${
              activeTab === 'governance' ? 'bg-[#006B6E] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Governance Filings ({governanceDocs.length})
          </button>
        </div>

        {/* TAB 1: NEWS */}
        {activeTab === 'news' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedArticle(item)}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 bg-slate-200 overflow-hidden">
                    <ResponsiveImage
                      src={item.image || '/assets/oic/hero_homepage.png'}
                      alt={item.title}
                      sizes="(max-width: 767px) 92vw, 33vw"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {item.isFeatured && (
                      <span className="absolute top-3 left-3 bg-[#7DC242] text-[#022b2d] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        <span>Featured</span>
                      </span>
                    )}
                  </div>
                  <div className="p-5 space-y-2.5">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 tabular-nums">
                      <Calendar className="w-3.5 h-3.5 text-[#5f9e2b]" />
                      <span>{item.date}</span>
                      <span>·</span>
                      <span className="text-[#006B6E]">{item.tag}</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-[#006B6E] leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.summary}</p>
                  </div>
                </div>
                <div className="px-5 pb-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#006B6E]">
                  <span>Read Full Release</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: PROPOSAL FORMS */}
        {activeTab === 'forms' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {proposalForms.map((doc) => (
              <div key={doc.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase bg-[#eef8e6] text-[#006B6E] px-2.5 py-0.5 rounded">
                      Proposal Form
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400 tabular-nums">{doc.fileSize} PDF</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">{doc.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{doc.description}</p>
                </div>
                <a
                  href={doc.downloadUrl || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#006B6E] hover:bg-[#005254] text-white text-xs font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Open Official OIC PDF</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: ANNUAL REPORTS */}
        {activeTab === 'reports' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {annualReports.map((doc) => (
                <div key={doc.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase bg-teal-50 text-[#006B6E] px-2.5 py-0.5 rounded flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        <span>{doc.version}</span>
                      </span>
                      <span className="text-[11px] font-semibold text-slate-400 tabular-nums">{doc.fileSize}</span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">{doc.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{doc.description}</p>
                  </div>
                  <a
                    href={doc.downloadUrl || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-[#006B6E] hover:bg-[#005254] text-white text-xs font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Download Audited Report</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
            <div className="p-4 bg-white border border-slate-200 rounded-xl text-xs text-slate-600 flex items-center justify-between flex-wrap gap-3">
              <span>Full multi-year Annual Report archive (2009/10 – 2025/26) published on Oromia Insurance Performance portal.</span>
              <a
                href="https://www.oromiainsurance.com/aboutus/performance.php"
                target="_blank"
                rel="noreferrer"
                className="text-[#006B6E] font-semibold hover:underline flex items-center gap-1"
              >
                <span>Official Performance Archive</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}

        {/* TAB 4: GOVERNANCE */}
        {activeTab === 'governance' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {governanceDocs.map((doc) => (
              <div key={doc.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase bg-slate-100 text-slate-800 px-2.5 py-0.5 rounded flex items-center gap-1">
                      <Scale className="w-3 h-3 text-[#006B6E]" />
                      <span>Shareholder &amp; Governance</span>
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400 tabular-nums">{doc.fileSize}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{doc.title}</h3>
                  <p className="text-xs text-slate-600">{doc.description}</p>
                  <p className="text-[11px] text-slate-500">Issued by: {doc.uploadedBy}</p>
                </div>
                <a
                  href={doc.downloadUrl || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#006B6E] hover:bg-[#005254] text-white text-xs font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors w-fit"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Open Official Document</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        )}

        {/* Article Modal */}
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
              <div className="flex items-start justify-between gap-4">
                <span className="bg-[#006B6E] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase">
                  {selectedArticle.tag}
                </span>
                <button onClick={() => setSelectedArticle(null)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                  ✕
                </button>
              </div>
              {selectedArticle.image && (
                <div className="w-full h-64 rounded-2xl overflow-hidden border border-slate-200">
                  <ResponsiveImage
                    src={selectedArticle.image}
                    alt={selectedArticle.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">{selectedArticle.title}</h3>
              <p className="text-sm text-slate-700 leading-relaxed">{selectedArticle.summary}</p>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Oromia Insurance S.C. · {selectedArticle.date}</span>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="bg-[#006B6E] text-white px-5 py-2 rounded-xl font-semibold cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Communications Contact */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm text-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-900">Marketing &amp; Business Development Directorate</h4>
            <p className="text-slate-500">
              For media inquiries, annual report requests, or institutional publications, contact Oromia Insurance S.C. Headquarters.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/contact')}
              className="bg-white border border-slate-300 text-slate-800 px-4 py-2.5 rounded-xl font-semibold cursor-pointer"
            >
              Contact Page
            </button>
            <a
              href="mailto:info@oromiainsurance.com"
              className="bg-[#006B6E] hover:bg-[#005254] text-white px-4 py-2.5 rounded-xl font-semibold"
            >
              info@oromiainsurance.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
