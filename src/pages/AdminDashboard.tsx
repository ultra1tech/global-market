
import React from 'react';
import { Routes, Route, NavLink, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  ShoppingBag, 
  DollarSign, 
  Settings, 
  ShieldAlert, 
  Store, 
  BarChart2, 
  Home,
  LogOut,
  Menu
} from 'lucide-react';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger, useSidebar } from '@/components/ui/sidebar';

import DashboardOverview from './admin/DashboardOverview';
import UserManagement from './admin/UserManagement';
import OrderMonitoring from './admin/OrderMonitoring';
import ReportsAnalytics from './admin/ReportsAnalytics';
import SettingsPage from './admin/SettingsPage';
import StoresManagement from './admin/StoresManagement';

// Create a placeholder component for admin pages that haven't been implemented yet
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">{title}</h1>
    <p className="text-gray-500">This feature is coming soon.</p>
  </div>
);

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { open, setOpen } = useSidebar();

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

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar using the SidebarProvider component */}
      <Sidebar>
        <SidebarHeader className="border-b border-gray-800 p-4">
          <div className="flex items-center space-x-2">
            <ShieldAlert size={20} className="text-primary" />
            <h2 className="font-semibold text-xl">Admin Panel</h2>
          </div>
          <p className="text-sm text-muted-foreground">{user.name}</p>
        </SidebarHeader>
        
        <SidebarContent className="bg-sidebar text-sidebar-foreground">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Dashboard">
                <NavLink 
                  to="/admin" 
                  end
                  className={({ isActive }) => 
                    `flex items-center p-2 rounded-md ${
                      isActive 
                        ? 'bg-primary text-primary-foreground font-medium' 
                        : 'text-sidebar-foreground hover:bg-sidebar-accent'
                    }`
                  }
                >
                  <Home className="mr-3 h-5 w-5" />
                  <span>Dashboard</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Users">
                <NavLink 
                  to="/admin/users" 
                  className={({ isActive }) => 
                    `flex items-center p-2 rounded-md ${
                      isActive 
                        ? 'bg-primary text-primary-foreground font-medium' 
                        : 'text-sidebar-foreground hover:bg-sidebar-accent'
                    }`
                  }
                >
                  <Users className="mr-3 h-5 w-5" />
                  <span>Users</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Stores">
                <NavLink 
                  to="/admin/stores" 
                  className={({ isActive }) => 
                    `flex items-center p-2 rounded-md ${
                      isActive 
                        ? 'bg-primary text-primary-foreground font-medium' 
                        : 'text-sidebar-foreground hover:bg-sidebar-accent'
                    }`
                  }
                >
                  <Store className="mr-3 h-5 w-5" />
                  <span>Stores</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Orders">
                <NavLink 
                  to="/admin/orders" 
                  className={({ isActive }) => 
                    `flex items-center p-2 rounded-md ${
                      isActive 
                        ? 'bg-primary text-primary-foreground font-medium' 
                        : 'text-sidebar-foreground hover:bg-sidebar-accent'
                    }`
                  }
                >
                  <ShoppingBag className="mr-3 h-5 w-5" />
                  <span>Orders</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Reports">
                <NavLink 
                  to="/admin/reports" 
                  className={({ isActive }) => 
                    `flex items-center p-2 rounded-md ${
                      isActive 
                        ? 'bg-primary text-primary-foreground font-medium' 
                        : 'text-sidebar-foreground hover:bg-sidebar-accent'
                    }`
                  }
                >
                  <BarChart2 className="mr-3 h-5 w-5" />
                  <span>Reports</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Settings">
                <NavLink 
                  to="/admin/settings" 
                  className={({ isActive }) => 
                    `flex items-center p-2 rounded-md ${
                      isActive 
                        ? 'bg-primary text-primary-foreground font-medium' 
                        : 'text-sidebar-foreground hover:bg-sidebar-accent'
                    }`
                  }
                >
                  <Settings className="mr-3 h-5 w-5" />
                  <span>Settings</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        
        <SidebarFooter className="bg-sidebar text-sidebar-foreground">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent" 
            onClick={handleLogout}
          >
            <LogOut className="mr-3 h-5 w-5" />
            <span>Logout</span>
          </Button>
        </SidebarFooter>
      </Sidebar>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <div className="flex items-center">
            <SidebarTrigger className="mr-2" />
            <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">
              Welcome, {user.name}
            </span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </header>
        
        <main>
          <Routes>
            <Route path="/" element={<DashboardOverview />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/stores" element={<StoresManagement />} />
            <Route path="/orders" element={<OrderMonitoring />} />
            <Route path="/reports" element={<ReportsAnalytics />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
