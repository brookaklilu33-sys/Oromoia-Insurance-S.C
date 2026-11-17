import React, { useState } from 'react';
import {
  SEED_BOARD_MEMBERS,
  SEED_EXECUTIVES,
  SEED_DEPARTMENTS,
  BoardMemberProfile,
  ExecutiveMemberProfile
} from '../../data/seedData';
import {
  Building,
  ShieldCheck,
  ChevronRight,
  Briefcase,
  Search,
  ExternalLink,
  CheckCircle,
  Phone,
  AlertCircle
} from 'lucide-react';

interface LeadershipPageProps {
  navigate: (route: string) => void;
  initialTab?: 'board' | 'executives' | 'structure';
}

function getInitials(name: string): string {
  const cleaned = name.replace(/^(Mr\.|Mrs\.|Ms\.|Dr\.|Eng\.)\s+/i, '');
  return cleaned
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() || '')
    .join('');
}

export const LeadershipPage: React.FC<LeadershipPageProps> = ({ navigate, initialTab = 'board' }) => {
  const [activeTab, setActiveTab] = useState<'board' | 'executives' | 'structure'>(initialTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBoard, setSelectedBoard] = useState<BoardMemberProfile | null>(null);
  const [selectedExec, setSelectedExec] = useState<ExecutiveMemberProfile | null>(null);

  const filteredBoard = SEED_BOARD_MEMBERS.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.qualification.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredExecutives = SEED_EXECUTIVES.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const cSuite = filteredExecutives.filter((e) => e.tier === 'c_suite');
  const directors = filteredExecutives.filter((e) => e.tier === 'directorate');

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#006B6E] uppercase tracking-wider">
            <button onClick={() => navigate('/about')} className="hover:underline cursor-pointer">
              About Oromia Insurance
            </button>
            <span>/</span>
            <span>Corporate Governance &amp; Leadership</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-5xl font-bold text-[#006B6E] tracking-tight">
                Corporate Leadership &amp; Governance
              </h1>
              <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-3xl leading-relaxed">
                Oromia Insurance S.C. is governed by an elected 10-member Board of Directors and led operationally by our Executive Management and 22 Head Office Directorates.
              </p>
            </div>

            <div className="relative overflow-hidden bg-[#006B6E] text-white p-5 rounded-2xl shrink-0 shadow-md border border-[#7DC242]/40 text-right">
              <span className="absolute inset-x-0 top-0 h-1 bg-[#7DC242]" />
              <span className="text-[11px] uppercase font-bold tracking-wider text-[#9ad864] block">Shareholder Mandate</span>
              <span className="text-2xl font-extrabold tracking-tight tabular-nums block mt-1">ETB 1B / 3B</span>
              <span className="text-xs text-slate-200 font-medium block mt-1">1.6M+ Farmer Shareholders · 62 + 2 Offices</span>
            </div>
          </div>
        </div>

        {/* Tabs & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-1.5 sm:gap-2 p-1 bg-slate-200/80 rounded-xl w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('board')}
              className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'board' ? 'bg-white text-[#006B6E] shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Board of Directors ({SEED_BOARD_MEMBERS.length})
            </button>
            <button
              onClick={() => setActiveTab('executives')}
              className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'executives' ? 'bg-white text-[#006B6E] shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Executive Management ({SEED_EXECUTIVES.length})
            </button>
            <button
              onClick={() => setActiveTab('structure')}
              className={`w-full sm:w-auto px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'structure' ? 'bg-white text-[#006B6E] shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Organizational Structure
            </button>
          </div>

          {activeTab !== 'structure' && (
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${activeTab === 'board' ? 'directors' : 'executives'}...`}
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#006B6E]"
              />
            </div>
          )}
        </div>

        {/* TAB 1: BOARD OF DIRECTORS */}
        {activeTab === 'board' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-[#022b2d] to-[#006B6E] text-white p-6 sm:p-8 rounded-3xl shadow-sm space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#9ad864]">
                Corporate Governance
              </span>
              <h2 className="text-2xl font-bold">Board of Directors &amp; Company Secretary</h2>
              <p className="text-xs sm:text-sm text-slate-200 max-w-3xl leading-relaxed">
                Steered by shareholders at the General Assembly and supervised under National Bank of Ethiopia governance directives. Click any profile to review academic qualifications and experience.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
              {filteredBoard.map((member) => (
                <div
                  key={member.id}
                  onClick={() => setSelectedBoard(member)}
                  className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-xl hover:border-[#006B6E]/40 transition-all group flex flex-col items-center text-center space-y-3 cursor-pointer"
                >
                  <div className="relative w-full aspect-square max-w-[200px] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        const t = e.currentTarget;
                        t.style.display = 'none';
                        const fb = t.parentElement?.querySelector('.fallback-initials');
                        if (fb) fb.classList.remove('hidden');
                      }}
                    />
                    <div className="fallback-initials hidden absolute inset-0 flex items-center justify-center bg-[#006B6E] text-white font-bold text-2xl">
                      {getInitials(member.name)}
                    </div>
                  </div>
                  <div className="space-y-1 w-full">
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#006B6E] transition-colors leading-snug">
                      {member.name}
                    </h3>
                    <p className="text-xs font-semibold text-[#5f9e2b]">{member.position}</p>
                    <p className="text-[11px] text-slate-500 line-clamp-2">{member.qualification}</p>
                  </div>
                  <div className="w-full pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                    <span>{member.experienceYears ? `${member.experienceYears} yrs exp.` : 'Profile'}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#006B6E] group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: EXECUTIVE MANAGEMENT */}
        {activeTab === 'executives' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-[#022b2d] to-[#006B6E] text-white p-6 sm:p-8 rounded-3xl shadow-sm space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#9ad864]">
                Executive Leadership &amp; Directorates
              </span>
              <h2 className="text-2xl font-bold">Executive Management Team (21 Roles)</h2>
              <p className="text-xs sm:text-sm text-slate-200 max-w-3xl leading-relaxed">
                Comprising the Chief Executive Officer, Chief Operations Officer, Chief Resources Officer, Company Secretary, and 17 Directorate Heads overseeing underwriting, claims, Takaful, agriculture, microinsurance, finance, and governance.
              </p>
            </div>

            {cSuite.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {cSuite.map((exec) => (
                  <div
                    key={exec.no}
                    onClick={() => setSelectedExec(exec)}
                    className="bg-white border-2 border-[#006B6E]/25 rounded-2xl p-5 shadow-md hover:shadow-xl transition-all cursor-pointer group space-y-4"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                        {exec.photo ? (
                          <img
                            src={exec.photo}
                            alt={exec.name}
                            loading="lazy"
                            className="w-full h-full object-cover object-top"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-[#006B6E] text-white font-bold text-lg">
                            {getInitials(exec.name)}
                          </div>
                        )}
                      </div>
                      <div className="space-y-1 min-w-0">
                        <span className="text-[10px] font-bold text-[#5f9e2b] uppercase tracking-wider tabular-nums">
                          Executive #{exec.no}
                        </span>
                        <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#006B6E] leading-snug">
                          {exec.name}
                        </h3>
                        <p className="text-xs font-semibold text-[#006B6E] leading-snug">{exec.position}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">Directorate Heads</h3>
                <span className="text-xs text-slate-500">Head Office Work Units</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {directors.map((exec) => (
                  <div
                    key={exec.no}
                    onClick={() => setSelectedExec(exec)}
                    className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-[#006B6E]/35 transition-all cursor-pointer group flex items-center gap-3.5"
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                      {exec.photo ? (
                        <img
                          src={exec.photo}
                          alt={exec.name}
                          loading="lazy"
                          className="w-full h-full object-cover object-top"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[#006B6E] text-white font-bold text-base">
                          {getInitials(exec.name)}
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 space-y-0.5">
                      <span className="text-[10px] font-semibold text-slate-400 tabular-nums">#{exec.no}</span>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#006B6E] truncate">
                        {exec.name}
                      </h4>
                      <p className="text-xs font-medium text-[#5f9e2b] leading-snug">{exec.position}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ORGANIZATIONAL STRUCTURE */}
        {activeTab === 'structure' && (
          <div className="space-y-8">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-xs font-semibold text-[#006B6E] uppercase tracking-wider">
                    Official Hierarchy
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
                    Oromia Insurance S.C. Organizational Structure
                  </h2>
                </div>
                <a
                  href="/assets/oic/company_structure.jpg"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#006B6E] hover:bg-[#005254] text-white px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-sm shrink-0"
                >
                  <span>Open Full Chart</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white p-2">
                <img
                  src="/assets/oic/company_structure.jpg"
                  alt="Oromia Insurance S.C. Organizational Structure Chart"
                  loading="lazy"
                  className="w-full h-auto rounded-xl object-contain max-h-[720px] mx-auto"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 text-[#006B6E] font-bold text-sm">
                    <ShieldCheck className="w-5 h-5 text-[#7DC242]" />
                    <span>Governance &amp; Advisory</span>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1.5">
                    <li>• General Assembly (1.6M+ Shareholders &amp; 34 Unions)</li>
                    <li>• Board of Directors (10 Members) &amp; Company Secretary</li>
                    <li>• Independent Sharia Advisory Committee (Halal Takaful)</li>
                    <li>• Internal Audit &amp; Risk Management Directorates</li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 text-[#006B6E] font-bold text-sm">
                    <Briefcase className="w-5 h-5 text-[#7DC242]" />
                    <span>Executive Leadership</span>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1.5">
                    <li>• CEO: Mr. Tegistu Shiferaw Tadesse</li>
                    <li>• COO: Mr. Tamene Hailemariam Hordofa</li>
                    <li>• CRO: Mr. Samuel Tesfa Tolessa</li>
                    <li>• 22 Head Office Directorates &amp; Work Units</li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 text-[#006B6E] font-bold text-sm">
                    <Building className="w-5 h-5 text-[#7DC242]" />
                    <span>Service Delivery Footprint</span>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1.5">
                    <li>• 30 Finfinne Branches &amp; 32 Regional Up-Country Branches</li>
                    <li>• 2 Dedicated Contact Offices (Yabello &amp; Kemise)</li>
                    <li>• Claims Management (<span className="font-semibold text-slate-800 tabular-nums">+251-115-589-676</span>)</li>
                    <li>• OB, CBO &amp; Cooperative Union Partner Channels</li>
                  </ul>
                </div>
              </div>

              {/* Quick Head Office 22 Work Units Preview */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">Head Office Work Units ({SEED_DEPARTMENTS.length})</h3>
                  <button
                    onClick={() => navigate('/branches')}
                    className="text-xs font-semibold text-[#006B6E] hover:underline cursor-pointer"
                  >
                    View Full Directory with Telephones →
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                  {SEED_DEPARTMENTS.map((d) => (
                    <div key={d.departmentId} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                      <div className="font-bold text-[#006B6E]">{d.name}</div>
                      {d.headName && <div className="text-slate-700">{d.headName}</div>}
                      <div className="font-medium text-[11px] text-slate-500 flex items-center gap-1.5 tabular-nums">
                        <Phone className="w-3 h-3" />
                        <span>{d.telephone}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Board Modal */}
        {selectedBoard && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedBoard.photo}
                    alt={selectedBoard.name}
                    className="w-20 h-20 rounded-2xl object-cover object-top border border-slate-200"
                  />
                  <div>
                    <span className="text-[11px] font-bold uppercase text-[#5f9e2b]">Board of Directors</span>
                    <h3 className="text-xl font-bold text-slate-900">{selectedBoard.name}</h3>
                    <p className="text-xs font-semibold text-[#006B6E]">{selectedBoard.position}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedBoard(null)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                  ✕
                </button>
              </div>
              <div className="space-y-3 text-xs text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <strong className="text-slate-900 block">Academic Qualification</strong>
                  <span>{selectedBoard.qualification}</span>
                </div>
                <div>
                  <strong className="text-slate-900 block">Work Experience</strong>
                  {selectedBoard.experienceYears ? (
                    <span>{selectedBoard.experienceYears} years of leadership &amp; professional experience</span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-amber-800">
                      <AlertCircle className="w-3.5 h-3.5" />
                      Not specified on official website profile; pending confirmation
                    </span>
                  )}
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setSelectedBoard(null)}
                  className="bg-[#006B6E] text-white px-5 py-2 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Executive Modal */}
        {selectedExec && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden bg-[#006B6E] text-white flex items-center justify-center font-bold text-xl shrink-0">
                    {selectedExec.photo ? (
                      <img src={selectedExec.photo} alt={selectedExec.name} className="w-full h-full object-cover object-top" />
                    ) : (
                      getInitials(selectedExec.name)
                    )}
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-[#5f9e2b] tabular-nums">Role #{selectedExec.no}</span>
                    <h3 className="text-xl font-bold text-slate-900">{selectedExec.name}</h3>
                    <p className="text-xs font-semibold text-[#006B6E]">{selectedExec.position}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedExec(null)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                  ✕
                </button>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
                <div className="flex items-center gap-2 text-slate-800 font-semibold">
                  <CheckCircle className="w-4 h-4 text-[#5f9e2b]" />
                  <span>Oromia Insurance S.C. Executive Directorate</span>
                </div>
                <p>
                  Note: Corporate employee user accounts and internal credentials are not auto-provisioned from public leadership listings and require formal internal HR onboarding.
                </p>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setSelectedExec(null)}
                  className="bg-[#006B6E] text-white px-5 py-2 rounded-xl text-xs font-semibold cursor-pointer"
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
