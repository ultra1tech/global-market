
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  User, 
  Package, 
  Heart, 
  MessageCircle, 
  Settings,
  Star,
  Home,
  LogOut
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarTrigger
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

const BuyerLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  if (!user) {
    return null; // Or loading state
  }
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar>
        <SidebarHeader className="p-4 bg-blue-600 text-white">
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold text-xl">
              {user.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-medium">{user.name}</h3>
              <p className="text-sm text-blue-200">{user.email}</p>
            </div>
          </div>
        </SidebarHeader>
        
        <SidebarContent className="pt-3">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Dashboard">
                <NavLink 
                  to="/buyer/dashboard" 
                  end
                  className={({ isActive }) => 
                    `flex items-center p-2 rounded-md ${
                      isActive 
                        ? 'bg-blue-50 text-blue-700 font-medium' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                >
                  <Home className="mr-3 h-5 w-5" />
                  <span>Dashboard</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Orders">
                <NavLink 
                  to="/buyer/orders" 
                  className={({ isActive }) => 
                    `flex items-center p-2 rounded-md ${
                      isActive 
                        ? 'bg-blue-50 text-blue-700 font-medium' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                >
                  <Package className="mr-3 h-5 w-5" />
                  <span>Orders</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Wishlist">
                <NavLink 
                  to="/buyer/wishlist" 
                  className={({ isActive }) => 
                    `flex items-center p-2 rounded-md ${
                      isActive 
                        ? 'bg-blue-50 text-blue-700 font-medium' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                >
                  <Heart className="mr-3 h-5 w-5" />
                  <span>Wishlist</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Reviews">
                <NavLink 
                  to="/buyer/reviews" 
                  className={({ isActive }) => 
                    `flex items-center p-2 rounded-md ${
                      isActive 
                        ? 'bg-blue-50 text-blue-700 font-medium' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                >
                  <Star className="mr-3 h-5 w-5" />
                  <span>Reviews</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Messages">
                <NavLink 
                  to="/buyer/messages" 
                  className={({ isActive }) => 
                    `flex items-center p-2 rounded-md ${
                      isActive 
                        ? 'bg-blue-50 text-blue-700 font-medium' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                >
                  <MessageCircle className="mr-3 h-5 w-5" />
                  <span className="flex-1">Messages</span>
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    2
                  </span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Profile">
                <NavLink 
                  to="/buyer/profile" 
                  className={({ isActive }) => 
                    `flex items-center p-2 rounded-md ${
                      isActive 
                        ? 'bg-blue-50 text-blue-700 font-medium' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                >
                  <User className="mr-3 h-5 w-5" />
                  <span>Profile</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Track Orders">
                <NavLink 
                  to="/buyer/track-orders" 
                  className={({ isActive }) => 
                    `flex items-center p-2 rounded-md ${
                      isActive 
                        ? 'bg-blue-50 text-blue-700 font-medium' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                >
                  <Package className="mr-3 h-5 w-5" />
                  <span>Track Orders</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Settings">
                <NavLink 
                  to="/buyer/settings" 
                  className={({ isActive }) => 
                    `flex items-center p-2 rounded-md ${
                      isActive 
                        ? 'bg-blue-50 text-blue-700 font-medium' 
                        : 'text-gray-700 hover:bg-gray-100'
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
            <h1 className="text-xl font-semibold">Buyer Dashboard</h1>
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
        
        <main className="p-6">
          <div className="bg-white rounded-lg shadow p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default BuyerLayout;
