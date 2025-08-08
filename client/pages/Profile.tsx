import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StatusBar from "../components/StatusBar";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";

export default function Profile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Marty McFly");
  const [about, setAbout] = useState("Just a regular teenager... from 1985");
  const [phone, setPhone] = useState("+1 555-0123");
  const [profileImage, setProfileImage] = useState(
    "https://api.builder.io/api/v1/image/assets/TEMP/7a8c2c85?width=116",
  );

  const handleSave = () => {
    // TODO: Implement save functionality
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset form values
    setName("Marty McFly");
    setAbout("Just a regular teenager... from 1985");
    setIsEditing(false);
  };

  const ProfileField: React.FC<{
    label: string;
    value: string;
    onValueChange: (value: string) => void;
    multiline?: boolean;
    readonly?: boolean;
  }> = ({
    label,
    value,
    onValueChange,
    multiline = false,
    readonly = false,
  }) => (
    <div className="px-4 py-4 border-b border-gray-100">
      <div className="flex flex-col gap-2">
        <span className="text-[14px] text-[#667781] font-medium">{label}</span>
        {isEditing && !readonly ? (
          multiline ? (
            <Textarea
              value={value}
              onChange={(e) => onValueChange(e.target.value)}
              className="border-none p-0 text-[17px] text-black resize-none focus:outline-none focus:ring-0"
              rows={2}
            />
          ) : (
            <Input
              value={value}
              onChange={(e) => onValueChange(e.target.value)}
              className="border-none p-0 text-[17px] text-black focus:outline-none focus:ring-0"
            />
          )
        ) : (
          <span className="text-[17px] text-black">{value}</span>
        )}
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-[393px] h-screen flex flex-col bg-white relative overflow-hidden">
      <StatusBar />

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#1DAB61]">
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
        <h1 className="text-[20px] font-semibold text-white">Profile</h1>
        {isEditing ? (
          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              className="px-3 py-1 text-white text-[14px] font-medium hover:bg-white/10 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-3 py-1 bg-white text-[#1DAB61] text-[14px] font-medium rounded hover:bg-white/90"
            >
              Save
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18.5 2.50023C18.8978 2.1024 19.4374 1.87891 20 1.87891C20.5626 1.87891 21.1022 2.1024 21.5 2.50023C21.8978 2.89805 22.1213 3.43762 22.1213 4.00023C22.1213 4.56284 21.8978 5.10241 21.5 5.50023L12 15.0002L8 16.0002L9 12.0002L18.5 2.50023Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Profile Image Section */}
      <div className="relative bg-[#1DAB61] pb-20">
        <div className="flex flex-col items-center pt-8">
          <div className="relative">
            <div className="w-40 h-40 rounded-full overflow-hidden bg-white/20 border-4 border-white">
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://api.builder.io/api/v1/image/assets/placeholder-avatar";
                }}
              />
            </div>
            {isEditing && (
              <button className="absolute bottom-2 right-2 w-12 h-12 bg-[#1DAB61] rounded-full flex items-center justify-center border-4 border-white hover:bg-[#169954] transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M23 19C23 20.1046 22.1046 21 21 21H3C1.89543 21 1 20.1046 1 19V8C1 6.89543 1.89543 6 3 6H7L9 3H15L17 6H21C22.1046 6 23 6.89543 23 8V19Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="13"
                    r="4"
                    stroke="white"
                    strokeWidth="2"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Profile Information */}
      <div className="flex-1 overflow-y-auto bg-white -mt-16 relative z-10 rounded-t-3xl">
        <div className="pt-8">
          <ProfileField label="Name" value={name} onValueChange={setName} />

          <ProfileField
            label="About"
            value={about}
            onValueChange={setAbout}
            multiline
          />

          <ProfileField
            label="Phone"
            value={phone}
            onValueChange={setPhone}
            readonly
          />

          {/* Privacy Section */}
          <div className="mt-8">
            <div className="px-4 py-3 bg-[#F0F2F5]">
              <span className="text-[14px] font-medium text-[#667781] uppercase tracking-wide">
                Privacy
              </span>
            </div>

            <button
              onClick={() => navigate("/privacy-settings")}
              className="w-full flex items-center justify-between px-4 py-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#1DAB61] rounded-full flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 17H12.01"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="text-left">
                  <h3 className="text-[17px] font-medium text-black">
                    Privacy
                  </h3>
                  <p className="text-[14px] text-[#667781]">
                    Who can see my info
                  </p>
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
              onClick={() => navigate("/security-settings")}
              className="w-full flex items-center justify-between px-4 py-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#1DAB61] rounded-full flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 22S8 18 8 13V6L12 4L16 6V13C16 18 12 22 12 22Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="text-left">
                  <h3 className="text-[17px] font-medium text-black">
                    Security
                  </h3>
                  <p className="text-[14px] text-[#667781]">
                    Two-step verification
                  </p>
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
              onClick={() => navigate("/blocked-contacts")}
              className="w-full flex items-center justify-between px-4 py-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#F44336] rounded-full flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="white"
                      strokeWidth="2"
                    />
                    <path
                      d="M4.93 4.93L19.07 19.07"
                      stroke="white"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <div className="text-left">
                  <h3 className="text-[17px] font-medium text-black">
                    Blocked Contacts
                  </h3>
                  <p className="text-[14px] text-[#667781]">3 contacts</p>
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

          {/* Account Actions */}
          <div className="mt-8 mb-8">
            <div className="px-4 py-3 bg-[#F0F2F5]">
              <span className="text-[14px] font-medium text-[#667781] uppercase tracking-wide">
                Account
              </span>
            </div>

            <button className="w-full flex items-center justify-between px-4 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#FF9800] rounded-full flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <polyline
                      points="16,17 21,12 16,7"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <line
                      x1="21"
                      y1="12"
                      x2="9"
                      y2="12"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="text-left">
                  <h3 className="text-[17px] font-medium text-black">
                    Sign Out
                  </h3>
                  <p className="text-[14px] text-[#667781]">
                    Sign out of this account
                  </p>
                </div>
              </div>
            </button>

            <button className="w-full flex items-center justify-between px-4 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#F44336] rounded-full flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <polyline
                      points="3,6 5,6 21,6"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="text-left">
                  <h3 className="text-[17px] font-medium text-[#F44336]">
                    Delete Account
                  </h3>
                  <p className="text-[14px] text-[#667781]">
                    Permanently delete this account
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
