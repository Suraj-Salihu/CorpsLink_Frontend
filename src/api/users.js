import api from './axiosConfig';

export const usersAPI = {
  // Search users
  search: async (query) => {
    const response = await api.get(`/users/search?query=${encodeURIComponent(query)}`);
    return response;
  },
  
  // Get user by state code
  getByStateCode: async (stateCode) => {
    const response = await api.get(`/users/state-code/${encodeURIComponent(stateCode)}`);
    return response;
  },
  
  // Get contacts
  getContacts: async () => {
    const response = await api.get('/users/contacts');
    return response;
  },
  
  // Add contact
  addContact: async (contactId) => {
    const response = await api.post('/users/contacts', { contactId });
    return response;
  },
  
  // Remove contact
  removeContact: async (contactId) => {
    const response = await api.delete(`/users/contacts/${contactId}`);
    return response;
  }
};
