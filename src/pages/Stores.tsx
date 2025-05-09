
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Phone, Mail } from 'lucide-react';

// Mock store data
const mockStores = [
  {
    id: "store1",
    name: "Global Treasures",
    description: "Unique handcrafted items from around the world.",
    logo: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    coverImage: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    location: "Tokyo, Japan",
    contactEmail: "global@example.com",
    contactPhone: "+81-3-1234-5678"
  },
  {
    id: "store2",
    name: "Nordic Designs",
    description: "Minimalist Scandinavian designs for your home.",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    coverImage: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    location: "Stockholm, Sweden",
    contactEmail: "nordic@example.com",
    contactPhone: "+46-8-1234-5678"
  },
  {
    id: "store3",
    name: "African Artisans",
    description: "Authentic African art and crafts.",
    logo: "https://images.unsplash.com/photo-1496200186974-4293800e2c20?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    coverImage: "https://images.unsplash.com/photo-1590884056755-808a93a77c74?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    location: "Nairobi, Kenya",
    contactEmail: "artisans@example.com",
    contactPhone: "+254-20-1234-5678"
  }
];

const Stores = () => {
  const { id } = useParams<{ id: string }>();
  
  if (id) {
    // Single store view
    const store = mockStores.find(s => s.id === id);
    
    if (!store) {
      return (
        <MainLayout>
          <div className="marketplace-container py-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Store Not Found</h2>
            <p className="mb-8">The store you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/stores">Browse Stores</Link>
            </Button>
          </div>
        </MainLayout>
      );
    }
    
    return (
      <MainLayout>
        <div className="relative">
          {/* Store Cover Image */}
          <div 
            className="h-60 md:h-80 w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${store.coverImage})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          </div>
          
          <div className="marketplace-container relative -mt-16 pb-8">
            {/* Store Logo and Basic Info */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <div className="flex flex-col md:flex-row items-center md:items-start">
                <img 
                  src={store.logo} 
                  alt={`${store.name} logo`}
                  className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"
                />
                <div className="md:ml-6 mt-4 md:mt-0 text-center md:text-left">
                  <h1 className="text-3xl font-bold">{store.name}</h1>
                  
                  <div className="flex items-center justify-center md:justify-start mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < Math.floor(store.rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
                      />
                    ))}
                    <span className="ml-2 text-sm">{store.rating}</span>
                  </div>
                  
                  <p className="mt-2 text-gray-600">{store.description}</p>
                  
                  <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin size={16} className="mr-1" />
                      {store.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Mail size={16} className="mr-1" />
                      {store.contactEmail}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Phone size={16} className="mr-1" />
                      {store.contactPhone}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Store Products Section */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Store Products</h2>
              <div className="text-center py-12">
                <p className="text-xl mb-4">Store products content will appear here</p>
                <Button asChild>
                  <Link to="/products">Browse All Products</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  // Stores list view
  return (
    <MainLayout>
      <div className="marketplace-container py-8">
        <h1 className="text-3xl font-bold mb-8">Explore Stores</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockStores.map(store => (
            <Card key={store.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div 
                className="h-40 bg-cover bg-center"
                style={{ backgroundImage: `url(${store.coverImage})` }}
              >
              </div>
              <CardContent className="p-5">
                <div className="flex items-center -mt-12 mb-4">
                  <img 
                    src={store.logo} 
                    alt={`${store.name} logo`}
                    className="w-16 h-16 rounded-full border-4 border-white shadow-md object-cover"
                  />
                  <div className="ml-4 pt-10">
                    <h3 className="font-bold text-lg">{store.name}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="ml-1 text-sm">{store.rating}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{store.description}</p>
                
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <MapPin size={14} className="mr-1" />
                  {store.location}
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full" 
                  asChild
                >
                  <Link to={`/stores/${store.id}`}>Visit Store</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Stores;
