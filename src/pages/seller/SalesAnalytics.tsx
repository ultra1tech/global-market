
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SimpleBarChart from '@/components/dashboard/SimpleBarChart';
import SimpleLineChart from '@/components/dashboard/SimpleLineChart';
import SimplePieChart from '@/components/dashboard/SimplePieChart';
import StatCard from '@/components/dashboard/StatCard';
import { ShoppingBag, DollarSign, Heart, TrendingUp } from 'lucide-react';
import DataTable from '@/components/dashboard/DataTable';

// Mock data for charts
const weeklySales = [
  { name: 'Mon', value: 750 },
  { name: 'Tue', value: 620 },
  { name: 'Wed', value: 890 },
  { name: 'Thu', value: 720 },
  { name: 'Fri', value: 980 },
  { name: 'Sat', value: 1200 },
  { name: 'Sun', value: 950 },
];

const monthlySales = [
  { name: 'Jan', value: 3200 },
  { name: 'Feb', value: 3800 },
  { name: 'Mar', value: 4100 },
  { name: 'Apr', value: 3900 },
  { name: 'May', value: 4800 },
];

const productPerformance = [
  { name: 'Wooden Bowl', value: 28 },
  { name: 'Coffee Mug', value: 22 },
  { name: 'Wall Hanging', value: 18 },
  { name: 'Candle Set', value: 14 },
  { name: 'Ceramic Planter', value: 12 },
  { name: 'Other', value: 6 },
];

const customerSegmentation = [
  { name: 'New Customers', value: 35 },
  { name: 'Returning Customers', value: 48 },
  { name: 'Loyal Customers', value: 17 },
];

// Top products table data
const topProducts = [
  { 
    id: 'prod-1', 
    name: 'Handcrafted Wooden Bowl', 
    sales: 28, 
    revenue: '$1,288.00', 
    rating: 4.7 
  },
  { 
    id: 'prod-3', 
    name: 'Artisan Coffee Mug', 
    sales: 42, 
    revenue: '$777.00', 
    rating: 4.8 
  },
  { 
    id: 'prod-5', 
    name: 'Natural Soap Bar', 
    sales: 87, 
    revenue: '$782.13', 
    rating: 4.6 
  },
  { 
    id: 'prod-4', 
    name: 'Hand-woven Wall Hanging', 
    sales: 19, 
    revenue: '$1,235.00', 
    rating: 4.9 
  },
  { 
    id: 'prod-8', 
    name: 'Beeswax Candle Set', 
    sales: 31, 
    revenue: '$618.45', 
    rating: 4.7 
  },
];

const topProductColumns = [
  { key: 'name', header: 'Product Name' },
  { key: 'sales', header: 'Units Sold' },
  { key: 'revenue', header: 'Revenue' },
  { 
    key: 'rating', 
    header: 'Rating',
    render: (value: number) => (
      <div className="flex items-center">
        <span className="mr-1">{value}</span>
        <span className="text-yellow-500">★</span>
      </div>
    )
  },
];

const SalesAnalytics = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Sales Analytics</h1>
      <p className="text-gray-500 mb-6">Track your sales performance and customer trends</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total Sales"
          value="$12,456"
          icon={<DollarSign size={24} />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Orders"
          value="156"
          icon={<ShoppingBag size={24} />}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Conversion Rate"
          value="3.2%"
          icon={<TrendingUp size={24} />}
          trend={{ value: 0.5, isPositive: true }}
        />
        <StatCard
          title="Wishlisted"
          value="254"
          icon={<Heart size={24} />}
          trend={{ value: 15, isPositive: true }}
        />
      </div>
      
      <Tabs defaultValue="overview" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SimpleLineChart
              title="Weekly Sales Performance"
              data={weeklySales}
            />
            <SimpleBarChart
              title="Monthly Sales"
              data={monthlySales}
            />
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Top Selling Products</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={topProductColumns}
                data={topProducts}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="products" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SimplePieChart
              title="Product Performance"
              data={productPerformance}
            />
            <Card>
              <CardHeader>
                <CardTitle>Product Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Best Selling Categories</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>Home & Kitchen</span>
                        <span className="font-medium">42%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full w-[42%]"></div>
                      </div>
                    </div>
                    <div className="space-y-2 mt-4">
                      <div className="flex justify-between items-center">
                        <span>Home Decor</span>
                        <span className="font-medium">28%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full w-[28%]"></div>
                      </div>
                    </div>
                    <div className="space-y-2 mt-4">
                      <div className="flex justify-between items-center">
                        <span>Beauty</span>
                        <span className="font-medium">18%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full w-[18%]"></div>
                      </div>
                    </div>
                    <div className="space-y-2 mt-4">
                      <div className="flex justify-between items-center">
                        <span>Other</span>
                        <span className="font-medium">12%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full w-[12%]"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Inventory Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border rounded-lg p-4">
                  <div className="text-sm text-muted-foreground mb-1">Low Stock Products</div>
                  <div className="text-2xl font-bold">5</div>
                  <div className="text-sm text-red-600 mt-1">Requires attention</div>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="text-sm text-muted-foreground mb-1">Out of Stock</div>
                  <div className="text-2xl font-bold">2</div>
                  <div className="text-sm text-red-600 mt-1">Urgent restock needed</div>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="text-sm text-muted-foreground mb-1">Avg. Inventory Turnover</div>
                  <div className="text-2xl font-bold">14 days</div>
                  <div className="text-sm text-green-600 mt-1">Good performance</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="customers" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SimplePieChart
              title="Customer Segmentation"
              data={customerSegmentation}
            />
            <Card>
              <CardHeader>
                <CardTitle>Customer Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Returning Customer Rate</h3>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-4">
                        <div className="bg-blue-600 h-4 rounded-full w-[65%] text-center text-xs text-white">65%</div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">65% of customers return to make additional purchases</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Average Order Value</h3>
                    <div className="text-2xl font-bold">$78.45</div>
                    <p className="text-sm text-green-600 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      Up 12% from previous month
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Geographic Distribution</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>United States</span>
                        <span>68%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Europe</span>
                        <span>22%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Asia</span>
                        <span>7%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Other</span>
                        <span>3%</span>
                      </div>
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

export default SalesAnalytics;
