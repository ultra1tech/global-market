
import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { SidebarProvider, useSidebar } from '@/components/ui/sidebar';
import SellerLayout from './seller/SellerLayout';
import AddProductPage from './seller/AddProductPage';
import OrdersPage from './seller/OrdersPage';
import SalesAnalytics from './seller/SalesAnalytics';
import BuyerMessages from './seller/BuyerMessages';
import SellerSupport from './seller/SellerSupport';
import ProductsPage from './seller/ProductsPage';
import { toast } from 'sonner';

// Placeholder component for seller dashboard sections that haven't been implemented yet
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">{title}</h1>
    <p className="text-gray-500">This feature is coming soon.</p>
  </div>
);

// Dashboard overview component
const DashboardOverview = () => {
  React.useEffect(() => {
    toast.success("Welcome to your seller dashboard!");
  }, []);
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Seller Dashboard</h1>
      <p className="text-gray-500 mb-6">Welcome to your seller control panel</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-lg font-medium mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <div className="p-3 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 cursor-pointer">
              Add new product
            </div>
            <div className="p-3 bg-purple-50 text-purple-700 rounded-md hover:bg-purple-100 cursor-pointer">
              View open orders
            </div>
            <div className="p-3 bg-green-50 text-green-700 rounded-md hover:bg-green-100 cursor-pointer">
              Message customers
            </div>
            <div className="p-3 bg-amber-50 text-amber-700 rounded-md hover:bg-amber-100 cursor-pointer">
              View analytics
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-lg font-medium mb-4">Recent Orders</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 border-b">
              <div>
                <div className="font-medium">#ORD-7856</div>
                <div className="text-sm text-gray-500">2 items · $156.99</div>
              </div>
              <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">Processing</span>
            </div>
            <div className="flex justify-between items-center p-3 border-b">
              <div>
                <div className="font-medium">#ORD-7855</div>
                <div className="text-sm text-gray-500">1 item · $45.00</div>
              </div>
              <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Shipped</span>
            </div>
            <div className="flex justify-between items-center p-3">
              <div>
                <div className="font-medium">#ORD-7854</div>
                <div className="text-sm text-gray-500">3 items · $97.50</div>
              </div>
              <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">Delivered</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-lg font-medium mb-4">Store Performance</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Conversion Rate</span>
                <span className="text-sm font-medium">3.2%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full w-[32%]"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Review Score</span>
                <span className="text-sm font-medium">4.8/5</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full w-[96%]"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Response Rate</span>
                <span className="text-sm font-medium">92%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-600 h-2 rounded-full w-[92%]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Recent Messages</h2>
            <span className="text-blue-600 text-sm cursor-pointer hover:underline">View All</span>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-md">
              <div className="flex justify-between">
                <span className="font-medium">Alex Johnson</span>
                <span className="text-xs text-gray-500">10:42 AM</span>
              </div>
              <p className="text-sm text-gray-600 truncate">Hi there! I was wondering about the shipping time for...</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-md">
              <div className="flex justify-between">
                <span className="font-medium">Maria Rodriguez</span>
                <span className="text-xs text-gray-500">Yesterday</span>
              </div>
              <p className="text-sm text-gray-600 truncate">Thank you for your quick response!</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-md">
              <div className="flex justify-between">
                <span className="font-medium">John Smith</span>
                <span className="text-xs text-gray-500">Yesterday</span>
              </div>
              <p className="text-sm text-gray-600 truncate">Is the ceramic planter still available?</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Inventory Status</h2>
            <span className="text-blue-600 text-sm cursor-pointer hover:underline">Manage Inventory</span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-red-50 text-red-800 rounded-md">
              <span>Low Stock Items</span>
              <span className="font-bold">5</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
              <span>Out of Stock Items</span>
              <span className="font-bold">2</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
              <span>Total Products</span>
              <span className="font-bold">32</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SettingsPage = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-6">Settings</h1>
    <div className="bg-white p-6 rounded-lg shadow border">
      <h2 className="text-lg font-medium mb-4">Store Settings</h2>
      <p className="text-gray-500">Configure your store preferences, shipping options, and payment methods.</p>
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">Settings functionality coming soon!</p>
      </div>
    </div>
  </div>
);

const SellerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (user.role !== 'seller' && user.role !== 'admin') {
      // If not a seller or admin, redirect to home
      navigate('/');
    }
  }, [user, navigate]);

  if (!user) {
    return null; // or a loading indicator
  }

  return (
    <SidebarProvider>
      <Routes>
        <Route path="/" element={<SellerLayout><DashboardOverview /></SellerLayout>} />
        <Route path="/products" element={<SellerLayout><ProductsPage /></SellerLayout>} />
        <Route path="/add-product" element={<SellerLayout><AddProductPage /></SellerLayout>} />
        <Route path="/orders" element={<SellerLayout><OrdersPage /></SellerLayout>} />
        <Route path="/analytics" element={<SellerLayout><SalesAnalytics /></SellerLayout>} />
        <Route path="/messages" element={<SellerLayout><BuyerMessages /></SellerLayout>} />
        <Route path="/support" element={<SellerLayout><SellerSupport /></SellerLayout>} />
        <Route path="/settings" element={<SellerLayout><SettingsPage /></SellerLayout>} />
      </Routes>
    </SidebarProvider>
  );
};

export default SellerDashboard;
