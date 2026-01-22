import React from 'react';
import { useApp } from '../../context/AppContext';

const MediaScreen = () => {
    const { setCurrentScreen } = useApp();
    
    const mediaItems = [
        { id: 1, type: 'image', thumbnail: 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', date: 'Today' },
        { id: 2, type: 'image', thumbnail: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', date: 'Yesterday' },
        { id: 3, type: 'voice', duration: '2:30', date: 'Nov 15' },
        { id: 4, type: 'video', duration: '1:45', date: 'Nov 14' },
        { id: 5, type: 'image', thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', date: 'Nov 13' },
        { id: 6, type: 'voice', duration: '3:15', date: 'Nov 12' },
    ];
    
    return (
        <div className="h-screen flex flex-col bg-off-white">
            <header className="bg-nysc-green text-white p-4">
                <div className="flex items-center">
                    <button 
                        onClick={() => setCurrentScreen('chat')}
                        className="mr-4"
                    >
                        <i className="fas fa-arrow-left"></i>
                    </button>
                    <h1 className="text-xl font-bold">Media, Links & Docs</h1>
                </div>
            </header>
            
            <div className="flex-1 overflow-y-auto p-4">
                <div className="mb-6">
                    <h2 className="font-semibold text-text-dark mb-3">Photos & Videos</h2>
                    <div className="grid grid-cols-3 gap-2">
                        {mediaItems.filter(m => m.type === 'image' || m.type === 'video').map(item => (
                            <div key={item.id} className="relative rounded-lg overflow-hidden aspect-square bg-gray-200">
                                {item.type === 'image' ? (
                                    <img 
                                        src={item.thumbnail} 
                                        alt="Media" 
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <div className="text-center">
                                            <i className="fas fa-play-circle text-3xl text-white opacity-80"></i>
                                            <p className="text-white text-xs mt-1">{item.duration}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="mb-6">
                    <h2 className="font-semibold text-text-dark mb-3">Voice Messages</h2>
                    <div className="space-y-3">
                        {mediaItems.filter(m => m.type === 'voice').map(item => (
                            <div key={item.id} className="flex items-center bg-white p-3 rounded-lg">
                                <button className="w-10 h-10 bg-nysc-green rounded-full flex items-center justify-center text-white mr-3">
                                    <i className="fas fa-play"></i>
                                </button>
                                <div className="flex-1">
                                    <div className="h-2 bg-gray-200 rounded-full w-full"></div>
                                    <p className="text-xs text-text-muted mt-1">{item.duration} • {item.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MediaScreen;