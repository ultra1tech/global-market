
import React from 'react';
import HelpCenterLayout from './HelpCenterLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';

const SellersGuidePage: React.FC = () => {
  const sellingSteps = [
    {
      title: "Create your seller account",
      description: "Sign up and choose the seller account option. Complete your profile with business information.",
      link: "/register"
    },
    {
      title: "Set up your store",
      description: "Customize your store page with branding, policies, and shipping information.",
      link: "/seller-dashboard/settings"
    },
    {
      title: "Add your products",
      description: "Upload your products with high-quality images, detailed descriptions, and accurate pricing.",
      link: "/seller-dashboard/add-product"
    },
    {
      title: "Set shipping options",
      description: "Define your shipping methods, costs, and delivery timeframes for different regions.",
      link: "/seller-dashboard/shipping"
    },
    {
      title: "Connect payment methods",
      description: "Set up your payment processing to receive funds from your sales.",
      link: "/seller-dashboard/payments"
    },
    {
      title: "Promote your store",
      description: "Use our marketing tools and your social networks to drive traffic to your store.",
      link: "/seller-dashboard/marketing"
    }
  ];

  const sellerTips = [
    "Take high-quality photos from multiple angles",
    "Write detailed product descriptions",
    "Set competitive but profitable pricing",
    "Respond quickly to customer inquiries",
    "Ship orders promptly",
    "Encourage customer reviews",
    "Regularly add new products",
    "Use tags and categories effectively"
  ];

  const sellerFAQs = [
    {
      question: "What are the seller fees?",
      answer: "Our marketplace charges a 5% transaction fee on each sale, plus a small listing fee. Premium seller plans are available with reduced fees and additional features."
    },
    {
      question: "How long until I get paid?",
      answer: "Payments are processed 3 days after an order is marked as delivered, to allow time for any customer issues. Funds are then transferred to your connected bank account within 1-2 business days."
    },
    {
      question: "How do I handle returns?",
      answer: "You can set your own return policy, which customers will see before purchasing. When a return request is submitted, you'll have the option to approve or deny it based on your policy."
    },
    {
      question: "Can I sell internationally?",
      answer: "Yes! You can choose which countries you want to ship to. We provide shipping label generation for many international destinations and customs form assistance."
    }
  ];

  return (
    <HelpCenterLayout>
      <div className="space-y-10">
        <div>
          <h1 className="text-2xl font-bold mb-4">Seller's Guide: How to Sell on B.A.W. Marketplace</h1>
          <p className="text-gray-600 mb-6">
            Follow this comprehensive guide to start selling your products to customers worldwide. Whether you're a small artisan or an established business, our platform provides the tools you need to succeed.
          </p>
          <div className="flex space-x-3 mb-8">
            <Button>Get Started Selling</Button>
            <Button variant="outline">View Success Stories</Button>
          </div>
        </div>

        <section className="border rounded-lg p-6">
          <h2 className="text-xl font-bold mb-6">Getting Started: 6 Steps to Start Selling</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sellingSteps.map((step, index) => (
              <Card key={index} className="p-5 flex flex-col">
                <div className="flex items-center mb-3">
                  <div className="bg-blue-100 text-blue-800 text-lg font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3">
                    {index + 1}
                  </div>
                  <h3 className="font-medium">{step.title}</h3>
                </div>
                <p className="text-gray-600 mb-4 text-sm flex-grow">{step.description}</p>
                <Link to={step.link}>
                  <Button variant="link" className="p-0 h-auto">
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-2">
            <h2 className="text-xl font-bold mb-4">Seller Success Tips</h2>
            <div className="bg-white border rounded-lg p-6">
              <ul className="space-y-3">
                {sellerTips.map((tip, index) => (
                  <li key={index} className="flex">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex">
                <AlertCircle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-yellow-800 mb-1">Pro Tip</p>
                  <p className="text-sm text-yellow-700">
                    Set up automated responses for common customer questions to improve your response time and customer satisfaction.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-bold mb-4">Resources</h2>
            <div className="bg-white border rounded-lg p-6 space-y-4">
              <Link to="/help/product-photography" className="flex items-center text-blue-600 hover:underline">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                Product Photography Guide
              </Link>
              
              <Link to="/help/pricing-strategies" className="flex items-center text-blue-600 hover:underline">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                Pricing Strategies
              </Link>
              
              <Link to="/help/seo-tips" className="flex items-center text-blue-600 hover:underline">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                SEO Tips for Better Visibility
              </Link>
              
              <Link to="/help/shipping-guide" className="flex items-center text-blue-600 hover:underline">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                  </svg>
                </div>
                Shipping & Fulfillment Guide
              </Link>
              
              <Button variant="outline" className="w-full mt-2">View All Resources</Button>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {sellerFAQs.map((faq, index) => (
              <Card key={index} className="p-5">
                <h3 className="font-medium mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </Card>
            ))}
          </div>
          <div className="mt-6">
            <Button variant="outline">View All Seller FAQs</Button>
          </div>
        </section>

        <section className="bg-blue-600 text-white rounded-lg p-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to start selling?</h2>
            <p className="mb-6">Join thousands of successful sellers on B.A.W. Marketplace and reach customers around the world.</p>
            <div className="flex justify-center space-x-4">
              <Button className="bg-white text-blue-600 hover:bg-gray-100">
                Create Seller Account
              </Button>
              <Button variant="outline" className="text-white border-white hover:bg-blue-700">
                Learn More
              </Button>
            </div>
          </div>
        </section>
      </div>
    </HelpCenterLayout>
  );
};

export default SellersGuidePage;
