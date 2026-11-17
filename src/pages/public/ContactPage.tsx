import React, { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { SEED_CMS_CONFIG, SEED_FAQS } from '../../data/seedData';
import { store } from '../../services/store';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  ShieldAlert,
  ExternalLink,
  Printer,
  HelpCircle,
  ChevronDown
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { t } = useLanguage();
  const cms = store.getCmsConfig() || SEED_CMS_CONFIG;
  const [submitted, setSubmitted] = useState(false);
  const [inquiryRef, setInquiryRef] = useState('');
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquiryRef(`OIC-INQ-${Math.floor(10000 + Math.random() * 90000)}`);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-6 sm:py-12">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-3xl space-y-2 sm:space-y-3">
          <div className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-[#006B6E] uppercase tracking-wider">
            <span>{t('nav.contact')}</span>
            <span aria-hidden="true">·</span>
            <span>Rest. Assured.</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-[#006B6E] tracking-tight">
            {t('pages.contactTitle')}
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Reach Oromia Insurance S.C. Headquarters at Lideya Plaza or our Claims Management Directorate for policy underwriting, Takaful inquiries, agricultural &amp; cooperative union partnerships, or claim assistance.
          </p>
        </div>

        {/* Claims & HQ Banner */}
        <div className="bg-gradient-to-br from-[#022b2d] via-[#005254] to-[#006B6E] text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#7DC242]/20 border border-[#7DC242]/40 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-6 h-6 text-[#9ad864]" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#9ad864]">
                Claims &amp; Head Office Support
              </span>
              <h3 className="text-lg font-bold text-white mt-0.5">
                Direct Head Office &amp; Claims Management Assistance
              </h3>
              <p className="text-xs text-slate-200 mt-1">
                Switchboard: {cms.headOfficePhone} · Claims Management Directorate: {cms.claimsPhone}
              </p>
            </div>
          </div>
          <div className="shrink-0 flex flex-wrap items-center gap-3">
            <a
              href="tel:+251115572121"
              className="bg-[#7DC242] hover:bg-[#6db334] text-[#022b2d] text-xs sm:text-sm font-extrabold tracking-tight tabular-nums px-5 py-3 rounded-xl transition-all shadow-md flex items-center gap-2 whitespace-nowrap"
            >
              <Phone className="w-4 h-4" />
              <span>{cms.headOfficePhone}</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Details */}
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-5 shadow-sm text-xs">
              <h3 className="text-sm font-bold text-[#006B6E] uppercase tracking-wider">
                Oromia Insurance Headquarters
              </h3>

              <div className="space-y-4 text-slate-600">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#006B6E] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">Lideya Plaza (OIC Headquarters)</strong>
                    <span>{cms.headOfficeAddress}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#006B6E] shrink-0" />
                  <div>
                    <strong className="text-slate-900 block">Head Office Telephone</strong>
                    <span className="font-semibold text-slate-800 tabular-nums">{cms.headOfficePhone}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#006B6E] shrink-0" />
                  <div>
                    <strong className="text-slate-900 block">Claims Management Directorate</strong>
                    <span className="font-semibold text-slate-800 tabular-nums">{cms.claimsPhone}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Printer className="w-4 h-4 text-[#006B6E] shrink-0" />
                  <div>
                    <strong className="text-slate-900 block">Fax &amp; P.O. Box</strong>
                    <span className="font-semibold text-slate-800 tabular-nums">{cms.headOfficeFax} · P.O. Box 10090</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#006B6E] shrink-0" />
                  <div>
                    <strong className="text-slate-900 block">Official Email</strong>
                    <span className="font-medium text-slate-800">{cms.headOfficeEmail}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2 border-t border-slate-100">
                  <Clock className="w-4 h-4 text-[#006B6E] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">Working Hours</strong>
                    <span>Monday – Friday: 8:00 AM – 5:00 PM</span>
                    <span className="block mt-0.5">Saturday: 8:00 AM – 12:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
              <h3 className="text-base font-bold text-[#006B6E] mb-1">Send an Inquiry</h3>
              <p className="text-xs text-slate-500 mb-6">
                Messages are routed to Oromia Insurance S.C. customer relations at Lideya Plaza.
              </p>

              {submitted ? (
                <div className="bg-[#eef8e6] border border-[#7DC242]/50 rounded-xl p-6 text-center space-y-3">
                  <CheckCircle2 className="w-8 h-8 text-[#5f9e2b] mx-auto" />
                  <h4 className="text-sm font-bold text-[#022b2d]">Inquiry Received</h4>
                  <p className="text-xs text-slate-700">
                    Reference <strong className="font-bold text-slate-900 tabular-nums">{inquiryRef}</strong> logged. Our team will contact you promptly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setInquiryRef('');
                    }}
                    className="bg-white border border-slate-300 text-slate-800 px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:bg-white focus:outline-none focus:border-[#006B6E]"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Telephone Number</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:bg-white focus:outline-none focus:border-[#006B6E]"
                        placeholder="+251 9..."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:bg-white focus:outline-none focus:border-[#006B6E]"
                        placeholder="name@example.com"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Inquiry Topic</label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:bg-white focus:outline-none focus:border-[#006B6E]"
                      >
                        <option value="General Inquiry">General Insurance Inquiry</option>
                        <option value="Life & Health">Life &amp; Health Insurance</option>
                        <option value="Agriculture & Micro">Agriculture &amp; Microinsurance</option>
                        <option value="Halal Takaful">Halal Takaful Inquiry</option>
                        <option value="Claims Status">Claims Management Follow-up</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Message</label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:bg-white focus:outline-none focus:border-[#006B6E]"
                      placeholder="How can Oromia Insurance S.C. assist you?"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-[#006B6E] hover:bg-[#005254] text-white px-6 py-2.5 rounded-lg font-semibold transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5 text-[#9ad864]" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Official FAQs Accordion */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-5 shadow-sm">
          <div className="flex items-center gap-2 text-[#006B6E]">
            <HelpCircle className="w-5 h-5 text-[#7DC242]" />
            <h2 className="text-xl font-bold text-slate-900">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-2.5">
            {SEED_FAQS.map((faq, idx) => (
              <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaqIdx(openFaqIdx === idx ? null : idx)}
                  className="w-full px-4 py-3 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-900 bg-slate-50 hover:bg-slate-100 cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#006B6E] transition-transform ${
                      openFaqIdx === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaqIdx === idx && (
                  <div className="px-4 py-3 text-xs text-slate-600 leading-relaxed bg-white border-t border-slate-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Map */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-5 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Lideya Plaza · Oromia Insurance Headquarters
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">{cms.headOfficeAddress}</p>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Oromia+Insurance+Head+Office+Lideya+Plaza+Ethio+China+Friendship+Avenue+Addis+Ababa"
              target="_blank"
              rel="noreferrer"
              className="bg-[#006B6E] hover:bg-[#005254] text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-sm"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="rounded-xl overflow-hidden border border-slate-200 h-[340px]">
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
