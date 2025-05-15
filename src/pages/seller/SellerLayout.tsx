
import React, { ReactNode } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Package, 
  ShoppingCart, 
  BarChart2, 
  MessageCircle, 
  HelpCircle, 
  Settings,
  Store,
  PlusSquare,
  Home,
  LogOut,
} from 'lucide-react';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarTrigger, 
  useSidebar 
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

interface SellerLayoutProps {
  children: ReactNode;
}

const SellerLayout: React.FC<SellerLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { open } = useSidebar(); // Updated to use open instead of collapsed
  
  if (!user) {
    return null;
  }
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar>
        <SidebarHeader className="p-4 border-b">
          <div className="flex items-center">
            <Store className="mr-2 h-5 w-5 text-primary" />
            <div>
              <h2 className="font-semibold text-lg">Seller Dashboard</h2>
              <p className="text-sm text-muted-foreground">{user.name}</p>
            </div>
          </div>
        </SidebarHeader>
        
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Overview">
                <NavLink 
                  to="/seller-dashboard" 
                  end
                  className={({ isActive }) => 
                    `flex items-center p-2 rounded-md ${
                      isActive 
                        ? 'bg-primary text-primary-foreground font-medium' 
                        : 'text-foreground hover:bg-muted'
                    }`
                  }
                >
                  <Home className="mr-3 h-5 w-5" />
                  <span>Overview</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Products">
                <NavLink 
                  to="/seller-dashboard/products" 
                  className={({ isActive }) => 
                    `flex items-center p-2 rounded-md ${
                      isActive 
                        ? 'bg-primary text-primary-foreground font-medium' 
                        : 'text-foreground hover:bg-muted'
                    }`
                  }
                >
                  <Package className="mr-3 h-5 w-5" />
                  <span>Products</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Add Product">
                <NavLink 
                  to="/seller-dashboard/add-product" 
                  className={({ isActive }) => 
                    `flex items-center p-2 rounded-md ${
                      isActive 
                        ? 'bg-primary text-primary-foreground font-medium' 
                        : 'text-foreground hover:bg-muted'
                    }`
                  }
                >
                  <PlusSquare className="mr-3 h-5 w-5" />
                  <span>Add Product</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Orders">
                <NavLink 
                  to="/seller-dashboard/orders" 
                  className={({ isActive }) => 
                    `flex items-center p-2 rounded-md ${
                      isActive 
                        ? 'bg-primary text-primary-foreground font-medium' 
                        : 'text-foreground hover:bg-muted'
                    }`
                  }
                >
                  <ShoppingCart className="mr-3 h-5 w-5" />
                  <span>Orders</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Analytics">
                <NavLink 
                  to="/seller-dashboard/analytics" 
                  className={({ isActive }) => 
                    `flex items-center p-2 rounded-md ${
                      isActive 
                        ? 'bg-primary text-primary-foreground font-medium' 
                        : 'text-foreground hover:bg-muted'
                    }`
                  }
                >
                  <BarChart2 className="mr-3 h-5 w-5" />
                  <span>Analytics</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Messages">
                <NavLink 
                  to="/seller-dashboard/messages" 
                  className={({ isActive }) => 
                    `flex items-center p-2 rounded-md ${
                      isActive 
                        ? 'bg-primary text-primary-foreground font-medium' 
                        : 'text-foreground hover:bg-muted'
                    }`
                  }
                >
                  <MessageCircle className="mr-3 h-5 w-5" />
                  <span className="flex-1">Messages</span>
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    3
                  </span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Support">
                <NavLink 
                  to="/seller-dashboard/support" 
                  className={({ isActive }) => 
                    `flex items-center p-2 rounded-md ${
                      isActive 
                        ? 'bg-primary text-primary-foreground font-medium' 
                        : 'text-foreground hover:bg-muted'
                    }`
                  }
                >
                  <HelpCircle className="mr-3 h-5 w-5" />
                  <span>Support</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Settings">
                <NavLink 
                  to="/seller-dashboard/settings" 
                  className={({ isActive }) => 
                    `flex items-center p-2 rounded-md ${
                      isActive 
                        ? 'bg-primary text-primary-foreground font-medium' 
                        : 'text-foreground hover:bg-muted'
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
        
        <SidebarFooter>
          <Button 
            variant="ghost" 
            className="w-full justify-start" 
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
            <h1 className="text-xl font-semibold">Seller Dashboard</h1>
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
          {children}
        </main>
      </div>
    </div>
  );
};

export default SellerLayout;
