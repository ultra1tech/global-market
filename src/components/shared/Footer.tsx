
import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Globe, Mail, Phone } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import CurrencySwitcher from "./CurrencySwitcher";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="marketplace-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">B.A.W. Marketplace</h3>
            <p className="text-sm text-gray-600 mb-4">
              Buy and sell products from around the world. Connect with global sellers and discover unique items.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-marketplace-primary">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-marketplace-primary">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-marketplace-primary">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
            <div className="mt-4 flex items-center space-x-2">
              <LanguageSwitcher size="sm" variant="ghost" />
              <CurrencySwitcher size="sm" variant="ghost" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-600 hover:text-marketplace-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/browse" className="text-sm text-gray-600 hover:text-marketplace-primary">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/stores" className="text-sm text-gray-600 hover:text-marketplace-primary">
                  Stores
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-sm text-gray-600 hover:text-marketplace-primary">
                  Become a Seller
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-marketplace-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-600 hover:text-marketplace-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shipping-policy" className="text-sm text-gray-600 hover:text-marketplace-primary">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-sm text-gray-600 hover:text-marketplace-primary">
                  Return & Refund
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-gray-600 hover:text-marketplace-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-600 hover:text-marketplace-primary">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-sm text-gray-600 hover:text-marketplace-primary">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-gray-600 hover:text-marketplace-primary">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Globe className="h-5 w-5 text-marketplace-primary mr-2 mt-0.5" />
                <span className="text-sm text-gray-600">
                  BAW Marketplace Inc.<br />123 Global Street<br />San Francisco, CA 94105
                </span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-marketplace-primary mr-2" />
                <a href="mailto:support@bawmarketplace.com" className="text-sm text-gray-600 hover:text-marketplace-primary">
                  support@bawmarketplace.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-marketplace-primary mr-2" />
                <a href="tel:+1-555-123-4567" className="text-sm text-gray-600 hover:text-marketplace-primary">
                  +1 (555) 123-4567
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} B.A.W. Marketplace. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/privacy" className="text-xs text-gray-500 hover:text-marketplace-primary">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-xs text-gray-500 hover:text-marketplace-primary">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-xs text-gray-500 hover:text-marketplace-primary">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
