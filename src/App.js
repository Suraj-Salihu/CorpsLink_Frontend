import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Contexts
import { AuthProvider } from './contexts/AuthContext';
import { SocketProvider } from './contexts/SocketContext';

// API
import { testBackendConnection } from './testConnection';

// MUI Theme
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Chats from './pages/Chats';
import Calls from './pages/Calls';
import Contacts from './pages/Contacts';
import Profile from './pages/Profile';

// Components
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';

// Log environment for debugging
console.log('App Environment:', {
  apiUrl: process.env.REACT_APP_API_URL,
  nodeEnv: process.env.NODE_ENV,
  appName: process.env.REACT_APP_NAME,
  env: process.env.REACT_APP_ENV,
});

// Theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#0B6623', // NYSC Green
    },
    secondary: {
      main: '#FFD700', // Gold accent
    },
  },
});

function App() {

  // 🔌 Test backend connection once on app mount
  useEffect(() => {
    testBackendConnection();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AuthProvider>
          <SocketProvider>
            <Routes>

              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Routes */}
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Layout />
                  </PrivateRoute>
                }
              >
                <Route index element={<Navigate to="/chats" />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="chats" element={<Chats />} />
                <Route path="calls" element={<Calls />} />
                <Route path="contacts" element={<Contacts />} />
                <Route path="profile" element={<Profile />} />
              </Route>

              {/* Catch-all */}
              <Route path="*" element={<Navigate to="/login" />} />

            </Routes>
          </SocketProvider>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
