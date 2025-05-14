
import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { 
  User, 
  Package, 
  Heart, 
  MessageCircle, 
  Settings,
  Star,
  Home
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import MainLayout from '@/components/layouts/MainLayout';

const BuyerLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();
  
  if (!user) {
    return null; // Or loading state
  }
  
  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6 bg-blue-600 text-white">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold text-xl">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-medium">{user.name}</h3>
                    <p className="text-sm text-blue-200">{user.email}</p>
                  </div>
                </div>
              </div>
              
              <nav className="p-4">
                <ul className="space-y-1">
                  <li>
                    <NavLink 
                      to="/buyer/dashboard" 
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
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink 
                      to="/buyer/orders" 
                      className={({ isActive }) => 
                        `flex items-center px-4 py-2 rounded-md ${
                          isActive 
                            ? 'bg-blue-50 text-blue-700 font-medium' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`
                      }
                    >
                      <Package className="mr-3 h-5 w-5" />
                      Orders
                    </NavLink>
                  </li>
                  <li>
                    <NavLink 
                      to="/buyer/wishlist" 
                      className={({ isActive }) => 
                        `flex items-center px-4 py-2 rounded-md ${
                          isActive 
                            ? 'bg-blue-50 text-blue-700 font-medium' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`
                      }
                    >
                      <Heart className="mr-3 h-5 w-5" />
                      Wishlist
                    </NavLink>
                  </li>
                  <li>
                    <NavLink 
                      to="/buyer/reviews" 
                      className={({ isActive }) => 
                        `flex items-center px-4 py-2 rounded-md ${
                          isActive 
                            ? 'bg-blue-50 text-blue-700 font-medium' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`
                      }
                    >
                      <Star className="mr-3 h-5 w-5" />
                      Reviews
                    </NavLink>
                  </li>
                  <li>
                    <NavLink 
                      to="/buyer/messages" 
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
                        2
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink 
                      to="/buyer/profile" 
                      className={({ isActive }) => 
                        `flex items-center px-4 py-2 rounded-md ${
                          isActive 
                            ? 'bg-blue-50 text-blue-700 font-medium' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`
                      }
                    >
                      <User className="mr-3 h-5 w-5" />
                      Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink 
                      to="/buyer/settings" 
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
          </div>
          
          <div className="md:col-span-3">
            <div className="bg-white rounded-lg shadow p-6">
              {children}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default BuyerLayout;
