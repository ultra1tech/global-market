
import React, { useState } from 'react';
import HelpCenterLayout from './HelpCenterLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from 'sonner';
import { Mail, MessageSquare, Phone, Clock, SendHorizontal, CheckCircle } from 'lucide-react';

const ContactSupportPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: '',
    orderNumber: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation
    if (!formData.name || !formData.email || !formData.message || !formData.category) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // In a real app, we'd submit to an API
    console.log("Form submitted:", formData);
    
    // Show success message
    setIsSubmitted(true);
    toast.success("Support request submitted successfully!");
  };

  return (
    <HelpCenterLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold mb-4">Contact Support</h1>
          <p className="text-gray-600">
            Need assistance? Our support team is here to help. Fill out the form below or use one of our other contact methods.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="bg-white border rounded-lg p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="Brief summary of your issue"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Issue Category *</Label>
                    <Select
                      onValueChange={(value) => handleSelectChange('category', value)}
                      value={formData.category}
                      required
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select an issue category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="order">Order Problem</SelectItem>
                        <SelectItem value="shipping">Shipping Issue</SelectItem>
                        <SelectItem value="returns">Returns & Refunds</SelectItem>
                        <SelectItem value="account">Account Issues</SelectItem>
                        <SelectItem value="payment">Payment Problems</SelectItem>
                        <SelectItem value="seller">Seller Support</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="orderNumber">Order Number (if applicable)</Label>
                  <Input
                    id="orderNumber"
                    name="orderNumber"
                    placeholder="e.g. ORD-1234"
                    value={formData.orderNumber}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Please provide details about your issue so we can help you more effectively."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">* Required fields</p>
                  <Button type="submit">
                    <SendHorizontal className="mr-2 h-4 w-4" />
                    Submit Request
                  </Button>
                </div>
              </form>
            ) : (
              <div className="bg-white border rounded-lg p-8 text-center">
                <div className="flex justify-center mb-4">
                  <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
                <p className="text-gray-600 mb-6">
                  Your support request has been submitted successfully. We'll get back to you as soon as possible.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <p className="font-medium">Your ticket number: <span className="text-blue-600">TKT-12345</span></p>
                  <p className="text-sm text-gray-600">Please save this number for reference</p>
                </div>
                <div className="flex justify-center space-x-4">
                  <Button onClick={() => setIsSubmitted(false)}>Submit Another Request</Button>
                  <Button variant="outline">Back to Help Center</Button>
                </div>
              </div>
            )}
          </div>
          
          <div className="space-y-6">
            <div className="bg-white border rounded-lg p-6">
              <h2 className="text-lg font-medium mb-4">Other Ways to Contact Us</h2>
              <div className="space-y-6">
                <div className="flex">
                  <div className="mr-4">
                    <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <MessageSquare className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium">Live Chat</h3>
                    <p className="text-sm text-gray-600 mb-2">Get immediate assistance from our support team</p>
                    <Button variant="outline" size="sm">Start Chat</Button>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-4">
                    <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Phone className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium">Call Us</h3>
                    <p className="text-sm text-gray-600 mb-2">Speak directly with a support representative</p>
                    <p className="font-medium">+1 (888) 555-1234</p>
                    <p className="text-xs text-gray-500">Mon-Fri, 9am to 6pm ET</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-4">
                    <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Mail className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium">Email Support</h3>
                    <p className="text-sm text-gray-600 mb-2">Send us an email directly</p>
                    <p className="font-medium">support@example.com</p>
                    <p className="text-xs text-gray-500">24-48 hour response time</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white border rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Clock className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="font-medium">Support Hours</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">Monday - Friday:</span>
                  <span>9:00 AM - 6:00 PM ET</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Saturday:</span>
                  <span>10:00 AM - 4:00 PM ET</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Sunday:</span>
                  <span>Closed</span>
                </div>
                <p className="text-gray-600 mt-4">
                  Chat support is available 24/7. Email responses may take 24-48 hours during peak periods.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HelpCenterLayout>
  );
};

export default ContactSupportPage;
