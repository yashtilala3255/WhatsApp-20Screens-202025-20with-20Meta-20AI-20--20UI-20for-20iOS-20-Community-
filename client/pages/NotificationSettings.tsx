import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StatusBar from "../components/StatusBar";

interface NotificationSetting {
  id: string;
  title: string;
  description?: string;
  type: "toggle" | "option" | "time";
  enabled?: boolean;
  options?: string[];
  currentValue?: string;
}

const notificationSettings: NotificationSetting[] = [
  {
    id: "conversation_tones",
    title: "Conversation Tones",
    description: "Play sounds for incoming and outgoing messages",
    type: "toggle",
    enabled: true,
  },
  {
    id: "message_notifications",
    title: "Show Notifications",
    type: "toggle",
    enabled: true,
  },
  {
    id: "notification_tone",
    title: "Notification Tone",
    type: "option",
    options: ["Default", "Note", "Bamboo", "Chime", "Chord", "Circles"],
    currentValue: "Default",
  },
  {
    id: "vibrate",
    title: "Vibrate",
    type: "option",
    options: ["Default", "Short", "Long", "Off"],
    currentValue: "Default",
  },
  {
    id: "popup_notification",
    title: "Popup Notification",
    type: "option",
    options: [
      "No Popup",
      "Only when screen on",
      "Only when screen off",
      "Always show popup",
    ],
    currentValue: "Only when screen on",
  },
  {
    id: "light",
    title: "Light",
    type: "option",
    options: [
      "White",
      "Red",
      "Yellow",
      "Green",
      "Cyan",
      "Blue",
      "Purple",
      "None",
    ],
    currentValue: "White",
  },
];

export default function NotificationSettings() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState(notificationSettings);
  const [selectedSetting, setSelectedSetting] = useState<string | null>(null);

  const toggleSetting = (settingId: string) => {
    setSettings((prev) =>
      prev.map((setting) =>
        setting.id === settingId
          ? { ...setting, enabled: !setting.enabled }
          : setting,
      ),
    );
  };

  const updateSetting = (settingId: string, newValue: string) => {
    setSettings((prev) =>
      prev.map((setting) =>
        setting.id === settingId
          ? { ...setting, currentValue: newValue }
          : setting,
      ),
    );
    setSelectedSetting(null);
  };

  const NotificationOption: React.FC<{
    setting: NotificationSetting;
    isExpanded: boolean;
    onToggle: () => void;
  }> = ({ setting, isExpanded, onToggle }) => {
    if (setting.type === "toggle") {
      return (
        <div className="bg-white border-b border-gray-100">
          <div className="flex items-center justify-between px-4 py-4">
            <div className="flex-1">
              <h3 className="text-[17px] font-medium text-black mb-1">
                {setting.title}
              </h3>
              {setting.description && (
                <p className="text-[14px] text-[#667781]">
                  {setting.description}
                </p>
              )}
            </div>
            <button
              onClick={() => toggleSetting(setting.id)}
              className={`relative w-12 h-7 rounded-full transition-colors ${
                setting.enabled ? "bg-[#1DAB61]" : "bg-gray-300"
              }`}
            >
              <div
                className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                  setting.enabled ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white border-b border-gray-100">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between px-4 py-4 hover:bg-gray-50 transition-colors"
        >
          <div className="text-left flex-1">
            <h3 className="text-[17px] font-medium text-black">
              {setting.title}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[16px] text-[#667781]">
              {setting.currentValue}
            </span>
            <svg
              width="8"
              height="14"
              viewBox="0 0 8 14"
              className={`transform transition-transform ${isExpanded ? "rotate-90" : ""}`}
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

        {isExpanded && setting.options && (
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
  };

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
        <h1 className="text-[20px] font-semibold text-white">Notifications</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Quick Actions */}
        <div className="mt-4 space-y-0">
          <div className="px-4 py-2">
            <span className="text-[14px] font-medium text-[#667781] uppercase tracking-wide">
              Message Notifications
            </span>
          </div>

          {settings.slice(0, 2).map((setting) => (
            <NotificationOption
              key={setting.id}
              setting={setting}
              isExpanded={selectedSetting === setting.id}
              onToggle={() =>
                setSelectedSetting(
                  selectedSetting === setting.id ? null : setting.id,
                )
              }
            />
          ))}

          {/* Tone & Vibration Settings */}
          <div className="px-4 py-2 mt-6">
            <span className="text-[14px] font-medium text-[#667781] uppercase tracking-wide">
              Sound & Vibration
            </span>
          </div>

          {settings.slice(2, 6).map((setting) => (
            <NotificationOption
              key={setting.id}
              setting={setting}
              isExpanded={selectedSetting === setting.id}
              onToggle={() =>
                setSelectedSetting(
                  selectedSetting === setting.id ? null : setting.id,
                )
              }
            />
          ))}

          {/* Group Notifications */}
          <div className="mt-6 space-y-0">
            <div className="px-4 py-2">
              <span className="text-[14px] font-medium text-[#667781] uppercase tracking-wide">
                Group Notifications
              </span>
            </div>

            <div className="bg-white border-b border-gray-100">
              <div className="flex items-center justify-between px-4 py-4">
                <div className="flex-1">
                  <h3 className="text-[17px] font-medium text-black mb-1">
                    Use High Priority Notifications
                  </h3>
                  <p className="text-[14px] text-[#667781]">
                    Show previews of notifications at the top of the screen
                  </p>
                </div>
                <button className="relative w-12 h-7 rounded-full bg-[#1DAB61] transition-colors">
                  <div className="absolute top-1 w-5 h-5 bg-white rounded-full translate-x-6 transition-transform" />
                </button>
              </div>
            </div>

            <div className="bg-white border-b border-gray-100">
              <button className="w-full flex items-center justify-between px-4 py-4 hover:bg-gray-50 transition-colors">
                <div className="text-left flex-1">
                  <h3 className="text-[17px] font-medium text-black">
                    Reaction Notifications
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[16px] text-[#667781]">On</span>
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
            </div>
          </div>

          {/* Call Notifications */}
          <div className="mt-6 space-y-0">
            <div className="px-4 py-2">
              <span className="text-[14px] font-medium text-[#667781] uppercase tracking-wide">
                Call Notifications
              </span>
            </div>

            <div className="bg-white border-b border-gray-100">
              <button className="w-full flex items-center justify-between px-4 py-4 hover:bg-gray-50 transition-colors">
                <div className="text-left flex-1">
                  <h3 className="text-[17px] font-medium text-black">
                    Ringtone
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[16px] text-[#667781]">Default</span>
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
            </div>

            <div className="bg-white border-b border-gray-100">
              <div className="flex items-center justify-between px-4 py-4">
                <div className="flex-1">
                  <h3 className="text-[17px] font-medium text-black mb-1">
                    Vibrate
                  </h3>
                </div>
                <button className="relative w-12 h-7 rounded-full bg-[#1DAB61] transition-colors">
                  <div className="absolute top-1 w-5 h-5 bg-white rounded-full translate-x-6 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* App Icon Badge */}
          <div className="mt-6 space-y-0">
            <div className="px-4 py-2">
              <span className="text-[14px] font-medium text-[#667781] uppercase tracking-wide">
                App Badge
              </span>
            </div>

            <div className="bg-white border-b border-gray-100">
              <div className="flex items-center justify-between px-4 py-4">
                <div className="flex-1">
                  <h3 className="text-[17px] font-medium text-black mb-1">
                    Count Unread Messages
                  </h3>
                  <p className="text-[14px] text-[#667781]">
                    Display unread message count on app icon
                  </p>
                </div>
                <button className="relative w-12 h-7 rounded-full bg-[#1DAB61] transition-colors">
                  <div className="absolute top-1 w-5 h-5 bg-white rounded-full translate-x-6 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Reset */}
          <div className="mt-8 mb-6">
            <div className="bg-white">
              <button className="w-full flex items-center justify-center px-4 py-4 hover:bg-gray-50 transition-colors">
                <span className="text-[17px] font-medium text-[#F44336]">
                  Reset Notification Settings
                </span>
              </button>
            </div>
          </div>

          {/* Info */}
          <div className="px-4 py-6">
            <p className="text-[14px] text-[#667781] leading-relaxed text-center">
              Notifications for individual chats can be customized in each
              chat's settings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
