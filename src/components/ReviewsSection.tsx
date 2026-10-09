import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { INITIAL_REVIEWS } from '../data/initialData';
import { Star, MessageSquare, ExternalLink, ShieldCheck } from 'lucide-react';

interface ReviewsSectionProps {
  googleMapsUrl: string;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ googleMapsUrl }) => {
  const { language, t } = useLanguage();

  return (
    <section className="py-20 bg-gradient-to-b from-[#17110e] via-[#2a1d18]/40 to-[#17110e] border-t border-[#e8d5b7]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2a1d18] border border-[#f4b65f]/30 text-[#f4b65f] text-xs font-semibold mb-3">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{t('reviews_kicker')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#fff7eb] tracking-tight">
              {t('reviews_title')}
            </h2>
            <p className="text-sm text-[#e8d5b7]/70 mt-2 max-w-xl">
              {t('reviews_honest_note')}
            </p>
          </div>

          {/* Rating Summary Card */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#2a1d18] border border-[#f4b65f]/30 shadow-xl self-start lg:self-auto">
            <div className="text-3xl sm:text-4xl font-black text-[#f4b65f] tabular-nums">
              4.2
            </div>
            <div className="border-r rtl:border-r-0 rtl:border-l border-[#e8d5b7]/10 pr-4 rtl:pr-0 rtl:pl-4">
              <div className="flex items-center gap-1 text-[#f4b65f] mb-1">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#f4b65f]" />
                ))}
                <Star className="w-4 h-4 fill-[#f4b65f]/30 text-[#f4b65f]" />
              </div>
              <span className="text-xs text-[#e8d5b7]/80 font-medium block">
                {t('reviews_count')}
              </span>
            </div>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-[#17110e] text-[#f4b65f] hover:text-white transition-colors"
              title="Google Maps Reviews"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {INITIAL_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="rounded-2xl bg-[#2a1d18] border border-[#e8d5b7]/10 p-6 flex flex-col justify-between shadow-lg hover:border-[#f4b65f]/40 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#f4b65f] text-[#f4b65f]" />
                    ))}
                    {[...Array(5 - rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-[#e8d5b7]/20" />
                    ))}
                  </div>
                  <span className="text-[11px] text-[#e8d5b7]/40">{rev.date}</span>
                </div>

                <div className="inline-block px-2.5 py-0.5 rounded bg-[#17110e] text-[#f4b65f] text-[11px] font-semibold mb-3">
                  {language === 'ar' ? rev.highlightAr : rev.highlightEn}
                </div>

                <p className="text-xs sm:text-sm text-[#e8d5b7]/85 leading-relaxed mb-6 italic">
                  "{language === 'ar' ? rev.textAr : rev.textEn}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#e8d5b7]/10 flex items-center justify-between">
                <span className="text-xs font-bold text-[#fff7eb]">{rev.author}</span>
                <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400">
                  <ShieldCheck className="w-3 h-3" />
                  <span>{language === 'ar' ? 'زيارة موثقة' : 'Verified'}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
