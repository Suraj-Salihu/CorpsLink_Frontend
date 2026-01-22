import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// Log startup info
console.log('CorpsLink Frontend Starting...');
console.log('Environment:', process.env.REACT_APP_ENV || 'development');
console.log(
  'API URL:',
  process.env.REACT_APP_API_URL || 'http://localhost:5000/api'
);

// Create root ONCE
const root = ReactDOM.createRoot(document.getElementById('root'));

// Check URL parameters for test mode
const urlParams = new URLSearchParams(window.location.search);
const isTestMode = urlParams.has('test');

if (isTestMode) {
  // Load test mode
  import('./components/ConnectionTest.jsx').then(({ default: TestConnection }) => {
    root.render(
      <React.StrictMode>
        <TestConnection />
      </React.StrictMode>
    );
  });
} else {
  // Load normal app
  import('./App.jsx').then(({ default: App }) => {
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  });
}
