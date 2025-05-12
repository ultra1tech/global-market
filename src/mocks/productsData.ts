
// Mock data for products

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  currency: string;
  storeId: string;
  storeName: string;
  rating: number;
  isNew: boolean;
  isFeatured: boolean;
  category?: string;
  description?: string;
  dimensions?: string;
  material?: string;
  stock: number;
  images?: string[];
  oldPrice?: number;
  reviews?: number;
  origin?: string;
}

export const allProducts: Product[] = [
  // Featured Products
  {
    id: "p1",
    name: "Handcrafted Wooden Bowl",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1605666807892-a0413a0d0f1b?ixlib=rb-4.0.3",
    currency: "USD",
    storeId: "s1",
    storeName: "Sarah's Crafts",
    rating: 4.8,
    isNew: false,
    isFeatured: true,
    category: "Home & Decor",
    description: "This beautifully crafted wooden bowl is made from sustainable oak and hand-carved by skilled artisans. Each piece is unique with natural wood grain variations, making it perfect for serving salads or displaying fruits.",
    dimensions: "8\" diameter x 3\" height",
    material: "Oak",
    stock: 15,
    reviews: 24,
    images: [
      "https://images.unsplash.com/photo-1605666807892-a0413a0d0f1b?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1578912996078-30307862a84f?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1603865354930-526669e0ad03?ixlib=rb-4.0.3"
    ]
  },
  {
    id: "p2",
    name: "Organic Cotton T-Shirt",
    price: 25.99,
    oldPrice: 32.99,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3",
    currency: "USD",
    storeId: "s2",
    storeName: "EcoThreads",
    rating: 4.5,
    isNew: true,
    isFeatured: true,
    category: "Fashion",
    description: "Made from 100% organic cotton sourced from sustainable farms. This t-shirt is soft, breathable, and perfect for everyday wear. Available in various colors and sizes.",
    stock: 78,
    reviews: 16
  },
  {
    id: "p3",
    name: "Handmade Leather Wallet",
    price: 49.99,
    oldPrice: 59.99,
    image: "https://images.unsplash.com/photo-1473783154683-83ba01fdf4d7?ixlib=rb-4.0.3",
    currency: "USD",
    storeId: "s3",
    storeName: "Leather Artisan",
    rating: 4.7,
    isNew: false,
    isFeatured: true,
    category: "Accessories",
    description: "This genuine leather wallet is handcrafted by master artisans using traditional techniques. Features multiple card slots, a bill compartment, and a coin pocket. Will develop a beautiful patina over time.",
    material: "Full-grain leather",
    stock: 32,
    reviews: 42
  },
  {
    id: "p4",
    name: "Authentic Curry Spice Mix",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1596040033249-a7c412756d10?ixlib=rb-4.0.3",
    currency: "USD",
    storeId: "s4",
    storeName: "Global Spices",
    rating: 4.9,
    isNew: true,
    isFeatured: true,
    category: "Food",
    description: "A premium blend of authentic spices sourced directly from small farmers in Kerala, India. Perfect for creating delicious curries with depth and complexity of flavor.",
    origin: "Kerala, India",
    stock: 65,
    reviews: 28
  },
  {
    id: "p5",
    name: "Wireless Earbuds with Charging Case",
    price: 79.99,
    oldPrice: 99.99,
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?ixlib=rb-4.0.3",
    currency: "USD",
    storeId: "s5",
    storeName: "Tech Innovations",
    rating: 4.6,
    isNew: true,
    isFeatured: true,
    category: "Electronics",
    description: "High-quality wireless earbuds with active noise cancellation, touch controls, and up to 30 hours of battery life with the included charging case. Sweat and water-resistant for workouts.",
    stock: 42,
    reviews: 53
  },
  {
    id: "p6",
    name: "Hand-Painted Ceramic Mug",
    price: 18.50,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-4.0.3",
    currency: "USD",
    storeId: "s1",
    storeName: "Sarah's Crafts",
    rating: 4.7,
    isNew: false,
    isFeatured: true,
    category: "Home & Decor",
    description: "Each mug is individually hand-painted with non-toxic, food-safe glazes. Microwave and dishwasher safe. Makes a unique and thoughtful gift.",
    material: "Ceramic",
    stock: 23,
    reviews: 19
  },
  {
    id: "p7",
    name: "Sustainable Bamboo Toothbrush Set",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?ixlib=rb-4.0.3",
    currency: "USD",
    storeId: "s2",
    storeName: "EcoThreads",
    rating: 4.4,
    isNew: true,
    isFeatured: false,
    category: "Beauty",
    description: "Pack of four bamboo toothbrushes with charcoal-infused bristles. 100% biodegradable handles help reduce plastic waste. Comes in plastic-free packaging.",
    stock: 98,
    reviews: 31
  },
  {
    id: "p8",
    name: "Artisanal Leather Journal",
    price: 35.00,
    image: "https://images.unsplash.com/photo-1531346680077-ccb2f5d5cb10?ixlib=rb-4.0.3",
    currency: "USD",
    storeId: "s3",
    storeName: "Leather Artisan",
    rating: 4.8,
    isNew: true,
    isFeatured: false,
    category: "Accessories",
    description: "Handbound leather journal with 192 pages of acid-free paper. Features a leather wrap closure with a rustic metal button. Perfect for sketching, journaling, or as a travel diary.",
    material: "Buffalo leather, cotton paper",
    stock: 17,
    reviews: 22
  }
];

export const getProductById = (id: string) => {
  return allProducts.find(product => product.id === id);
};

export const getRelatedProducts = (categoryName: string, currentProductId: string, limit = 4) => {
  return allProducts
    .filter(product => product.category === categoryName && product.id !== currentProductId)
    .slice(0, limit);
};

export const getProductsByCategory = (categoryName: string) => {
  return allProducts.filter(product => product.category === categoryName);
};

export const getProductsByStore = (storeId: string) => {
  return allProducts.filter(product => product.storeId === storeId);
};

export const getNewArrivals = (limit = 4) => {
  return allProducts
    .filter(product => product.isNew)
    .slice(0, limit);
};
