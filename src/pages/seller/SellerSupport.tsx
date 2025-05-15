
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

// Mock FAQ data
const faqData = [
  {
    question: "How do I list a new product?",
    answer: "To list a new product, navigate to your seller dashboard and click on the 'Add Product' button. Fill in all the required fields including product name, description, price, and at least one photo. Once you've filled in all details, click 'Submit' and your product will be reviewed before going live."
  },
  {
    question: "What fees will I be charged as a seller?",
    answer: "We charge a 5% transaction fee on each sale. Additionally, there's a payment processing fee of 2.9% + $0.30 per transaction. For premium placement and promotions, there may be additional optional fees. Please see our Seller Fee Schedule for complete details."
  },
  {
    question: "How long does it take to get paid after a sale?",
    answer: "Funds from sales are typically available for payout 3 business days after delivery confirmation or 7 days after shipment (whichever comes first). Payouts are processed every Monday and Wednesday and may take 1-3 business days to appear in your bank account."
  },
  {
    question: "How do I handle returns and refunds?",
    answer: "You can set your own return policy in your store settings. When a return request is received, you'll get a notification to review and approve it. Once approved, the customer will receive a return shipping label. When the item is received back in its original condition, the refund will be processed according to your policy."
  },
  {
    question: "How can I promote my products?",
    answer: "You can promote your products through our platform by using the Promoted Listings feature, participating in seasonal sales events, or being featured in our curated collections. Additionally, you can share your store on social media using the social sharing tools in your dashboard."
  },
  {
    question: "What shipping options are available?",
    answer: "You can choose to use your own shipping arrangements or our integrated shipping partners. We offer discounted rates with major carriers like USPS, FedEx, and UPS. You can create and print shipping labels directly from your dashboard, and customers will automatically receive tracking information."
  },
  {
    question: "How do I respond to customer messages?",
    answer: "Customer messages can be accessed in the 'Messages' section of your seller dashboard. We recommend responding to all inquiries within 24 hours to maintain good customer service. You can also enable email notifications for new messages in your settings."
  },
  {
    question: "What happens if an item is lost or damaged during shipping?",
    answer: "If an item is reported lost or damaged during transit, first verify the tracking information. For shipments using our integrated shipping partners with insurance, you can file a claim directly through your dashboard. For self-arranged shipping, you'll need to contact your carrier directly."
  }
];

const SellerSupport = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [contactForm, setContactForm] = useState({
    subject: '',
    message: ''
  });
  
  const filteredFAQs = faqData.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this to an API endpoint
    toast.success("Support request submitted successfully! We'll respond within 24 hours.");
    setContactForm({ subject: '', message: '' });
  };
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Seller Support</h1>
      <p className="text-gray-500 mb-6">Get help with your seller account and operations</p>
      
      <Tabs defaultValue="faq" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="contact">Contact Support</TabsTrigger>
          <TabsTrigger value="resources">Seller Resources</TabsTrigger>
        </TabsList>
        
        <TabsContent value="faq" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative mb-6">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search FAQs..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Accordion type="single" collapsible>
                {filteredFAQs.length === 0 ? (
                  <p className="text-center py-4 text-gray-500">No FAQs matching your search</p>
                ) : (
                  filteredFAQs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))
                )}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Support Team</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject</label>
                  <Input 
                    id="subject" 
                    placeholder="What do you need help with?"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                  <Textarea 
                    id="message" 
                    placeholder="Describe your issue in detail..."
                    rows={6}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="attachment" className="block text-sm font-medium mb-1">Attachments (optional)</label>
                  <Input id="attachment" type="file" />
                  <p className="text-xs text-gray-500 mt-1">Maximum file size: 10MB</p>
                </div>
                <Button type="submit" className="w-full">Submit Request</Button>
              </form>
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">Expected response time: Within 24 hours</p>
                <p className="text-sm mt-2">
                  For urgent issues, call our seller hotline:&nbsp;
                  <a href="tel:+18005551234" className="text-blue-600 hover:underline">+1 (800) 555-1234</a>
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="resources" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Seller Guides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <a href="#" className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <h3 className="font-medium">Getting Started Guide</h3>
                  <p className="text-sm text-gray-500">Complete walkthrough for new sellers</p>
                </a>
                <a href="#" className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <h3 className="font-medium">Product Photography Tips</h3>
                  <p className="text-sm text-gray-500">How to take great product photos</p>
                </a>
                <a href="#" className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <h3 className="font-medium">Pricing Strategies</h3>
                  <p className="text-sm text-gray-500">Optimize your pricing for maximum profit</p>
                </a>
                <a href="#" className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <h3 className="font-medium">Shipping Best Practices</h3>
                  <p className="text-sm text-gray-500">Efficient packaging and shipping methods</p>
                </a>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Video Tutorials</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Dashboard Overview Tutorial</p>
                </div>
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">How to List Products Effectively</p>
                </div>
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Managing Orders and Fulfillment</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Seller Community</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <h3 className="text-xl font-medium mb-2">Join Our Seller Community</h3>
                <p className="mb-4 text-gray-500">Connect with other sellers, share insights, and get advice</p>
                <div className="flex flex-col sm:flex-row justify-center gap-3">
                  <Button variant="outline">Join Facebook Group</Button>
                  <Button variant="outline">Join Discord Server</Button>
                  <Button variant="outline">Join Monthly Webinar</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SellerSupport;
