
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

// Define wishlist item type
export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  store?: string;
  storeId?: string;
  storeName?: string;
}

// Define the context type
interface WishlistContextType {
  items: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (itemId: string) => void;
  isInWishlist: (itemId: string) => boolean;
  clearWishlist: () => void;
  count: number;
}

// Create the context with a default value
const WishlistContext = createContext<WishlistContextType>({
  items: [],
  addToWishlist: () => {},
  removeFromWishlist: () => {},
  isInWishlist: () => false,
  clearWishlist: () => {},
  count: 0,
});

// Create a provider component
export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize state with saved wishlist or empty array
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(() => {
    const savedWishlist = localStorage.getItem('baw_wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  // Count of items in wishlist
  const count = wishlistItems.length;

  // Function to add item to wishlist
  const addToWishlist = (item: WishlistItem) => {
    if (!isInWishlist(item.id)) {
      const updatedWishlist = [...wishlistItems, item];
      setWishlistItems(updatedWishlist);
      toast("Added to wishlist", {
        description: `${item.name} has been added to your wishlist.`
      });
    }
  };

  // Function to remove item from wishlist
  const removeFromWishlist = (itemId: string) => {
    const itemToRemove = wishlistItems.find(item => item.id === itemId);
    if (itemToRemove) {
      const updatedWishlist = wishlistItems.filter(item => item.id !== itemId);
      setWishlistItems(updatedWishlist);
      toast("Removed from wishlist", {
        description: `${itemToRemove.name} has been removed from your wishlist.`
      });
    }
  };

  // Function to check if item is in wishlist
  const isInWishlist = (itemId: string) => {
    return wishlistItems.some(item => item.id === itemId);
  };

  // Function to clear wishlist
  const clearWishlist = () => {
    setWishlistItems([]);
    toast("Wishlist cleared", {
      description: "All items have been removed from your wishlist."
    });
  };

  // Update localStorage when wishlist changes
  useEffect(() => {
    localStorage.setItem('baw_wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  return (
    <WishlistContext.Provider
      value={{
        items: wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
        count
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

// Create a custom hook to use the wishlist context
export const useWishlist = () => useContext(WishlistContext);

export default WishlistProvider;
