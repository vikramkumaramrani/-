import React, { createContext, useContext, useState, useEffect } from 'react';
import { InquiryItem, MenuItem } from '../types';
import { addCustomerInquiry } from '../lib/storage';

interface CartContextType {
  items: InquiryItem[];
  addToCart: (item: MenuItem, option?: string, customPrice?: number) => void;
  removeFromCart: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  clearCart: () => void;
  totalAmount: number;
  totalCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  submitInquiry: (name: string, phone: string, notes: string) => Promise<boolean>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<InquiryItem[]>(() => {
    try {
      const saved = localStorage.getItem('shai_cart_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('shai_cart_items', JSON.stringify(items));
    } catch (e) {
      console.error(e);
    }
  }, [items]);

  const addToCart = (menuItem: MenuItem, option?: string, customPrice?: number) => {
    const finalPrice = customPrice !== undefined ? customPrice : menuItem.price;
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.id === menuItem.id && i.selectedOption === option
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += 1;
        return next;
      }
      return [
        ...prev,
        {
          id: menuItem.id,
          nameAr: menuItem.nameAr,
          nameEn: menuItem.nameEn,
          price: finalPrice,
          quantity: 1,
          selectedOption: option,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const updateQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(index);
      return;
    }
    setItems((prev) => {
      const next = [...prev];
      next[index].quantity = quantity;
      return next;
    });
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const submitInquiry = async (name: string, phone: string, notes: string): Promise<boolean> => {
    try {
      addCustomerInquiry({
        customerName: name,
        phoneNumber: phone,
        orderType: 'takeaway',
        items,
        notes,
        totalAmount,
      });
      clearCart();
      return true;
    } catch (e) {
      console.error('Failed to submit inquiry', e);
      return false;
    }
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalAmount,
        totalCount,
        isCartOpen,
        setIsCartOpen,
        submitInquiry,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
