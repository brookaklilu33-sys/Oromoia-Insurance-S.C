import React, { useState } from 'react';
import { store } from '../../services/store';
import { useLanguage } from '../../i18n/LanguageContext';
import {
  Shield,
  Search,
  ArrowRight,
  CheckCircle2,
  HeartPulse,
  Sprout,
  MoonStar,
  FileText
} from 'lucide-react';
import { ResponsiveImage, getCategoryCoverImage } from '../../components/ResponsiveImage';

interface ProductsPageProps {
  navigate: (route: string) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ navigate }) => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const products = store.getPublishedProducts();

  const categories = [
    { id: 'all', label: t('products.all') },
    { id: 'non_life', label: 'General (Non-Life)' },
    { id: 'life_health', label: 'Life & Health' },
    { id: 'agri_micro', label: 'Agriculture & Microinsurance' },
    { id: 'halal_takaful', label: 'Halal Takaful' }
  ];

  const filtered = products.filter((p) => {
    const matchCategory = selectedCategory === 'all' || p.productCategory === selectedCategory;
    const matchQuery =
      p.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.benefits.some((b) => b.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCategory && matchQuery;
  });

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

  const getCategoryLabel = (cat: string) => {
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

  return (
    <div className="min-h-screen bg-slate-50 py-6 sm:py-12">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-5 sm:space-y-8">
        {/* Header */}
        <div className="space-y-2 sm:space-y-3">
          <div className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-[#006B6E] uppercase tracking-wider">
            <span>{t('products.eyebrow')}</span>
            <span aria-hidden="true">·</span>
            <span>4 Principal Insurance Lines</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-[#006B6E] tracking-tight">
            {t('products.title')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
            {t('products.subtitle')}
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-2">
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-xl w-full md:w-auto overflow-x-auto">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedCategory === c.id
                    ? 'bg-[#006B6E] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder={t('products.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 text-xs pl-9 pr-3 py-2 rounded-lg focus:outline-none focus:border-[#006B6E]"
            />
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7 pt-2">
          {filtered.map((product) => (
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
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-3 left-3 w-9 h-9 rounded-xl bg-white/95 flex items-center justify-center shadow-sm">
                    {getCategoryIcon(product.productCategory)}
                  </div>
                  <div className="absolute bottom-3 right-3 text-[10px] font-bold text-white bg-[#006B6E]/90 backdrop-blur-xs px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                    {getCategoryLabel(product.productCategory)}
                  </div>
                </div>

                <div className="p-5 sm:p-6 space-y-3.5">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#5f9e2b]">
                        {product.subCategory || getCategoryLabel(product.productCategory)}
                      </span>
                      {product.shariaSupervised && (
                        <span className="text-[10px] font-bold bg-[#eef8e6] text-[#006B6E] px-2 py-0.5 rounded">
                          Sharia Supervised
                        </span>
                      )}
                    </div>
                    <h3 className="text-base sm:text-[17px] font-bold text-slate-900 leading-snug tracking-tight group-hover:text-[#006B6E] transition-colors mt-1">
                      {product.productName}
                    </h3>
                    <p className="text-[13px] text-slate-600 mt-2 leading-relaxed line-clamp-3">
                      {product.shortDescription}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 space-y-2">
                    <div className="text-[11px] font-semibold text-slate-700">Key Coverage Highlights:</div>
                    {product.benefits.slice(0, 3).map((b, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700 leading-snug">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#5f9e2b] shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-5 sm:px-6 py-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-3">
                <div>
                  <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Indicative base
                  </span>
                  <span className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900 tabular-nums">
                    ETB {product.quotationConfiguration.standardMinimumPremiumETB.toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={() => navigate(`/insurance/${product.slug}`)}
                  className="bg-[#006B6E] hover:bg-[#005254] text-white text-xs font-semibold px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-xs cursor-pointer shrink-0"
                >
                  <span>{t('products.viewDetails')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 bg-white border border-slate-200 rounded-xl">
            <p className="text-sm text-slate-600">No insurance products match your search.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-3 text-xs font-semibold text-[#006B6E] hover:underline cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
