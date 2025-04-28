import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! 👋 How can I assist you today?' }
  ]);
  const [input, setInput] = useState('');

  const commonQuestions = [
    "How to change my profile details?",
    "How to view my ride history?",
    "How to book a rental cab?",
    "How to split fare with friends?",
    "What payment options are available?",
    "How to book a ride?",
    "How to cancel a ride?",
    "How to contact support?"
  ];

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { from: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);

    let userInput = input.toLowerCase().trim();
    let botReply = "😕 Sorry, I couldn't understand. Please try asking differently or contact support.";

    if (userInput.includes('profile') || userInput.includes('edit profile')) {
      botReply = "📝 You can edit your profile by going to Sidebar ➔ Profile ➔ Edit.";
    } 
    else if (userInput.includes('history') || userInput.includes('past rides')) {
      botReply = "📜 View your ride history by clicking Sidebar ➔ Ride History.";
    } 
    else if (userInput.includes('rental') || userInput.includes('book rental')) {
      botReply = "🚕 To book a rental cab, click on 'Rental' on the Home page.";
    }
    else if (userInput.includes('split fare') || userInput.includes('share payment')) {
      botReply = "👥 You can split fare with friends during ride confirmation.";
    }
    else if (userInput.includes('payment option') || userInput.includes('how to pay') || userInput.includes('payment')) {
      botReply = "💳 You can pay either by Cash after ride or Online via Razorpay.";
    }
    else if (userInput.includes('book ride') || userInput.includes('find cab') || userInput.includes('how to ride')) {
      botReply = "🚗 To book a ride: Enter Pickup ➔ Destination ➔ Choose Vehicle ➔ Confirm.";
    }
    else if (userInput.includes('cancel ride') || userInput.includes('cancel booking')) {
      botReply = "❌ To cancel a ride, go to your current ride screen and tap 'Cancel Ride'.";
    }
    else if (userInput.includes('support') || userInput.includes('help center')) {
      botReply = "🛟 For help, visit 'Help Center' inside Sidebar or contact support.";
    }

    setTimeout(() => {
      setMessages(prev => [...prev, { from: 'bot', text: botReply }]);
    }, 600);

    setInput('');
  };

  const handleQuickQuestion = (text) => {
    setInput(text);
    setTimeout(() => {
      handleSend();
    }, 200);
  };

  const clearChat = () => {
    setMessages([{ from: 'bot', text: 'Hi! 👋 How can I assist you today?' }]);
  };

  const handleClose = () => {
    setIsOpen(false);
    clearChat(); // Auto-clear when closing
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {isOpen ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }} 
          className="w-80 h-[500px] bg-gray-900 rounded-xl shadow-2xl flex flex-col"
        >
          {/* Header */}
          <div className="bg-blue-600 p-3 rounded-t-xl flex items-center justify-between">
            <h4 className="text-white text-lg font-semibold">RideEasy Bot 🤖</h4>
            <button onClick={handleClose} className="text-white text-xl">&times;</button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 scrollbar-hide">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`px-3 py-2 rounded-lg text-sm max-w-[70%] ${
                  msg.from === 'user' ? 'bg-green-600 text-white' : 'bg-gray-700 text-white'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-700 flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              type="text"
              placeholder="Type your question..."
              className="flex-1 p-2 text-sm rounded-md bg-gray-800 focus:outline-none text-white"
            />
            <button 
              onClick={handleSend}
              className="bg-green-600 hover:bg-green-700 px-3 py-2 rounded-md text-sm"
            >
              Send
            </button>
          </div>

          {/* Quick Questions + Clear Chat Button */}
          <div className="p-3 border-t border-gray-700 h-[25%] overflow-y-auto scrollbar-hide">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-gray-400">Quick Questions:</p>
              <button
                onClick={clearChat}
                className="text-xs bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded-md"
              >
                Clear Chat
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {commonQuestions.map((question, idx) => (
                <button 
                  key={idx}
                  onClick={() => handleQuickQuestion(question)}
                  className="text-xs bg-gray-800 hover:bg-gray-700 px-2 py-1 rounded text-white"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700"
        >
          <i className="ri-chat-1-line text-2xl"></i>
        </button>
      )}
    </div>
  );
};

export default Chatbot;
