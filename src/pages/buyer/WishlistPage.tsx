
import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardFooter 
} from '@/components/ui/card';
import { useWishlist } from '@/contexts/WishlistContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { formatCurrency } from '@/utils/formatters';
import { toast } from '@/hooks/use-toast';

const WishlistPage: React.FC = () => {
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { addItem } = useCart();
  const { t, direction } = useLanguage();

  const handleAddToCart = (item: any) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
      storeId: item.storeId || '1', // Default value, should be replaced with actual storeId
      storeName: item.storeName || item.store
    });
    
    toast({
      description: `${item.name} ${t('cart.added')}`
    });
  };

  return (
    <MainLayout>
      <div className="marketplace-container py-8" dir={direction}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t('common.wishlist')}</h1>
            <p className="text-muted-foreground">
              {items.length === 0 
                ? t('wishlist.empty') 
                : t('wishlist.itemCount', { count: items.length })}
            </p>
          </div>
          
          {items.length > 0 && (
            <Button variant="outline" onClick={clearWishlist} className="mt-4 md:mt-0">
              {t('wishlist.clearAll')}
            </Button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
              <Heart className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">{t('wishlist.emptyTitle')}</h2>
            <p className="text-muted-foreground mb-6">{t('wishlist.emptyMessage')}</p>
            <Button asChild>
              <Link to="/browse">{t('wishlist.continueShopping')}</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="relative h-48 bg-muted">
                  <img 
                    src={item.image || 'https://via.placeholder.com/300x200'} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200';
                    }}
                  />
                  <Button 
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => {
                      removeFromWishlist(item.id);
                      toast({
                        description: `${item.name} ${t('wishlist.removed')}`
                      });
                    }}
                  >
                    <Heart className="fill-white" size={16} />
                  </Button>
                </div>
                <CardContent className="pt-4">
                  <div className="text-sm text-muted-foreground mb-1">
                    {item.store || item.storeName || t('store.unknownSeller')}
                  </div>
                  <Link to={`/product/${item.id}`} className="hover:underline">
                    <h3 className="font-medium text-lg mb-2 line-clamp-2">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="font-semibold text-lg">
                    {formatCurrency(item.price)}
                  </p>
                </CardContent>
                <CardFooter className={`gap-2 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
                  <Button 
                    variant="default"
                    className="flex-1"
                    onClick={() => handleAddToCart(item)}
                  >
                    <ShoppingCart className={direction === 'rtl' ? 'ml-2' : 'mr-2'} size={16} />
                    {t('product.addToCart')}
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <Link to={`/product/${item.id}`}>
                      <Eye size={16} />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default WishlistPage;
