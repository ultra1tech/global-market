
import React from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Link, useLocation } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Home, ShoppingBag, Truck, LifeBuoy, Store, Mail, Phone, MessageCircle } from 'lucide-react';

interface HelpCenterLayoutProps {
  children: React.ReactNode;
}

const HelpCenterLayout: React.FC<HelpCenterLayoutProps> = ({ children }) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <MainLayout>
      <div className="bg-blue-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Help Center</h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Find answers to frequently asked questions and get support for your buying and selling experience.
          </p>
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
            <Input 
              placeholder="Search for answers..." 
              className="pl-12 h-12 text-lg"
            />
            <Button className="absolute right-1 top-1 h-10">
              Search
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <nav className="space-y-1">
              <Link
                to="/help"
                className={`flex items-center px-4 py-3 rounded-lg ${
                  isActive('/help') 
                    ? 'bg-blue-50 text-blue-700 font-medium' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Home className="mr-3 h-5 w-5" />
                Help Home
              </Link>
              <Link
                to="/help/buyers-guide"
                className={`flex items-center px-4 py-3 rounded-lg ${
                  isActive('/help/buyers-guide') 
                    ? 'bg-blue-50 text-blue-700 font-medium' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <ShoppingBag className="mr-3 h-5 w-5" />
                For Buyers
              </Link>
              <Link
                to="/help/sellers-guide"
                className={`flex items-center px-4 py-3 rounded-lg ${
                  isActive('/help/sellers-guide') 
                    ? 'bg-blue-50 text-blue-700 font-medium' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Store className="mr-3 h-5 w-5" />
                For Sellers
              </Link>
              <Link
                to="/help/shipping"
                className={`flex items-center px-4 py-3 rounded-lg ${
                  isActive('/help/shipping') 
                    ? 'bg-blue-50 text-blue-700 font-medium' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Truck className="mr-3 h-5 w-5" />
                Shipping & Returns
              </Link>
              <Link
                to="/help/contact"
                className={`flex items-center px-4 py-3 rounded-lg ${
                  isActive('/help/contact') 
                    ? 'bg-blue-50 text-blue-700 font-medium' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Mail className="mr-3 h-5 w-5" />
                Contact Support
              </Link>
            </nav>
            
            <div className="mt-8 bg-blue-50 p-6 rounded-lg">
              <h3 className="font-medium mb-3 flex items-center">
                <LifeBuoy className="mr-2 h-5 w-5 text-blue-600" />
                Need More Help?
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Our support team is here to assist you with any questions or concerns.
              </p>
              <div className="space-y-3">
                <Button variant="outline" className="w-full flex justify-start">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Support
                </Button>
                <Button variant="outline" className="w-full flex justify-start">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Live Chat
                </Button>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-3">
            {children}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default HelpCenterLayout;
