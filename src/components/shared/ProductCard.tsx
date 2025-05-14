
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/mocks/productsData';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import WishlistButton from './WishlistButton';
import { ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  showAddToCart?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product,
  showAddToCart = true
}) => {
  const { addItem } = useCart();
  const { t } = useLanguage();
  const { formatPrice } = useCurrency();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast(`${product.name} ${t('cart.added', { fallback: "added to cart" })}`);
  };
  
  return (
    <Card className="overflow-hidden group transition-all hover:shadow-lg h-full flex flex-col">
      <div className="flex-1 flex flex-col">
        <Link to={`/product/${product.id}`} className="relative h-52 overflow-hidden">
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
              {t('product.new', { fallback: "New" })}
            </Badge>
          )}
          {product.oldPrice && (
            <Badge variant="outline" className="absolute bottom-2 left-2 bg-white">
              {t('product.sale', { fallback: "Sale" })}
            </Badge>
          )}
        </Link>
        <CardContent className="p-4 flex-1 flex flex-col">
          <div className="flex-1">
            <Link to={`/stores/${product.storeId}`} className="block">
              <p className="text-xs text-gray-500 hover:underline">
                {product.storeName}
              </p>
            </Link>
            <Link to={`/product/${product.id}`} className="block">
              <h3 className="font-medium text-base mt-1 line-clamp-2 hover:text-marketplace-primary">
                {product.name}
              </h3>
            </Link>
            <div className="flex items-baseline mt-2">
              <span className="font-bold text-marketplace-primary">
                {formatPrice(product.price)}
              </span>
              {product.oldPrice && (
                <span className="ml-2 text-sm text-gray-500 line-through">
                  {formatPrice(product.oldPrice)}
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
                {t('product.addToCart', { fallback: "Add to Cart" })}
              </Button>
            </div>
          )}
        </CardContent>
      </div>
    </Card>
  );
};

export default ProductCard;
