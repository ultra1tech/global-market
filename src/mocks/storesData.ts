
// Mock data for stores

export const allStores = [
  {
    id: "s1",
    name: "Sarah's Crafts",
    description: "Handmade crafts and home decor from local artisans.",
    longDescription: "Sarah's Crafts was founded in 2015 with a mission to support local artisans and promote sustainable, handmade products. We work with over 30 skilled craftspeople who create unique items using traditional techniques and natural materials. Each piece tells a story and brings a touch of artisanal charm to your home.",
    logo: "https://images.unsplash.com/photo-1633409361618-c73427e4e206?ixlib=rb-4.0.3",
    banner: "https://images.unsplash.com/photo-1516981879613-9f5da904015f?ixlib=rb-4.0.3",
    country: "United States",
    language: "English",
    productsCount: 125,
    rating: 4.8,
    featured: true,
    joinDate: "2015-06-15",
    shipsTo: ["North America", "Europe", "Australia"],
    contactEmail: "hello@sarahscrafts.com",
    socialMedia: {
      instagram: "@sarahscrafts",
      facebook: "SarahsCraftsOfficial",
      pinterest: "sarahscrafts"
    }
  },
  {
    id: "s2",
    name: "EcoThreads",
    description: "Sustainable fashion for the environmentally conscious.",
    longDescription: "EcoThreads is a sustainable fashion brand dedicated to creating stylish, eco-friendly clothing and accessories. We use only organic, recycled, and biodegradable materials in our products, and ensure fair working conditions throughout our supply chain. Join us in transforming the fashion industry into a force for positive change.",
    logo: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?ixlib=rb-4.0.3",
    banner: "https://images.unsplash.com/photo-1606941839587-391be8d0700e?ixlib=rb-4.0.3",
    country: "Canada",
    language: "English",
    productsCount: 87,
    rating: 4.7,
    featured: true,
    joinDate: "2018-03-22",
    shipsTo: ["Worldwide"],
    contactEmail: "support@ecothreads.com",
    socialMedia: {
      instagram: "@ecothreads",
      facebook: "EcoThreadsOfficial",
      twitter: "@ecothreads"
    }
  },
  {
    id: "s3",
    name: "Leather Artisan",
    description: "Handcrafted leather goods made with traditional techniques.",
    longDescription: "Leather Artisan is a family-owned workshop with over 40 years of experience in leathercraft. We source the highest quality full-grain leather and use traditional techniques to create durable, timeless pieces that develop character with age. Each item is handcrafted by our team of skilled artisans in our workshop in Florence, Italy.",
    logo: "https://images.unsplash.com/photo-1554709314-8f5ae1c4c050?ixlib=rb-4.0.3",
    banner: "https://images.unsplash.com/photo-1531995811006-35cb42e1a022?ixlib=rb-4.0.3",
    country: "Italy",
    language: "Italian, English",
    productsCount: 56,
    rating: 4.9,
    featured: true,
    joinDate: "2019-11-08",
    shipsTo: ["Europe", "North America", "Asia"],
    contactEmail: "info@leatherartisan.com",
    socialMedia: {
      instagram: "@leather_artisan",
      facebook: "LeatherArtisanItaly"
    }
  },
  {
    id: "s4",
    name: "Tech Haven",
    description: "Cutting-edge electronic gadgets and accessories.",
    longDescription: "Tech Haven is your destination for the latest and greatest in technology. We curate innovative electronic products from around the world, focusing on items that combine functionality with beautiful design. Our team of tech experts thoroughly tests each product to ensure quality and performance you can trust.",
    logo: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3",
    banner: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3",
    country: "Japan",
    language: "Japanese, English",
    productsCount: 218,
    rating: 4.5,
    featured: true,
    joinDate: "2017-09-30",
    shipsTo: ["Worldwide"],
    contactEmail: "support@techhaven.com",
    socialMedia: {
      instagram: "@techhaven",
      twitter: "@tech_haven",
      youtube: "TechHavenOfficial"
    }
  },
  {
    id: "s5",
    name: "Natural Beauty",
    description: "Organic beauty and personal care products.",
    longDescription: "Natural Beauty crafts small-batch organic skincare and beauty products using plant-based ingredients. We believe in transparency, sustainability, and the power of nature to nourish and heal. All our products are cruelty-free, vegan, and packaged in eco-friendly materials. Discover the difference that clean beauty can make for your skin and the planet.",
    logo: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?ixlib=rb-4.0.3",
    banner: "https://images.unsplash.com/photo-1624453805969-ec76fb9d78ee?ixlib=rb-4.0.3",
    country: "France",
    language: "French, English",
    productsCount: 94,
    rating: 4.6,
    featured: true,
    joinDate: "2020-02-14",
    shipsTo: ["Europe", "North America"],
    contactEmail: "hello@naturalbeauty.com",
    socialMedia: {
      instagram: "@natural_beauty",
      facebook: "NaturalBeautyOrganic",
      pinterest: "naturalbeautyorg"
    }
  },
  {
    id: "s6",
    name: "Global Flavors",
    description: "Authentic ingredients and food products from around the world.",
    longDescription: "Global Flavors sources authentic cooking ingredients and specialty foods from around the world. We work directly with small-scale producers to bring you the highest quality spices, condiments, grains, and more. Whether you're a professional chef or home cook, our products will help you create dishes with genuine global flavors and support traditional food practices.",
    logo: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3",
    banner: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?ixlib=rb-4.0.3",
    country: "India",
    language: "Hindi, English",
    productsCount: 156,
    rating: 4.7,
    featured: true,
    joinDate: "2016-08-03",
    shipsTo: ["Worldwide"],
    contactEmail: "info@globalflavors.com",
    socialMedia: {
      instagram: "@global_flavors",
      facebook: "GlobalFlavorsMarket",
      youtube: "GlobalFlavorsKitchen"
    }
  },
  {
    id: "s7",
    name: "Mountain Outfitters",
    description: "Premium outdoor gear for adventurers and explorers.",
    longDescription: "Mountain Outfitters provides high-quality gear for outdoor enthusiasts who demand performance and durability. Founded by a team of avid hikers and climbers, we design and select products that have been tested in the most challenging environments. Our mission is to equip you with reliable gear so you can focus on your adventure.",
    logo: "https://images.unsplash.com/photo-1511107554970-0853cea1175a?ixlib=rb-4.0.3",
    banner: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-4.0.3",
    country: "Switzerland",
    language: "German, French, English",
    productsCount: 112,
    rating: 4.8,
    featured: false,
    joinDate: "2018-06-22",
    shipsTo: ["Europe", "North America", "Asia", "Australia"],
    contactEmail: "service@mountainoutfitters.com",
    socialMedia: {
      instagram: "@mountain_outfitters",
      facebook: "MountainOutfittersGear",
      twitter: "@MtnOutfitters"
    }
  },
  {
    id: "s8",
    name: "Vintage Finds",
    description: "Curated collection of vintage and antique treasures.",
    longDescription: "Vintage Finds specializes in sourcing unique vintage items from around the world. Our passionate team travels to estate sales, markets, and auctions to discover one-of-a-kind pieces with history and character. From mid-century furniture to retro fashion accessories, each item in our collection tells a story from the past.",
    logo: "https://images.unsplash.com/photo-1514195762-c0d2acd6b31f?ixlib=rb-4.0.3",
    banner: "https://images.unsplash.com/photo-1541672283822-127721f392db?ixlib=rb-4.0.3",
    country: "United Kingdom",
    language: "English",
    productsCount: 78,
    rating: 4.6,
    featured: false,
    joinDate: "2019-04-11",
    shipsTo: ["Europe", "North America"],
    contactEmail: "hello@vintagefinds.com",
    socialMedia: {
      instagram: "@vintage_finds",
      pinterest: "vintagefindscollection",
      facebook: "VintageFindsShop"
    }
  }
];

export const getStoreById = (id: string) => {
  return allStores.find(store => store.id === id);
};

export const getFeaturedStores = (limit = 6) => {
  return allStores
    .filter(store => store.featured)
    .slice(0, limit);
};

export const searchStores = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return allStores.filter(
    store => 
      store.name.toLowerCase().includes(lowercaseQuery) || 
      store.description.toLowerCase().includes(lowercaseQuery) ||
      store.country.toLowerCase().includes(lowercaseQuery)
  );
};
