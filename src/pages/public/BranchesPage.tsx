import React, { useState, useMemo } from 'react';
import { store } from '../../services/store';
import { SEED_DEPARTMENTS } from '../../data/seedData';
import {
  MapPin,
  Phone,
  Mail,
  Building,
  Search,
  ExternalLink,
  Printer,
  Briefcase
} from 'lucide-react';
import { Branch } from '../../types/insurance';

export const BranchesPage: React.FC = () => {
  const branches = store.getBranches();
  const departments = store.getDepartments().length > 0 ? store.getDepartments() : SEED_DEPARTMENTS;

  const [regionTab, setRegionTab] = useState<'all' | 'finfinne' | 'upcountry' | 'contact_office' | 'hq_units'>('all');
  const [search, setSearch] = useState('');
  const [selectedBranch, setSelectedBranch] = useState<Branch>(branches[0] || ({} as Branch));

  const finfinneCount = branches.filter((b) => b.region === 'finfinne').length;
  const upcountryCount = branches.filter((b) => b.region === 'upcountry').length;
  const contactCount = branches.filter((b) => b.region === 'contact_office').length;

  const filteredBranches = useMemo(() => {
    return branches.filter((b) => {
      const matchRegion =
        regionTab === 'all' ||
        regionTab === b.region ||
        (regionTab === 'finfinne' && b.isHeadquarters);
      const q = search.toLowerCase();
      const matchQuery =
        !q ||
        b.name.toLowerCase().includes(q) ||
        b.city.toLowerCase().includes(q) ||
        b.address.toLowerCase().includes(q) ||
        b.managerName.toLowerCase().includes(q) ||
        b.phone.toLowerCase().includes(q) ||
        b.email.toLowerCase().includes(q);
      return matchRegion && matchQuery;
    });
  }, [branches, regionTab, search]);

  const filteredDepts = useMemo(() => {
    const q = search.toLowerCase();
    return departments.filter(
      (d) =>
        !q ||
        d.name.toLowerCase().includes(q) ||
        (d.headName || '').toLowerCase().includes(q) ||
        d.telephone.toLowerCase().includes(q)
    );
  }, [departments, search]);

  return (
    <div className="min-h-screen bg-slate-50 py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-5 border-b border-slate-200">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#006B6E] uppercase tracking-wider">
              <span>National Service Network</span>
              <span aria-hidden="true">·</span>
              <span>62 Branches + 2 Contact Offices + HQ</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold text-[#006B6E] tracking-tight leading-tight">
              Oromia Insurance S.C. Branch &amp; Directorate Directory
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              Locate Oromia Insurance S.C. offices across Finfinne (30 branches), Up-Country Ethiopia (32 regional branches), 2 specialized rural Contact Offices (Yabello &amp; Kemise), and all 22 Head Office Directorates &amp; Work Units at Lideya Plaza.
            </p>
          </div>
          <div className="bg-[#006B6E] text-white px-5 py-4 rounded-2xl text-xs space-y-1 shrink-0 shadow-sm border border-[#005254]">
            <div className="font-bold text-[#9ad864] uppercase tracking-wider text-[10px]">
              Head Office Switchboard
            </div>
            <div className="text-lg sm:text-xl font-extrabold tracking-tight tabular-nums">+251-115-572121</div>
            <div className="text-slate-200">P.O. Box 10090 · info@oromiainsurance.com</div>
          </div>
        </div>

        {/* Network Footprint KPI Summary */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative overflow-hidden p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
            <span className="absolute inset-x-0 top-0 h-1 bg-[#006B6E]" />
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#006B6E]/80">Finfinne Network</div>
            <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 tabular-nums mt-1.5">
              {finfinneCount}
            </div>
            <div className="text-xs text-slate-600 font-medium mt-1">Metropolitan Branches</div>
          </div>
          <div className="relative overflow-hidden p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
            <span className="absolute inset-x-0 top-0 h-1 bg-[#006B6E]" />
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#006B6E]/80">Regional Network</div>
            <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 tabular-nums mt-1.5">
              {upcountryCount}
            </div>
            <div className="text-xs text-slate-600 font-medium mt-1">Up-Country Branches</div>
          </div>
          <div className="relative overflow-hidden p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
            <span className="absolute inset-x-0 top-0 h-1 bg-[#7DC242]" />
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#5f9e2b]">Rural Outreach</div>
            <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 tabular-nums mt-1.5">
              {contactCount}
            </div>
            <div className="text-xs text-slate-600 font-medium mt-1">Yabello &amp; Kemise Offices</div>
          </div>
          <div className="relative overflow-hidden p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
            <span className="absolute inset-x-0 top-0 h-1 bg-[#006B6E]" />
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#006B6E]/80">Head Office</div>
            <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 tabular-nums mt-1.5">
              {departments.length}
            </div>
            <div className="text-xs text-slate-600 font-medium mt-1">Directorates &amp; Work Units</div>
          </div>
        </div>

        {/* Region Tabs + Search */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-1.5 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
            <button
              onClick={() => setRegionTab('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                regionTab === 'all' ? 'bg-[#006B6E] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              All Offices ({branches.length})
            </button>
            <button
              onClick={() => setRegionTab('finfinne')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                regionTab === 'finfinne' ? 'bg-[#006B6E] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Finfinne Branches ({finfinneCount})
            </button>
            <button
              onClick={() => setRegionTab('upcountry')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                regionTab === 'upcountry' ? 'bg-[#006B6E] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Up-Country Branches ({upcountryCount})
            </button>
            <button
              onClick={() => setRegionTab('contact_office')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                regionTab === 'contact_office' ? 'bg-[#006B6E] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Contact Offices ({contactCount})
            </button>
            <button
              onClick={() => setRegionTab('hq_units')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                regionTab === 'hq_units' ? 'bg-[#006B6E] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              HQ Work Units ({departments.length})
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative w-full sm:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder={
                  regionTab === 'hq_units'
                    ? 'Search HQ directorate, head, or phone...'
                    : 'Search by branch name, city, manager, or phone...'
                }
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white border border-slate-200 text-xs pl-9 pr-3 py-2.5 rounded-xl focus:outline-none focus:border-[#006B6E] shadow-sm"
              />
            </div>
            <div className="text-xs font-medium text-slate-500 tabular-nums">
              Showing{' '}
              <strong className="font-bold text-slate-900">
                {regionTab === 'hq_units' ? filteredDepts.length : filteredBranches.length}
              </strong>{' '}
              verified entries
            </div>
          </div>
        </div>

        {/* HQ Work Units View */}
        {regionTab === 'hq_units' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDepts.map((dept) => (
              <div
                key={dept.departmentId}
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 text-[#006B6E] font-bold text-sm">
                    <Briefcase className="w-4 h-4 text-[#7DC242] shrink-0" />
                    <span>{dept.name}</span>
                  </div>
                  <span className="text-[10px] font-semibold uppercase bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                    {dept.category}
                  </span>
                </div>
                {dept.headName && (
                  <div className="text-xs text-slate-700">
                    <strong>Head:</strong> {dept.headName}
                    {dept.headTitle && <span className="text-slate-500 block text-[11px]">{dept.headTitle}</span>}
                  </div>
                )}
                {dept.description && (
                  <p className="text-xs text-slate-600 leading-relaxed">{dept.description}</p>
                )}
                <div className="pt-2 border-t border-slate-100 text-xs space-y-1 font-medium text-slate-700 tabular-nums">
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#006B6E]" />
                    <a href={`tel:${dept.telephone.replace(/[^+\d]/g, '')}`} className="hover:underline">
                      {dept.telephone}
                    </a>
                  </div>
                  {dept.fax && (
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <Printer className="w-3.5 h-3.5" />
                      <span>Fax: {dept.fax} · P.O. Box {dept.poBox || '10090'}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Branches Split View */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-3.5 max-h-[820px] overflow-y-auto pr-1">
              {filteredBranches.length === 0 ? (
                <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 space-y-2">
                  <Building className="w-8 h-8 text-slate-400 mx-auto" />
                  <h4 className="text-sm font-bold text-slate-900">No matching offices found</h4>
                  <button
                    onClick={() => {
                      setSearch('');
                      setRegionTab('all');
                    }}
                    className="mt-2 text-xs font-semibold text-[#006B6E] underline cursor-pointer"
                  >
                    Reset filters
                  </button>
                </div>
              ) : (
                filteredBranches.map((branch) => {
                  const isSelected = selectedBranch.branchId === branch.branchId;
                  return (
                    <div
                      key={branch.branchId}
                      onClick={() => setSelectedBranch(branch)}
                      className={`bg-white border rounded-2xl p-4 sm:p-5 cursor-pointer transition-all space-y-2.5 ${
                        isSelected
                          ? 'border-[#006B6E] ring-2 ring-[#006B6E]/15 shadow-md bg-slate-50/70'
                          : 'border-slate-200 hover:border-slate-300 shadow-sm'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="text-sm font-bold text-slate-900">{branch.name}</h3>
                          <span className="text-[11px] font-semibold text-[#006B6E] uppercase tracking-wider block mt-0.5">
                            {branch.city}
                          </span>
                        </div>
                        <div className="shrink-0">
                          {branch.isHeadquarters ? (
                            <span className="text-[10px] font-bold bg-[#eef8e6] text-[#006B6E] border border-[#7DC242]/40 px-2 py-0.5 rounded-full uppercase">
                              Headquarters
                            </span>
                          ) : branch.region === 'contact_office' ? (
                            <span className="text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full uppercase">
                              Contact Office
                            </span>
                          ) : null}
                        </div>
                      </div>

                      <div className="flex items-start gap-2 text-xs text-slate-600">
                        <MapPin className="w-3.5 h-3.5 text-[#006B6E] shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{branch.address}</span>
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-600">
                        <span className="font-semibold text-slate-800 tabular-nums">{branch.phone}</span>
                        <span className="text-slate-500">{branch.managerName}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div className="lg:col-span-7 space-y-6 lg:sticky lg:top-24">
              {selectedBranch.branchId && (
                <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 space-y-6 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-semibold text-[#006B6E] uppercase tracking-wider">
                        <MapPin className="w-4 h-4 text-[#7DC242]" />
                        <span>Selected Oromia Insurance Office</span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mt-0.5">{selectedBranch.name}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {selectedBranch.address} · {selectedBranch.city}
                      </p>
                    </div>

                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        `Oromia Insurance ${selectedBranch.name} ${selectedBranch.city} Ethiopia`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-[#006B6E] hover:bg-[#005254] text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-sm whitespace-nowrap"
                    >
                      <span>Open in Maps</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#9ad864]" />
                    </a>
                  </div>

                  <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-inner h-[360px] sm:h-[420px] bg-slate-100">
                    <iframe
                      title={`${selectedBranch.name} Location Map`}
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(
                        `Oromia Insurance ${selectedBranch.city} Ethiopia`
                      )}&hl=en&z=13&output=embed`}
                      className="w-full h-full border-0"
                      loading="lazy"
                      allowFullScreen
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-0.5">
                      <span className="text-slate-500 text-[11px] block">Branch Manager / Head</span>
                      <strong className="text-slate-900 font-semibold">{selectedBranch.managerName}</strong>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-0.5">
                      <span className="text-slate-500 text-[11px] block">Telephone</span>
                      <span className="font-bold text-[#006B6E] tabular-nums">{selectedBranch.phone}</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-0.5">
                      <span className="text-slate-500 text-[11px] block">Official Email</span>
                      <a
                        href={`mailto:${selectedBranch.email}`}
                        className="font-medium text-slate-800 hover:underline flex items-center gap-1.5"
                      >
                        <Mail className="w-3.5 h-3.5 text-[#006B6E]" />
                        <span>{selectedBranch.email}</span>
                      </a>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-0.5">
                      <span className="text-slate-500 text-[11px] block">Fax &amp; P.O. Box</span>
                      <span className="font-medium text-slate-700 tabular-nums">
                        {selectedBranch.fax ? `Fax: ${selectedBranch.fax} · ` : ''}
                        P.O. Box {selectedBranch.poBox || '10090'}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
