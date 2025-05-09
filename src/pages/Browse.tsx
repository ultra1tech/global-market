
import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { allProducts } from '@/mocks/productsData';
import MainLayout from '@/components/layouts/MainLayout';
import { Input } from '@/components/ui/input';

const Browse = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const searchQuery = searchParams.get('search') || '';
  
  const [searchTerm, setSearchTerm] = useState(searchQuery);
  
  // Filter products based on category and search term
  const filteredProducts = allProducts.filter(product => {
    const matchesCategory = categoryParam 
      ? product.category?.toLowerCase() === categoryParam.toLowerCase()
      : true;
    
    const matchesSearch = searchTerm
      ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (product.description?.toLowerCase() || '').includes(searchTerm.toLowerCase())
      : true;
    
    return matchesCategory && matchesSearch;
  });

  return (
    <MainLayout>
      <div className="marketplace-container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {categoryParam 
                ? `${categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)} Products` 
                : 'All Products'}
            </h1>
            <p className="text-gray-500">
              {filteredProducts.length} products found
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 w-full md:w-auto">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-64"
            />
          </div>
        </div>
        
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl mb-4">No products found</p>
            <Button asChild>
              <Link to="/products">View All Products</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden transition-transform hover:shadow-lg">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-md line-clamp-2">{product.name}</h3>
                    <span className="font-bold text-marketplace-primary">${product.price.toFixed(2)}</span>
                  </div>
                  <p className="text-gray-500 text-xs mb-4 line-clamp-2">{product.description || "A unique product on our global marketplace"}</p>
                  <div className="flex justify-between items-center">
                    <Link to={`/stores/${product.storeId}`} className="text-xs text-gray-500 hover:underline">
                      {product.storeName}
                    </Link>
                    <div className="flex items-center">
                      <span className="text-yellow-500 mr-1">★</span>
                      <span className="text-xs">{product.rating}</span>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full mt-4"
                    asChild
                    size="sm"
                  >
                    <Link to={`/products/${product.id}`}>View Details</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Browse;
