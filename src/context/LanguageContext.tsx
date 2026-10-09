import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRtl: boolean;
}

const translations: Record<Language, Record<string, string>> = {
  ar: {
    // Navigation
    nav_home: 'الرئيسية',
    nav_menu: 'قائمة الطعام',
    nav_story: 'قصتنا',
    nav_gallery: 'الصور',
    nav_reviews: 'آراء الزوار',
    nav_location: 'الموقع والاتصال',
    nav_offers: 'العروض',
    nav_admin: 'لوحة التحكم',
    nav_cta_menu: 'استعرض القائمة',
    nav_call: 'اتصل بنا',
    nav_takeaway: 'طلب سفري',

    // Hero Section
    hero_badge: 'مقهى تقليدي بروح دبي العصرية',
    hero_headline: 'شاي مخمخة — طعم يستحق العودة إليه',
    hero_subheadline: 'اكتشف الشاي الدافئ، والمأكولات التراثية الشهية، وأجواء المقهى المريحة في قلب الوصل، دبي.',
    hero_cta_menu: 'استكشف القائمة',
    hero_cta_directions: 'اتجاهات السير',
    hero_open_badge: 'مفتوح الآن',
    hero_hours_label: 'يومياً حتى 3:00 فجراً',
    hero_location_label: 'شارع الوصل، دبي',
    hero_price_label: 'درهم 1–50 للشخص',

    // Featured
    featured_kicker: 'مختارات مميزة',
    featured_title: 'أشهى ما نقدمه في مخمخة',
    featured_subtitle: 'أطباق ومشروبات تراثية تعد طازجة يومياً بكل إتقان وعناية.',
    featured_view_all: 'عرض القائمة الكاملة',

    // Menu
    menu_kicker: 'القائمة الرقمية الحصرية',
    menu_title: 'قائمة المأكولات والمشروبات',
    menu_subtitle: 'جميع الأصناف والأسعار مستخرجة بدقة من قائمة شاي مخمخة المعتمدة بالدرهم الإماراتي.',
    menu_search_placeholder: 'ابحث عن صنف أو مشروب (كرك، مشلتت، رقاق، لقيمات...)',
    menu_all: 'الكل',
    menu_empty_title: 'لم يتم العثور على نتائج',
    menu_empty_desc: 'جرّب البحث بكلمة مختلفة أو اختر تصنيفاً آخر من القائمة أعلاه.',
    menu_reset_filter: 'إعادة ضبط التصنيف',
    menu_add_inquiry: 'إضافة للطلب',
    menu_added: 'تمت الإضافة',
    menu_takeaway: 'سفري',
    menu_glass: 'استكانة / كلاس',
    menu_small: 'صغير',
    menu_large: 'كبير',
    menu_addon_extra: 'إضافة إضافية',
    menu_limited_time: 'لفترة محدودة فقط',
    menu_unavailable: 'غير متوفر حالياً',
    menu_download_pdf: 'تحميل كتيّب القائمة',

    // Story
    story_kicker: 'حكايتنا في دبي',
    story_title: 'أصالة الشاي ودفء الجلسة',
    story_p1: 'في قلب منطقة الوصل النابضة بالحياة في دبي، يقف شاي مخمخة كوجهة مفضلة لعشاق الشاي المهيّل والمأكولات الشعبية الطازجة التي تعيد ذكريات الزمن الجميل.',
    story_p2: 'نؤمن أن كوب الشاي ليس مجرد مشروب، بل هو لحظة تواصل وتلاقي تحت أضواء دبي الساحرة. من الفطير المشلتت الساخن والمورق، إلى خبز الرقاق المقرمش بجبس عمان، واللقيمات المغمسة بالدبس، نصنع كل طلب بأعلى درجات الطزاجة والشغف.',
    story_feature1_title: 'شاي مخدر على أصوله',
    story_feature1_desc: 'شاي كرك، سليماني، عراقي وخلطة مخمخة المحضرة بتوابل الهيل والزعفران.',
    story_feature2_title: 'مخبوزات طازجة فورية',
    story_feature2_desc: 'فطير مشلتت وخبز رقاق يحضر مباشرة أمامك على الصاج الساخن.',
    story_feature3_title: 'جلسات ليلية مريحة',
    story_feature3_desc: 'أجواء في الهواء الطلق مفتوحة يومياً حتى 3:00 فجراً للقاء الأحبة.',

    // Gallery
    gallery_kicker: 'معرض الصور',
    gallery_title: 'أجواء وأطباق شاي مخمخة',
    gallery_all: 'جميع الصور',
    gallery_tea: 'الشاي والقهوة',
    gallery_food: 'المأكولات والمخبوزات',
    gallery_desserts: 'الحلويات',
    gallery_atmosphere: 'أجواء المقهى',

    // Reviews
    reviews_kicker: 'ثقة زوارنا',
    reviews_title: 'تجارب وآراء حقيقية',
    reviews_rating_score: '4.2',
    reviews_out_of: 'من 5 نجوم',
    reviews_count: 'بناءً على أكثر من 100 تقييم عبر خرائط جوجل',
    reviews_honest_note: 'نعرض آراء زوارنا بكل شفافية واعتزاز بجودة أطباقنا ومشروباتنا.',

    // Offers
    offers_kicker: 'عروض حصرية',
    offers_title: 'عروض وبوكسات مخمخة',

    // Takeaway & Inquiry
    inquiry_drawer_title: 'طلب سفري واستفسار',
    inquiry_drawer_empty: 'سلة الطلب فارغة حالياً. اختر أصنافاً من القائمة لإرسال استفسار أو طلب سفري.',
    inquiry_name: 'الاسم الكريم',
    inquiry_phone: 'رقم الهاتف (واتساب / اتصال)',
    inquiry_notes: 'ملاحظات إضافية أو وقت الاستلام المفضل',
    inquiry_submit: 'إرسال طلب الاستفسار',
    inquiry_submitting: 'جارٍ إرسال الطلب...',
    inquiry_success_title: 'تم استلام طلبك بنجاح!',
    inquiry_success_desc: 'شكراً لك! سيتواصل معك فريق شاي مخمخة لتأكيد وتجهيز طلبك.',
    inquiry_direct_call: 'أو اتصل مباشرة لتأكيد فوري',
    inquiry_total: 'المجموع التقديري',
    inquiry_currency: 'درهم إماراتي',
    inquiry_items_count: 'عنصر في السلة',

    // Location & Contact
    location_kicker: 'تفضل بزيارتنا',
    location_title: 'الموقع وساعات العمل',
    location_address_label: 'العنوان الرسمي',
    location_hours_label: 'ساعات العمل الرسمية',
    location_phone_label: 'رقم الهاتف',
    location_get_directions: 'افتح في خرائط جوجل',
    location_call_now: 'اتصال مباشر',

    // Footer
    footer_desc: 'مقهى شاي مخمخة في منطقة الوصل، دبي. نقدم أشهى أنواع الشاي والكرك، الفطير المشلتت، الرقاق، واللقيمات الطازجة.',
    footer_quick_links: 'روابط سريعة',
    footer_hours: 'أوقات العمل',
    footer_rights: 'جميع الحقوق محفوظة © شاي مخمخة',
    footer_alwasl: 'الوصل، دبي، الإمارات العربية المتحدة',

    // Admin
    admin_title: 'لوحة إدارة شاي مخمخة',
    admin_subtitle: 'إدارة وتحديث قائمة الطعام، الأسعار، العروض، ومعاينة طلبات السفري.',
    admin_login_title: 'تسجيل دخول الإدارة',
    admin_login_desc: 'الوصول مقصور على طاقم عمل وإدارة مقهى شاي مخمخة.',
    admin_password_label: 'كلمة المرور',
    admin_login_btn: 'دخول اللوحة',
    admin_logout_btn: 'تسجيل الخروج',
    admin_tab_menu: 'قائمة الطعام',
    admin_tab_inquiries: 'طلبات السفري',
    admin_tab_settings: 'بيانات المحل',
    admin_tab_offers: 'العروض الترويجية',
    admin_tab_gallery: 'معرض الصور',
    admin_add_item: 'إضافة صنف جديد',
    admin_save: 'حفظ التعديلات',
    admin_cancel: 'إلغاء',
    admin_delete: 'حذف',
    admin_edit: 'تعديل',
    admin_reset_pdf: 'استعادة بيانات القائمة الأصلية من الـ PDF',
    admin_reset_confirm: 'هل أنت متأكد من استعادة كافة بيانات الـ PDF الأصلية؟',
  },
  en: {
    // Navigation
    nav_home: 'Home',
    nav_menu: 'Menu',
    nav_story: 'Our Story',
    nav_gallery: 'Gallery',
    nav_reviews: 'Reviews',
    nav_location: 'Location & Contact',
    nav_offers: 'Offers',
    nav_admin: 'Admin',
    nav_cta_menu: 'View Menu',
    nav_call: 'Call Us',
    nav_takeaway: 'Takeaway Order',

    // Hero Section
    hero_badge: 'Traditional Tea & Modern Dubai Vibes',
    hero_headline: 'Shai M5m5a — A Taste Worth Coming Back For',
    hero_subheadline: 'Discover comforting tea, delicious traditional bites, and a welcoming café experience in the heart of Al Wasl, Dubai.',
    hero_cta_menu: 'Explore Our Menu',
    hero_cta_directions: 'Get Directions',
    hero_open_badge: 'Open Now',
    hero_hours_label: 'Daily until 3:00 AM',
    hero_location_label: 'Al Wasl Road, Dubai',
    hero_price_label: 'AED 1–50 per person',

    // Featured
    featured_kicker: 'Signature Highlights',
    featured_title: 'Featured Favorites at M5m5a',
    featured_subtitle: 'Handcrafted Emirati and regional bites prepared fresh daily with authentic spices.',
    featured_view_all: 'Explore Full Menu',

    // Menu
    menu_kicker: 'Exclusive Digital Menu',
    menu_title: 'Food & Drinks Menu',
    menu_subtitle: 'All items and prices extracted accurately from the official Shai M5m5a menu in UAE Dirhams (AED).',
    menu_search_placeholder: 'Search items or drinks (Karak, Meshaltet, Regag, Luqaimat...)',
    menu_all: 'All',
    menu_empty_title: 'No items match your search',
    menu_empty_desc: 'Try searching with a different term or select another category above.',
    menu_reset_filter: 'Reset Filters',
    menu_add_inquiry: 'Add to Order',
    menu_added: 'Added',
    menu_takeaway: 'Takeaway',
    menu_glass: 'Glass Cup',
    menu_small: 'Small',
    menu_large: 'Large',
    menu_addon_extra: 'Extra Add-on',
    menu_limited_time: 'Limited Time Only',
    menu_unavailable: 'Currently Unavailable',
    menu_download_pdf: 'Download Menu PDF Reference',

    // Story
    story_kicker: 'Our Story in Dubai',
    story_title: 'Authentic Tea & Warm Hospitality',
    story_p1: 'Nestled in the vibrant heart of Al Wasl, Dubai, Shai M5m5a is the premier destination for aromatic spiced teas and freshly baked heritage street food that rekindle fond memories.',
    story_p2: 'We believe a cup of tea is more than a beverage—it is a cherished moment of connection under Dubai’s evening city lights. From hot flaky Meshaltet and crunchy Regag with Chips Oman to golden Luqaimat drizzled with rich date syrup, every dish is crafted with utmost passion and freshness.',
    story_feature1_title: 'Masterfully Brewed Tea',
    story_feature1_desc: 'Karak, Sulaimani, Iraqi, and our signature M5m5a blend infused with cardamom and saffron.',
    story_feature2_title: 'Baked Fresh to Order',
    story_feature2_desc: 'Layered Meshaltet and crispy Regag flatbread prepared hot right off the iron griddle.',
    story_feature3_title: 'Relaxing Evening Ambiance',
    story_feature3_desc: 'Pleasant open-air café garden open daily until 3:00 AM for memorable late-night conversations.',

    // Gallery
    gallery_kicker: 'Visual Journey',
    gallery_title: 'Atmosphere & Dishes',
    gallery_all: 'All Photos',
    gallery_tea: 'Tea & Coffee',
    gallery_food: 'Breads & Savories',
    gallery_desserts: 'Desserts & Sweets',
    gallery_atmosphere: 'Café Atmosphere',

    // Reviews
    reviews_kicker: 'Guest Impressions',
    reviews_title: 'Honest Guest Reviews',
    reviews_rating_score: '4.2',
    reviews_out_of: 'out of 5.0',
    reviews_count: 'Based on 100+ public reviews on Google Maps',
    reviews_honest_note: 'Transparent, unedited customer feedback reflecting our authentic quality and warm hospitality.',

    // Offers
    offers_kicker: 'Special Deals',
    offers_title: 'Promotions & Seasonal Combos',

    // Takeaway & Inquiry
    inquiry_drawer_title: 'Takeaway Inquiry & Order',
    inquiry_drawer_empty: 'Your order bag is empty. Pick items from the menu to send an inquiry or takeaway request.',
    inquiry_name: 'Your Name',
    inquiry_phone: 'Phone Number (Mobile / WhatsApp)',
    inquiry_notes: 'Special requests or preferred pickup time',
    inquiry_submit: 'Submit Takeaway Inquiry',
    inquiry_submitting: 'Submitting...',
    inquiry_success_title: 'Inquiry Sent Successfully!',
    inquiry_success_desc: 'Thank you! The Shai M5m5a team will contact you shortly to confirm and prepare your order.',
    inquiry_direct_call: 'Or call directly for immediate confirmation',
    inquiry_total: 'Estimated Total',
    inquiry_currency: 'AED',
    inquiry_items_count: 'items in bag',

    // Location & Contact
    location_kicker: 'Visit Us in Dubai',
    location_title: 'Location & Operating Hours',
    location_address_label: 'Official Address',
    location_hours_label: 'Opening Hours',
    location_phone_label: 'Telephone Number',
    location_get_directions: 'Open in Google Maps',
    location_call_now: 'Call Now',

    // Footer
    footer_desc: 'Shai M5m5a coffee & tea shop in Al Wasl, Dubai. Serving authentic Karak tea, freshly baked Meshaltet, crispy Regag, and traditional Luqaimat.',
    footer_quick_links: 'Quick Links',
    footer_hours: 'Working Hours',
    footer_rights: 'All rights reserved © Shai M5m5a',
    footer_alwasl: 'Al Wasl, Dubai, United Arab Emirates',

    // Admin
    admin_title: 'Shai M5m5a Management Dashboard',
    admin_subtitle: 'Manage menu items, prices, business details, special promotions, and customer inquiries.',
    admin_login_title: 'Admin Sign In',
    admin_login_desc: 'Authorized access for Shai M5m5a staff and management.',
    admin_password_label: 'Password',
    admin_login_btn: 'Sign In',
    admin_logout_btn: 'Sign Out',
    admin_tab_menu: 'Menu Items',
    admin_tab_inquiries: 'Takeaway Inquiries',
    admin_tab_settings: 'Business Info',
    admin_tab_offers: 'Promotions',
    admin_tab_gallery: 'Gallery',
    admin_add_item: 'Add Menu Item',
    admin_save: 'Save Changes',
    admin_cancel: 'Cancel',
    admin_delete: 'Delete',
    admin_edit: 'Edit',
    admin_reset_pdf: 'Restore Verified PDF Menu Defaults',
    admin_reset_confirm: 'Are you sure you want to restore all original menu items from the PDF?',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('shai_language');
    return (saved === 'en' || saved === 'ar') ? saved : 'ar';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('shai_language', lang);
  };

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const isRtl = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRtl }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
