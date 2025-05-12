
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, LogIn, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import LanguageSwitcher from "@/components/shared/LanguageSwitcher";
import CurrencySwitcher from "@/components/shared/CurrencySwitcher";

interface MobileMenuContentProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  setMobileMenuOpen: (isOpen: boolean) => void;
}

const categories = [
  { name: "Fashion", path: "/browse?category=fashion" },
  { name: "Electronics", path: "/browse?category=electronics" },
  { name: "Home & Decor", path: "/browse?category=home-decor" },
  { name: "Beauty", path: "/browse?category=beauty" },
  { name: "Toys", path: "/browse?category=toys" },
  { name: "Food", path: "/browse?category=food" },
  { name: "Accessories", path: "/browse?category=accessories" },
];

const MobileMenuContent: React.FC<MobileMenuContentProps> = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
  setMobileMenuOpen,
}) => {
  const { user, logout, isAuthenticated } = useAuth();
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

  return (
    <div className="flex flex-col h-full">
      {/* Mobile Search Bar */}
      <form onSubmit={handleSearch} className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full px-4 py-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute top-2.5 left-3 h-4 w-4 text-muted-foreground" />
        </div>
      </form>
      
      {/* Language & Currency Switches */}
      <div className="flex space-x-2 mb-4">
        <LanguageSwitcher size="sm" />
        <CurrencySwitcher size="sm" onCurrencyChange={() => {}} />
      </div>
      
      {/* Mobile Nav Links */}
      <div className="space-y-1">
        <Link 
          to="/"
          className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-muted"
          onClick={() => setMobileMenuOpen(false)}
        >
          Home
        </Link>
        
        <p className="px-3 pt-4 text-sm font-medium text-muted-foreground">Categories</p>
        {categories.map((category) => (
          <Link
            key={category.name}
            to={category.path}
            className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-muted"
            onClick={() => setMobileMenuOpen(false)}
          >
            {category.name}
          </Link>
        ))}
        
        <Link 
          to="/stores"
          className="flex items-center px-3 py-2 mt-2 text-sm font-medium rounded-md hover:bg-muted"
          onClick={() => setMobileMenuOpen(false)}
        >
          All Stores
        </Link>
        
        <Link 
          to="/browse"
          className="flex items-center px-3 py-2 mt-2 text-sm font-medium rounded-md hover:bg-muted"
          onClick={() => setMobileMenuOpen(false)}
        >
          Browse Products
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
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              <LogIn className="mr-2 h-4 w-4" />
              Sign In
            </Link>
            <Link 
              to="/register" 
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              <User className="mr-2 h-4 w-4" />
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileMenuContent;
