
import React from 'react';
import { Link } from 'react-router-dom';
import HelpCenterLayout from './HelpCenterLayout';
import { ShoppingBag, CreditCard, Truck, Package, RotateCcw, Store, MessageCircle, ShieldCheck, HelpCircle } from 'lucide-react';

const HelpCenterHome: React.FC = () => {
  const helpTopics = [
    {
      title: "Ordering & Payment",
      icon: <CreditCard className="h-6 w-6 text-blue-600" />,
      description: "Questions about placing orders, payment methods, and billing issues.",
      link: "/help/ordering"
    },
    {
      title: "Shipping & Delivery",
      icon: <Truck className="h-6 w-6 text-blue-600" />,
      description: "Information about shipping methods, tracking, and delivery times.",
      link: "/help/shipping"
    },
    {
      title: "Order Status",
      icon: <Package className="h-6 w-6 text-blue-600" />,
      description: "How to track your order and what each status means.",
      link: "/help/order-status"
    },
    {
      title: "Returns & Refunds",
      icon: <RotateCcw className="h-6 w-6 text-blue-600" />,
      description: "Policies and procedures for returns, exchanges, and refunds.",
      link: "/help/returns"
    },
    {
      title: "Selling on B.A.W.",
      icon: <Store className="h-6 w-6 text-blue-600" />,
      description: "How to set up your store and start selling your products.",
      link: "/help/sellers-guide"
    },
    {
      title: "Account & Security",
      icon: <ShieldCheck className="h-6 w-6 text-blue-600" />,
      description: "Managing your account settings, password reset, and security features.",
      link: "/help/account"
    },
    {
      title: "Buyer Support",
      icon: <ShoppingBag className="h-6 w-6 text-blue-600" />,
      description: "Help for buyers on placing orders and resolving issues.",
      link: "/help/buyers-guide"
    },
    {
      title: "Contact Us",
      icon: <MessageCircle className="h-6 w-6 text-blue-600" />,
      description: "How to reach our customer support team for additional help.",
      link: "/help/contact"
    },
  ];

  const faqs = [
    {
      question: "How do I track my order?",
      answer: "Once your order ships, you'll receive a tracking number via email. You can also find tracking information in your account under 'Order History'."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept major credit cards (Visa, Mastercard, American Express), PayPal, and various local payment methods depending on your region."
    },
    {
      question: "How do I return an item?",
      answer: "To return an item, go to your order history, select the order containing the item, and click 'Return Item'. Follow the instructions to complete your return request."
    },
    {
      question: "How long does shipping take?",
      answer: "Shipping times vary by location and seller. The estimated delivery time is displayed on each product page. Most orders arrive within 5-14 business days."
    },
    {
      question: "How do I become a seller?",
      answer: "To become a seller, register for an account and choose 'Seller Account' during signup. Complete your profile, provide the required verification documents, and set up your store."
    },
  ];

  return (
    <HelpCenterLayout>
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold mb-6">Popular Help Topics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {helpTopics.map((topic, index) => (
              <Link 
                key={index} 
                to={topic.link}
                className="block border rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start">
                  <div className="mr-4">{topic.icon}</div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">{topic.title}</h3>
                    <p className="text-gray-600 text-sm">{topic.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border rounded-lg p-5">
                <h3 className="font-medium text-lg mb-2 flex items-center">
                  <HelpCircle className="mr-2 h-5 w-5 text-blue-600" />
                  {faq.question}
                </h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link to="/help/faq">
              <button className="inline-flex items-center text-blue-600 font-medium hover:underline">
                View All FAQs
                <svg className="ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </button>
            </Link>
          </div>
        </section>
        
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-lg">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold mb-2">Still Need Help?</h2>
              <p className="text-gray-600 mb-4">Our customer support team is here for you</p>
              <div className="flex space-x-3">
                <Link to="/help/contact">
                  <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
                    Contact Us
                  </button>
                </Link>
                <button className="bg-white text-blue-600 px-5 py-2 rounded-lg border border-blue-600 hover:bg-blue-50">
                  Live Chat
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-center px-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-2">
                  <Phone className="h-6 w-6 text-blue-600" />
                </div>
                <p className="text-sm font-medium">Call Us</p>
                <p className="text-xs text-gray-500">Mon-Fri, 9am-5pm</p>
              </div>
              <div className="text-center px-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-2">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-xs text-gray-500">24 hour response</p>
              </div>
              <div className="text-center px-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-2">
                  <MessageCircle className="h-6 w-6 text-blue-600" />
                </div>
                <p className="text-sm font-medium">Live Chat</p>
                <p className="text-xs text-gray-500">Available 24/7</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </HelpCenterLayout>
  );
};

import { Phone, Mail } from 'lucide-react';
export default HelpCenterHome;
