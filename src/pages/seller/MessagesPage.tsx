
import React, { useState } from 'react';
import { 
  Card,
  Input,
  Button,
  Avatar,
  Badge,
  ScrollArea
} from '@/components/ui';
import { Search, PaperclipIcon, Send, MoreVertical } from 'lucide-react';

// Mock conversation data
const conversations = [
  {
    id: '1',
    customer: {
      name: 'Sarah Johnson',
      avatar: 'https://i.pravatar.cc/150?img=1',
      online: true
    },
    lastMessage: "Hi, I'm interested in your product...",
    time: '10:42 AM',
    unread: 3
  },
  {
    id: '2',
    customer: {
      name: 'Michael Brown',
      avatar: 'https://i.pravatar.cc/150?img=2',
      online: false
    },
    lastMessage: "When will my order be shipped?",
    time: 'Yesterday',
    unread: 0
  },
  {
    id: '3',
    customer: {
      name: 'Emma Wilson',
      avatar: 'https://i.pravatar.cc/150?img=3',
      online: false
    },
    lastMessage: "Thanks for the quick response!",
    time: 'Tuesday',
    unread: 0
  },
  {
    id: '4',
    customer: {
      name: 'David Garcia',
      avatar: 'https://i.pravatar.cc/150?img=4',
      online: true
    },
    lastMessage: "Is this available in blue?",
    time: 'Monday',
    unread: 1
  }
];

// Mock messages for the selected conversation
const mockMessages = [
  {
    id: 'm1',
    text: "Hi, I'm interested in your handmade leather wallet. Does it come in brown?",
    sender: 'customer',
    time: '10:30 AM'
  },
  {
    id: 'm2',
    text: "Hello! Yes, it's available in brown, black, and tan. All made with genuine leather.",
    sender: 'seller',
    time: '10:32 AM'
  },
  {
    id: 'm3',
    text: "Great! How long would shipping take to New York?",
    sender: 'customer',
    time: '10:35 AM'
  },
  {
    id: 'm4',
    text: "We usually ship within 1-2 business days, and delivery to New York typically takes 3-4 days.",
    sender: 'seller',
    time: '10:38 AM'
  },
  {
    id: 'm5',
    text: "Perfect! I'll place an order for the brown one. Do you offer gift wrapping?",
    sender: 'customer',
    time: '10:40 AM'
  },
  {
    id: 'm6',
    text: "Yes, we do! There's a gift wrapping option at checkout for an additional $5.",
    sender: 'seller',
    time: '10:41 AM'
  },
  {
    id: 'm7',
    text: "That sounds good. One last question - what's your return policy?",
    sender: 'customer',
    time: '10:42 AM'
  }
];

const MessagesPage: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newMessage, setNewMessage] = useState("");

  const filteredConversations = searchTerm 
    ? conversations.filter(conv => 
        conv.customer.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : conversations;

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log("Sending message:", newMessage);
      // In a real app, we would send this to an API and update the conversation
      setNewMessage("");
    }
  };

  return (
    <div className="p-6 h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Messages</h1>
        <p className="text-gray-500">Chat with your customers</p>
      </div>

      <div className="bg-white rounded-lg shadow h-[calc(100vh-180px)] flex overflow-hidden">
        {/* Left sidebar - Conversation list */}
        <div className="w-1/3 border-r">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search conversations..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <ScrollArea className="h-[calc(100vh-240px)] overflow-y-auto">
            {filteredConversations.map((conv) => (
              <div 
                key={conv.id}
                onClick={() => setSelectedConversation(conv)}
                className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                  selectedConversation?.id === conv.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-center">
                  <div className="relative">
                    <Avatar 
                      className="h-10 w-10 border"
                    />
                    {conv.customer.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                    )}
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">{conv.customer.name}</h3>
                      <span className="text-xs text-gray-500">{conv.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                  </div>
                  {conv.unread > 0 && (
                    <Badge className="ml-2 bg-blue-500">{conv.unread}</Badge>
                  )}
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>

        {/* Right side - Chat area */}
        <div className="flex-1 flex flex-col">
          {selectedConversation ? (
            <>
              <div className="p-4 border-b flex justify-between items-center">
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 border" />
                  <div className="ml-3">
                    <h3 className="font-medium">{selectedConversation.customer.name}</h3>
                    <p className="text-xs text-gray-500">
                      {selectedConversation.customer.online ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </div>

              <ScrollArea className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                  {mockMessages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`flex ${
                        message.sender === 'seller' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div 
                        className={`max-w-[70%] p-3 rounded-lg ${
                          message.sender === 'seller' 
                            ? 'bg-blue-500 text-white rounded-br-none' 
                            : 'bg-gray-100 rounded-bl-none'
                        }`}
                      >
                        <p>{message.text}</p>
                        <p className={`text-xs mt-1 ${message.sender === 'seller' ? 'text-blue-100' : 'text-gray-500'}`}>
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="p-4 border-t">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <PaperclipIcon className="h-5 w-5" />
                  </Button>
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="rounded-full"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <h3 className="font-medium text-gray-500">Select a conversation</h3>
                <p className="text-sm text-gray-400">Choose a customer to start chatting</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
