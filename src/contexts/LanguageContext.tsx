
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import translations from '@/translations';

// Define the types
export interface TranslationObject {
  [key: string]: string | TranslationObject;
}

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string, options?: { [key: string]: any }) => string;
  direction: 'ltr' | 'rtl';
  availableLanguages: { code: string; name: string }[];
}

// Create the context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Language provider component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Get initial language from localStorage or default to 'en'
  const [language, setLanguage] = useState<string>(() => {
    return localStorage.getItem('baw_language') || 'en';
  });

  // Define available languages
  const availableLanguages = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
    { code: 'es', name: 'Español' },
    { code: 'ar', name: 'العربية' },
    { code: 'zh', name: '中文' },
    { code: 'pt', name: 'Português' },
    { code: 'sw', name: 'Kiswahili' }
  ];

  // Determine text direction based on language
  const direction = language === 'ar' ? 'rtl' : 'ltr';

  // Handle language change
  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem('baw_language', lang);
  };

  // Translation function
  const translate = (key: string, options?: { [key: string]: any }): string => {
    // Split the key by dots to navigate through the translations object
    const keys = key.split('.');
    let result: string | TranslationObject = translations[language] || translations.en;

    // Navigate through the translations object
    for (const k of keys) {
      if (typeof result === 'object' && result !== null) {
        result = result[k] as string | TranslationObject;
      } else {
        result = key; // Fallback to the key if translation not found
        break;
      }
    }

    // Handle string interpolation with options
    if (typeof result === 'string' && options) {
      Object.keys(options).forEach(optionKey => {
        result = (result as string).replace(`{${optionKey}}`, options[optionKey]);
      });
    }

    return typeof result === 'string' ? result : key;
  };

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('baw_language', language);
    // Optional: You can add code here to update the document's dir attribute
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
  }, [language, direction]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: handleLanguageChange,
        t: translate,
        direction,
        availableLanguages
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
