
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Users, 
  ShoppingBag, 
  Settings, 
  ShieldAlert, 
  Store, 
  BarChart2, 
  Home,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem 
} from '@/components/ui/sidebar';

interface AdminSidebarProps {
  userName: string;
  onLogout: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ userName, onLogout }) => {
  return (
    <>
      <SidebarHeader className="border-b border-gray-800 p-4">
        <div className="flex items-center space-x-2">
          <ShieldAlert size={20} className="text-primary" />
          <h2 className="font-semibold text-xl">Admin Panel</h2>
        </div>
        <p className="text-sm text-muted-foreground">{userName}</p>
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
          onClick={onLogout}
        >
          <LogOut className="mr-3 h-5 w-5" />
          <span>Logout</span>
        </Button>
      </SidebarFooter>
    </>
  );
};

export default AdminSidebar;
