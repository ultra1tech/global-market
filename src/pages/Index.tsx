
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { allProducts } from '@/mocks/productsData';
import MainLayout from '@/components/layouts/MainLayout';
import { showInfoToast } from '@/components/shared/AlertToast';

const Index = () => {
  const featuredProducts = allProducts.filter(product => product.isFeatured).slice(0, 3);

  const handleShowToast = () => {
    showInfoToast(
      "Welcome to B.A.W. Marketplace", 
      "Discover unique products from sellers around the world.", 
      {
        label: "Browse Products",
        onClick: () => window.location.href = "/products"
      }
    );
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16">
        <div className="marketplace-container">
          <div className="flex flex-col-reverse md:flex-row items-center">
            <div className="md:w-1/2 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Buy Authentic Worldwide
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-lg">
                Discover unique products from sellers around the world. 
                Shop with confidence on our global marketplace.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button 
                  size="lg" 
                  onClick={handleShowToast}
                >
                  Explore Now
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  asChild
                >
                  <Link to="/stores">Visit Stores</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 mb-8 md:mb-0">
              <img 
                src="https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Global Marketplace" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-white">
        <div className="marketplace-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Handpicked from our global sellers, these products represent the quality and diversity available on our marketplace.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden transition-transform hover:shadow-lg">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3>
                    <span className="font-bold text-marketplace-primary">${product.price.toFixed(2)}</span>
                  </div>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description || "A unique product on our global marketplace"}</p>
                  <div className="flex justify-between items-center">
                    <Link to={`/stores/${product.storeId}`} className="text-xs text-gray-500 hover:underline">
                      {product.storeName}
                    </Link>
                    <div className="flex items-center">
                      <span className="text-yellow-500 mr-1">★</span>
                      <span className="text-sm">{product.rating}</span>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full mt-4"
                    asChild
                  >
                    <Link to={`/products/${product.id}`}>View Details</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button asChild>
              <Link to="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="marketplace-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Shop by Categories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find exactly what you're looking for from our wide range of product categories.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["Fashion", "Electronics", "Home & Decor", "Beauty", 
              "Toys", "Food", "Accessories", "Art"].map((category) => (
              <Link 
                key={category}
                to={`/products?category=${category.toLowerCase().replace(/\s+/g, '-')}`}
                className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="font-medium text-lg mb-2">{category}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-marketplace-primary text-white">
        <div className="marketplace-container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Become a Seller Today</h2>
            <p className="text-lg mb-8">
              Join thousands of successful sellers on our global marketplace. 
              Create your store and start selling to customers worldwide.
            </p>
            <Button 
              variant="secondary" 
              size="lg"
              asChild
            >
              <Link to="/register">Start Selling</Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
