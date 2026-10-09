import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { BusinessSettings } from '../types';
import { MapPin, Phone, Clock, DollarSign, Navigation, ExternalLink, Calendar } from 'lucide-react';

interface LocationSectionProps {
  settings: BusinessSettings;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ settings }) => {
  const { language, t, isRtl } = useLanguage();

  return (
    <section className="py-24 bg-[#17110e] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2a1d18] border border-[#f4b65f]/30 text-[#f4b65f] text-xs font-semibold mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>{t('location_kicker')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#fff7eb] tracking-tight mb-4">
            {t('location_title')}
          </h2>
          <p className="text-sm sm:text-base text-[#e8d5b7]/75">
            {language === 'ar'
              ? 'تفضل بزيارتنا في حديقة مقهى شاي مخمخة واستمتع بجلسات الشاي المميزة في قلب الوصل.'
              : 'Visit our garden kiosk and enjoy signature tea and bites under the Dubai skyline.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Information Cards (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            {/* Address Card */}
            <div className="p-6 rounded-2xl bg-[#2a1d18] border border-[#e8d5b7]/15 shadow-xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#17110e] border border-[#f4b65f]/30 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-[#f4b65f]" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#f4b65f] uppercase tracking-wider mb-1">
                    {t('location_address_label')}
                  </h3>
                  <p className="text-base font-bold text-[#fff7eb] mb-1">
                    {language === 'ar' ? settings.addressAr : settings.addressEn}
                  </p>
                  <span className="text-xs font-mono text-[#e8d5b7]/60 block mb-3">
                    Plus Code: {settings.plusCode}
                  </span>
                  <a
                    href={settings.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#f4b65f] hover:underline"
                  >
                    <span>{t('location_get_directions')}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Operating Hours Card */}
            <div className="p-6 rounded-2xl bg-[#2a1d18] border border-[#e8d5b7]/15 shadow-xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#17110e] border border-[#c8753d]/30 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-[#c8753d]" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#c8753d] uppercase tracking-wider mb-1">
                    {t('location_hours_label')}
                  </h3>
                  <p className="text-base font-bold text-[#fff7eb] mb-1">
                    {language === 'ar' ? settings.hoursAr : settings.hoursEn}
                  </p>
                  <p className="text-xs text-[#e8d5b7]/70">
                    {language === 'ar' ? settings.detailedHoursAr : settings.detailedHoursEn}
                  </p>
                </div>
              </div>
            </div>

            {/* Telephone & Price Range */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-[#2a1d18] border border-[#e8d5b7]/15 shadow-xl flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-bold text-[#e8d5b7]/60 uppercase tracking-wider mb-1">
                    {t('location_phone_label')}
                  </h3>
                  <a
                    href={`tel:${settings.phone}`}
                    className="text-base font-bold text-[#fff7eb] hover:text-[#f4b65f] transition-colors block mb-2"
                    dir="ltr"
                  >
                    {settings.phoneDisplay}
                  </a>
                </div>
                <a
                  href={`tel:${settings.phone}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#f4b65f]"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{t('location_call_now')}</span>
                </a>
              </div>

              <div className="p-5 rounded-2xl bg-[#2a1d18] border border-[#e8d5b7]/15 shadow-xl flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-bold text-[#e8d5b7]/60 uppercase tracking-wider mb-1">
                    {language === 'ar' ? 'متوسط السعر' : 'Price Range'}
                  </h3>
                  <p className="text-base font-bold text-[#f4b65f] tabular-nums mb-1">
                    {settings.priceRange}
                  </p>
                </div>
                <span className="text-[11px] text-[#e8d5b7]/60">
                  {language === 'ar' ? 'جلسات عائلية وشبابية' : 'Dine-in & Takeaway'}
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Google Map Visual Frame (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-[#e8d5b7]/15 bg-[#2a1d18] shadow-2xl relative min-h-[400px] flex flex-col">
            <div className="relative flex-1 w-full overflow-hidden">
              <iframe
                title="Google Map Shai M5m5a Al Wasl Dubai"
                src="https://maps.google.com/maps?q=6743%2B4QP%20Al%20Wasl%20Dubai&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full min-h-[380px] border-0 filter contrast-125 brightness-95 invert-[90%] hue-rotate-180"
                loading="lazy"
              />
            </div>

            {/* Bottom Quick Action Bar */}
            <div className="p-4 sm:p-5 bg-[#17110e] border-t border-[#e8d5b7]/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-medium text-[#fff7eb]">
                  {language === 'ar' ? 'مفتوح للطلبات والجلسات الخارجية' : 'Open for Takeaway & Outdoor Dine-in'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={settings.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl brand-gradient text-white text-xs font-bold shadow-md hover:brightness-110 transition-all flex items-center gap-2"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>{t('hero_cta_directions')}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
