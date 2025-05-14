
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import { Badge } from "@/components/ui/badge";

const CartButton: React.FC = () => {
  const { totalItems, totalPrice } = useCart();
  const { t, direction } = useLanguage();
  const { formatPrice } = useCurrency();
  const [animated, setAnimated] = useState(false);
  
  // Animation effect when cart items change
  useEffect(() => {
    if (totalItems > 0) {
      setAnimated(true);
      const timer = setTimeout(() => setAnimated(false), 300);
      return () => clearTimeout(timer);
    }
  }, [totalItems]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" asChild>
            <Link to="/cart" className="relative">
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <Badge 
                  className={`absolute -top-1 -right-1 bg-marketplace-primary text-white text-xs font-semibold min-h-5 min-w-5 flex items-center justify-center p-0 ${animated ? 'scale-110' : ''} transition-transform`}>
                  {totalItems > 99 ? '99+' : totalItems}
                </Badge>
              )}
              <span className="sr-only">{t('common.cart')}</span>
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {totalItems > 0 ? (
            <div className="text-sm">
              <p className="font-medium">
                {t('cart.itemsInCart', { count: totalItems })}
              </p>
              <p className="text-muted-foreground mt-1">
                {t('cart.total')}: {formatPrice(totalPrice)}
              </p>
            </div>
          ) : (
            <p>{t('cart.empty')}</p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CartButton;
