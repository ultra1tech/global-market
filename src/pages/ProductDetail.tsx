
import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { allProducts, getRelatedProducts } from '@/mocks/productsData';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { Heart, Share2, ArrowLeft, Star, Truck, Shield, Clock } from 'lucide-react';
import { toast } from 'sonner';
import ProductCard from '@/components/shared/ProductCard';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { t } = useLanguage();
  const { formatPrice } = useCurrency();
  const [quantity, setQuantity] = useState(1);
  
  // Find the product with the matching ID
  const product = allProducts.find(p => p.id === id);
  
  // If product not found, show error message
  if (!product) {
    return (
      <MainLayout>
        <div className="marketplace-container py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">{t('product.notFound')}</h2>
          <p className="mb-8">{t('product.notFoundMessage')}</p>
          <Button asChild>
            <Link to="/browse">{t('product.browseProducts')}</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= (product.stock || 99)) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast(`${product.name} ${t('cart.added')}`);
  };
  
  // Get related products
  const relatedProducts = getRelatedProducts(product.category || '', product.id, 4);

  // Get the number of reviews with a fallback to 0
  const reviewCount = product.reviews || 0;

  return (
    <MainLayout>
      <div className="marketplace-container py-8">
        {/* Back button */}
        <Link to="/browse" className="inline-flex items-center text-marketplace-primary mb-6 hover:underline">
          <ArrowLeft size={16} className="mr-2" />
          {t('common.backToProducts')}
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div>
            {product.images && product.images.length > 1 ? (
              <Carousel className="w-full">
                <CarouselContent>
                  {product.images.map((img, index) => (
                    <CarouselItem key={index}>
                      <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                        <img 
                          src={img} 
                          alt={`${product.name} - image ${index + 1}`} 
                          className="w-full h-auto object-contain"
                          style={{ maxHeight: '500px' }}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-center mt-4 gap-2">
                  <CarouselPrevious className="relative" />
                  <CarouselNext className="relative" />
                </div>
              </Carousel>
            ) : (
              <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-auto object-contain"
                  style={{ maxHeight: '500px' }}
                />
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div>
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.name}</h1>
                <Link to={`/stores/${product.storeId}`} className="text-marketplace-primary hover:underline">
                  {product.storeName}
                </Link>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="icon">
                  <Heart size={18} />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 size={18} />
                </Button>
              </div>
            </div>
            
            {/* Rating */}
            <div className="flex items-center mt-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={i < Math.floor(product.rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
                />
              ))}
              <span className="ml-2 text-sm text-gray-600">
                {product.rating} ({reviewCount} {t('product.reviews')})
              </span>
            </div>
            
            {/* Price */}
            <div className="mt-6 mb-6">
              <span className="text-3xl font-bold text-marketplace-primary">{formatPrice(product.price)}</span>
              {/* Conditionally render old price only if it exists */}
              {product.oldPrice && (
                <span className="ml-3 text-lg text-gray-500 line-through">{formatPrice(product.oldPrice)}</span>
              )}
            </div>
            
            {/* Description */}
            <div className="mb-8">
              <h3 className="font-semibold mb-2">{t('product.description')}</h3>
              <p className="text-gray-600">{product.description || t('product.noDescription')}</p>
            </div>
            
            {/* Quantity Selector */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2">{t('product.quantity')}</h3>
              <div className="flex items-center border rounded-md w-32">
                <button
                  className="px-3 py-1 border-r"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="px-4 py-1 flex-1 text-center">{quantity}</span>
                <button
                  className="px-3 py-1 border-l"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= (product.stock || 99)}
                >
                  +
                </button>
              </div>
              {product.stock && product.stock < 10 && (
                <p className="text-sm text-orange-500 mt-2">
                  {t('product.onlyXLeft', { count: product.stock })}
                </p>
              )}
            </div>
            
            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="flex-1" onClick={handleAddToCart}>
                {t('product.addToCart')}
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => {
                handleAddToCart();
                navigate('/cart');
              }}>
                {t('product.buyNow')}
              </Button>
            </div>
            
            {/* Shipping Info */}
            <div className="mt-8 space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <Truck className="h-4 w-4 mr-2 text-marketplace-primary" />
                <span>{t('product.freeShipping')}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Shield className="h-4 w-4 mr-2 text-marketplace-primary" />
                <span>{t('product.warrantyGuarantee')}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-2 text-marketplace-primary" />
                <span>{t('product.deliveryEstimate', { days: '3-5' })}</span>
              </div>
            </div>
            
            {/* Additional Info */}
            <div className="mt-8 border-t pt-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500 text-sm">{t('product.category')}</p>
                  <p>{product.category || t('product.uncategorized')}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">{t('product.origin')}</p>
                  <p>{product.origin || t('product.unknown')}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">{t('product.inStock')}</p>
                  <p>{product.stock > 0 ? t('product.yes') : t('product.no')}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">{t('product.shipping')}</p>
                  <p>{t('product.freeShipping')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">{t('product.relatedProducts')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map(relatedProduct => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ProductDetail;
