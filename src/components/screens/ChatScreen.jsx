import React, { useState, useEffect, useRef } from 'react';
import ChatBubble from '../common/ChatBubble';
import { useApp } from '../../context/AppContext';

const ChatScreen = () => {
    const { user, sendMessage, setCurrentScreen } = useApp();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    
    // Mock messages
    useEffect(() => {
        setMessages([
            { id: 1, text: 'Hello there! How are you doing?', isSent: false, timestamp: new Date(Date.now() - 3600000), isRead: true },
            { id: 2, text: 'I\'m good! Just finished with CDS meeting', isSent: true, timestamp: new Date(Date.now() - 3500000), isRead: true },
            { id: 3, text: 'Great! How was it?', isSent: false, timestamp: new Date(Date.now() - 3400000), isRead: true },
            { id: 4, text: 'It was productive. We discussed the community development project', isSent: true, timestamp: new Date(Date.now() - 3300000), isRead: true },
            { id: 5, text: 'We need to submit our reports by Friday', isSent: false, timestamp: new Date(Date.now() - 3200000), isRead: true },
            { id: 6, text: 'Okay, I\'ll work on mine tomorrow', isSent: true, timestamp: new Date(Date.now() - 3100000), isRead: true },
            { id: 7, text: 'Check this out!', isSent: false, timestamp: new Date(Date.now() - 3000000), isRead: true, type: 'image', content: 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
            { id: 8, text: 'Nice picture! Where was this taken?', isSent: true, timestamp: new Date(Date.now() - 2900000), isRead: true },
        ]);
    }, []);
    
    const handleSend = () => {
        if (message.trim()) {
            const newMessage = {
                id: messages.length + 1,
                text: message,
                isSent: true,
                timestamp: new Date(),
                isRead: false,
                type: 'text'
            };
            
            setMessages([...messages, newMessage]);
            sendMessage('current-chat', message);
            setMessage('');
            
            // Simulate reply after 1 second
            setTimeout(() => {
                const replyMessage = {
                    id: messages.length + 2,
                    text: 'Thanks for your message!',
                    isSent: false,
                    timestamp: new Date(),
                    isRead: false,
                    type: 'text'
                };
                setMessages(prev => [...prev, replyMessage]);
                setIsTyping(false);
            }, 1000);
            
            // Simulate typing indicator
            setIsTyping(true);
        }
    };
    
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };
    
    // Auto-scroll to bottom
    const messagesEndRef = useRef(null);
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    
    return (
        <div className="h-screen flex flex-col bg-off-white">
            {/* Header */}
            <header className="bg-nysc-green text-white p-4">
                <div className="flex items-center">
                    <button 
                        onClick={() => setCurrentScreen('chats')}
                        className="mr-4"
                    >
                        <i className="fas fa-arrow-left"></i>
                    </button>
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold bg-khaki-beige text-text-dark">
                            AJ
                        </div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-nysc-green rounded-full border-2 border-white"></div>
                    </div>
                    <div className="ml-4">
                        <h1 className="font-bold">Adebayo Johnson</h1>
                        <p className="text-sm opacity-90">AB/23B/1234 • Online</p>
                    </div>
                </div>
                <div className="flex justify-end mt-2">
                    <button 
                        onClick={() => {/* Report user */}}
                        className="text-sm bg-white bg-opacity-20 px-3 py-1 rounded"
                    >
                        <i className="fas fa-flag mr-1"></i> Report
                    </button>
                </div>
            </header>
            
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                <div className="text-center mb-4">
                    <span className="inline-block bg-white px-3 py-1 rounded-full text-xs text-text-muted">
                        Today
                    </span>
                </div>
                
                {messages.map(msg => (
                    <ChatBubble
                        key={msg.id}
                        message={msg.type === 'image' ? msg.content : msg.text}
                        isSent={msg.isSent}
                        timestamp={msg.timestamp}
                        isRead={msg.isRead}
                        type={msg.type || 'text'}
                    />
                ))}
                
                {isTyping && (
                    <div className="flex justify-start mb-3">
                        <div className="bg-white border border-gray-200 rounded-full px-4 py-2">
                            <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                        </div>
                    </div>
                )}
                
                <div ref={messagesEndRef} />
            </div>
            
            {/* Input Area */}
            <div className="bg-white border-t border-gray-200 p-3">
                <div className="flex items-center">
                    <button className="w-10 h-10 rounded-full flex items-center justify-center text-text-muted">
                        <i className="fas fa-plus"></i>
                    </button>
                    <button className="w-10 h-10 rounded-full flex items-center justify-center text-text-muted">
                        <i className="fas fa-image"></i>
                    </button>
                    <button className="w-10 h-10 rounded-full flex items-center justify-center text-text-muted">
                        <i className="fas fa-microphone"></i>
                    </button>
                    
                    <div className="flex-1 mx-2">
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type a message..."
                            className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-nysc-green resize-none"
                            rows="1"
                            style={{ maxHeight: '100px' }}
                        />
                    </div>
                    
                    <button
                        onClick={handleSend}
                        disabled={!message.trim()}
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            message.trim() 
                                ? 'bg-nysc-green text-white' 
                                : 'bg-gray-200 text-gray-400'
                        }`}
                    >
                        <i className="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatScreen;