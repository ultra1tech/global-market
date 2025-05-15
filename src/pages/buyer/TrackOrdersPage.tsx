
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock order tracking data
const orderTrackingSteps = [
  { 
    id: 1, 
    label: 'Order Placed', 
    date: 'May 15, 2023 - 10:30 AM',
    description: 'Your order has been received and is being processed.',
    completed: true
  },
  { 
    id: 2, 
    label: 'Payment Confirmed', 
    date: 'May 15, 2023 - 10:35 AM',
    description: 'Your payment has been confirmed.',
    completed: true
  },
  { 
    id: 3, 
    label: 'Processing', 
    date: 'May 15, 2023 - 2:45 PM',
    description: 'Your order is being prepared by the seller.',
    completed: true
  },
  { 
    id: 4, 
    label: 'Shipped', 
    date: 'May 16, 2023 - 11:20 AM',
    description: 'Your order has been shipped. Tracking information: ABC123456789',
    completed: true
  },
  { 
    id: 5, 
    label: 'Out for Delivery', 
    date: 'May 18, 2023 - 8:45 AM',
    description: 'Your order is out for delivery.',
    completed: true
  },
  { 
    id: 6, 
    label: 'Delivered', 
    date: 'May 18, 2023 - 3:15 PM',
    description: 'Your order has been delivered.',
    completed: false
  }
];

// Mock active orders
const activeOrders = [
  { 
    id: 'ORD-7862', 
    items: [
      { name: 'Handcrafted Wooden Bowl', quantity: 1, price: 45.99 }
    ], 
    seller: 'Artisan Crafts',
    date: 'May 15, 2023',
    status: 'Shipped',
    tracking: 'ABC123456789',
    deliveryDate: 'May 19, 2023'
  },
  { 
    id: 'ORD-7855', 
    items: [
      { name: 'Organic Cotton T-Shirt', quantity: 2, price: 29.99 },
      { name: 'Handmade Ceramic Planter', quantity: 1, price: 32.00 }
    ], 
    seller: 'Eco Friendly Store',
    date: 'May 14, 2023',
    status: 'Processing',
    tracking: 'Pending',
    deliveryDate: 'May 21-23, 2023'
  }
];

const TrackOrdersPage = () => {
  const [selectedOrderId, setSelectedOrderId] = React.useState('ORD-7862');
  const [orderLookupId, setOrderLookupId] = React.useState('');
  
  const selectedOrder = activeOrders.find(order => order.id === selectedOrderId);
  
  const handleOrderLookup = () => {
    if (orderLookupId === 'ORD-7862' || orderLookupId === 'ORD-7855') {
      setSelectedOrderId(orderLookupId);
    }
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Track Orders</h1>
      
      <Tabs defaultValue="active" className="mb-6">
        <TabsList>
          <TabsTrigger value="active">Active Orders</TabsTrigger>
          <TabsTrigger value="lookup">Order Lookup</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {activeOrders.map(order => (
              <Card 
                key={order.id} 
                className={`cursor-pointer transition-shadow hover:shadow-md ${
                  selectedOrderId === order.id ? 'border-blue-500 ring-1 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedOrderId(order.id)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{order.id}</h3>
                    <Badge className={
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'Processing' ? 'bg-amber-100 text-amber-800' :
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }>
                      {order.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">
                    <span className="font-medium">Order Date:</span> {order.date}
                  </p>
                  <p className="text-sm text-gray-500 mb-2">
                    <span className="font-medium">Seller:</span> {order.seller}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Estimated Delivery:</span> {order.deliveryDate}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {selectedOrder && (
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>Order {selectedOrder.id} Tracking</CardTitle>
                  <Badge className={
                    selectedOrder.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                    selectedOrder.status === 'Processing' ? 'bg-amber-100 text-amber-800' :
                    selectedOrder.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }>
                    {selectedOrder.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <h3 className="font-medium text-sm text-gray-500 mb-2">ORDER SUMMARY</h3>
                  <div className="border rounded-md p-4">
                    <div className="space-y-3">
                      {selectedOrder.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                          </div>
                          <p>${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                    <div className="border-t mt-4 pt-2">
                      <div className="flex justify-between font-medium">
                        <p>Total</p>
                        <p>${selectedOrder.items.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <h3 className="font-medium text-sm text-gray-500 mb-4">TRACKING INFORMATION</h3>
                <div className="flex flex-col space-y-6 mb-6">
                  {orderTrackingSteps.map((step, index) => (
                    <div key={step.id} className="flex">
                      <div className="flex flex-col items-center mr-4">
                        <div className={`w-8 h-8 flex items-center justify-center rounded-full ${
                          step.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                        }`}>
                          {step.completed ? '✓' : step.id}
                        </div>
                        {index < orderTrackingSteps.length - 1 && (
                          <div className={`w-0.5 h-16 ${
                            step.completed && orderTrackingSteps[index + 1].completed 
                              ? 'bg-green-500' 
                              : 'bg-gray-200'
                          }`}></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-medium ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                          {step.label}
                        </h4>
                        <p className="text-sm text-gray-500">{step.date}</p>
                        <p className="text-sm">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between">
                  <Button variant="outline">Download Invoice</Button>
                  <Button>Contact Seller</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="lookup" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Track Any Order</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Input 
                  placeholder="Enter Order ID (e.g. ORD-7862)" 
                  className="flex-1" 
                  value={orderLookupId}
                  onChange={(e) => setOrderLookupId(e.target.value)}
                />
                <Button onClick={handleOrderLookup}>Search</Button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Enter your order ID to track its current status and delivery progress.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TrackOrdersPage;
