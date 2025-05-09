
import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Package, BarChart, Users, Settings, PlusCircle } from 'lucide-react';

// Placeholder components for seller dashboard sections
const DashboardOverview = () => <div className="p-6">Dashboard Overview Content</div>;
const ProductsManagement = () => <div className="p-6">Products Management Content</div>;
const OrdersManagement = () => <div className="p-6">Orders Management Content</div>;
const CustomerManagement = () => <div className="p-6">Customer Management Content</div>;
const SettingsManagement = () => <div className="p-6">Settings Management Content</div>;

const SellerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect to the login page if there's no user
  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (user.role !== 'seller' && user.role !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-xl">Seller Dashboard</h2>
          <p className="text-sm text-gray-500">{user.name}</p>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link 
                to="/seller-dashboard" 
                className="flex items-center p-2 rounded-md hover:bg-gray-100"
              >
                <BarChart size={18} className="mr-3" />
                Overview
              </Link>
            </li>
            <li>
              <Link 
                to="/seller-dashboard/products" 
                className="flex items-center p-2 rounded-md hover:bg-gray-100"
              >
                <Package size={18} className="mr-3" />
                Products
              </Link>
            </li>
            <li>
              <Link 
                to="/seller-dashboard/orders" 
                className="flex items-center p-2 rounded-md hover:bg-gray-100"
              >
                <Package size={18} className="mr-3" />
                Orders
              </Link>
            </li>
            <li>
              <Link 
                to="/seller-dashboard/customers" 
                className="flex items-center p-2 rounded-md hover:bg-gray-100"
              >
                <Users size={18} className="mr-3" />
                Customers
              </Link>
            </li>
            <li>
              <Link 
                to="/seller-dashboard/settings" 
                className="flex items-center p-2 rounded-md hover:bg-gray-100"
              >
                <Settings size={18} className="mr-3" />
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <Button>
            <PlusCircle size={18} className="mr-2" />
            Add New Product
          </Button>
        </header>
        
        <main>
          <Routes>
            <Route path="/" element={<DashboardOverview />} />
            <Route path="/products" element={<ProductsManagement />} />
            <Route path="/orders" element={<OrdersManagement />} />
            <Route path="/customers" element={<CustomerManagement />} />
            <Route path="/settings" element={<SettingsManagement />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default SellerDashboard;
