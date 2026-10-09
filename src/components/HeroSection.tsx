import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { BusinessSettings } from '../types';
import { MapPin, Clock, Star, ArrowRight, ArrowLeft, Utensils, Phone } from 'lucide-react';

interface HeroSectionProps {
  settings: BusinessSettings;
  onExploreMenu: () => void;
  onGetDirections: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  settings,
  onExploreMenu,
  onGetDirections,
}) => {
  const { language, t, isRtl } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Background Image: Neon Garden Café Under City Lights */}
      <div className="absolute inset-0 z-0">
        <img
          src="/Neon Garden Café Under City Lights.png"
          alt="Shai M5m5a Kiosk at night with illuminated Dubai skyline"
          className="w-full h-full object-cover object-center scale-105 transform motion-safe:transition-transform motion-safe:duration-1000"
          onError={(e) => {
            // Fallback to neon_garden_cafe.jpg if path differs
            const target = e.target as HTMLImageElement;
            if (target.src !== window.location.origin + '/neon_garden_cafe.jpg') {
              target.src = '/neon_garden_cafe.jpg';
            }
          }}
        />
        {/* Measured Contrast Scrim for 4.5:1 contrast compliance */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#17110e] via-[#17110e]/80 to-[#17110e]/50" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#17110e]/40 to-[#17110e]/90" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Top Trust Marker */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2a1d18]/80 border border-[#f4b65f]/30 backdrop-blur-md mb-6 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-[#f4b65f]" />
          <span className="text-xs font-semibold text-[#f4b65f] tracking-wide">
            {language === 'ar' ? 'جلسات خارجية مريحة في قلب الوصل • دبي' : 'Cozy Garden Vibes in Al Wasl • Dubai'}
          </span>
        </div>

        {/* Cinematic Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#fff7eb] leading-[1.15] max-w-4xl mb-6">
          <span className="block">{language === 'ar' ? settings.nameAr : settings.nameEn}</span>
          <span className="brand-gradient-text block mt-2 text-2xl sm:text-4xl md:text-5xl font-bold">
            {language === 'ar' ? 'طعم يستحق العودة إليه' : 'A Taste Worth Coming Back For'}
          </span>
        </h1>

        {/* Supporting Editorial Text */}
        <p className="text-base sm:text-lg md:text-xl text-[#e8d5b7]/90 max-w-2xl leading-relaxed mb-10 font-normal">
          {language === 'ar' ? settings.heroSubtitleAr : settings.heroSubtitleEn}
        </p>

        {/* Primary and Secondary CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-14">
          <button
            onClick={onExploreMenu}
            className="w-full sm:w-auto px-8 py-3.5 text-base font-bold text-white brand-gradient rounded-xl shadow-xl hover:shadow-2xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Utensils className="w-5 h-5" />
            <span>{t('hero_cta_menu')}</span>
            <ArrowIcon className="w-4 h-4" />
          </button>

          <button
            onClick={onGetDirections}
            className="w-full sm:w-auto px-7 py-3.5 text-base font-semibold text-[#fff7eb] bg-[#2a1d18]/90 hover:bg-[#2a1d18] border border-[#e8d5b7]/30 hover:border-[#f4b65f] rounded-xl backdrop-blur-md shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <MapPin className="w-5 h-5 text-[#f4b65f]" />
            <span>{t('hero_cta_directions')}</span>
          </button>

          <a
            href={`tel:${settings.phone}`}
            className="w-full sm:w-auto px-5 py-3.5 text-base font-medium text-[#e8d5b7] hover:text-white border border-[#e8d5b7]/20 hover:border-[#c8753d] bg-black/30 rounded-xl backdrop-blur-md transition-all flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4 text-[#c8753d]" />
            <span>{t('nav_call')}</span>
          </a>
        </div>

        {/* Compact Location & Opening-Hours Strip (Full-width row below split) */}
        <div className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-[#17110e]/85 border border-[#e8d5b7]/15 backdrop-blur-md shadow-2xl">
          {/* Item 1: Operating Hours */}
          <div className="flex flex-col items-center justify-center text-center p-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#f4b65f] mb-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{t('hero_open_badge')}</span>
            </div>
            <span className="text-xs sm:text-sm font-medium text-[#fff7eb]">
              {language === 'ar' ? 'حتى 3:00 فجراً' : 'Until 3:00 AM'}
            </span>
            <span className="text-[11px] text-[#e8d5b7]/60">
              {language === 'ar' ? 'يومياً طوال الأسبوع' : 'Open 7 Days a Week'}
            </span>
          </div>

          {/* Item 2: Location */}
          <div className="flex flex-col items-center justify-center text-center p-2 border-r rtl:border-r-0 rtl:border-l border-[#e8d5b7]/10">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#e8d5b7] mb-1">
              <MapPin className="w-3.5 h-3.5 text-[#c8753d]" />
              <span>{language === 'ar' ? 'الوصل، دبي' : 'Al Wasl, Dubai'}</span>
            </div>
            <span className="text-xs sm:text-sm font-medium text-[#fff7eb]">6743+4QP</span>
            <span className="text-[11px] text-[#e8d5b7]/60">
              {language === 'ar' ? 'جلسات خارجية وحديقة' : 'Outdoor Garden Kiosk'}
            </span>
          </div>

          {/* Item 3: Price Range */}
          <div className="flex flex-col items-center justify-center text-center p-2 border-t md:border-t-0 md:border-r rtl:md:border-r-0 rtl:md:border-l border-[#e8d5b7]/10">
            <span className="text-xs font-semibold text-[#e8d5b7] mb-1">
              {language === 'ar' ? 'متوسط السعر' : 'Price Range'}
            </span>
            <span className="text-xs sm:text-sm font-bold text-[#f4b65f] tabular-nums">
              1 – 50 AED
            </span>
            <span className="text-[11px] text-[#e8d5b7]/60">
              {language === 'ar' ? 'للشخص الواحد' : 'Per Person'}
            </span>
          </div>

          {/* Item 4: Google Rating */}
          <div className="flex flex-col items-center justify-center text-center p-2 border-t md:border-t-0 border-[#e8d5b7]/10">
            <div className="flex items-center gap-1 text-xs font-bold text-[#f4b65f] mb-1">
              <Star className="w-3.5 h-3.5 fill-[#f4b65f]" />
              <span className="tabular-nums">4.2 / 5.0</span>
            </div>
            <span className="text-xs sm:text-sm font-medium text-[#fff7eb]">
              {language === 'ar' ? 'تقييمات خرائط جوجل' : 'Google Rating'}
            </span>
            <span className="text-[11px] text-[#e8d5b7]/60">
              {language === 'ar' ? '+100 تقييم حقيقي' : '100+ Real Reviews'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
