import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBar from '../components/StatusBar';

interface PrivacySetting {
  id: string;
  title: string;
  description: string;
  options: string[];
  currentValue: string;
}

const privacySettings: PrivacySetting[] = [
  {
    id: 'last_seen',
    title: 'Last Seen',
    description: 'Who can see when you were last online',
    options: ['Everyone', 'My Contacts', 'Nobody'],
    currentValue: 'My Contacts',
  },
  {
    id: 'profile_photo',
    title: 'Profile Photo',
    description: 'Who can see your profile photo',
    options: ['Everyone', 'My Contacts', 'Nobody'],
    currentValue: 'Everyone',
  },
  {
    id: 'about',
    title: 'About',
    description: 'Who can see your about info',
    options: ['Everyone', 'My Contacts', 'Nobody'],
    currentValue: 'My Contacts',
  },
  {
    id: 'status',
    title: 'Status',
    description: 'Who can see your status updates',
    options: ['Everyone', 'My Contacts', 'My Contacts Except...', 'Only Share With...'],
    currentValue: 'My Contacts',
  },
  {
    id: 'read_receipts',
    title: 'Read Receipts',
    description: 'If turned off, you won\'t send or receive read receipts',
    options: ['On', 'Off'],
    currentValue: 'On',
  },
  {
    id: 'groups',
    title: 'Groups',
    description: 'Who can add you to groups',
    options: ['Everyone', 'My Contacts', 'My Contacts Except...'],
    currentValue: 'My Contacts',
  },
];

export default function PrivacySettings() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState(privacySettings);
  const [selectedSetting, setSelectedSetting] = useState<string | null>(null);

  const updateSetting = (settingId: string, newValue: string) => {
    setSettings(prev =>
      prev.map(setting =>
        setting.id === settingId
          ? { ...setting, currentValue: newValue }
          : setting
      )
    );
    setSelectedSetting(null);
  };

  const PrivacyOption: React.FC<{ 
    setting: PrivacySetting; 
    isExpanded: boolean; 
    onToggle: () => void;
  }> = ({ setting, isExpanded, onToggle }) => (
    <div className="bg-white">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-4 hover:bg-gray-50 transition-colors"
      >
        <div className="text-left flex-1">
          <h3 className="text-[17px] font-medium text-black mb-1">
            {setting.title}
          </h3>
          <p className="text-[14px] text-[#667781]">
            {setting.description}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[16px] text-[#667781]">
            {setting.currentValue}
          </span>
          <svg 
            width="8" 
            height="14" 
            viewBox="0 0 8 14" 
            className={`transform transition-transform ${isExpanded ? 'rotate-90' : ''}`}
          >
            <path
              d="M1 13L7 7L1 1"
              stroke="#667781"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>

      {isExpanded && (
        <div className="border-t border-gray-100">
          {setting.options.map((option, index) => (
            <button
              key={index}
              onClick={() => updateSetting(setting.id, option)}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
            >
              <span className="text-[16px] text-black">{option}</span>
              {setting.currentValue === option && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M20 6L9 17L4 12"
                    stroke="#1DAB61"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full max-w-[393px] h-screen flex flex-col bg-[#F4F4F4] relative overflow-hidden">
      <StatusBar />

      {/* Header */}
      <div className="flex items-center gap-4 px-4 py-3 bg-[#1DAB61]">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18L9 12L15 6"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h1 className="text-[20px] font-semibold text-white">Privacy</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Privacy Notice */}
        <div className="bg-[#E3F2FD] px-4 py-4 mx-4 mt-4 rounded-lg">
          <div className="flex items-start gap-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 mt-1">
              <path
                d="M12 22S8 18 8 13V6L12 4L16 6V13C16 18 12 22 12 22Z"
                stroke="#1976D2"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div>
              <h3 className="text-[16px] font-medium text-[#1976D2] mb-1">
                Your Privacy Matters
              </h3>
              <p className="text-[14px] text-[#1976D2] leading-relaxed">
                WhatsApp protects your privacy with end-to-end encryption. Control who can see your information and activity.
              </p>
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="mt-6 space-y-4">
          <div className="px-4 py-2">
            <span className="text-[14px] font-medium text-[#667781] uppercase tracking-wide">
              Who can see my personal info
            </span>
          </div>

          {settings.slice(0, 3).map(setting => (
            <PrivacyOption
              key={setting.id}
              setting={setting}
              isExpanded={selectedSetting === setting.id}
              onToggle={() => setSelectedSetting(
                selectedSetting === setting.id ? null : setting.id
              )}
            />
          ))}

          <div className="px-4 py-2 mt-8">
            <span className="text-[14px] font-medium text-[#667781] uppercase tracking-wide">
              Status & Activity
            </span>
          </div>

          {settings.slice(3).map(setting => (
            <PrivacyOption
              key={setting.id}
              setting={setting}
              isExpanded={selectedSetting === setting.id}
              onToggle={() => setSelectedSetting(
                selectedSetting === setting.id ? null : setting.id
              )}
            />
          ))}

          {/* Additional Options */}
          <div className="mt-8 space-y-0">
            <div className="px-4 py-2">
              <span className="text-[14px] font-medium text-[#667781] uppercase tracking-wide">
                Advanced
              </span>
            </div>

            <div className="bg-white">
              <button 
                onClick={() => navigate('/blocked-contacts')}
                className="w-full flex items-center justify-between px-4 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#F44336] rounded-full flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2"/>
                      <path d="M4.93 4.93L19.07 19.07" stroke="white" strokeWidth="2"/>
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="text-[17px] font-medium text-black">Blocked Contacts</h3>
                    <p className="text-[14px] text-[#667781]">3 contacts blocked</p>
                  </div>
                </div>
                <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
                  <path
                    d="M1 13L7 7L1 1"
                    stroke="#667781"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <button 
                onClick={() => navigate('/disappearing-messages')}
                className="w-full flex items-center justify-between px-4 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#FF9800] rounded-full flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2"/>
                      <polyline points="12,6 12,12 16,14" stroke="white" strokeWidth="2"/>
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="text-[17px] font-medium text-black">Disappearing Messages</h3>
                    <p className="text-[14px] text-[#667781]">Default timer for new chats</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[16px] text-[#667781]">Off</span>
                  <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
                    <path
                      d="M1 13L7 7L1 1"
                      stroke="#667781"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </button>

              <button 
                onClick={() => navigate('/live-location')}
                className="w-full flex items-center justify-between px-4 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#2196F3] rounded-full flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M21 10C21 17 12 23 12 23S3 17 3 10C3 5.02944 7.02944 1 12 1C16.9706 1 21 5.02944 21 10Z" stroke="white" strokeWidth="2"/>
                      <circle cx="12" cy="10" r="3" stroke="white" strokeWidth="2"/>
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="text-[17px] font-medium text-black">Live Location</h3>
                    <p className="text-[14px] text-[#667781]">Stop sharing with 2 chats</p>
                  </div>
                </div>
                <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
                  <path
                    d="M1 13L7 7L1 1"
                    stroke="#667781"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Privacy Info */}
          <div className="px-4 py-6">
            <p className="text-[14px] text-[#667781] leading-relaxed text-center">
              Your messages are secured with end-to-end encryption. 
              <span className="text-[#1DAB61] underline"> Learn more</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
