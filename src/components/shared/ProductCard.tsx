
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/mocks/productsData';
import { useCart } from '@/contexts/CartContext';
import WishlistButton from './WishlistButton';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  showAddToCart?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product,
  showAddToCart = true
}) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };
  
  return (
    <Card className="overflow-hidden group transition-all hover:shadow-lg h-full flex flex-col">
      <Link to={`/products/${product.id}`} className="flex-1 flex flex-col">
        <div className="relative h-52 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute top-2 right-2">
            <WishlistButton productId={product.id} />
          </div>
          {product.isNew && (
            <Badge className="absolute top-2 left-2 bg-marketplace-primary">
              New
            </Badge>
          )}
          {product.oldPrice && (
            <Badge variant="outline" className="absolute bottom-2 left-2 bg-white">
              Sale
            </Badge>
          )}
        </div>
        <CardContent className="p-4 flex-1 flex flex-col">
          <div className="flex-1">
            <Link to={`/stores/${product.storeId}`} className="block">
              <p className="text-xs text-gray-500 hover:underline">
                {product.storeName}
              </p>
            </Link>
            <h3 className="font-medium text-base mt-1 line-clamp-2">
              {product.name}
            </h3>
            <div className="flex items-baseline mt-2">
              <span className="font-bold text-marketplace-primary">
                ${product.price.toFixed(2)}
              </span>
              {product.oldPrice && (
                <span className="ml-2 text-sm text-gray-500 line-through">
                  ${product.oldPrice.toFixed(2)}
                </span>
              )}
            </div>
            {product.description && (
              <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                {product.description}
              </p>
            )}
          </div>
          
          {showAddToCart && (
            <div className="mt-4">
              <Button 
                variant="outline" 
                className="w-full text-sm"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-1 h-4 w-4" />
                Add to Cart
              </Button>
            </div>
          )}
        </CardContent>
      </Link>
    </Card>
  );
};

export default ProductCard;
