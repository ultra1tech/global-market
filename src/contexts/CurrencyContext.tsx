
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CNY' | 'CAD' | 'AUD' | 'GHS' | 'NGN' | 'KES' | 'ZAR' | 'INR';

interface Currency {
  code: CurrencyCode;
  symbol: string;
  name: string;
}

// Available currencies
export const availableCurrencies: Currency[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'GHS', symbol: '₵', name: 'Ghanaian Cedi' },
  { code: 'NGN', symbol: '₦', name: 'Nigerian Naira' },
  { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling' },
  { code: 'ZAR', symbol: 'R', name: 'South African Rand' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
];

// Exchange rates relative to USD (1 USD = X units of currency)
// These would normally come from an API like exchangeratesapi.io
const exchangeRates: Record<CurrencyCode, number> = {
  USD: 1,
  EUR: 0.93,
  GBP: 0.82,
  JPY: 150.29,
  CNY: 7.18,
  CAD: 1.38,
  AUD: 1.52,
  GHS: 14.50,
  NGN: 1550.00,
  KES: 131.50,
  ZAR: 18.40,
  INR: 83.50,
};

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (priceInUSD: number) => string;
  convertPrice: (priceInUSD: number) => number;
  availableCurrencies: Currency[];
}

const CurrencyContext = createContext<CurrencyContextType>({
  currency: availableCurrencies[0],
  setCurrency: () => {},
  formatPrice: () => '',
  convertPrice: () => 0,
  availableCurrencies,
});

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<Currency>(() => {
    const savedCurrency = localStorage.getItem('baw_currency');
    return availableCurrencies.find(c => c.code === savedCurrency) || availableCurrencies[0];
  });

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    localStorage.setItem('baw_currency', newCurrency.code);
    toast(`Currency changed to ${newCurrency.name}`);
  };

  // Convert price from USD to the selected currency
  const convertPrice = (priceInUSD: number): number => {
    const rate = exchangeRates[currency.code];
    return priceInUSD * rate;
  };

  // Format price with currency symbol
  const formatPrice = (priceInUSD: number): string => {
    const convertedPrice = convertPrice(priceInUSD);
    
    // Handle different price formatting based on currency
    let formattedPrice: string;
    
    switch (currency.code) {
      case 'JPY':
      case 'CNY':
        // No decimal places for these currencies
        formattedPrice = Math.round(convertedPrice).toLocaleString();
        break;
      default:
        // 2 decimal places for most currencies
        formattedPrice = convertedPrice.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
    }
    
    // Position the symbol correctly based on locale conventions
    if (['USD', 'CAD', 'AUD', 'GHS', 'NGN', 'KES', 'ZAR'].includes(currency.code)) {
      return `${currency.symbol}${formattedPrice}`;
    } else {
      return `${formattedPrice} ${currency.symbol}`;
    }
  };

  return (
    <CurrencyContext.Provider value={{ 
      currency, 
      setCurrency, 
      formatPrice, 
      convertPrice,
      availableCurrencies 
    }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);

export default CurrencyProvider;
