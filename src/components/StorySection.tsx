import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Coffee, Flame, Moon, ArrowRight, ArrowLeft } from 'lucide-react';

interface StorySectionProps {
  onExploreMenu: () => void;
  onGetDirections: () => void;
}

export const StorySection: React.FC<StorySectionProps> = ({
  onExploreMenu,
  onGetDirections,
}) => {
  const { language, t, isRtl } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section className="py-24 bg-gradient-to-b from-[#17110e] via-[#2a1d18]/60 to-[#17110e] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Column */}
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2a1d18] border border-[#f4b65f]/30 text-[#f4b65f] text-xs font-semibold mb-3">
              <span>{t('story_kicker')}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#fff7eb] tracking-tight leading-tight mb-6">
              {t('story_title')}
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#e8d5b7]/80 leading-relaxed mb-8">
              <p>{t('story_p1')}</p>
              <p>{t('story_p2')}</p>
            </div>

            {/* 3 Value Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              <div className="p-4 rounded-xl bg-[#17110e]/70 border border-[#e8d5b7]/10">
                <Coffee className="w-5 h-5 text-[#f4b65f] mb-2" />
                <h4 className="text-sm font-bold text-[#fff7eb] mb-1">
                  {t('story_feature1_title')}
                </h4>
                <p className="text-xs text-[#e8d5b7]/60 leading-normal">
                  {t('story_feature1_desc')}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#17110e]/70 border border-[#e8d5b7]/10">
                <Flame className="w-5 h-5 text-[#c8753d] mb-2" />
                <h4 className="text-sm font-bold text-[#fff7eb] mb-1">
                  {t('story_feature2_title')}
                </h4>
                <p className="text-xs text-[#e8d5b7]/60 leading-normal">
                  {t('story_feature2_desc')}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#17110e]/70 border border-[#e8d5b7]/10">
                <Moon className="w-5 h-5 text-[#f4b65f] mb-2" />
                <h4 className="text-sm font-bold text-[#fff7eb] mb-1">
                  {t('story_feature3_title')}
                </h4>
                <p className="text-xs text-[#e8d5b7]/60 leading-normal">
                  {t('story_feature3_desc')}
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreMenu}
                className="px-6 py-3 rounded-xl brand-gradient text-white text-sm font-bold shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>{t('hero_cta_menu')}</span>
                <ArrowIcon className="w-4 h-4" />
              </button>
              <button
                onClick={onGetDirections}
                className="px-6 py-3 rounded-xl bg-[#2a1d18] border border-[#e8d5b7]/20 hover:border-[#f4b65f] text-[#fff7eb] text-sm font-semibold transition-all cursor-pointer"
              >
                {t('hero_cta_directions')}
              </button>
            </div>
          </div>

          {/* Image Composition Column */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden aspect-4/3 shadow-2xl border border-[#e8d5b7]/15">
              <img
                src="/traditional_karak_tea_1791522225854.jpg"
                alt="Traditional Tea at Shai M5m5a"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/neon_garden_cafe.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="text-xs text-[#f4b65f] font-semibold block mb-1">
                  {language === 'ar' ? 'أصالة النكهة في دبي' : 'Authentic Flavor in Dubai'}
                </span>
                <span className="text-base font-bold">
                  {language === 'ar' ? 'جلسات شاي مخمخة المسائية في الوصل' : 'Evening Tea Sessions in Al Wasl'}
                </span>
              </div>
            </div>

            {/* Overlapping Secondary Card */}
            <div className="hidden sm:block absolute -bottom-8 -left-8 rtl:-left-auto rtl:-right-8 w-60 rounded-2xl overflow-hidden aspect-4/3 shadow-2xl border-2 border-[#17110e]">
              <img
                src="/emirati_meshaltet_regag_1791522239739.jpg"
                alt="Meshaltet and Regag Freshly Made"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/neon_garden_cafe.jpg';
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
