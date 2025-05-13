
import { useCurrency } from '@/contexts/CurrencyContext';

// Format a number as currency based on the current currency context
export const formatCurrency = (amount: number, currencyCode = 'USD'): string => {
  // Create a formatter based on the currencyCode
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
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

// Format a number with thousand separators
export const formatNumber = (num: number, locale: string = 'en-US'): string => {
  return new Intl.NumberFormat(locale).format(num);
};

// Format a price with a specific currency symbol
export const formatPrice = (amount: number, currencyCode = 'USD'): string => {
  return formatCurrency(amount, currencyCode);
};

// Truncate text with ellipsis
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Format phone number
export const formatPhoneNumber = (phone: string): string => {
  // This is a simple formatter for US phone numbers
  // For a real app, consider using a library for international formatting
  const cleaned = ('' + phone).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }
  return phone;
};
