import React from 'react';
import { useApp } from '../context/AppContext';

const DebugInfo = () => {
  const { 
    isAuthenticated, 
    user, 
    backendConnected, 
    loading,
    chats,
    contacts,
    calls
  } = useApp();

  return (
    <div className="fixed bottom-4 right-4 bg-black bg-opacity-80 text-white p-4 rounded-lg text-xs max-w-xs z-50">
      <h3 className="font-bold mb-2">Debug Info</h3>
      <div className="space-y-1">
        <div>Auth: {isAuthenticated ? 'âœ…' : 'âŒ'}</div>
        <div>Backend: {backendConnected ? 'âœ…' : 'âŒ'}</div>
        <div>Loading: {loading ? 'í´„' : 'âœ…'}</div>
        {user && <div>User: {user.name || user.email}</div>}
        <div>Chats: {chats.length}</div>
        <div>Contacts: {contacts.length}</div>
        <div>Calls: {calls.length}</div>
      </div>
    </div>
  );
};

export default DebugInfo;
