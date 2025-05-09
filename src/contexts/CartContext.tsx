
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

// Define types
interface CartProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  storeId: string;
  storeName: string;
  currency: string;
}

interface CartContextType {
  cart: CartProduct[];
  addToCart: (product: Omit<CartProduct, 'quantity'>, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  applyCurrency: (amount: number, currency: string) => string;
}

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Exchange rates (mock)
const EXCHANGE_RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 149.82,
  CAD: 1.36,
  AUD: 1.52,
  CNY: 7.21,
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartProduct[]>([]);
  const [currency, setCurrency] = useState<string>("USD");
  
  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('baw_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error parsing saved cart", error);
      }
    }
    
    const savedCurrency = localStorage.getItem('baw_currency');
    if (savedCurrency) {
      setCurrency(savedCurrency);
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('baw_cart', JSON.stringify(cart));
  }, [cart]);
  
  // Save currency to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('baw_currency', currency);
  }, [currency]);

  const addToCart = (product: Omit<CartProduct, 'quantity'>, quantity: number) => {
    // Check if product already exists in cart
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingProductIndex !== -1) {
      // Update existing product
      const updatedCart = [...cart];
      updatedCart[existingProductIndex] = {
        ...updatedCart[existingProductIndex],
        quantity: updatedCart[existingProductIndex].quantity + quantity
      };
      setCart(updatedCart);
      toast.success("Product quantity updated in cart");
    } else {
      // Add new product
      setCart([...cart, { ...product, quantity }]);
      toast.success("Product added to cart");
    }
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.id !== productId));
    toast.success("Product removed from cart");
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    const updatedCart = cart.map(item => 
      item.id === productId ? { ...item, quantity } : item
    );
    
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
    toast.success("Cart cleared");
  };
  
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  const applyCurrency = (amount: number, targetCurrency: string = currency) => {
    const rate = EXCHANGE_RATES[targetCurrency] || 1;
    const converted = amount / rate;
    
    // Format based on currency
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: targetCurrency,
    }).format(converted);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    subtotal,
    applyCurrency,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
