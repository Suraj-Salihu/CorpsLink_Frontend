import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';

const NewChatScreen = () => {
    const { contacts, startNewChat, setCurrentScreen } = useApp();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    
    // Simulate search API
    useEffect(() => {
        if (searchQuery.trim()) {
            // Filter contacts
            const filtered = contacts.filter(contact =>
                contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                contact.userId.toLowerCase().includes(searchQuery.toLowerCase())
            );
            
            // Add "Search by NYSC Code" result
            if (/^[A-Z]{2}\/\d{2}[A-Z]\/\d{4}$/.test(searchQuery.toUpperCase())) {
                const isAlreadyContact = contacts.some(c => c.userId === searchQuery.toUpperCase());
                if (!isAlreadyContact) {
                    filtered.push({
                        userId: searchQuery.toUpperCase(),
                        name: `Start chat with ${searchQuery.toUpperCase()}`,
                        isNew: true
                    });
                }
            }
            
            setSearchResults(filtered);
        } else {
            setSearchResults(contacts);
        }
    }, [searchQuery, contacts]);
    
    const handleSelectContact = (contact) => {
        startNewChat(contact.userId);
        setCurrentScreen('chat');
    };
    
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
                    <h1 className="text-xl font-bold">New Chat</h1>
                </div>
                
                {/* Search Bar */}
                <div className="mt-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search by NYSC State Code or name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full p-3 pl-10 rounded-lg bg-white bg-opacity-20 placeholder-white placeholder-opacity-80 focus:outline-none"
                        />
                        <i className="fas fa-search absolute left-3 top-3.5 text-white"></i>
                    </div>
                </div>
            </header>
            
            {/* Contact List */}
            <div className="flex-1 overflow-y-auto">
                {searchResults.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <i className="fas fa-user-plus text-3xl text-text-muted"></i>
                        </div>
                        <h3 className="text-lg font-semibold text-text-dark mb-2">No contacts found</h3>
                        <p className="text-text-muted mb-4">Try searching by NYSC State Code (e.g., FC/23A/1024)</p>
                    </div>
                ) : (
                    <div>
                        <div className="p-4 bg-gray-50">
                            <p className="text-sm text-text-muted">
                                {searchQuery ? 'Search Results' : 'Suggested Corps Members'}
                            </p>
                        </div>
                        {searchResults.map((contact, index) => (
                            <div 
                                key={index}
                                onClick={() => handleSelectContact(contact)}
                                className="flex items-center p-4 border-b border-gray-100 hover:bg-gray-50 active:bg-gray-100 cursor-pointer"
                            >
                                <div className="relative">
                                    <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white"
                                        style={{
                                            backgroundColor: contact.isGroup ? '#8B7D3A' : '#586126'
                                        }}
                                    >
                                        {contact.avatar || contact.userId.substring(0, 2)}
                                    </div>
                                    {!contact.isGroup && contact.isOnline && (
                                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-nysc-green rounded-full border-2 border-white"></div>
                                    )}
                                </div>
                                <div className="ml-4 flex-1 min-w-0">
                                    <h3 className="font-semibold text-text-dark truncate">
                                        {contact.name}
                                    </h3>
                                    <p className="text-sm text-text-muted truncate">
                                        {contact.userId}
                                        {contact.isGroup && ' • Group'}
                                    </p>
                                </div>
                                {contact.isNew && (
                                    <span className="text-xs bg-nysc-green text-white px-2 py-1 rounded">
                                        New
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default NewChatScreen;