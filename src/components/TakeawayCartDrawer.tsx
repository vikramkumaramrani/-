import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { BusinessSettings } from '../types';
import { X, Trash2, Plus, Minus, Phone, CheckCircle, ShoppingBag, Clock } from 'lucide-react';

interface TakeawayCartDrawerProps {
  settings: BusinessSettings;
}

export const TakeawayCartDrawer: React.FC<TakeawayCartDrawerProps> = ({ settings }) => {
  const { language, t } = useLanguage();
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    totalAmount,
    totalCount,
    submitInquiry,
  } = useCart();

  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Lock body scroll when cart drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!customerName.trim()) {
      setErrorMsg(language === 'ar' ? 'يرجى كتابة الاسم' : 'Please enter your name');
      return;
    }
    if (!phoneNumber.trim()) {
      setErrorMsg(language === 'ar' ? 'يرجى إدخال رقم الهاتف للتواصل' : 'Please enter your phone number');
      return;
    }

    setIsSubmitting(true);
    const ok = await submitInquiry(customerName, phoneNumber, notes);
    setIsSubmitting(false);

    if (ok) {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setIsCartOpen(false);
        setCustomerName('');
        setPhoneNumber('');
        setNotes('');
      }, 3500);
    } else {
      setErrorMsg(language === 'ar' ? 'حدث خطأ أثناء الإرسال. يرجى الاتصال بنا مباشرة.' : 'Submission error. Please call us directly.');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm animate-fadeIn"
      onClick={() => setIsCartOpen(false)}
    >
      <div
        className="w-full sm:max-w-md h-full bg-[#17110e] border-l rtl:border-l-0 rtl:border-r border-[#e8d5b7]/15 flex flex-col justify-between shadow-2xl animate-slideLeft overflow-hidden"
        style={{ height: '100dvh' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#e8d5b7]/10 flex items-center justify-between bg-[#2a1d18] shrink-0">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#f4b65f]" />
            <h2 className="text-sm sm:text-base font-bold text-[#fff7eb]">
              {t('inquiry_drawer_title')}
            </h2>
            <span className="text-xs text-[#e8d5b7]/60 font-mono">({totalCount})</span>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-lg text-[#e8d5b7]/60 hover:text-white hover:bg-[#17110e] transition-colors cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
          {isSuccess ? (
            <div className="py-12 text-center">
              <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#fff7eb] mb-2">
                {t('inquiry_success_title')}
              </h3>
              <p className="text-xs sm:text-sm text-[#e8d5b7]/80 leading-relaxed max-w-xs mx-auto mb-6">
                {t('inquiry_success_desc')}
              </p>
              <a
                href={`tel:${settings.phone}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl brand-gradient text-white text-xs sm:text-sm font-bold shadow-md min-h-[44px]"
              >
                <Phone className="w-4 h-4" />
                <span>{t('inquiry_direct_call')}</span>
              </a>
            </div>
          ) : items.length === 0 ? (
            <div className="py-16 text-center text-[#e8d5b7]/60 space-y-4">
              <ShoppingBag className="w-12 h-12 mx-auto text-[#e8d5b7]/30" />
              <p className="text-xs sm:text-sm max-w-xs mx-auto leading-relaxed">
                {t('inquiry_drawer_empty')}
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-[#2a1d18] border border-[#e8d5b7]/20 text-[#f4b65f] text-xs font-bold cursor-pointer min-h-[44px]"
              >
                {t('nav_cta_menu')}
              </button>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-[#f4b65f] uppercase tracking-wider block">
                  {language === 'ar' ? 'الأصناف المختارة للطلب' : 'Selected Items for Takeaway'}
                </span>

                {items.map((item, index) => (
                  <div
                    key={`${item.id}-${index}`}
                    className="p-3 sm:p-3.5 rounded-xl bg-[#2a1d18] border border-[#e8d5b7]/10 flex items-center justify-between gap-2.5"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-[#fff7eb] truncate">
                        {language === 'ar' ? item.nameAr : item.nameEn}
                      </h4>
                      {item.selectedOption && (
                        <span className="text-[11px] text-[#f4b65f] block truncate">
                          {item.selectedOption}
                        </span>
                      )}
                      <span className="text-xs text-[#e8d5b7]/70 font-mono tabular-nums">
                        {item.price} {t('inquiry_currency')}
                      </span>
                    </div>

                    {/* Stepper with comfortable touch targets */}
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="flex items-center bg-[#17110e] rounded-lg border border-[#e8d5b7]/15 p-0.5">
                        <button
                          type="button"
                          onClick={() => updateQuantity(index, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-[#e8d5b7]/70 hover:text-white cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-1.5 text-xs font-bold tabular-nums text-[#fff7eb]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(index, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-[#e8d5b7]/70 hover:text-white cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(index)}
                        className="p-2 text-red-400/70 hover:text-red-400 cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center"
                        title="Remove item"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Inquiry Form */}
              <form onSubmit={handleSubmit} className="space-y-3 pt-3 border-t border-[#e8d5b7]/10">
                <span className="text-xs font-bold text-[#f4b65f] uppercase tracking-wider block">
                  {language === 'ar' ? 'معلومات التواصل والاستلام' : 'Customer & Contact Details'}
                </span>

                <div>
                  <label className="block text-[11px] sm:text-xs font-medium text-[#e8d5b7]/80 mb-1">
                    {t('inquiry_name')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder={language === 'ar' ? 'مثال: محمد الشامسي' : 'e.g. Mohammed'}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#2a1d18] border border-[#e8d5b7]/20 text-[#fff7eb] text-xs sm:text-sm focus:outline-none focus:border-[#f4b65f] min-h-[42px]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs font-medium text-[#e8d5b7]/80 mb-1">
                    {t('inquiry_phone')} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+971 50 123 4567"
                    dir="ltr"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#2a1d18] border border-[#e8d5b7]/20 text-[#fff7eb] text-xs sm:text-sm focus:outline-none focus:border-[#f4b65f] min-h-[42px]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs font-medium text-[#e8d5b7]/80 mb-1">
                    {t('inquiry_notes')}
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={language === 'ar' ? 'مثال: تجهيز خلال 20 دقيقة، شاي كرك سكر خفيف...' : 'e.g. Pickup in 20 mins, light sugar for Karak...'}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#2a1d18] border border-[#e8d5b7]/20 text-[#fff7eb] text-xs sm:text-sm focus:outline-none focus:border-[#f4b65f]"
                  />
                </div>

                {errorMsg && (
                  <p className="text-xs text-red-400 bg-red-950/40 p-2.5 rounded-lg border border-red-500/30">
                    {errorMsg}
                  </p>
                )}

                <div className="pt-1 text-[11px] text-[#e8d5b7]/60 leading-normal bg-[#17110e]/60 p-2.5 rounded-xl border border-[#e8d5b7]/10 flex items-start gap-2">
                  <Clock className="w-4 h-4 text-[#f4b65f] shrink-0 mt-0.5" />
                  <span>
                    {language === 'ar'
                      ? 'الطلب عبر الموقع هو استفسار وتجهيز مسبق للاستلام من المقهى. يتم الدفع عند الاستلام.'
                      : 'This is a takeaway preparation request for pickup at our Al Wasl kiosk. Payment upon pickup.'}
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl brand-gradient text-white text-xs sm:text-sm font-bold shadow-xl hover:brightness-110 active:scale-95 transition-all cursor-pointer disabled:opacity-50 min-h-[46px]"
                >
                  {isSubmitting ? t('inquiry_submitting') : t('inquiry_submit')}
                </button>
              </form>
            </>
          )}
        </div>

        {/* Footer Summary */}
        {!isSuccess && items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-[#e8d5b7]/15 bg-[#2a1d18] shrink-0">
            <div className="flex items-center justify-between mb-2.5 text-xs sm:text-sm">
              <span className="text-[#e8d5b7]/80">{t('inquiry_total')}</span>
              <div className="text-right rtl:text-left">
                <span className="text-lg sm:text-xl font-extrabold text-[#f4b65f] tabular-nums">
                  {totalAmount}
                </span>
                <span className="text-xs text-[#e8d5b7]/70 mr-1 rtl:mr-0 rtl:ml-1">
                  {t('inquiry_currency')}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#e8d5b7]/60">
              <span>{language === 'ar' ? 'تفضل بالاتصال المباشر:' : 'Direct Phone Ordering:'}</span>
              <a
                href={`tel:${settings.phone}`}
                className="text-[#f4b65f] font-semibold hover:underline"
                dir="ltr"
              >
                {settings.phoneDisplay}
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
