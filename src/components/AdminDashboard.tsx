import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  MenuItem,
  MenuCategory,
  BusinessSettings,
  SpecialOffer,
  GalleryItem,
  CustomerInquiry,
} from '../types';
import {
  saveMenuItems,
  saveBusinessSettings,
  saveSpecialOffers,
  saveGalleryItems,
  updateInquiryStatus,
  deleteInquiry,
  resetToPdfDefaults,
  setAdminAuth,
  getAdminAuth,
} from '../lib/storage';
import {
  Shield,
  Plus,
  Edit2,
  Trash2,
  Save,
  RotateCcw,
  LogOut,
  Layers,
  ShoppingBag,
  Settings,
  Image,
  Tag,
  Phone,
  Clock,
  X,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

interface AdminDashboardProps {
  menuItems: MenuItem[];
  categories: MenuCategory[];
  settings: BusinessSettings;
  offers: SpecialOffer[];
  gallery: GalleryItem[];
  inquiries: CustomerInquiry[];
  onClose: () => void;
  onRefresh: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  menuItems,
  categories,
  settings,
  offers,
  gallery,
  inquiries,
  onClose,
  onRefresh,
}) => {
  const { language, t } = useLanguage();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => getAdminAuth());
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState<'menu' | 'inquiries' | 'settings' | 'offers' | 'gallery'>('menu');

  // Menu item editing state
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isNewItem, setIsNewItem] = useState(false);

  // Settings editing state
  const [editSettings, setEditSettings] = useState<BusinessSettings>(settings);
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Offers editing state
  const [offersList, setOffersList] = useState<SpecialOffer[]>(offers);

  // Gallery editing state
  const [galleryList, setGalleryList] = useState<GalleryItem[]>(gallery);
  const [newGalleryUrl, setNewGalleryUrl] = useState('');
  const [newGalleryTitleAr, setNewGalleryTitleAr] = useState('');
  const [newGalleryCategory, setNewGalleryCategory] = useState<'tea' | 'food' | 'desserts' | 'atmosphere'>('tea');

  // Lock body scroll when admin dashboard or item edit modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'shaim5m5a' || passwordInput === 'admin123' || passwordInput === 'm5m5a') {
      setAdminAuth(true);
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError(language === 'ar' ? 'كلمة المرور غير صحيحة (جرب: shaim5m5a)' : 'Incorrect password (try: shaim5m5a)');
    }
  };

  const handleLogout = () => {
    setAdminAuth(false);
    setIsAuthenticated(false);
  };

  // Menu item operations
  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    let updatedList: MenuItem[];
    if (isNewItem) {
      updatedList = [editingItem, ...menuItems];
    } else {
      updatedList = menuItems.map((item) => (item.id === editingItem.id ? editingItem : item));
    }

    saveMenuItems(updatedList);
    setEditingItem(null);
    setIsNewItem(false);
    onRefresh();
  };

  const handleDeleteItem = (id: string) => {
    if (window.confirm(language === 'ar' ? 'هل أنت متأكد من حذف هذا الصنف؟' : 'Are you sure you want to delete this item?')) {
      const updatedList = menuItems.filter((i) => i.id !== id);
      saveMenuItems(updatedList);
      onRefresh();
    }
  };

  const handleToggleAvailable = (item: MenuItem) => {
    const updated = menuItems.map((i) => (i.id === item.id ? { ...i, isAvailable: !i.isAvailable } : i));
    saveMenuItems(updated);
    onRefresh();
  };

  const handleToggleFeatured = (item: MenuItem) => {
    const updated = menuItems.map((i) => (i.id === item.id ? { ...i, isFeatured: !i.isFeatured } : i));
    saveMenuItems(updated);
    onRefresh();
  };

  const handleResetPdf = () => {
    if (window.confirm(t('admin_reset_confirm'))) {
      resetToPdfDefaults();
      onRefresh();
      alert(language === 'ar' ? 'تم استرجاع قائمة الـ PDF الأصلية بنجاح' : 'PDF Menu defaults restored successfully');
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    saveBusinessSettings(editSettings);
    setSettingsSaved(true);
    onRefresh();
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  const handleAddGalleryItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGalleryUrl.trim() || !newGalleryTitleAr.trim()) return;

    const newItem: GalleryItem = {
      id: `gal-${Date.now()}`,
      titleAr: newGalleryTitleAr,
      titleEn: newGalleryTitleAr,
      category: newGalleryCategory,
      imageUrl: newGalleryUrl,
    };
    const updated = [newItem, ...galleryList];
    setGalleryList(updated);
    saveGalleryItems(updated);
    setNewGalleryUrl('');
    setNewGalleryTitleAr('');
    onRefresh();
  };

  const handleDeleteGalleryItem = (id: string) => {
    const updated = galleryList.filter((g) => g.id !== id);
    setGalleryList(updated);
    saveGalleryItems(updated);
    onRefresh();
  };

  // If not authenticated, show login form modal
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
        <div className="w-full max-w-sm sm:max-w-md p-5 sm:p-8 rounded-2xl bg-[#2a1d18] border border-[#f4b65f]/30 shadow-2xl text-center">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#17110e] border border-[#f4b65f]/40 flex items-center justify-center mx-auto mb-4">
            <Shield className="w-6 h-6 sm:w-7 sm:h-7 text-[#f4b65f]" />
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-[#fff7eb] mb-1.5">{t('admin_login_title')}</h2>
          <p className="text-xs text-[#e8d5b7]/70 mb-5">{t('admin_login_desc')}</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder={language === 'ar' ? 'كلمة المرور (shaim5m5a)' : 'Password (shaim5m5a)'}
                className="w-full px-4 py-3 rounded-xl bg-[#17110e] border border-[#e8d5b7]/20 text-[#fff7eb] text-sm text-center focus:outline-none focus:border-[#f4b65f] min-h-[44px]"
              />
            </div>

            {authError && <p className="text-xs text-red-400">{authError}</p>}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl brand-gradient text-white text-xs sm:text-sm font-bold shadow-lg cursor-pointer min-h-[46px]"
            >
              {t('admin_login_btn')}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 rounded-xl text-xs text-[#e8d5b7]/60 hover:text-white cursor-pointer min-h-[40px]"
            >
              {t('admin_cancel')}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#17110e] text-[#fff7eb] flex flex-col">
      {/* Top Admin Header */}
      <header className="bg-[#2a1d18] border-b border-[#e8d5b7]/15 px-4 sm:px-6 py-3 sm:py-4 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-20">
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#17110e] border border-[#f4b65f]/30 flex items-center justify-center shrink-0">
            <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-[#f4b65f]" />
          </div>
          <div className="min-w-0">
            <h1 className="text-sm sm:text-base md:text-lg font-bold text-[#fff7eb] truncate">{t('admin_title')}</h1>
            <span className="text-[10px] sm:text-[11px] text-[#e8d5b7]/60 truncate block">{t('admin_subtitle')}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={handleResetPdf}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#c8753d]/50 text-[#f4b65f] hover:bg-[#c8753d]/10 text-xs font-medium cursor-pointer min-h-[36px]"
            title={t('admin_reset_pdf')}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'استعادة الـ PDF' : 'Reset to PDF'}</span>
          </button>

          <button
            onClick={handleLogout}
            className="p-2 sm:px-3 sm:py-1.5 rounded-lg bg-[#17110e] text-red-400 hover:bg-red-950/40 text-xs font-semibold flex items-center gap-1.5 cursor-pointer min-h-[36px]"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">{t('admin_logout_btn')}</span>
          </button>

          <button
            onClick={onClose}
            className="px-3.5 sm:px-4 py-2 rounded-lg brand-gradient text-white text-xs font-bold shadow-md cursor-pointer min-h-[36px]"
          >
            {language === 'ar' ? 'العودة' : 'Exit'}
          </button>
        </div>
      </header>

      {/* Admin KPI Overview Strip */}
      <div className="bg-[#1f1511] border-b border-[#e8d5b7]/10 px-4 sm:px-6 py-3 sm:py-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-3 rounded-xl bg-[#2a1d18] border border-[#e8d5b7]/10">
            <span className="text-[10px] sm:text-[11px] text-[#e8d5b7]/60 block mb-0.5">
              {language === 'ar' ? 'إجمالي الأصناف' : 'Total Items'}
            </span>
            <span className="text-xl sm:text-2xl font-bold text-[#f4b65f] tabular-nums">{menuItems.length}</span>
          </div>

          <div className="p-3 rounded-xl bg-[#2a1d18] border border-[#e8d5b7]/10">
            <span className="text-[10px] sm:text-[11px] text-[#e8d5b7]/60 block mb-0.5">
              {language === 'ar' ? 'الأصناف المتوفرة' : 'Available'}
            </span>
            <span className="text-xl sm:text-2xl font-bold text-emerald-400 tabular-nums">
              {menuItems.filter((i) => i.isAvailable).length}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#2a1d18] border border-[#e8d5b7]/10">
            <span className="text-[10px] sm:text-[11px] text-[#e8d5b7]/60 block mb-0.5">
              {language === 'ar' ? 'طلبات جديدة' : 'New Inquiries'}
            </span>
            <span className="text-xl sm:text-2xl font-bold text-[#c8753d] tabular-nums">
              {inquiries.filter((i) => i.status === 'new').length}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#2a1d18] border border-[#e8d5b7]/10">
            <span className="text-[10px] sm:text-[11px] text-[#e8d5b7]/60 block mb-0.5">
              {language === 'ar' ? 'عروض نشطة' : 'Active Offers'}
            </span>
            <span className="text-xl sm:text-2xl font-bold text-[#fff7eb] tabular-nums">
              {offers.filter((o) => o.isActive).length}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="border-b border-[#e8d5b7]/10 bg-[#17110e] px-4 sm:px-6 sticky top-[57px] sm:top-[65px] z-10 overflow-x-auto scrollbar-none py-2">
        <div className="max-w-7xl mx-auto flex items-center gap-2 min-w-max">
          <button
            onClick={() => setActiveTab('menu')}
            className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer min-h-[38px] ${
              activeTab === 'menu'
                ? 'brand-gradient text-white shadow'
                : 'text-[#e8d5b7]/70 hover:text-white bg-[#2a1d18]/40'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{t('admin_tab_menu')} ({menuItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer min-h-[38px] ${
              activeTab === 'inquiries'
                ? 'brand-gradient text-white shadow'
                : 'text-[#e8d5b7]/70 hover:text-white bg-[#2a1d18]/40'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{t('admin_tab_inquiries')} ({inquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer min-h-[38px] ${
              activeTab === 'settings'
                ? 'brand-gradient text-white shadow'
                : 'text-[#e8d5b7]/70 hover:text-white bg-[#2a1d18]/40'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>{t('admin_tab_settings')}</span>
          </button>

          <button
            onClick={() => setActiveTab('offers')}
            className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer min-h-[38px] ${
              activeTab === 'offers'
                ? 'brand-gradient text-white shadow'
                : 'text-[#e8d5b7]/70 hover:text-white bg-[#2a1d18]/40'
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>{t('admin_tab_offers')}</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer min-h-[38px] ${
              activeTab === 'gallery'
                ? 'brand-gradient text-white shadow'
                : 'text-[#e8d5b7]/70 hover:text-white bg-[#2a1d18]/40'
            }`}
          >
            <Image className="w-4 h-4" />
            <span>{t('admin_tab_gallery')}</span>
          </button>
        </div>
      </div>

      {/* Tab Contents */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 space-y-6">
        {/* 1. Menu Management Tab */}
        {activeTab === 'menu' && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[#fff7eb]">{t('admin_tab_menu')}</h3>
                <p className="text-xs text-[#e8d5b7]/60">
                  {language === 'ar' ? 'تعديل الأسعار والأصناف وإضافة أطباق جديدة.' : 'Update pricing, availability, and item details.'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetPdf}
                  className="sm:hidden px-3 py-2 rounded-xl border border-[#c8753d]/50 text-[#f4b65f] text-xs font-medium cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 inline mr-1" />
                  <span>PDF</span>
                </button>

                <button
                  onClick={() => {
                    setIsNewItem(true);
                    setEditingItem({
                      id: `item-${Date.now()}`,
                      nameAr: '',
                      nameEn: '',
                      descriptionAr: '',
                      descriptionEn: '',
                      categoryId: 'hot-drinks',
                      price: 10,
                      currency: 'AED',
                      imageUrl: '/traditional_karak_tea_1791522225854.jpg',
                      isAvailable: true,
                      isFeatured: false,
                      isPublished: true,
                      createdAt: new Date().toISOString(),
                      updatedAt: new Date().toISOString(),
                    });
                  }}
                  className="px-4 py-2.5 rounded-xl brand-gradient text-white text-xs font-bold flex items-center gap-2 shadow cursor-pointer min-h-[40px]"
                >
                  <Plus className="w-4 h-4" />
                  <span>{t('admin_add_item')}</span>
                </button>
              </div>
            </div>

            {/* Mobile Card View for Screens < 768px */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:hidden gap-3">
              {menuItems.map((item) => (
                <div key={item.id} className="p-3.5 rounded-xl bg-[#2a1d18] border border-[#e8d5b7]/10 flex flex-col justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <img
                      src={item.imageUrl}
                      alt={item.nameAr}
                      className="w-12 h-12 rounded-lg object-cover bg-black shrink-0"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/neon_garden_cafe.jpg';
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-[#fff7eb] truncate">{item.nameAr}</h4>
                      <p className="text-xs text-[#e8d5b7]/60 truncate">{item.nameEn}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-bold text-[#f4b65f] tabular-nums">
                          {item.price} AED
                        </span>
                        <span className="text-[10px] text-[#e8d5b7]/50">
                          {categories.find((c) => c.id === item.categoryId)?.nameAr || item.categoryId}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#e8d5b7]/10">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleAvailable(item)}
                        className={`px-2 py-1 rounded text-[11px] font-bold cursor-pointer ${
                          item.isAvailable
                            ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30'
                            : 'bg-red-950/60 text-red-400 border border-red-500/30'
                        }`}
                      >
                        {item.isAvailable ? (language === 'ar' ? 'متوفر' : 'Available') : (language === 'ar' ? 'غير متوفر' : 'Unavailable')}
                      </button>

                      <button
                        onClick={() => handleToggleFeatured(item)}
                        className={`text-xs px-2 py-1 rounded bg-[#17110e] ${
                          item.isFeatured ? 'text-[#f4b65f] font-bold' : 'text-zinc-500'
                        }`}
                      >
                        ★ {item.isFeatured ? 'مميز' : 'عادي'}
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setIsNewItem(false);
                          setEditingItem(item);
                        }}
                        className="p-2 rounded-lg bg-[#17110e] text-[#f4b65f] hover:text-white min-w-[36px] min-h-[36px] flex items-center justify-center cursor-pointer"
                        aria-label="Edit"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="p-2 rounded-lg bg-[#17110e] text-red-400 hover:text-red-300 min-w-[36px] min-h-[36px] flex items-center justify-center cursor-pointer"
                        aria-label="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View for Screens >= 768px */}
            <div className="hidden md:block overflow-x-auto rounded-2xl border border-[#e8d5b7]/15 bg-[#2a1d18]">
              <table className="w-full text-xs text-left rtl:text-right">
                <thead className="bg-[#17110e] text-[#e8d5b7]/70 border-b border-[#e8d5b7]/10 uppercase text-[10px]">
                  <tr>
                    <th className="p-3.5">{language === 'ar' ? 'الصنف' : 'Item'}</th>
                    <th className="p-3.5">{language === 'ar' ? 'التصنيف' : 'Category'}</th>
                    <th className="p-3.5">{language === 'ar' ? 'السعر (AED)' : 'Price (AED)'}</th>
                    <th className="p-3.5">{language === 'ar' ? 'الحالة' : 'Status'}</th>
                    <th className="p-3.5">{language === 'ar' ? 'مميز' : 'Featured'}</th>
                    <th className="p-3.5 text-center">{language === 'ar' ? 'الإجراءات' : 'Actions'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e8d5b7]/10">
                  {menuItems.map((item) => (
                    <tr key={item.id} className="hover:bg-[#17110e]/40 transition-colors">
                      <td className="p-3.5 flex items-center gap-3">
                        <img
                          src={item.imageUrl}
                          alt={item.nameAr}
                          className="w-10 h-10 rounded-lg object-cover bg-black"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/neon_garden_cafe.jpg';
                          }}
                        />
                        <div>
                          <span className="font-bold text-[#fff7eb] block">{item.nameAr}</span>
                          <span className="text-[11px] text-[#e8d5b7]/60 block">{item.nameEn}</span>
                        </div>
                      </td>
                      <td className="p-3.5 text-[#e8d5b7]/80 font-medium">
                        {categories.find((c) => c.id === item.categoryId)?.nameAr || item.categoryId}
                      </td>
                      <td className="p-3.5 font-bold text-[#f4b65f] tabular-nums">
                        {item.price} AED
                        {item.priceTakeaway && (
                          <span className="text-[10px] text-[#e8d5b7]/50 block">
                            T: {item.priceTakeaway} | C: {item.priceGlass}
                          </span>
                        )}
                      </td>
                      <td className="p-3.5">
                        <button
                          onClick={() => handleToggleAvailable(item)}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-bold cursor-pointer ${
                            item.isAvailable
                              ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30'
                              : 'bg-red-950/60 text-red-400 border border-red-500/30'
                          }`}
                        >
                          {item.isAvailable ? (language === 'ar' ? 'متوفر' : 'Available') : (language === 'ar' ? 'غير متوفر' : 'Unavailable')}
                        </button>
                      </td>
                      <td className="p-3.5">
                        <button
                          onClick={() => handleToggleFeatured(item)}
                          className={`text-xs font-semibold cursor-pointer ${
                            item.isFeatured ? 'text-[#f4b65f]' : 'text-zinc-600 hover:text-zinc-400'
                          }`}
                        >
                          ★ {item.isFeatured ? (language === 'ar' ? 'نعم' : 'Yes') : (language === 'ar' ? 'لا' : 'No')}
                        </button>
                      </td>
                      <td className="p-3.5 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => {
                              setIsNewItem(false);
                              setEditingItem(item);
                            }}
                            className="p-1.5 rounded-lg bg-[#17110e] text-[#f4b65f] hover:text-white"
                            title="Edit"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            className="p-1.5 rounded-lg bg-[#17110e] text-red-400 hover:text-red-300"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 2. Takeaway Inquiries Tab */}
        {activeTab === 'inquiries' && (
          <div className="space-y-5">
            <h3 className="text-lg sm:text-xl font-bold text-[#fff7eb]">{t('admin_tab_inquiries')}</h3>

            {inquiries.length === 0 ? (
              <div className="py-16 text-center rounded-2xl bg-[#2a1d18] border border-[#e8d5b7]/10 p-6 sm:p-8">
                <ShoppingBag className="w-12 h-12 text-[#e8d5b7]/30 mx-auto mb-3" />
                <p className="text-xs sm:text-sm text-[#e8d5b7]/70">
                  {language === 'ar' ? 'لا توجد طلبات سفري حالياً.' : 'No takeaway inquiries received yet.'}
                </p>
              </div>
            ) : (
              <div className="space-y-3.5">
                {inquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className="p-4 sm:p-5 rounded-2xl bg-[#2a1d18] border border-[#e8d5b7]/15 flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 shadow-lg"
                  >
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <span className="text-sm sm:text-base font-bold text-[#fff7eb]">{inq.customerName}</span>
                        <a
                          href={`tel:${inq.phoneNumber}`}
                          className="text-xs font-mono font-bold text-[#f4b65f] bg-[#17110e] px-2.5 py-1 rounded-md"
                          dir="ltr"
                        >
                          {inq.phoneNumber}
                        </a>
                        <span className="text-[10px] sm:text-[11px] text-[#e8d5b7]/50">
                          {new Date(inq.createdAt).toLocaleString()}
                        </span>
                      </div>

                      {/* Items */}
                      <div className="flex flex-wrap gap-1.5 pt-1.5">
                        {inq.items.map((item, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-lg bg-[#17110e] text-[11px] sm:text-xs text-[#e8d5b7]/90 border border-[#e8d5b7]/10"
                          >
                            {item.quantity}× {language === 'ar' ? item.nameAr : item.nameEn}
                            {item.selectedOption ? ` (${item.selectedOption})` : ''} — {item.price * item.quantity} AED
                          </span>
                        ))}
                      </div>

                      {inq.notes && (
                        <p className="text-xs text-[#e8d5b7]/70 italic pt-1">
                          "{inq.notes}"
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-3 border-t md:border-t-0 pt-3 md:pt-0 border-[#e8d5b7]/10">
                      <div className="text-right rtl:text-left">
                        <span className="text-base sm:text-lg font-bold text-[#f4b65f] tabular-nums block">
                          {inq.totalAmount} AED
                        </span>
                      </div>

                      <select
                        value={inq.status}
                        onChange={(e) => updateInquiryStatus(inq.id, e.target.value as CustomerInquiry['status'])}
                        className="px-3 py-1.5 rounded-lg bg-[#17110e] border border-[#e8d5b7]/20 text-xs text-[#fff7eb] focus:outline-none min-h-[36px]"
                      >
                        <option value="new">{language === 'ar' ? 'جديد' : 'New'}</option>
                        <option value="contacted">{language === 'ar' ? 'تم التواصل' : 'Contacted'}</option>
                        <option value="completed">{language === 'ar' ? 'مكتمل' : 'Completed'}</option>
                        <option value="cancelled">{language === 'ar' ? 'ملغي' : 'Cancelled'}</option>
                      </select>

                      <button
                        onClick={() => deleteInquiry(inq.id)}
                        className="p-2 rounded-lg bg-[#17110e] text-red-400 hover:text-red-300 min-w-[36px] min-h-[36px] flex items-center justify-center cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 3. Business Settings Tab */}
        {activeTab === 'settings' && (
          <form onSubmit={handleSaveSettings} className="space-y-5 max-w-3xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg sm:text-xl font-bold text-[#fff7eb]">{t('admin_tab_settings')}</h3>
              <button
                type="submit"
                className="px-4 sm:px-5 py-2.5 rounded-xl brand-gradient text-white text-xs font-bold shadow-md flex items-center gap-2 cursor-pointer min-h-[40px]"
              >
                <Save className="w-4 h-4" />
                <span>{t('admin_save')}</span>
              </button>
            </div>

            {settingsSaved && (
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs">
                {language === 'ar' ? 'تم حفظ التعديلات بنجاح!' : 'Settings updated successfully!'}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-medium text-[#e8d5b7]/80 mb-1">
                  {language === 'ar' ? 'اسم المحل (عربي)' : 'Business Name (Arabic)'}
                </label>
                <input
                  type="text"
                  value={editSettings.nameAr}
                  onChange={(e) => setEditSettings({ ...editSettings, nameAr: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#2a1d18] border border-[#e8d5b7]/20 text-[#fff7eb] text-xs focus:outline-none focus:border-[#f4b65f] min-h-[42px]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#e8d5b7]/80 mb-1">
                  {language === 'ar' ? 'اسم المحل (إنجليزي)' : 'Business Name (English)'}
                </label>
                <input
                  type="text"
                  value={editSettings.nameEn}
                  onChange={(e) => setEditSettings({ ...editSettings, nameEn: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#2a1d18] border border-[#e8d5b7]/20 text-[#fff7eb] text-xs focus:outline-none focus:border-[#f4b65f] min-h-[42px]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#e8d5b7]/80 mb-1">
                  {t('location_phone_label')}
                </label>
                <input
                  type="text"
                  value={editSettings.phone}
                  onChange={(e) => setEditSettings({ ...editSettings, phone: e.target.value })}
                  dir="ltr"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#2a1d18] border border-[#e8d5b7]/20 text-[#fff7eb] text-xs focus:outline-none focus:border-[#f4b65f] min-h-[42px]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#e8d5b7]/80 mb-1">
                  {language === 'ar' ? 'عرض رقم الهاتف' : 'Display Phone'}
                </label>
                <input
                  type="text"
                  value={editSettings.phoneDisplay}
                  onChange={(e) => setEditSettings({ ...editSettings, phoneDisplay: e.target.value })}
                  dir="ltr"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#2a1d18] border border-[#e8d5b7]/20 text-[#fff7eb] text-xs focus:outline-none focus:border-[#f4b65f] min-h-[42px]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-[#e8d5b7]/80 mb-1">
                  {t('location_address_label')}
                </label>
                <input
                  type="text"
                  value={editSettings.addressAr}
                  onChange={(e) => setEditSettings({ ...editSettings, addressAr: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#2a1d18] border border-[#e8d5b7]/20 text-[#fff7eb] text-xs focus:outline-none focus:border-[#f4b65f] min-h-[42px]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#e8d5b7]/80 mb-1">
                  {language === 'ar' ? 'ساعات العمل' : 'Opening Hours'}
                </label>
                <input
                  type="text"
                  value={editSettings.hoursAr}
                  onChange={(e) => setEditSettings({ ...editSettings, hoursAr: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#2a1d18] border border-[#e8d5b7]/20 text-[#fff7eb] text-xs focus:outline-none focus:border-[#f4b65f] min-h-[42px]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#e8d5b7]/80 mb-1">
                  {language === 'ar' ? 'نطاق السعر' : 'Price Range'}
                </label>
                <input
                  type="text"
                  value={editSettings.priceRange}
                  onChange={(e) => setEditSettings({ ...editSettings, priceRange: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#2a1d18] border border-[#e8d5b7]/20 text-[#fff7eb] text-xs focus:outline-none focus:border-[#f4b65f] min-h-[42px]"
                />
              </div>
            </div>
          </form>
        )}

        {/* 4. Special Offers Tab */}
        {activeTab === 'offers' && (
          <div className="space-y-5">
            <h3 className="text-lg sm:text-xl font-bold text-[#fff7eb]">{t('admin_tab_offers')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {offersList.map((offer) => (
                <div key={offer.id} className="p-4 sm:p-5 rounded-2xl bg-[#2a1d18] border border-[#e8d5b7]/15 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-bold text-[#f4b65f]">{offer.tagAr}</span>
                    <button
                      onClick={() => {
                        const updated = offersList.map((o) => (o.id === offer.id ? { ...o, isActive: !o.isActive } : o));
                        setOffersList(updated);
                        saveSpecialOffers(updated);
                        onRefresh();
                      }}
                      className={`px-2.5 py-1 rounded text-xs font-bold cursor-pointer ${
                        offer.isActive ? 'bg-emerald-950 text-emerald-400' : 'bg-red-950 text-red-400'
                      }`}
                    >
                      {offer.isActive ? 'نشط' : 'معطل'}
                    </button>
                  </div>
                  <h4 className="font-bold text-sm sm:text-base text-[#fff7eb]">{offer.titleAr}</h4>
                  <p className="text-xs text-[#e8d5b7]/80 leading-relaxed">{offer.descriptionAr}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. Gallery Management Tab */}
        {activeTab === 'gallery' && (
          <div className="space-y-5">
            <h3 className="text-lg sm:text-xl font-bold text-[#fff7eb]">{t('admin_tab_gallery')}</h3>

            {/* Add Image Form */}
            <form onSubmit={handleAddGalleryItem} className="p-4 sm:p-5 rounded-2xl bg-[#2a1d18] border border-[#e8d5b7]/15 space-y-3">
              <span className="text-xs font-bold text-[#f4b65f] block">
                {language === 'ar' ? 'إضافة صورة جديدة للمعرض' : 'Add Image to Gallery'}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  required
                  placeholder="رابط الصورة (URL)"
                  value={newGalleryUrl}
                  onChange={(e) => setNewGalleryUrl(e.target.value)}
                  className="px-3.5 py-2.5 rounded-xl bg-[#17110e] border border-[#e8d5b7]/20 text-xs min-h-[40px]"
                />
                <input
                  type="text"
                  required
                  placeholder="عنوان الصورة"
                  value={newGalleryTitleAr}
                  onChange={(e) => setNewGalleryTitleAr(e.target.value)}
                  className="px-3.5 py-2.5 rounded-xl bg-[#17110e] border border-[#e8d5b7]/20 text-xs min-h-[40px]"
                />
                <select
                  value={newGalleryCategory}
                  onChange={(e) => setNewGalleryCategory(e.target.value as any)}
                  className="px-3.5 py-2.5 rounded-xl bg-[#17110e] border border-[#e8d5b7]/20 text-xs min-h-[40px]"
                >
                  <option value="tea">الشاي والقهوة</option>
                  <option value="food">المأكولات</option>
                  <option value="desserts">الحلويات</option>
                  <option value="atmosphere">أجواء المقهى</option>
                </select>
              </div>
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl brand-gradient text-white text-xs font-bold cursor-pointer min-h-[40px]"
              >
                {language === 'ar' ? 'إضافة الصورة' : 'Add Image'}
              </button>
            </form>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
              {galleryList.map((g) => (
                <div key={g.id} className="relative aspect-4/3 rounded-xl overflow-hidden bg-[#2a1d18] border border-[#e8d5b7]/10 group">
                  <img src={g.imageUrl} alt={g.titleAr} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                    <span className="text-xs text-white font-bold">{g.titleAr}</span>
                    <button
                      onClick={() => handleDeleteGalleryItem(g.id)}
                      className="self-end p-1.5 rounded-lg bg-red-600 text-white text-xs cursor-pointer min-w-[32px] min-h-[32px] flex items-center justify-center"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Item Edit Modal (Fully Responsive on All Devices) */}
      {editingItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setEditingItem(null)}
        >
          <div
            className="w-full max-w-lg md:max-w-xl max-h-[92dvh] flex flex-col rounded-2xl bg-[#2a1d18] border border-[#f4b65f]/30 shadow-2xl overflow-hidden animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-[#e8d5b7]/10 flex items-center justify-between shrink-0">
              <h3 className="text-base sm:text-lg font-bold text-[#fff7eb] truncate">
                {isNewItem ? t('admin_add_item') : `${t('admin_edit')}: ${editingItem.nameAr}`}
              </h3>
              <button
                onClick={() => setEditingItem(null)}
                className="w-9 h-9 rounded-lg bg-[#17110e] text-[#e8d5b7]/60 hover:text-white flex items-center justify-center cursor-pointer min-w-[36px] min-h-[36px]"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body Form */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              <form id="admin-item-form" onSubmit={handleSaveItem} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#e8d5b7]/80 mb-1 font-medium">الاسم بالعربية *</label>
                    <input
                      type="text"
                      required
                      value={editingItem.nameAr}
                      onChange={(e) => setEditingItem({ ...editingItem, nameAr: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#17110e] border border-[#e8d5b7]/20 text-[#fff7eb] min-h-[42px]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#e8d5b7]/80 mb-1 font-medium">الاسم بالإنجليزية *</label>
                    <input
                      type="text"
                      required
                      value={editingItem.nameEn}
                      onChange={(e) => setEditingItem({ ...editingItem, nameEn: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#17110e] border border-[#e8d5b7]/20 text-[#fff7eb] min-h-[42px]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#e8d5b7]/80 mb-1 font-medium">السعر (درهم إماراتي) *</label>
                    <input
                      type="number"
                      required
                      value={editingItem.price}
                      onChange={(e) => setEditingItem({ ...editingItem, price: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#17110e] border border-[#e8d5b7]/20 text-[#fff7eb] min-h-[42px]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#e8d5b7]/80 mb-1 font-medium">التصنيف *</label>
                    <select
                      value={editingItem.categoryId}
                      onChange={(e) => setEditingItem({ ...editingItem, categoryId: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#17110e] border border-[#e8d5b7]/20 text-[#fff7eb] min-h-[42px]"
                    >
                      {categories.filter((c) => c.id !== 'all').map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.nameAr}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[#e8d5b7]/80 mb-1 font-medium">رابط الصورة (Image URL)</label>
                    <input
                      type="text"
                      value={editingItem.imageUrl}
                      onChange={(e) => setEditingItem({ ...editingItem, imageUrl: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#17110e] border border-[#e8d5b7]/20 text-[#fff7eb] min-h-[42px]"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[#e8d5b7]/80 mb-1 font-medium">الوصف بالعربية</label>
                    <textarea
                      rows={2}
                      value={editingItem.descriptionAr || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, descriptionAr: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#17110e] border border-[#e8d5b7]/20 text-[#fff7eb]"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer min-h-[36px]">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded text-[#c8753d]"
                      checked={editingItem.isAvailable}
                      onChange={(e) => setEditingItem({ ...editingItem, isAvailable: e.target.checked })}
                    />
                    <span>متوفر للطلب</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer min-h-[36px]">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded text-[#c8753d]"
                      checked={editingItem.isFeatured}
                      onChange={(e) => setEditingItem({ ...editingItem, isFeatured: e.target.checked })}
                    />
                    <span>مميز في الصفحة الرئيسية</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer min-h-[36px]">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded text-[#c8753d]"
                      checked={editingItem.isLimitedTime || false}
                      onChange={(e) => setEditingItem({ ...editingItem, isLimitedTime: e.target.checked })}
                    />
                    <span>لفترة محدودة</span>
                  </label>
                </div>
              </form>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-[#e8d5b7]/10 flex items-center justify-end gap-3 bg-[#241814] shrink-0">
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="px-4 py-2.5 rounded-xl border border-[#e8d5b7]/20 text-[#e8d5b7] text-xs font-semibold hover:text-white cursor-pointer min-h-[42px]"
              >
                {t('admin_cancel')}
              </button>
              <button
                form="admin-item-form"
                type="submit"
                className="px-5 py-2.5 rounded-xl brand-gradient text-white text-xs sm:text-sm font-bold cursor-pointer min-h-[42px] shadow-md"
              >
                {t('admin_save')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
