
import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Package, 
  BarChart, 
  Users, 
  Settings, 
  PlusCircle, 
  MessageCircle, 
  ShoppingCart, 
  AlertCircle, 
  Store, 
  Bell
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

// Seller Dashboard Overview Component
const DashboardOverview = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$4,231.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12</div>
            <p className="text-xs text-muted-foreground">
              +8% from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Product Views</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">
              +19% from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Items need attention
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((order) => (
                <div key={order} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">Order #{order * 1000 + 456}</p>
                    <p className="text-sm text-muted-foreground">5 items • $123.45</p>
                  </div>
                  <Badge variant={order === 1 ? "default" : order === 2 ? "outline" : "secondary"}>
                    {order === 1 ? "New" : order === 2 ? "Processing" : "Shipped"}
                  </Badge>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full">
                View All Orders
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Inventory Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <p className="font-medium">Handmade Basket</p>
                  <p className="text-sm text-red-500">Low Stock (2)</p>
                </div>
                <Progress value={10} className="h-2 mt-1" />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <p className="font-medium">African Print Fabric</p>
                  <p className="text-sm text-orange-500">Medium Stock (15)</p>
                </div>
                <Progress value={40} className="h-2 mt-1" />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <p className="font-medium">Wooden Carvings</p>
                  <p className="text-sm text-green-500">Good Stock (42)</p>
                </div>
                <Progress value={80} className="h-2 mt-1" />
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Manage Inventory
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Products Management Component
const ProductsManagement = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  const products = [
    { id: 1, name: 'Handmade Basket', price: 49.99, stock: 2, status: 'active' },
    { id: 2, name: 'African Print Fabric', price: 29.99, stock: 15, status: 'active' },
    { id: 3, name: 'Wooden Carvings', price: 79.99, stock: 42, status: 'active' },
    { id: 4, name: 'Beaded Necklace', price: 39.99, stock: 8, status: 'inactive' },
    { id: 5, name: 'Leather Handbag', price: 119.99, stock: 4, status: 'active' },
  ];
  
  const handleDelete = (id: number) => {
    toast.success(`Product #${id} has been deleted`);
  };
  
  const filteredProducts = activeTab === 'all' 
    ? products 
    : activeTab === 'low' 
      ? products.filter(p => p.stock <= 5)
      : products.filter(p => p.status === activeTab);
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Products</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Products</TabsTrigger>
          <TabsTrigger value="low">Low Stock</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="bg-white rounded-md shadow">
        <div className="grid grid-cols-12 p-4 border-b font-medium text-sm">
          <div className="col-span-5">Product</div>
          <div className="col-span-2">Price</div>
          <div className="col-span-2">Stock</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>
        
        {filteredProducts.map((product) => (
          <div key={product.id} className="grid grid-cols-12 p-4 border-b items-center text-sm">
            <div className="col-span-5">{product.name}</div>
            <div className="col-span-2">${product.price.toFixed(2)}</div>
            <div className="col-span-2">
              <span className={`font-medium ${product.stock <= 5 ? 'text-red-500' : product.stock <= 10 ? 'text-orange-500' : 'text-green-500'}`}>
                {product.stock}
              </span>
            </div>
            <div className="col-span-1">
              <Badge variant={product.status === 'active' ? 'default' : 'secondary'}>
                {product.status === 'active' ? 'Active' : 'Inactive'}
              </Badge>
            </div>
            <div className="col-span-2 flex justify-end space-x-2">
              <Button variant="outline" size="sm">Edit</Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-red-500 hover:text-red-600"
                onClick={() => handleDelete(product.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Orders Management Component
const OrdersManagement = () => {
  const [activeTab, setActiveTab] = useState("pending");
  
  const orders = [
    { id: 1001, customer: 'John Doe', items: 3, total: 129.99, status: 'pending', date: '2025-05-10' },
    { id: 1002, customer: 'Jane Smith', items: 2, total: 89.99, status: 'shipped', date: '2025-05-09' },
    { id: 1003, customer: 'Robert Johnson', items: 1, total: 49.99, status: 'delivered', date: '2025-05-08' },
    { id: 1004, customer: 'Emily Davis', items: 4, total: 199.99, status: 'pending', date: '2025-05-10' },
    { id: 1005, customer: 'Michael Brown', items: 2, total: 159.99, status: 'shipped', date: '2025-05-09' },
  ];
  
  const filteredOrders = activeTab === 'all' 
    ? orders 
    : orders.filter(o => o.status === activeTab);
  
  const updateStatus = (id: number, status: string) => {
    toast.success(`Order #${id} marked as ${status}`);
  };
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Orders</h1>
      </div>
      
      <Tabs defaultValue="pending" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="shipped">Shipped</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="bg-white rounded-md shadow">
        <div className="grid grid-cols-12 p-4 border-b font-medium text-sm">
          <div className="col-span-1">ID</div>
          <div className="col-span-3">Customer</div>
          <div className="col-span-1">Items</div>
          <div className="col-span-2">Total</div>
          <div className="col-span-2">Date</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>
        
        {filteredOrders.map((order) => (
          <div key={order.id} className="grid grid-cols-12 p-4 border-b items-center text-sm">
            <div className="col-span-1">#{order.id}</div>
            <div className="col-span-3">{order.customer}</div>
            <div className="col-span-1">{order.items}</div>
            <div className="col-span-2">${order.total.toFixed(2)}</div>
            <div className="col-span-2">{order.date}</div>
            <div className="col-span-1">
              <Badge variant={
                order.status === 'pending' 
                  ? 'default' 
                  : order.status === 'shipped' 
                    ? 'outline' 
                    : 'secondary'
              }>
                {order.status}
              </Badge>
            </div>
            <div className="col-span-2 flex justify-end space-x-2">
              <Button variant="outline" size="sm">View</Button>
              {order.status === 'pending' && (
                <Button 
                  size="sm" 
                  onClick={() => updateStatus(order.id, 'shipped')}
                >
                  Ship
                </Button>
              )}
              {order.status === 'shipped' && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => updateStatus(order.id, 'delivered')} 
                >
                  Mark Delivered
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Customer Management Component
const CustomerManagement = () => {
  const customers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', orders: 5, totalSpent: 250.99 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', orders: 3, totalSpent: 175.50 },
    { id: 3, name: 'Robert Johnson', email: 'robert@example.com', orders: 1, totalSpent: 49.99 },
    { id: 4, name: 'Emily Davis', email: 'emily@example.com', orders: 7, totalSpent: 320.75 },
    { id: 5, name: 'Michael Brown', email: 'michael@example.com', orders: 2, totalSpent: 99.98 },
  ];
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Customers</h1>
        <div className="flex space-x-2">
          <Button variant="outline">Export</Button>
          <Button variant="outline">Filter</Button>
        </div>
      </div>
      
      <div className="bg-white rounded-md shadow">
        <div className="grid grid-cols-12 p-4 border-b font-medium text-sm">
          <div className="col-span-4">Customer</div>
          <div className="col-span-3">Email</div>
          <div className="col-span-2">Orders</div>
          <div className="col-span-2">Total Spent</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>
        
        {customers.map((customer) => (
          <div key={customer.id} className="grid grid-cols-12 p-4 border-b items-center text-sm">
            <div className="col-span-4 font-medium">{customer.name}</div>
            <div className="col-span-3">{customer.email}</div>
            <div className="col-span-2">{customer.orders}</div>
            <div className="col-span-2">${customer.totalSpent.toFixed(2)}</div>
            <div className="col-span-1 text-right">
              <Button variant="ghost" size="sm">
                <MessageCircle size={16} />
                <span className="sr-only">Message</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Messages Component
const MessagesManagement = () => {
  const [activeChat, setActiveChat] = useState<number | null>(1);
  
  const chats = [
    { id: 1, name: 'John Doe', lastMessage: 'Hello, I have a question about my order', unread: 2, time: '10:30 AM' },
    { id: 2, name: 'Jane Smith', lastMessage: 'When will my order ship?', unread: 0, time: 'Yesterday' },
    { id: 3, name: 'Robert Johnson', lastMessage: 'Thanks for your quick response!', unread: 0, time: '2 days ago' },
  ];
  
  const messages = [
    { id: 1, sender: 'customer', text: 'Hello, I have a question about my order #1001', time: '10:25 AM' },
    { id: 2, sender: 'customer', text: 'I was wondering when it will be shipped?', time: '10:26 AM' },
    { id: 3, sender: 'seller', text: 'Hello! Thanks for reaching out. Your order is being processed and will ship tomorrow.', time: '10:28 AM' },
    { id: 4, sender: 'customer', text: 'Great, thank you!', time: '10:30 AM' },
  ];
  
  return (
    <div className="p-6 h-[calc(100vh-16rem)]">
      <div className="flex h-full rounded-md shadow overflow-hidden">
        <div className="w-1/3 border-r bg-white">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Messages</h2>
          </div>
          <div className="overflow-y-auto" style={{ maxHeight: 'calc(100% - 4rem)' }}>
            {chats.map((chat) => (
              <div 
                key={chat.id} 
                className={`p-4 border-b cursor-pointer transition-colors hover:bg-gray-50 ${activeChat === chat.id ? 'bg-gray-100' : ''}`}
                onClick={() => setActiveChat(chat.id)}
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-medium">{chat.name}</h3>
                  <span className="text-xs text-gray-500">{chat.time}</span>
                </div>
                <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                {chat.unread > 0 && (
                  <div className="mt-1">
                    <Badge variant="default" className="rounded-full">{chat.unread}</Badge>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="w-2/3 flex flex-col bg-gray-50">
          {activeChat ? (
            <>
              <div className="p-4 border-b bg-white">
                <h2 className="font-medium">
                  {chats.find(c => c.id === activeChat)?.name}
                </h2>
              </div>
              
              <div className="flex-1 p-4 overflow-y-auto">
                {messages.map((message) => (
                  <div 
                    key={message.id}
                    className={`mb-4 max-w-[80%] ${
                      message.sender === 'seller' 
                        ? 'ml-auto bg-primary text-primary-foreground' 
                        : 'bg-white text-foreground'
                    } p-3 rounded-lg shadow-sm`}
                  >
                    <p>{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'seller' 
                        ? 'text-primary-foreground/80' 
                        : 'text-muted-foreground'
                    }`}>
                      {message.time}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="p-4 border-t bg-white">
                <div className="flex">
                  <input 
                    type="text" 
                    placeholder="Type your message..." 
                    className="flex-1 p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Button className="rounded-l-none">Send</Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Select a conversation to start messaging
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Settings Management Component
const SettingsManagement = () => {
  const [storeName, setStoreName] = useState("African Artisan Crafts");
  const [storeDescription, setStoreDescription] = useState("We sell authentic handmade crafts from across Africa");
  
  const handleSave = () => {
    toast.success("Store settings have been saved");
  };
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Store Settings</h1>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Store Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Store Name</label>
              <input 
                id="name"
                type="text"
                className="w-full p-2 border rounded-md"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">Store Description</label>
              <textarea 
                id="description"
                rows={4}
                className="w-full p-2 border rounded-md"
                value={storeDescription}
                onChange={(e) => setStoreDescription(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="logo" className="text-sm font-medium">Store Logo</label>
              <div className="flex items-center space-x-4">
                <div className="h-20 w-20 rounded-md bg-gray-200 flex items-center justify-center">
                  <Store className="h-10 w-10 text-gray-500" />
                </div>
                <Button variant="outline">Upload New Logo</Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="country" className="text-sm font-medium">Country</label>
                <select 
                  id="country"
                  className="w-full p-2 border rounded-md"
                  defaultValue="kenya"
                >
                  <option value="kenya">Kenya</option>
                  <option value="nigeria">Nigeria</option>
                  <option value="ghana">Ghana</option>
                  <option value="tanzania">Tanzania</option>
                  <option value="south-africa">South Africa</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="language" className="text-sm font-medium">Language</label>
                <select 
                  id="language"
                  className="w-full p-2 border rounded-md"
                  defaultValue="en"
                >
                  <option value="en">English</option>
                  <option value="fr">French</option>
                  <option value="sw">Swahili</option>
                  <option value="ar">Arabic</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="contact" className="text-sm font-medium">Contact Email</label>
              <input 
                id="contact"
                type="email"
                className="w-full p-2 border rounded-md"
                defaultValue="contact@africanartisan.com"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
              <input 
                id="phone"
                type="tel"
                className="w-full p-2 border rounded-md"
                defaultValue="+254 712 345 678"
              />
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <input 
                id="paypal"
                type="checkbox"
                checked={true}
                readOnly
              />
              <label htmlFor="paypal">PayPal</label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input 
                id="mtn"
                type="checkbox"
                checked={true}
                readOnly
              />
              <label htmlFor="mtn">MTN Mobile Money</label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input 
                id="card"
                type="checkbox"
                checked={true}
                readOnly
              />
              <label htmlFor="card">Credit/Debit Card</label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input 
                id="cash"
                type="checkbox"
                checked={false}
                readOnly
              />
              <label htmlFor="cash">Cash on Delivery</label>
            </div>
            
            <hr />
            
            <Button variant="outline" className="w-full">
              Configure Payment Options
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Main Seller Dashboard Component
const SellerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect to the login page if there's no user
  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (user.role !== 'seller' && user.role !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }
  
  // Helper function to determine if a route is active
  const isActive = (path: string) => {
    return location.pathname === '/seller-dashboard' + path;
  };
  
  // Notifications count
  const notificationsCount = 3;
  const messagesCount = 2;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-xl">Seller Dashboard</h2>
          <p className="text-sm text-gray-500">{user.name}</p>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link 
                to="/seller-dashboard" 
                className={`flex items-center p-2 rounded-md hover:bg-gray-100 ${
                  isActive('') ? 'bg-gray-100 text-primary font-medium' : ''
                }`}
              >
                <BarChart size={18} className="mr-3" />
                Overview
              </Link>
            </li>
            <li>
              <Link 
                to="/seller-dashboard/products" 
                className={`flex items-center p-2 rounded-md hover:bg-gray-100 ${
                  isActive('/products') ? 'bg-gray-100 text-primary font-medium' : ''
                }`}
              >
                <Package size={18} className="mr-3" />
                Products
              </Link>
            </li>
            <li>
              <Link 
                to="/seller-dashboard/orders" 
                className={`flex items-center p-2 rounded-md hover:bg-gray-100 ${
                  isActive('/orders') ? 'bg-gray-100 text-primary font-medium' : ''
                }`}
              >
                <ShoppingCart size={18} className="mr-3" />
                Orders
              </Link>
            </li>
            <li>
              <Link 
                to="/seller-dashboard/customers" 
                className={`flex items-center p-2 rounded-md hover:bg-gray-100 ${
                  isActive('/customers') ? 'bg-gray-100 text-primary font-medium' : ''
                }`}
              >
                <Users size={18} className="mr-3" />
                Customers
              </Link>
            </li>
            <li>
              <Link 
                to="/seller-dashboard/messages" 
                className={`flex items-center justify-between p-2 rounded-md hover:bg-gray-100 ${
                  isActive('/messages') ? 'bg-gray-100 text-primary font-medium' : ''
                }`}
              >
                <div className="flex items-center">
                  <MessageCircle size={18} className="mr-3" />
                  Messages
                </div>
                {messagesCount > 0 && (
                  <Badge variant="destructive" className="rounded-full">
                    {messagesCount}
                  </Badge>
                )}
              </Link>
            </li>
            <li>
              <Link 
                to="/seller-dashboard/settings" 
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
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">
            {location.pathname === '/seller-dashboard' && 'Dashboard Overview'}
            {location.pathname === '/seller-dashboard/products' && 'Products Management'}
            {location.pathname === '/seller-dashboard/orders' && 'Orders Management'}
            {location.pathname === '/seller-dashboard/customers' && 'Customer Management'}
            {location.pathname === '/seller-dashboard/messages' && 'Messages'}
            {location.pathname === '/seller-dashboard/settings' && 'Store Settings'}
          </h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell size={20} className="cursor-pointer" />
              {notificationsCount > 0 && (
                <Badge variant="destructive" className="absolute -top-2 -right-2 rounded-full w-5 h-5 flex items-center justify-center p-0 text-xs">
                  {notificationsCount}
                </Badge>
              )}
            </div>
            {location.pathname === '/seller-dashboard/products' && (
              <Button>
                <PlusCircle size={18} className="mr-2" />
                Add New Product
              </Button>
            )}
          </div>
        </header>
        
        <main>
          <Routes>
            <Route path="/" element={<DashboardOverview />} />
            <Route path="/products" element={<ProductsManagement />} />
            <Route path="/orders" element={<OrdersManagement />} />
            <Route path="/customers" element={<CustomerManagement />} />
            <Route path="/messages" element={<MessagesManagement />} />
            <Route path="/settings" element={<SettingsManagement />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default SellerDashboard;
