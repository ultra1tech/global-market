
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SimpleBarChart from '@/components/dashboard/SimpleBarChart';
import SimplePieChart from '@/components/dashboard/SimplePieChart';
import SimpleLineChart from '@/components/dashboard/SimpleLineChart';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatCard from '@/components/dashboard/StatCard';
import { DollarSign, ShoppingBag, ArrowUp, ArrowDown } from 'lucide-react';

// Mock data for charts
const weeklyRevenue = [
  { name: 'Week 1', value: 12450 },
  { name: 'Week 2', value: 14800 },
  { name: 'Week 3', value: 13200 },
  { name: 'Week 4', value: 15900 },
];

const monthlySales = [
  { name: 'Jan', value: 65 },
  { name: 'Feb', value: 75 },
  { name: 'Mar', value: 85 },
  { name: 'Apr', value: 72 },
  { name: 'May', value: 92 },
];

const categoryDistribution = [
  { name: 'Electronics', value: 35 },
  { name: 'Fashion', value: 30 },
  { name: 'Home', value: 15 },
  { name: 'Beauty', value: 10 },
  { name: 'Food', value: 10 },
];

const salesByRegion = [
  { name: 'North', value: 25 },
  { name: 'South', value: 35 },
  { name: 'East', value: 20 },
  { name: 'West', value: 20 },
];

const dailyOrders = [
  { name: 'Mon', value: 45 },
  { name: 'Tue', value: 52 },
  { name: 'Wed', value: 49 },
  { name: 'Thu', value: 63 },
  { name: 'Fri', value: 76 },
  { name: 'Sat', value: 85 },
  { name: 'Sun', value: 79 },
];

const ReportsAnalytics = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Reports & Analytics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatCard
          title="Monthly Revenue"
          value="$56,289"
          icon={<DollarSign size={24} />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Average Order Value"
          value="$86.45"
          icon={<DollarSign size={24} />}
          trend={{ value: 3, isPositive: true }}
        />
        <StatCard
          title="Total Orders"
          value="652"
          icon={<ShoppingBag size={24} />}
          trend={{ value: 8, isPositive: true }}
        />
      </div>
      
      <Tabs defaultValue="sales" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>
        
        <TabsContent value="sales" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SimpleBarChart
              title="Monthly Revenue Trend"
              data={weeklyRevenue}
            />
            <SimplePieChart
              title="Sales Distribution by Category"
              data={categoryDistribution}
            />
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Revenue Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-medium mb-2">Top Selling Categories</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span>Electronics</span>
                      <span className="font-medium">$18,450</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Fashion</span>
                      <span className="font-medium">$15,890</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Home Decor</span>
                      <span className="font-medium">$12,350</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Beauty</span>
                      <span className="font-medium">$9,780</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Top Performing Sellers</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span>Artisan Crafts</span>
                      <span className="font-medium">$8,450</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Fashion Forward</span>
                      <span className="font-medium">$7,890</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Tech Gadgets</span>
                      <span className="font-medium">$6,740</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Home Decor Plus</span>
                      <span className="font-medium">$5,620</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Sales Growth</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between items-center">
                      <span>Week-over-Week</span>
                      <span className="flex items-center text-green-600 font-medium">
                        <ArrowUp size={16} className="mr-1" />
                        8.5%
                      </span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Month-over-Month</span>
                      <span className="flex items-center text-green-600 font-medium">
                        <ArrowUp size={16} className="mr-1" />
                        12.3%
                      </span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Quarter-over-Quarter</span>
                      <span className="flex items-center text-green-600 font-medium">
                        <ArrowUp size={16} className="mr-1" />
                        15.8%
                      </span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Year-over-Year</span>
                      <span className="flex items-center text-green-600 font-medium">
                        <ArrowUp size={16} className="mr-1" />
                        24.2%
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="orders" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SimpleLineChart
              title="Daily Orders"
              data={dailyOrders}
            />
            <Card>
              <CardHeader>
                <CardTitle>Order Status Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
                      <span>Processing</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="font-medium">156</span>
                      <span className="text-sm text-muted-foreground">24%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-purple-500 mr-2"></div>
                      <span>Shipped</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="font-medium">215</span>
                      <span className="text-sm text-muted-foreground">33%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                      <span>Delivered</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="font-medium">248</span>
                      <span className="text-sm text-muted-foreground">38%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
                      <span>Cancelled</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="font-medium">33</span>
                      <span className="text-sm text-muted-foreground">5%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="products" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SimplePieChart
              title="Category Distribution"
              data={categoryDistribution}
            />
            <SimpleBarChart
              title="Monthly Product Additions"
              data={monthlySales}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="users" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SimplePieChart
              title="Regional User Distribution"
              data={salesByRegion}
            />
            <Card>
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">New Buyers</h3>
                    <div className="flex items-center">
                      <div className="flex-1 bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full w-[75%]"></div>
                      </div>
                      <span className="text-sm font-medium text-muted-foreground ml-4">+214 (75%)</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">New Sellers</h3>
                    <div className="flex items-center">
                      <div className="flex-1 bg-gray-200 rounded-full h-2.5">
                        <div className="bg-purple-600 h-2.5 rounded-full w-[45%]"></div>
                      </div>
                      <span className="text-sm font-medium text-muted-foreground ml-4">+45 (45%)</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Active Users</h3>
                    <div className="flex items-center">
                      <div className="flex-1 bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-600 h-2.5 rounded-full w-[85%]"></div>
                      </div>
                      <span className="text-sm font-medium text-muted-foreground ml-4">+1,245 (85%)</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Inactive Users</h3>
                    <div className="flex items-center">
                      <div className="flex-1 bg-gray-200 rounded-full h-2.5">
                        <div className="bg-red-600 h-2.5 rounded-full w-[15%]"></div>
                      </div>
                      <span className="text-sm font-medium text-muted-foreground ml-4">-89 (15%)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsAnalytics;
