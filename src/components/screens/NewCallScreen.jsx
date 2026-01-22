import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';

const NewCallScreen = () => {
    const { contacts, setCurrentScreen } = useApp();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);
    const [callType, setCallType] = useState('voice'); // 'voice' or 'video'
    const [isCalling, setIsCalling] = useState(false);
    const [callDuration, setCallDuration] = useState(0);
    
    // Simulate search API
    useEffect(() => {
        if (searchQuery.trim()) {
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
                        name: `Call ${searchQuery.toUpperCase()}`,
                        avatar: searchQuery.substring(0, 2),
                        isNew: true
                    });
                }
            }
            
            setSearchResults(filtered);
        } else {
            setSearchResults(contacts.slice(0, 6)); // Show first 6 contacts
        }
    }, [searchQuery, contacts]);
    
    const handleCall = (contact) => {
        console.log(`Starting ${callType} call with ${contact.userId}`);
        setIsCalling(true);
        setSelectedContact(contact);
        
        // Simulate call ringing
        setTimeout(() => {
            // Simulate call connected
            const callTimer = setInterval(() => {
                setCallDuration(prev => prev + 1);
            }, 1000);
            
            // After 10 seconds, end call and go back to calls screen
            setTimeout(() => {
                clearInterval(callTimer);
                setIsCalling(false);
                setSelectedContact(null);
                setCallDuration(0);
                setCurrentScreen('calls');
            }, 10000);
        }, 2000);
    };
    
    const handleEndCall = () => {
        setIsCalling(false);
        setSelectedContact(null);
        setCallDuration(0);
    };
    
    const formatDuration = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };
    
    return (
        <div className="h-screen flex flex-col bg-off-white w-full mx-0 my-0 rounded-2xl overflow-hidden border border-gray-200 shadow-md">
            {/* Header */}
            <header className="bg-nysc-green text-white px-3 pt-3 pb-2 rounded-t-2xl">
                <div className="flex justify-between items-center">
                    <button 
                        onClick={() => setCurrentScreen('calls')}
                        className="flex items-center"
                        disabled={isCalling}
                    >
                        <i className="fas fa-arrow-left mr-2"></i>
                        <h1 className="text-sm font-bold">New Call</h1>
                    </button>
                    <div className="flex items-center space-x-3">
                        <button 
                            onClick={() => setCallType(callType === 'voice' ? 'video' : 'voice')}
                            className={`px-3 py-1 rounded-full text-xs font-medium ${callType === 'video' ? 'bg-white text-nysc-green' : 'bg-dark-khaki text-white'}`}
                            disabled={isCalling}
                        >
                            <i className={`fas ${callType === 'video' ? 'fa-video' : 'fa-phone'} mr-1`}></i>
                            {callType === 'video' ? 'Video' : 'Voice'}
                        </button>
                    </div>
                </div>
                
                {/* Search Bar - Hidden when calling */}
                {!isCalling && (
                    <div className="mt-3">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search contacts or enter NYSC State Code..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full p-2 pl-10 rounded-full bg-white text-text-dark placeholder-gray-400 focus:outline-none text-sm"
                            />
                            <i className="fas fa-search absolute left-3 top-2.5 text-text-muted text-sm"></i>
                        </div>
                    </div>
                )}
            </header>
            
            {/* Active Call Screen */}
            {isCalling && selectedContact && (
                <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-b from-nysc-green to-dark-khaki p-6">
                    <div className="text-center mb-8">
                        <div className="w-32 h-32 rounded-full flex items-center justify-center font-bold text-4xl text-white bg-white bg-opacity-20 mb-6">
                            {selectedContact.avatar}
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">{selectedContact.name}</h2>
                        <p className="text-white opacity-80 mb-1">{selectedContact.userId}</p>
                        <p className="text-white opacity-60">
                            {callType === 'video' ? 'Video Call' : 'Voice Call'} • {formatDuration(callDuration)}
                        </p>
                    </div>
                    
                    {/* Call Controls */}
                    <div className="flex space-x-8 mt-12">
                        <button 
                            className="flex flex-col items-center"
                            onClick={() => setCallType(callType === 'voice' ? 'video' : 'voice')}
                        >
                            <div className="w-16 h-16 rounded-full bg-white bg-opacity-30 flex items-center justify-center mb-2">
                                <i className={`fas ${callType === 'video' ? 'fa-phone' : 'fa-video'} text-white text-2xl`}></i>
                            </div>
                            <span className="text-white text-xs">Switch to {callType === 'video' ? 'Voice' : 'Video'}</span>
                        </button>
                        
                        <button 
                            className="flex flex-col items-center"
                            onClick={handleEndCall}
                        >
                            <div className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center mb-2">
                                <i className="fas fa-phone-slash text-white text-2xl"></i>
                            </div>
                            <span className="text-white text-xs">End Call</span>
                        </button>
                        
                        <button className="flex flex-col items-center">
                            <div className="w-16 h-16 rounded-full bg-white bg-opacity-30 flex items-center justify-center mb-2">
                                <i className="fas fa-microphone-slash text-white text-2xl"></i>
                            </div>
                            <span className="text-white text-xs">Mute</span>
                        </button>
                    </div>
                </div>
            )}
            
            {/* Regular Call Screen (when not in active call) */}
            {!isCalling && (
                <>
                    {/* Call Type Selector */}
                    <div className="bg-white p-3 border-b border-gray-200">
                        <div className="flex justify-center space-x-6">
                            <button 
                                onClick={() => setCallType('voice')}
                                className={`flex flex-col items-center p-2 ${callType === 'voice' ? 'text-nysc-green' : 'text-text-muted'}`}
                            >
                                <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-2 ${callType === 'voice' ? 'bg-green-100' : 'bg-gray-100'}`}>
                                    <i className="fas fa-phone text-xl"></i>
                                </div>
                                <span className="text-xs font-medium">Voice Call</span>
                            </button>
                            <button 
                                onClick={() => setCallType('video')}
                                className={`flex flex-col items-center p-2 ${callType === 'video' ? 'text-nysc-green' : 'text-text-muted'}`}
                            >
                                <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-2 ${callType === 'video' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                                    <i className="fas fa-video text-xl"></i>
                                </div>
                                <span className="text-xs font-medium">Video Call</span>
                            </button>
                        </div>
                    </div>
                    
                    {/* Selected Contact Display (before calling) */}
                    {selectedContact && !isCalling && (
                        <div className="bg-white p-4 border-b border-gray-200">
                            <div className="flex flex-col items-center">
                                <div className="w-20 h-20 rounded-full flex items-center justify-center font-bold text-2xl text-white bg-nysc-green mb-3">
                                    {selectedContact.avatar}
                                </div>
                                <h3 className="font-semibold text-text-dark text-lg">{selectedContact.name}</h3>
                                <p className="text-sm text-text-muted mb-4">{selectedContact.userId}</p>
                                <div className="flex space-x-4">
                                    <button 
                                        onClick={() => handleCall(selectedContact)}
                                        className={`px-8 py-3 rounded-full font-medium ${callType === 'video' ? 'bg-blue-600' : 'bg-green-600'} text-white flex items-center`}
                                    >
                                        <i className={`fas ${callType === 'video' ? 'fa-video' : 'fa-phone'} mr-2`}></i>
                                        Call Now
                                    </button>
                                    <button 
                                        onClick={() => setSelectedContact(null)}
                                        className="px-6 py-3 rounded-full font-medium bg-gray-200 text-text-dark"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {/* Contact List */}
                    <div className="flex-1 overflow-y-auto">
                        {searchResults.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                    <i className="fas fa-user-plus text-3xl text-text-muted"></i>
                                </div>
                                <h3 className="text-lg font-semibold text-text-dark mb-2">No contacts found</h3>
                                <p className="text-text-muted mb-4">Try searching by NYSC State Code</p>
                                <div className="bg-gray-100 p-4 rounded-lg">
                                    <p className="text-sm text-text-muted">Example: FC/23A/1024</p>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div className="p-3 bg-gray-50">
                                    <p className="text-sm text-text-muted">
                                        {searchQuery ? 'Search Results' : 'Frequent Contacts'}
                                    </p>
                                </div>
                                {searchResults.map((contact) => (
                                    <div 
                                        key={contact.userId}
                                        onClick={() => setSelectedContact(contact)}
                                        className="flex items-center p-3 border-b border-gray-100 hover:bg-gray-50 active:bg-gray-100 cursor-pointer"
                                    >
                                        <div className="relative">
                                            <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white"
                                                style={{
                                                    backgroundColor: contact.isGroup ? '#8B7D3A' : '#586126'
                                                }}
                                            >
                                                {contact.avatar}
                                            </div>
                                            {!contact.isGroup && contact.isOnline && (
                                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                            )}
                                        </div>
                                        <div className="ml-3 flex-1 min-w-0">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <h3 className="font-semibold text-text-dark truncate">{contact.name}</h3>
                                                    <p className="text-sm text-text-muted truncate">{contact.userId}</p>
                                                </div>
                                                {contact.isNew && (
                                                    <span className="text-xs bg-nysc-green text-white px-2 py-1 rounded">
                                                        New
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button 
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setCallType('voice');
                                                    setSelectedContact(contact);
                                                }}
                                                className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600"
                                                aria-label="Voice call"
                                            >
                                                <i className="fas fa-phone"></i>
                                            </button>
                                            <button 
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setCallType('video');
                                                    setSelectedContact(contact);
                                                }}
                                                className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600"
                                                aria-label="Video call"
                                            >
                                                <i className="fas fa-video"></i>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    
                    {/* Quick Dial Section */}
                    {!searchQuery && (
                        <div className="bg-white border-t border-gray-200 p-4">
                            <h3 className="text-sm font-medium text-text-dark mb-3">Quick Dial</h3>
                            <div className="grid grid-cols-3 gap-3">
                                {['Emergency', 'NYSC HQ', 'CDS Group'].map((label, index) => (
                                    <button
                                        key={index}
                                        className="flex flex-col items-center p-2 bg-gray-50 rounded-lg hover:bg-gray-100"
                                        onClick={() => {
                                            const mockContact = {
                                                userId: label === 'Emergency' ? 'EM/00A/0000' : 
                                                       label === 'NYSC HQ' ? 'HQ/00A/0001' : 'GR/00A/0002',
                                                name: label,
                                                avatar: label.charAt(0),
                                                isGroup: label === 'CDS Group'
                                            };
                                            setSelectedContact(mockContact);
                                        }}
                                    >
                                        <div className="w-10 h-10 rounded-full bg-nysc-green flex items-center justify-center text-white mb-2">
                                            <i className="fas fa-phone"></i>
                                        </div>
                                        <span className="text-xs text-text-muted text-center">{label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </>
            )}
            
            {/* Bottom Navigation */}
            {!isCalling && (
                <nav className="bg-white border-t border-gray-200 flex justify-around p-2">
                    <button 
                        onClick={() => setCurrentScreen('chats')}
                        className="flex flex-col items-center p-2 text-text-muted"
                    >
                        <i className="fas fa-comment-dots text-xl"></i>
                        <span className="text-xs mt-1">Chats</span>
                    </button>
                    <button 
                        onClick={() => setCurrentScreen('calls')}
                        className="flex flex-col items-center p-2 text-nysc-green"
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
            )}
        </div>
    );
};

export default NewCallScreen;