
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Sidebar, useSidebar } from '@/components/ui/sidebar';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // Redirect to the login page if the user is not an admin
  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (user.role !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar using the Sidebar component */}
      <Sidebar>
        <AdminSidebar userName={user.name} onLogout={handleLogout} />
      </Sidebar>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <AdminHeader userName={user.name} onLogout={handleLogout} />
        
        <main>
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
