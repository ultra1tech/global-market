
import React, { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { 
  ShoppingCart, 
  Menu, 
  X, 
  Search, 
  User, 
  LogIn, 
  LogOut, 
  Store,
  Package,
  Heart,
  MessageCircle,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Footer from "@/components/shared/Footer";
import LanguageSwitcher from "@/components/shared/LanguageSwitcher";
import CurrencySwitcher from "@/components/shared/CurrencySwitcher";

const categories = [
  { name: "Fashion", path: "/products?category=fashion" },
  { name: "Electronics", path: "/products?category=electronics" },
  { name: "Home & Decor", path: "/products?category=home-decor" },
  { name: "Beauty", path: "/products?category=beauty" },
  { name: "Toys", path: "/products?category=toys" },
  { name: "Food", path: "/products?category=food" },
  { name: "Accessories", path: "/products?category=accessories" },
];

const MainLayout: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { totalItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setMobileMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isDashboardPage = location.pathname.includes('/dashboard');

  // Get dynamic dashboard link based on user role
  const getDashboardLink = () => {
    if (!user) return "/login";
    
    switch(user.role) {
      case "buyer": return "/buyer/dashboard";
      case "seller": return "/seller/dashboard";
      case "admin": return "/admin/dashboard";
      default: return "/";
    }
  };
  
  const handleCurrencyChange = (currency: string) => {
    // This would trigger a re-render of price components in a real app
    // For now, it just updates localStorage (handled in CurrencySwitcher)
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="marketplace-container">
          <div className="flex items-center justify-between h-16">
            {/* Mobile Menu Button */}
            <div className="flex md:hidden">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu size={24} />
                    <span className="sr-only">Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[85%] sm:w-[350px] pt-10">
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
                      <CurrencySwitcher
                        size="sm"
                        onCurrencyChange={handleCurrencyChange}
                      />
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
                                  to="/seller/products"
                                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-muted"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  My Products
                                </Link>
                                <Link 
                                  to="/seller/orders"
                                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-muted"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  Orders
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
                </SheetContent>
              </Sheet>
            </div>

            {/* Logo */}
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-marketplace-primary">
                B.A.W.
              </span>
              <span className="hidden md:inline-block ml-1 text-sm font-medium text-gray-500">
                Marketplace
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-sm font-medium hover:text-marketplace-primary">
                Home
              </Link>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="p-0 h-auto text-sm font-medium">
                    Categories
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-48">
                  {categories.map((category) => (
                    <DropdownMenuItem key={category.name} asChild>
                      <Link to={category.path}>
                        {category.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Link to="/stores" className="text-sm font-medium hover:text-marketplace-primary">
                Stores
              </Link>
            </nav>

            {/* Search Bar (Desktop) */}
            <div className="hidden md:flex flex-1 max-w-md mx-4">
              <form onSubmit={handleSearch} className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full px-4 py-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute top-2.5 left-3 h-4 w-4 text-muted-foreground" />
              </form>
            </div>

            {/* Right Navigation Items */}
            <div className="flex items-center space-x-2">
              {/* Language & Currency Switchers (Desktop) */}
              <div className="hidden md:flex items-center space-x-2 mr-2">
                <LanguageSwitcher size="icon" />
                <CurrencySwitcher
                  size="icon"
                  onCurrencyChange={handleCurrencyChange}
                />
              </div>
            
              {/* Cart Button */}
              <Button variant="ghost" size="icon" asChild>
                <Link to="/cart" className="relative">
                  <ShoppingCart size={20} />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-marketplace-primary text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                  <span className="sr-only">Cart</span>
                </Link>
              </Button>

              {/* User Menu */}
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      {user?.avatar ? (
                        <img 
                          src={user.avatar} 
                          alt={user.name} 
                          className="h-8 w-8 rounded-full object-cover" 
                        />
                      ) : (
                        <User size={20} />
                      )}
                      <span className="sr-only">User menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem asChild>
                        <Link to={getDashboardLink()}>
                          <User className="mr-2 h-4 w-4" />
                          <span>Dashboard</span>
                        </Link>
                      </DropdownMenuItem>
                      
                      {user?.role === "buyer" && (
                        <>
                          <DropdownMenuItem asChild>
                            <Link to="/buyer/orders">
                              <Package className="mr-2 h-4 w-4" />
                              <span>My Orders</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to="/buyer/wishlist">
                              <Heart className="mr-2 h-4 w-4" />
                              <span>Wishlist</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to="/buyer/messages">
                              <MessageCircle className="mr-2 h-4 w-4" />
                              <span>Messages</span>
                            </Link>
                          </DropdownMenuItem>
                        </>
                      )}
                      
                      {user?.role === "seller" && (
                        <>
                          <DropdownMenuItem asChild>
                            <Link to="/seller/products">
                              <Package className="mr-2 h-4 w-4" />
                              <span>My Products</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to="/seller/orders">
                              <Package className="mr-2 h-4 w-4" />
                              <span>Orders</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to="/seller/store-settings">
                              <Store className="mr-2 h-4 w-4" />
                              <span>Store Settings</span>
                            </Link>
                          </DropdownMenuItem>
                        </>
                      )}
                      
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600" onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Sign Out</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="hidden md:flex items-center space-x-2">
                  <Button variant="ghost" asChild className="text-sm">
                    <Link to="/login">Sign In</Link>
                  </Button>
                  <Button asChild className="text-sm">
                    <Link to="/register">Register</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
