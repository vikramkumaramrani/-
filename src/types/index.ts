export type Language = 'ar' | 'en';

export interface MenuItem {
  id: string;
  nameAr: string;
  nameEn: string;
  descriptionAr?: string;
  descriptionEn?: string;
  categoryId: string;
  price: number;
  priceTakeaway?: number;
  priceGlass?: number;
  priceSmall?: number;
  priceLarge?: number;
  currency: string;
  imageUrl: string;
  isAvailable: boolean;
  isFeatured: boolean;
  isLimitedTime?: boolean;
  isPublished: boolean;
  extraAddonPrice?: number;
  createdAt: string;
  updatedAt: string;
}

export interface MenuCategory {
  id: string;
  nameAr: string;
  nameEn: string;
  iconName: string;
  sortOrder: number;
}

export interface SpecialOffer {
  id: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  tagAr: string;
  tagEn: string;
  imageUrl?: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface InquiryItem {
  id: string;
  nameAr: string;
  nameEn: string;
  price: number;
  quantity: number;
  selectedOption?: string;
}

export interface CustomerInquiry {
  id: string;
  customerName: string;
  phoneNumber: string;
  orderType: 'takeaway' | 'dinein' | 'inquiry';
  items: InquiryItem[];
  notes?: string;
  totalAmount: number;
  status: 'new' | 'contacted' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface BusinessSettings {
  nameAr: string;
  nameEn: string;
  taglineAr: string;
  taglineEn: string;
  phone: string;
  phoneDisplay: string;
  addressAr: string;
  addressEn: string;
  plusCode: string;
  hoursAr: string;
  hoursEn: string;
  detailedHoursAr: string;
  detailedHoursEn: string;
  priceRange: string;
  googleMapsUrl: string;
  heroHeadlineAr: string;
  heroHeadlineEn: string;
  heroSubtitleAr: string;
  heroSubtitleEn: string;
  announcementAr?: string;
  announcementEn?: string;
  showAnnouncement?: boolean;
}

export interface GalleryItem {
  id: string;
  titleAr: string;
  titleEn: string;
  category: 'tea' | 'food' | 'desserts' | 'atmosphere';
  imageUrl: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  textAr: string;
  textEn: string;
  highlightAr: string;
  highlightEn: string;
  verifiedVisit: boolean;
}
