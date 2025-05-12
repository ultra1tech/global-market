
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { useCart } from '@/contexts/CartContext';
import { Trash, ShoppingCart, ArrowRight, ShoppingBag, RefreshCw } from 'lucide-react';

const Cart = () => {
  const navigate = useNavigate();
  const { items, totalItems, totalPrice, updateQuantity, removeItem, clearCart } = useCart();

  // Function to handle quantity updates
  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(itemId, newQuantity);
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold flex items-center">
            <ShoppingCart className="mr-2 h-6 w-6" /> Your Cart {totalItems > 0 && `(${totalItems} ${totalItems === 1 ? 'item' : 'items'})`}
          </h1>
          {totalItems > 0 && (
            <Button 
              variant="outline" 
              size="sm"
              className="text-red-500 hover:text-red-600"
              onClick={() => {
                clearCart();
                toast.info('Cart has been cleared');
              }}
            >
              <Trash className="mr-2 h-4 w-4" />
              Clear Cart
            </Button>
          )}
        </div>

        {/* Empty Cart State */}
        {totalItems === 0 ? (
          <Card className="text-center py-16">
            <CardContent>
              <ShoppingBag className="mx-auto h-16 w-16 text-gray-300 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">
                Looks like you haven't added any products to your cart yet.
              </p>
              <Button asChild>
                <Link to="/browse">Browse Products</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Cart Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 border-b last:border-0">
                        <div className="flex items-center mb-4 sm:mb-0">
                          <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden mr-4">
                            <img 
                              src={item.image || '/placeholder.svg'} 
                              alt={item.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              Sold by {item.storeName || 'Unknown Seller'}
                            </p>
                            <p className="text-sm font-medium">${item.price.toFixed(2)}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center border rounded-md">
                            <button
                              className="px-3 py-1 border-r"
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              -
                            </button>
                            <span className="px-4 py-1">{item.quantity}</span>
                            <button
                              className="px-3 py-1 border-l"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                          
                          <div className="text-right">
                            <div className="font-medium">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                            <button
                              className="text-sm text-red-500 hover:text-red-600 flex items-center"
                              onClick={() => {
                                removeItem(item.id);
                                toast.success(`${item.name} removed from cart`);
                              }}
                            >
                              <Trash className="h-3 w-3 mr-1" /> Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Continue Shopping Button */}
              <div className="mt-6">
                <Button variant="outline" asChild>
                  <Link to="/browse">
                    <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
                    Continue Shopping
                  </Link>
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>Calculated at checkout</span>
                    </div>

                    <Separator />

                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>

                    <Button className="w-full" onClick={() => navigate('/checkout')}>
                      Proceed to Checkout
                    </Button>
                    
                    <div className="flex items-center justify-center text-sm text-muted-foreground">
                      <RefreshCw className="h-3 w-3 mr-2" /> Free 30-day returns
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Cart;
