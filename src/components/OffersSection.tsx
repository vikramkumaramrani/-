import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SpecialOffer } from '../types';
import { Sparkles, Tag, ArrowRight, ArrowLeft } from 'lucide-react';

interface OffersSectionProps {
  offers: SpecialOffer[];
  onOrderNow: () => void;
}

export const OffersSection: React.FC<OffersSectionProps> = ({ offers, onOrderNow }) => {
  const { language, t, isRtl } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;
  const activeOffers = offers.filter((o) => o.isActive);

  if (activeOffers.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-gradient-to-b from-[#17110e] via-[#2a1d18]/40 to-[#17110e] border-y border-[#e8d5b7]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#f4b65f] uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('offers_kicker')}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#fff7eb]">
              {t('offers_title')}
            </h2>
          </div>
          <span className="text-xs text-[#e8d5b7]/60 mt-2 md:mt-0">
            {language === 'ar' ? 'عروض حصرية للطلبات داخل المقهى والسفري' : 'Exclusive in-store and takeaway specials'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeOffers.map((offer) => (
            <div
              key={offer.id}
              className="relative rounded-2xl bg-[#2a1d18] border border-[#f4b65f]/30 p-6 sm:p-7 flex flex-col justify-between overflow-hidden shadow-xl hover:border-[#f4b65f] transition-all group"
            >
              <div className="absolute top-0 right-0 rtl:right-auto rtl:left-0 w-32 h-32 bg-[#c8753d]/10 rounded-full blur-2xl pointer-events-none group-hover:bg-[#c8753d]/20 transition-all" />

              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c8753d]/20 border border-[#c8753d]/40 text-[#f4b65f] text-xs font-bold mb-4">
                  <Tag className="w-3 h-3" />
                  <span>{language === 'ar' ? offer.tagAr : offer.tagEn}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#fff7eb] mb-3 group-hover:text-[#f4b65f] transition-colors">
                  {language === 'ar' ? offer.titleAr : offer.titleEn}
                </h3>

                <p className="text-sm text-[#e8d5b7]/80 leading-relaxed mb-6">
                  {language === 'ar' ? offer.descriptionAr : offer.descriptionEn}
                </p>
              </div>

              <div className="pt-4 border-t border-[#e8d5b7]/10 flex items-center justify-between">
                <span className="text-xs text-[#e8d5b7]/50">
                  {language === 'ar' ? 'ساري حتى نفاد الكمية' : 'Valid while supplies last'}
                </span>
                <button
                  onClick={onOrderNow}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#f4b65f] hover:text-[#fff7eb] transition-colors cursor-pointer"
                >
                  <span>{t('menu_add_inquiry')}</span>
                  <ArrowIcon className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
