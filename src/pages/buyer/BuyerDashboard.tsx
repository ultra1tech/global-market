
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Package, Heart, Star, ShoppingCart } from 'lucide-react';
import BuyerLayout from './BuyerLayout';

// Mock recent orders data
const recentOrders = [
  {
    id: 'ORD-1234',
    date: '2023-05-10',
    status: 'Delivered',
    total: 78.99
  },
  {
    id: 'ORD-1235',
    date: '2023-05-05',
    status: 'Shipped',
    total: 124.50
  },
  {
    id: 'ORD-1236',
    date: '2023-05-01',
    status: 'Processing',
    total: 42.75
  }
];

const BuyerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <BuyerLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-500">Welcome back, {user.name}!</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="p-4 flex items-center">
          <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
            <Package size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Orders</p>
            <h4 className="text-xl font-bold">12</h4>
          </div>
        </Card>
        
        <Card className="p-4 flex items-center">
          <div className="p-3 rounded-full bg-red-100 text-red-600 mr-4">
            <Heart size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Wishlist</p>
            <h4 className="text-xl font-bold">24</h4>
          </div>
        </Card>
        
        <Card className="p-4 flex items-center">
          <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
            <Star size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Reviews</p>
            <h4 className="text-xl font-bold">8</h4>
          </div>
        </Card>

        <Card className="p-4 flex items-center">
          <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
            <ShoppingCart size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Cart</p>
            <h4 className="text-xl font-bold">3</h4>
          </div>
        </Card>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Recent Orders</h2>
          <Button variant="outline" size="sm" onClick={() => navigate('/buyer/orders')}>
            View All
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="py-4 px-4 whitespace-nowrap font-medium">{order.id}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{order.date}</td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span 
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                        ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' : 
                          'bg-yellow-100 text-yellow-800'}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">${order.total.toFixed(2)}</td>
                  <td className="py-4 px-4 whitespace-nowrap text-right">
                    <Button variant="link" size="sm">View Details</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-medium mb-4">Recently Viewed Products</h2>
          <div className="space-y-4">
            <div className="flex items-center p-4 border rounded-lg">
              <img src="https://via.placeholder.com/80" alt="Product" className="w-16 h-16 object-cover rounded" />
              <div className="ml-4">
                <h4 className="font-medium">Handmade Ceramic Bowl</h4>
                <p className="text-sm text-gray-600">$45.99</p>
              </div>
            </div>
            <div className="flex items-center p-4 border rounded-lg">
              <img src="https://via.placeholder.com/80" alt="Product" className="w-16 h-16 object-cover rounded" />
              <div className="ml-4">
                <h4 className="font-medium">Organic Cotton T-Shirt</h4>
                <p className="text-sm text-gray-600">$29.99</p>
              </div>
            </div>
            <div className="flex items-center p-4 border rounded-lg">
              <img src="https://via.placeholder.com/80" alt="Product" className="w-16 h-16 object-cover rounded" />
              <div className="ml-4">
                <h4 className="font-medium">Handcrafted Leather Wallet</h4>
                <p className="text-sm text-gray-600">$75.00</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-medium mb-4">Recommended For You</h2>
          <div className="space-y-4">
            <div className="flex items-center p-4 border rounded-lg">
              <img src="https://via.placeholder.com/80" alt="Product" className="w-16 h-16 object-cover rounded" />
              <div className="ml-4">
                <h4 className="font-medium">Artisan Olive Wood Utensils</h4>
                <p className="text-sm text-gray-600">$32.50</p>
              </div>
            </div>
            <div className="flex items-center p-4 border rounded-lg">
              <img src="https://via.placeholder.com/80" alt="Product" className="w-16 h-16 object-cover rounded" />
              <div className="ml-4">
                <h4 className="font-medium">Hand-painted Silk Scarf</h4>
                <p className="text-sm text-gray-600">$58.99</p>
              </div>
            </div>
            <div className="flex items-center p-4 border rounded-lg">
              <img src="https://via.placeholder.com/80" alt="Product" className="w-16 h-16 object-cover rounded" />
              <div className="ml-4">
                <h4 className="font-medium">Natural Beeswax Candles</h4>
                <p className="text-sm text-gray-600">$19.99</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BuyerLayout>
  );
};

export default BuyerDashboard;
