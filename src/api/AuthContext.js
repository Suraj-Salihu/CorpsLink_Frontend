import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../api/auth';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
      // Verify token is still valid
      authAPI.getProfile().catch(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
      });
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    const data = await authAPI.login(credentials);
    setUser(data.user);
    return data;
  };

  const register = async (userData) => {
    const data = await authAPI.register(userData);
    setUser(data.user);
    return data;
  };

  const logout = async () => {
    await authAPI.logout();
    setUser(null);
  };

  const updateProfile = async (profileData) => {
    const data = await authAPI.updateProfile(profileData);
    setUser(data.user);
    return data;
  };

  const value = {
    user,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};