import io from 'socket.io-client';

let socket = null;

export const initSocket = (token) => {
  if (socket) return socket;
  
  socket = io('http://localhost:5000', {
    auth: {
      token: token
    },
    transports: ['websocket', 'polling']
  });
  
  // Connection events
  socket.on('connect', () => {
    console.log('Socket connected:', socket.id);
  });
  
  socket.on('disconnect', () => {
    console.log('Socket disconnected');
  });
  
  socket.on('connect_error', (error) => {
    console.error('Socket connection error:', error);
  });
  
  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};