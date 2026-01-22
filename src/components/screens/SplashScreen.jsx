import React, { useEffect } from 'react';
import LoadingSpinner from '../common/LoadingSpinner';
import { useApp } from '../../context/AppContext';
import logo from '../../assets/logo.png'; // new import

const SplashScreen = () => {
    const { setCurrentScreen, isAuthenticated } = useApp();
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentScreen(isAuthenticated ? 'chats' : 'login');
        }, 2000);
        return () => clearTimeout(timer);
    }, [setCurrentScreen, isAuthenticated]);
    
    return (
        <div className="h-screen relative flex flex-col justify-center items-center bg-nysc-green fade-in">
            <div className="bg-nysc-green rounded-full w-24 h-24 flex items-center justify-center mb-4 object-contain">
                <img src={logo} alt="CorpsLink logo" className="w-12 h-12 object-contain" />
            </div>
            <h1 className="text-2xl font-bold text-[#cec095] mb-2">CorpsLink</h1>
            <footer className="absolute bottom-6 left-0 right-0 flex flex-col items-center">
                <div className="mb-3">
                    <LoadingSpinner size="small" color="khaki" />
                </div>
                <p className="text-[#cfc095] text-lg">Serving Together NG</p>
            </footer>
        </div>
    );
};

export default SplashScreen;