
import React from 'react';
import { DollarSign } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useCurrency } from '@/contexts/CurrencyContext';

interface CurrencySwitcherProps {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const CurrencySwitcher: React.FC<CurrencySwitcherProps> = ({ 
  variant = 'outline', 
  size = 'default'
}) => {
  const { currency, setCurrency, availableCurrencies } = useCurrency();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size} className="flex items-center gap-2">
          <DollarSign className="h-4 w-4" />
          {size !== 'icon' && (
            <span>{currency.symbol} {currency.code}</span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {availableCurrencies.map((curr) => (
          <DropdownMenuItem
            key={curr.code}
            onClick={() => setCurrency(curr)}
            className="flex items-center justify-between"
          >
            <span>
              {curr.symbol} {curr.code} - {curr.name}
            </span>
            {currency.code === curr.code && (
              <span className="h-4 w-4 ml-2">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CurrencySwitcher;
