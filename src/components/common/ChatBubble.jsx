import React from 'react';
import { formatTime } from '../../utils/helpers';

const ChatBubble = ({ message, isSent, timestamp, isRead, type = 'text' }) => {
    return (
        <div className={`flex ${isSent ? 'justify-end' : 'justify-start'} mb-3`}>
            <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 ${
                isSent 
                    ? 'message-bubble-sent bg-khaki-beige text-text-dark' 
                    : 'message-bubble-received bg-white border border-gray-200 text-text-dark'
            }`}>
                {type === 'text' && <p className="break-words">{message}</p>}
                {type === 'image' && (
                    <div className="relative">
                        <img 
                            src={message} 
                            alt="Shared media" 
                            className="rounded-lg max-w-full h-auto"
                            onError={(e) => e.target.style.display = 'none'}
                        />
                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                            <i className="fas fa-image mr-1"></i> Photo
                        </div>
                    </div>
                )}
                {type === 'voice' && (
                    <div className="flex items-center">
                        <button className="bg-nysc-green text-white p-3 rounded-full mr-3">
                            <i className="fas fa-play"></i>
                        </button>
                        <div>
                            <div className="flex items-center">
                                <div className="h-1 bg-gray-300 rounded-full w-24 mr-2"></div>
                                <span className="text-xs text-text-muted">2:30</span>
                            </div>
                            <p className="text-xs text-text-muted mt-1">Voice message</p>
                        </div>
                    </div>
                )}
                <div className={`flex justify-end items-center mt-1 ${
                    isSent ? 'text-text-dark' : 'text-text-muted'
                }`}>
                    <span className="text-xs mr-1">{timestamp ? formatTime(timestamp) : '10:30 AM'}</span>
                    {isSent && (
                        <span className="text-xs">
                            {isRead ? (
                                <span className="text-blue-500"><i className="fas fa-check-double"></i></span>
                            ) : (
                                <span className="text-gray-400"><i className="fas fa-check"></i></span>
                            )}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatBubble;