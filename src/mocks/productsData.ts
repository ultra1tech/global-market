
// Mock data for products

export const allProducts = [
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
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3",
    currency: "USD",
    storeId: "s2",
    storeName: "EcoThreads",
    rating: 4.5,
    isNew: false,
    isFeatured: true,
    category: "Fashion",
    description: "Sustainable cotton t-shirt",
    stock: 78
  },
  // Add more products as needed
  {
    id: "p3",
    name: "Handmade Leather Wallet",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1473783154683-83ba01fdf4d7?ixlib=rb-4.0.3",
    currency: "USD",
    storeId: "s3",
    storeName: "Leather Artisan",
    rating: 4.7,
    isNew: false,
    isFeatured: true,
    category: "Accessories",
    description: "Handmade leather wallet",
    stock: 32
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
