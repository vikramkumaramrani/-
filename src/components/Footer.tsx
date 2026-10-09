import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { BusinessSettings } from '../types';
import { MapPin, Phone, Clock, Shield, Heart } from 'lucide-react';

interface FooterProps {
  settings: BusinessSettings;
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ settings, onNavigate }) => {
  const { language, t } = useLanguage();

  return (
    <footer className="bg-[#110c0a] border-t border-[#e8d5b7]/10 pt-16 pb-12 text-[#e8d5b7]/70 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-[#f4b65f]/40 bg-[#2a1d18] flex items-center justify-center shadow">
                <span className="text-[#f4b65f] text-sm font-bold font-serif">ش.م</span>
              </div>
              <span className="text-xl font-bold text-[#fff7eb]">
                {settings.nameAr}
              </span>
            </div>

            <p className="text-xs text-[#e8d5b7]/70 leading-relaxed">
              {t('footer_desc')}
            </p>

            <div className="pt-2">
              <span className="inline-block px-3 py-1 rounded-md bg-[#2a1d18] border border-[#e8d5b7]/10 text-[11px] text-[#f4b65f]">
                {language === 'ar' ? 'جلسات خارجية وحديقة في الوصل' : 'Garden Kiosk & Outdoor Seating'}
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#fff7eb] uppercase tracking-wider mb-2">
              {t('footer_quick_links')}
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#f4b65f] transition-colors cursor-pointer"
                >
                  {t('nav_home')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('menu')}
                  className="hover:text-[#f4b65f] transition-colors cursor-pointer"
                >
                  {t('nav_menu')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('story')}
                  className="hover:text-[#f4b65f] transition-colors cursor-pointer"
                >
                  {t('nav_story')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-[#f4b65f] transition-colors cursor-pointer"
                >
                  {t('nav_gallery')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('reviews')}
                  className="hover:text-[#f4b65f] transition-colors cursor-pointer"
                >
                  {t('nav_reviews')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('admin')}
                  className="hover:text-[#f4b65f] transition-colors cursor-pointer flex items-center gap-1.5 pt-1 text-[11px] text-[#e8d5b7]/50"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>{t('nav_admin')}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Hours & Service */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#fff7eb] uppercase tracking-wider mb-2">
              {t('footer_hours')}
            </h4>
            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-[#f4b65f] shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-semibold text-[#fff7eb] block">
                  {settings.hoursAr}
                </span>
                <span className="text-[11px] text-[#e8d5b7]/60 block mt-0.5">
                  {settings.detailedHoursAr}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#e8d5b7]/10">
              <span className="text-[11px] text-[#e8d5b7]/60 block mb-1">
                {language === 'ar' ? 'الخدمات المتاحة:' : 'Available Services:'}
              </span>
              <span className="text-xs text-[#fff7eb]">
                {language === 'ar' ? 'تناول بالمكان (جلسات خارجية) • طلبات سفري' : 'Dine-in (Garden Seating) • Takeaway'}
              </span>
            </div>
          </div>

          {/* Location & Telephone */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#fff7eb] uppercase tracking-wider mb-2">
              {language === 'ar' ? 'العنوان والاتصال' : 'Contact & Location'}
            </h4>
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#c8753d] shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-[#fff7eb] block">
                  {settings.addressAr}
                </span>
                <span className="text-[11px] text-[#e8d5b7]/50 block mt-0.5">
                  Plus Code: {settings.plusCode}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 pt-2">
              <Phone className="w-4 h-4 text-[#f4b65f] shrink-0" />
              <a
                href={`tel:${settings.phone}`}
                className="text-xs font-bold text-[#fff7eb] hover:text-[#f4b65f] transition-colors"
                dir="ltr"
              >
                {settings.phoneDisplay}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-[#e8d5b7]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left rtl:sm:text-right">
          <p className="text-[11px] text-[#e8d5b7]/50">
            {t('footer_rights')} • {t('footer_alwasl')}
          </p>

          <div className="flex items-center gap-1.5 text-[11px] text-[#e8d5b7]/50">
            <span>صُنع بحب لأجل شاي مخمخة</span>
            <Heart className="w-3.5 h-3.5 text-[#c8753d] fill-[#c8753d]" />
          </div>
        </div>
      </div>
    </footer>
  );
};
