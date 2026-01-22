import api from './axiosConfig';
import { authAPI } from './auth';
import { usersAPI } from './users';
import { chatsAPI } from './chats';
import { callsAPI } from './calls';

// Export all APIs
export { authAPI, usersAPI, chatsAPI, callsAPI };

// Health check
export const healthCheck = () => api.get('/health');

// Default export for convenience
export default {
  auth: authAPI,
  users: usersAPI,
  chats: chatsAPI,
  calls: callsAPI,
  health: healthCheck
};