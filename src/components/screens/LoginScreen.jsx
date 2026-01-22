import React, { useState } from 'react';
import LoadingSpinner from '../common/LoadingSpinner';
import StateCodeInput from '../common/StateCodeInput';
import { useApp } from '../../context/AppContext';

const LoginScreen = () => {
    const { setCurrentScreen, login, loading } = useApp();
    const [stateCode, setStateCode] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        // Basic validation
        if (!stateCode || !password) {
            setError('Please enter your State Code and password');
            return;
        }
        
        try {
            await login(stateCode, password);
        } catch (err) {
            setError('Invalid State Code or password. Please try again.');
        }
    };
    
    return (
        <div className="min-h-screen w-full bg-white flex flex-col">
            <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
                {/* Logo */}
                <div className="w-20 h-20 rounded-full bg-[#586126] flex items-center justify-center mb-6">
                    <div className="text-white text-3xl font-bold">CL</div>
                </div>
                
                {/* Title */}
                <h1 className="text-2xl font-bold text-[#2E2E2E] mb-2">Welcome Back!</h1>
                <p className="text-[#6B6B6B] mb-8 text-center max-w-xs">
                    Sign in to continue connecting with your fellow corps members
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
                    {/* State Code Input */}
                    <div className="space-y-2">
                        <StateCodeInput 
                            value={stateCode}
                            onChange={setStateCode}
                            error={error ? ' ' : ''}
                            className={`w-full ${error ? 'border-[#F44336]' : 'border-[#C2B280]'}`}
                        />
                    </div>

                    {/* Password Input */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-[#2E2E2E]">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className={`w-full h-11 px-3 pr-10 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#586126] focus:border-[#586126] transition-colors ${
                                    error 
                                    ? 'border-[#F44336] focus:border-[#F44336] focus:ring-[#F44336]' 
                                    : 'border-[#C2B280]'
                                }`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(s => !s)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#6B6B6B] hover:text-[#2E2E2E] transition-colors"
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                <i className={showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
                            </button>
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="p-3 bg-[#F44336]/10 border border-[#F44336] rounded-lg">
                            <p className="text-sm text-[#F44336]">{error}</p>
                        </div>
                    )}

                    {/* Login Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-11 bg-[#586126] text-white font-semibold rounded-md hover:bg-[#586126]/90 transition-colors duration-200 disabled:opacity-70 flex items-center justify-center"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center">
                                <LoadingSpinner size="small" />
                                <span className="ml-2">Signing in...</span>
                            </span>
                        ) : (
                            'Login'
                        )}
                    </button>

                    {/* Forgot Password */}
                    <div className="text-center">
                        <button 
                            type="button" 
                            className="text-sm text-[#586126] hover:underline"
                        >
                            Forgot Password?
                        </button>
                    </div>

                    {/* Register Link */}
                    <div className="text-center">
                        <p className="text-sm text-[#6B6B6B]">
                            Don't have an account?{' '}
                            <button
                                type="button"
                                onClick={() => setCurrentScreen('register')}
                                className="text-sm text-[#586126] font-medium hover:underline"
                            >
                                Register
                            </button>
                        </p>
                    </div>
                </form>
            </div>

            {/* Footer */}
            <p className="text-xs text-[#6B6B6B] text-center px-4 pb-6">
                CorpsLink is not an official NYSC application
            </p>
        </div>
    );
};

export default LoginScreen;