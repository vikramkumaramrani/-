import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { MenuItem, MenuCategory } from '../types';
import { Search, Plus, Check, Download, AlertCircle, Sparkles, Filter } from 'lucide-react';

interface MenuSectionProps {
  items: MenuItem[];
  categories: MenuCategory[];
  onItemClick: (item: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  items,
  categories,
  onItemClick,
}) => {
  const { language, t, isRtl } = useLanguage();
  const { addToCart, items: cartItems } = useCart();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedServing, setSelectedServing] = useState<Record<string, 'takeaway' | 'glass'>>({});

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (!item.isPublished) return false;

      // Category filter
      const matchesCategory =
        activeCategory === 'all' || item.categoryId === activeCategory;

      // Search query
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        item.nameAr.toLowerCase().includes(query) ||
        item.nameEn.toLowerCase().includes(query) ||
        (item.descriptionAr && item.descriptionAr.toLowerCase().includes(query)) ||
        (item.descriptionEn && item.descriptionEn.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [items, activeCategory, searchQuery]);

  const handleServingToggle = (itemId: string, type: 'takeaway' | 'glass') => {
    setSelectedServing((prev) => ({
      ...prev,
      [itemId]: type,
    }));
  };

  const handleAddItem = (item: MenuItem) => {
    if (item.priceGlass && item.priceTakeaway) {
      const serving = selectedServing[item.id] || 'takeaway';
      const price = serving === 'glass' ? item.priceGlass : item.priceTakeaway;
      const optionLabel = serving === 'glass' ? (language === 'ar' ? 'استكانة / كلاس' : 'Glass Cup') : (language === 'ar' ? 'سفري' : 'Takeaway');
      addToCart(item, optionLabel, price);
    } else {
      addToCart(item);
    }
  };

  return (
    <section id="menu-section" className="py-20 bg-[#17110e] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2a1d18] border border-[#f4b65f]/30 text-[#f4b65f] text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('menu_kicker')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#fff7eb] tracking-tight mb-4">
            {t('menu_title')}
          </h2>
          <p className="text-sm sm:text-base text-[#e8d5b7]/80 leading-relaxed">
            {t('menu_subtitle')}
          </p>
        </div>

        {/* Search Bar & PDF Download Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute top-1/2 -translate-y-1/2 left-3.5 rtl:left-auto rtl:right-3.5 w-4 h-4 text-[#e8d5b7]/50" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('menu_search_placeholder')}
              className="w-full pl-10 pr-4 rtl:pl-4 rtl:pr-10 py-3 rounded-xl bg-[#2a1d18] border border-[#e8d5b7]/20 text-[#fff7eb] placeholder-[#e8d5b7]/40 text-sm focus:outline-none focus:border-[#f4b65f] focus:ring-1 focus:ring-[#f4b65f] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute top-1/2 -translate-y-1/2 right-3 rtl:right-auto rtl:left-3 text-xs text-[#e8d5b7]/60 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={() => {
                // Generates friendly downloadable PDF summary window or triggers save
                window.print();
              }}
              className="px-4 py-2.5 rounded-xl bg-[#2a1d18] border border-[#e8d5b7]/20 hover:border-[#f4b65f] text-[#e8d5b7] hover:text-[#fff7eb] text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap"
            >
              <Download className="w-3.5 h-3.5 text-[#f4b65f]" />
              <span>{t('menu_download_pdf')}</span>
            </button>
          </div>
        </div>

        {/* Category Horizontal Filter Tabs */}
        <div className="relative mb-10 overflow-x-auto pb-3 scrollbar-none">
          <div className="flex items-center gap-2 min-w-max">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === cat.id
                    ? 'brand-gradient text-white shadow-lg shadow-[#c8753d]/20 scale-[1.02]'
                    : 'bg-[#2a1d18] text-[#e8d5b7]/80 hover:text-[#fff7eb] border border-[#e8d5b7]/10 hover:border-[#e8d5b7]/30'
                }`}
              >
                {language === 'ar' ? cat.nameAr : cat.nameEn}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-[#e8d5b7]/60 mb-6 px-1">
          <span>
            {language === 'ar'
              ? `عرض ${filteredItems.length} صنف من القائمة`
              : `Showing ${filteredItems.length} menu items`}
          </span>
          {activeCategory !== 'all' && (
            <button
              onClick={() => setActiveCategory('all')}
              className="text-[#f4b65f] hover:underline cursor-pointer"
            >
              {t('menu_reset_filter')}
            </button>
          )}
        </div>

        {/* Items Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredItems.map((item) => {
              const inCart = cartItems.some((ci) => ci.id === item.id);
              const isMultiPriceTea = Boolean(item.priceGlass && item.priceTakeaway);
              const currentServing = selectedServing[item.id] || 'takeaway';
              const displayPrice = isMultiPriceTea
                ? currentServing === 'glass'
                  ? item.priceGlass
                  : item.priceTakeaway
                : item.price;

              return (
                <div
                  key={item.id}
                  className="group rounded-2xl bg-[#2a1d18] border border-[#e8d5b7]/10 hover:border-[#f4b65f]/50 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Item Image with Lightbox click */}
                  <div
                    className="relative aspect-16/10 overflow-hidden cursor-pointer bg-[#17110e]"
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
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2a1d18] via-transparent to-transparent opacity-70" />

                    {/* Badges */}
                    <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3 flex flex-col gap-1.5 items-end rtl:items-start">
                      {item.isLimitedTime && (
                        <span className="px-2.5 py-1 rounded-md bg-[#c8753d] text-white text-[11px] font-bold shadow-md">
                          {t('menu_limited_time')}
                        </span>
                      )}
                      {!item.isAvailable && (
                        <span className="px-2 py-0.5 rounded-md bg-red-950/80 border border-red-500/50 text-red-200 text-[10px] font-bold">
                          {t('menu_unavailable')}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Name & Price */}
                      <div className="flex items-start justify-between gap-3 mb-1.5">
                        <h3
                          onClick={() => onItemClick(item)}
                          className="text-lg font-bold text-[#fff7eb] group-hover:text-[#f4b65f] transition-colors cursor-pointer"
                        >
                          {language === 'ar' ? item.nameAr : item.nameEn}
                        </h3>
                        <div className="text-right rtl:text-left shrink-0">
                          <span className="text-lg font-bold text-[#f4b65f] tabular-nums">
                            {displayPrice}
                          </span>
                          <span className="text-xs text-[#e8d5b7]/70 mr-1 rtl:mr-0 rtl:ml-1">
                            {item.currency}
                          </span>
                        </div>
                      </div>

                      {/* Bilingual Secondary Name */}
                      <p className="text-xs text-[#e8d5b7]/50 font-medium mb-3">
                        {language === 'ar' ? item.nameEn : item.nameAr}
                      </p>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-[#e8d5b7]/75 line-clamp-2 leading-relaxed mb-4">
                        {language === 'ar'
                          ? item.descriptionAr || item.descriptionEn
                          : item.descriptionEn || item.descriptionAr}
                      </p>

                      {/* Special Hot Drink Serving Toggle (Takeaway vs Glass Cup) */}
                      {isMultiPriceTea && (
                        <div className="mb-4 p-2 rounded-xl bg-[#17110e]/70 border border-[#e8d5b7]/10 flex items-center justify-between">
                          <span className="text-[11px] text-[#e8d5b7]/70 font-medium">
                            {language === 'ar' ? 'اختر التقديم:' : 'Serving:'}
                          </span>
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleServingToggle(item.id, 'takeaway')}
                              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                                currentServing === 'takeaway'
                                  ? 'bg-[#c8753d] text-white shadow'
                                  : 'text-[#e8d5b7]/60 hover:text-white'
                              }`}
                            >
                              {t('menu_takeaway')} ({item.priceTakeaway} {item.currency})
                            </button>
                            <button
                              type="button"
                              onClick={() => handleServingToggle(item.id, 'glass')}
                              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                                currentServing === 'glass'
                                  ? 'bg-[#c8753d] text-white shadow'
                                  : 'text-[#e8d5b7]/60 hover:text-white'
                              }`}
                            >
                              {t('menu_glass')} ({item.priceGlass} {item.currency})
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Extra Addon Notice from PDF */}
                      {item.extraAddonPrice && (
                        <div className="text-[11px] text-[#e8d5b7]/60 mb-4 flex items-center gap-1">
                          <span className="text-[#f4b65f]">★</span>
                          <span>
                            {language === 'ar'
                              ? `إضافة إضافية: +${item.extraAddonPrice} درهم`
                              : `Extra Add-on: +${item.extraAddonPrice} DHS`}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="pt-3 border-t border-[#e8d5b7]/10 flex items-center justify-between gap-2">
                      <button
                        onClick={() => onItemClick(item)}
                        className="text-xs text-[#e8d5b7]/70 hover:text-[#fff7eb] transition-colors cursor-pointer"
                      >
                        {language === 'ar' ? 'عرض التفاصيل' : 'Details'}
                      </button>

                      <button
                        disabled={!item.isAvailable}
                        onClick={() => handleAddItem(item)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          !item.isAvailable
                            ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                            : inCart
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
        ) : (
          /* Empty Search State */
          <div className="py-16 text-center rounded-2xl bg-[#2a1d18]/50 border border-[#e8d5b7]/10 p-8 max-w-lg mx-auto">
            <AlertCircle className="w-12 h-12 text-[#f4b65f] mx-auto mb-4" />
            <h3 className="text-lg font-bold text-[#fff7eb] mb-2">{t('menu_empty_title')}</h3>
            <p className="text-xs sm:text-sm text-[#e8d5b7]/70 mb-6">{t('menu_empty_desc')}</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="px-5 py-2.5 rounded-xl brand-gradient text-white text-xs font-bold cursor-pointer"
            >
              {t('menu_reset_filter')}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
