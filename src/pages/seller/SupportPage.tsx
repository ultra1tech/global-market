
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, MessageCircle, FileText, PhoneCall } from 'lucide-react';
import { toast } from 'sonner';

const SupportPage: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Support request submitted successfully");
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Support Center</h1>
        <p className="text-gray-500">Get help with your store and selling process</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Frequently Asked Questions</h2>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I get paid for my sales?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-700">
                    We process payments automatically to your connected bank account. Once an order is marked as completed,
                    the payment is processed within 1-3 business days, minus the platform fee. You can view all your transactions
                    and payment status in the Payments section of your dashboard.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>How do I handle returns and refunds?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-700">
                    Your store should have a clear return policy displayed to customers. When a customer requests a return,
                    you'll receive a notification. You can approve or reject the request from the Orders section. If approved,
                    the customer will receive a return shipping label and you'll need to process the refund once you receive
                    the returned item.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>How do I optimize my product listings?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-700">
                    For better visibility, use high-quality images from multiple angles, write detailed descriptions highlighting 
                    key features and benefits, add accurate dimensions and specifications, and use relevant keywords. Regularly
                    update your listings based on customer questions and feedback. Consider offering promotions for popular items.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>How do I upgrade my seller account?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-700">
                    To upgrade your seller account to a premium tier, visit the Settings page and select the "Subscription" tab.
                    There you'll see the available plans and their benefits. Premium sellers enjoy lower fees, priority placement
                    in search results, advanced analytics, and dedicated customer support.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>How do I calculate shipping costs?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-700">
                    You can set up shipping in your store settings. We offer three options: flat rate shipping (you set a fixed price),
                    weight-based shipping (costs calculated by product weight), or real-time carrier rates (integrated with major
                    shipping partners). Make sure to accurately set product weights and dimensions to ensure correct shipping calculations.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Contact Support</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                    <Input id="name" required />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                    <Input id="email" type="email" required />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject</label>
                  <Input id="subject" required />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                  <Textarea id="message" rows={5} required />
                </div>
                
                <div>
                  <Button type="submit">Submit Request</Button>
                </div>
              </form>
            </div>
          </Card>
        </div>
        
        <div>
          <Card className="p-6 mb-6">
            <h3 className="text-lg font-medium mb-4">Support Channels</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="mr-4 bg-blue-50 p-3 rounded-full">
                  <MessageCircle className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <h4 className="font-medium">Live Chat Support</h4>
                  <p className="text-sm text-gray-500 mt-1">Available Mon-Fri, 9AM-5PM</p>
                  <Button variant="link" className="p-0 h-auto mt-1">Start Chat</Button>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 bg-green-50 p-3 rounded-full">
                  <PhoneCall className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <h4 className="font-medium">Phone Support</h4>
                  <p className="text-sm text-gray-500 mt-1">Premium Sellers Only</p>
                  <p className="text-sm font-medium mt-1">+1 (888) 555-0123</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 bg-purple-50 p-3 rounded-full">
                  <FileText className="h-5 w-5 text-purple-500" />
                </div>
                <div>
                  <h4 className="font-medium">Seller Documentation</h4>
                  <p className="text-sm text-gray-500 mt-1">Guides, tutorials, and policies</p>
                  <Button variant="link" className="p-0 h-auto mt-1">Browse Resources</Button>
                </div>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Seller Community</h3>
            <p className="text-gray-600 mb-4">
              Connect with other sellers, share tips, and get advice from experienced merchants.
            </p>
            <Button className="w-full mb-4">Join Community Forum</Button>
            <div className="border-t pt-4">
              <h4 className="font-medium mb-2">Upcoming Webinars</h4>
              <ul className="space-y-3">
                <li className="text-sm">
                  <p className="font-medium">Marketing Your Products</p>
                  <p className="text-gray-500">May 25, 2023 • 2:00 PM</p>
                </li>
                <li className="text-sm">
                  <p className="font-medium">Tax Tips for Sellers</p>
                  <p className="text-gray-500">June 3, 2023 • 11:00 AM</p>
                </li>
              </ul>
              <Button variant="link" className="p-0 h-auto mt-2">View All Events</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
