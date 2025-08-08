import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import StatusBar from '../components/StatusBar';

interface Contact {
  id: string;
  name: string;
  phone: string;
  avatar: string;
  isOnWhatsApp: boolean;
  lastSeen?: string;
  about?: string;
}

const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'Marty McFly',
    phone: '+1 555-0123',
    avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/7a8c2c85?width=116',
    isOnWhatsApp: true,
    lastSeen: 'online',
    about: 'Just a regular teenager... from 1985',
  },
  {
    id: '2',
    name: 'Doc Brown',
    phone: '+1 555-0124',
    avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/4c4a5af127d840b7402719dbbfdd77f20d2b99a7?width=116',
    isOnWhatsApp: true,
    lastSeen: 'last seen today at 2:30 PM',
    about: 'Great Scott! 1.21 gigawatts!',
  },
  {
    id: '3',
    name: 'Jennifer Parker',
    phone: '+1 555-0125',
    avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/2f74a7b374d94e89d563d84ba3c9febd0fc2b66c?width=116',
    isOnWhatsApp: true,
    lastSeen: 'online',
    about: 'Living life one day at a time',
  },
  {
    id: '4',
    name: 'Biff Tannen',
    phone: '+1 555-0126',
    avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/biff-avatar?width=116',
    isOnWhatsApp: true,
    lastSeen: 'last seen yesterday at 11:45 AM',
    about: 'Make like a tree and get out of here!',
  },
  {
    id: '5',
    name: 'George McFly',
    phone: '+1 555-0127',
    avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/george-avatar?width=116',
    isOnWhatsApp: true,
    lastSeen: 'last seen today at 10:15 AM',
    about: 'Writer and dreamer',
  },
  {
    id: '6',
    name: 'Lorraine Baines',
    phone: '+1 555-0128',
    avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/lorraine-avatar?width=116',
    isOnWhatsApp: true,
    lastSeen: 'online',
    about: 'Happy to be living in Hill Valley',
  },
  {
    id: '7',
    name: 'Strickland',
    phone: '+1 555-0129',
    avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/strickland-avatar?width=116',
    isOnWhatsApp: true,
    lastSeen: 'last seen 3 days ago',
    about: 'Discipline! That\'s what this school needs!',
  },
  {
    id: '8',
    name: 'Goldie Wilson',
    phone: '+1 555-0130',
    avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/goldie-avatar?width=116',
    isOnWhatsApp: false,
  },
];

export default function NewChat() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = mockContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phone.includes(searchQuery)
  );

  const whatsappContacts = filteredContacts.filter(contact => contact.isOnWhatsApp);
  const nonWhatsappContacts = filteredContacts.filter(contact => !contact.isOnWhatsApp);

  const startChat = (contactId: string) => {
    navigate(`/chat/${contactId}`);
  };

  const ContactItem: React.FC<{ contact: Contact; showInvite?: boolean }> = ({ contact, showInvite = false }) => (
    <div
      onClick={() => !showInvite && startChat(contact.id)}
      className={`flex items-center gap-3 px-4 py-3 ${!showInvite ? 'hover:bg-gray-50 active:bg-gray-100 cursor-pointer' : ''} transition-colors`}
    >
      <div className="relative">
        <div className="w-[52px] h-[52px] rounded-full overflow-hidden bg-gray-300">
          <img
            src={contact.avatar}
            alt={contact.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = 'https://api.builder.io/api/v1/image/assets/placeholder-avatar';
            }}
          />
        </div>
        {contact.lastSeen === 'online' && !showInvite && (
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#1DAB61] border-2 border-white rounded-full"></div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-[17px] text-black truncate">
            {contact.name}
          </h3>
          {showInvite && (
            <button className="px-3 py-1 bg-[#1DAB61] text-white text-[14px] font-medium rounded-full hover:bg-[#169954] transition-colors">
              Invite
            </button>
          )}
        </div>
        
        <div className="flex flex-col">
          <p className="text-[15px] text-[#667781] truncate">
            {showInvite ? 'Not on WhatsApp' : (contact.about || contact.phone)}
          </p>
          {!showInvite && contact.lastSeen && (
            <p className="text-[13px] text-[#667781] truncate">
              {contact.lastSeen}
            </p>
          )}
        </div>
      </div>
    </div>
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
        <h1 className="text-[20px] font-semibold text-black">New Chat</h1>
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
            placeholder="Search contacts"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#F0F2F5] rounded-lg pl-10 pr-4 py-2 text-[16px] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#1DAB61]"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white">
        <Link
          to="/new-group"
          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 active:bg-gray-100 transition-colors"
        >
          <div className="w-[52px] h-[52px] rounded-full bg-[#1DAB61] flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="9" cy="7" r="4" stroke="white" strokeWidth="2"/>
              <path d="M23 11L20 8L17 11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20 8V16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-[17px] text-black">New Group</h3>
            <p className="text-[15px] text-[#667781]">Create a group chat</p>
          </div>
        </Link>

        <Link
          to="/new-contact"
          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 active:bg-gray-100 transition-colors"
        >
          <div className="w-[52px] h-[52px] rounded-full bg-[#1DAB61] flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 5V19M5 12H19"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-[17px] text-black">New Contact</h3>
            <p className="text-[15px] text-[#667781]">Add a new contact</p>
          </div>
        </Link>

        <Link
          to="/contacts"
          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 active:bg-gray-100 transition-colors"
        >
          <div className="w-[52px] h-[52px] rounded-full bg-[#1DAB61] flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="12" cy="7" r="4" stroke="white" strokeWidth="2"/>
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-[17px] text-black">View Contacts</h3>
            <p className="text-[15px] text-[#667781]">Browse all contacts</p>
          </div>
        </Link>
      </div>

      {/* Contact List */}
      <div className="flex-1 overflow-y-auto">
        {whatsappContacts.length > 0 && (
          <div>
            <div className="px-4 py-2 bg-[#F0F2F5]">
              <span className="text-[14px] font-medium text-[#667781] uppercase tracking-wide">
                Contacts on WhatsApp
              </span>
            </div>
            {whatsappContacts.map(contact => (
              <ContactItem key={contact.id} contact={contact} />
            ))}
          </div>
        )}

        {nonWhatsappContacts.length > 0 && (
          <div>
            <div className="px-4 py-2 bg-[#F0F2F5]">
              <span className="text-[14px] font-medium text-[#667781] uppercase tracking-wide">
                Invite to WhatsApp
              </span>
            </div>
            {nonWhatsappContacts.map(contact => (
              <ContactItem key={contact.id} contact={contact} showInvite />
            ))}
          </div>
        )}

        {filteredContacts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 px-8">
            <div className="w-24 h-24 bg-[#F0F2F5] rounded-full flex items-center justify-center mb-4">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <path
                  d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                  stroke="#667781"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="7" r="4" stroke="#667781" strokeWidth="2"/>
              </svg>
            </div>
            <h3 className="text-[20px] font-medium text-[#667781] mb-2">
              No contacts found
            </h3>
            <p className="text-[16px] text-[#667781] text-center leading-relaxed">
              Try searching for something else or add a new contact
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
