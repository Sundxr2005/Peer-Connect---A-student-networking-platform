import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Send, Search, MoreVertical, MessageCircle } from "lucide-react";
import { mockStudents } from "@/data/mockStudents";

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isCurrentUser: boolean;
  avatar?: string;
}

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  avatar?: string;
  isOnline: boolean;
}

interface MessagesProps {
  selectedStudentId?: string | null;
}

const Messages = ({ selectedStudentId }: MessagesProps) => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  // Mock conversations based on connected students
  const conversations: Conversation[] = [
    {
      id: "3",
      name: "Arjun Kumar",
      lastMessage: "Thanks for connecting! Would love to collaborate on that AI project.",
      timestamp: "2 min ago",
      unread: 2,
      avatar: "https://randomuser.me/api/portraits/men/31.jpg",
      isOnline: true
    },
    {
      id: "4",
      name: "Priya Iyer",
      lastMessage: "Hey! Saw your profile, we have similar interests in web dev.",
      timestamp: "1 hour ago",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      unread: 1,
      isOnline: false
    },
    {
      id: "5",
      name: "Rohit Sharma",
      lastMessage: "Great meeting you at the tech meetup!",
      avatar: "https://randomuser.me/api/portraits/men/55.jpg",
      timestamp: "Yesterday",
      unread: 0,
      isOnline: true
    },
    {
      id: "7",
      name: "Suresh Reddy",
      lastMessage: "Great meeting you at the tech meetup!",
      avatar: "https://randomuser.me/api/portraits/men/76.jpg",
      timestamp: "Yesterday",
      unread: 1,
      isOnline: true
    }
  ];

  // Handle selecting a specific student for messaging
  useEffect(() => {
    if (selectedStudentId) {
      const student = mockStudents.find(s => s.id === selectedStudentId);
      if (student) {
        // Check if conversation already exists
        const existingConversation = conversations.find(c => c.name === student.name);
        if (existingConversation) {
          setSelectedConversation(existingConversation.id);
        } else {
          // Create new conversation
          setSelectedConversation(selectedStudentId);
        }
        
        // Set initial messages for this conversation
        setMessages([
          {
            id: "1",
            sender: "You",
            content: "Hi! I'd love to connect and chat about our shared interests.",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isCurrentUser: true
          }
        ]);
      }
    }
  }, [selectedStudentId]);

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      const message: Message = {
        id: Date.now().toString(),
        sender: "You",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isCurrentUser: true
      };
      
      setMessages(prev => [...prev, message]);
      setNewMessage("");
      
      // Simulate response after 2 seconds
      setTimeout(() => {
        const responseMessage: Message = {
          id: (Date.now() + 1).toString(),
          sender: getSelectedConversationName(),
          content: "Thanks for reaching out! I'd love to chat more about this.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isCurrentUser: false,
          avatar: "/placeholder.svg"
        };
        setMessages(prev => [...prev, responseMessage]);
      }, 2000);
    }
  };

  const getSelectedConversationName = () => {
    if (selectedStudentId) {
      const student = mockStudents.find(s => s.id === selectedStudentId);
      if (student) return student.name;
    }
    
    const conversation = conversations.find(c => c.id === selectedConversation);
    return conversation?.name || "Unknown";
  };

  const getSelectedConversationAvatar = () => {
    if (selectedStudentId) {
      const student = mockStudents.find(s => s.id === selectedStudentId);
      return student?.profilePicture || "/placeholder.svg";
    }
    
    const conversation = conversations.find(c => c.id === selectedConversation);
    return conversation?.avatar || "/placeholder.svg";
  };

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Messages
        </h1>
        <p className="text-gray-600 text-lg">Connect and collaborate with your peers</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-300px)]">
        {/* Conversations List */}
        <div className="lg:col-span-1">
          <Card className="h-full shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-50/80 border-0 focus:bg-white transition-all duration-300"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-2">
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-4 cursor-pointer transition-all duration-300 hover:bg-blue-50/80 border-l-4 ${
                      selectedConversation === conversation.id
                        ? "bg-blue-50/80 border-l-blue-500"
                        : "border-l-transparent hover:border-l-blue-300"
                    }`}
                    onClick={() => {
                      setSelectedConversation(conversation.id);
                      // Load messages for this conversation
                      setMessages([
                        {
                          id: "1",
                          sender: conversation.name,
                          content: "Hi! Thanks for accepting my connection request!",
                          timestamp: "10:30 AM",
                          isCurrentUser: false,
                          avatar: conversation.avatar
                        },
                        {
                          id: "2",
                          sender: "You",
                          content: `Hey ${conversation.name}! Great to connect with you too.`,
                          timestamp: "10:32 AM",
                          isCurrentUser: true
                        },
                        {
                          id: "3",
                          sender: conversation.name,
                          content: conversation.lastMessage,
                          timestamp: "10:35 AM",
                          isCurrentUser: false,
                          avatar: conversation.avatar
                        }
                      ]);
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="w-12 h-12 ring-2 ring-white shadow-lg">
                          <AvatarImage src={conversation.avatar} />
                          <AvatarFallback className="bg-gradient-to-r from-blue-400 to-purple-500 text-white font-semibold">
                            {conversation.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        {conversation.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold text-gray-900 truncate">{conversation.name}</h3>
                          <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-600 truncate mt-1">{conversation.lastMessage}</p>
                      </div>
                      {conversation.unread > 0 && (
                        <Badge className="bg-red-500 text-white rounded-full min-w-[20px] h-5 flex items-center justify-center text-xs animate-pulse">
                          {conversation.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-2">
          {selectedConversation ? (
            <Card className="h-full shadow-2xl border-0 bg-white/80 backdrop-blur-sm flex flex-col">
              {/* Chat Header */}
              <CardHeader className="border-b border-gray-100 pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10 ring-2 ring-white shadow-lg">
                      <AvatarImage src={getSelectedConversationAvatar()} />
                      <AvatarFallback className="bg-gradient-to-r from-blue-400 to-purple-500 text-white font-semibold">
                        {getSelectedConversationName().split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-gray-900">{getSelectedConversationName()}</h3>
                      <p className="text-sm text-green-600">Online</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isCurrentUser ? 'justify-end' : 'justify-start'} animate-slide-in`}
                    >
                      <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${message.isCurrentUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        {!message.isCurrentUser && (
                          <Avatar className="w-8 h-8 ring-2 ring-white shadow-md">
                            <AvatarImage src={message.avatar} />
                            <AvatarFallback className="bg-gradient-to-r from-blue-400 to-purple-500 text-white text-xs">
                              {message.sender.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div className={`p-3 rounded-2xl shadow-lg ${
                          message.isCurrentUser
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                            : 'bg-white border border-gray-200'
                        }`}>
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-xs mt-1 ${message.isCurrentUser ? 'text-blue-100' : 'text-gray-500'}`}>
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-100">
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 bg-gray-50/80 border-0 focus:bg-white transition-all duration-300"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="h-full shadow-2xl border-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-semibold mb-2">Select a conversation</h3>
                <p>Choose a conversation from the list to start messaging</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
