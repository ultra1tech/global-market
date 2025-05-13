
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

// Define the product structure that matches our data
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  storeId: string;
  storeName: string;
  // Add other optional fields that might be used
  oldPrice?: number;
  reviews?: number;
  stock?: number;
  category?: string;
  description?: string;
  rating?: number;
  [key: string]: any; // For other dynamic properties
}

interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  storeId: string;
  storeName: string;
}

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  addToCart: (product: Product, quantity?: number) => void; // Added this line
}

const CartContext = createContext<CartContextType>({
  items: [],
  totalItems: 0,
  totalPrice: 0,
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  addToCart: () => {} // Added this line
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    // Load cart from localStorage if available
    const savedCart = localStorage.getItem("baw_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("baw_cart", JSON.stringify(items));
  }, [items]);
  
  const addItem = (product: Product, quantity: number = 1) => {
    setItems((prevItems) => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(
        (item) => item.productId === product.id
      );
      
      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        
        toast(`Updated ${product.name} quantity in cart`);
        
        return updatedItems;
      } else {
        // Add new item to cart
        const newItem: CartItem = {
          id: `cart_${Date.now()}`,
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity,
          image: product.image,
          storeId: product.storeId,
          storeName: product.storeName,
        };
        
        toast(`${product.name} added to cart`);
        
        return [...prevItems, newItem];
      }
    });
  };
  
  // Alias addItem as addToCart for backward compatibility
  const addToCart = addItem;
  
  const removeItem = (itemId: string) => {
    setItems((prevItems) => {
      const itemToRemove = prevItems.find(item => item.id === itemId);
      if (itemToRemove) {
        toast(`${itemToRemove.name} removed from cart`);
      }
      return prevItems.filter((item) => item.id !== itemId);
    });
  };
  
  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity < 1) return;
    
    setItems((prevItems) => {
      const updatedItems = prevItems.map((item) => 
        item.id === itemId ? { ...item, quantity } : item
      );
      
      const updatedItem = updatedItems.find(item => item.id === itemId);
      if (updatedItem) {
        toast(`${updatedItem.name} quantity updated to ${quantity}`);
      }
      
      return updatedItems;
    });
  };
  
  const clearCart = () => {
    setItems([]);
    toast("Cart cleared");
  };
  
  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        totalPrice,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        addToCart // Added this line
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

export default CartProvider;
