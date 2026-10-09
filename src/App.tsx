import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { CartProvider, useCart } from './context/CartContext';
import {
  getMenuItems,
  getBusinessSettings,
  getSpecialOffers,
  getGalleryItems,
  getCustomerInquiries,
} from './lib/storage';
import { INITIAL_CATEGORIES } from './data/initialData';
import { MenuItem, MenuCategory, BusinessSettings, SpecialOffer, GalleryItem, CustomerInquiry } from './types';

// Components
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { OffersSection } from './components/OffersSection';
import { FeaturedSection } from './components/FeaturedSection';
import { MenuSection } from './components/MenuSection';
import { StorySection } from './components/StorySection';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { ItemDetailsModal } from './components/ItemDetailsModal';
import { TakeawayCartDrawer } from './components/TakeawayCartDrawer';
import { AdminDashboard } from './components/AdminDashboard';
import { Phone, ShoppingBag, ArrowUp } from 'lucide-react';

const MainApp: React.FC = () => {
  const { language, t, isRtl } = useLanguage();
  const { totalCount, setIsCartOpen } = useCart();

  // Dynamic State synchronized with storage
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => getMenuItems());
  const [categories] = useState<MenuCategory[]>(INITIAL_CATEGORIES);
  const [settings, setSettings] = useState<BusinessSettings>(() => getBusinessSettings());
  const [offers, setOffers] = useState<SpecialOffer[]>(() => getSpecialOffers());
  const [gallery, setGallery] = useState<GalleryItem[]>(() => getGalleryItems());
  const [inquiries, setInquiries] = useState<CustomerInquiry[]>(() => getCustomerInquiries());

  // Navigation & UI States
  const [activeSection, setActiveSection] = useState<string>('home');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Sync state when local storage updates
  const refreshData = () => {
    setMenuItems(getMenuItems());
    setSettings(getBusinessSettings());
    setOffers(getSpecialOffers());
    setGallery(getGalleryItems());
    setInquiries(getCustomerInquiries());
  };

  useEffect(() => {
    const handleMenuUpdate = () => setMenuItems(getMenuItems());
    const handleSettingsUpdate = () => setSettings(getBusinessSettings());
    const handleOffersUpdate = () => setOffers(getSpecialOffers());
    const handleGalleryUpdate = () => setGallery(getGalleryItems());
    const handleInquiriesUpdate = () => setInquiries(getCustomerInquiries());

    window.addEventListener('shai_menu_updated', handleMenuUpdate);
    window.addEventListener('shai_settings_updated', handleSettingsUpdate);
    window.addEventListener('shai_offers_updated', handleOffersUpdate);
    window.addEventListener('shai_gallery_updated', handleGalleryUpdate);
    window.addEventListener('shai_inquiries_updated', handleInquiriesUpdate);

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('shai_menu_updated', handleMenuUpdate);
      window.removeEventListener('shai_settings_updated', handleSettingsUpdate);
      window.removeEventListener('shai_offers_updated', handleOffersUpdate);
      window.removeEventListener('shai_gallery_updated', handleGalleryUpdate);
      window.removeEventListener('shai_inquiries_updated', handleInquiriesUpdate);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'admin') {
      setIsAdminOpen(true);
      return;
    }

    setActiveSection(sectionId);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(`${sectionId}-section`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToMenu = () => {
    handleNavigate('menu');
  };

  const scrollToLocation = () => {
    handleNavigate('location');
  };

  return (
    <div className="min-h-screen bg-[#17110e] text-[#fff7eb] flex flex-col font-sans selection:bg-[#c8753d] selection:text-white">
      {/* Optional Top Announcement Strip */}
      {settings.showAnnouncement && (
        <div className="bg-[#2a1d18] border-b border-[#e8d5b7]/10 py-2 px-4 text-center text-xs text-[#f4b65f] font-medium flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#f4b65f]" />
          <span>{language === 'ar' ? settings.announcementAr : settings.announcementEn}</span>
        </div>
      )}

      {/* Primary Navigation Bar */}
      <Navbar
        settings={settings}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 1. Cinematic Hero Section */}
        <section id="home-section">
          <HeroSection
            settings={settings}
            onExploreMenu={scrollToMenu}
            onGetDirections={scrollToLocation}
          />
        </section>

        {/* 2. Special Offers & Combos */}
        <OffersSection
          offers={offers}
          onOrderNow={scrollToMenu}
        />

        {/* 3. Featured Signature Highlights */}
        <section id="featured-section">
          <FeaturedSection
            items={menuItems}
            onViewAllMenu={scrollToMenu}
            onItemClick={setSelectedItem}
          />
        </section>

        {/* 4. Complete Dynamic Digital Menu */}
        <MenuSection
          items={menuItems}
          categories={categories}
          onItemClick={setSelectedItem}
        />

        {/* 5. Our Story Section */}
        <section id="story-section">
          <StorySection
            onExploreMenu={scrollToMenu}
            onGetDirections={scrollToLocation}
          />
        </section>

        {/* 6. Food & Café Gallery */}
        <section id="gallery-section">
          <GallerySection items={gallery} />
        </section>

        {/* 7. Customer Reviews & Google Score */}
        <section id="reviews-section">
          <ReviewsSection googleMapsUrl={settings.googleMapsUrl} />
        </section>

        {/* 8. Location & Operating Hours */}
        <section id="location-section">
          <LocationSection settings={settings} />
        </section>
      </main>

      {/* Footer */}
      <Footer settings={settings} onNavigate={handleNavigate} />

      {/* Item Details Lightbox Modal */}
      <ItemDetailsModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />

      {/* Takeaway Inquiry & Order Cart Drawer */}
      <TakeawayCartDrawer settings={settings} />

      {/* Protected Admin Dashboard Modal */}
      {isAdminOpen && (
        <AdminDashboard
          menuItems={menuItems}
          categories={categories}
          settings={settings}
          offers={offers}
          gallery={gallery}
          inquiries={inquiries}
          onClose={() => setIsAdminOpen(false)}
          onRefresh={refreshData}
        />
      )}

      {/* Floating Bottom Quick Bar for Mobile */}
      <div className="fixed bottom-4 left-4 right-4 z-30 lg:hidden flex items-center justify-between gap-3 pointer-events-none">
        <a
          href={`tel:${settings.phone}`}
          className="pointer-events-auto flex-1 py-3 px-4 rounded-xl bg-[#2a1d18]/95 border border-[#c8753d]/50 text-[#f4b65f] font-bold text-xs flex items-center justify-center gap-2 shadow-xl backdrop-blur-md"
        >
          <Phone className="w-4 h-4" />
          <span>{t('nav_call')}</span>
        </a>

        <button
          onClick={() => setIsCartOpen(true)}
          className="pointer-events-auto py-3 px-5 rounded-xl brand-gradient text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xl cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>{t('nav_takeaway')}</span>
          {totalCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-white text-[#c8753d] text-[11px] font-black flex items-center justify-center">
              {totalCount}
            </span>
          )}
        </button>

        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="pointer-events-auto p-3 rounded-xl bg-[#17110e]/90 border border-[#e8d5b7]/20 text-[#fff7eb] shadow-xl backdrop-blur-md cursor-pointer"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Desktop Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="hidden lg:flex fixed bottom-6 right-6 rtl:right-auto rtl:left-6 z-30 p-3 rounded-xl bg-[#2a1d18]/90 border border-[#e8d5b7]/20 text-[#f4b65f] hover:text-white hover:border-[#f4b65f] shadow-2xl backdrop-blur-md transition-all cursor-pointer"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        <MainApp />
      </CartProvider>
    </LanguageProvider>
  );
}
