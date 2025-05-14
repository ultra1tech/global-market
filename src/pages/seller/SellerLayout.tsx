
import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { 
  Package, 
  ShoppingCart, 
  BarChart2, 
  MessageCircle, 
  HelpCircle, 
  Settings,
  Store,
  PlusSquare,
  Home 
} from 'lucide-react';

const SellerLayout = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname.includes(path);
  };
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold flex items-center">
            <Store className="mr-2 h-5 w-5" />
            Seller Dashboard
          </h2>
        </div>
        <nav className="p-4">
          <ul className="space-y-1">
            <li>
              <NavLink 
                to="/seller-dashboard" 
                end
                className={({ isActive }) => 
                  `flex items-center px-4 py-2 rounded-md ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700 font-medium' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <Home className="mr-3 h-5 w-5" />
                Overview
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/seller-dashboard/products" 
                className={({ isActive }) => 
                  `flex items-center px-4 py-2 rounded-md ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700 font-medium' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <Package className="mr-3 h-5 w-5" />
                Products
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/seller-dashboard/add-product" 
                className={({ isActive }) => 
                  `flex items-center px-4 py-2 rounded-md ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700 font-medium' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <PlusSquare className="mr-3 h-5 w-5" />
                Add Product
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/seller-dashboard/orders" 
                className={({ isActive }) => 
                  `flex items-center px-4 py-2 rounded-md ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700 font-medium' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <ShoppingCart className="mr-3 h-5 w-5" />
                Orders
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/seller-dashboard/analytics" 
                className={({ isActive }) => 
                  `flex items-center px-4 py-2 rounded-md ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700 font-medium' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <BarChart2 className="mr-3 h-5 w-5" />
                Analytics
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/seller-dashboard/messages" 
                className={({ isActive }) => 
                  `flex items-center px-4 py-2 rounded-md ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700 font-medium' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <MessageCircle className="mr-3 h-5 w-5" />
                Messages
                <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  3
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/seller-dashboard/support" 
                className={({ isActive }) => 
                  `flex items-center px-4 py-2 rounded-md ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700 font-medium' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <HelpCircle className="mr-3 h-5 w-5" />
                Support
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/seller-dashboard/settings" 
                className={({ isActive }) => 
                  `flex items-center px-4 py-2 rounded-md ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700 font-medium' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <Settings className="mr-3 h-5 w-5" />
                Settings
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default SellerLayout;
