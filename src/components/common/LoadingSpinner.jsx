import React from 'react';

const LoadingSpinner = ({ size = 'small', color = 'khaki' }) => {
    const sizeClasses = {
        small: 'w-6 h-6',
        medium: 'w-10 h-10',
        large: 'w-16 h-16'
    };

    const colorMap = {
        'nysc-green': 'border-nysc-green',
        'white': 'border-white',
        'muted': 'border-text-muted',
        'khaki': 'border-[#C2B280]'
    };

    const colorClass = colorMap[color] || 'border-nysc-green';
    
    return (
        <div role="status" aria-label="Loading" className="flex justify-center items-center">
            <div className={`${sizeClasses[size]} border-2 ${colorClass} border-t-transparent rounded-full animate-spin`}></div>
        </div>
    );
};

export default LoadingSpinner;