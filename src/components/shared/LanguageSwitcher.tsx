
import React, { useState } from 'react';
import { Globe, Check } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';

// Available languages
const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
];

interface LanguageSwitcherProps {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ 
  variant = 'outline', 
  size = 'default' 
}) => {
  const [currentLanguage, setCurrentLanguage] = useState(languages[0]);
  
  const handleLanguageChange = (language: typeof languages[0]) => {
    setCurrentLanguage(language);
    // In a real app, you would apply translations here
    toast(`Language changed to ${language.name}`);
    
    // You might store the language preference in localStorage or context
    localStorage.setItem('baw_language', language.code);
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size} className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          {size !== 'icon' && (
            <span>{currentLanguage.flag} {currentLanguage.code.toUpperCase()}</span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language)}
            className="flex items-center justify-between"
          >
            <span>
              {language.flag} {language.name}
            </span>
            {currentLanguage.code === language.code && (
              <Check className="h-4 w-4 ml-2" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
