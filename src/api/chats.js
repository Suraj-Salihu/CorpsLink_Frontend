import api from './axiosConfig';

export const chatsAPI = {
  // Get all chats
  getAll: async () => {
    const response = await api.get('/chats');
    return response;
  },
  
  // Start new chat
  start: async (participantId) => {
    const response = await api.post('/chats/start', { participantId });
    return response;
  },
  
  // Get chat messages
  getMessages: async (chatId, page = 1, limit = 50) => {
    const response = await api.get(`/chats/${chatId}/messages?page=${page}&limit=${limit}`);
    return response;
  },
  
  // Send message
  sendMessage: async (chatId, messageData) => {
    const response = await api.post(`/chats/${chatId}/messages`, messageData);
    return response;
  }
};
