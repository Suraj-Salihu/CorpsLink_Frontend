import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

const ChatListScreen = () => {
    const { user, chats, setCurrentScreen } = useApp();
    const [searchQuery, setSearchQuery] = useState('');
    
    const filteredChats = chats.filter(chat => 
        chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.userId.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    return (
        <div className="h-screen flex flex-col bg-off-white w-full mx-0 my-0 rounded-2xl overflow-hidden border border-gray-200 shadow-md relative">
             {/* Header */}
            <header className="bg-nysc-green text-white px-3 pt-3 pb-2 rounded-t-2xl">
                <div className="flex justify-between items-center">
                    <h1 className="text-sm font-bold">CorpsLink</h1>
                    <div className="flex items-center space-x-2">
                        <button 
                            onClick={() => setCurrentScreen('calls')}
                            className="w-9 h-9 bg-dark-khaki rounded-full flex items-center justify-center text-white"
                            aria-label="Recent calls"
                        >
                            <i className="fas fa-phone text-sm"></i>
                        </button>
                        <button 
                            onClick={() => setCurrentScreen('profile')}
                            className="w-9 h-9 bg-khaki-beige rounded-full flex items-center justify-center text-text-dark font-bold text-xs"
                            aria-label="Open profile"
                        >
                            {user?.avatar || 'CU'}
                        </button>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="mt-3">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search chats..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full p-2 pl-10 rounded-full bg-white text-text-dark placeholder-gray-400 focus:outline-none text-sm"
                        />
                        <i className="fas fa-search absolute left-3 top-2.5 text-text-muted text-sm"></i>
                    </div>
                </div>
            </header>
             
             {/* Chat List */}
             <div className="flex-1 overflow-y-auto">
                 {filteredChats.length === 0 ? (
                     <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                         <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                             <i className="fas fa-comments text-3xl text-text-muted"></i>
                         </div>
                         <h3 className="text-lg font-semibold text-text-dark mb-2">No chats yet</h3>
                         <p className="text-text-muted mb-6">Start a conversation with fellow corps members</p>
                         <button
                             onClick={() => setCurrentScreen('new-chat')}
                             className="bg-nysc-green text-white px-6 py-2 rounded-lg"
                         >
                             Start New Chat
                         </button>
                     </div>
                 ) : (
                     filteredChats.map(chat => (
                        <div 
                            key={chat.id}
                            onClick={() => setCurrentScreen('chat')}
                            className="flex items-center p-3 border-b border-gray-100 hover:bg-gray-50 active:bg-gray-100 cursor-pointer"
                        >
                             <div className="relative">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white"
                                     style={{
                                         backgroundColor: chat.isGroup ? '#8B7D3A' : '#586126'
                                     }}
                                 >
                                     {chat.avatar}
                                 </div>
                                 {!chat.isGroup && chat.isOnline && (
                                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-nysc-green rounded-full border-2 border-white"></div>
                                 )}
                            </div>
                            <div className="ml-3 flex-1 min-w-0">
                                 <div className="flex justify-between items-baseline">
                                     <h3 className="font-semibold text-text-dark truncate">{chat.name}</h3>
                                     <span className="text-xs text-text-muted whitespace-nowrap">{chat.timestamp}</span>
                                 </div>
                                 <div className="flex justify-between items-center mt-1">
                                     <p className="text-sm text-text-muted truncate">{chat.lastMessage}</p>
                                     {chat.unreadCount > 0 && (
                                        <span className="bg-nysc-green text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
                                             {chat.unreadCount}
                                         </span>
                                     )}
                                 </div>
                             </div>
                         </div>
                     ))
                 )}
             </div>
             
             {/* Floating New Chat Button */}
             <button
                 onClick={() => setCurrentScreen('new-chat')}
                className="absolute bottom-20 right-6 w-12 h-12 bg-nysc-green rounded-full flex items-center justify-center text-white shadow-lg hover:scale-105 transition transform duration-200 z-50"
                 aria-label="Start new chat"
             >
                <i className="fas fa-plus text-lg"></i>
             </button>
             
             {/* Bottom Navigation */}
             <nav className="bg-white border-t border-gray-200 flex justify-around p-2">
                 <button 
                     onClick={() => setCurrentScreen('chats')}
                     className="flex flex-col items-center p-2 text-nysc-green"
                 >
                     <i className="fas fa-comment-dots text-xl"></i>
                     <span className="text-xs mt-1">Chats</span>
                 </button>
                 <button 
                     onClick={() => setCurrentScreen('calls')}
                     className="flex flex-col items-center p-2 text-text-muted"
                 >
                     <i className="fas fa-phone text-xl"></i>
                     <span className="text-xs mt-1">Calls</span>
                 </button>
                 <button 
                     onClick={() => setCurrentScreen('settings')}
                     className="flex flex-col items-center p-2 text-text-muted"
                 >
                     <i className="fas fa-cog text-xl"></i>
                     <span className="text-xs mt-1">Settings</span>
                 </button>
             </nav>
         </div>
     );
 };
 
 export default ChatListScreen;