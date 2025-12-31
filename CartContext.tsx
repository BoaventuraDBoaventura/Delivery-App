
import React, { createContext, useContext, useState, useMemo } from 'react';
import { CartItem, Dish } from './types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (dish: Dish, quantity: number, notes?: string, fulfillmentMethod?: 'delivery' | 'pickup') => void;
  removeFromCart: (uniqueId: string) => void;
  updateQuantity: (uniqueId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<(CartItem & { uniqueKey: string })[]>([]);

  const addToCart = (dish: Dish, quantity: number, notes?: string, fulfillmentMethod: 'delivery' | 'pickup' = 'delivery') => {
    // Unique key now includes fulfillmentMethod to distinguish the same dish with different pickup choices
    const uniqueKey = `${dish.id}-${fulfillmentMethod}-${notes || ''}`;
    
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.uniqueKey === uniqueKey);
      if (existingIndex !== -1) {
        const newCart = [...prev];
        newCart[existingIndex] = {
          ...newCart[existingIndex],
          quantity: newCart[existingIndex].quantity + quantity
        };
        return newCart;
      }
      return [...prev, { ...dish, quantity, notes, uniqueKey, fulfillmentMethod }];
    });
  };

  const removeFromCart = (uniqueKey: string) => {
    setCart(prev => prev.filter(item => item.uniqueKey !== uniqueKey));
  };

  const updateQuantity = (uniqueKey: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(uniqueKey);
      return;
    }
    setCart(prev => prev.map(item => 
      item.uniqueKey === uniqueKey ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => setCart([]);

  const subtotal = useMemo(() => 
    cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)
  , [cart]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, subtotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
