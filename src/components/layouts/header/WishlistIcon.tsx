
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useWishlist } from '@/contexts/WishlistContext';
import { useLanguage } from '@/contexts/LanguageContext';

const WishlistIcon: React.FC = () => {
  const { count } = useWishlist();
  const { t } = useLanguage();
  
  return (
    <Button variant="ghost" size="icon" asChild className="relative">
      <Link to="/buyer/wishlist">
        <Heart size={20} />
        {count > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-1 -right-1 h-5 min-w-5 p-0 flex items-center justify-center text-[10px]"
          >
            {count}
          </Badge>
        )}
        <span className="sr-only">{t('common.wishlist')}</span>
      </Link>
    </Button>
  );
};

export default WishlistIcon;
