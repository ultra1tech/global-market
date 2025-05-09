
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { allProducts } from '@/mocks/productsData';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { Heart, Share2, ArrowLeft, Star } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  
  // Find the product with the matching ID
  const product = allProducts.find(p => p.id === id);
  
  // If product not found, show error message
  if (!product) {
    return (
      <MainLayout>
        <div className="marketplace-container py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <p className="mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/products">Browse Products</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  const handleAddToCart = () => {
    addItem(product);
    toast({
      description: `${product.name} added to cart`,
    });
  };

  // Get the number of reviews with a fallback to 0
  const reviewCount = product.reviews || 0;

  return (
    <MainLayout>
      <div className="marketplace-container py-8">
        {/* Back button */}
        <Link to="/products" className="inline-flex items-center text-marketplace-primary mb-6 hover:underline">
          <ArrowLeft size={16} className="mr-2" />
          Back to Products
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-auto object-contain"
              style={{ maxHeight: '500px' }}
            />
          </div>
          
          {/* Product Info */}
          <div>
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.name}</h1>
                <Link to={`/stores/${product.storeId}`} className="text-marketplace-primary hover:underline">
                  {product.storeName}
                </Link>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="icon">
                  <Heart size={18} />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 size={18} />
                </Button>
              </div>
            </div>
            
            {/* Rating */}
            <div className="flex items-center mt-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={i < Math.floor(product.rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
                />
              ))}
              <span className="ml-2 text-sm text-gray-600">{product.rating} ({reviewCount} reviews)</span>
            </div>
            
            {/* Price */}
            <div className="mt-6 mb-6">
              <span className="text-3xl font-bold text-marketplace-primary">${product.price.toFixed(2)}</span>
              {/* Conditionally render old price only if it exists */}
              {product.oldPrice && (
                <span className="ml-3 text-lg text-gray-500 line-through">${product.oldPrice.toFixed(2)}</span>
              )}
            </div>
            
            {/* Description */}
            <div className="mb-8">
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-gray-600">{product.description || "No description available for this product."}</p>
            </div>
            
            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="flex-1" onClick={handleAddToCart}>Add to Cart</Button>
              <Button variant="outline" className="flex-1">Buy Now</Button>
            </div>
            
            {/* Additional Info */}
            <div className="mt-8 border-t pt-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500 text-sm">Category</p>
                  <p>{product.category || "Uncategorized"}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Origin</p>
                  <p>{"Unknown"}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">In Stock</p>
                  <p>{product.stock > 0 ? "Yes" : "No"}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Shipping</p>
                  <p>Free Shipping</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductDetail;
