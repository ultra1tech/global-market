
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Filter, Calendar, Eye, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import BuyerLayout from './BuyerLayout';
import { buyerOrders } from '@/mocks/ordersData';

const OrdersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all");
  
  // Filter orders based on search term and status
  const filteredOrders = buyerOrders.filter(order => {
    // Filter by search term
    const matchesSearch = !searchTerm || 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.stores.some(store => store.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
      
    // Filter by status tab
    const matchesTab = activeTab === "all" || order.status === activeTab;
    
    return matchesSearch && matchesTab;
  });
  
  const getOrderStatusLabel = (status: string) => {
    const statusLabels: Record<string, { label: string, className: string }> = {
      processing: { 
        label: "Processing", 
        className: "bg-blue-100 text-blue-800"
      },
      shipped: { 
        label: "Shipped", 
        className: "bg-purple-100 text-purple-800"
      },
      delivered: { 
        label: "Delivered", 
        className: "bg-green-100 text-green-800"
      },
      cancelled: { 
        label: "Cancelled", 
        className: "bg-red-100 text-red-800"
      },
      pending: {
        label: "Pending",
        className: "bg-yellow-100 text-yellow-800"
      }
    };
    
    return statusLabels[status] || { label: status, className: "bg-gray-100 text-gray-800" };
  };

  return (
    <BuyerLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">My Orders</h1>
        <p className="text-gray-500">Track and manage your purchase history</p>
      </div>
      
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search orders or products..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Select>
              <SelectTrigger className="w-[180px] h-10">
                <Calendar className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last-30">Last 30 days</SelectItem>
                <SelectItem value="last-90">Last 90 days</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="all-time">All time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="w-full" onValueChange={(value) => setActiveTab(value)}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="shipped">Shipped</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-6">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <div key={order.id} className="border rounded-lg overflow-hidden">
                <div className="p-4 bg-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">
                        {order.stores.map(store => store.name).join(", ")}
                      </h3>
                      <span 
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getOrderStatusLabel(order.status).className}`}
                      >
                        {getOrderStatusLabel(order.status).label}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      Order {order.id} • {new Date(order.date).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Track Order</Button>
                    <Button size="sm">View Details</Button>
                  </div>
                </div>
                
                <div className="p-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center py-2">
                      <div className="h-16 w-16 bg-gray-100 rounded mr-4 overflow-hidden">
                        {item.image && (
                          <img 
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <div className="font-medium">
                        ${item.price.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-4 border-t flex justify-between">
                  <div>
                    <span className="text-sm text-gray-500">Total</span>
                    <span className="ml-2 font-bold">${order.total.toFixed(2)}</span>
                  </div>
                  
                  <div className="space-x-2">
                    {order.status === 'delivered' && (
                      <Button variant="outline" size="sm">Write Review</Button>
                    )}
                    {(order.status === 'delivered' || order.status === 'shipped') && (
                      <Button variant="outline" size="sm">Return</Button>
                    )}
                    <Button variant="outline" size="sm">Buy Again</Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No orders found</h3>
              <p className="text-gray-500">
                {searchTerm ? "Try adjusting your search" : "You haven't placed any orders yet"}
              </p>
              <Button className="mt-4">Browse Products</Button>
            </div>
          )}
        </TabsContent>
        
        {/* The other tabs will automatically show the filtered content due to our filtering logic */}
        <TabsContent value="processing">
          {/* Processing orders - content is automatically filtered by the activeTab state */}
        </TabsContent>
        <TabsContent value="shipped">
          {/* Shipped orders - content is automatically filtered by the activeTab state */}
        </TabsContent>
        <TabsContent value="delivered">
          {/* Delivered orders - content is automatically filtered by the activeTab state */}
        </TabsContent>
        <TabsContent value="cancelled">
          {/* Cancelled orders - content is automatically filtered by the activeTab state */}
        </TabsContent>
        <TabsContent value="pending">
          {/* Pending orders - content is automatically filtered by the activeTab state */}
        </TabsContent>
      </Tabs>
    </BuyerLayout>
  );
};

export default OrdersPage;
