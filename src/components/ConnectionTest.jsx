import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import { authAPI } from '../api/auth';

const ConnectionTest = () => {
  const [status, setStatus] = useState('Testing...');
  const [details, setDetails] = useState('');

  useEffect(() => {
    const test = async () => {
      try {
        setStatus('Testing backend connection...');
        
        // Test 1: Health endpoint
        const healthRes = await fetch('http://localhost:5000/api/health');
        const healthData = await healthRes.json();
        
        setDetails(prev => prev + `✅ Health: ${healthData.status}\n`);
        
        // Test 2: Axios config
        setDetails(prev => prev + `��� BaseURL: ${api.defaults.baseURL}\n`);
        
        // Test 3: Try login with test user
        try {
          const loginData = {
            email: 'test@example.com',
            password: 'password123'
          };
          const loginRes = await authAPI.login(loginData).catch(() => null);
          
          if (loginRes?.token) {
            setDetails(prev => prev + `✅ Login successful\n`);
          } else {
            // Try register
            const registerData = {
              name: 'Test User',
              email: 'test@example.com',
              password: 'password123',
              stateCode: 'MH-12'
            };
            const registerRes = await authAPI.register(registerData).catch(() => null);
            
            if (registerRes?.token) {
              setDetails(prev => prev + `✅ Registration successful\n`);
            } else {
              setDetails(prev => prev + `⚠️ Auth endpoints working but no test user\n`);
            }
          }
        } catch (authError) {
          setDetails(prev => prev + `❌ Auth error: ${authError.message}\n`);
        }
        
        setStatus('✅ Connection Test Complete');
        
      } catch (error) {
        setStatus('❌ Connection Failed');
        setDetails(`Error: ${error.message}\n\nMake sure:\n1. Backend is running on port 5000\n2. CORS is enabled in backend\n3. Check browser console for details`);
      }
    };

    test();
  }, []);

  return (
    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
      <h2 className="text-lg font-bold mb-2">Backend Connection Test</h2>
      <div className="p-3 bg-white rounded border">
        <div className="font-medium text-gray-700 mb-2">{status}</div>
        <pre className="text-sm whitespace-pre-wrap">{details}</pre>
      </div>
      <div className="mt-3 text-sm text-gray-600">
        <p>Expected endpoints:</p>
        <ul className="list-disc pl-5 mt-1">
          <li>POST /api/auth/register</li>
          <li>POST /api/auth/login</li>
          <li>GET /api/auth/profile</li>
          <li>GET /api/users/search</li>
          <li>POST /api/chats/start</li>
        </ul>
      </div>
    </div>
  );
};

export default ConnectionTest;
