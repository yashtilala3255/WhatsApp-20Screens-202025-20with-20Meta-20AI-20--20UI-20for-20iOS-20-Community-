import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import StatusBar from '../components/StatusBar';

interface GroupMember {
  id: string;
  name: string;
  phone: string;
  avatar: string;
  role: 'admin' | 'member';
  isOnline?: boolean;
  lastSeen?: string;
}

const mockGroup = {
  id: '1',
  name: 'Hill Valley High School',
  description: 'Class of 1985 - Stay connected with your classmates!',
  avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/school-avatar?width=116',
  createdBy: 'Marty McFly',
  createdAt: 'Created 11/5/1985',
  members: [
    {
      id: '1',
      name: 'Marty McFly',
      phone: '+1 555-0123',
      avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/7a8c2c85?width=116',
      role: 'admin' as const,
      isOnline: true,
    },
    {
      id: '2',
      name: 'Doc Brown',
      phone: '+1 555-0124',
      avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/4c4a5af127d840b7402719dbbfdd77f20d2b99a7?width=116',
      role: 'admin' as const,
      lastSeen: 'last seen today at 2:30 PM',
    },
    {
      id: '3',
      name: 'Jennifer Parker',
      phone: '+1 555-0125',
      avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/2f74a7b374d94e89d563d84ba3c9febd0fc2b66c?width=116',
      role: 'member' as const,
      isOnline: true,
    },
    {
      id: '4',
      name: 'George McFly',
      phone: '+1 555-0127',
      avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/george-avatar?width=116',
      role: 'member' as const,
      lastSeen: 'last seen today at 10:15 AM',
    },
    {
      id: '5',
      name: 'Lorraine Baines',
      phone: '+1 555-0128',
      avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/lorraine-avatar?width=116',
      role: 'member' as const,
      lastSeen: 'last seen yesterday',
    },
  ] as GroupMember[],
};

export default function GroupInfo() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showAllMembers, setShowAllMembers] = useState(false);

  const admins = mockGroup.members.filter(member => member.role === 'admin');
  const members = mockGroup.members.filter(member => member.role === 'member');
  const displayMembers = showAllMembers ? members : members.slice(0, 5);

  return (
    <div className="w-full max-w-[393px] h-screen flex flex-col bg-white relative overflow-hidden">
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
        <h1 className="text-[20px] font-semibold text-white">Group Info</h1>
        <div className="flex-1"></div>
        <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
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
      </div>

      {/* Group Header */}
      <div className="relative bg-[#1DAB61] pb-16">
        <div className="flex flex-col items-center pt-6">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-white/20 border-4 border-white mb-4">
            <img
              src={mockGroup.avatar}
              alt={mockGroup.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://api.builder.io/api/v1/image/assets/placeholder-avatar';
              }}
            />
          </div>
          <h2 className="text-[24px] font-bold text-white text-center mb-2">
            {mockGroup.name}
          </h2>
          <p className="text-[16px] text-white/80 text-center mb-1">
            {mockGroup.members.length} participants
          </p>
          <p className="text-[14px] text-white/60 text-center">
            {mockGroup.createdAt}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto bg-white -mt-12 relative z-10 rounded-t-3xl">
        <div className="pt-6">
          {/* Description */}
          {mockGroup.description && (
            <div className="px-4 py-4 border-b border-gray-100">
              <p className="text-[16px] text-[#667781] leading-relaxed">
                {mockGroup.description}
              </p>
            </div>
          )}

          {/* Quick Actions */}
          <div className="grid grid-cols-4 gap-4 px-4 py-6 border-b border-gray-100">
            <button 
              onClick={() => navigate(`/media-gallery/${id}`)}
              className="flex flex-col items-center gap-2"
            >
              <div className="w-12 h-12 bg-[#1DAB61] rounded-full flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="white" strokeWidth="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5" stroke="white" strokeWidth="2"/>
                  <polyline points="21,15 16,10 5,21" stroke="white" strokeWidth="2"/>
                </svg>
              </div>
              <span className="text-[12px] text-[#667781]">Media</span>
            </button>

            <button className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-[#1DAB61] rounded-full flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="white" strokeWidth="2"/>
                  <polyline points="14,2 14,8 20,8" stroke="white" strokeWidth="2"/>
                </svg>
              </div>
              <span className="text-[12px] text-[#667781]">Files</span>
            </button>

            <button className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-[#1DAB61] rounded-full flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2" stroke="white" strokeWidth="2"/>
                </svg>
              </div>
              <span className="text-[12px] text-[#667781]">Links</span>
            </button>

            <button 
              onClick={() => navigate(`/search?group=${id}`)}
              className="flex flex-col items-center gap-2"
            >
              <div className="w-12 h-12 bg-[#1DAB61] rounded-full flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="8" stroke="white" strokeWidth="2"/>
                  <path d="m21 21-4.35-4.35" stroke="white" strokeWidth="2"/>
                </svg>
              </div>
              <span className="text-[12px] text-[#667781]">Search</span>
            </button>
          </div>

          {/* Participants */}
          <div>
            <div className="px-4 py-3 bg-[#F0F2F5] flex items-center justify-between">
              <span className="text-[14px] font-medium text-[#667781] uppercase tracking-wide">
                {mockGroup.members.length} Participants
              </span>
              <button 
                onClick={() => navigate('/add-participants')}
                className="text-[14px] text-[#1DAB61] font-medium"
              >
                Add
              </button>
            </div>

            {/* Admins */}
            {admins.map(admin => (
              <div key={admin.id} className="flex items-center gap-3 px-4 py-3">
                <div className="relative">
                  <div className="w-[52px] h-[52px] rounded-full overflow-hidden bg-gray-300">
                    <img
                      src={admin.avatar}
                      alt={admin.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://api.builder.io/api/v1/image/assets/placeholder-avatar';
                      }}
                    />
                  </div>
                  {admin.isOnline && (
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#1DAB61] border-2 border-white rounded-full"></div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-[17px] text-black">
                      {admin.name}
                    </h3>
                    <span className="px-2 py-1 bg-[#1DAB61] text-white text-[12px] font-medium rounded">
                      Admin
                    </span>
                  </div>
                  <p className="text-[15px] text-[#667781]">
                    {admin.isOnline ? 'online' : admin.lastSeen}
                  </p>
                </div>

                <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="5" r="1" fill="#667781"/>
                    <circle cx="12" cy="12" r="1" fill="#667781"/>
                    <circle cx="12" cy="19" r="1" fill="#667781"/>
                  </svg>
                </button>
              </div>
            ))}

            {/* Members */}
            {displayMembers.map(member => (
              <div key={member.id} className="flex items-center gap-3 px-4 py-3">
                <div className="relative">
                  <div className="w-[52px] h-[52px] rounded-full overflow-hidden bg-gray-300">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://api.builder.io/api/v1/image/assets/placeholder-avatar';
                      }}
                    />
                  </div>
                  {member.isOnline && (
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#1DAB61] border-2 border-white rounded-full"></div>
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-[17px] text-black mb-1">
                    {member.name}
                  </h3>
                  <p className="text-[15px] text-[#667781]">
                    {member.isOnline ? 'online' : member.lastSeen}
                  </p>
                </div>

                <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="5" r="1" fill="#667781"/>
                    <circle cx="12" cy="12" r="1" fill="#667781"/>
                    <circle cx="12" cy="19" r="1" fill="#667781"/>
                  </svg>
                </button>
              </div>
            ))}

            {/* Show More Button */}
            {members.length > 5 && !showAllMembers && (
              <button
                onClick={() => setShowAllMembers(true)}
                className="w-full px-4 py-3 text-[16px] text-[#1DAB61] font-medium hover:bg-gray-50 transition-colors"
              >
                Show {members.length - 5} more participants
              </button>
            )}
          </div>

          {/* Group Settings */}
          <div className="mt-8">
            <div className="px-4 py-3 bg-[#F0F2F5]">
              <span className="text-[14px] font-medium text-[#667781] uppercase tracking-wide">
                Group Settings
              </span>
            </div>

            <button className="w-full flex items-center justify-between px-4 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#FF9800] rounded-full flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M18 8C18 6.17392 17.2625 4.40215 15.9497 3.08934C14.6369 1.77652 12.8652 1.03906 11.0391 1.03906C9.21297 1.03906 7.44119 1.77652 6.12838 3.08934C4.81557 4.40215 4.07812 6.17392 4.07812 8C4.07812 15.1719 1.03906 17.1719 1.03906 17.1719H21.0391C21.0391 17.1719 18 15.1719 18 8Z" stroke="white" strokeWidth="2"/>
                    <path d="M13.7344 21.1719C13.5347 21.5043 13.2493 21.7791 12.9063 21.9682C12.5633 22.1572 12.1753 22.2539 11.7812 22.2539C11.3872 22.2539 10.9992 22.1572 10.6562 21.9682C10.3132 21.7791 10.0278 21.5043 9.82812 21.1719" stroke="white" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="text-left">
                  <h3 className="text-[17px] font-medium text-black">Mute notifications</h3>
                  <p className="text-[14px] text-[#667781]">Off</p>
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

            <button className="w-full flex items-center justify-between px-4 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#F44336] rounded-full flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M3 6H5H21" stroke="white" strokeWidth="2"/>
                    <path d="M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6" stroke="white" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="text-left">
                  <h3 className="text-[17px] font-medium text-[#F44336]">Exit Group</h3>
                  <p className="text-[14px] text-[#667781]">Leave this group</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
