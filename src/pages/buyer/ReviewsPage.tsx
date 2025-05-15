
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import BuyerLayout from './BuyerLayout';

// Mock past orders to review
const ordersToReview = [
  {
    id: 'ORD-7845',
    date: 'April 28, 2023',
    seller: 'Artisan Crafts',
    items: [
      { id: 'P1', name: 'Handmade Ceramic Mug', image: 'https://via.placeholder.com/100' }
    ]
  },
  {
    id: 'ORD-7836',
    date: 'April 15, 2023',
    seller: 'Eco Friendly Store',
    items: [
      { id: 'P2', name: 'Organic Cotton T-Shirt', image: 'https://via.placeholder.com/100' },
      { id: 'P3', name: 'Bamboo Cutting Board', image: 'https://via.placeholder.com/100' }
    ]
  }
];

// Mock submitted reviews
const submittedReviews = [
  {
    id: 'R1',
    orderId: 'ORD-7235',
    productName: 'Hand-woven Wall Hanging',
    productImage: 'https://via.placeholder.com/100',
    seller: 'Home Decor Plus',
    date: 'March 20, 2023',
    rating: 5,
    comment: 'Absolutely love this wall hanging! The craftsmanship is outstanding and it looks even better in person than in the photos. The seller also included a handwritten note which was a nice touch. Would definitely recommend!',
    helpful: 8
  },
  {
    id: 'R2',
    orderId: 'ORD-7124',
    productName: 'Natural Soap Bar Set',
    productImage: 'https://via.placeholder.com/100',
    seller: 'Wellness Products',
    date: 'February 12, 2023',
    rating: 4,
    comment: 'Great soap with a lovely scent. My skin feels refreshed after using it. Taking off one star because the packaging was a bit excessive.',
    helpful: 4
  }
];

const ReviewsPage = () => {
  const [activeProduct, setActiveProduct] = useState<any>(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [pendingReviews, setPendingReviews] = useState(ordersToReview);
  const [completedReviews, setCompletedReviews] = useState(submittedReviews);
  
  const handleReviewClick = (order: any, item: any) => {
    setActiveProduct({
      ...item,
      orderId: order.id,
      orderDate: order.date,
      seller: order.seller
    });
    setRating(0);
    setReviewText('');
    setShowReviewDialog(true);
  };

  const handleCloseReview = () => {
    setShowReviewDialog(false);
    setActiveProduct(null);
    setRating(0);
    setReviewText('');
  };
  
  const handleSubmitReview = () => {
    if (rating === 0) {
      toast({
        title: "Rating Required",
        description: "Please select a star rating before submitting",
        variant: "destructive"
      });
      return;
    }
    
    if (reviewText.trim() === '') {
      toast({
        title: "Review Required",
        description: "Please enter a review comment",
        variant: "destructive"
      });
      return;
    }
    
    // Create new review and add to completed reviews
    const newReview = {
      id: `R${completedReviews.length + 1}`,
      orderId: activeProduct.orderId,
      productName: activeProduct.name,
      productImage: activeProduct.image,
      seller: activeProduct.seller,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      rating: rating,
      comment: reviewText,
      helpful: 0
    };
    
    setCompletedReviews([newReview, ...completedReviews]);
    
    // Remove the item from pending reviews
    const updatedPendingReviews = pendingReviews.map(order => {
      if (order.id === activeProduct.orderId) {
        // Filter out the reviewed item
        const updatedItems = order.items.filter(item => item.id !== activeProduct.id);
        
        // If no more items to review in this order, remove the order
        if (updatedItems.length === 0) {
          return null;
        }
        
        // Return updated order with remaining items
        return {
          ...order,
          items: updatedItems
        };
      }
      return order;
    }).filter(Boolean); // Remove any null orders
    
    setPendingReviews(updatedPendingReviews);
    
    // Show success toast
    toast({
      title: "Review Submitted",
      description: "Thank you for your feedback!",
      variant: "default"
    });
    
    // Close the dialog
    handleCloseReview();
  };
  
  const StarRating = ({ value, hover, onChange, onHover, onLeave }: any) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={24}
            className={`cursor-pointer ${
              (hover || value) >= star ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
            onClick={() => onChange(star)}
            onMouseEnter={() => onHover(star)}
            onMouseLeave={() => onLeave()}
          />
        ))}
      </div>
    );
  };
  
  return (
    <BuyerLayout>
      <div>
        <h1 className="text-2xl font-bold mb-6">My Reviews</h1>
        
        <Tabs defaultValue="pending" className="mb-6">
          <TabsList>
            <TabsTrigger value="pending">Pending Reviews</TabsTrigger>
            <TabsTrigger value="submitted">Submitted Reviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending" className="mt-4">
            {pendingReviews.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-gray-500">You don't have any pending reviews.</p>
                  <p className="text-gray-500">Your reviews help other buyers make informed decisions!</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {pendingReviews.map(order => (
                  <Card key={order.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-lg">Order {order.id}</CardTitle>
                        <p className="text-sm text-gray-500">{order.date}</p>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500 mb-4">Seller: {order.seller}</p>
                      <div className="space-y-4">
                        {order.items.map(item => (
                          <div key={item.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-12 h-12 object-cover rounded"
                              />
                              <p>{item.name}</p>
                            </div>
                            <Button 
                              onClick={() => handleReviewClick(order, item)}
                            >
                              Write Review
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="submitted" className="mt-4">
            {completedReviews.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-gray-500">You haven't submitted any reviews yet.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {completedReviews.map(review => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <img 
                          src={review.productImage} 
                          alt={review.productName} 
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-medium">{review.productName}</h3>
                              <p className="text-xs text-gray-500">Order {review.orderId}</p>
                            </div>
                            <p className="text-sm text-gray-500">{review.date}</p>
                          </div>
                          <p className="text-sm text-gray-500">Seller: {review.seller}</p>
                          <div className="flex mt-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                size={16}
                                className={`${
                                  review.rating >= star ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4">{review.comment}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Badge variant="outline" className="flex items-center gap-1">
                            <span>👍</span> {review.helpful} found this helpful
                          </Badge>
                        </div>
                        <Button variant="outline" size="sm">Edit Review</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Review Dialog */}
      <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Review for {activeProduct?.name}</DialogTitle>
          </DialogHeader>
          
          {activeProduct && (
            <>
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={activeProduct.image} 
                  alt={activeProduct.name} 
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="font-medium">{activeProduct.name}</h3>
                  <p className="text-sm text-gray-500">Sold by {activeProduct.seller}</p>
                  <p className="text-xs text-gray-500">Order {activeProduct.orderId} • {activeProduct.orderDate}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <p className="mb-2 font-medium">Rating</p>
                <StarRating 
                  value={rating}
                  hover={hoverRating}
                  onChange={setRating}
                  onHover={setHoverRating}
                  onLeave={() => setHoverRating(0)}
                />
                <p className="text-sm text-gray-500 mt-1">
                  {rating === 1 ? "Poor" : 
                   rating === 2 ? "Fair" : 
                   rating === 3 ? "Good" : 
                   rating === 4 ? "Very Good" : 
                   rating === 5 ? "Excellent" : "Select a rating"}
                </p>
              </div>
              
              <div className="mb-6">
                <p className="mb-2 font-medium">Your Review</p>
                <Textarea 
                  placeholder="Share your experience with this product..." 
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  rows={5}
                />
              </div>
              
              <DialogFooter className="flex justify-between sm:justify-between">
                <Button variant="outline" onClick={handleCloseReview}>Cancel</Button>
                <Button onClick={handleSubmitReview}>Submit Review</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </BuyerLayout>
  );
};

export default ReviewsPage;
