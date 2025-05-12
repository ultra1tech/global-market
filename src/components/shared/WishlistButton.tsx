
import React from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useWishlist } from '@/contexts/WishlistContext';

interface WishlistButtonProps {
  productId: string;
  productName?: string;
  productImage?: string;
  productPrice?: number;
  productStore?: string;
  size?: 'sm' | 'default' | 'lg' | 'icon'; 
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  className?: string;
}

const WishlistButton: React.FC<WishlistButtonProps> = ({
  productId,
  productName = '',
  productImage = '',
  productPrice = 0,
  productStore = '',
  size = 'icon',
  variant = 'ghost',
  className = ''
}) => {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const inWishlist = isInWishlist(productId);
  
  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (inWishlist) {
      removeFromWishlist(productId);
    } else {
      addToWishlist({
        id: productId,
        name: productName,
        price: productPrice,
        image: productImage,
        store: productStore
      });
    }
  };
  
  return (
    <Button 
      variant={variant} 
      size={size} 
      className={className}
      onClick={toggleWishlist}
    >
      <Heart 
        className={`${inWishlist ? 'fill-red-500 text-red-500' : ''}`}
        size={20} 
      />
      <span className="sr-only">
        {inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
      </span>
    </Button>
  );
};

export default WishlistButton;
