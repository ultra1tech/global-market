
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, LogOut, Package, Heart, MessageCircle, Store, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuGroup
} from "@/components/ui/dropdown-menu";

const UserMenuDropdown: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Get dynamic dashboard link based on user role
  const getDashboardLink = () => {
    if (!user) return "/login";
    
    switch(user.role) {
      case "buyer": return "/buyer/dashboard";
      case "seller": return "/seller-dashboard";
      case "admin": return "/admin";
      default: return "/";
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="hidden md:flex items-center space-x-2">
        <Button variant="ghost" asChild className="text-sm">
          <Link to="/login">Sign In</Link>
        </Button>
        <Button asChild className="text-sm">
          <Link to="/register">Register</Link>
        </Button>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          {user?.avatar ? (
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="h-8 w-8 rounded-full object-cover" 
            />
          ) : (
            <User size={20} />
          )}
          <span className="sr-only">User menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to={getDashboardLink()}>
              <User className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
          
          {user?.role === "buyer" && (
            <>
              <DropdownMenuItem asChild>
                <Link to="/buyer/orders">
                  <Package className="mr-2 h-4 w-4" />
                  <span>My Orders</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/buyer/wishlist">
                  <Heart className="mr-2 h-4 w-4" />
                  <span>Wishlist</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/buyer/messages">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  <span>Messages</span>
                </Link>
              </DropdownMenuItem>
            </>
          )}
          
          {user?.role === "seller" && (
            <>
              <DropdownMenuItem asChild>
                <Link to="/seller-dashboard/products">
                  <Package className="mr-2 h-4 w-4" />
                  <span>My Products</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/seller-dashboard/orders">
                  <Package className="mr-2 h-4 w-4" />
                  <span>Orders</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/seller-dashboard/settings">
                  <Store className="mr-2 h-4 w-4" />
                  <span>Store Settings</span>
                </Link>
              </DropdownMenuItem>
            </>
          )}
          
          {user?.role === "admin" && (
            <>
              <DropdownMenuItem asChild>
                <Link to="/admin">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Admin Panel</span>
                </Link>
              </DropdownMenuItem>
            </>
          )}
          
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-600" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sign Out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenuDropdown;
