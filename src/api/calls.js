import api from './axiosConfig';

export const callsAPI = {
  // Initiate call
  initiate: async (callData) => {
    const response = await api.post('/calls/initiate', callData);
    return response;
  },
  
  // Answer call
  answer: async (callData) => {
    const response = await api.post('/calls/answer', callData);
    return response;
  },
  
  // End call
  end: async (callData) => {
    const response = await api.post('/calls/end', callData);
    return response;
  },
  
  // Get call history
  getHistory: async () => {
    const response = await api.get('/calls/history');
    return response;
  }
};
