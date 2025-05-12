
// Updated mock data for stores

export interface Store {
  id: string;
  name: string;
  logo?: string;
  coverImage?: string;
  description: string;
  country: string;
  rating: number;
  reviewCount: number;
  productCount: number;
  verified: boolean;
  isFeatured: boolean;
  joinDate: string;
  languages: string[];
  contactInfo: {
    email: string;
    phone?: string;
    website?: string;
  };
}

export const storeData: Store[] = [
  {
    id: "s1",
    name: "Sarah's Crafts",
    logo: "https://images.unsplash.com/photo-1621155346337-1d19476ba7d6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200",
    coverImage: "https://images.unsplash.com/photo-1507914997753-afa2e1c2c22c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    description: "Handmade crafts and home decorations made from sustainable materials",
    country: "United States",
    rating: 4.8,
    reviewCount: 124,
    productCount: 42,
    verified: true,
    isFeatured: true,
    joinDate: "2022-01-15",
    languages: ["English"],
    contactInfo: {
      email: "sarah@sarahscrafts.com",
      phone: "+1-555-123-4567",
      website: "www.sarahscrafts.com"
    }
  },
  {
    id: "s2",
    name: "EcoThreads",
    logo: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200",
    coverImage: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    description: "Sustainable and eco-friendly clothing for the conscious consumer",
    country: "Canada",
    rating: 4.5,
    reviewCount: 89,
    productCount: 56,
    verified: true,
    isFeatured: true,
    joinDate: "2022-03-22",
    languages: ["English", "French"],
    contactInfo: {
      email: "hello@ecothreads.com",
      website: "www.ecothreads.com"
    }
  },
  {
    id: "s3",
    name: "Leather Artisan",
    logo: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200",
    coverImage: "https://images.unsplash.com/photo-1531997410508-49b2aa6f79ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    description: "Premium handcrafted leather goods made with traditional techniques",
    country: "Italy",
    rating: 4.9,
    reviewCount: 211,
    productCount: 28,
    verified: true,
    isFeatured: true,
    joinDate: "2021-11-05",
    languages: ["English", "Italian"],
    contactInfo: {
      email: "info@leatherartisan.com",
      phone: "+39-555-987-6543"
    }
  },
  {
    id: "s4",
    name: "Global Spices",
    logo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200",
    coverImage: "https://images.unsplash.com/photo-1596040033249-a7c412756d10?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    description: "Authentic spices and ingredients sourced directly from farmers worldwide",
    country: "India",
    rating: 4.7,
    reviewCount: 157,
    productCount: 82,
    verified: true,
    isFeatured: true,
    joinDate: "2022-02-18",
    languages: ["English", "Hindi"],
    contactInfo: {
      email: "orders@globalspices.com",
      phone: "+91-555-234-5678",
      website: "www.globalspices.com"
    }
  },
  {
    id: "s5",
    name: "Tech Innovations",
    logo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200",
    coverImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    description: "Cutting-edge tech gadgets and accessories for modern lifestyles",
    country: "Japan",
    rating: 4.6,
    reviewCount: 93,
    productCount: 37,
    verified: false,
    isFeatured: true,
    joinDate: "2022-04-10",
    languages: ["English", "Japanese"],
    contactInfo: {
      email: "support@techinnovations.jp",
      website: "www.techinnovations.jp"
    }
  }
];

export const getStoreById = (id: string) => {
  return storeData.find(store => store.id === id);
};

export const getFeaturedStores = (limit = 3) => {
  return storeData
    .filter(store => store.isFeatured)
    .slice(0, limit);
};
