
import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Users, ShoppingBag, DollarSign, Settings, ShieldAlert } from 'lucide-react';

// Placeholder components for admin dashboard sections
const DashboardOverview = () => <div className="p-6">Admin Dashboard Overview Content</div>;
const UsersManagement = () => <div className="p-6">Users Management Content</div>;
const StoresManagement = () => <div className="p-6">Stores Management Content</div>;
const OrdersManagement = () => <div className="p-6">Orders Management Content</div>;
const ReportsManagement = () => <div className="p-6">Reports and Analytics Content</div>;
const SettingsManagement = () => <div className="p-6">Admin Settings Content</div>;

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect to the login page if the user is not an admin
  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (user.role !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white">
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center space-x-2">
            <ShieldAlert size={20} />
            <h2 className="font-semibold text-xl">Admin Panel</h2>
          </div>
          <p className="text-sm text-gray-400">{user.name}</p>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-1">
            <li>
              <Link 
                to="/admin" 
                className="flex items-center p-2 rounded-md hover:bg-gray-800"
              >
                <div className="mr-3 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                  </svg>
                </div>
                Dashboard
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/users" 
                className="flex items-center p-2 rounded-md hover:bg-gray-800"
              >
                <Users size={18} className="mr-3 text-gray-400" />
                Users
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/stores" 
                className="flex items-center p-2 rounded-md hover:bg-gray-800"
              >
                <ShoppingBag size={18} className="mr-3 text-gray-400" />
                Stores
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/orders" 
                className="flex items-center p-2 rounded-md hover:bg-gray-800"
              >
                <ShoppingBag size={18} className="mr-3 text-gray-400" />
                Orders
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/reports" 
                className="flex items-center p-2 rounded-md hover:bg-gray-800"
              >
                <DollarSign size={18} className="mr-3 text-gray-400" />
                Reports
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/settings" 
                className="flex items-center p-2 rounded-md hover:bg-gray-800"
              >
                <Settings size={18} className="mr-3 text-gray-400" />
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm p-4">
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
        </header>
        
        <main>
          <Routes>
            <Route path="/" element={<DashboardOverview />} />
            <Route path="/users" element={<UsersManagement />} />
            <Route path="/stores" element={<StoresManagement />} />
            <Route path="/orders" element={<OrdersManagement />} />
            <Route path="/reports" element={<ReportsManagement />} />
            <Route path="/settings" element={<SettingsManagement />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
