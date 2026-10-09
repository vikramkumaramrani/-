import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { MenuItem } from '../types';
import { Star, Plus, ArrowRight, ArrowLeft, Check } from 'lucide-react';

interface FeaturedSectionProps {
  items: MenuItem[];
  onViewAllMenu: () => void;
  onItemClick: (item: MenuItem) => void;
}

export const FeaturedSection: React.FC<FeaturedSectionProps> = ({
  items,
  onViewAllMenu,
  onItemClick,
}) => {
  const { language, t, isRtl } = useLanguage();
  const { addToCart, items: cartItems } = useCart();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const featuredItems = items.filter((item) => item.isFeatured && item.isPublished).slice(0, 6);

  return (
    <section className="py-20 bg-[#17110e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#f4b65f] uppercase tracking-wider mb-2">
              <Star className="w-3.5 h-3.5 fill-[#f4b65f]" />
              <span>{t('featured_kicker')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#fff7eb] tracking-tight">
              {t('featured_title')}
            </h2>
            <p className="text-sm sm:text-base text-[#e8d5b7]/70 mt-2 max-w-xl">
              {t('featured_subtitle')}
            </p>
          </div>

          <button
            onClick={onViewAllMenu}
            className="mt-6 md:mt-0 inline-flex items-center gap-2 text-sm font-bold text-[#f4b65f] hover:text-[#fff7eb] group transition-colors cursor-pointer"
          >
            <span>{t('featured_view_all')}</span>
            <ArrowIcon className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Featured Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredItems.map((item) => {
            const inCart = cartItems.some((ci) => ci.id === item.id);
            return (
              <div
                key={item.id}
                className="group rounded-2xl bg-[#2a1d18] border border-[#e8d5b7]/10 hover:border-[#f4b65f]/50 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image Container with 4:3 Ratio */}
                <div
                  className="relative aspect-4/3 overflow-hidden cursor-pointer bg-[#17110e]"
                  onClick={() => onItemClick(item)}
                >
                  <img
                    src={item.imageUrl}
                    alt={language === 'ar' ? item.nameAr : item.nameEn}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/neon_garden_cafe.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2a1d18] via-transparent to-transparent opacity-80" />

                  {item.isLimitedTime && (
                    <span className="absolute top-3 right-3 rtl:right-auto rtl:left-3 px-2.5 py-1 rounded-md bg-[#c8753d] text-white text-[11px] font-bold shadow-md">
                      {t('menu_limited_time')}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3
                        onClick={() => onItemClick(item)}
                        className="text-lg sm:text-xl font-bold text-[#fff7eb] group-hover:text-[#f4b65f] transition-colors cursor-pointer"
                      >
                        {language === 'ar' ? item.nameAr : item.nameEn}
                      </h3>
                      <div className="text-right rtl:text-left shrink-0">
                        <span className="text-base sm:text-lg font-bold text-[#f4b65f] tabular-nums">
                          {item.price}
                        </span>
                        <span className="text-xs text-[#e8d5b7]/70 mr-1 rtl:mr-0 rtl:ml-1">
                          {item.currency}
                        </span>
                      </div>
                    </div>

                    {/* Bilingual Subtitle / Translation */}
                    <p className="text-xs text-[#e8d5b7]/50 font-medium mb-3">
                      {language === 'ar' ? item.nameEn : item.nameAr}
                    </p>

                    <p className="text-xs sm:text-sm text-[#e8d5b7]/80 line-clamp-2 leading-relaxed mb-5">
                      {language === 'ar'
                        ? item.descriptionAr || item.descriptionEn
                        : item.descriptionEn || item.descriptionAr}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-[#e8d5b7]/10 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onItemClick(item)}
                      className="text-xs text-[#e8d5b7]/80 hover:text-[#fff7eb] transition-colors cursor-pointer"
                    >
                      {language === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                    </button>

                    <button
                      onClick={() => addToCart(item)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        inCart
                          ? 'bg-[#c8753d]/30 text-[#f4b65f] border border-[#c8753d]/50'
                          : 'brand-gradient text-white hover:brightness-110 active:scale-95 shadow-md'
                      }`}
                    >
                      {inCart ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      <span>{inCart ? t('menu_added') : t('menu_add_inquiry')}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
