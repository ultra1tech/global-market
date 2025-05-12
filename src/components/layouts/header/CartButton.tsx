
import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";

const CartButton: React.FC = () => {
  const { totalItems } = useCart();
  
  return (
    <Button variant="ghost" size="icon" asChild>
      <Link to="/cart" className="relative">
        <ShoppingCart size={20} />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-marketplace-primary text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
            {totalItems}
          </span>
        )}
        <span className="sr-only">Cart</span>
      </Link>
    </Button>
  );
};

export default CartButton;
