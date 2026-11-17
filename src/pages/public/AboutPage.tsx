import React from 'react';
import { store } from '../../services/store';
import { useLanguage } from '../../i18n/LanguageContext';
import { SEED_CMS_CONFIG } from '../../data/seedData';
import {
  Compass,
  Target,
  Sparkles,
  ExternalLink,
  ArrowRight,
  Building2,
  Users,
  Handshake,
  Sprout
} from 'lucide-react';

interface AboutPageProps {
  navigate: (route: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ navigate }) => {
  const { t } = useLanguage();
  const cms = store.getCmsConfig() || SEED_CMS_CONFIG;
  const news = store.getNews();

  return (
    <div className="min-h-screen bg-slate-50 py-6 sm:py-12">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        {/* Header */}
        <div className="max-w-4xl space-y-3 sm:space-y-4">
          <div className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-[#006B6E] uppercase tracking-wider">
            <span>{t('nav.about')}</span>
            <span aria-hidden="true">·</span>
            <span>Established January 26, 2009</span>
          </div>
          <h1 className="text-2xl sm:text-5xl font-bold text-[#006B6E] tracking-tight leading-tight">
            {t('home.whyTitle')}
          </h1>
          <p className="text-sm font-semibold text-[#5f9e2b] italic">
            {cms.motto} · {cms.mottoOromo} · {cms.mottoAmharic}
          </p>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Oromia Insurance S.C. (OIC) was established on January 26, 2009 and commenced insurance operations on February 9, 2009 with an initial paid-up capital of ETB 26 Million and 540 founding shareholders. Today, OIC stands as one of Ethiopia’s premier composite insurers with a paid-up capital of ETB 1 Billion, subscribed capital of ETB 3 Billion, 1.6M+ low-income farmer shareholders, and a nationwide footprint of 62 branches (30 in Finfinne and 32 regional up-country offices) plus 2 contact offices.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              type="button"
              onClick={() => navigate(store.getCurrentUser() ? '/portal' : '/login')}
              className="bg-[#006B6E] hover:bg-[#005254] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold shadow-sm transition-all flex items-center gap-2 group cursor-pointer"
            >
              <span>{t('hero.getStarted')}</span>
              <ArrowRight className="w-4 h-4 text-[#9ad864] transition-transform group-hover:translate-x-0.5" />
            </button>
            <button
              type="button"
              onClick={() => navigate('/leadership')}
              className="bg-white hover:bg-slate-100 text-[#006B6E] border border-slate-300 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer"
            >
              Board, Executives &amp; Structure
            </button>
            <button
              type="button"
              onClick={() => navigate('/insurance')}
              className="bg-white hover:bg-slate-100 text-[#006B6E] border border-slate-300 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer"
            >
              {t('nav.products')}
            </button>
          </div>
        </div>

        {/* Vision, Mission & O.R.O.M.I.A. Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-11 h-11 rounded-xl bg-[#006B6E] text-[#9ad864] flex items-center justify-center shadow-sm">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Our Vision</h3>
            <p className="text-sm text-slate-800 font-semibold leading-relaxed">
              &ldquo;{cms.vision}&rdquo;
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Guided by our corporate motto &ldquo;Rest. Assured.&rdquo;, we build lasting security for families, farmers, cooperatives, and businesses nationwide.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-11 h-11 rounded-xl bg-[#006B6E] text-[#9ad864] flex items-center justify-center shadow-sm">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Our Mission</h3>
            <p className="text-xs text-slate-700 leading-relaxed">
              &ldquo;{cms.mission}&rdquo;
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-11 h-11 rounded-xl bg-[#006B6E] text-[#9ad864] flex items-center justify-center shadow-sm">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Core Values (O.R.O.M.I.A.)</h3>
            <ul className="text-xs text-slate-600 space-y-1.5 pt-1">
              <li><strong className="text-[#006B6E]">O</strong> — Oneness</li>
              <li><strong className="text-[#006B6E]">R</strong> — Reliability</li>
              <li><strong className="text-[#006B6E]">O</strong> — Ownership</li>
              <li><strong className="text-[#006B6E]">M</strong> — Mastery</li>
              <li><strong className="text-[#006B6E]">I</strong> — Innovation</li>
              <li><strong className="text-[#006B6E]">A</strong> — Accountability</li>
            </ul>
          </div>
        </div>

        {/* Financial Strength & Capital Growth */}
        <div className="bg-gradient-to-br from-[#022b2d] via-[#005254] to-[#006B6E] text-white rounded-3xl p-8 sm:p-12 shadow-xl space-y-6">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#9ad864]">
              Actuarial Strength &amp; National Footprint
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              ETB 1B Paid-Up Capital · ETB 3B Subscribed Capital
            </h2>
            <p className="text-sm text-slate-200 leading-relaxed">
              From ETB 26 Million initial paid-up capital in February 2009, Oromia Insurance S.C. has expanded into one of Ethiopia’s strongest inclusive financial institutions — backed by 1.6M+ smallholder farmer shareholders, 34 farmers’ cooperative unions, sister banks (Oromia Bank &amp; Cooperative Bank of Oromia), and four comprehensive insurance lines.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 pt-4 border-t border-white/15">
            <div className="relative overflow-hidden p-5 rounded-2xl bg-white/8 border border-white/15">
              <span className="absolute inset-x-0 top-0 h-1 bg-[#7DC242]" />
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#9ad864]">
                Established
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white tabular-nums mt-1.5">
                2009
              </div>
              <div className="text-xs text-slate-200 font-medium mt-1.5 leading-snug">
                Licensed Jan 26 · Operations Feb 9
              </div>
            </div>

            <div className="relative overflow-hidden p-5 rounded-2xl bg-white/8 border border-white/15">
              <span className="absolute inset-x-0 top-0 h-1 bg-[#7DC242]" />
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#9ad864]">
                Financial Strength
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white tabular-nums mt-1.5">
                ETB 1B / 3B
              </div>
              <div className="text-xs text-slate-200 font-medium mt-1.5 leading-snug">
                Paid-Up &amp; Subscribed Capital
              </div>
            </div>

            <div className="relative overflow-hidden p-5 rounded-2xl bg-white/8 border border-white/15">
              <span className="absolute inset-x-0 top-0 h-1 bg-[#7DC242]" />
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#9ad864]">
                Cooperative Ownership
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white tabular-nums mt-1.5">
                1.6M+
              </div>
              <div className="text-xs text-slate-200 font-medium mt-1.5 leading-snug">
                Smallholder Farmer Shareholders
              </div>
            </div>

            <div className="relative overflow-hidden p-5 rounded-2xl bg-white/8 border border-white/15">
              <span className="absolute inset-x-0 top-0 h-1 bg-[#7DC242]" />
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#9ad864]">
                Nationwide Footprint
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white tabular-nums mt-1.5">
                62 + 2
              </div>
              <div className="text-xs text-slate-200 font-medium mt-1.5 leading-snug">
                30 Finfinne &amp; 32 Regional Branches, Plus 2 Contact Offices
              </div>
            </div>
          </div>
        </div>

        {/* Unique Features of Oromia Insurance */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">What Makes Oromia Insurance S.C. Unique</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-2">
              <Building2 className="w-5 h-5 text-[#006B6E]" />
              <h3 className="text-sm font-bold text-slate-900">Sister Banking Synergy</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Strong institutional synergy with sister companies Oromia Bank (OB) and Cooperative Bank of Oromia (CBO) across Ethiopia.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-2">
              <Users className="w-5 h-5 text-[#006B6E]" />
              <h3 className="text-sm font-bold text-slate-900">Broad Cooperative Ownership</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Backed by 34 farmers’ cooperative unions and 1.6M+ smallholder farmers who are both shareholders and clients.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-2">
              <Sprout className="w-5 h-5 text-[#5f9e2b]" />
              <h3 className="text-sm font-bold text-slate-900">Inclusive Rural &amp; Takaful Reach</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Leader in Crop, Livestock, Microinsurance, and Sharia Advisory Committee-supervised Halal Takaful insurance.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-2">
              <Handshake className="w-5 h-5 text-[#006B6E]" />
              <h3 className="text-sm font-bold text-slate-900">Proven Claim Integrity</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Demonstrated by Ethiopia’s largest crop insurance compensation — ETB 40 Million paid to farmers in the Amhara region.
              </p>
            </div>
          </div>
        </div>

        {/* Company News & Announcements */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-3 border-b border-slate-200">
            <div>
              <div className="text-xs font-semibold text-[#006B6E] uppercase tracking-wider">
                News &amp; Events
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
                Recent Milestones &amp; Announcements
              </h2>
            </div>
            <button
              onClick={() => navigate('/media')}
              className="text-xs font-semibold text-[#006B6E] hover:text-[#005254] flex items-center gap-1 cursor-pointer"
            >
              <span>View Media, Reports &amp; Downloads</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {news.slice(0, 3).map((item) => (
              <div
                key={item.id}
                onClick={() => navigate('/media')}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 cursor-pointer"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#eef8e6] text-[#006B6E]">
                    {item.tag}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.summary}</p>
                </div>
                <div className="text-[11px] font-semibold text-slate-400 tabular-nums pt-3 border-t border-slate-100">
                  {item.date} · Oromia Insurance S.C.
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Head Office Location */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 space-y-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Oromia Insurance S.C. Headquarters (Lideya Plaza)
              </h2>
              <p className="text-xs text-slate-500 mt-1">{cms.headOfficeAddress}</p>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Oromia+Insurance+Head+Office+Lideya+Plaza+Ethio+China+Friendship+Avenue+Addis+Ababa"
              target="_blank"
              rel="noreferrer"
              className="bg-[#006B6E] hover:bg-[#005254] text-white px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-sm transition-all"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-inner h-[360px] sm:h-[420px] relative">
            <iframe
              title="Oromia Insurance S.C. Headquarters Map"
              src="https://maps.google.com/maps?q=Oromia%20Insurance%20Head%20Office%20Lideya%20Plaza%20Ethio%20China%20Friendship%20Avenue%20Addis%20Ababa&t=&z=16&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  );
};
