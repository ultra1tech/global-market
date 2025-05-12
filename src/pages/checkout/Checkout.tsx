
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { useCart } from '@/contexts/CartContext';
import { Check, MapPin, CreditCard, Wallet, Truck, ShieldCheck } from 'lucide-react';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('card');
  
  // Form state for shipping info
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Kenya',
    phone: '',
    email: ''
  });
  
  const handleShippingInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const shippingCost = shippingMethod === 'express' ? 15.00 : 5.00;
  const orderTotal = totalPrice + shippingCost;
  
  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Here we would process the order through an API
    // For now, we'll just simulate a successful order
    
    setTimeout(() => {
      clearCart();
      toast.success('Order placed successfully!');
      navigate('/buyer/orders');
    }, 1500);
  };
  
  // If cart is empty, redirect to cart page
  if (!items.length) {
    return (
      <MainLayout>
        <div className="container mx-auto py-16 px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="mb-6">Add some products to your cart before proceeding to checkout.</p>
          <Button asChild>
            <a href="/browse">Browse Products</a>
          </Button>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Checkout</h1>
          <p className="text-muted-foreground">
            Complete your purchase by providing shipping and payment details
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* Left side: Shipping & Payment Info */}
          <div className="md:col-span-2">
            <form onSubmit={handleSubmitOrder}>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="mr-2 h-5 w-5" /> Shipping Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={shippingInfo.firstName}
                        onChange={handleShippingInfoChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={shippingInfo.lastName}
                        onChange={handleShippingInfoChange}
                        required
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={shippingInfo.address}
                        onChange={handleShippingInfoChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={shippingInfo.city}
                        onChange={handleShippingInfoChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        value={shippingInfo.postalCode}
                        onChange={handleShippingInfoChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <select 
                        id="country"
                        name="country"
                        className="w-full p-2 border rounded-md"
                        value={shippingInfo.country}
                        onChange={(e) => setShippingInfo(prev => ({ ...prev, country: e.target.value }))}
                        required
                      >
                        <option value="Kenya">Kenya</option>
                        <option value="Nigeria">Nigeria</option>
                        <option value="Ghana">Ghana</option>
                        <option value="Tanzania">Tanzania</option>
                        <option value="Uganda">Uganda</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={shippingInfo.phone}
                        onChange={handleShippingInfoChange}
                        required
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={shippingInfo.email}
                        onChange={handleShippingInfoChange}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Truck className="mr-2 h-5 w-5" /> Shipping Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup 
                    value={shippingMethod} 
                    onValueChange={setShippingMethod}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-2 border p-4 rounded-md">
                      <RadioGroupItem value="standard" id="standard" />
                      <Label htmlFor="standard" className="flex-1 cursor-pointer">
                        <div className="font-medium">Standard Shipping</div>
                        <div className="text-sm text-muted-foreground">5-7 business days</div>
                      </Label>
                      <div className="font-medium">$5.00</div>
                    </div>
                    <div className="flex items-center space-x-2 border p-4 rounded-md">
                      <RadioGroupItem value="express" id="express" />
                      <Label htmlFor="express" className="flex-1 cursor-pointer">
                        <div className="font-medium">Express Shipping</div>
                        <div className="text-sm text-muted-foreground">1-3 business days</div>
                      </Label>
                      <div className="font-medium">$15.00</div>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
              
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Wallet className="mr-2 h-5 w-5" /> Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="card">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="card" onClick={() => setPaymentMethod('card')}>Card</TabsTrigger>
                      <TabsTrigger value="paypal" onClick={() => setPaymentMethod('paypal')}>PayPal</TabsTrigger>
                      <TabsTrigger value="mobile" onClick={() => setPaymentMethod('mobile')}>Mobile Money</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="card" className="mt-4 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <Input id="expiryDate" placeholder="MM/YY" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvc">CVC</Label>
                          <Input id="cvc" placeholder="123" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="nameOnCard">Name on Card</Label>
                        <Input id="nameOnCard" placeholder="John Doe" />
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="paypal" className="mt-4">
                      <div className="text-center py-6">
                        <div className="text-2xl font-bold mb-2">PayPal</div>
                        <p className="mb-4">You will be redirected to PayPal to complete your payment</p>
                        <img 
                          src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/checkout-logo-large.png" 
                          alt="PayPal Checkout" 
                          className="mx-auto h-10"
                        />
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="mobile" className="mt-4">
                      <div className="space-y-4">
                        <RadioGroup defaultValue="mtn" className="space-y-3">
                          <div className="flex items-center space-x-2 border p-4 rounded-md">
                            <RadioGroupItem value="mtn" id="mtn" />
                            <Label htmlFor="mtn" className="cursor-pointer">MTN Mobile Money</Label>
                          </div>
                          <div className="flex items-center space-x-2 border p-4 rounded-md">
                            <RadioGroupItem value="mpesa" id="mpesa" />
                            <Label htmlFor="mpesa" className="cursor-pointer">M-Pesa</Label>
                          </div>
                          <div className="flex items-center space-x-2 border p-4 rounded-md">
                            <RadioGroupItem value="airtel" id="airtel" />
                            <Label htmlFor="airtel" className="cursor-pointer">Airtel Money</Label>
                          </div>
                        </RadioGroup>
                        
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" placeholder="+254 712 345 678" />
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
              
              {/* Bottom buttons */}
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => navigate('/cart')}>
                  Back to Cart
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Processing...' : 'Place Order'}
                </Button>
              </div>
            </form>
          </div>
          
          {/* Right side: Order Summary */}
          <div className="md:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Order Items */}
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden mr-3">
                            <img 
                              src={item.image || '/placeholder.svg'} 
                              alt={item.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <span className="font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <Separator />
                  
                  {/* Price Calculations */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>${shippingCost.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Order Total */}
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${orderTotal.toFixed(2)}</span>
                  </div>
                  
                  {/* Security Notice */}
                  <div className="mt-6 bg-gray-50 p-3 rounded-md flex">
                    <ShieldCheck className="text-green-500 mr-2 h-5 w-5" />
                    <p className="text-xs text-muted-foreground">
                      Your payment information is processed securely. We do not store your credit card details.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Checkout;
