
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit, Trash2, Plus, Search } from "lucide-react";
import { toast } from "sonner";

// Mock product data
const products = [
  {
    id: "prod-1",
    name: "Handcrafted Wooden Bowl",
    price: 45.99,
    stock: 12,
    category: "Home & Kitchen",
    status: "active",
    image: "https://via.placeholder.com/150",
    sales: 28,
    rating: 4.7
  },
  {
    id: "prod-2",
    name: "Organic Cotton T-Shirt",
    price: 29.99,
    stock: 25,
    category: "Fashion",
    status: "active",
    image: "https://via.placeholder.com/150",
    sales: 56,
    rating: 4.5
  },
  {
    id: "prod-3",
    name: "Artisan Coffee Mug",
    price: 18.50,
    stock: 32,
    category: "Home & Kitchen",
    status: "active",
    image: "https://via.placeholder.com/150",
    sales: 42,
    rating: 4.8
  },
  {
    id: "prod-4",
    name: "Hand-woven Wall Hanging",
    price: 65.00,
    stock: 8,
    category: "Home Decor",
    status: "active",
    image: "https://via.placeholder.com/150",
    sales: 19,
    rating: 4.9
  },
  {
    id: "prod-5",
    name: "Natural Soap Bar",
    price: 8.99,
    stock: 45,
    category: "Beauty",
    status: "active",
    image: "https://via.placeholder.com/150",
    sales: 87,
    rating: 4.6
  },
  {
    id: "prod-6",
    name: "Leather Journal",
    price: 24.95,
    stock: 0,
    category: "Stationery",
    status: "out-of-stock",
    image: "https://via.placeholder.com/150",
    sales: 38,
    rating: 4.7
  },
  {
    id: "prod-7",
    name: "Handmade Ceramic Planter",
    price: 32.00,
    stock: 6,
    category: "Home Decor",
    status: "active",
    image: "https://via.placeholder.com/150",
    sales: 24,
    rating: 4.4
  },
  {
    id: "prod-8",
    name: "Beeswax Candle Set",
    price: 19.95,
    stock: 15,
    category: "Home & Kitchen",
    status: "active",
    image: "https://via.placeholder.com/150",
    sales: 31,
    rating: 4.7
  }
];

const ProductsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [view, setView] = useState("grid");
  
  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = category === "all" || product.category === category;
    
    return matchesSearch && matchesCategory;
  });
  
  // Extract unique categories from products
  const categories = ["all", ...Array.from(new Set(products.map(p => p.category)))];
  
  const handleDelete = (productId: string) => {
    toast.success(`Product ${productId} deleted successfully`);
  };

  const handleEdit = (productId: string) => {
    navigate(`/seller-dashboard/edit-product/${productId}`);
  };
  
  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-gray-500">Manage your product listings</p>
        </div>
        
        <Link to="/seller-dashboard/add-product">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </Link>
      </div>
      
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search products..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat === "all" ? "All Categories" : cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="border rounded-md flex">
                <Button
                  variant={view === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setView("grid")}
                  className="px-3"
                >
                  Grid
                </Button>
                <Button
                  variant={view === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setView("list")}
                  className="px-3"
                >
                  List
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-lg p-8 text-center">
          <p className="text-gray-500 mb-4">No products found matching your criteria.</p>
          <Link to="/seller-dashboard/add-product">
            <Button>Add Your First Product</Button>
          </Link>
        </div>
      ) : view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="aspect-video w-full overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="h-full w-full object-cover transition-all hover:scale-105"
                />
              </div>
              <CardHeader className="p-4">
                <div className="flex justify-between">
                  <Badge variant={product.status === "active" ? "default" : "destructive"}>
                    {product.status === "active" ? "Active" : "Out of Stock"}
                  </Badge>
                  <div className="flex items-center text-yellow-500">
                    <span className="mr-1">{product.rating}</span>
                    <span>★</span>
                  </div>
                </div>
                <CardTitle className="mt-2 line-clamp-1">{product.name}</CardTitle>
                <CardDescription className="flex justify-between items-center">
                  <span>${product.price.toFixed(2)}</span>
                  <span className="text-sm">{product.sales} sold</span>
                </CardDescription>
              </CardHeader>
              <CardFooter className="p-4 pt-0 flex justify-between">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-1/2 mr-1"
                  onClick={() => handleEdit(product.id)}
                >
                  <Edit className="h-4 w-4 mr-1" /> Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-1/2 ml-1 text-red-500 hover:bg-red-50"
                  onClick={() => handleDelete(product.id)}
                >
                  <Trash2 className="h-4 w-4 mr-1" /> Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-3 text-left">Image</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Stock</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Sales</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-b">
                  <td className="px-4 py-3">
                    <img src={product.image} alt={product.name} className="h-10 w-10 object-cover rounded" />
                  </td>
                  <td className="px-4 py-3 font-medium">{product.name}</td>
                  <td className="px-4 py-3 text-gray-500">{product.category}</td>
                  <td className="px-4 py-3">${product.price.toFixed(2)}</td>
                  <td className="px-4 py-3">{product.stock}</td>
                  <td className="px-4 py-3">
                    <Badge variant={product.status === "active" ? "default" : "destructive"}>
                      {product.status === "active" ? "Active" : "Out of Stock"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">{product.sales}</td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleEdit(product.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-red-500 hover:bg-red-50"
                        onClick={() => handleDelete(product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
