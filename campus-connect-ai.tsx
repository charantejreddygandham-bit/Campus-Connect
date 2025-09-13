import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Users, MapPin, Calendar, Book, Coffee, FileText, UserPlus, MessageCircle, Search, Settings } from 'lucide-react';

const CampusConnect = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm Campus Connect, your AI assistant for Malla Reddy Vishwavidyapeeth. How can I help you today?",
      isBot: true,
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [activeTab, setActiveTab] = useState('chat');
  const [friends, setFriends] = useState([
    { id: 1, name: "Priya Sharma", status: "online", course: "CSE" },
    { id: 2, name: "Arjun Kumar", status: "offline", course: "ECE" },
    { id: 3, name: "Sneha Patel", status: "online", course: "MBA" }
  ]);
  const [friendSearch, setFriendSearch] = useState('');
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [newFriendName, setNewFriendName] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickActions = [
    { icon: Calendar, label: "Class Schedule", query: "Show me my class schedule" },
    { icon: User, label: "Faculty Info", query: "Tell me about faculty members" },
    { icon: Coffee, label: "Dining Services", query: "What are the dining options?" },
    { icon: Book, label: "Library", query: "Library hours and services" },
    { icon: FileText, label: "Admin Procedures", query: "Administrative procedures" },
    { icon: MapPin, label: "Campus Map", query: "Show me campus locations" }
  ];

  const getAIResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('schedule') || lowerMessage.includes('class') || lowerMessage.includes('timetable')) {
      return "📅 **Class Schedule Information**\n\n• Classes run Monday-Friday: 9:00 AM - 5:00 PM\n• Break timings: 11:00-11:15 AM, 1:00-2:00 PM, 3:15-3:30 PM\n• You can check your specific schedule on the student portal\n• For schedule changes, contact your department office";
    }
    
    if (lowerMessage.includes('faculty') || lowerMessage.includes('professor') || lowerMessage.includes('teacher')) {
      return "👨‍🏫 **Faculty Information**\n\n• **CSE Department**: Dr. Rajesh Kumar (HOD), Prof. Sunita Rao\n• **ECE Department**: Dr. Malathi Singh (HOD), Prof. Vijay Reddy\n• **MBA Department**: Dr. Pradeep Jain (HOD), Prof. Kavitha Nair\n• Faculty office hours: 10:00 AM - 4:00 PM\n• For appointments, email or visit department offices";
    }
    
    if (lowerMessage.includes('dining') || lowerMessage.includes('food') || lowerMessage.includes('cafeteria') || lowerMessage.includes('mess')) {
      return "🍽️ **Dining Services**\n\n• **Main Cafeteria**: 7:00 AM - 9:00 PM\n• **Food Court**: 11:00 AM - 8:00 PM\n• **Coffee Shop**: 8:00 AM - 6:00 PM\n• Vegetarian and non-vegetarian options available\n• Monthly meal plans and daily payment options\n• Special dietary requirements accommodated";
    }
    
    if (lowerMessage.includes('library') || lowerMessage.includes('books')) {
      return "📚 **Library Services**\n\n• **Timings**: 8:00 AM - 10:00 PM (Mon-Sat), 9:00 AM - 6:00 PM (Sun)\n• **Digital Library**: 24/7 access with student login\n• Book borrowing limit: 5 books for 15 days\n• Study rooms available for group discussions\n• Research assistance and printing services available";
    }
    
    if (lowerMessage.includes('admin') || lowerMessage.includes('procedure') || lowerMessage.includes('certificate') || lowerMessage.includes('documents')) {
      return "📋 **Administrative Procedures**\n\n• **Admissions Office**: 9:00 AM - 5:00 PM\n• **Accounts Section**: 9:30 AM - 4:30 PM\n• **Examination Cell**: 10:00 AM - 4:00 PM\n• Certificate requests take 7-10 working days\n• Fee payment: Online portal or accounts office\n• ID card issues: Student affairs office";
    }
    
    if (lowerMessage.includes('map') || lowerMessage.includes('location') || lowerMessage.includes('directions') || lowerMessage.includes('campus')) {
      return "🗺️ **Campus Locations**\n\n• **Academic Block A**: CSE & IT Departments\n• **Academic Block B**: ECE & EEE Departments\n• **Management Block**: MBA & Admin Offices\n• **Library**: Central location, 3 floors\n• **Cafeteria**: Ground floor, Main Building\n• **Sports Complex**: Behind Academic Block B\n• **Hostels**: Separate blocks for boys and girls";
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('phone') || lowerMessage.includes('email')) {
      return "📞 **Contact Information**\n\n• **Main Office**: +91-40-2345-6789\n• **Admissions**: admissions@mrv.edu.in\n• **Academic**: academic@mrv.edu.in\n• **Student Affairs**: students@mrv.edu.in\n• **Emergency**: +91-40-2345-6700\n• **Address**: Malla Reddy Vishwavidyapeeth, Hyderabad";
    }
    
    // Default response
    return "I'm here to help you with information about Malla Reddy Vishwavidyapeeth! You can ask me about:\n\n• Class schedules and timetables\n• Faculty information\n• Dining services and cafeteria\n• Library hours and services\n• Administrative procedures\n• Campus locations and map\n• Contact information\n\nWhat would you like to know?";
  };

  const handleSendMessage = () => {
    if (inputText.trim()) {
      const userMessage = {
        id: Date.now(),
        text: inputText,
        isBot: false,
        timestamp: new Date().toLocaleTimeString()
      };
      
      setMessages(prev => [...prev, userMessage]);
      setInputText('');
      
      // Simulate AI response delay
      setTimeout(() => {
        const botResponse = {
          id: Date.now() + 1,
          text: getAIResponse(inputText),
          isBot: true,
          timestamp: new Date().toLocaleTimeString()
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  const handleQuickAction = (query) => {
    setInputText(query);
    setTimeout(() => handleSendMessage(), 100);
  };

  const addFriend = () => {
    if (newFriendName.trim()) {
      const newFriend = {
        id: Date.now(),
        name: newFriendName,
        status: "offline",
        course: "Unknown"
      };
      setFriends(prev => [...prev, newFriend]);
      setNewFriendName('');
      setShowAddFriend(false);
    }
  };

  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(friendSearch.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-2xl font-bold text-white mb-2">Campus Connect</h1>
          <p className="text-gray-400 text-sm">Malla Reddy Vishwavidyapeeth</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-700">
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex-1 p-4 text-center ${activeTab === 'chat' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            <MessageCircle className="w-5 h-5 inline mr-2" />
            Chat
          </button>
          <button
            onClick={() => setActiveTab('friends')}
            className={`flex-1 p-4 text-center ${activeTab === 'friends' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            <Users className="w-5 h-5 inline mr-2" />
            Friends
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'chat' && (
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickAction(action.query)}
                    className="w-full p-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-left transition-colors flex items-center"
                  >
                    <action.icon className="w-5 h-5 mr-3 text-gray-300" />
                    <span className="text-sm">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'friends' && (
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Friends</h3>
                <button
                  onClick={() => setShowAddFriend(true)}
                  className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  <UserPlus className="w-4 h-4" />
                </button>
              </div>

              {/* Search Friends */}
              <div className="relative mb-4">
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search friends..."
                  value={friendSearch}
                  onChange={(e) => setFriendSearch(e.target.value)}
                  className="w-full bg-gray-700 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* Add Friend Modal */}
              {showAddFriend && (
                <div className="mb-4 p-4 bg-gray-700 rounded-lg">
                  <h4 className="font-semibold mb-2">Add New Friend</h4>
                  <input
                    type="text"
                    placeholder="Enter friend's name"
                    value={newFriendName}
                    onChange={(e) => setNewFriendName(e.target.value)}
                    className="w-full bg-gray-600 text-white px-3 py-2 rounded mb-2 border border-gray-500 focus:border-blue-500 focus:outline-none"
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={addFriend}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition-colors"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => setShowAddFriend(false)}
                      className="flex-1 bg-gray-600 hover:bg-gray-500 text-white py-2 rounded transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Friends List */}
              <div className="space-y-2">
                {filteredFriends.map(friend => (
                  <div key={friend.id} className="p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center mr-3">
                          <User className="w-5 h-5 text-gray-300" />
                        </div>
                        <div>
                          <p className="font-medium">{friend.name}</p>
                          <p className="text-xs text-gray-400">{friend.course}</p>
                        </div>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${friend.status === 'online' ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 bg-gray-800 border-b border-gray-700 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">AI Assistant</h2>
            <p className="text-gray-400 text-sm">Always here to help</p>
          </div>
          <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(message => (
            <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.isBot 
                  ? 'bg-gray-700 text-white' 
                  : 'bg-blue-600 text-white'
              }`}>
                <div className="whitespace-pre-wrap">{message.text}</div>
                <div className="text-xs opacity-70 mt-1">{message.timestamp}</div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-gray-800 border-t border-gray-700">
          <div className="flex space-x-4">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me anything about the university..."
              className="flex-1 bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg transition-colors flex items-center"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampusConnect;