import React, { useState } from 'react';
import { store } from '../services/store';
import { useLanguage } from '../i18n/LanguageContext';
import {
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  ShieldCheck
} from 'lucide-react';

interface FooterProps {
  navigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  const { t } = useLanguage();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterName, setNewsletterName] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!newsletterEmail.trim() || !emailPattern.test(newsletterEmail.trim())) {
      setFeedback({ type: 'error', message: 'Please provide a valid corporate or personal email address.' });
      return;
    }

    setIsSubmitting(true);
    const res = store.addSubscriber(newsletterEmail, newsletterName, 'weekly', 'footer_signup');
    setIsSubmitting(false);
    if (res.success) {
      setFeedback({ type: 'success', message: res.message });
      setNewsletterEmail('');
      setNewsletterName('');
    } else {
      setFeedback({ type: 'error', message: res.message });
    }
    setTimeout(() => setFeedback(null), 5000);
  };

  return (
    <footer className="bg-gradient-to-b from-[#022b2d] to-[#004d50] text-slate-300 border-t border-[#006B6E]/50 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">

        {/* TOP ROW: NEWSLETTER SIGNUP BANNER */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-5 space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-[#7DC242] uppercase tracking-wider">
                  {t('footer.stayInformed')}
                </span>
                <span aria-hidden="true" className="text-[#7DC242]/70">·</span>
                <span className="text-xs text-slate-300">{t('footer.gazette')}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                {t('footer.newsletterTitle')}
              </h3>
              <p className="text-xs text-slate-300/80 leading-relaxed">
                {t('footer.newsletterDesc')}
              </p>
            </div>

            <div className="lg:col-span-7">
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={newsletterName}
                    onChange={(e) => setNewsletterName(e.target.value)}
                    placeholder="Full Name (optional)"
                    className="bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7DC242] focus:bg-white/15 transition-all w-full sm:w-1/3"
                  />
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter email address (e.g. name@company.et)"
                    className="bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7DC242] focus:bg-white/15 transition-all flex-1"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#7DC242] hover:bg-[#6fb435] text-[#022b2d] px-6 py-2.5 rounded-xl font-bold text-xs tracking-tight transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg shrink-0 cursor-pointer disabled:opacity-50"
                  >
                    <span>{isSubmitting ? t('footer.subscribing') : t('footer.subscribe')}</span>
                    <Send className="w-3.5 h-3.5 text-[#022b2d]" />
                  </button>
                </div>

                {feedback && (
                  <div className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                    feedback.type === 'success'
                      ? 'bg-emerald-950/70 border border-emerald-500/40 text-emerald-300'
                      : 'bg-rose-950/70 border border-rose-500/40 text-rose-300'
                  }`}>
                    {feedback.type === 'success' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    )}
                    <span>{feedback.message}</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* MIDDLE ROW: 4 COLUMN DIRECTORY */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Corporate Profile & Verified Social Links */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-white tracking-tight">Oromia Insurance S.C.</span>
            </div>
            <p className="text-xs text-[#7DC242] font-semibold tracking-wide uppercase">
              "Rest. Assured."
            </p>
            <p className="text-xs text-slate-300/85 leading-relaxed">
              Licensed by the National Bank of Ethiopia on January 26, 2009 and operational since February 9, 2009. Oromia Insurance S.C. provides General, Life &amp; Health, Agriculture &amp; Microinsurance, and Halal Takaful cover across 62 branches and 2 contact offices.
            </p>

            {/* Social Media Section (Verified Official OIC Links) */}
            <div className="pt-2 space-y-2">
              <span className="text-[11px] font-bold text-white uppercase tracking-wider block">
                {t('footer.connect')}
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href="https://www.linkedin.com/company/oromia-insurance/"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Oromia Insurance S.C. on LinkedIn"
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#0077b5] text-slate-200 hover:text-white flex items-center justify-center transition-all border border-white/10 cursor-pointer"
                  aria-label="LinkedIn"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                </a>

                <a
                  href="https://web.facebook.com/OromiaInsuranceEt/"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Oromia Insurance S.C. on Facebook"
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#1877f2] text-slate-200 hover:text-white flex items-center justify-center transition-all border border-white/10 cursor-pointer"
                  aria-label="Facebook"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                <a
                  href="https://t.me/oromia_insurance"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Oromia Insurance S.C. on Telegram"
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#229ED9] text-slate-200 hover:text-white flex items-center justify-center transition-all border border-white/10 cursor-pointer"
                  aria-label="Telegram"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.67-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.37-.49 1.02-.74 3.99-1.74 6.65-2.89 7.99-3.44 3.81-1.58 4.6-1.85 5.12-1.86.11 0 .37.03.54.17.14.12.18.28.2.45-.01.07-.01.21-.02.33z"/>
                  </svg>
                </a>

                <a
                  href="https://x.com/InsuranceO18089"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Oromia Insurance S.C. on X"
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-black text-slate-200 hover:text-white flex items-center justify-center transition-all border border-white/10 cursor-pointer"
                  aria-label="X"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>

                <a
                  href="https://www.instagram.com/oromia_insurance/"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Oromia Insurance S.C. on Instagram"
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#E1306C] text-slate-200 hover:text-white flex items-center justify-center transition-all border border-white/10 cursor-pointer"
                  aria-label="Instagram"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
                  </svg>
                </a>

                <a
                  href="https://www.tiktok.com/@oic_mbd2024"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Oromia Insurance S.C. on TikTok"
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-black text-slate-200 hover:text-white flex items-center justify-center transition-all border border-white/10 cursor-pointer"
                  aria-label="TikTok"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Public Portals */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">{t('footer.publicServices')}</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigate('/about')} className="hover:text-white transition-colors cursor-pointer text-left">
                  {t('nav.about')}
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/insurance')} className="hover:text-white transition-colors cursor-pointer text-left">
                  {t('nav.products')}
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/claims')} className="hover:text-white transition-colors cursor-pointer text-left">
                  {t('nav.claims')}
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/media')} className="hover:text-white transition-colors cursor-pointer text-left">
                  {t('nav.media')}
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/verify-policy')} className="hover:text-white transition-colors cursor-pointer text-left">
                  {t('nav.verify')}
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/branches')} className="hover:text-white transition-colors cursor-pointer text-left">
                  {t('nav.branches')}
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/contact')} className="hover:text-white transition-colors cursor-pointer text-left">
                  {t('nav.contact')}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Leadership & Governance */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">{t('footer.leadership')}</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigate('/board-of-directors')} className="hover:text-white text-[#9ad864] hover:underline transition-colors cursor-pointer text-left font-medium">
                  Board of Directors (10 Members)
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/executive-managers')} className="hover:text-white text-[#9ad864] hover:underline transition-colors cursor-pointer text-left font-medium">
                  Executive Management Team
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/organizational-structure')} className="hover:text-white text-[#9ad864] hover:underline transition-colors cursor-pointer text-left font-medium">
                  Organizational Structure Chart
                </button>
              </li>
              <li className="pt-2 border-t border-white/10">
                <span className="text-[11px] text-slate-300 font-semibold block uppercase tracking-wider">Portals &amp; Workspaces:</span>
              </li>
              <li>
                <button onClick={() => navigate('/portal')} className="hover:text-white text-slate-300/80 transition-colors text-left cursor-pointer">
                  Customer Self-Service Portal
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/operator')} className="hover:text-white text-slate-300/80 transition-colors text-left cursor-pointer">
                  Agent &amp; Operator Portal
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/staff')} className="hover:text-white text-slate-300/80 transition-colors text-left cursor-pointer">
                  Underwriting &amp; Claims Review
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Corporate Headquarters */}
          <div className="space-y-3 text-xs">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">{t('footer.headquarters')}</h4>
            <div className="flex items-start gap-2.5 text-slate-300/85">
              <MapPin className="w-4 h-4 text-[#7DC242] shrink-0 mt-0.5" />
              <span>Ethio-China Friendship Avenue, Lideya Plaza (Oromia Insurance Headquarters), P.O. Box: 10090, Addis Ababa, Ethiopia</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300/85">
              <Phone className="w-4 h-4 text-[#7DC242] shrink-0" />
              <span>+251-115-572121 (Fax: +251-115-572122)</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300/85">
              <Mail className="w-4 h-4 text-[#7DC242] shrink-0" />
              <span>info@oromiainsurance.com</span>
            </div>
            <div className="pt-2 border-t border-white/10 flex items-center gap-1.5 text-[11px] text-[#9ad864]">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              <span>{t('footer.licensed')}</span>
            </div>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-300/80">
          <div>
            © {new Date().getFullYear()} Oromia Insurance S.C. (Ethiopia). All rights reserved.
          </div>
          <div className="text-[11px] text-slate-400">
            Supported by sister banks Oromia Bank (OB) &amp; Cooperative Bank of Oromia (CBO)
          </div>
        </div>
      </div>
    </footer>
  );
};
