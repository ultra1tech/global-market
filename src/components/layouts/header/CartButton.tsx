
import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useLanguage } from "@/contexts/LanguageContext";

const CartButton: React.FC = () => {
  const { totalItems, totalPrice } = useCart();
  const { t } = useLanguage();
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" asChild>
            <Link to="/cart" className="relative">
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-marketplace-primary text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
              <span className="sr-only">{t('common.cart')}</span>
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {totalItems > 0 ? (
            <p>
              {t('cart.itemsInCart', { count: totalItems })}
            </p>
          ) : (
            <p>{t('cart.empty')}</p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CartButton;
