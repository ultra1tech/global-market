
import React from 'react';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';

interface AdminHeaderProps {
  userName: string;
  onLogout: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ userName, onLogout }) => {
  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center">
      <div className="flex items-center">
        <SidebarTrigger className="mr-2" />
        <h1 className="text-xl font-semibold">Admin Dashboard</h1>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-sm text-muted-foreground">
          Welcome, {userName}
        </span>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
