
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';
import { translations, availableLanguages, Language } from '@/translations';

// Define the context type
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  direction: 'ltr' | 'rtl';
  availableLanguages: typeof availableLanguages;
}

// Define translation object type more precisely
interface TranslationObject {
  [key: string]: string | TranslationObject;
}

// Create the context with a default value
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: () => '',
  direction: 'ltr',
  availableLanguages,
});

// Create a provider component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize state with saved language or default to English
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('baw_language');
    return (savedLanguage as Language) || 'en';
  });

  // Determine text direction based on language
  const direction = language === 'ar' ? 'rtl' : 'ltr';

  // Function to set language and save to localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('baw_language', lang);
    toast(`Language changed to ${availableLanguages.find(l => l.code === lang)?.name}`);
    
    // Set the document direction for RTL support
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    // You might also want to set lang attribute
    document.documentElement.lang = lang;
  };

  // Function to get translation for a key
  const t = (key: string): string => {
    const keys = key.split('.');
    let result: string | TranslationObject = translations[language];
    
    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        // Fallback to English if translation not found
        let fallback: string | TranslationObject = translations.en;
        for (const fk of keys) {
          if (fallback && typeof fallback === 'object' && fk in fallback) {
            fallback = fallback[fk];
          } else {
            return key; // No translation found, return the key
          }
        }
        return typeof fallback === 'string' ? fallback : key;
      }
    }
    
    return typeof result === 'string' ? result : key;
  };

  // Set the document direction on initial load
  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
  }, [direction, language]);

  return (
    <LanguageContext.Provider 
      value={{ 
        language, 
        setLanguage, 
        t, 
        direction,
        availableLanguages 
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

// Create a custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);

export default LanguageProvider;
