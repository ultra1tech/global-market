
import React, { useState } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Package,
  Heart,
  User,
  Settings,
  MessageCircle,
  MapPin,
  CreditCard,
  ShoppingBag,
  Star
} from 'lucide-react';
import MainLayout from '@/components/layouts/MainLayout';
import { Badge } from '@/components/ui/badge';

// Buyer Dashboard Overview Component
const DashboardOverview = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground mt-1">2 in progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Wishlist</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-1">Items saved</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground mt-1">Products rated</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: 1001, date: '2025-05-01', status: 'Delivered', items: 2 },
                { id: 1002, date: '2025-05-05', status: 'Shipped', items: 1 },
                { id: 1003, date: '2025-05-10', status: 'Processing', items: 3 }
              ].map(order => (
                <div key={order.id} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">Order #{order.id}</p>
                    <p className="text-sm text-gray-500">{order.date} • {order.items} items</p>
                  </div>
                  <Badge variant={
                    order.status === 'Delivered' ? 'secondary' :
                    order.status === 'Shipped' ? 'outline' : 'default'
                  }>
                    {order.status}
                  </Badge>
                </div>
              ))}
              <Button variant="outline" className="w-full" asChild>
                <Link to="/buyer/orders">View All Orders</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Wishlist Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: 1, name: 'Handwoven Basket', price: 49.99 },
                { id: 2, name: 'African Print Scarf', price: 29.99 },
                { id: 3, name: 'Wooden Sculpture', price: 89.99 }
              ].map(item => (
                <div key={item.id} className="flex justify-between items-center border-b pb-2">
                  <p className="font-medium">{item.name}</p>
                  <div className="flex items-center gap-3">
                    <span>${item.price.toFixed(2)}</span>
                    <Button size="sm" variant="outline">View</Button>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full" asChild>
                <Link to="/buyer/wishlist">View Wishlist</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Orders Component
const OrdersList = () => {
  const orders = [
    { 
      id: 1001, 
      date: '2025-05-01', 
      status: 'Delivered', 
      total: 99.98,
      items: [
        { name: 'Handwoven Basket', quantity: 1, price: 49.99 },
        { name: 'African Print Scarf', quantity: 1, price: 29.99 },
        { name: 'Wooden Coasters (Set of 4)', quantity: 1, price: 19.99 }
      ]
    },
    { 
      id: 1002, 
      date: '2025-05-05', 
      status: 'Shipped', 
      total: 89.99,
      items: [
        { name: 'Wooden Sculpture', quantity: 1, price: 89.99 }
      ]
    },
    { 
      id: 1003, 
      date: '2025-05-10', 
      status: 'Processing', 
      total: 119.97,
      items: [
        { name: 'Beaded Necklace', quantity: 1, price: 39.99 },
        { name: 'Leather Handbag', quantity: 1, price: 79.98 }
      ]
    }
  ];

  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);

  const toggleOrderDetails = (orderId: number) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Your Orders</h2>
      </div>
      
      {orders.map(order => (
        <Card key={order.id} className="overflow-hidden">
          <div className="p-4 cursor-pointer" onClick={() => toggleOrderDetails(order.id)}>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Order #{order.id}</p>
                <p className="text-sm text-gray-500">Placed on {order.date}</p>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant={
                  order.status === 'Delivered' ? 'secondary' :
                  order.status === 'Shipped' ? 'outline' : 'default'
                }>
                  {order.status}
                </Badge>
                <span className="font-medium">${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          {expandedOrder === order.id && (
            <div className="border-t p-4 bg-gray-50">
              <h3 className="font-medium mb-2">Order Items</h3>
              <div className="space-y-2">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span>{item.name} × {item.quantity}</span>
                    <span>${item.price.toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t pt-2 mt-2 flex justify-between font-medium">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="mt-4 flex gap-3">
                {order.status === 'Delivered' && (
                  <Button size="sm">Leave Review</Button>
                )}
                <Button size="sm" variant="outline">Track Order</Button>
                <Button size="sm" variant="outline">Contact Seller</Button>
              </div>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
};

// Wishlist Component
const WishlistItems = () => {
  const wishlistItems = [
    { id: 1, name: 'Handwoven Basket', price: 49.99, image: '/placeholder.svg', store: 'African Artisan Crafts' },
    { id: 2, name: 'African Print Scarf', price: 29.99, image: '/placeholder.svg', store: 'Ankara Fabrics' },
    { id: 3, name: 'Wooden Sculpture', price: 89.99, image: '/placeholder.svg', store: 'Wood Carvers Collective' },
    { id: 4, name: 'Beaded Necklace', price: 39.99, image: '/placeholder.svg', store: 'Maasai Crafts' },
    { id: 5, name: 'Leather Handbag', price: 79.98, image: '/placeholder.svg', store: 'Leather Works Kenya' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Your Wishlist</h2>
        <Button variant="outline" size="sm">Clear Wishlist</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {wishlistItems.map(item => (
          <Card key={item.id} className="overflow-hidden">
            <div className="aspect-square relative">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover" 
              />
              <Button 
                variant="outline" 
                size="icon" 
                className="absolute top-2 right-2 bg-white rounded-full"
              >
                <Heart size={16} className="text-red-500 fill-red-500" />
              </Button>
            </div>
            <CardContent className="p-4">
              <h3 className="font-medium truncate">{item.name}</h3>
              <p className="text-sm text-gray-500 mb-1">{item.store}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="font-bold">${item.price.toFixed(2)}</span>
                <Button size="sm">Add to Cart</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Profile Component
const ProfileSettings = () => {
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here we would submit the form data to an API
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Profile Settings</h2>

      <Tabs defaultValue="profile">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Personal Info</TabsTrigger>
          <TabsTrigger value="addresses">Addresses</TabsTrigger>
          <TabsTrigger value="payment">Payment Methods</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      className="w-full p-2 border rounded-md"
                      value={profileData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      className="w-full p-2 border rounded-md"
                      value={profileData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="w-full p-2 border rounded-md"
                    value={profileData.email}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className="w-full p-2 border rounded-md"
                    value={profileData.phone}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit">Save Changes</Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Security</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="currentPassword" className="text-sm font-medium">Current Password</label>
                  <input
                    id="currentPassword"
                    type="password"
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="newPassword" className="text-sm font-medium">New Password</label>
                  <input
                    id="newPassword"
                    type="password"
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="text-sm font-medium">Confirm New Password</label>
                  <input
                    id="confirmPassword"
                    type="password"
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit">Update Password</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="addresses" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Addresses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-md p-4 relative">
                  <Badge className="absolute top-4 right-4">Default</Badge>
                  <h3 className="font-medium">Home Address</h3>
                  <p className="text-sm text-gray-500">123 Main Street, Apt 4B</p>
                  <p className="text-sm text-gray-500">Nairobi, Kenya 00100</p>
                  <p className="text-sm text-gray-500">+254 712 345 678</p>
                  
                  <div className="mt-3 flex gap-3">
                    <Button size="sm" variant="outline">Edit</Button>
                    <Button size="sm" variant="outline">Delete</Button>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="font-medium">Work Address</h3>
                  <p className="text-sm text-gray-500">456 Business Ave, Suite 200</p>
                  <p className="text-sm text-gray-500">Nairobi, Kenya 00200</p>
                  <p className="text-sm text-gray-500">+254 712 345 679</p>
                  
                  <div className="mt-3 flex gap-3">
                    <Button size="sm" variant="outline">Edit</Button>
                    <Button size="sm" variant="outline">Delete</Button>
                    <Button size="sm" variant="outline">Set as Default</Button>
                  </div>
                </div>
                
                <Button className="w-full">Add New Address</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="payment" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-md p-4 relative">
                  <Badge className="absolute top-4 right-4">Default</Badge>
                  <div className="flex items-center">
                    <CreditCard className="mr-3 h-5 w-5" />
                    <div>
                      <h3 className="font-medium">Visa ending in 4242</h3>
                      <p className="text-sm text-gray-500">Expires 12/26</p>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex gap-3">
                    <Button size="sm" variant="outline">Edit</Button>
                    <Button size="sm" variant="outline">Delete</Button>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="flex items-center">
                    <CreditCard className="mr-3 h-5 w-5" />
                    <div>
                      <h3 className="font-medium">Mastercard ending in 5678</h3>
                      <p className="text-sm text-gray-500">Expires 09/25</p>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex gap-3">
                    <Button size="sm" variant="outline">Edit</Button>
                    <Button size="sm" variant="outline">Delete</Button>
                    <Button size="sm" variant="outline">Set as Default</Button>
                  </div>
                </div>
                
                <Button className="w-full">Add Payment Method</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Main Buyer Dashboard Component
const BuyerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (user.role !== 'buyer' && user.role !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  // Helper function to determine if a route is active
  const isActive = (path: string) => {
    return location.pathname === '/buyer' + path;
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar for larger screens */}
          <div className="md:w-64 bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center space-x-4 mb-6">
              <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="h-6 w-6 text-gray-500" />
              </div>
              <div>
                <h3 className="font-medium">{user.name}</h3>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
            
            <nav>
              <ul className="space-y-1">
                <li>
                  <Link 
                    to="/buyer/dashboard" 
                    className={`flex items-center p-2 rounded-md hover:bg-gray-100 ${
                      isActive('/dashboard') ? 'bg-gray-100 text-primary font-medium' : ''
                    }`}
                  >
                    <ShoppingBag size={18} className="mr-3" />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/buyer/orders" 
                    className={`flex items-center p-2 rounded-md hover:bg-gray-100 ${
                      isActive('/orders') ? 'bg-gray-100 text-primary font-medium' : ''
                    }`}
                  >
                    <Package size={18} className="mr-3" />
                    Orders
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/buyer/wishlist" 
                    className={`flex items-center p-2 rounded-md hover:bg-gray-100 ${
                      isActive('/wishlist') ? 'bg-gray-100 text-primary font-medium' : ''
                    }`}
                  >
                    <Heart size={18} className="mr-3" />
                    Wishlist
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/buyer/messages" 
                    className={`flex items-center p-2 rounded-md hover:bg-gray-100 ${
                      isActive('/messages') ? 'bg-gray-100 text-primary font-medium' : ''
                    }`}
                  >
                    <MessageCircle size={18} className="mr-3" />
                    Messages
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/buyer/profile" 
                    className={`flex items-center p-2 rounded-md hover:bg-gray-100 ${
                      isActive('/profile') ? 'bg-gray-100 text-primary font-medium' : ''
                    }`}
                  >
                    <User size={18} className="mr-3" />
                    Profile
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/buyer/addresses" 
                    className={`flex items-center p-2 rounded-md hover:bg-gray-100 ${
                      isActive('/addresses') ? 'bg-gray-100 text-primary font-medium' : ''
                    }`}
                  >
                    <MapPin size={18} className="mr-3" />
                    Addresses
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/buyer/reviews" 
                    className={`flex items-center p-2 rounded-md hover:bg-gray-100 ${
                      isActive('/reviews') ? 'bg-gray-100 text-primary font-medium' : ''
                    }`}
                  >
                    <Star size={18} className="mr-3" />
                    Reviews
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/buyer/settings" 
                    className={`flex items-center p-2 rounded-md hover:bg-gray-100 ${
                      isActive('/settings') ? 'bg-gray-100 text-primary font-medium' : ''
                    }`}
                  >
                    <Settings size={18} className="mr-3" />
                    Settings
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          
          {/* Main Content */}
          <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
            <Routes>
              <Route path="/dashboard" element={<DashboardOverview />} />
              <Route path="/orders" element={<OrdersList />} />
              <Route path="/wishlist" element={<WishlistItems />} />
              <Route path="/profile" element={<ProfileSettings />} />
              <Route path="/*" element={<DashboardOverview />} />
            </Routes>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default BuyerDashboard;
