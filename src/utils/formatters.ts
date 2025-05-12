
import { useCurrency } from '@/contexts/CurrencyContext';

// Format a number as currency based on the current currency context
export const formatCurrency = (amount: number): string => {
  // This is a simplified implementation
  // In a real app, this would use the useCurrency hook 
  // and apply the appropriate exchange rate and formatting
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });
  
  return formatter.format(amount);
};

// Format a date with specified options
export const formatDate = (date: Date | string, locale: string = 'en-US'): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(dateObj);
};
