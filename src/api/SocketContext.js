import React, { createContext, useContext, useEffect, useState } from 'react';
import { initSocket, getSocket, disconnectSocket } from '../api/socket';
import { useAuth } from './AuthContext';

const SocketContext = createContext({});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const { user } = useAuth();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (user && !socket) {
      const token = localStorage.getItem('token');
      const newSocket = initSocket(token);
      setSocket(newSocket);
    }

    return () => {
      if (socket) {
        disconnectSocket();
        setSocket(null);
      }
    };
  }, [user]);

  const value = {
    socket,
    isConnected: socket?.connected || false
  };

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};