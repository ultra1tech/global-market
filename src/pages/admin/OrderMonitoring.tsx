
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DataTable from '@/components/dashboard/DataTable';

// Mock data for orders
const ordersData = [
  { 
    id: 'ORD-48761', 
    buyer: 'Alex Johnson', 
    seller: 'Artisan Crafts', 
    date: '2023-05-10', 
    total: '$256.99',
    status: 'completed',
    items: 3
  },
  { 
    id: 'ORD-48762', 
    buyer: 'Maria Rodriguez', 
    seller: 'Eco Friendly Store', 
    date: '2023-05-09', 
    total: '$124.50',
    status: 'shipped',
    items: 2
  },
  { 
    id: 'ORD-48763', 
    buyer: 'John Smith', 
    seller: 'Tech Gadgets', 
    date: '2023-05-09', 
    total: '$589.99',
    status: 'processing',
    items: 1
  },
  { 
    id: 'ORD-48764', 
    buyer: 'Samantha Lee', 
    seller: 'Home Decor Plus', 
    date: '2023-05-08', 
    total: '$312.75',
    status: 'completed',
    items: 4
  },
  { 
    id: 'ORD-48765', 
    buyer: 'David Chen', 
    seller: 'Fashion Forward', 
    date: '2023-05-08', 
    total: '$178.25',
    status: 'cancelled',
    items: 2
  },
  { 
    id: 'ORD-48766', 
    buyer: 'Emma Wilson', 
    seller: 'Wellness Products', 
    date: '2023-05-07', 
    total: '$86.50',
    status: 'shipped',
    items: 3
  },
  { 
    id: 'ORD-48767', 
    buyer: 'Michael Brown', 
    seller: 'Artisan Crafts', 
    date: '2023-05-07', 
    total: '$450.00',
    status: 'processing',
    items: 5
  },
  { 
    id: 'ORD-48768', 
    buyer: 'Olivia Davis', 
    seller: 'Eco Friendly Store', 
    date: '2023-05-06', 
    total: '$95.25',
    status: 'completed',
    items: 1
  },
];

const orderColumns = [
  { key: 'id', header: 'Order ID' },
  { key: 'buyer', header: 'Buyer' },
  { key: 'seller', header: 'Seller' },
  { key: 'date', header: 'Date' },
  { key: 'items', header: 'Items' },
  { key: 'total', header: 'Total' },
  { 
    key: 'status', 
    header: 'Status',
    render: (value: string) => (
      <Badge className={
        value === 'completed' ? 'bg-green-100 text-green-800' : 
        value === 'processing' ? 'bg-blue-100 text-blue-800' : 
        value === 'shipped' ? 'bg-purple-100 text-purple-800' : 
        'bg-red-100 text-red-800'
      }>
        {value}
      </Badge>
    )
  },
  { 
    key: 'actions', 
    header: 'Actions',
    render: (_, row) => (
      <div className="flex space-x-2">
        <Button variant="outline" size="sm">View</Button>
        <Button variant="outline" size="sm">Edit</Button>
      </div>
    )
  },
];

const OrderMonitoring = () => {
  const [status, setStatus] = useState('all');
  
  // Filter orders by status if selected
  const filteredOrders = status === 'all' 
    ? ordersData 
    : ordersData.filter(order => order.status === status);
  
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Order Monitoring</h1>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Export CSV</Button>
          <Button size="sm">Refresh Data</Button>
        </div>
      </div>
      
      <DataTable 
        columns={orderColumns} 
        data={filteredOrders}
        searchable
        searchField="id"
      />
    </div>
  );
};

export default OrderMonitoring;
