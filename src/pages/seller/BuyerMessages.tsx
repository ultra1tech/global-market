
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Send, Phone, Video } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock conversation data
const conversations = [
  {
    id: '1',
    user: {
      name: 'Alex Johnson',
      avatar: 'https://via.placeholder.com/40',
      online: true
    },
    lastMessage: 'Hi there! I was wondering about the shipping time for the wooden bowl.',
    timestamp: '10:42 AM',
    unread: 2,
  },
  {
    id: '2',
    user: {
      name: 'Maria Rodriguez',
      avatar: 'https://via.placeholder.com/40',
      online: false
    },
    lastMessage: 'Thank you for your quick response!',
    timestamp: 'Yesterday',
    unread: 0,
  },
  {
    id: '3',
    user: {
      name: 'John Smith',
      avatar: 'https://via.placeholder.com/40',
      online: true
    },
    lastMessage: 'Is the ceramic planter still available?',
    timestamp: 'Yesterday',
    unread: 1,
  },
  {
    id: '4',
    user: {
      name: 'Emily Davis',
      avatar: 'https://via.placeholder.com/40',
      online: false
    },
    lastMessage: 'I received my order today. Everything looks great!',
    timestamp: 'Monday',
    unread: 0,
  },
  {
    id: '5',
    user: {
      name: 'Michael Brown',
      avatar: 'https://via.placeholder.com/40',
      online: false
    },
    lastMessage: 'Do you offer any discounts for bulk orders?',
    timestamp: 'Sunday',
    unread: 0,
  }
];

// Mock selected conversation messages
const selectedConversationMessages = [
  {
    id: 'm1',
    sender: 'buyer',
    content: 'Hi there! I was wondering about the shipping time for the wooden bowl.',
    timestamp: '10:42 AM'
  },
  {
    id: 'm2',
    sender: 'seller',
    content: 'Hello Alex! Thanks for your interest. We typically ship within 1-2 business days, and delivery takes around 3-5 days depending on your location.',
    timestamp: '10:45 AM'
  },
  {
    id: 'm3',
    sender: 'buyer',
    content: 'That sounds great! And is it packaged well? I\'m concerned about damage during shipping.',
    timestamp: '10:48 AM'
  },
  {
    id: 'm4',
    sender: 'seller',
    content: 'Absolutely! We take extra care in packaging our wooden products. Each bowl is wrapped in biodegradable protective material and secured in a sturdy box with padding.',
    timestamp: '10:50 AM'
  },
  {
    id: 'm5',
    sender: 'buyer',
    content: 'Perfect, thank you! One last question - do you have it in the natural finish or just the walnut stain?',
    timestamp: '10:52 AM'
  }
];

const BuyerMessages = () => {
  const [activeConversation, setActiveConversation] = useState(conversations[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [messageInput, setMessageInput] = useState('');
  
  const filteredConversations = conversations.filter(convo => 
    convo.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleSendMessage = () => {
    if (messageInput.trim() === '') return;
    
    // In a real app, you would send the message to the API here
    // For now, just clear the input
    setMessageInput('');
  };
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Buyer Messages</h1>
      
      <Card className="overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 min-h-[600px] max-h-[700px]">
          {/* Conversations List */}
          <div className="border-r col-span-1 flex flex-col overflow-hidden">
            <div className="p-4 border-b">
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
            
            <Tabs defaultValue="all" className="px-2 pt-2">
              <TabsList className="w-full">
                <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                <TabsTrigger value="unread" className="flex-1">Unread</TabsTrigger>
                <TabsTrigger value="flagged" className="flex-1">Flagged</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="flex-1 overflow-y-auto">
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
                          <AvatarImage src={conversation.user.avatar} alt={conversation.user.name} />
                          <AvatarFallback>{conversation.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {conversation.user.online && (
                          <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-1 ring-white" />
                        )}
                      </div>
                      <div className="ml-3 flex-1 overflow-hidden">
                        <div className="flex justify-between items-center">
                          <h3 className="text-sm font-medium truncate">{conversation.user.name}</h3>
                          <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-gray-500 truncate">{conversation.lastMessage}</p>
                          {conversation.unread > 0 && (
                            <Badge className="h-5 w-5 rounded-full p-0 flex items-center justify-center">
                              {conversation.unread}
                            </Badge>
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
          <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col">
            {/* Conversation Header */}
            <div className="p-4 border-b flex justify-between items-center">
              <div className="flex items-center">
                <Avatar>
                  <AvatarImage src={activeConversation.user.avatar} alt={activeConversation.user.name} />
                  <AvatarFallback>{activeConversation.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <p className="text-sm font-medium">{activeConversation.user.name}</p>
                  <p className="text-xs text-gray-500">
                    {activeConversation.user.online ? (
                      <span className="text-green-500">Online</span>
                    ) : (
                      'Offline'
                    )}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="icon">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Video className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Message List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {selectedConversationMessages.map(message => (
                <div 
                  key={message.id}
                  className={`flex ${message.sender === 'seller' ? 'justify-end' : ''}`}
                >
                  {message.sender === 'buyer' && (
                    <Avatar className="mr-2 mt-1">
                      <AvatarImage src={activeConversation.user.avatar} alt={activeConversation.user.name} />
                      <AvatarFallback>{activeConversation.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  )}
                  <div 
                    className={`max-w-[70%] p-3 rounded-lg ${
                      message.sender === 'seller' 
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
            <div className="p-4 border-t">
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

export default BuyerMessages;
