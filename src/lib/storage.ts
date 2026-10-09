import { MenuItem, BusinessSettings, SpecialOffer, GalleryItem, CustomerInquiry } from '../types';
import { INITIAL_MENU_ITEMS, INITIAL_BUSINESS_SETTINGS, INITIAL_OFFERS, INITIAL_GALLERY } from '../data/initialData';

const STORAGE_KEYS = {
  MENU_ITEMS: 'shai_m5m5a_menu_items_v2',
  SETTINGS: 'shai_m5m5a_business_settings_v2',
  OFFERS: 'shai_m5m5a_offers_v2',
  GALLERY: 'shai_m5m5a_gallery_v2',
  INQUIRIES: 'shai_m5m5a_inquiries_v2',
  ADMIN_AUTH: 'shai_m5m5a_admin_auth_v2',
};

export const getMenuItems = (): MenuItem[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.MENU_ITEMS);
    if (!data) {
      saveMenuItems(INITIAL_MENU_ITEMS);
      return INITIAL_MENU_ITEMS;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_MENU_ITEMS;
  }
};

export const saveMenuItems = (items: MenuItem[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.MENU_ITEMS, JSON.stringify(items));
    window.dispatchEvent(new Event('shai_menu_updated'));
  } catch (e) {
    console.error('Failed to save menu items', e);
  }
};

export const getBusinessSettings = (): BusinessSettings => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!data) {
      saveBusinessSettings(INITIAL_BUSINESS_SETTINGS);
      return INITIAL_BUSINESS_SETTINGS;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_BUSINESS_SETTINGS;
  }
};

export const saveBusinessSettings = (settings: BusinessSettings) => {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    window.dispatchEvent(new Event('shai_settings_updated'));
  } catch (e) {
    console.error('Failed to save settings', e);
  }
};

export const getSpecialOffers = (): SpecialOffer[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.OFFERS);
    if (!data) {
      saveSpecialOffers(INITIAL_OFFERS);
      return INITIAL_OFFERS;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_OFFERS;
  }
};

export const saveSpecialOffers = (offers: SpecialOffer[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.OFFERS, JSON.stringify(offers));
    window.dispatchEvent(new Event('shai_offers_updated'));
  } catch (e) {
    console.error('Failed to save offers', e);
  }
};

export const getGalleryItems = (): GalleryItem[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.GALLERY);
    if (!data) {
      saveGalleryItems(INITIAL_GALLERY);
      return INITIAL_GALLERY;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_GALLERY;
  }
};

export const saveGalleryItems = (gallery: GalleryItem[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(gallery));
    window.dispatchEvent(new Event('shai_gallery_updated'));
  } catch (e) {
    console.error('Failed to save gallery', e);
  }
};

export const getCustomerInquiries = (): CustomerInquiry[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
    if (!data) return [];
    return JSON.parse(data);
  } catch {
    return [];
  }
};

export const addCustomerInquiry = (inquiry: Omit<CustomerInquiry, 'id' | 'createdAt' | 'status'>): CustomerInquiry => {
  const current = getCustomerInquiries();
  const newInquiry: CustomerInquiry = {
    ...inquiry,
    id: `inq-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    status: 'new',
    createdAt: new Date().toISOString(),
  };
  const updated = [newInquiry, ...current];
  localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
  window.dispatchEvent(new Event('shai_inquiries_updated'));
  return newInquiry;
};

export const updateInquiryStatus = (id: string, status: CustomerInquiry['status']) => {
  const current = getCustomerInquiries();
  const updated = current.map((item) => (item.id === id ? { ...item, status } : item));
  localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
  window.dispatchEvent(new Event('shai_inquiries_updated'));
};

export const deleteInquiry = (id: string) => {
  const current = getCustomerInquiries();
  const updated = current.filter((item) => item.id !== id);
  localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
  window.dispatchEvent(new Event('shai_inquiries_updated'));
};

export const resetToPdfDefaults = () => {
  saveMenuItems(INITIAL_MENU_ITEMS);
  saveBusinessSettings(INITIAL_BUSINESS_SETTINGS);
  saveSpecialOffers(INITIAL_OFFERS);
  saveGalleryItems(INITIAL_GALLERY);
};

export const getAdminAuth = (): boolean => {
  return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'authenticated';
};

export const setAdminAuth = (auth: boolean) => {
  if (auth) {
    localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'authenticated');
  } else {
    localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
  }
  window.dispatchEvent(new Event('shai_auth_updated'));
};
