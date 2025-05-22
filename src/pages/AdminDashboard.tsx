
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from '@/layouts/AdminLayout';

import DashboardOverview from './admin/DashboardOverview';
import UserManagement from './admin/UserManagement';
import OrderMonitoring from './admin/OrderMonitoring';
import ReportsAnalytics from './admin/ReportsAnalytics';
import SettingsPage from './admin/SettingsPage';
import StoresManagement from './admin/StoresManagement';

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<DashboardOverview />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/stores" element={<StoresManagement />} />
        <Route path="/orders" element={<OrderMonitoring />} />
        <Route path="/reports" element={<ReportsAnalytics />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminDashboard;
