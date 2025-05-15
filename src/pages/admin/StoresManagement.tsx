
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DataTable from '@/components/dashboard/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for stores
const storesData = [
  { 
    id: 'STO-8761', 
    name: 'Artisan Crafts',
    owner: 'John Smith', 
    email: 'artisan@example.com',
    products: 45,
    revenue: '$12,450',
    rating: 4.8,
    status: 'active',
    joinDate: '2023-01-15' 
  },
  { 
    id: 'STO-8762', 
    name: 'Eco Friendly Store',
    owner: 'Maria Garcia', 
    email: 'eco@example.com',
    products: 32,
    revenue: '$8,930',
    rating: 4.5,
    status: 'active',
    joinDate: '2023-02-22' 
  },
  { 
    id: 'STO-8763', 
    name: 'Tech Gadgets',
    owner: 'David Chen', 
    email: 'tech@example.com',
    products: 78,
    revenue: '$25,680',
    rating: 4.2,
    status: 'suspended',
    joinDate: '2023-01-10' 
  },
  { 
    id: 'STO-8764', 
    name: 'Home Decor Plus',
    owner: 'Emily Johnson', 
    email: 'home@example.com',
    products: 67,
    revenue: '$15,742',
    rating: 4.7,
    status: 'active',
    joinDate: '2023-03-01' 
  },
  { 
    id: 'STO-8765', 
    name: 'Fashion Forward',
    owner: 'Michael Brown', 
    email: 'fashion@example.com',
    products: 89,
    revenue: '$22,560',
    rating: 4.4,
    status: 'active',
    joinDate: '2023-03-15' 
  },
  { 
    id: 'STO-8766', 
    name: 'Wellness Products',
    owner: 'Sarah Wilson', 
    email: 'wellness@example.com',
    products: 12,
    revenue: '$3,450',
    rating: 4.0,
    status: 'inactive',
    joinDate: '2023-02-05' 
  }
];

// Top selling products data for showcase
const topSellingProducts = [
  { id: 'P1001', name: 'Handmade Ceramic Mug', store: 'Artisan Crafts', price: '$24.99', sales: 156 },
  { id: 'P1042', name: 'Bamboo Cutting Board', store: 'Eco Friendly Store', price: '$32.50', sales: 124 },
  { id: 'P1083', name: 'Wireless Earbuds', store: 'Tech Gadgets', price: '$89.99', sales: 112 },
  { id: 'P1024', name: 'Macrame Wall Hanging', store: 'Home Decor Plus', price: '$48.75', sales: 98 },
];

const storeColumns = [
  { key: 'id', header: 'ID' },
  { key: 'name', header: 'Store Name' },
  { key: 'owner', header: 'Owner' },
  { key: 'email', header: 'Email' },
  { key: 'products', header: 'Products' },
  { key: 'revenue', header: 'Revenue' },
  { 
    key: 'rating', 
    header: 'Rating',
    render: (value: number) => (
      <div className="flex items-center">
        <span className="font-medium mr-1">{value}</span>
        <span className="text-yellow-500">★</span>
      </div>
    )
  },
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

const productColumns = [
  { key: 'id', header: 'ID' },
  { key: 'name', header: 'Product' },
  { key: 'store', header: 'Store' },
  { key: 'price', header: 'Price' },
  { key: 'sales', header: 'Sales' },
];

const StoresManagement = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Stores Management</h1>
      
      <Tabs defaultValue="stores" className="mb-6">
        <TabsList>
          <TabsTrigger value="stores">All Stores</TabsTrigger>
          <TabsTrigger value="products">Top Products</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="stores" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-blue-600">{storesData.length}</div>
                <p className="text-sm text-muted-foreground">Total Stores</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-green-600">
                  {storesData.filter(store => store.status === 'active').length}
                </div>
                <p className="text-sm text-muted-foreground">Active Stores</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-red-600">
                  {storesData.filter(store => store.status === 'suspended').length}
                </div>
                <p className="text-sm text-muted-foreground">Suspended Stores</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-purple-600">
                  {storesData.filter(store => store.status === 'inactive').length}
                </div>
                <p className="text-sm text-muted-foreground">Inactive Stores</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Store Directory</h2>
            <Button size="sm">+ Add New Store</Button>
          </div>
          
          <DataTable 
            columns={storeColumns} 
            data={storesData}
            searchable
            searchField="name"
          />
        </TabsContent>
        
        <TabsContent value="products" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Selling Products</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable 
                columns={productColumns} 
                data={topSellingProducts}
                searchable
                searchField="name"
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="applications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Pending Store Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                No pending applications at this time.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StoresManagement;
