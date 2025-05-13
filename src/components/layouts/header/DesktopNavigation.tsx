
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";

const DesktopNavigation: React.FC = () => {
  const { t, direction } = useLanguage();
  
  // Categories with translation keys
  const categories = [
    { nameKey: "categories.fashion", path: "/browse?category=fashion" },
    { nameKey: "categories.electronics", path: "/browse?category=electronics" },
    { nameKey: "categories.homeDecor", path: "/browse?category=home-decor" },
    { nameKey: "categories.beauty", path: "/browse?category=beauty" },
    { nameKey: "categories.food", path: "/browse?category=food" },
    { nameKey: "categories.crafts", path: "/browse?category=crafts" },
    { nameKey: "categories.accessories", path: "/browse?category=accessories" },
  ];

  return (
    <nav className={`hidden md:flex items-center ${direction === 'rtl' ? 'space-x-reverse' : 'space-x-6'}`}>
      <Link to="/" className="text-sm font-medium hover:text-marketplace-primary">
        {t('common.home')}
      </Link>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="p-0 h-auto text-sm font-medium">
            {t('common.categories')}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className={`w-48 ${direction === 'rtl' ? 'text-right' : ''}`}>
          {categories.map((category) => (
            <DropdownMenuItem key={category.nameKey} asChild>
              <Link to={category.path}>
                {t(category.nameKey)}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      
      <Link to="/browse" className="text-sm font-medium hover:text-marketplace-primary">
        {t('common.products')}
      </Link>
      
      <Link to="/stores" className="text-sm font-medium hover:text-marketplace-primary">
        {t('common.stores')}
      </Link>
    </nav>
  );
};

export default DesktopNavigation;
