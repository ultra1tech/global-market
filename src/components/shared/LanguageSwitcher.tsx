
import React from 'react';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';

interface LanguageSwitcherProps {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ 
  variant = 'outline', 
  size = 'default' 
}) => {
  const { language, setLanguage, availableLanguages } = useLanguage();
  
  const currentLang = availableLanguages.find(l => l.code === language) || availableLanguages[0];
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size} className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          {size !== 'icon' && (
            <span>{currentLang.flag} {currentLang.code.toUpperCase()}</span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {availableLanguages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className="flex items-center justify-between"
          >
            <span>
              {lang.flag} {lang.name}
            </span>
            {currentLang.code === lang.code && (
              <span className="h-4 w-4 ml-2">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
