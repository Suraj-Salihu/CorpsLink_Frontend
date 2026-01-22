// src/components/EnvTest.jsx
import React from 'react';

const EnvTest = () => {
  return (
    <div style={{ padding: '20px', background: '#f0f0f0' }}>
      <h3>Environment Variables Test</h3>
      <p><strong>API URL:</strong> {process.env.REACT_APP_API_URL || 'Not set'}</p>
      <p><strong>Socket URL:</strong> {process.env.REACT_APP_SOCKET_URL || 'Not set'}</p>
      <p><strong>App Name:</strong> {process.env.REACT_APP_NAME || 'Not set'}</p>
      <p><strong>App Version:</strong> {process.env.REACT_APP_VERSION || 'Not set'}</p>
      <p><strong>Node Env:</strong> {process.env.NODE_ENV}</p>
    </div>
  );
};

export default EnvTest;