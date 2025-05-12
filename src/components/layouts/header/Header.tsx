
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import DesktopNavigation from "./DesktopNavigation";
import SearchBar from "./SearchBar";
import UserMenuDropdown from "./UserMenuDropdown";
import CartButton from "./CartButton";
import MobileMenuContent from "./MobileMenuContent";
import LanguageSwitcher from "@/components/shared/LanguageSwitcher";
import CurrencySwitcher from "@/components/shared/CurrencySwitcher";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/browse?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setMobileMenuOpen(false);
    }
  };

  return (
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
                <MobileMenuContent 
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  handleSearch={handleSearch}
                  setMobileMenuOpen={setMobileMenuOpen}
                />
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
          <DesktopNavigation />

          {/* Search Bar (Desktop) */}
          <SearchBar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
          />

          {/* Right Navigation Items */}
          <div className="flex items-center space-x-2">
            {/* Language & Currency Switchers (Desktop) */}
            <div className="hidden md:flex items-center space-x-2 mr-2">
              <LanguageSwitcher size="icon" />
              <CurrencySwitcher size="icon" />
            </div>
          
            {/* Cart Button */}
            <CartButton />

            {/* User Menu */}
            <UserMenuDropdown />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
