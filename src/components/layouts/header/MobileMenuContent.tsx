import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, LogIn, User, Heart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useWishlist } from "@/contexts/WishlistContext";
import LanguageSwitcher from "@/components/shared/LanguageSwitcher";
import CurrencySwitcher from "@/components/shared/CurrencySwitcher";
import { Badge } from "@/components/ui/badge";

interface MobileMenuContentProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  setMobileMenuOpen: (isOpen: boolean) => void;
}

const MobileMenuContent: React.FC<MobileMenuContentProps> = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
  setMobileMenuOpen,
}) => {
  const { user, logout, isAuthenticated } = useAuth();
  const { t, direction } = useLanguage();
  const { count } = useWishlist();
  const navigate = useNavigate();
  
  // Get dynamic dashboard link based on user role
  const getDashboardLink = () => {
    if (!user) return "/login";
    
    switch(user.role) {
      case "buyer": return "/buyer/dashboard";
      case "seller": return "/seller-dashboard";
      case "admin": return "/admin";
      default: return "/";
    }
  };
  
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Use translated category names with their paths
  const categories = [
    { nameKey: "categories.fashion", path: "/browse?category=fashion" },
    { nameKey: "categories.electronics", path: "/browse?category=electronics" },
    { nameKey: "categories.homeDecor", path: "/browse?category=home-decor" },
    { nameKey: "categories.beauty", path: "/browse?category=beauty" },
    { nameKey: "categories.accessories", path: "/browse?category=accessories" },
    { nameKey: "categories.food", path: "/browse?category=food" },
    { nameKey: "categories.crafts", path: "/browse?category=crafts" },
  ];

  return (
    <div className="flex flex-col h-full" dir={direction}>
      {/* Mobile Search Bar */}
      <form onSubmit={handleSearch} className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder={t('common.searchPlaceholder')}
            className={`w-full px-4 py-2 ${direction === 'rtl' ? 'pr-10' : 'pl-10'} border rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className={`absolute top-2.5 ${direction === 'rtl' ? 'right-3' : 'left-3'} h-4 w-4 text-muted-foreground`} />
        </div>
      </form>
      
      {/* Language & Currency Switches */}
      <div className={`flex mb-4 ${direction === 'rtl' ? 'space-x-reverse' : 'space-x-2'}`}>
        <LanguageSwitcher size="sm" />
        <CurrencySwitcher size="sm" />
      </div>
      
      {/* Mobile Nav Links */}
      <div className="space-y-1">
        <Link 
          to="/"
          className={`flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-muted ${
            direction === 'rtl' ? 'flex-row-reverse text-right' : ''
          }`}
          onClick={() => setMobileMenuOpen(false)}
        >
          {t('common.home')}
        </Link>
        
        <p className={`px-3 pt-4 text-sm font-medium text-muted-foreground ${
          direction === 'rtl' ? 'text-right' : ''
        }`}>{t('common.categories')}</p>
        {categories.map((category) => (
          <Link
            key={category.nameKey}
            to={category.path}
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-muted ${
              direction === 'rtl' ? 'flex-row-reverse text-right' : ''
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            {t(category.nameKey)}
          </Link>
        ))}
        
        <Link 
          to="/stores"
          className={`flex items-center px-3 py-2 mt-2 text-sm font-medium rounded-md hover:bg-muted ${
            direction === 'rtl' ? 'flex-row-reverse text-right' : ''
          }`}
          onClick={() => setMobileMenuOpen(false)}
        >
          {t('common.stores')}
        </Link>
        
        <Link 
          to="/browse"
          className={`flex items-center px-3 py-2 mt-2 text-sm font-medium rounded-md hover:bg-muted ${
            direction === 'rtl' ? 'flex-row-reverse text-right' : ''
          }`}
          onClick={() => setMobileMenuOpen(false)}
        >
          {t('common.products')}
        </Link>

        {/* Wishlist Link */}
        <Link 
          to="/buyer/wishlist"
          className={`flex items-center px-3 py-2 mt-2 text-sm font-medium rounded-md hover:bg-muted ${
            direction === 'rtl' ? 'flex-row-reverse text-right justify-between' : 'justify-between'
          }`}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className={`flex items-center ${direction === 'rtl' ? 'flex-row-reverse space-x-reverse' : ''}`}>
            <Heart className={direction === 'rtl' ? 'ml-2' : 'mr-2'} size={16} />
            <span>{t('common.wishlist')}</span>
          </div>
          {count > 0 && (
            <Badge variant="secondary" className="ml-auto">
              {count}
            </Badge>
          )}
        </Link>
        
        {isAuthenticated && (
          <>
            <div className="pt-4 pb-2 border-t border-gray-200 mt-4">
              <p className="px-3 text-sm font-medium text-muted-foreground mb-2">Your Account</p>
              
              <Link 
                to={getDashboardLink()}
                className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-muted"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              
              {user?.role === "buyer" && (
                <>
                  <Link 
                    to="/buyer/orders"
                    className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-muted"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Orders
                  </Link>
                  <Link 
                    to="/buyer/wishlist"
                    className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-muted"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Wishlist
                  </Link>
                </>
              )}
              
              {user?.role === "seller" && (
                <>
                  <Link 
                    to="/seller-dashboard/products"
                    className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-muted"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Products
                  </Link>
                  <Link 
                    to="/seller-dashboard/orders"
                    className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-muted"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Orders
                  </Link>
                </>
              )}
              
              {user?.role === "admin" && (
                <>
                  <Link 
                    to="/admin"
                    className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-muted"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                </>
              )}
              
              <button
                className="flex items-center w-full px-3 py-2 text-sm font-medium text-left rounded-md hover:bg-muted text-red-600"
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
              >
                Sign Out
              </button>
            </div>
          </>
        )}
        
        {!isAuthenticated && (
          <div className="pt-4 pb-2 border-t border-gray-200 mt-4">
            <Link 
              to="/login" 
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-muted ${
                direction === 'rtl' ? 'flex-row-reverse text-right' : ''
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <LogIn className={direction === 'rtl' ? 'ml-2' : 'mr-2'} size={16} />
              {t('common.login')}
            </Link>
            <Link 
              to="/register" 
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-muted ${
                direction === 'rtl' ? 'flex-row-reverse text-right' : ''
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <User className={direction === 'rtl' ? 'ml-2' : 'mr-2'} size={16} />
              {t('common.register')}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileMenuContent;
