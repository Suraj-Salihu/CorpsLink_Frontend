import React from 'react';
import { useApp } from './context/AppContext';
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

function AppRouter() {
  const { currentScreen, isAuthenticated } = useApp();

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
    <div className="h-screen max-w-lg mx-auto relative overflow-hidden bg-white shadow-lg">
      {shouldShowScreen ? renderScreen() : <SplashScreen />}
    </div>
  );
}

export default AppRouter;