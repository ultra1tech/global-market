
import React, { useState } from "react";
import {
  CreditCard,
  Search,
  Filter,
  Calendar,
  ChevronDown,
  CheckCircle,
  AlertCircle,
  X,
  Download,
  FileText,
  Clock,
  ExternalLink,
  ArrowUpDown
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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

// Mock payment data
const mockPayments = [
  {
    id: "p1",
    orderId: "o1",
    amount: 134.97,
    currency: "USD",
    method: "Credit Card",
    processor: "Stripe",
    status: "completed",
    date: "2023-05-02T14:30:00Z",
    customerName: "John Buyer",
    customerEmail: "buyer@example.com",
    paymentId: "py_1NjKvT2eZvKYlo2CJfUhPxSZ",
    requiresReview: false,
    notes: ""
  },
  {
    id: "p2",
    orderId: "o2",
    amount: 79.99,
    currency: "USD",
    method: "PayPal",
    processor: "PayPal",
    status: "completed",
    date: "2023-05-12T09:15:00Z",
    customerName: "John Buyer",
    customerEmail: "buyer@example.com",
    paymentId: "7LN53698T92334412",
    requiresReview: false,
    notes: ""
  },
  {
    id: "p3",
    orderId: "o3",
    amount: 124.97,
    currency: "USD",
    method: "Credit Card",
    processor: "Stripe",
    status: "pending",
    date: "2023-05-15T16:45:00Z",
    customerName: "John Buyer",
    customerEmail: "buyer@example.com",
    paymentId: "py_1NjLvT2eZvKYlo2CJbNkWjUo",
    requiresReview: true,
    notes: "3D Secure verification required"
  },
  {
    id: "p4",
    orderId: "o4",
    amount: 59.99,
    currency: "USD",
    method: "Credit Card",
    processor: "Stripe",
    status: "pending",
    date: "2023-05-18T11:30:00Z",
    customerName: "John Buyer",
    customerEmail: "buyer@example.com",
    paymentId: "py_1NjMpT2eZvKYlo2CHeRqTvBn",
    requiresReview: true,
    notes: "Suspicious activity detected"
  },
  {
    id: "p5",
    orderId: "o5",
    amount: 299.99,
    currency: "USD",
    method: "Credit Card",
    processor: "Stripe",
    status: "completed",
    date: "2023-05-19T13:45:00Z",
    customerName: "Jane Customer",
    customerEmail: "jane@example.com",
    paymentId: "py_1NjNvT2eZvKYlo2CKiOpLsCm",
    requiresReview: false,
    notes: ""
  },
  {
    id: "p6",
    orderId: "o6",
    amount: 214.96,
    currency: "USD",
    method: "PayPal",
    processor: "PayPal",
    status: "completed",
    date: "2023-05-20T10:15:00Z",
    customerName: "Robert Smith",
    customerEmail: "robert@example.com",
    paymentId: "4KN29876H87243981",
    requiresReview: false,
    notes: ""
  },
  {
    id: "p7",
    orderId: "o7",
    amount: 149.95,
    currency: "EUR",
    method: "Bank Transfer",
    processor: "Manual",
    status: "pending",
    date: "2023-05-21T09:20:00Z",
    customerName: "Maria Rodriguez",
    customerEmail: "maria@example.com",
    paymentId: "WIRE-20230521-149",
    requiresReview: true,
    notes: "Waiting for bank confirmation"
  },
  {
    id: "p8",
    orderId: "o8",
    amount: 89.99,
    currency: "GBP",
    method: "Credit Card",
    processor: "Stripe",
    status: "failed",
    date: "2023-05-22T15:30:00Z",
    customerName: "David Wilson",
    customerEmail: "david@example.com",
    paymentId: "py_1NjQvT2eZvKYlo2CLkTpRsSn",
    requiresReview: false,
    notes: "Card declined"
  }
];

const PaymentsPage = () => {
  const [payments, setPayments] = useState(mockPayments);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [methodFilter, setMethodFilter] = useState("all");
  const [sortOption, setSortOption] = useState("newest");
  const [selectedPayment, setSelectedPayment] = useState<any | null>(null);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [paymentNote, setPaymentNote] = useState("");
  
  // Payment statistics
  const paymentStats = {
    completed: payments.filter(p => p.status === "completed").length,
    pending: payments.filter(p => p.status === "pending").length,
    failed: payments.filter(p => p.status === "failed").length,
    total: payments.length,
    totalValue: payments.reduce((sum, p) => sum + p.amount, 0).toFixed(2),
    requiresReview: payments.filter(p => p.requiresReview).length
  };
  
  // Apply filters
  const filteredPayments = [...payments]
    .filter(payment => {
      // Apply search filter
      if (searchQuery) {
        const lowercasedQuery = searchQuery.toLowerCase();
        
        // Search by payment ID or order ID
        if (
          payment.id.toLowerCase().includes(lowercasedQuery) ||
          payment.orderId.toLowerCase().includes(lowercasedQuery) ||
          payment.paymentId.toLowerCase().includes(lowercasedQuery)
        ) {
          return true;
        }
        
        // Search by customer name or email
        if (
          payment.customerName.toLowerCase().includes(lowercasedQuery) ||
          payment.customerEmail.toLowerCase().includes(lowercasedQuery)
        ) {
          return true;
        }
        
        return false;
      }
      return true;
    })
    .filter(payment => {
      // Apply status filter
      if (statusFilter === "review") {
        return payment.requiresReview;
      } else if (statusFilter !== "all") {
        return payment.status === statusFilter;
      }
      return true;
    })
    .filter(payment => {
      // Apply method filter
      if (methodFilter !== "all") {
        return payment.method === methodFilter;
      }
      return true;
    })
    .sort((a, b) => {
      // Apply sorting
      switch (sortOption) {
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "amount-high-low":
          return b.amount - a.amount;
        case "amount-low-high":
          return a.amount - b.amount;
        case "newest":
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });
  
  const handleViewPayment = (payment: any) => {
    setSelectedPayment(payment);
    setPaymentNote(payment.notes || "");
    setShowPaymentDialog(true);
  };
  
  const handleApprovePayment = (paymentId: string) => {
    setPayments(payments.map(payment => 
      payment.id === paymentId 
        ? { 
            ...payment, 
            status: "completed", 
            requiresReview: false,
            notes: paymentNote || payment.notes
          } 
        : payment
    ));
    
    setShowPaymentDialog(false);
    toast.success("Payment approved successfully");
  };
  
  const handleMarkAsFailed = (paymentId: string) => {
    setPayments(payments.map(payment => 
      payment.id === paymentId 
        ? { 
            ...payment, 
            status: "failed", 
            requiresReview: false,
            notes: paymentNote || payment.notes
          } 
        : payment
    ));
    
    setShowPaymentDialog(false);
    toast.success("Payment marked as failed");
  };
  
  const handleUpdateNotes = (paymentId: string) => {
    setPayments(payments.map(payment => 
      payment.id === paymentId 
        ? { ...payment, notes: paymentNote } 
        : payment
    ));
    
    toast.success("Payment notes updated");
  };
  
  const getStatusBadge = (status: string, requiresReview: boolean) => {
    if (requiresReview) {
      return (
        <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
          <AlertCircle className="mr-1 h-3 w-3" />
          Needs Review
        </Badge>
      );
    }
    
    switch (status) {
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="mr-1 h-3 w-3" />
            Completed
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            <Clock className="mr-1 h-3 w-3" />
            Pending
          </Badge>
        );
      case "failed":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
            <X className="mr-1 h-3 w-3" />
            Failed
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
            <CreditCard className="h-6 w-6 text-marketplace-primary mr-2" />
            Payment Management
          </h1>
          <p className="text-gray-600">
            Track and manage all payment transactions
          </p>
        </header>
        
        {/* Payment Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500">Total Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{paymentStats.total}</p>
              <p className="text-sm text-gray-500">${paymentStats.totalValue}</p>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer ${statusFilter === "completed" ? "border-marketplace-primary" : ""}`}
            onClick={() => setStatusFilter("completed")}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500">Completed</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <p className="text-2xl font-bold">{paymentStats.completed}</p>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer ${statusFilter === "pending" ? "border-marketplace-primary" : ""}`}
            onClick={() => setStatusFilter("pending")}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500">Pending</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center">
              <Clock className="h-5 w-5 text-blue-500 mr-2" />
              <p className="text-2xl font-bold">{paymentStats.pending}</p>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer ${statusFilter === "review" ? "border-marketplace-primary" : ""}`}
            onClick={() => setStatusFilter("review")}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-orange-500 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                Needs Review
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{paymentStats.requiresReview}</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by payment ID, order ID, or customer..."
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
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="review">Needs Review</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={methodFilter} onValueChange={setMethodFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Methods</SelectItem>
                <SelectItem value="Credit Card">Credit Card</SelectItem>
                <SelectItem value="PayPal">PayPal</SelectItem>
                <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-500">
              {filteredPayments.length} payment{filteredPayments.length !== 1 ? 's' : ''} found
            </div>
            
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="amount-high-low">Amount: High to Low</SelectItem>
                <SelectItem value="amount-low-high">Amount: Low to High</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Payments List */}
        {filteredPayments.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No payments found</h2>
            <p className="text-gray-600">
              Try adjusting your filters to find what you're looking for.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Desktop Payment Table */}
            <div className="hidden md:block overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Payment ID</TableHead>
                    <TableHead>Order</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        Amount
                        <ArrowUpDown className="ml-1 h-3.5 w-3.5" />
                      </div>
                    </TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.map((payment) => (
                    <TableRow key={payment.id} className={payment.requiresReview ? "bg-yellow-50" : ""}>
                      <TableCell className="font-medium">
                        <span title={payment.paymentId} className="truncate max-w-[150px] block">
                          {payment.paymentId}
                        </span>
                      </TableCell>
                      <TableCell>#{payment.orderId}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>{payment.customerName}</span>
                          <span className="text-xs text-gray-500">{payment.customerEmail}</span>
                        </div>
                      </TableCell>
                      <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        {payment.currency} {payment.amount.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {payment.method}
                        </Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(payment.status, payment.requiresReview)}</TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewPayment(payment)}
                        >
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {/* Mobile Payment Cards */}
            <div className="md:hidden divide-y">
              {filteredPayments.map((payment) => (
                <div 
                  key={payment.id} 
                  className={`p-4 ${payment.requiresReview ? "bg-yellow-50" : ""}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium">Payment #{payment.id}</p>
                      <p className="text-xs text-gray-500">
                        Order #{payment.orderId}
                      </p>
                    </div>
                    <div>{getStatusBadge(payment.status, payment.requiresReview)}</div>
                  </div>
                  
                  <div className="mb-2">
                    <p className="text-sm font-medium">{payment.customerName}</p>
                    <p className="text-xs text-gray-500">{payment.customerEmail}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div>
                      <p className="text-xs text-gray-500">Amount</p>
                      <p className="text-sm font-medium">
                        {payment.currency} {payment.amount.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Method</p>
                      <p className="text-sm">{payment.method}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <p className="text-xs text-gray-500">Date</p>
                      <p className="text-sm">{new Date(payment.date).toLocaleDateString()}</p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewPayment(payment)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Payment Details Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <CreditCard className="h-5 w-5 mr-2" />
              Payment Details
            </DialogTitle>
            <DialogDescription>
              {selectedPayment && `Payment ID: ${selectedPayment.paymentId}`}
            </DialogDescription>
          </DialogHeader>
          
          {selectedPayment && (
            <div className="space-y-6">
              {/* Payment Status */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-medium">Status</h3>
                    <div className="flex items-center mt-1">
                      {getStatusBadge(selectedPayment.status, selectedPayment.requiresReview)}
                      {selectedPayment.requiresReview && (
                        <span className="ml-2 text-sm text-yellow-800">
                          This payment requires manual review
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {(selectedPayment.status === "pending" || selectedPayment.requiresReview) && (
                    <div className="flex gap-2">
                      <Button 
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleApprovePayment(selectedPayment.id)}
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Approve
                      </Button>
                      
                      <Button 
                        size="sm"
                        variant="destructive"
                        onClick={() => handleMarkAsFailed(selectedPayment.id)}
                      >
                        <X className="mr-2 h-4 w-4" />
                        Mark as Failed
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Payment Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium mb-2">Payment Information</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Amount:</span>
                      <span className="text-sm font-medium">
                        {selectedPayment.currency} {selectedPayment.amount.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Method:</span>
                      <span className="text-sm">{selectedPayment.method}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Processor:</span>
                      <span className="text-sm">{selectedPayment.processor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Date:</span>
                      <span className="text-sm">{new Date(selectedPayment.date).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium mb-2">Order & Customer</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Order:</span>
                      <span className="text-sm">#{selectedPayment.orderId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Customer:</span>
                      <span className="text-sm">{selectedPayment.customerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Email:</span>
                      <span className="text-sm">{selectedPayment.customerEmail}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* External Links */}
              <div className="p-3 border rounded-lg">
                <h4 className="text-base font-medium mb-2">External References</h4>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                    <a 
                      href="#" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.preventDefault();
                        toast.info(`View payment ${selectedPayment.paymentId} in ${selectedPayment.processor}`);
                      }}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View in {selectedPayment.processor}
                    </a>
                  </Button>
                  
                  <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                    <a 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        toast.info("Downloading payment receipt...");
                      }}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Receipt
                    </a>
                  </Button>
                </div>
              </div>
              
              {/* Notes */}
              <div>
                <label className="text-base font-medium">Notes</label>
                <Textarea
                  placeholder="Add notes about this payment..."
                  value={paymentNote}
                  onChange={(e) => setPaymentNote(e.target.value)}
                  className="mt-2"
                />
                <div className="flex justify-end mt-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleUpdateNotes(selectedPayment.id)}
                  >
                    Update Notes
                  </Button>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowPaymentDialog(false)}>
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

export default PaymentsPage;
