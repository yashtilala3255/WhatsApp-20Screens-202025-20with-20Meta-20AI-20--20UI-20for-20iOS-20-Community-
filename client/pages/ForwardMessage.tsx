import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import StatusBar from '../components/StatusBar';

interface Chat {
  id: string;
  name: string;
  avatar: string;
  isGroup?: boolean;
  lastSeen?: string;
  isSelected: boolean;
}

const mockChats: Chat[] = [
  {
    id: '1',
    name: 'Marty McFly',
    avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/7a8c2c85?width=116',
    lastSeen: 'online',
    isSelected: false,
  },
  {
    id: '2',
    name: 'Doc Brown',
    avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/4c4a5af127d840b7402719dbbfdd77f20d2b99a7?width=116',
    lastSeen: 'last seen today at 2:30 PM',
    isSelected: false,
  },
  {
    id: '3',
    name: 'Jennifer Parker',
    avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/2f74a7b374d94e89d563d84ba3c9febd0fc2b66c?width=116',
    lastSeen: 'online',
    isSelected: false,
  },
  {
    id: '8',
    name: 'Hill Valley High School',
    avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/school-avatar?width=116',
    isGroup: true,
    lastSeen: '12 participants',
    isSelected: false,
  },
  {
    id: '5',
    name: 'George McFly',
    avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/george-avatar?width=116',
    lastSeen: 'last seen today at 10:15 AM',
    isSelected: false,
  },
];

const mockMessage = {
  text: "Great Scott! We need to get back to 1985!",
  type: 'text',
  sender: 'Marty McFly',
  timestamp: '2:30 PM'
};

export default function ForwardMessage() {
  const navigate = useNavigate();
  const { messageId } = useParams();
  const [chats, setChats] = useState<Chat[]>(mockChats);
  const [searchQuery, setSearchQuery] = useState('');
  const [message, setMessage] = useState('');

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedChats = chats.filter(chat => chat.isSelected);

  const toggleChatSelection = (chatId: string) => {
    setChats(prev =>
      prev.map(chat =>
        chat.id === chatId
          ? { ...chat, isSelected: !chat.isSelected }
          : chat
      )
    );
  };

  const handleForward = () => {
    if (selectedChats.length > 0) {
      // TODO: Implement message forwarding
      console.log('Forwarding message to:', selectedChats.map(c => c.name));
      console.log('Additional message:', message);
      navigate(-1);
    }
  };

  return (
    <div className="w-full max-w-[393px] h-screen flex flex-col bg-white relative overflow-hidden">
      <StatusBar />

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18L9 12L15 6"
                stroke="#0A0A0A"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div>
            <h1 className="text-[20px] font-semibold text-black">Forward to...</h1>
            {selectedChats.length > 0 && (
              <p className="text-[14px] text-[#667781]">
                {selectedChats.length} selected
              </p>
            )}
          </div>
        </div>

        {selectedChats.length > 0 && (
          <button
            onClick={handleForward}
            className="text-[16px] font-medium text-[#1DAB61]"
          >
            Send
          </button>
        )}
      </div>

      {/* Message Preview */}
      <div className="px-4 py-3 bg-[#F0F2F5] border-b border-gray-100">
        <div className="bg-white rounded-lg p-3 border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 2.58579 20.4142C2.21071 20.0391 2 19.5304 2 19V15" stroke="#667781" strokeWidth="2"/>
              <polyline points="7,10 12,15 17,10" stroke="#667781" strokeWidth="2"/>
              <line x1="12" y1="15" x2="12" y2="3" stroke="#667781" strokeWidth="2"/>
            </svg>
            <span className="text-[14px] font-medium text-[#667781]">Forwarded message</span>
          </div>
          <p className="text-[16px] text-black">{mockMessage.text}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-[12px] text-[#667781]">From: {mockMessage.sender}</span>
            <span className="text-[12px] text-[#667781]">{mockMessage.timestamp}</span>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 py-3 bg-white border-b border-gray-100">
        <div className="relative">
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 fill-[#667781]"
          >
            <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#667781" strokeWidth="2" fill="none"/>
            <path d="M21 21L16.65 16.65" stroke="#667781" strokeWidth="2"/>
          </svg>
          <input
            type="text"
            placeholder="Search chats"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#F0F2F5] rounded-lg pl-10 pr-4 py-2 text-[16px] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#1DAB61]"
          />
        </div>
      </div>

      {/* Selected Chats Preview */}
      {selectedChats.length > 0 && (
        <div className="px-4 py-3 bg-[#E8F5E8] border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-[14px] font-medium text-[#1DAB61]">
              Forward to {selectedChats.length} chat{selectedChats.length > 1 ? 's' : ''}:
            </span>
            <div className="flex-1 flex gap-2 overflow-x-auto">
              {selectedChats.map(chat => (
                <div key={chat.id} className="flex items-center gap-1 bg-white rounded-full px-2 py-1 flex-shrink-0">
                  <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-300">
                    <img
                      src={chat.avatar}
                      alt={chat.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-[12px] text-black">{chat.name.split(' ')[0]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-2 bg-[#F0F2F5]">
          <span className="text-[14px] font-medium text-[#667781] uppercase tracking-wide">
            Recent Chats
          </span>
        </div>
        
        {filteredChats.map(chat => (
          <button
            key={chat.id}
            onClick={() => toggleChatSelection(chat.id)}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
          >
            <div className="relative">
              <div className="w-[52px] h-[52px] rounded-full overflow-hidden bg-gray-300">
                <img
                  src={chat.avatar}
                  alt={chat.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://api.builder.io/api/v1/image/assets/placeholder-avatar';
                  }}
                />
              </div>
              {chat.isGroup && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#667781] rounded-full flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="9" cy="7" r="4" stroke="white" strokeWidth="1.5"/>
                    <path d="M23 11L20 8L17 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M20 8V16" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
              {chat.lastSeen === 'online' && !chat.isGroup && (
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#1DAB61] border-2 border-white rounded-full"></div>
              )}
            </div>

            <div className="flex-1 text-left">
              <h3 className="font-semibold text-[17px] text-black">
                {chat.name}
              </h3>
              <p className="text-[15px] text-[#667781]">
                {chat.lastSeen}
              </p>
            </div>

            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              chat.isSelected 
                ? 'bg-[#1DAB61] border-[#1DAB61]' 
                : 'border-[#CCCCCC]'
            }`}>
              {chat.isSelected && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M20 6L9 17L4 12"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
          </button>
        ))}

        {filteredChats.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 px-8">
            <div className="w-24 h-24 bg-[#F0F2F5] rounded-full flex items-center justify-center mb-4">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.60565 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47086C20.0052 6.94694 20.885 8.91568 21 11V11.5Z"
                  stroke="#667781"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="text-[20px] font-medium text-[#667781] mb-2">
              No chats found
            </h3>
            <p className="text-[16px] text-[#667781] text-center leading-relaxed">
              Try searching for something else
            </p>
          </div>
        )}
      </div>

      {/* Add Message (Optional) */}
      {selectedChats.length > 0 && (
        <div className="px-4 py-3 bg-white border-t border-gray-100">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Add a message (optional)"
            className="w-full bg-[#F0F2F5] rounded-lg px-3 py-2 text-[16px] resize-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#1DAB61]"
            rows={2}
          />
        </div>
      )}
    </div>
  );
}
