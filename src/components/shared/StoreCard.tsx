
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Store } from '@/mocks/storesData';
import { Star, MapPin, Store as StoreIcon } from 'lucide-react';

interface StoreCardProps {
  store: Store;
}

const StoreCard: React.FC<StoreCardProps> = ({ store }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <div className="h-36 bg-gray-100">
          {store.coverImage ? (
            <img 
              src={store.coverImage} 
              alt={`${store.name} cover`} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <StoreIcon size={48} className="text-gray-400" />
            </div>
          )}
        </div>
        <div className="absolute -bottom-8 left-4">
          <div className="w-16 h-16 rounded-full border-4 border-white bg-white overflow-hidden">
            {store.logo ? (
              <img 
                src={store.logo} 
                alt={store.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <StoreIcon size={24} className="text-gray-400" />
              </div>
            )}
          </div>
        </div>
        {store.verified && (
          <Badge className="absolute top-2 right-2 bg-marketplace-primary">
            Verified
          </Badge>
        )}
      </div>
      <CardContent className="pt-10 pb-4">
        <Link to={`/stores/${store.id}`}>
          <h3 className="font-semibold text-lg hover:text-marketplace-primary">
            {store.name}
          </h3>
        </Link>
        <div className="flex items-center text-sm text-gray-500 mt-1">
          <MapPin size={14} className="mr-1" />
          <span>{store.country}</span>
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center">
            <Star size={16} className="text-yellow-500 mr-1" />
            <span className="text-sm font-medium">
              {store.rating} ({store.reviewCount} reviews)
            </span>
          </div>
          <span className="text-xs text-gray-500">
            {store.productCount} products
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default StoreCard;
