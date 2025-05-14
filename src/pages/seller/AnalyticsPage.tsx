
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ArrowDownIcon, 
  ArrowUpIcon, 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  DollarSign,
  Calendar
} from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell
} from 'recharts';

// Mock data for charts
const salesData = [
  { month: 'Jan', sales: 1200 },
  { month: 'Feb', sales: 1900 },
  { month: 'Mar', sales: 1500 },
  { month: 'Apr', sales: 2400 },
  { month: 'May', sales: 2800 },
  { month: 'Jun', sales: 1900 },
];

const trafficData = [
  { name: 'Direct', value: 35 },
  { name: 'Search', value: 45 },
  { name: 'Social', value: 20 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const productPerformanceData = [
  { name: 'Product A', sales: 1200, returns: 20 },
  { name: 'Product B', sales: 900, returns: 10 },
  { name: 'Product C', sales: 800, returns: 15 },
  { name: 'Product D', sales: 1600, returns: 25 },
  { name: 'Product E', sales: 500, returns: 5 },
];

const StatCard = ({ 
  title, 
  value, 
  change, 
  positive = true, 
  icon: Icon
}: { 
  title: string;
  value: string;
  change: string;
  positive?: boolean;
  icon: React.ComponentType<any>;
}) => (
  <Card className="p-6">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h4 className="text-2xl font-bold mt-1">{value}</h4>
        <div className={`flex items-center mt-2 ${positive ? 'text-green-600' : 'text-red-600'}`}>
          {positive ? (
            <ArrowUpIcon className="h-4 w-4 mr-1" />
          ) : (
            <ArrowDownIcon className="h-4 w-4 mr-1" />
          )}
          <span className="text-sm font-medium">{change}</span>
        </div>
      </div>
      <div className="p-3 rounded-full bg-blue-50">
        <Icon className="h-6 w-6 text-blue-600" />
      </div>
    </div>
  </Card>
);

const AnalyticsPage: React.FC = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
          <p className="text-gray-500">Track your store's performance metrics</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Last 30 Days
          </Button>
          <Button>Download Report</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard 
          title="Total Sales" 
          value="$12,426" 
          change="12% vs last month" 
          positive={true} 
          icon={DollarSign}
        />
        <StatCard 
          title="Orders" 
          value="259" 
          change="8% vs last month" 
          positive={true} 
          icon={ShoppingBag}
        />
        <StatCard 
          title="New Customers" 
          value="54" 
          change="5% vs last month" 
          positive={true} 
          icon={Users}
        />
        <StatCard 
          title="Conversion Rate" 
          value="3.2%" 
          change="0.8% vs last month" 
          positive={false} 
          icon={TrendingUp}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="p-6 col-span-2">
          <h3 className="text-lg font-medium mb-4">Sales Performance</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Traffic Sources</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={trafficData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {trafficData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Product Performance</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={productPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#8884d8" name="Sales" />
              <Bar dataKey="returns" fill="#ff7f7f" name="Returns" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default AnalyticsPage;
