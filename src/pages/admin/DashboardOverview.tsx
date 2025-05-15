
import React from 'react';
import { Users, Store, ShoppingBag, DollarSign } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import SimpleBarChart from '@/components/dashboard/SimpleBarChart';
import SimplePieChart from '@/components/dashboard/SimplePieChart';
import SimpleLineChart from '@/components/dashboard/SimpleLineChart';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data for charts
const dailyRevenue = [
  { name: 'Mon', value: 1200 },
  { name: 'Tue', value: 1800 },
  { name: 'Wed', value: 2400 },
  { name: 'Thu', value: 1500 },
  { name: 'Fri', value: 2800 },
  { name: 'Sat', value: 3600 },
  { name: 'Sun', value: 3000 },
];

const monthlySales = [
  { name: 'Jan', value: 12000 },
  { name: 'Feb', value: 15000 },
  { name: 'Mar', value: 18000 },
  { name: 'Apr', value: 16000 },
  { name: 'May', value: 21000 },
  { name: 'Jun', value: 19000 },
];

const categoryDistribution = [
  { name: 'Electronics', value: 35 },
  { name: 'Fashion', value: 30 },
  { name: 'Home', value: 15 },
  { name: 'Beauty', value: 10 },
  { name: 'Food', value: 10 },
];

const DashboardOverview: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>
      <p className="text-muted-foreground">Welcome to your admin dashboard - here's what's happening today.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Buyers"
          value="5,234"
          icon={<Users size={24} />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Total Sellers"
          value="873"
          icon={<Store size={24} />}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Total Orders"
          value="12,543"
          icon={<ShoppingBag size={24} />}
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard
          title="Total Revenue"
          value="$234,567"
          icon={<DollarSign size={24} />}
          trend={{ value: 7, isPositive: true }}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SimpleLineChart 
          title="Daily Revenue (Last Week)" 
          data={dailyRevenue} 
        />
        <SimpleBarChart 
          title="Monthly Sales" 
          data={monthlySales} 
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b">
                <div>
                  <p className="font-medium">New Seller Registration</p>
                  <p className="text-sm text-muted-foreground">Art & Crafts Store registered</p>
                </div>
                <span className="text-sm text-muted-foreground">2 hours ago</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b">
                <div>
                  <p className="font-medium">Large Order Placed</p>
                  <p className="text-sm text-muted-foreground">Order #34522 - $1,240.00</p>
                </div>
                <span className="text-sm text-muted-foreground">5 hours ago</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b">
                <div>
                  <p className="font-medium">New Product Report</p>
                  <p className="text-sm text-muted-foreground">Product ID #8832 reported for quality issues</p>
                </div>
                <span className="text-sm text-muted-foreground">Yesterday</span>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">System Maintenance Completed</p>
                  <p className="text-sm text-muted-foreground">Database optimization finished</p>
                </div>
                <span className="text-sm text-muted-foreground">Yesterday</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <SimplePieChart 
          title="Sales by Category" 
          data={categoryDistribution} 
        />
      </div>
    </div>
  );
};

export default DashboardOverview;
