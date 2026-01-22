import api from './axiosConfig';

export const testBackendConnection = async () => {
  try {
    console.log('Testing connection to:', api.defaults.baseURL);
    
    // Test 1: Direct fetch to health endpoint
    const healthResponse = await fetch('http://localhost:5000/api/health');
    console.log('Health endpoint status:', healthResponse.status);
    
    // Test 2: Test with axios
    const axiosTest = await api.get('/health');
    console.log('Axios health check:', axiosTest);
    
    return true;
  } catch (error) {
    console.error('Connection test failed:', error.message);
    console.log('Current baseURL:', api.defaults.baseURL);
    return false;
  }
};