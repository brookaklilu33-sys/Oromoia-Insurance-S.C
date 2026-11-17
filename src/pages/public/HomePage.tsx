import React, { useState, useEffect } from 'react';
import { store } from '../../services/store';
import { getDestinationForAccount } from '../../services/authService';
import { useLanguage } from '../../i18n/LanguageContext';
import {
  SEED_FAQS,
  SEED_CMS_CONFIG
} from '../../data/seedData';
import {
  Shield,
  ArrowRight,
  CheckCircle2,
  FileText,
  HeartPulse,
  Sprout,
  MoonStar,
  ChevronLeft,
  ChevronRight,
  Building2,
  Users,
  Handshake,
  Phone,
  Sparkles,
  Calendar
} from 'lucide-react';
import { ResponsiveImage, getCategoryCoverImage } from '../../components/ResponsiveImage';

interface HomePageProps {
  navigate: (route: string) => void;
}

interface HeroSlide {
  id: number;
  badge: string;
  title: string;
  description: string;
  category: string;
  bgImage: string;
  bgAlt: string;
  ctaPath?: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    badge: 'Oromia Insurance S.C. · Rest. Assured. · Est. 2009',
    title: 'Becoming the Most Trusted Protector of a Secured Tomorrow',
    description:
      'Licensed on January 26, 2009 and backed by ETB 1B Paid-Up Capital (ETB 3B Subscribed) alongside 1.6M+ smallholder farmer shareholders, Oromia Insurance S.C. turns shared risk into shared peace of mind.',
    category: 'Rest. Assured.',
    bgImage: '/assets/oic/hero_homepage.png',
    bgAlt: 'Oromia Insurance S.C. Headquarters — Rest. Assured.'
  },
  {
    id: 2,
    badge: 'General (Non-Life) Insurance · 62 Branches Nationwide',
    title: 'Comprehensive Motor, Fire, Marine, Engineering & Bond Protection',
    description:
      'Complete General Insurance underwriting covering private and commercial motor fleets, industrial property, contractors all risks, import/export marine cargo, and surety bonds across Ethiopia.',
    category: 'General Insurance',
    bgImage: '/assets/oic/hero_motor.jpg',
    bgAlt: 'Oromia Insurance Motor and Commercial Non-Life Protection'
  },
  {
    id: 3,
    badge: 'Life & Health Insurance Directorate',
    title: 'Dependable Life Assurance & Institutional Health Schemes',
    description:
      'Safeguarding Ethiopian households and corporate teams with Group Term Life, Credit Life, Mortgage Protection, Endowment, Term Assurance, and Outpatient/Inpatient Medical Coverage.',
    category: 'Life & Health',
    bgImage: '/assets/oic/hero_life.jpg',
    bgAlt: 'Oromia Insurance Life and Family Health Security'
  },
  {
    id: 4,
    badge: 'Agriculture & Microinsurance · ETB 40 Million Amhara Record Payout',
    title: 'Protecting Farmers, Pastoralists, Cooperatives & Micro-Enterprises',
    description:
      'Pioneering Weather Index, Multi-Peril Crop, Area Yield, Coffee Plantation, Livestock (IBLI), and inclusive Microinsurance across 34+ cooperative unions, Oromia Bank, and Cooperative Bank of Oromia.',
    category: 'Agriculture & Microinsurance',
    bgImage: '/assets/oic/hero_crop.jpg',
    bgAlt: 'Ethiopian Agricultural and Crop Insurance Solutions'
  },
  {
    id: 5,
    badge: 'Halal Takaful Insurance · Sharia Advisory Supervised',
    title: 'Sharia-Compliant Takaful Across All 62 Branches & 2 Contact Offices',
    description:
      'Cooperative, interest-free Halal Takaful protection spanning Motor, Property, Engineering, Liability, Pecuniary, and Accident Takaful — supervised by an independent Sharia Advisory Committee.',
    category: 'Halal Takaful',
    bgImage: '/assets/oic/cat_takaful.jpg',
    bgAlt: 'Oromia Insurance Halal Takaful Coverage'
  }
];

const FOUR_PILLARS = [
  {
    id: 'non_life',
    title: 'General (Non-Life) Insurance',
    subtitle: 'Motor, Fire, Engineering, Marine, Bonds & Liability',
    desc: 'Comprehensive asset, fleet, construction, cargo, workmen’s compensation, and surety bond cover across 62 branches.',
    image: '/assets/oic/cat_non_life.jpg',
    icon: Shield
  },
  {
    id: 'life_health',
    title: 'Life & Health Insurance',
    subtitle: 'Term, Endowment, Credit Life & Medical Plans',
    desc: 'Financial continuity and outpatient/inpatient healthcare protection for families, borrowers, and organizations.',
    image: '/assets/oic/hero_life.jpg',
    icon: HeartPulse
  },
  {
    id: 'agri_micro',
    title: 'Agriculture & Microinsurance',
    subtitle: 'Crop Index, Coffee, Livestock IBLI & Credit Life',
    desc: 'Home to Ethiopia’s landmark ETB 40 Million Amhara crop payout, serving 1.6M+ farmer shareholders and 34+ unions.',
    image: '/assets/oic/cat_agri_micro.jpg',
    icon: Sprout
  },
  {
    id: 'halal_takaful',
    title: 'Halal Takaful Insurance',
    subtitle: 'Property, Engineering, Liability & Accident Takaful',
    desc: 'Sharia-compliant mutual solidarity cover supervised by our independent Sharia Advisory Committee.',
    image: '/assets/oic/cat_takaful.jpg',
    icon: MoonStar
  }
];

const OROMIA_VALUES = [
  { letter: 'O', title: 'Oneness', desc: 'Unity of purpose across shareholders, farmers, employees, and sister institutions.' },
  { letter: 'R', title: 'Reliability', desc: 'Dependable protection and honoring promises when losses strike.' },
  { letter: 'O', title: 'Ownership', desc: 'Shared stewardship with 1.6M+ smallholder farmers, cooperative unions, and stakeholders.' },
  { letter: 'M', title: 'Mastery', desc: 'Disciplined underwriting, claims speed & fairness, and actuarial rigor.' },
  { letter: 'I', title: 'Innovation', desc: 'Pioneering index-based agriculture, microinsurance, Halal Takaful, and digital portals.' },
  { letter: 'A', title: 'Accountability', desc: 'Transparent governance regulated by the National Bank of Ethiopia.' }
];

export const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  const publishedProducts = store.getPublishedProducts();
  const newsArticles = store.getNews();
  const cms = store.getCmsConfig() || SEED_CMS_CONFIG;
  const { t } = useLanguage();

  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);
  const [isHeroPaused, setIsHeroPaused] = useState(false);

  useEffect(() => {
    if (isHeroPaused) return;
    const interval = setInterval(() => {
      setCurrentSlideIdx((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isHeroPaused]);

  const handleNextHero = () => setCurrentSlideIdx((prev) => (prev + 1) % HERO_SLIDES.length);
  const handlePrevHero = () => setCurrentSlideIdx((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'non_life':
        return <Shield className="w-5 h-5 text-[#006B6E]" />;
      case 'life_health':
        return <HeartPulse className="w-5 h-5 text-[#006B6E]" />;
      case 'agri_micro':
        return <Sprout className="w-5 h-5 text-[#5f9e2b]" />;
      case 'halal_takaful':
        return <MoonStar className="w-5 h-5 text-[#006B6E]" />;
      default:
        return <FileText className="w-5 h-5 text-[#006B6E]" />;
    }
  };

  const getCategoryBadgeLabel = (cat: string) => {
    switch (cat) {
      case 'non_life':
        return 'General Insurance';
      case 'life_health':
        return 'Life & Health';
      case 'agri_micro':
        return 'Agri & Micro';
      case 'halal_takaful':
        return 'Halal Takaful';
      default:
        return cat;
    }
  };

  const activeSlide = HERO_SLIDES[currentSlideIdx];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* SECTION 1: HERO CAROUSEL */}
      <section className="relative bg-gradient-to-br from-[#022b2d] via-[#005254] to-[#006B6E] text-white overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          {HERO_SLIDES.map((slide, idx) => {
            const isSlideActive = idx === currentSlideIdx;
            if (idx !== 0 && !isSlideActive) return null;
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-500 ease-out ${
                  isSlideActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <ResponsiveImage
                  src={slide.bgImage}
                  alt={slide.bgAlt}
                  priority={idx === 0}
                  sizes="100vw"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            );
          })}
          <div className="absolute inset-0 z-20 bg-gradient-to-r from-[#022b2d]/90 via-[#005254]/75 to-[#006B6E]/45 pointer-events-none" />
        </div>

        <button
          onClick={handlePrevHero}
          aria-label="Previous slide"
          className="absolute left-3 sm:left-6 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md border border-white/25 text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNextHero}
          aria-label="Next slide"
          className="absolute right-3 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md border border-white/25 text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div
          onMouseEnter={() => setIsHeroPaused(true)}
          onMouseLeave={() => setIsHeroPaused(false)}
          className="relative z-10 max-w-7xl mx-auto px-12 sm:px-16 lg:px-24 py-14 sm:py-24 lg:py-32 flex flex-col justify-center min-h-[400px] sm:min-h-[540px]"
        >
          <div
            key={activeSlide.id}
            className="max-w-3xl space-y-4 sm:space-y-6 transition-all duration-500 animate-in fade-in slide-in-from-bottom-2"
          >
            <span className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#9ad864] bg-white/10 backdrop-blur-sm px-3 py-1 rounded-md border border-white/15">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{activeSlide.badge}</span>
            </span>

            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
              {activeSlide.id === 1 ? t('hero.slide1.title', activeSlide.title) : activeSlide.title}
            </h1>

            <p className="text-xs sm:text-lg text-slate-100 leading-relaxed max-w-2xl">
              {activeSlide.id === 1 ? t('hero.slide1.desc', activeSlide.description) : activeSlide.description}
            </p>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <button
                onClick={() => {
                  const currentUser = store.getCurrentUser();
                  if (currentUser) {
                    navigate(getDestinationForAccount(currentUser));
                  } else {
                    navigate('/login');
                  }
                }}
                className="bg-[#7DC242] hover:bg-[#6db334] text-[#022b2d] px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-xl text-xs sm:text-sm font-bold tracking-tight transition-all shadow-lg flex items-center gap-2 group whitespace-nowrap cursor-pointer"
              >
                <span>{t('hero.getStarted')}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => navigate('/insurance')}
                className="bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 text-white px-5 sm:px-6 py-2.5 sm:py-3.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer"
              >
                <span>{t('home.productsAll')}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {HERO_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrentSlideIdx(idx)}
              aria-label={`Go to slide ${idx + 1}: ${slide.category}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentSlideIdx ? 'w-8 bg-[#7DC242] shadow-md' : 'w-2 bg-white/35 hover:bg-white/65'
              }`}
            />
          ))}
        </div>
      </section>

      {/* SECTION 2: VERIFIED OROMIA INSURANCE KEY METRICS BAR */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          <div className="relative overflow-hidden p-5 rounded-2xl bg-slate-50/80 hover:bg-white border border-slate-200/90 hover:border-[#006B6E]/35 shadow-xs hover:shadow-md transition-all">
            <span className="absolute inset-x-0 top-0 h-1 bg-[#006B6E]" />
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#006B6E]/80">
              Financial Strength
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 tabular-nums mt-1.5">
              ETB 1B / 3B
            </div>
            <div className="text-xs text-slate-600 font-medium mt-1.5 leading-snug">
              Paid-Up &amp; Subscribed Capital
            </div>
          </div>

          <div className="relative overflow-hidden p-5 rounded-2xl bg-slate-50/80 hover:bg-white border border-slate-200/90 hover:border-[#006B6E]/35 shadow-xs hover:shadow-md transition-all">
            <span className="absolute inset-x-0 top-0 h-1 bg-[#006B6E]" />
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#006B6E]/80">
              Cooperative Ownership
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 tabular-nums mt-1.5">
              1.6M+
            </div>
            <div className="text-xs text-slate-600 font-medium mt-1.5 leading-snug">
              Smallholder Farmer Shareholders
            </div>
          </div>

          <div className="relative overflow-hidden p-5 rounded-2xl bg-slate-50/80 hover:bg-white border border-slate-200/90 hover:border-[#006B6E]/35 shadow-xs hover:shadow-md transition-all">
            <span className="absolute inset-x-0 top-0 h-1 bg-[#006B6E]" />
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#006B6E]/80">
              Nationwide Footprint
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 tabular-nums mt-1.5">
              62 + 2
            </div>
            <div className="text-xs text-slate-600 font-medium mt-1.5 leading-snug">
              30 Finfinne &amp; 32 Regional Branches, Plus 2 Contact Offices
            </div>
          </div>

          <div className="relative overflow-hidden p-5 rounded-2xl bg-slate-50/80 hover:bg-white border border-slate-200/90 hover:border-[#7DC242]/50 shadow-xs hover:shadow-md transition-all">
            <span className="absolute inset-x-0 top-0 h-1 bg-[#7DC242]" />
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#5f9e2b]">
              Claims Track Record
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#006B6E] tabular-nums mt-1.5">
              ETB 40 Million
            </div>
            <div className="text-xs text-slate-600 font-medium mt-1.5 leading-snug">
              Largest Ethiopian Crop Insurance Payout (Amhara)
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: FOUR PRINCIPAL BUSINESS LINES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
          <div>
            <div className="text-xs font-semibold text-[#006B6E] uppercase tracking-wider mb-1">
              Oromia Insurance S.C. Portfolio
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Four Principal Insurance Business Lines
            </h2>
          </div>
          <button
            onClick={() => navigate('/insurance')}
            className="text-xs font-semibold text-[#006B6E] hover:text-[#005254] flex items-center gap-1.5 cursor-pointer"
          >
            <span>Explore Complete Product Catalogue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {FOUR_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                onClick={() => navigate('/insurance')}
                className="bg-white border border-slate-200 hover:border-[#006B6E] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-36 bg-slate-200 overflow-hidden">
                    <ResponsiveImage
                      src={pillar.image}
                      alt={pillar.title}
                      sizes="(max-width: 767px) 92vw, 25vw"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 w-9 h-9 rounded-lg bg-white/95 flex items-center justify-center shadow-sm">
                      <Icon className="w-5 h-5 text-[#006B6E]" />
                    </div>
                  </div>
                  <div className="p-5 space-y-2">
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-[#006B6E] transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-[11px] font-semibold text-[#5f9e2b]">{pillar.subtitle}</p>
                    <p className="text-xs text-slate-600 leading-relaxed">{pillar.desc}</p>
                  </div>
                </div>
                <div className="px-5 pb-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#006B6E]">
                  <span>View Policies</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 4: FEATURED OIC PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
          <div>
            <div className="text-xs font-semibold text-[#006B6E] uppercase tracking-wider mb-1">
              {t('home.productsEyebrow')}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {t('home.productsTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
              {t('home.productsSubtitle')}
            </p>
          </div>
          <button
            onClick={() => navigate('/insurance')}
            className="text-xs font-semibold text-[#006B6E] hover:text-[#005254] flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <span>{t('home.productsAll')} ({publishedProducts.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
          {publishedProducts.slice(0, 6).map((product) => (
            <div
              key={product.productId}
              className="bg-white border border-slate-200 hover:border-[#006B6E]/45 rounded-2xl overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-lg transition-all duration-200 group"
            >
              <div>
                <div className="relative h-40 w-full bg-slate-200 overflow-hidden border-b border-slate-100">
                  <ResponsiveImage
                    src={getCategoryCoverImage(product.productCategory, product.heroImage)}
                    alt={product.productName}
                    sizes="(max-width: 767px) 94vw, (max-width: 1023px) 46vw, 31vw"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 w-9 h-9 rounded-xl bg-white/95 flex items-center justify-center shadow-sm">
                    {getCategoryIcon(product.productCategory)}
                  </div>
                  <span className="absolute bottom-3 right-3 text-[10px] font-bold text-white bg-[#006B6E]/90 backdrop-blur-xs px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                    {getCategoryBadgeLabel(product.productCategory)}
                  </span>
                </div>

                <div className="p-5 sm:p-6 space-y-3.5">
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#5f9e2b]">
                      {product.subCategory}
                    </div>
                    <h3 className="text-base sm:text-[17px] font-bold text-slate-900 leading-snug tracking-tight group-hover:text-[#006B6E] transition-colors mt-1">
                      {product.productName}
                    </h3>
                    <p className="text-[13px] text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                      {product.shortDescription}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 space-y-2">
                    {product.benefits.slice(0, 2).map((benefit, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700 leading-snug">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#5f9e2b] shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-5 sm:px-6 py-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-3">
                <div>
                  <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    {t('home.from')}
                  </span>
                  <span className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900 tabular-nums">
                    ETB {product.quotationConfiguration.standardMinimumPremiumETB.toLocaleString()}
                  </span>
                </div>
                <button
                  onClick={() => navigate(`/insurance/${product.slug}`)}
                  className="px-3.5 py-2 rounded-xl bg-[#006B6E] hover:bg-[#005254] text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-xs transition-all cursor-pointer shrink-0"
                >
                  <span>{t('home.details')}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: O.R.O.M.I.A. CORE VALUES & UNIQUE ECOSYSTEM */}
      <section className="bg-slate-100/90 border-y border-slate-200 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#006B6E] uppercase tracking-widest">
              <span className="w-6 h-0.5 bg-[#7DC242] rounded-full" />
              <span>Institutional Identity &amp; Strength</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              The O.R.O.M.I.A. Core Values
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              <strong className="font-bold text-[#006B6E]">{cms.motto}</strong>{' '}
              {cms.vision} Grounded in cooperative stewardship, underwriting discipline, and accountability across every branch we serve.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {OROMIA_VALUES.map((val, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#006B6E] text-[#9ad864] font-bold text-lg flex items-center justify-center shrink-0">
                  {val.letter}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{val.title}</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{val.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Ecosystem Partners & Cooperative Reach */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-[#006B6E] font-bold text-sm">
                <Building2 className="w-4 h-4 text-[#7DC242]" />
                <span>Sister Banking Alliances</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Oromia Bank (OB) and Cooperative Bank of Oromia (CBO) operate across hundreds of branches as sister companies, expanding customer access across Ethiopia.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-[#006B6E] font-bold text-sm">
                <Users className="w-4 h-4 text-[#7DC242]" />
                <span>34 Cooperative Unions</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                34 farmers’ cooperative unions serve as core shareholders and grass-roots agricultural &amp; microinsurance distribution channels.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-[#006B6E] font-bold text-sm">
                <Handshake className="w-4 h-4 text-[#7DC242]" />
                <span>Speed &amp; Fairness in Claims</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct claims coordination through our Claims Management Directorate (<span className="font-semibold text-slate-900 tabular-nums">+251-115-589-676</span>) and Head Office switchboard (<span className="font-semibold text-slate-900 tabular-nums">+251-115-572121</span>).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: OFFICIAL NEWS & FREQUENTLY ASKED QUESTIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-semibold text-[#006B6E] uppercase tracking-wider">Latest News &amp; Events</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Oromia Insurance Announcements &amp; Impact
            </h2>
          </div>
          <button
            onClick={() => navigate('/media')}
            className="text-xs font-semibold text-[#006B6E] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Media &amp; Annual Reports</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsArticles.slice(0, 3).map((item) => (
            <div
              key={item.id}
              onClick={() => navigate('/media')}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="h-44 bg-slate-200 overflow-hidden">
                  <ResponsiveImage
                    src={item.image || '/assets/oic/hero_homepage.png'}
                    alt={item.title}
                    sizes="(max-width: 767px) 92vw, 33vw"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 space-y-2">
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 tabular-nums">
                    <Calendar className="w-3.5 h-3.5 text-[#5f9e2b]" />
                    <span>{item.date}</span>
                    <span>·</span>
                    <span className="text-[#006B6E] font-sans font-semibold">{item.tag}</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#006B6E] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">{item.summary}</p>
                </div>
              </div>
              <div className="px-5 pb-4 text-xs font-semibold text-[#006B6E] flex items-center gap-1">
                <span>Read Notice</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Highlights + Claims Helpline Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Frequently Asked Questions</h3>
            <div className="space-y-3">
              {SEED_FAQS.slice(0, 4).map((faq, idx) => (
                <div key={idx} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <h4 className="text-xs font-bold text-[#006B6E]">{faq.question}</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-[#022b2d] via-[#005254] to-[#006B6E] text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-lg">
            <div className="space-y-3">
              <span className="text-xs font-semibold text-[#9ad864] uppercase tracking-wider">
                Oromia Insurance S.C. Headquarters
              </span>
              <h3 className="text-2xl font-bold leading-snug">
                62 Branches &amp; 2 Contact Offices Ready to Serve You
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {cms.headOfficeAddress}
              </p>
            </div>
            <div className="space-y-3 pt-4 border-t border-white/15">
              <a
                href="tel:+251115572121"
                className="w-full bg-[#7DC242] hover:bg-[#6db334] text-[#022b2d] font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Head Office: +251-115-572121</span>
              </a>
              <button
                onClick={() => navigate('/branches')}
                className="w-full bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold text-xs py-3 px-4 rounded-xl transition-colors cursor-pointer"
              >
                Browse All 62 Branches &amp; 22 Directorates
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
