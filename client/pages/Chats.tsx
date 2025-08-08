import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StatusBar from '../components/StatusBar';
import TabBar from '../components/TabBar';

interface ChatItem {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  avatar: string;
  unreadCount?: number;
  isOnline?: boolean;
  isTyping?: boolean;
  isPinned?: boolean;
  isArchived?: boolean;
  isMuted?: boolean;
}

const mockChats: ChatItem[] = [
  {
    id: '1',
    name: 'Marty McFly',
    lastMessage: 'Great Scott! We need to get back to 1985!',
    time: '2:30 PM',
    avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/7a8c2c85?width=116',
    unreadCount: 3,
    isOnline: true,
    isPinned: true,
  },
  {
    id: '2',
    name: 'Doc Brown',
    lastMessage: 'The DeLorean is ready for another time jump',
    time: '1:45 PM',
    avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/4c4a5af127d840b7402719dbbfdd77f20d2b99a7?width=116',
    unreadCount: 1,
    isPinned: true,
  },
  {
    id: '3',
    name: 'Jennifer Parker',
    lastMessage: 'Are we still on for tonight?',
    time: '12:20 PM',
    avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/2f74a7b374d94e89d563d84ba3c9febd0fc2b66c?width=116',
    isOnline: true,
  },
  {
    id: '4',
    name: 'Biff Tannen',
    lastMessage: 'Hey McFly! I thought I told you never to come in here.',
    time: '11:30 AM',
    avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/biff-avatar?width=116',
  },
  {
    id: '5',
    name: 'George McFly',
    lastMessage: 'I finished writing my novel!',
    time: '10:15 AM',
    avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/george-avatar?width=116',
    unreadCount: 2,
  },
  {
    id: '6',
    name: 'Lorraine Baines',
    lastMessage: 'Calvin Klein, such a nice name',
    time: 'Yesterday',
    avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/lorraine-avatar?width=116',
    isTyping: true,
  },
  {
    id: '7',
    name: 'Einstein (Dog)',
    lastMessage: 'Woof! 🐕',
    time: 'Yesterday',
    avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/einstein-avatar?width=116',
  },
  {
    id: '8',
    name: 'Hill Valley High School',
    lastMessage: 'Welcome to the class of 1985!',
    time: 'Monday',
    avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/school-avatar?width=116',
    isMuted: true,
  },
];

export default function Chats() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const filteredChats = mockChats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pinnedChats = filteredChats.filter(chat => chat.isPinned);
  const regularChats = filteredChats.filter(chat => !chat.isPinned);

  const ChatItem: React.FC<{ chat: ChatItem }> = ({ chat }) => (
    <Link
      to={`/chat/${chat.id}`}
      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 active:bg-gray-100 transition-colors"
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
        {chat.isOnline && (
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#1DAB61] border-2 border-white rounded-full"></div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-[17px] text-black truncate">
              {chat.name}
            </h3>
            {chat.isPinned && (
              <svg width="12" height="12" viewBox="0 0 12 12" className="fill-[#667781] flex-shrink-0">
                <path d="M6.5 0L8.5 4H12L9 6.5L10.5 12L6.5 9L2.5 12L4 6.5L1 4H4.5L6.5 0Z"/>
              </svg>
            )}
            {chat.isMuted && (
              <svg width="16" height="16" viewBox="0 0 16 16" className="fill-[#667781] flex-shrink-0">
                <path d="M8 2.5c-.83 0-1.5.67-1.5 1.5v4c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V4c0-.83-.67-1.5-1.5-1.5z"/>
                <path d="M3 6v2c0 2.76 2.24 5 5 5s5-2.24 5-5V6h-1v2c0 2.21-1.79 4-4 4s-4-1.79-4-4V6H3z"/>
                <path d="M1 1l14 14" stroke="#667781" strokeWidth="1.5"/>
              </svg>
            )}
          </div>
          <span className="text-[13px] text-[#667781] flex-shrink-0">
            {chat.time}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <p className="text-[15px] text-[#667781] truncate flex-1">
            {chat.isTyping ? (
              <span className="text-[#1DAB61] italic">typing...</span>
            ) : (
              chat.lastMessage
            )}
          </p>
          
          {chat.unreadCount && (
            <div className="ml-2 bg-[#1DAB61] text-white text-[12px] font-medium px-2 py-1 rounded-full min-w-[20px] flex items-center justify-center">
              {chat.unreadCount > 99 ? '99+' : chat.unreadCount}
            </div>
          )}
        </div>
      </div>
    </Link>
  );

  return (
    <div className="w-full max-w-[393px] h-screen flex flex-col bg-white relative overflow-hidden">
      <StatusBar />

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
        <div className="flex items-center gap-4">
          <h1 className="text-[28px] font-bold text-black">Chats</h1>
          <button 
            onClick={() => setShowSearch(!showSearch)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                stroke="#667781"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 21L16.65 16.65"
                stroke="#667781"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/camera"
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M23 19C23 20.1046 22.1046 21 21 21H3C1.89543 21 1 20.1046 1 19V8C1 6.89543 1.89543 6 3 6H7L9 3H15L17 6H21C22.1046 6 23 6.89543 23 8V19Z"
                stroke="#667781"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="12"
                cy="13"
                r="4"
                stroke="#667781"
                strokeWidth="2"
              />
            </svg>
          </Link>
          
          <Link
            to="/new-chat"
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 5V19M5 12H19"
                stroke="#667781"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>

          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="5" r="1" fill="#667781"/>
              <circle cx="12" cy="12" r="1" fill="#667781"/>
              <circle cx="12" cy="19" r="1" fill="#667781"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      {showSearch && (
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
      )}

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {pinnedChats.length > 0 && (
          <div>
            <div className="px-4 py-2 bg-[#F0F2F5]">
              <span className="text-[14px] font-medium text-[#667781] uppercase tracking-wide">
                Pinned
              </span>
            </div>
            {pinnedChats.map(chat => (
              <ChatItem key={chat.id} chat={chat} />
            ))}
          </div>
        )}

        {regularChats.length > 0 && (
          <div>
            {pinnedChats.length > 0 && (
              <div className="px-4 py-2 bg-[#F0F2F5]">
                <span className="text-[14px] font-medium text-[#667781] uppercase tracking-wide">
                  All Chats
                </span>
              </div>
            )}
            {regularChats.map(chat => (
              <ChatItem key={chat.id} chat={chat} />
            ))}
          </div>
        )}

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
              {searchQuery ? "Try searching for something else" : "Start a conversation by tapping the + button"}
            </p>
          </div>
        )}
      </div>

      <TabBar />
    </div>
  );
}
