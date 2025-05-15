import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Send } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock conversations data
const sellerConversations = [
  {
    id: '1',
    seller: {
      name: 'Artisan Crafts',
      avatar: 'https://via.placeholder.com/40',
      online: true
    },
    lastMessage: 'Thanks for your order! Do you have any questions about the product?',
    timestamp: '2:15 PM',
    unread: 1,
  },
  {
    id: '2',
    seller: {
      name: 'Eco Friendly Store',
      avatar: 'https://via.placeholder.com/40',
      online: false
    },
    lastMessage: 'Your order has been shipped! You should receive it in 3-5 business days.',
    timestamp: 'Yesterday',
    unread: 0,
  },
  {
    id: '3',
    seller: {
      name: 'Tech Gadgets',
      avatar: 'https://via.placeholder.com/40',
      online: true
    },
    lastMessage: 'We received your return request. Please provide additional details.',
    timestamp: 'Monday',
    unread: 1,
  }
];

// Mock messages for selected conversation
const selectedConversationMessages = [
  {
    id: 'm1',
    sender: 'seller',
    content: 'Thanks for your order! Do you have any questions about the product?',
    timestamp: '2:15 PM'
  },
  {
    id: 'm2',
    sender: 'buyer',
    content: 'Yes, I was wondering if the wooden bowl is food safe?',
    timestamp: '2:20 PM'
  },
  {
    id: 'm3',
    sender: 'seller',
    content: 'Absolutely! All our wooden bowls are treated with food-safe finishes and are perfect for serving salads, fruits, or as decorative pieces.',
    timestamp: '2:22 PM'
  },
  {
    id: 'm4',
    sender: 'buyer',
    content: 'Great! And what\'s the recommended way to clean it?',
    timestamp: '2:25 PM'
  },
  {
    id: 'm5',
    sender: 'seller',
    content: 'We recommend hand washing with mild soap and warm water, then dry immediately with a soft cloth. Avoid soaking in water or putting in the dishwasher as this can damage the wood over time.',
    timestamp: '2:28 PM'
  }
];

const MessagesPage = () => {
  const [activeConversation, setActiveConversation] = useState(sellerConversations[0]);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredConversations = sellerConversations.filter(convo => 
    convo.seller.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleSendMessage = () => {
    if (messageInput.trim() === '') return;
    
    // In a real app, you would send the message to the API here
    // For now, just clear the input
    setMessageInput('');
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Messages</h1>
      
      <Card className="overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 min-h-[500px] max-h-[600px]">
          {/* Conversations List */}
          <div className="border-r">
            <div className="p-3 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search messages..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <Tabs defaultValue="all" className="px-3 pt-3">
              <TabsList className="w-full">
                <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                <TabsTrigger value="unread" className="flex-1">Unread</TabsTrigger>
                <TabsTrigger value="archived" className="flex-1">Archived</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="overflow-y-auto" style={{ maxHeight: 'calc(600px - 110px)' }}>
              {filteredConversations.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  No conversations found
                </div>
              ) : (
                filteredConversations.map(conversation => (
                  <div 
                    key={conversation.id}
                    className={`p-3 border-b hover:bg-gray-50 cursor-pointer ${
                      activeConversation.id === conversation.id ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => setActiveConversation(conversation)}
                  >
                    <div className="flex">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={conversation.seller.avatar} alt={conversation.seller.name} />
                          <AvatarFallback>{conversation.seller.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {conversation.seller.online && (
                          <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-1 ring-white" />
                        )}
                      </div>
                      <div className="ml-3 flex-1 overflow-hidden">
                        <div className="flex justify-between items-center">
                          <h3 className="text-sm font-medium truncate">{conversation.seller.name}</h3>
                          <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                        </div>
                        <div className="flex items-center">
                          <p className="text-xs text-gray-500 truncate flex-1">{conversation.lastMessage}</p>
                          {conversation.unread > 0 && (
                            <span className="ml-2 bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                              {conversation.unread}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          
          {/* Message Content */}
          <div className="col-span-2 flex flex-col">
            {/* Conversation Header */}
            <div className="p-3 border-b flex justify-between items-center">
              <div className="flex items-center">
                <Avatar>
                  <AvatarImage src={activeConversation.seller.avatar} alt={activeConversation.seller.name} />
                  <AvatarFallback>{activeConversation.seller.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <p className="text-sm font-medium">{activeConversation.seller.name}</p>
                  <p className="text-xs text-gray-500">
                    {activeConversation.seller.online ? (
                      <span className="text-green-500">Online</span>
                    ) : (
                      'Offline'
                    )}
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">View Store</Button>
            </div>
            
            {/* Message List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ maxHeight: 'calc(600px - 110px)' }}>
              {selectedConversationMessages.map(message => (
                <div 
                  key={message.id}
                  className={`flex ${message.sender === 'buyer' ? 'justify-end' : ''}`}
                >
                  {message.sender === 'seller' && (
                    <Avatar className="mr-2 mt-1">
                      <AvatarImage src={activeConversation.seller.avatar} alt={activeConversation.seller.name} />
                      <AvatarFallback>{activeConversation.seller.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  )}
                  <div 
                    className={`max-w-[70%] p-3 rounded-lg ${
                      message.sender === 'buyer' 
                        ? 'bg-blue-100 text-blue-900' 
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs text-gray-500 text-right mt-1">{message.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Message Input */}
            <div className="p-3 border-t">
              <div className="flex items-center gap-2">
                <Input 
                  placeholder="Type your message..." 
                  className="flex-1"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSendMessage();
                  }}
                />
                <Button onClick={handleSendMessage}>
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MessagesPage;
