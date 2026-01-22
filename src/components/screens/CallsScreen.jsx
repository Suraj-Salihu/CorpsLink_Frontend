import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

const CallsScreen = () => {
    const { user, setCurrentScreen, contacts } = useApp();
    const [activeTab, setActiveTab] = useState('all'); // 'all', 'missed', 'dialed', 'received'
    const [searchQuery, setSearchQuery] = useState('');
    
    // Mock call history data
    const [calls, setCalls] = useState([
        {
            id: '1',
            userId: 'AB/23B/1234',
            name: 'Adebayo Johnson',
            avatar: 'AJ',
            type: 'outgoing',
            callType: 'voice',
            duration: '2:30',
            timestamp: '10:30 AM',
            date: 'Today',
            isMissed: false
        },
        {
            id: '2',
            userId: 'FC/23A/1024',
            name: 'Fatima Chukwu',
            avatar: 'FC',
            type: 'incoming',
            callType: 'video',
            duration: '5:15',
            timestamp: 'Yesterday',
            date: 'Yesterday',
            isMissed: false
        },
        {
            id: '3',
            userId: 'LA/23C/5678',
            name: 'Lagos Batch A Group',
            avatar: 'LG',
            type: 'outgoing',
            callType: 'voice',
            duration: '1:45',
            timestamp: 'Nov 15',
            date: '2 days ago',
            isMissed: true
        },
        {
            id: '4',
            userId: 'OG/23A/9876',
            name: 'Ogun State Group',
            avatar: 'OG',
            type: 'incoming',
            callType: 'voice',
            duration: '3:20',
            timestamp: 'Nov 14',
            date: '3 days ago',
            isMissed: false
        },
        {
            id: '5',
            userId: 'KN/23C/3456',
            name: 'Kano Batch C',
            avatar: 'KN',
            type: 'outgoing',
            callType: 'video',
            duration: '4:10',
            timestamp: 'Nov 13',
            date: '4 days ago',
            isMissed: false
        },
        {
            id: '6',
            userId: 'RY/23B/7890',
            name: 'Rivers Corps',
            avatar: 'RY',
            type: 'incoming',
            callType: 'voice',
            duration: '0:45',
            timestamp: 'Nov 12',
            date: '5 days ago',
            isMissed: true
        },
    ]);

    // Filter calls based on active tab
    const filteredCalls = calls.filter(call => {
        if (activeTab === 'missed') return call.isMissed;
        if (activeTab === 'dialed') return call.type === 'outgoing';
        if (activeTab === 'received') return call.type === 'incoming';
        return true; // 'all' tab
    }).filter(call => 
        call.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        call.userId.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Group calls by date
    const groupedCalls = filteredCalls.reduce((groups, call) => {
        const date = call.date;
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(call);
        return groups;
    }, {});

    const handleCallAction = (contactId, isVideo = false) => {
        console.log(`Initiating ${isVideo ? 'video' : 'voice'} call to ${contactId}`);
        // In a real app, this would initiate WebRTC call
        alert(`Calling ${contactId}...`);
    };

    const handleStartNewCall = () => {
        setCurrentScreen('new-call');
    };

    const getCallIcon = (call) => {
        if (call.isMissed) {
            return call.type === 'outgoing' 
                ? 'fas fa-phone-slash text-red-500' 
                : 'fas fa-phone-missed text-red-500';
        }
        
        if (call.type === 'outgoing') {
            return 'fas fa-phone-alt text-green-500';
        } else {
            return 'fas fa-phone text-blue-500';
        }
    };

    const getCallTypeIcon = (callType) => {
        return callType === 'video' 
            ? 'fas fa-video text-text-muted ml-1 text-xs' 
            : 'fas fa-microphone text-text-muted ml-1 text-xs';
    };

    return (
        <div className="h-screen flex flex-col bg-off-white w-full mx-0 my-0 rounded-2xl overflow-hidden border border-gray-200 shadow-md">
            {/* Header */}
            <header className="bg-nysc-green text-white px-3 pt-3 pb-2 rounded-t-2xl">
                <div className="flex justify-between items-center">
                    <button 
                        onClick={() => setCurrentScreen('chats')}
                        className="flex items-center"
                    >
                        <i className="fas fa-arrow-left mr-2"></i>
                        <h1 className="text-sm font-bold">Calls</h1>
                    </button>
                    <div className="flex items-center space-x-2">
                        <button 
                            onClick={() => setCurrentScreen('new-call')}
                            className="w-9 h-9 bg-dark-khaki rounded-full flex items-center justify-center text-white"
                            aria-label="Start new call"
                        >
                            <i className="fas fa-phone-plus text-sm"></i>
                        </button>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="mt-3">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search calls..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full p-2 pl-10 rounded-full bg-white text-text-dark placeholder-gray-400 focus:outline-none text-sm"
                        />
                        <i className="fas fa-search absolute left-3 top-2.5 text-text-muted text-sm"></i>
                    </div>
                </div>
            </header>

            {/* Call Tabs */}
            <div className="bg-white border-b border-gray-200">
                <div className="flex overflow-x-auto scrollbar-hide">
                    {['all', 'missed', 'dialed', 'received'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 px-4 py-3 text-sm font-medium whitespace-nowrap ${activeTab === tab 
                                ? 'text-nysc-green border-b-2 border-nysc-green' 
                                : 'text-text-muted'}`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Call History List */}
            <div className="flex-1 overflow-y-auto">
                {filteredCalls.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <i className="fas fa-phone text-3xl text-text-muted"></i>
                        </div>
                        <h3 className="text-lg font-semibold text-text-dark mb-2">
                            {activeTab === 'missed' ? 'No missed calls' : 
                             activeTab === 'dialed' ? 'No dialed calls' :
                             activeTab === 'received' ? 'No received calls' : 'No calls yet'}
                        </h3>
                        <p className="text-text-muted mb-6">
                            {activeTab === 'all' ? 'Start calling fellow corps members' : 'All calls are cleared'}
                        </p>
                        <button
                            onClick={handleStartNewCall}
                            className="bg-nysc-green text-white px-6 py-2 rounded-lg"
                        >
                            Start New Call
                        </button>
                    </div>
                ) : (
                    <div>
                        {Object.entries(groupedCalls).map(([date, dateCalls]) => (
                            <div key={date}>
                                <div className="px-4 py-2 bg-gray-50">
                                    <h3 className="text-xs font-medium text-text-muted">{date}</h3>
                                </div>
                                {dateCalls.map(call => (
                                    <div 
                                        key={call.id}
                                        className="flex items-center p-3 border-b border-gray-100 hover:bg-gray-50 active:bg-gray-100 cursor-pointer"
                                        onClick={() => handleCallAction(call.userId, call.callType === 'video')}
                                    >
                                        <div className="relative">
                                            <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white"
                                                style={{
                                                    backgroundColor: call.isGroup ? '#8B7D3A' : '#586126'
                                                }}
                                            >
                                                {call.avatar}
                                            </div>
                                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center">
                                                <i className={`${getCallTypeIcon(call.callType)}`}></i>
                                            </div>
                                        </div>
                                        <div className="ml-3 flex-1 min-w-0">
                                            <div className="flex justify-between items-baseline">
                                                <div className="flex items-center">
                                                    <h3 className={`font-semibold truncate ${call.isMissed ? 'text-red-500' : 'text-text-dark'}`}>
                                                        {call.name}
                                                    </h3>
                                                    {call.isMissed && (
                                                        <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded">Missed</span>
                                                    )}
                                                </div>
                                                <span className="text-xs text-text-muted whitespace-nowrap">{call.timestamp}</span>
                                            </div>
                                            <div className="flex justify-between items-center mt-1">
                                                <div className="flex items-center">
                                                    <i className={`${getCallIcon(call)} mr-2 text-sm`}></i>
                                                    <span className="text-sm text-text-muted">
                                                        {call.type === 'outgoing' ? 'Outgoing' : 'Incoming'} • {call.duration}
                                                    </span>
                                                </div>
                                                <div className="flex space-x-2">
                                                    <button 
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleCallAction(call.userId, false);
                                                        }}
                                                        className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600"
                                                        aria-label="Voice call"
                                                    >
                                                        <i className="fas fa-phone text-xs"></i>
                                                    </button>
                                                    <button 
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleCallAction(call.userId, true);
                                                        }}
                                                        className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600"
                                                        aria-label="Video call"
                                                    >
                                                        <i className="fas fa-video text-xs"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Bottom Navigation */}
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

            {/* Floating New Call Button */}
            <button
                onClick={handleStartNewCall}
                className="absolute bottom-20 right-6 w-12 h-12 bg-nysc-green rounded-full flex items-center justify-center text-white shadow-lg hover:scale-105 transition transform duration-200 z-50"
                aria-label="Start new call"
            >
                <i className="fas fa-phone text-lg"></i>
            </button>
        </div>
    );
};

export default CallsScreen;