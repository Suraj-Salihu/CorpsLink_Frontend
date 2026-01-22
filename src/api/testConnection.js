import { authAPI, usersAPI, chatsAPI, callsAPI, healthCheck } from './api/index';
import api from './api/axiosConfig';

export const testAllEndpoints = async () => {
  const results = [];
  
  try {
    console.log('��� Testing backend connection...');
    console.log('Base URL:', api.defaults.baseURL);
    
    // Test 1: Health endpoint
    try {
      const health = await healthCheck();
      results.push({ endpoint: 'GET /health', status: '✅', data: health });
    } catch (error) {
      results.push({ endpoint: 'GET /health', status: '❌', error: error.message });
    }
    
    // Test 2: Try to register a test user
    const testUser = {
      name: 'Test User',
      email: `test${Date.now()}@example.com`,
      password: 'password123',
      stateCode: 'MH-12'
    };
    
    try {
      const registerResult = await authAPI.register(testUser);
      results.push({ 
        endpoint: 'POST /auth/register', 
        status: '✅', 
        data: { token: !!registerResult.token, user: registerResult.user?.name }
      });
      
      // If registration successful, test other endpoints
      if (registerResult.token) {
        localStorage.setItem('token', registerResult.token);
        
        // Test 3: Get profile
        try {
          const profile = await authAPI.getProfile();
          results.push({ endpoint: 'GET /auth/profile', status: '✅', data: { name: profile.name } });
        } catch (error) {
          results.push({ endpoint: 'GET /auth/profile', status: '❌', error: error.message });
        }
        
        // Test 4: Search users
        try {
          const search = await usersAPI.search('test');
          results.push({ endpoint: 'GET /users/search', status: '✅', data: { count: search?.length || 0 } });
        } catch (error) {
          results.push({ endpoint: 'GET /users/search', status: '❌', error: error.message });
        }
        
        // Test 5: Get chats
        try {
          const chats = await chatsAPI.getAll();
          results.push({ endpoint: 'GET /chats', status: '✅', data: { count: chats?.length || 0 } });
        } catch (error) {
          results.push({ endpoint: 'GET /chats', status: '❌', error: error.message });
        }
        
        // Clean up token
        localStorage.removeItem('token');
      }
      
    } catch (error) {
      results.push({ endpoint: 'POST /auth/register', status: '❌', error: error.message });
    }
    
    // Display results
    console.log('\n��� TEST RESULTS:');
    console.log('='.repeat(50));
    results.forEach(result => {
      console.log(`${result.status} ${result.endpoint}`);
      if (result.data) console.log('   Data:', result.data);
      if (result.error) console.log('   Error:', result.error);
    });
    console.log('='.repeat(50));
    
    return results;
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    return [];
  }
};

// Quick connection test
export const quickTest = async () => {
  try {
    console.log('��� Quick connection test...');
    const response = await fetch('http://localhost:5000/api/health');
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Backend is running:', data);
      return true;
    }
    console.log('❌ Backend not reachable');
    return false;
  } catch (error) {
    console.error('❌ Connection error:', error.message);
    return false;
  }
};
