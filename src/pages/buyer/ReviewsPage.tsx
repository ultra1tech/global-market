
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Star, Edit2, Trash2, AlertCircle } from 'lucide-react';
import BuyerLayout from './BuyerLayout';
import { toast } from 'sonner';

// Mock review data
const mockReviews = [
  {
    id: '1',
    productId: 'prod-1',
    productName: 'Handmade Ceramic Bowl',
    shopName: 'Artisan Ceramics',
    rating: 5,
    date: '2023-05-15',
    content: 'Beautiful craftsmanship! The colors are vibrant and the bowl is sturdy. Exactly as pictured and described. Would definitely buy from this seller again.',
    images: ['https://via.placeholder.com/100'],
    helpful: 4
  },
  {
    id: '2',
    productId: 'prod-2',
    productName: 'Organic Cotton T-Shirt',
    shopName: 'Eco Textiles',
    rating: 3,
    date: '2023-05-10',
    content: 'Nice material but the sizing runs small. I usually wear a medium but this felt more like a small. Good quality though.',
    images: [],
    helpful: 2
  },
  {
    id: '3',
    productId: 'prod-3',
    productName: 'Leather Wallet',
    shopName: 'Leather Crafts Co.',
    rating: 4,
    date: '2023-05-05',
    content: 'High quality leather and beautiful workmanship. The only reason I'm not giving 5 stars is because one of the card slots is a bit tight.',
    images: ['https://via.placeholder.com/100', 'https://via.placeholder.com/100'],
    helpful: 8
  }
];

// Mock products to review
const productsToReview = [
  {
    id: 'prod-4',
    name: 'Handcrafted Soap Collection',
    shopName: 'Natural Bath Co.',
    purchaseDate: '2023-05-12',
    image: 'https://via.placeholder.com/60'
  },
  {
    id: 'prod-5',
    name: 'Woven Basket',
    shopName: 'Global Artisan Goods',
    purchaseDate: '2023-05-08',
    image: 'https://via.placeholder.com/60'
  }
];

// Star rating component
const StarRating = ({ 
  rating, 
  setRating 
}: { 
  rating: number, 
  setRating?: (rating: number) => void 
}) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => setRating && setRating(star)}
          className={`${setRating ? 'cursor-pointer' : 'cursor-default'}`}
        >
          <Star 
            className={`h-5 w-5 ${
              star <= rating
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-300'
            }`} 
          />
        </button>
      ))}
    </div>
  );
};

const ReviewsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("my-reviews");
  const [newReviewRating, setNewReviewRating] = useState(0);
  const [newReviewContent, setNewReviewContent] = useState("");

  const handleSubmitReview = () => {
    if (newReviewRating === 0) {
      toast.error("Please select a star rating");
      return;
    }
    
    if (!newReviewContent.trim()) {
      toast.error("Please write a review");
      return;
    }
    
    toast.success("Review submitted successfully!");
    setNewReviewRating(0);
    setNewReviewContent("");
  };

  const handleDeleteReview = (reviewId: string) => {
    toast.success("Review deleted successfully");
    // In a real app, we would delete the review from the database
  };

  return (
    <BuyerLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">My Reviews</h1>
        <p className="text-gray-500">Manage your product reviews and feedback</p>
      </div>
      
      <Tabs defaultValue="my-reviews" onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="my-reviews">My Reviews</TabsTrigger>
          <TabsTrigger value="pending-reviews">Pending Reviews</TabsTrigger>
        </TabsList>
        
        <TabsContent value="my-reviews">
          {mockReviews.length > 0 ? (
            <div className="space-y-6">
              {mockReviews.map(review => (
                <div key={review.id} className="border rounded-lg p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-medium">{review.productName}</h3>
                      <p className="text-sm text-gray-500">
                        {review.shopName} • {new Date(review.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDeleteReview(review.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <StarRating rating={review.rating} />
                  </div>
                  
                  <p className="text-gray-700 mb-4">{review.content}</p>
                  
                  {review.images.length > 0 && (
                    <div className="flex gap-2 mb-4">
                      {review.images.map((img, idx) => (
                        <img 
                          key={idx} 
                          src={img} 
                          alt={`Review ${idx + 1}`}
                          className="w-20 h-20 object-cover rounded"
                        />
                      ))}
                    </div>
                  )}
                  
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{review.helpful} people found this helpful</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No reviews yet</h3>
              <p className="text-gray-500">
                You haven't written any reviews yet
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="pending-reviews">
          {productsToReview.length > 0 ? (
            <div className="space-y-4">
              {productsToReview.map(product => (
                <div key={product.id} className="border rounded-lg p-4 flex items-center">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded mr-4"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.shopName}</p>
                    <p className="text-xs text-gray-400">Purchased on {new Date(product.purchaseDate).toLocaleDateString()}</p>
                  </div>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Write Review</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Review {product.name}</DialogTitle>
                        <DialogDescription>
                          Share your experience to help other shoppers
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-4 py-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Product Rating</h4>
                          <StarRating rating={newReviewRating} setRating={setNewReviewRating} />
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-2">Your Review</h4>
                          <Textarea 
                            value={newReviewContent}
                            onChange={(e) => setNewReviewContent(e.target.value)}
                            placeholder="What did you like or dislike? How was the quality?"
                            className="min-h-[120px]"
                          />
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-2">Add Photos (Optional)</h4>
                          <div className="border-2 border-dashed rounded p-4 text-center">
                            <Button variant="outline">Upload Images</Button>
                            <p className="text-xs text-gray-500 mt-2">Max 5 images (PNG, JPG)</p>
                          </div>
                        </div>
                      </div>
                      
                      <DialogFooter>
                        <Button variant="outline" type="button">Cancel</Button>
                        <Button type="button" onClick={handleSubmitReview}>Submit Review</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No pending reviews</h3>
              <p className="text-gray-500">
                You have no products waiting to be reviewed
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </BuyerLayout>
  );
};

export default ReviewsPage;
