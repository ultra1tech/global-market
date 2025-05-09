
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  Search,
  Filter,
  Calendar,
  ChevronDown,
  Truck,
  Clock,
  CheckCircle,
  AlertCircle,
  X,
  User,
  Mail,
  Phone,
  Download,
  FileText,
  MapPin,
  CreditCard,
  Store,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { adminOrders } from "@/mocks/ordersData";

const OrdersPage = () => {
  const [orders, setOrders] = useState(adminOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [sortOption, setSortOption] = useState("newest");
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [showOrderDialog, setShowOrderDialog] = useState(false);
  
  // Order statistics
  const orderStats = {
    pending: orders.filter(order => order.status === "pending").length,
    processing: orders.filter(order => order.status === "processing").length,
    shipped: orders.filter(order => order.status === "shipped").length,
    delivered: orders.filter(order => order.status === "delivered").length,
    total: orders.length,
    totalValue: orders.reduce((sum, order) => sum + order.total, 0),
  };
  
  // Apply filters
  const filteredOrders = [...orders]
    .filter(order => {
      // Apply search filter
      if (searchQuery) {
        const lowercasedQuery = searchQuery.toLowerCase();
        
        // Search by order ID
        if (order.id.toLowerCase().includes(lowercasedQuery)) {
          return true;
        }
        
        // Search by customer name or email
        if (
          order.customerName.toLowerCase().includes(lowercasedQuery) ||
          order.customerEmail.toLowerCase().includes(lowercasedQuery)
        ) {
          return true;
        }
        
        // Search by store names
        if (order.stores.some(store => store.name.toLowerCase().includes(lowercasedQuery))) {
          return true;
        }
        
        return false;
      }
      return true;
    })
    .filter(order => {
      // Apply status filter
      if (statusFilter !== "all") {
        return order.status === statusFilter;
      }
      return true;
    })
    .filter(order => {
      // Apply date filter
      if (dateFilter === "all") {
        return true;
      }
      
      const orderDate = new Date(order.date);
      const now = new Date();
      
      switch (dateFilter) {
        case "today":
          return orderDate.toDateString() === now.toDateString();
        case "yesterday": {
          const yesterday = new Date();
          yesterday.setDate(now.getDate() - 1);
          return orderDate.toDateString() === yesterday.toDateString();
        }
        case "thisWeek": {
          const weekStart = new Date();
          weekStart.setDate(now.getDate() - now.getDay());
          return orderDate >= weekStart;
        }
        case "thisMonth": {
          return (
            orderDate.getMonth() === now.getMonth() &&
            orderDate.getFullYear() === now.getFullYear()
          );
        }
        default:
          return true;
      }
    })
    .sort((a, b) => {
      // Apply sorting
      switch (sortOption) {
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "total-high-low":
          return b.total - a.total;
        case "total-low-high":
          return a.total - b.total;
        case "newest":
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });
  
  const handleViewOrder = (order: any) => {
    setSelectedOrder(order);
    setShowOrderDialog(true);
  };
  
  const handleUpdateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus } 
        : order
    ));
    
    setShowOrderDialog(false);
    toast.success(`Order status updated to ${newStatus}`);
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "shipped":
        return <Truck className="h-4 w-4 text-blue-500" />;
      case "processing":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "pending":
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      default:
        return null;
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="mr-1 h-3 w-3" />
            Delivered
          </Badge>
        );
      case "shipped":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            <Truck className="mr-1 h-3 w-3" />
            Shipped
          </Badge>
        );
      case "processing":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <Clock className="mr-1 h-3 w-3" />
            Processing
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="outline" className="bg-orange-100 text-orange-800 hover:bg-orange-100">
            <AlertCircle className="mr-1 h-3 w-3" />
            Pending
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <Package className="h-6 w-6 text-marketplace-primary mr-2" />
            Orders Management
          </h1>
          <p className="text-gray-600">
            Track and manage all marketplace orders
          </p>
        </header>
        
        {/* Order Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500">Total Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{orderStats.total}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500">Total Value</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">${orderStats.totalValue.toFixed(2)}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500">Pending</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center">
              <AlertCircle className="h-5 w-5 text-orange-500 mr-2" />
              <p className="text-2xl font-bold">{orderStats.pending}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500">Processing</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center">
              <Clock className="h-5 w-5 text-yellow-500 mr-2" />
              <p className="text-2xl font-bold">{orderStats.processing}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500">Shipped</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center">
              <Truck className="h-5 w-5 text-blue-500 mr-2" />
              <p className="text-2xl font-bold">{orderStats.shipped}</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by order ID, customer, or store..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
              {searchQuery && (
                <button
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="thisWeek">This Week</SelectItem>
                <SelectItem value="thisMonth">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-500">
              {filteredOrders.length} order{filteredOrders.length !== 1 ? 's' : ''} found
            </div>
            
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="total-high-low">Total: High to Low</SelectItem>
                <SelectItem value="total-low-high">Total: Low to High</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No orders found</h2>
            <p className="text-gray-600">
              Try adjusting your filters to find what you're looking for.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Desktop Order Table */}
            <div className="hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order #</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Stores</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">#{order.id}</TableCell>
                      <TableCell>{new Date(order.date).toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>{order.customerName}</span>
                          <span className="text-xs text-gray-500">{order.customerEmail}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          {order.stores.map((store, index) => (
                            <Badge key={store.id} variant="outline" className="justify-start">
                              {store.name}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>${order.total.toFixed(2)}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              Actions
                              <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => handleViewOrder(order)}>
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {order.status !== "delivered" && (
                              <>
                                {order.status === "pending" && (
                                  <DropdownMenuItem onClick={() => handleUpdateOrderStatus(order.id, "processing")}>
                                    Mark as Processing
                                  </DropdownMenuItem>
                                )}
                                {order.status === "processing" && (
                                  <DropdownMenuItem onClick={() => handleUpdateOrderStatus(order.id, "shipped")}>
                                    Mark as Shipped
                                  </DropdownMenuItem>
                                )}
                                {order.status === "shipped" && (
                                  <DropdownMenuItem onClick={() => handleUpdateOrderStatus(order.id, "delivered")}>
                                    Mark as Delivered
                                  </DropdownMenuItem>
                                )}
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {/* Mobile Order Cards */}
            <div className="md:hidden divide-y">
              {filteredOrders.map((order) => (
                <div key={order.id} className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium">Order #{order.id}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div>{getStatusBadge(order.status)}</div>
                  </div>
                  
                  <div className="mb-2">
                    <p className="text-sm font-medium">{order.customerName}</p>
                    <p className="text-xs text-gray-500">{order.customerEmail}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-2">
                    {order.stores.map((store) => (
                      <Badge key={store.id} variant="outline" className="text-xs">
                        {store.name}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="flex -space-x-2">
                        {order.items.slice(0, 3).map((item) => (
                          <div
                            key={item.id}
                            className="h-6 w-6 rounded-full border border-white overflow-hidden"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        ))}
                        {order.items.length > 3 && (
                          <div className="h-6 w-6 rounded-full bg-gray-200 border border-white flex items-center justify-center text-xs">
                            +{order.items.length - 3}
                          </div>
                        )}
                      </div>
                      <span className="text-xs ml-2">{order.items.length} items</span>
                    </div>
                    <div className="font-medium">${order.total.toFixed(2)}</div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="w-full"
                    onClick={() => handleViewOrder(order)}
                  >
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Order Details Dialog */}
      <Dialog open={showOrderDialog} onOpenChange={setShowOrderDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Package className="h-5 w-5 mr-2" />
              Order #{selectedOrder?.id}
            </DialogTitle>
            <DialogDescription>
              {selectedOrder && new Date(selectedOrder.date).toLocaleString()}
            </DialogDescription>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="space-y-6">
              {/* Order Status */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center">
                    <div className="mr-3">
                      {getStatusIcon(selectedOrder.status)}
                    </div>
                    <div>
                      <p className="font-medium">
                        Status: {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {selectedOrder.status === "shipped" && selectedOrder.shipping.trackingNumber &&
                          <span>Tracking: {selectedOrder.shipping.trackingNumber}</span>
                        }
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    {selectedOrder.status === "pending" && (
                      <Button 
                        size="sm"
                        onClick={() => handleUpdateOrderStatus(selectedOrder.id, "processing")}
                      >
                        Mark as Processing
                      </Button>
                    )}
                    
                    {selectedOrder.status === "processing" && (
                      <Button 
                        size="sm"
                        onClick={() => handleUpdateOrderStatus(selectedOrder.id, "shipped")}
                      >
                        Mark as Shipped
                      </Button>
                    )}
                    
                    {selectedOrder.status === "shipped" && (
                      <Button 
                        size="sm"
                        onClick={() => handleUpdateOrderStatus(selectedOrder.id, "delivered")}
                      >
                        Mark as Delivered
                      </Button>
                    )}
                    
                    <Button variant="outline" size="sm" asChild>
                      <a href="#" onClick={(e) => {
                        e.preventDefault();
                        toast.info("Downloading invoice...");
                      }}>
                        <Download className="mr-2 h-4 w-4" />
                        Invoice
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Order Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Customer Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      Customer Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex">
                      <span className="font-medium w-24">Name:</span>
                      <span>{selectedOrder.customerName}</span>
                    </div>
                    <div className="flex">
                      <span className="font-medium w-24">Email:</span>
                      <span>
                        <a href={`mailto:${selectedOrder.customerEmail}`} className="text-marketplace-primary hover:underline">
                          {selectedOrder.customerEmail}
                        </a>
                      </span>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Shipping Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      Shipping Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex">
                      <span className="font-medium w-24">Address:</span>
                      <span>{selectedOrder.shipping.address}</span>
                    </div>
                    <div className="flex">
                      <span className="font-medium w-24">Method:</span>
                      <span>{selectedOrder.shipping.method}</span>
                    </div>
                    {selectedOrder.shipping.trackingNumber && (
                      <div className="flex">
                        <span className="font-medium w-24">Tracking:</span>
                        <span>{selectedOrder.shipping.trackingNumber}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                {/* Stores Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center">
                      <Store className="h-4 w-4 mr-2" />
                      Seller Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedOrder.stores.map((store: any) => (
                        <div key={store.id} className="flex items-center py-1">
                          <div className="flex-shrink-0 mr-3">
                            <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center">
                              <Store className="h-3 w-3 text-gray-600" />
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-medium">{store.name}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Payment Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Payment Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex">
                      <span className="font-medium w-24">Method:</span>
                      <span>{selectedOrder.payment.method}</span>
                    </div>
                    {selectedOrder.payment.lastFour && (
                      <div className="flex">
                        <span className="font-medium w-24">Card:</span>
                        <span>••••{selectedOrder.payment.lastFour}</span>
                      </div>
                    )}
                    <div className="flex">
                      <span className="font-medium w-24">Status:</span>
                      <span className="text-green-600 font-medium">
                        {selectedOrder.payment.status}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Order Items */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Order Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item: any) => (
                      <div 
                        key={item.id}
                        className="flex items-center p-3 border rounded-md"
                      >
                        <div className="h-16 w-16 rounded overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="ml-4 flex-1">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">
                            ${item.price.toFixed(2)} x {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Order Summary */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Subtotal</p>
                    <p className="text-sm text-gray-500">Shipping</p>
                    <p className="text-sm text-gray-500">Tax</p>
                    <p className="font-medium mt-2">Total</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">${(selectedOrder.total * 0.9).toFixed(2)}</p>
                    <p className="text-sm">${(selectedOrder.total * 0.05).toFixed(2)}</p>
                    <p className="text-sm">${(selectedOrder.total * 0.05).toFixed(2)}</p>
                    <p className="font-medium mt-2">${selectedOrder.total.toFixed(2)}</p>
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowOrderDialog(false)}>
                  Close
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrdersPage;
