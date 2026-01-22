import React, { useState } from 'react';
import LoadingSpinner from '../common/LoadingSpinner';
import StateCodeInput from '../common/StateCodeInput';
import { useApp } from '../../context/AppContext';

const RegistrationScreen = () => {
    const { setCurrentScreen, register, loading } = useApp();
    const [fullName, setFullName] = useState('');
    const [stateCode, setStateCode] = useState('');
    const [batch, setBatch] = useState('Batch A');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    
    const validateForm = () => {
        const newErrors = {};
        
        if (!fullName || fullName.trim().length < 2) {
            newErrors.fullName = 'Please enter your full name';
        }

        if (!stateCode || stateCode.trim().length < 5) {
            newErrors.stateCode = 'Please enter a valid NYSC State Code (e.g., FC/23A/1024)';
        }
        
        if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        
        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }; 
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            await register(stateCode, password);
        }
    };
    
    return (
        <div className="min-h-screen w-full bg-white flex flex-col">
            <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
                {/* Back Button */}
                <div className="w-full max-w-sm mb-4">
                    <button 
                        type="button" 
                        onClick={() => setCurrentScreen('login')} 
                        className="text-sm text-[#586126] flex items-center space-x-2 hover:underline"
                    >
                        <i className="fas fa-chevron-left text-xs"></i>
                        <span>Back</span>
                    </button>
                </div>

                {/* Header */}
                <div className="w-full max-w-sm mb-8">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-full bg-[#586126] flex items-center justify-center">
                            <span className="text-white font-bold">CL</span>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-[#2E2E2E]">Create Account</h1>
                            <p className="text-[#6B6B6B] text-sm">Join the CorpsLink community</p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
                    {/* Full Name */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-[#2E2E2E]">
                            Full Name
                        </label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Enter your full name"
                            className={`w-full h-11 px-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#586126] focus:border-[#586126] transition-colors ${
                                errors.fullName ? 'border-[#F44336]' : 'border-[#C2B280]'
                            }`}
                        />
                        {errors.fullName && (
                            <p className="text-[#F44336] text-sm mt-1">{errors.fullName}</p>
                        )}
                    </div>

                    {/* State Code */}
                    <StateCodeInput 
                        value={stateCode}
                        onChange={setStateCode}
                        error={errors.stateCode}
                    />

                    {/* Batch */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-[#2E2E2E]">
                            Batch
                        </label>
                        <div className="relative">
                            <select
                                value={batch}
                                onChange={(e) => setBatch(e.target.value)}
                                className="w-full h-11 px-3 border border-[#C2B280] rounded-md focus:outline-none focus:ring-1 focus:ring-[#586126] focus:border-[#586126] appearance-none pr-10 transition-colors"
                            >
                                <option>Batch A</option>
                                <option>Batch B</option>
                                <option>Batch C</option>
                            </select>
                            <i className="fas fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-[#6B6B6B] pointer-events-none"></i>
                        </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-[#2E2E2E]">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="At least 6 characters"
                                className={`w-full h-11 px-3 pr-10 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#586126] focus:border-[#586126] transition-colors ${
                                    errors.password ? 'border-[#F44336]' : 'border-[#C2B280]'
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
                        <p className="text-[#6B6B6B] text-xs">At least 6 characters</p>
                        {errors.password && (
                            <p className="text-[#F44336] text-sm mt-1">{errors.password}</p>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-[#2E2E2E]">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirm ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Re-enter your password"
                                className={`w-full h-11 px-3 pr-10 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#586126] focus:border-[#586126] transition-colors ${
                                    errors.confirmPassword ? 'border-[#F44336]' : 'border-[#C2B280]'
                                }`}
                            />
                            <button 
                                type="button" 
                                onClick={() => setShowConfirm(s => !s)} 
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#6B6B6B] hover:text-[#2E2E2E] transition-colors"
                                aria-label={showConfirm ? 'Hide password' : 'Show password'}
                            >
                                <i className={showConfirm ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-[#F44336] text-sm mt-1">{errors.confirmPassword}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-11 bg-[#586126] text-white font-semibold rounded-md hover:bg-[#586126]/90 transition-colors duration-200 disabled:opacity-70 flex items-center justify-center"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center">
                                <LoadingSpinner size="small" />
                                <span className="ml-2">Creating account...</span>
                            </span>
                        ) : (
                            'Create Account'
                        )}
                    </button>

                </form>
            </div>

            {/* Footer */}
            <p className="text-xs text-[#6B6B6B] text-center px-4 pb-6">
                CorpsLink is not an official NYSC application
            </p>
        </div>
    );
};

export default RegistrationScreen;