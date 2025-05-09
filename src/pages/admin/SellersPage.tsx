
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Store,
  Search,
  Filter,
  CheckCircle,
  X,
  AlertTriangle,
  ChevronDown,
  User,
  Mail,
  MapPin,
  CalendarIcon,
  ShieldCheck,
  Shield,
  ShieldX,
  FileText,
  Eye
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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { allStores } from "@/mocks/storesData";

// Mock seller data with pending status
const mockSellers = [
  ...allStores.map(store => ({
    id: store.id,
    name: store.name,
    storeName: store.name,
    email: `contact@${store.name.toLowerCase().replace(/\s+/g, '')}.com`,
    country: store.country,
    joinDate: store.joinDate,
    productsCount: store.productsCount,
    status: "approved",
    logo: store.logo
  })),
  {
    id: "s9",
    name: "Emma Johnson",
    storeName: "Emma's Vintage Finds",
    email: "emma@vintagefinds.com",
    country: "United States",
    joinDate: "2023-04-15",
    productsCount: 0,
    status: "pending",
    logo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3"
  },
  {
    id: "s10",
    name: "Michael Chen",
    storeName: "Global Treasures",
    email: "michael@globaltreasures.com",
    country: "Singapore",
    joinDate: "2023-04-18",
    productsCount: 0,
    status: "pending",
    logo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3"
  },
  {
    id: "s11",
    name: "Sofia Rodriguez",
    storeName: "Artisan Crafts Co.",
    email: "sofia@artisancrafts.com",
    country: "Mexico",
    joinDate: "2023-04-20",
    productsCount: 0,
    status: "pending",
    logo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3"
  },
  {
    id: "s12",
    name: "Ahmed Al-Farsi",
    storeName: "Desert Treasures",
    email: "ahmed@deserttreasures.com",
    country: "United Arab Emirates",
    joinDate: "2023-04-10",
    productsCount: 0,
    status: "rejected",
    logo: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3"
  },
];

const SellersPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sellers, setSellers] = useState(mockSellers);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState(searchParams.get("status") || "all");
  const [countryFilter, setCountryFilter] = useState("all");
  const [sortOption, setSortOption] = useState("newest");
  const [selectedSeller, setSelectedSeller] = useState<any | null>(null);
  const [showSellerDialog, setShowSellerDialog] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  // Update URL when status filter changes
  useEffect(() => {
    if (statusFilter === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ status: statusFilter });
    }
  }, [statusFilter, setSearchParams]);
  
  // Get unique countries
  const countries = Array.from(new Set(sellers.map(s => s.country)));
  
  // Seller statistics
  const sellerStats = {
    total: sellers.length,
    approved: sellers.filter(s => s.status === "approved").length,
    pending: sellers.filter(s => s.status === "pending").length,
    rejected: sellers.filter(s => s.status === "rejected").length,
  };
  
  // Apply filters and sort
  const filteredSellers = [...sellers]
    .filter(seller => {
      // Apply search filter
      if (searchQuery) {
        const lowercasedQuery = searchQuery.toLowerCase();
        return (
          seller.name.toLowerCase().includes(lowercasedQuery) ||
          seller.storeName.toLowerCase().includes(lowercasedQuery) ||
          seller.email.toLowerCase().includes(lowercasedQuery)
        );
      }
      return true;
    })
    .filter(seller => {
      // Apply status filter
      if (statusFilter !== "all") {
        return seller.status === statusFilter;
      }
      return true;
    })
    .filter(seller => {
      // Apply country filter
      if (countryFilter !== "all") {
        return seller.country === countryFilter;
      }
      return true;
    })
    .sort((a, b) => {
      // Apply sorting
      switch (sortOption) {
        case "oldest":
          return new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime();
        case "name-asc":
          return a.storeName.localeCompare(b.storeName);
        case "name-desc":
          return b.storeName.localeCompare(a.storeName);
        case "newest":
        default:
          return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime();
      }
    });
  
  const handleViewSeller = (seller: any) => {
    setSelectedSeller(seller);
    setShowSellerDialog(true);
  };
  
  const handleApproveSeller = (sellerId: string) => {
    setSellers(sellers.map(seller => 
      seller.id === sellerId 
        ? { ...seller, status: "approved" } 
        : seller
    ));
    
    setShowSellerDialog(false);
    toast.success("Seller approved successfully");
  };
  
  const handleRejectSeller = (sellerId: string) => {
    if (!rejectionReason.trim()) {
      toast.error("Please provide a reason for rejection");
      return;
    }
    
    setSellers(sellers.map(seller => 
      seller.id === sellerId 
        ? { ...seller, status: "rejected" } 
        : seller
    ));
    
    setShowSellerDialog(false);
    toast.success("Seller rejected");
    setRejectionReason("");
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="mr-1 h-3 w-3" />
            Approved
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <AlertTriangle className="mr-1 h-3 w-3" />
            Pending
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
            <X className="mr-1 h-3 w-3" />
            Rejected
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
            <Store className="h-6 w-6 text-marketplace-primary mr-2" />
            Seller Management
          </h1>
          <p className="text-gray-600">
            Review and manage seller accounts
          </p>
        </header>
        
        {/* Seller Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card 
            className={`cursor-pointer ${statusFilter === "all" ? "border-marketplace-primary" : ""}`}
            onClick={() => setStatusFilter("all")}
          >
            <CardContent className="p-4">
              <p className="text-sm font-medium text-gray-500">All Sellers</p>
              <p className="text-xl font-bold mt-1">{sellerStats.total}</p>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer ${statusFilter === "approved" ? "border-marketplace-primary" : ""}`}
            onClick={() => setStatusFilter("approved")}
          >
            <CardContent className="p-4">
              <p className="text-sm font-medium text-gray-500">Approved</p>
              <p className="text-xl font-bold mt-1">{sellerStats.approved}</p>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer ${statusFilter === "pending" ? "border-marketplace-primary" : ""}`}
            onClick={() => setStatusFilter("pending")}
          >
            <CardContent className="p-4">
              <p className="text-sm font-medium text-orange-500 flex items-center">
                <AlertTriangle className="h-4 w-4 mr-1" />
                Pending Review
              </p>
              <p className="text-xl font-bold mt-1">{sellerStats.pending}</p>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer ${statusFilter === "rejected" ? "border-marketplace-primary" : ""}`}
            onClick={() => setStatusFilter("rejected")}
          >
            <CardContent className="p-4">
              <p className="text-sm font-medium text-red-500 flex items-center">
                <X className="h-4 w-4 mr-1" />
                Rejected
              </p>
              <p className="text-xl font-bold mt-1">{sellerStats.rejected}</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by seller or store name, email..."
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
            
            <div className="flex gap-3">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={countryFilter} onValueChange={setCountryFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Countries</SelectItem>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                  <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {/* Sellers List */}
        {filteredSellers.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <Store className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No sellers found</h2>
            <p className="text-gray-600">
              {searchQuery || statusFilter !== "all" || countryFilter !== "all"
                ? "Try adjusting your filters to find what you're looking for."
                : "There are no sellers in the system yet."}
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Desktop Seller Table */}
            <div className="hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Seller / Store</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Country</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSellers.map((seller) => (
                    <TableRow key={seller.id}>
                      <TableCell>
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                            <img 
                              src={seller.logo} 
                              alt={seller.storeName} 
                              className="h-full w-full object-cover" 
                            />
                          </div>
                          <div>
                            <div className="font-medium">{seller.storeName}</div>
                            <div className="text-sm text-gray-500">{seller.name}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{seller.email}</TableCell>
                      <TableCell>{seller.country}</TableCell>
                      <TableCell>{new Date(seller.joinDate).toLocaleDateString()}</TableCell>
                      <TableCell>{getStatusBadge(seller.status)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleViewSeller(seller)}
                          >
                            Review
                          </Button>
                          {seller.status === "pending" && (
                            <>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="border-green-500 text-green-600 hover:bg-green-50"
                                onClick={() => handleApproveSeller(seller.id)}
                              >
                                <CheckCircle className="h-3.5 w-3.5 mr-1" />
                                Approve
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="border-red-500 text-red-600 hover:bg-red-50"
                                onClick={() => handleViewSeller(seller)}
                              >
                                <X className="h-3.5 w-3.5 mr-1" />
                                Reject
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {/* Mobile Seller Cards */}
            <div className="md:hidden divide-y">
              {filteredSellers.map((seller) => (
                <div key={seller.id} className="p-4">
                  <div className="flex items-center mb-3">
                    <div className="h-12 w-12 rounded-full overflow-hidden">
                      <img 
                        src={seller.logo} 
                        alt={seller.storeName} 
                        className="h-full w-full object-cover" 
                      />
                    </div>
                    <div className="ml-3">
                      <h3 className="font-medium">{seller.storeName}</h3>
                      <p className="text-sm text-gray-500">{seller.name}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="text-sm">{seller.email}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Country</p>
                      <p className="text-sm">{seller.country}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-xs text-gray-500">Joined</p>
                      <p className="text-sm">{new Date(seller.joinDate).toLocaleDateString()}</p>
                    </div>
                    <div>{getStatusBadge(seller.status)}</div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewSeller(seller)}
                    >
                      Review Details
                    </Button>
                    
                    {seller.status === "pending" && (
                      <>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-green-500 text-green-600 hover:bg-green-50"
                          onClick={() => handleApproveSeller(seller.id)}
                        >
                          <CheckCircle className="h-3.5 w-3.5 mr-1" />
                          Approve
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-red-500 text-red-600 hover:bg-red-50"
                          onClick={() => handleViewSeller(seller)}
                        >
                          <X className="h-3.5 w-3.5 mr-1" />
                          Reject
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Seller Details Dialog */}
      <Dialog open={showSellerDialog} onOpenChange={setShowSellerDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Seller Review</DialogTitle>
            <DialogDescription>
              Review seller details and update approval status
            </DialogDescription>
          </DialogHeader>
          
          {selectedSeller && (
            <div className="space-y-6">
              {/* Seller Header */}
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 rounded-full overflow-hidden">
                  <img 
                    src={selectedSeller.logo} 
                    alt={selectedSeller.storeName} 
                    className="h-full w-full object-cover" 
                  />
                </div>
                <div>
                  <h3 className="text-lg font-medium">{selectedSeller.storeName}</h3>
                  <p className="text-gray-500">{selectedSeller.name}</p>
                  <div className="mt-1">{getStatusBadge(selectedSeller.status)}</div>
                </div>
              </div>
              
              {/* Seller Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Mail className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm font-medium">Contact Email</span>
                  </div>
                  <p className="text-sm pl-6">{selectedSeller.email}</p>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center mb-2">
                    <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm font-medium">Country</span>
                  </div>
                  <p className="text-sm pl-6">{selectedSeller.country}</p>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center mb-2">
                    <CalendarIcon className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm font-medium">Join Date</span>
                  </div>
                  <p className="text-sm pl-6">{new Date(selectedSeller.joinDate).toLocaleDateString()}</p>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Package className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm font-medium">Products</span>
                  </div>
                  <p className="text-sm pl-6">{selectedSeller.productsCount} products</p>
                </div>
              </div>
              
              {/* Store Documentation (Mock) */}
              <div className="space-y-2">
                <h4 className="text-base font-medium">Submitted Documentation</h4>
                
                <div className="p-3 border rounded-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-sm">Business Registration Document</span>
                  </div>
                  <Button variant="outline" size="sm">
                    <Eye className="h-3.5 w-3.5 mr-1" />
                    View
                  </Button>
                </div>
                
                <div className="p-3 border rounded-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-sm">ID Verification</span>
                  </div>
                  <Button variant="outline" size="sm">
                    <Eye className="h-3.5 w-3.5 mr-1" />
                    View
                  </Button>
                </div>
              </div>
              
              {/* Rejection Reason (only shown when rejecting a pending seller) */}
              {selectedSeller.status === "pending" && (
                <div>
                  <label className="text-base font-medium">Rejection Reason</label>
                  <p className="text-sm text-gray-500 mb-2">
                    If rejecting this seller, please provide a reason for the rejection.
                  </p>
                  <Textarea
                    placeholder="Enter reason for rejection..."
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                  />
                </div>
              )}
              
              <DialogFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setShowSellerDialog(false)}>
                  Close
                </Button>
                <div className="flex gap-3">
                  {selectedSeller.status === "pending" && (
                    <>
                      <Button
                        variant="outline"
                        className="border-green-500 text-green-600 hover:bg-green-50"
                        onClick={() => handleApproveSeller(selectedSeller.id)}
                      >
                        <ShieldCheck className="h-4 w-4 mr-2" />
                        Approve Seller
                      </Button>
                      <Button
                        variant="outline"
                        className="border-red-500 text-red-600 hover:bg-red-50"
                        onClick={() => handleRejectSeller(selectedSeller.id)}
                      >
                        <ShieldX className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                    </>
                  )}
                </div>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SellersPage;
