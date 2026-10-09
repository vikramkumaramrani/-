import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { GalleryItem } from '../types';
import { Camera, X, ZoomIn } from 'lucide-react';

interface GallerySectionProps {
  items: GalleryItem[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ items }) => {
  const { language, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxImage, setLightboxImage] = useState<GalleryItem | null>(null);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightboxImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxImage]);

  const categories = [
    { id: 'all', label: t('gallery_all') },
    { id: 'tea', label: t('gallery_tea') },
    { id: 'food', label: t('gallery_food') },
    { id: 'desserts', label: t('gallery_desserts') },
    { id: 'atmosphere', label: t('gallery_atmosphere') },
  ];

  const filteredItems = items.filter(
    (item) => activeCategory === 'all' || item.category === activeCategory
  );

  return (
    <section className="py-20 bg-[#17110e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2a1d18] border border-[#f4b65f]/30 text-[#f4b65f] text-xs font-semibold mb-3">
            <Camera className="w-3.5 h-3.5" />
            <span>{t('gallery_kicker')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#fff7eb] tracking-tight mb-3">
            {t('gallery_title')}
          </h2>
          <p className="text-xs sm:text-sm text-[#e8d5b7]/70">
            {language === 'ar'
              ? 'لقطات حية من أطباقنا وأجوائنا المميزة في شارع الوصل، دبي.'
              : 'Live glimpses of our signature dishes and ambiance in Al Wasl, Dubai.'}
          </p>
        </div>

        {/* Gallery Filter Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap min-h-[40px] ${
                activeCategory === cat.id
                  ? 'brand-gradient text-white shadow-md'
                  : 'bg-[#2a1d18] text-[#e8d5b7]/70 hover:text-white border border-[#e8d5b7]/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setLightboxImage(item)}
              className="group relative aspect-4/3 rounded-2xl overflow-hidden bg-[#2a1d18] border border-[#e8d5b7]/10 hover:border-[#f4b65f]/50 cursor-pointer shadow-lg transition-all"
            >
              <img
                src={item.imageUrl}
                alt={language === 'ar' ? item.titleAr : item.titleEn}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/neon_garden_cafe.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3.5 sm:p-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-[#fff7eb] truncate">
                    {language === 'ar' ? item.titleAr : item.titleEn}
                  </span>
                  <ZoomIn className="w-4 h-4 text-[#f4b65f] shrink-0" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal (Fully Responsive) */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/90 backdrop-blur-md animate-fadeIn"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[92dvh] flex flex-col rounded-2xl overflow-hidden border border-[#f4b65f]/30 bg-[#17110e] shadow-2xl animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Button */}
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-3 right-3 rtl:right-auto rtl:left-3 z-20 w-10 h-10 rounded-full bg-black/80 hover:bg-black text-white flex items-center justify-center shadow-lg transition-colors cursor-pointer min-w-[40px] min-h-[40px]"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Responsive Image Container */}
            <div className="flex-1 flex items-center justify-center overflow-hidden bg-black p-2 min-h-0">
              <img
                src={lightboxImage.imageUrl}
                alt={language === 'ar' ? lightboxImage.titleAr : lightboxImage.titleEn}
                className="max-h-[72dvh] max-w-full w-auto object-contain rounded-lg"
              />
            </div>

            {/* Caption */}
            <div className="p-3.5 sm:p-4 bg-[#2a1d18] border-t border-[#e8d5b7]/10 text-center shrink-0">
              <h3 className="text-xs sm:text-sm font-bold text-[#fff7eb]">
                {language === 'ar' ? lightboxImage.titleAr : lightboxImage.titleEn}
              </h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
