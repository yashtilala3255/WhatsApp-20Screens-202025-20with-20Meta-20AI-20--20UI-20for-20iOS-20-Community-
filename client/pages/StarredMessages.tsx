import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import StatusBar from '../components/StatusBar';

interface StarredMessage {
  id: string;
  chatName: string;
  chatAvatar: string;
  message: string;
  timestamp: string;
  messageType: 'text' | 'image' | 'video' | 'audio' | 'document';
  sender: string;
  chatId: string;
  starredAt: string;
}

const mockStarredMessages: StarredMessage[] = [
  {
    id: '1',
    chatName: 'Marty McFly',
    chatAvatar: 'https://api.builder.io/api/v1/image/assets/TEMP/7a8c2c85?width=116',
    message: 'Great Scott! We need to get back to 1985!',
    timestamp: '2:30 PM',
    messageType: 'text',
    sender: 'Marty McFly',
    chatId: '1',
    starredAt: 'today',
  },
  {
    id: '2',
    chatName: 'Doc Brown',
    chatAvatar: 'https://api.builder.io/api/v1/image/assets/TEMP/4c4a5af127d840b7402719dbbfdd77f20d2b99a7?width=116',
    message: 'The DeLorean is ready for another time jump',
    timestamp: '1:45 PM',
    messageType: 'text',
    sender: 'Doc Brown',
    chatId: '2',
    starredAt: 'today',
  },
  {
    id: '3',
    chatName: 'Jennifer Parker',
    chatAvatar: 'https://api.builder.io/api/v1/image/assets/TEMP/2f74a7b374d94e89d563d84ba3c9febd0fc2b66c?width=116',
    message: 'Photo',
    timestamp: '12:20 PM',
    messageType: 'image',
    sender: 'Jennifer Parker',
    chatId: '3',
    starredAt: 'yesterday',
  },
  {
    id: '4',
    chatName: 'Hill Valley High School',
    chatAvatar: 'https://api.builder.io/api/v1/image/assets/TEMP/school-avatar?width=116',
    message: 'Welcome to the class of 1985! Please review the upcoming events and remember to submit your assignments on time.',
    timestamp: 'Monday',
    messageType: 'text',
    sender: 'Mr. Strickland',
    chatId: '8',
    starredAt: 'this week',
  },
  {
    id: '5',
    chatName: 'George McFly',
    chatAvatar: 'https://api.builder.io/api/v1/image/assets/TEMP/george-avatar?width=116',
    message: 'Audio message',
    timestamp: 'Sunday',
    messageType: 'audio',
    sender: 'George McFly',
    chatId: '5',
    starredAt: 'this week',
  },
];

export default function StarredMessages() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMessages = mockStarredMessages.filter(message =>
    message.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.chatName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.sender.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getMessageIcon = (type: string) => {
    switch (type) {
      case 'image':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="#667781" strokeWidth="2"/>
            <circle cx="8.5" cy="8.5" r="1.5" stroke="#667781" strokeWidth="2"/>
            <polyline points="21,15 16,10 5,21" stroke="#667781" strokeWidth="2"/>
          </svg>
        );
      case 'video':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <polygon points="23,12 8,21 8,3 23,12" stroke="#667781" strokeWidth="2"/>
          </svg>
        );
      case 'audio':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 1C12 1 8 1 8 5V12C8 16 12 16 12 16C12 16 16 16 16 12V5C16 1 12 1 12 1Z" stroke="#667781" strokeWidth="2"/>
            <path d="M19 10V12C19 15.866 15.866 19 12 19C8.13401 19 5 15.866 5 12V10" stroke="#667781" strokeWidth="2"/>
            <path d="M12 19V23" stroke="#667781" strokeWidth="2"/>
            <path d="M8 23H16" stroke="#667781" strokeWidth="2"/>
          </svg>
        );
      case 'document':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#667781" strokeWidth="2"/>
            <polyline points="14,2 14,8 20,8" stroke="#667781" strokeWidth="2"/>
          </svg>
        );
      default:
        return null;
    }
  };

  const StarredMessageItem: React.FC<{ message: StarredMessage }> = ({ message }) => (
    <Link
      to={`/chat/${message.chatId}`}
      className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 active:bg-gray-100 transition-colors"
    >
      <div className="w-[52px] h-[52px] rounded-full overflow-hidden bg-gray-300 flex-shrink-0">
        <img
          src={message.chatAvatar}
          alt={message.chatName}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = 'https://api.builder.io/api/v1/image/assets/placeholder-avatar';
          }}
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-[17px] text-black truncate">
            {message.chatName}
          </h3>
          <div className="flex items-center gap-2 flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2" fill="#FFD700" stroke="#FFB000" strokeWidth="1"/>
            </svg>
            <span className="text-[13px] text-[#667781]">
              {message.timestamp}
            </span>
          </div>
        </div>
        
        <p className="text-[15px] text-[#667781] mb-1 truncate">
          {message.sender !== message.chatName && (
            <span className="font-medium">{message.sender}: </span>
          )}
          {message.messageType !== 'text' && (
            <span className="inline-flex items-center gap-1 mr-1">
              {getMessageIcon(message.messageType)}
            </span>
          )}
          {message.message}
        </p>
        
        <p className="text-[13px] text-[#1DAB61]">
          Starred {message.starredAt}
        </p>
      </div>
    </Link>
  );

  return (
    <div className="w-full max-w-[393px] h-screen flex flex-col bg-white relative overflow-hidden">
      <StatusBar />

      {/* Header */}
      <div className="flex items-center gap-4 px-4 py-3 bg-white border-b border-gray-100">
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
          <h1 className="text-[20px] font-semibold text-black flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2" fill="#FFD700" stroke="#FFB000" strokeWidth="1"/>
            </svg>
            Starred Messages
          </h1>
          {filteredMessages.length > 0 && (
            <p className="text-[14px] text-[#667781]">
              {filteredMessages.length} starred messages
            </p>
          )}
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
            placeholder="Search starred messages"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#F0F2F5] rounded-lg pl-10 pr-4 py-2 text-[16px] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#1DAB61]"
          />
        </div>
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto">
        {filteredMessages.length > 0 ? (
          <div>
            {!searchQuery && (
              <div className="px-4 py-3 bg-[#FFFDE7] border-b border-[#FFF9C4]">
                <div className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2" fill="#FFD700" stroke="#FFB000" strokeWidth="1"/>
                  </svg>
                  <p className="text-[14px] text-[#F57F17] leading-relaxed">
                    Tap and hold any message in a chat to star it for easy access later.
                  </p>
                </div>
              </div>
            )}
            
            {filteredMessages.map(message => (
              <StarredMessageItem key={message.id} message={message} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-8">
            <div className="w-24 h-24 bg-[#F0F2F5] rounded-full flex items-center justify-center mb-4">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2" fill="#FFD700" stroke="#FFB000" strokeWidth="2"/>
              </svg>
            </div>
            <h3 className="text-[20px] font-medium text-[#667781] mb-2">
              {searchQuery ? 'No starred messages found' : 'No starred messages yet'}
            </h3>
            <p className="text-[16px] text-[#667781] text-center leading-relaxed">
              {searchQuery 
                ? "Try searching for something else" 
                : "Tap and hold any message in a chat to star it"
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
