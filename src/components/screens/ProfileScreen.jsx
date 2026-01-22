import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

// Small SVG icon set used to avoid new dependencies
const ChevronLeft = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const Camera = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V7a2 2 0 012-2h3l2-3h6l2 3h3a2 2 0 012 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="13" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const Edit2 = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 20h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4 12.5-12.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
);
const Save = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M17 21v-8H7v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
);
const X = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

// Small UI building blocks
const Avatar = ({ size = 32, src, children, className = '' }) => (
  <div className={`w-${size} h-${size} rounded-full overflow-hidden ${className}`}>{src ? <img src={src} alt="avatar" className="w-full h-full object-cover" /> : children}</div>
);
const AvatarFallback = ({ className = '', children }) => (
  <div className={`w-full h-full flex items-center justify-center ${className}`}>{children}</div>
);
const Button = ({ children, onClick, variant = 'default', className = '' }) => {
  const base = 'inline-flex items-center justify-center font-semibold py-3 px-4 rounded-lg';
  const variants = {
    default: 'bg-[#E5E5E5] text-[#2E2E2E] hover:bg-[#E5E5E5]/90',
    destructive: 'bg-[#F44336] text-white hover:bg-[#F44336]/90',
    outline: 'bg-white border border-[#C2B280] text-[#2E2E2E] hover:bg-[#F7F6F2]',
  };
  return (
    <button type="button" onClick={onClick} className={`${base} ${variants[variant] || variants.default} ${className}`}>
      {children}
    </button>
  );
};
const Input = ({ value, onChange, id, className = '' }) => (
  <input id={id} value={value} onChange={onChange} className={`w-full border rounded py-2 px-3 ${className}`} />
);
const Label = ({ children, htmlFor }) => <label htmlFor={htmlFor} className="text-sm font-medium text-[#2E2E2E]">{children}</label>;
const Badge = ({ children, className = '' }) => <span className={`inline-flex items-center gap-2 text-sm font-medium ${className}`}>{children}</span>;

const getInitials = (nameStr) => {
  return nameStr
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const getBatchColor = (batch) => {
  switch (batch) {
    case 'A':
      return 'bg-[#586126] text-white';
    case 'B':
      return 'bg-[#C2B280] text-[#2E2E2E]';
    case 'C':
      return 'bg-[#8B7D3A] text-white';
    default:
      return 'bg-[#C2B280] text-[#2E2E2E]';
  }
};

const ProfileScreen = () => {
  const ctx = useApp();
  const currentUser = ctx.currentUser || ctx.user || null;
  const setCurrentScreen = ctx.setCurrentScreen || (() => {});
  const updateUserProfile = ctx.updateUserProfile || (() => {});

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser?.name || currentUser?.displayName || '');

  if (!currentUser) return null;

  const handleSave = () => {
    updateUserProfile({ name });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setName(currentUser.name || currentUser.displayName || '');
    setIsEditing(false);
  };

  return (
    <div className="h-screen w-full bg-[#F7F6F2] flex flex-col">
      {/* Header */}
      <div className="bg-[#586126] text-white px-4 py-3 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setCurrentScreen('chat-list')} className="hover:opacity-80 transition-opacity">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold">Profile</h1>
          </div>
          {!isEditing && (
            <button onClick={() => setIsEditing(true)} className="hover:opacity-80 transition-opacity">
              <Edit2 className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Profile Section */}
        <div className="bg-white px-6 py-8 flex flex-col items-center border-b border-[#E5E5E5]">
          <div className="relative mb-4">
            <div className="w-32 h-32 rounded-full overflow-hidden">
              {currentUser.avatar ? (
                <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
              ) : (
                <AvatarFallback className={`bg-[#586126] text-white text-3xl`}>{getInitials(currentUser.name)}</AvatarFallback>
              )}
            </div>
            {isEditing && (
              <button className="absolute bottom-0 right-0 w-10 h-10 bg-[#586126] text-white rounded-full flex items-center justify-center shadow-md">
                <Camera className="w-5 h-5" />
              </button>
            )}
          </div>

          {isEditing ? (
            <div className="w-full max-w-sm space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Display Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="border-[#C2B280] focus:border-[#586126] focus:ring-[#586126]" />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSave} className="flex-1 bg-[#586126] hover:bg-[#586126]/90 text-white">
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button onClick={handleCancel} variant="outline" className="flex-1 border-[#C2B280]">
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold text-[#2E2E2E] mb-1">{currentUser.name || currentUser.displayName}</h2>
              <p className="text-[#6B6B6B] mb-3">{currentUser.stateCode || currentUser.userId}</p>
              <Badge className={`${getBatchColor(currentUser.batch)} px-3 py-1`}>Batch {currentUser.batch}</Badge>
            </>
          )}
        </div>

        {/* Account Info Section */}
        <div className="bg-white mt-2 border-b border-[#E5E5E5]">
          <h3 className="px-6 py-3 text-sm font-medium text-[#6B6B6B] bg-[#F7F6F2]">Account Information</h3>
          <div className="px-6 py-4 space-y-4">
            <div>
              <p className="text-xs text-[#6B6B6B] mb-1">NYSC State Code</p>
              <p className="text-sm text-[#2E2E2E] font-medium">{currentUser.stateCode || currentUser.userId}</p>
            </div>
            <div>
              <p className="text-xs text-[#6B6B6B] mb-1">Batch</p>
              <p className="text-sm text-[#2E2E2E] font-medium">Batch {currentUser.batch}</p>
            </div>
            <div>
              <p className="text-xs text-[#6B6B6B] mb-1">Status</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#00A884] rounded-full" />
                <p className="text-sm text-[#2E2E2E] font-medium">Online</p>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Section */}
        <div className="bg-white mt-2 border-b border-[#E5E5E5]">
          <h3 className="px-6 py-3 text-sm font-medium text-[#6B6B6B] bg-[#F7F6F2]">Privacy & Security</h3>
          <button className="w-full px-6 py-4 flex items-center justify-between hover:bg-[#F7F6F2] transition-colors">
            <span className="text-sm text-[#2E2E2E]">Change Password</span>
            <svg className="w-5 h-5 text-[#6B6B6B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <button className="w-full px-6 py-4 flex items-center justify-between hover:bg-[#F7F6F2] transition-colors border-t border-[#E5E5E5]">
            <span className="text-sm text-[#2E2E2E]">Privacy Settings</span>
            <svg className="w-5 h-5 text-[#6B6B6B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;