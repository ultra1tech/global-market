
import React, { useState, useEffect } from 'react';
import { DollarSign, Check } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';

// Available currencies
const currencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
];

interface CurrencySwitcherProps {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  onCurrencyChange?: (currency: string) => void;
}

const CurrencySwitcher: React.FC<CurrencySwitcherProps> = ({ 
  variant = 'outline', 
  size = 'default',
  onCurrencyChange
}) => {
  const [currentCurrency, setCurrentCurrency] = useState(currencies[0]);
  
  // Load saved currency preference on mount
  useEffect(() => {
    const savedCurrency = localStorage.getItem('baw_currency');
    if (savedCurrency) {
      const currency = currencies.find(c => c.code === savedCurrency);
      if (currency) {
        setCurrentCurrency(currency);
      }
    }
  }, []);
  
  const handleCurrencyChange = (currency: typeof currencies[0]) => {
    setCurrentCurrency(currency);
    
    // Call the callback if provided
    if (onCurrencyChange) {
      onCurrencyChange(currency.code);
    }
    
    // Save to localStorage
    localStorage.setItem('baw_currency', currency.code);
    
    // Notify user
    toast(`Currency changed to ${currency.name}`);
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size} className="flex items-center gap-2">
          <DollarSign className="h-4 w-4" />
          {size !== 'icon' && (
            <span>{currentCurrency.symbol} {currentCurrency.code}</span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {currencies.map((currency) => (
          <DropdownMenuItem
            key={currency.code}
            onClick={() => handleCurrencyChange(currency)}
            className="flex items-center justify-between"
          >
            <span>
              {currency.symbol} {currency.code} - {currency.name}
            </span>
            {currentCurrency.code === currency.code && (
              <Check className="h-4 w-4 ml-2" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CurrencySwitcher;
