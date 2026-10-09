import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { MenuItem } from '../types';
import { X, Plus, Sparkles, AlertCircle } from 'lucide-react';

interface ItemDetailsModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

export const ItemDetailsModal: React.FC<ItemDetailsModalProps> = ({ item, onClose }) => {
  const { language, t } = useLanguage();
  const { addToCart } = useCart();

  // Lock body scroll when modal is open
  useEffect(() => {
    if (item) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [item]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg md:max-w-xl max-h-[92dvh] flex flex-col rounded-2xl bg-[#2a1d18] border border-[#f4b65f]/30 overflow-hidden shadow-2xl animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 rtl:right-auto rtl:left-3 z-20 w-10 h-10 rounded-full bg-black/75 hover:bg-black text-white flex items-center justify-center transition-colors shadow-lg cursor-pointer min-w-[40px] min-h-[40px]"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Modal Container */}
        <div className="flex-1 overflow-y-auto">
          {/* Responsive Image with 16:10 aspect ratio */}
          <div className="relative aspect-16/10 sm:aspect-16/9 w-full bg-[#17110e] overflow-hidden shrink-0">
            <img
              src={item.imageUrl}
              alt={language === 'ar' ? item.nameAr : item.nameEn}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/neon_garden_cafe.jpg';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2a1d18] via-transparent to-transparent opacity-85" />

            {item.isLimitedTime && (
              <span className="absolute top-3 left-3 rtl:left-auto rtl:right-3 px-3 py-1 rounded-md bg-[#c8753d] text-white text-xs font-bold shadow-lg flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t('menu_limited_time')}</span>
              </span>
            )}
          </div>

          {/* Modal Details Content */}
          <div className="p-4 sm:p-6 space-y-4">
            {/* Header: Title and Price */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h2 className="text-xl sm:text-2xl font-bold text-[#fff7eb] leading-tight">
                  {language === 'ar' ? item.nameAr : item.nameEn}
                </h2>
                <p className="text-xs sm:text-sm text-[#e8d5b7]/60 font-medium mt-1">
                  {language === 'ar' ? item.nameEn : item.nameAr}
                </p>
              </div>

              <div className="text-right rtl:text-left shrink-0">
                <span className="text-xl sm:text-2xl font-extrabold text-[#f4b65f] tabular-nums">
                  {item.price}
                </span>
                <span className="text-xs text-[#e8d5b7]/80 mr-1 rtl:mr-0 rtl:ml-1">
                  {item.currency}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#e8d5b7]/85 leading-relaxed">
              {language === 'ar'
                ? item.descriptionAr || item.descriptionEn
                : item.descriptionEn || item.descriptionAr}
            </p>

            {/* Detailed Pricing Breakdown / Options */}
            {(item.priceTakeaway || item.priceGlass || item.extraAddonPrice) && (
              <div className="p-3 sm:p-3.5 rounded-xl bg-[#17110e]/70 border border-[#e8d5b7]/10 space-y-2 text-xs">
                {item.priceTakeaway && item.priceGlass && (
                  <div className="flex flex-col sm:flex-row justify-between gap-1 text-[#e8d5b7]/80">
                    <span>
                      {t('menu_takeaway')}: <strong className="text-[#f4b65f]">{item.priceTakeaway} {item.currency}</strong>
                    </span>
                    <span>
                      {t('menu_glass')}: <strong className="text-[#f4b65f]">{item.priceGlass} {item.currency}</strong>
                    </span>
                  </div>
                )}
                {item.extraAddonPrice && (
                  <div className="text-[#f4b65f] flex items-center gap-1.5 pt-1">
                    <span>★</span>
                    <span>
                      {language === 'ar'
                        ? `إضافة إضافية متاحة عند الطلب: +${item.extraAddonPrice} درهم`
                        : `Extra Add-on available: +${item.extraAddonPrice} DHS`}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Modal Sticky Footer CTA */}
        <div className="p-4 sm:p-5 border-t border-[#e8d5b7]/15 bg-[#241814] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 self-start sm:self-auto text-xs text-[#e8d5b7]/70">
            {item.isAvailable ? (
              <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>{language === 'ar' ? 'متوفر طازج' : 'Available Fresh'}</span>
              </span>
            ) : (
              <span className="text-red-400 font-semibold flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'غير متوفر حالياً' : 'Currently Unavailable'}</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-3 rounded-xl border border-[#e8d5b7]/20 text-[#e8d5b7] text-xs font-semibold hover:text-white cursor-pointer min-h-[44px]"
            >
              {language === 'ar' ? 'إغلاق' : 'Close'}
            </button>

            <button
              disabled={!item.isAvailable}
              onClick={() => {
                addToCart(item);
                onClose();
              }}
              className="flex-1 sm:flex-none px-6 py-3 rounded-xl brand-gradient text-white text-xs sm:text-sm font-bold shadow-xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 min-h-[44px]"
            >
              <Plus className="w-4 h-4" />
              <span>{t('menu_add_inquiry')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
