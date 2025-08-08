import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import StatusBar from "../components/StatusBar";

interface Contact {
  id: string;
  name: string;
  phone: string;
  avatar: string;
  isOnWhatsApp: boolean;
  lastSeen?: string;
  about?: string;
  isBlocked?: boolean;
}

const mockContacts: Contact[] = [
  {
    id: "1",
    name: "Marty McFly",
    phone: "+1 555-0123",
    avatar:
      "https://api.builder.io/api/v1/image/assets/TEMP/7a8c2c85?width=116",
    isOnWhatsApp: true,
    lastSeen: "online",
    about: "Just a regular teenager... from 1985",
  },
  {
    id: "2",
    name: "Doc Brown",
    phone: "+1 555-0124",
    avatar:
      "https://api.builder.io/api/v1/image/assets/TEMP/4c4a5af127d840b7402719dbbfdd77f20d2b99a7?width=116",
    isOnWhatsApp: true,
    lastSeen: "last seen today at 2:30 PM",
    about: "Great Scott! 1.21 gigawatts!",
  },
  {
    id: "3",
    name: "Jennifer Parker",
    phone: "+1 555-0125",
    avatar:
      "https://api.builder.io/api/v1/image/assets/TEMP/2f74a7b374d94e89d563d84ba3c9febd0fc2b66c?width=116",
    isOnWhatsApp: true,
    lastSeen: "online",
    about: "Living life one day at a time",
  },
  {
    id: "4",
    name: "Biff Tannen",
    phone: "+1 555-0126",
    avatar:
      "https://api.builder.io/api/v1/image/assets/TEMP/biff-avatar?width=116",
    isOnWhatsApp: true,
    lastSeen: "last seen yesterday at 11:45 AM",
    about: "Make like a tree and get out of here!",
    isBlocked: true,
  },
  {
    id: "5",
    name: "George McFly",
    phone: "+1 555-0127",
    avatar:
      "https://api.builder.io/api/v1/image/assets/TEMP/george-avatar?width=116",
    isOnWhatsApp: true,
    lastSeen: "last seen today at 10:15 AM",
    about: "Writer and dreamer",
  },
];

export default function Contacts() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredContacts = mockContacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.phone.includes(searchQuery),
  );

  const whatsappContacts = filteredContacts.filter(
    (contact) => contact.isOnWhatsApp && !contact.isBlocked,
  );
  const blockedContacts = filteredContacts.filter(
    (contact) => contact.isBlocked,
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
        <h1 className="text-[20px] font-semibold text-black">Contacts</h1>
        <div className="flex-1"></div>
        <Link
          to="/new-contact"
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
            <path
              d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
              stroke="#667781"
              strokeWidth="2"
              fill="none"
            />
            <path d="M21 21L16.65 16.65" stroke="#667781" strokeWidth="2" />
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

      {/* Contact List */}
      <div className="flex-1 overflow-y-auto">
        {whatsappContacts.length > 0 && (
          <div>
            <div className="px-4 py-2 bg-[#F0F2F5]">
              <span className="text-[14px] font-medium text-[#667781] uppercase tracking-wide">
                Contacts ({whatsappContacts.length})
              </span>
            </div>
            {whatsappContacts.map((contact) => (
              <Link
                key={contact.id}
                to={`/contact/${contact.id}`}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 active:bg-gray-100 transition-colors"
              >
                <div className="relative">
                  <div className="w-[52px] h-[52px] rounded-full overflow-hidden bg-gray-300">
                    <img
                      src={contact.avatar}
                      alt={contact.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://api.builder.io/api/v1/image/assets/placeholder-avatar";
                      }}
                    />
                  </div>
                  {contact.lastSeen === "online" && (
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#1DAB61] border-2 border-white rounded-full"></div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-[17px] text-black truncate mb-1">
                    {contact.name}
                  </h3>
                  <p className="text-[15px] text-[#667781] truncate">
                    {contact.about || contact.phone}
                  </p>
                  {contact.lastSeen && (
                    <p className="text-[13px] text-[#667781] truncate">
                      {contact.lastSeen}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/chat/${contact.id}`);
                    }}
                    className="p-2 rounded-full bg-[#1DAB61] hover:bg-[#169954] transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.60565 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47086C20.0052 6.94694 20.885 8.91568 21 11V11.5Z"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="white"
                      />
                    </svg>
                  </button>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = `tel:${contact.phone}`;
                    }}
                    className="p-2 rounded-full bg-[#667781] hover:bg-[#4a5568] transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.18999 12.85C3.49997 10.2412 2.44824 7.27099 2.11999 4.18C2.095 3.90347 2.12787 3.62476 2.21649 3.36162C2.30512 3.09849 2.44756 2.85669 2.63476 2.65162C2.82196 2.44655 3.0498 2.28271 3.30379 2.17052C3.55777 2.05833 3.83233 2.00026 4.10999 2H7.10999C7.59531 1.99522 8.06606 2.16708 8.43376 2.48353C8.80145 2.79999 9.04207 3.23945 9.10999 3.72C9.23662 4.68007 9.47144 5.62273 9.80999 6.53C9.94454 6.88792 9.97366 7.27691 9.8939 7.65088C9.81415 8.02485 9.62886 8.36811 9.35999 8.64L8.08999 9.91C9.51355 12.4135 11.5865 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9751 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0555 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </Link>
            ))}
          </div>
        )}

        {blockedContacts.length > 0 && (
          <div>
            <div className="px-4 py-2 bg-[#FFEBEE]">
              <span className="text-[14px] font-medium text-[#F44336] uppercase tracking-wide">
                Blocked ({blockedContacts.length})
              </span>
            </div>
            {blockedContacts.map((contact) => (
              <div
                key={contact.id}
                className="flex items-center gap-3 px-4 py-3 opacity-60"
              >
                <div className="w-[52px] h-[52px] rounded-full overflow-hidden bg-gray-300">
                  <img
                    src={contact.avatar}
                    alt={contact.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://api.builder.io/api/v1/image/assets/placeholder-avatar";
                    }}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-[17px] text-black truncate mb-1">
                    {contact.name}
                  </h3>
                  <p className="text-[15px] text-[#F44336] truncate">
                    Blocked contact
                  </p>
                </div>

                <button className="px-3 py-1 bg-[#1DAB61] text-white text-[14px] font-medium rounded-full hover:bg-[#169954] transition-colors">
                  Unblock
                </button>
              </div>
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
                <circle cx="12" cy="7" r="4" stroke="#667781" strokeWidth="2" />
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
