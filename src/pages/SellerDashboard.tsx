
import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import SellerLayout from './seller/SellerLayout';
import AddProductPage from './seller/AddProductPage';
import OrdersPage from './seller/OrdersPage';
import AnalyticsPage from './seller/AnalyticsPage';
import MessagesPage from './seller/MessagesPage';
import SupportPage from './seller/SupportPage';

// Placeholder components for other seller dashboard sections
const DashboardOverview = () => <div className="p-6">Seller Dashboard Overview (Coming Soon)</div>;
const ProductsPage = () => <div className="p-6">Products Management (Coming Soon)</div>;
const SettingsPage = () => <div className="p-6">Seller Settings (Coming Soon)</div>;

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
    <Routes>
      <Route path="/" element={<SellerLayout><DashboardOverview /></SellerLayout>} />
      <Route path="/products" element={<SellerLayout><ProductsPage /></SellerLayout>} />
      <Route path="/add-product" element={<SellerLayout><AddProductPage /></SellerLayout>} />
      <Route path="/orders" element={<SellerLayout><OrdersPage /></SellerLayout>} />
      <Route path="/analytics" element={<SellerLayout><AnalyticsPage /></SellerLayout>} />
      <Route path="/messages" element={<SellerLayout><MessagesPage /></SellerLayout>} />
      <Route path="/support" element={<SellerLayout><SupportPage /></SellerLayout>} />
      <Route path="/settings" element={<SellerLayout><SettingsPage /></SellerLayout>} />
    </Routes>
  );
};

export default SellerDashboard;
