import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

// Simple inline SVG icons (small, self-contained replacements for lucide icons)
const ChevronLeft = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ChevronRight = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const User = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 7a4 4 0 100-8 4 4 0 000 8z" transform="translate(0 7)" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
);
const Lock = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
);
const Bell = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 17H9a3 3 0 01-3-3V11a6 6 0 1112 0v3a3 3 0 01-3 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M13.73 21a2 2 0 01-3.46 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
);
const Database = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="12" cy="5" rx="9" ry="3" stroke="currentColor" strokeWidth="2"/><path d="M3 5v6c0 1.657 4.03 3 9 3s9-1.343 9-3V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 12v6c0 1.657 4.03 3 9 3s9-1.343 9-3v-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
);
const Info = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M12 16v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
);
const LogOut = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 17l5-5-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

// Basic Button component used to match the Figma styling
const Button = ({ children, onClick, variant = 'default', className = '' }) => {
  const base = 'inline-flex items-center justify-center font-semibold py-3 px-4 rounded-lg';
  const variants = {
    default: 'bg-[#E5E5E5] text-[#2E2E2E] hover:bg-[#E5E5E5]/90',
    destructive: 'bg-[#F44336] text-white hover:bg-[#F44336]/90',
  };
  return (
    <button type="button" onClick={onClick} className={`${base} ${variants[variant] || variants.default} ${className}`}>
      {children}
    </button>
  );
};

// Simple AlertDialog/Modal implementation (no extra dependencies)
const Modal = ({ isOpen, onClose, onConfirm, title, description }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
      <div className="relative z-10 w-full max-w-md bg-white rounded-lg p-6 shadow-lg">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-[#6B6B6B] mb-4">{description}</p>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded bg-[#F3F4F6]">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 rounded bg-[#F44336] text-white">Logout</button>
        </div>
      </div>
    </div>
  );
};

const SettingsItem = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="w-full px-6 py-4 flex items-center justify-between hover:bg-[#F7F6F2] transition-colors"
  >
    <div className="flex items-center gap-3">
      <div className="text-[#586126]">{icon}</div>
      <span className="text-sm text-[#2E2E2E]">{label}</span>
    </div>
    <ChevronRight className="w-5 h-5 text-[#6B6B6B]" />
  </button>
);

const SettingsScreen = () => {
  const { logout, setCurrentScreen } = useApp();
  const [logoutOpen, setLogoutOpen] = useState(false);

  return (
    <div className="h-screen w-full bg-[#F7F6F2] flex flex-col">
      {/* Header */}
      <div className="bg-[#586126] text-white px-4 py-3 shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentScreen('chats')}
            className="hover:opacity-80 transition-opacity"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">Settings</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Account Section */}
        <div className="bg-white mt-2 border-b border-[#E5E5E5]">
          <h3 className="px-6 py-3 text-sm font-medium text-[#6B6B6B] bg-[#F7F6F2]">Account</h3>
          <SettingsItem icon={<User className="w-5 h-5" />} label="Profile" onClick={() => setCurrentScreen('profile')} />
          <div className="border-t border-[#E5E5E5]">
            <SettingsItem icon={<Lock className="w-5 h-5" />} label="Change Password" />
          </div>
          <div className="border-t border-[#E5E5E5]">
            <SettingsItem icon={<Lock className="w-5 h-5" />} label="Privacy" />
          </div>
        </div>

        {/* Chats Section */}
        <div className="bg-white mt-2 border-b border-[#E5E5E5]">
          <h3 className="px-6 py-3 text-sm font-medium text-[#6B6B6B] bg-[#F7F6F2]">Chats</h3>
          <SettingsItem icon={<span className="text-lg">🎨</span>} label="Theme" />
          <div className="border-t border-[#E5E5E5]">
            <SettingsItem icon={<span className="text-lg">🖼️</span>} label="Wallpaper" />
          </div>
          <div className="border-t border-[#E5E5E5]">
            <SettingsItem icon={<Database className="w-5 h-5" />} label="Chat Backup" />
          </div>
        </div>

        {/* Notifications Section */}
        <div className="bg-white mt-2 border-b border-[#E5E5E5]">
          <h3 className="px-6 py-3 text-sm font-medium text-[#6B6B6B] bg-[#F7F6F2]">Notifications</h3>
          <SettingsItem icon={<Bell className="w-5 h-5" />} label="Message Tones" />
          <div className="border-t border-[#E5E5E5]">
            <SettingsItem icon={<span className="text-lg">📳</span>} label="Vibration" />
          </div>
        </div>

        {/* Storage & Data Section */}
        <div className="bg-white mt-2 border-b border-[#E5E5E5]">
          <h3 className="px-6 py-3 text-sm font-medium text-[#6B6B6B] bg-[#F7F6F2]">Storage & Data</h3>
          <SettingsItem icon={<Database className="w-5 h-5" />} label="Network Usage" />
          <div className="border-t border-[#E5E5E5]">
            <SettingsItem icon={<span className="text-lg">⬇️</span>} label="Auto-download" />
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white mt-2 border-b border-[#E5E5E5]">
          <h3 className="px-6 py-3 text-sm font-medium text-[#6B6B6B] bg-[#F7F6F2]">About</h3>
          <div className="px-6 py-4">
            <p className="text-xs text-[#6B6B6B] mb-1">App Version</p>
            <p className="text-sm text-[#2E2E2E] font-medium mb-4">1.0.0</p>
            <p className="text-xs text-[#6B6B6B] leading-relaxed">CorpsLink is not an official NYSC application. It is a community platform designed to help corps members connect and communicate using their NYSC State Codes.</p>
          </div>
          <div className="border-t border-[#E5E5E5]">
            <SettingsItem icon={<Info className="w-5 h-5" />} label="Terms & Privacy" />
          </div>
        </div>

        {/* Logout Button */}
        <div className="px-6 py-6">
          <Button variant="destructive" className="w-full flex items-center justify-center" onClick={() => setLogoutOpen(true)}>
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <Modal
        isOpen={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        onConfirm={() => { setLogoutOpen(false); logout(); }}
        title="Logout"
        description="Are you sure you want to logout? You'll need to sign in again to access your chats."
      />
    </div>
  );
};

export default SettingsScreen;