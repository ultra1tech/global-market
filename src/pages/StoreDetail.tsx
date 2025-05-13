
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MessageCircle, Star, MapPin, Mail, Phone } from 'lucide-react';
import { getStoreById } from '@/mocks/storesData';
import { getProductsByStore } from '@/mocks/productsData';
import ProductCard from '@/components/shared/ProductCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { toast } from 'sonner';

const StoreDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [store, setStore] = useState(id ? getStoreById(id) : null);
  const [products, setProducts] = useState(id ? getProductsByStore(id) : []);
  const { t } = useLanguage();
  
  useEffect(() => {
    if (id) {
      const storeData = getStoreById(id);
      setStore(storeData);
      setProducts(getProductsByStore(id));
    }
  }, [id]);
  
  const handleContactSeller = () => {
    toast.success(t('store.contactSent'));
  };
  
  if (!store) {
    return (
      <MainLayout>
        <div className="marketplace-container py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">{t('store.notFound')}</h2>
          <p className="mb-8">{t('store.notFoundDescription')}</p>
          <Button asChild>
            <Link to="/stores">{t('store.browseStores')}</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="relative">
        {/* Store Cover Image */}
        <div className="relative w-full h-60 md:h-80 bg-gray-100">
          {store.coverImage ? (
            <AspectRatio ratio={3/1} className="bg-muted">
              <img 
                src={store.coverImage} 
                alt={`${store.name} cover`} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30"></div>
            </AspectRatio>
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">{t('store.noCoverImage')}</span>
            </div>
          )}
        </div>
        
        <div className="marketplace-container relative -mt-16 pb-8">
          {/* Store Logo and Basic Info */}
          <Card className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row items-center md:items-start">
              <div className="w-24 h-24 rounded-full border-4 border-white shadow-md overflow-hidden bg-white">
                {store.logo ? (
                  <img 
                    src={store.logo} 
                    alt={`${store.name} logo`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <span className="text-2xl font-semibold text-gray-400">
                      {store.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              <div className="md:ml-6 mt-4 md:mt-0 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start">
                  <h1 className="text-3xl font-bold">{store.name}</h1>
                  {store.verified && (
                    <Badge className="ml-2 bg-marketplace-primary">
                      {t('store.verified')}
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center justify-center md:justify-start mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.floor(store.rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
                    />
                  ))}
                  <span className="ml-2 text-sm">
                    {store.rating} ({store.reviewCount} {t('store.reviews')})
                  </span>
                </div>
                
                <p className="mt-2 text-gray-600">{store.description}</p>
                
                <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin size={16} className="mr-1" />
                    {store.country}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Mail size={16} className="mr-1" />
                    {store.contactInfo.email}
                  </div>
                  {store.contactInfo.phone && (
                    <div className="flex items-center text-sm text-gray-500">
                      <Phone size={16} className="mr-1" />
                      {store.contactInfo.phone}
                    </div>
                  )}
                </div>
                
                <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                  {store.languages.map((lang, index) => (
                    <Badge key={index} variant="outline">{lang}</Badge>
                  ))}
                </div>
                
                <div className="mt-5">
                  <Button 
                    onClick={handleContactSeller} 
                    className="bg-marketplace-primary hover:bg-marketplace-primary/90"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    {t('store.contactSeller')}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
          
          {/* Store Products Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6">
              {t('store.storeProducts')} ({products.length})
            </h2>
            
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-xl mb-4">{t('store.noProducts')}</p>
                <Button asChild>
                  <Link to="/browse">{t('store.browseCatalog')}</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default StoreDetail;
