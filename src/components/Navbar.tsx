import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { BusinessSettings } from '../types';
import { Phone, ShoppingBag, Menu as MenuIcon, X, Globe, Shield, Clock } from 'lucide-react';

interface NavbarProps {
  settings: BusinessSettings;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ settings, activeSection, onNavigate }) => {
  const { language, setLanguage, t, isRtl } = useLanguage();
  const { totalCount, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { id: 'home', label: t('nav_home') },
    { id: 'menu', label: t('nav_menu') },
    { id: 'story', label: t('nav_story') },
    { id: 'gallery', label: t('nav_gallery') },
    { id: 'reviews', label: t('nav_reviews') },
    { id: 'location', label: t('nav_location') },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#17110e]/95 backdrop-blur-md border-b border-[#e8d5b7]/10 py-2.5 sm:py-3 shadow-xl'
            : 'bg-gradient-to-b from-[#17110e]/95 via-[#17110e]/80 to-transparent py-3 sm:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2 sm:gap-6 md:gap-8">
            {/* Zone 1: Single text element wordmark */}
            <button
              onClick={() => handleLinkClick('home')}
              className="text-left rtl:text-right group flex items-center gap-2 sm:gap-3 cursor-pointer shrink-0 min-w-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8753d] rounded-lg p-1"
              aria-label="Shai M5m5a Home"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#f4b65f]/40 bg-[#2a1d18] flex items-center justify-center shadow-md group-hover:border-[#f4b65f] transition-colors shrink-0">
                <span className="text-[#f4b65f] text-xs sm:text-sm font-bold font-serif">ش.م</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-base sm:text-xl lg:text-2xl font-bold tracking-tight text-[#fff7eb] group-hover:text-[#f4b65f] transition-colors truncate">
                  {language === 'ar' ? settings.nameAr : settings.nameEn}
                </span>
                <span className="text-[10px] sm:text-[11px] text-[#e8d5b7]/60 truncate -mt-0.5 hidden xs:block sm:block">
                  {language === 'ar' ? 'مقهى شاي تقليدي • دبي' : 'Traditional Tea • Dubai'}
                </span>
              </div>
            </button>

            {/* Zone 2: 4–5 single-line clean nav links */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-sm font-medium text-[#e8d5b7]/80">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c8753d] rounded ${
                    activeSection === link.id
                      ? 'text-[#f4b65f] font-semibold border-b-2 border-[#f4b65f]'
                      : 'hover:text-[#fff7eb]'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => handleLinkClick('admin')}
                className="text-xs text-[#e8d5b7]/50 hover:text-[#e8d5b7] flex items-center gap-1.5 transition-colors whitespace-nowrap py-1 cursor-pointer"
                title={t('nav_admin')}
              >
                <Shield className="w-3.5 h-3.5" />
                <span>{t('nav_admin')}</span>
              </button>
            </nav>

            {/* Zone 3: 1 primary action + Language Toggle + Call Button + Cart */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 md:gap-3 shrink-0">
              {/* Language Switcher (Visible on desktop and medium screens) */}
              <button
                onClick={toggleLanguage}
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#e8d5b7]/20 text-[#e8d5b7] text-xs font-semibold hover:border-[#f4b65f] hover:text-[#fff7eb] transition-all cursor-pointer min-h-[36px]"
                title={language === 'ar' ? 'Switch to English' : 'التحويل إلى العربية'}
              >
                <Globe className="w-3.5 h-3.5 text-[#f4b65f]" />
                <span className="uppercase">{language === 'ar' ? 'EN' : 'عربي'}</span>
              </button>

              {/* Takeaway Cart / Inquiry Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 sm:p-2.5 rounded-lg bg-[#2a1d18] border border-[#e8d5b7]/20 text-[#fff7eb] hover:border-[#f4b65f] transition-all cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center"
                aria-label={t('inquiry_drawer_title')}
              >
                <ShoppingBag className="w-4 h-4 text-[#f4b65f]" />
                {totalCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 rtl:-right-auto rtl:-left-1.5 w-5 h-5 rounded-full bg-[#c8753d] text-white text-[11px] font-bold flex items-center justify-center shadow-md">
                    {totalCount}
                  </span>
                )}
              </button>

              {/* Direct Click to Call (Phone) - Desktop/Tablet */}
              <a
                href={`tel:${settings.phone}`}
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#c8753d]/40 text-[#f4b65f] hover:bg-[#c8753d]/10 text-xs font-medium transition-colors whitespace-nowrap min-h-[36px]"
              >
                <Phone className="w-3.5 h-3.5" />
                <span dir="ltr">{settings.phoneDisplay}</span>
              </a>

              {/* Primary CTA (View Menu) - Tablet & Desktop */}
              <button
                onClick={() => handleLinkClick('menu')}
                className="hidden sm:inline-flex items-center px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-white brand-gradient rounded-lg shadow-md hover:brightness-110 active:scale-95 transition-all whitespace-nowrap cursor-pointer min-h-[36px]"
              >
                {t('nav_cta_menu')}
              </button>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-[#e8d5b7] hover:text-[#fff7eb] hover:bg-[#2a1d18] transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center cursor-pointer"
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden bg-[#17110e]/98 backdrop-blur-xl flex flex-col justify-between animate-fadeIn overflow-y-auto"
          style={{ height: '100dvh' }}
        >
          {/* Top Bar of Mobile Menu with Close Button */}
          <div className="p-4 border-b border-[#e8d5b7]/10 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full border border-[#f4b65f]/40 bg-[#2a1d18] flex items-center justify-center">
                <span className="text-[#f4b65f] text-xs font-bold">ش.م</span>
              </div>
              <span className="text-base font-bold text-[#fff7eb]">{settings.nameAr}</span>
            </div>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg bg-[#2a1d18] text-[#e8d5b7] hover:text-white min-w-[40px] min-h-[40px] flex items-center justify-center cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Nav Links Body */}
          <div className="flex-1 p-5 space-y-4 overflow-y-auto">
            {/* Quick Status Pill */}
            <div className="p-3 rounded-xl bg-[#2a1d18]/70 border border-[#e8d5b7]/10 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-[#f4b65f]">
                <Clock className="w-4 h-4" />
                <span className="font-semibold">{settings.hoursAr}</span>
              </div>
              <span className="text-[11px] text-[#e8d5b7]/60">الوصل، دبي</span>
            </div>

            {/* Language Switcher inside Mobile Menu */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#2a1d18]/40 border border-[#e8d5b7]/10">
              <span className="text-xs text-[#e8d5b7]/80 font-medium">
                {language === 'ar' ? 'لغة الموقع / Language' : 'Site Language'}
              </span>
              <button
                onClick={toggleLanguage}
                className="px-3 py-1.5 rounded-lg brand-gradient text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'English' : 'العربية'}</span>
              </button>
            </div>

            {/* Links List */}
            <nav className="flex flex-col space-y-1.5 pt-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`text-base text-left rtl:text-right font-medium py-3 px-4 rounded-xl transition-colors cursor-pointer min-h-[44px] flex items-center ${
                    activeSection === link.id
                      ? 'bg-[#2a1d18] text-[#f4b65f] font-bold border border-[#f4b65f]/30'
                      : 'text-[#fff7eb] hover:bg-[#2a1d18]/50'
                  }`}
                >
                  {link.label}
                </button>
              ))}

              <button
                onClick={() => handleLinkClick('admin')}
                className="text-xs text-left rtl:text-right text-[#e8d5b7]/60 hover:text-[#fff7eb] py-3 px-4 rounded-xl flex items-center gap-2 cursor-pointer min-h-[44px]"
              >
                <Shield className="w-4 h-4 text-[#c8753d]" />
                <span>{t('nav_admin')}</span>
              </button>
            </nav>
          </div>

          {/* Bottom Actions */}
          <div className="p-5 border-t border-[#e8d5b7]/10 space-y-3 bg-[#17110e] shrink-0">
            <a
              href={`tel:${settings.phone}`}
              className="w-full py-3.5 px-4 rounded-xl bg-[#2a1d18] border border-[#c8753d]/50 text-[#f4b65f] font-bold text-sm flex items-center justify-center gap-2 shadow-lg min-h-[48px]"
            >
              <Phone className="w-4 h-4" />
              <span>{t('nav_call')} ({settings.phoneDisplay})</span>
            </a>

            <button
              onClick={() => handleLinkClick('menu')}
              className="w-full py-3.5 px-4 rounded-xl brand-gradient text-white font-bold text-sm shadow-xl min-h-[48px] cursor-pointer"
            >
              {t('nav_cta_menu')}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
