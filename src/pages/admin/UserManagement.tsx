
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DataTable from '@/components/dashboard/DataTable';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock data for buyers and sellers
const buyersData = [
  { id: 'B001', name: 'Alex Johnson', email: 'alex@example.com', status: 'active', joinDate: '2023-01-15', orders: 12 },
  { id: 'B002', name: 'Maria Rodriguez', email: 'maria@example.com', status: 'active', joinDate: '2023-02-22', orders: 8 },
  { id: 'B003', name: 'John Smith', email: 'john@example.com', status: 'inactive', joinDate: '2023-01-10', orders: 0 },
  { id: 'B004', name: 'Samantha Lee', email: 'samantha@example.com', status: 'active', joinDate: '2023-03-01', orders: 5 },
  { id: 'B005', name: 'David Chen', email: 'david@example.com', status: 'active', joinDate: '2023-03-15', orders: 3 },
  { id: 'B006', name: 'Emma Wilson', email: 'emma@example.com', status: 'inactive', joinDate: '2023-02-05', orders: 1 },
  { id: 'B007', name: 'Michael Brown', email: 'michael@example.com', status: 'active', joinDate: '2023-04-10', orders: 7 },
  { id: 'B008', name: 'Olivia Davis', email: 'olivia@example.com', status: 'active', joinDate: '2023-04-28', orders: 2 },
];

const sellersData = [
  { id: 'S001', name: 'Artisan Crafts', email: 'artisan@example.com', status: 'active', joinDate: '2023-01-05', products: 45, revenue: '$12,450' },
  { id: 'S002', name: 'Eco Friendly Store', email: 'eco@example.com', status: 'active', joinDate: '2023-02-12', products: 32, revenue: '$8,930' },
  { id: 'S003', name: 'Tech Gadgets', email: 'tech@example.com', status: 'suspended', joinDate: '2023-01-20', products: 0, revenue: '$0' },
  { id: 'S004', name: 'Home Decor Plus', email: 'home@example.com', status: 'active', joinDate: '2023-03-10', products: 67, revenue: '$15,742' },
  { id: 'S005', name: 'Fashion Forward', email: 'fashion@example.com', status: 'active', joinDate: '2023-02-28', products: 89, revenue: '$22,560' },
  { id: 'S006', name: 'Wellness Products', email: 'wellness@example.com', status: 'inactive', joinDate: '2023-04-05', products: 12, revenue: '$3,450' },
];

const buyerColumns = [
  { key: 'id', header: 'ID' },
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' },
  { 
    key: 'status', 
    header: 'Status',
    render: (value: string) => (
      <Badge className={value === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
        {value}
      </Badge>
    )
  },
  { key: 'joinDate', header: 'Join Date' },
  { key: 'orders', header: 'Orders' },
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

const sellerColumns = [
  { key: 'id', header: 'ID' },
  { key: 'name', header: 'Store Name' },
  { key: 'email', header: 'Email' },
  { 
    key: 'status', 
    header: 'Status',
    render: (value: string) => (
      <Badge className={
        value === 'active' ? 'bg-green-100 text-green-800' : 
        value === 'suspended' ? 'bg-red-100 text-red-800' : 
        'bg-gray-100 text-gray-800'
      }>
        {value}
      </Badge>
    )
  },
  { key: 'joinDate', header: 'Join Date' },
  { key: 'products', header: 'Products' },
  { key: 'revenue', header: 'Revenue' },
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

const UserManagement = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">User Management</h1>
      
      <Tabs defaultValue="buyers" className="mb-6">
        <TabsList>
          <TabsTrigger value="buyers">Buyers</TabsTrigger>
          <TabsTrigger value="sellers">Sellers</TabsTrigger>
        </TabsList>
        <TabsContent value="buyers" className="p-4 border rounded-md mt-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Buyers List</h2>
            <Button size="sm">Export Data</Button>
          </div>
          <DataTable 
            columns={buyerColumns} 
            data={buyersData}
            searchable
            searchField="name"
          />
        </TabsContent>
        <TabsContent value="sellers" className="p-4 border rounded-md mt-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Sellers List</h2>
            <Button size="sm">Export Data</Button>
          </div>
          <DataTable 
            columns={sellerColumns} 
            data={sellersData}
            searchable
            searchField="name"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserManagement;
