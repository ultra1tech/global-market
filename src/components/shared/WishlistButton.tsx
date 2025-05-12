
import React from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface WishlistButtonProps {
  productId: string;
  size?: 'sm' | 'default' | 'lg' | 'icon'; 
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  className?: string;
  inWishlist?: boolean;
}

const WishlistButton: React.FC<WishlistButtonProps> = ({
  productId,
  size = 'icon',
  variant = 'ghost',
  className = '',
  inWishlist = false
}) => {
  const { toast } = useToast();
  const [isInWishlist, setIsInWishlist] = React.useState(inWishlist);
  
  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsInWishlist(!isInWishlist);
    
    toast({
      title: isInWishlist ? "Removed from wishlist" : "Added to wishlist",
      description: isInWishlist 
        ? "The item has been removed from your wishlist" 
        : "The item has been added to your wishlist",
      duration: 3000,
    });
  };
  
  return (
    <Button 
      variant={variant} 
      size={size} 
      className={className}
      onClick={toggleWishlist}
    >
      <Heart 
        className={`${isInWishlist ? 'fill-red-500 text-red-500' : ''}`}
        size={20} 
      />
      <span className="sr-only">
        {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
      </span>
    </Button>
  );
};

export default WishlistButton;
