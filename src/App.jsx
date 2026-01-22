import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import SplashScreen from './components/screens/SplashScreen';
import RegistrationScreen from './components/screens/RegistrationScreen';
import LoginScreen from './components/screens/LoginScreen';
import ChatListScreen from './components/screens/ChatListScreen';
import CallsScreen from './components/screens/CallsScreen';
import NewChatScreen from './components/screens/NewChatScreen';
import NewCallScreen from './components/screens/NewCallScreen';
import ChatScreen from './components/screens/ChatScreen';
import MediaScreen from './components/screens/MediaScreen';
import ProfileScreen from './components/screens/ProfileScreen';
import SettingsScreen from './components/screens/SettingsScreen';
import ReportScreen from './components/screens/ReportScreen';
import ConnectionTest from './components/ConnectionTest';
import DebugInfo from './components/DebugInfo';

function AppContent() {
  const { currentScreen, isAuthenticated, loading } = useApp();

  // For testing - show connection test first
  if (window.location.search.includes('test=1')) {
    return (
      <div className="min-h-screen p-4">
        <ConnectionTest />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#586126] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading CorpsLink...</p>
        </div>
      </div>
    );
  }

  const renderScreen = () => {
    switch(currentScreen) {
      case 'splash':
        return <SplashScreen />;
      case 'register':
        return <RegistrationScreen />;
      case 'login':
        return <LoginScreen />;
      case 'chats':
        return <ChatListScreen />;
      case 'calls':
        return <CallsScreen />;
      case 'new-chat':
        return <NewChatScreen />;
      case 'new-call':
        return <NewCallScreen />;
      case 'chat':
        return <ChatScreen />;
      case 'media':
        return <MediaScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'settings':
        return <SettingsScreen />;
      case 'report':
        return <ReportScreen />;
      default:
        return <SplashScreen />;
    }
  };

  const protectedScreens = [
    'chats', 'calls', 'new-chat', 'new-call', 'chat',
    'media', 'profile', 'settings', 'report'
  ];

  const shouldShowScreen = !protectedScreens.includes(currentScreen) || isAuthenticated;

  return (
    <>
      <div className="h-screen max-w-lg mx-auto relative overflow-hidden bg-white shadow-lg">
        {shouldShowScreen ? renderScreen() : <LoginScreen />}
      </div>
      {process.env.NODE_ENV === 'development' && !window.location.search.includes('test=1') && <DebugInfo />}
    </>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
