
import React, { useState } from 'react';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Search, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { storeData } from '@/mocks/storesData';
import { Skeleton } from "@/components/ui/skeleton";

const SellersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Filter stores based on search term
  const filteredSellers = storeData.filter(
    seller => 
      seller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      seller.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleVerifyStore = (id: string, verify: boolean) => {
    // This would call an API in a real application
    console.log(`${verify ? 'Verify' : 'Unverify'} store with ID: ${id}`);
  };

  const handleDeleteStore = (id: string) => {
    // This would call an API in a real application
    console.log(`Delete store with ID: ${id}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Sellers</h1>
      
      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search by seller name or location"
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" onClick={() => setIsLoading(!isLoading)}>
          Toggle Loading State
        </Button>
      </div>
      
      {/* Sellers table */}
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Seller</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Products</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              // Loading skeletons
              Array(5).fill(0).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <Skeleton className="h-4 w-[150px]" />
                    </div>
                  </TableCell>
                  <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-12" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-16 rounded-full" /></TableCell>
                  <TableCell><Skeleton className="h-8 w-8 rounded-full" /></TableCell>
                </TableRow>
              ))
            ) : filteredSellers.length > 0 ? (
              filteredSellers.map(seller => (
                <TableRow key={seller.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {seller.logo ? (
                        <img
                          src={seller.logo}
                          alt={seller.name}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                          {seller.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <p className="font-medium">{seller.name}</p>
                        <p className="text-xs text-gray-500">{seller.contactInfo.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{seller.country}</TableCell>
                  <TableCell>{new Date(seller.joinDate).toLocaleDateString()}</TableCell>
                  <TableCell>{seller.productCount}</TableCell>
                  <TableCell>
                    {seller.verified ? (
                      <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-200">Verified</Badge>
                    ) : (
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleVerifyStore(seller.id, true)}>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Verify Seller
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleVerifyStore(seller.id, false)}>
                          <XCircle className="mr-2 h-4 w-4" />
                          Unverify Seller
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDeleteStore(seller.id)}
                          className="text-red-600 focus:text-red-600"
                        >
                          <XCircle className="mr-2 h-4 w-4" />
                          Delete Seller
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No sellers found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SellersPage;
