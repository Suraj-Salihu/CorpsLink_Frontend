import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI, usersAPI, chatsAPI, callsAPI, healthCheck } from '../api';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [backendConnected, setBackendConnected] = useState(false);
  const [chats, setChats] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [calls, setCalls] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [activeCall, setActiveCall] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  // Check backend connection and authentication on mount
  useEffect(() => {
    const initializeApp = async () => {
      try {
        console.log('Checking backend connection...');
        
        // Check if backend is running
        const health = await healthCheck();
        console.log('Backend health:', health);
        setBackendConnected(true);
        
        // Check if user is already logged in
        const token = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');
        
        console.log('Token exists:', !!token, 'Saved user:', !!savedUser);
        
        if (token && savedUser) {
          try {
            // Verify token is still valid
            const profile = await authAPI.getProfile();
            console.log('Profile loaded:', profile);
            
            setIsAuthenticated(true);
            setUser(profile.user || JSON.parse(savedUser));
            setCurrentScreen('chats');
            
            // Load initial data
            await loadInitialData();
          } catch (error) {
            console.error('Token validation failed:', error);
            // Token invalid, clear storage
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setIsAuthenticated(false);
            setCurrentScreen('login');
          }
        } else {
          console.log('No saved session, showing login');
          setCurrentScreen('login');
        }
      } catch (error) {
        console.error('Backend connection failed:', error);
        setBackendConnected(false);
        setCurrentScreen('login');
      } finally {
        setLoading(false);
      }
    };
    
    initializeApp();
  }, []);

  const loadInitialData = async () => {
    try {
      console.log('Loading initial data...');
      
      const [chatsData, contactsData, callsData] = await Promise.all([
        chatsAPI.getAll().catch(err => {
          console.error('Failed to load chats:', err);
          return { chats: [] };
        }),
        usersAPI.getContacts().catch(err => {
          console.error('Failed to load contacts:', err);
          return { contacts: [] };
        }),
        callsAPI.getHistory().catch(err => {
          console.error('Failed to load calls:', err);
          return { calls: [] };
        }),
      ]);
      
      console.log('Chats loaded:', chatsData.chats?.length || 0);
      console.log('Contacts loaded:', contactsData.contacts?.length || 0);
      console.log('Calls loaded:', callsData.calls?.length || 0);
      
      setChats(chatsData.chats || []);
      setContacts(contactsData.contacts || []);
      setCalls(callsData.calls || []);
    } catch (error) {
      console.error('Failed to load initial data:', error);
    }
  };

  // Auth functions
  const login = async (credentials) => {
    try {
      console.log('Attempting login with:', credentials.nyscStateCode);
      
      const result = await authAPI.login(credentials);
      console.log('Login result:', result);
      
      if (result.token && result.user) {
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
        
        setIsAuthenticated(true);
        setUser(result.user);
        setCurrentScreen('chats');
        
        // Load initial data after login
        await loadInitialData();
        
        return { success: true, data: result };
      }
      return { success: false, error: 'Invalid response from server' };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: error.message || 'Login failed. Please check your credentials.' 
      };
    }
  };

  const register = async (userData) => {
    try {
      console.log('Attempting registration for:', userData.nyscStateCode);
      
      const result = await authAPI.register(userData);
      console.log('Registration result:', result);
      
      if (result.token && result.user) {
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
        
        setIsAuthenticated(true);
        setUser(result.user);
        setCurrentScreen('chats');
        
        await loadInitialData();
        
        return { success: true, data: result };
      }
      return { success: false, error: 'Invalid response from server' };
    } catch (error) {
      console.error('Registration error:', error);
      return { 
        success: false, 
        error: error.message || 'Registration failed. Please try again.' 
      };
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setIsAuthenticated(false);
      setUser(null);
      setCurrentScreen('login');
      setChats([]);
      setContacts([]);
      setCalls([]);
      setSearchResults([]);
    }
  };

  // Chat functions
  const startNewChat = async (participantId) => {
    try {
      console.log('Starting new chat with participant:', participantId);
      
      const result = await chatsAPI.start(participantId);
      console.log('Chat start result:', result);
      
      // Refresh chats list
      const chatsData = await chatsAPI.getAll();
      setChats(chatsData.chats || []);
      
      return { success: true, data: result };
    } catch (error) {
      console.error('Failed to start chat:', error);
      return { 
        success: false, 
        error: error.message || 'Failed to start chat' 
      };
    }
  };

  const sendMessage = async (chatId, messageData) => {
    try {
      console.log('Sending message to chat:', chatId);
      
      const result = await chatsAPI.sendMessage(chatId, messageData);
      console.log('Message sent result:', result);
      
      return { success: true, data: result };
    } catch (error) {
      console.error('Failed to send message:', error);
      return { 
        success: false, 
        error: error.message || 'Failed to send message' 
      };
    }
  };

  const getChatMessages = async (chatId, page = 1, limit = 50) => {
    try {
      console.log('Getting messages for chat:', chatId);
      
      const result = await chatsAPI.getMessages(chatId, page, limit);
      console.log('Messages loaded:', result.messages?.length || 0);
      
      return { success: true, data: result };
    } catch (error) {
      console.error('Failed to get messages:', error);
      return { 
        success: false, 
        error: error.message || 'Failed to load messages' 
      };
    }
  };

  // Contact functions
  const addNewContact = async (contactId) => {
    try {
      console.log('Adding contact:', contactId);
      
      const result = await usersAPI.addContact(contactId);
      console.log('Contact added result:', result);
      
      // Refresh contacts list
      const contactsData = await usersAPI.getContacts();
      setContacts(contactsData.contacts || []);
      
      return { success: true, data: result };
    } catch (error) {
      console.error('Failed to add contact:', error);
      return { 
        success: false, 
        error: error.message || 'Failed to add contact' 
      };
    }
  };

  const searchUsers = async (query) => {
    try {
      console.log('Searching users with query:', query);
      
      const result = await usersAPI.search(query);
      console.log('Search results:', result.users?.length || 0);
      
      setSearchResults(result.users || []);
      return { success: true, data: result };
    } catch (error) {
      console.error('Failed to search users:', error);
      return { 
        success: false, 
        error: error.message || 'Failed to search users' 
      };
    }
  };

  // Call functions
  const initiateCall = async (callData) => {
    try {
      console.log('Initiating call:', callData);
      
      const result = await callsAPI.initiate(callData);
      console.log('Call initiated result:', result);
      
      // Refresh calls list
      const callsData = await callsAPI.getHistory();
      setCalls(callsData.calls || []);
      
      return { success: true, data: result };
    } catch (error) {
      console.error('Failed to initiate call:', error);
      return { 
        success: false, 
        error: error.message || 'Failed to initiate call' 
      };
    }
  };

  const answerCall = async (callData) => {
    try {
      console.log('Answering call:', callData);
      
      const result = await callsAPI.answer(callData);
      console.log('Call answered result:', result);
      
      return { success: true, data: result };
    } catch (error) {
      console.error('Failed to answer call:', error);
      return { 
        success: false, 
        error: error.message || 'Failed to answer call' 
      };
    }
  };

  const endCall = async (callData) => {
    try {
      console.log('Ending call:', callData);
      
      const result = await callsAPI.end(callData);
      console.log('Call ended result:', result);
      
      // Refresh calls list
      const callsData = await callsAPI.getHistory();
      setCalls(callsData.calls || []);
      
      return { success: true, data: result };
    } catch (error) {
      console.error('Failed to end call:', error);
      return { 
        success: false, 
        error: error.message || 'Failed to end call' 
      };
    }
  };

  const value = {
    // State
    currentScreen,
    isAuthenticated,
    user,
    loading,
    backendConnected,
    chats,
    contacts,
    calls,
    activeChat,
    activeCall,
    searchResults,
    
    // Screen navigation
    setCurrentScreen,
    setActiveChat,
    setActiveCall,
    
    // Auth functions
    login,
    register,
    logout,
    
    // Chat functions
    startNewChat,
    sendMessage,
    getChatMessages,
    
    // Contact functions
    addNewContact,
    searchUsers,
    
    // Call functions
    initiateCall,
    answerCall,
    endCall,
    
    // Refresh data
    refreshData: loadInitialData,
    
    // Test function (for development)
    testBackendConnection: async () => {
      try {
        const health = await healthCheck();
        return { success: true, data: health };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
