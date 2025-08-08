import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import StatusBar from "../components/StatusBar";

interface ArchivedChat {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  avatar: string;
  unreadCount?: number;
  isGroup?: boolean;
  archivedAt: string;
}

const mockArchivedChats: ArchivedChat[] = [
  {
    id: "9",
    name: "Old School Friends",
    lastMessage: "Remember when we used to...",
    time: "2 weeks ago",
    avatar:
      "https://api.builder.io/api/v1/image/assets/TEMP/old-friends-avatar?width=116",
    isGroup: true,
    archivedAt: "2 weeks ago",
  },
  {
    id: "10",
    name: "Calvin Klein",
    lastMessage: "Thanks for the fashion advice!",
    time: "1 month ago",
    avatar:
      "https://api.builder.io/api/v1/image/assets/TEMP/calvin-avatar?width=116",
    archivedAt: "1 month ago",
  },
  {
    id: "11",
    name: "Needles",
    lastMessage: "Nobody calls me chicken!",
    time: "2 months ago",
    avatar:
      "https://api.builder.io/api/v1/image/assets/TEMP/needles-avatar?width=116",
    unreadCount: 2,
    archivedAt: "2 months ago",
  },
  {
    id: "12",
    name: "Mayor Wilson",
    lastMessage: "Hill Valley is looking great!",
    time: "3 months ago",
    avatar:
      "https://api.builder.io/api/v1/image/assets/TEMP/wilson-avatar?width=116",
    archivedAt: "3 months ago",
  },
  {
    id: "13",
    name: "Twin Pines Mall",
    lastMessage: "Security incident reported",
    time: "6 months ago",
    avatar:
      "https://api.builder.io/api/v1/image/assets/TEMP/mall-avatar?width=116",
    isGroup: true,
    archivedAt: "6 months ago",
  },
];

export default function Archive() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChats, setSelectedChats] = useState<string[]>([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);

  const filteredChats = mockArchivedChats.filter(
    (chat) =>
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const toggleChatSelection = (chatId: string) => {
    setSelectedChats((prev) =>
      prev.includes(chatId)
        ? prev.filter((id) => id !== chatId)
        : [...prev, chatId],
    );
  };

  const handleUnarchive = () => {
    // TODO: Implement unarchive functionality
    console.log("Unarchiving chats:", selectedChats);
    setSelectedChats([]);
    setIsSelectionMode(false);
  };

  const handleDelete = () => {
    // TODO: Implement delete functionality
    console.log("Deleting chats:", selectedChats);
    setSelectedChats([]);
    setIsSelectionMode(false);
  };

  const ArchivedChatItem: React.FC<{ chat: ArchivedChat }> = ({ chat }) => (
    <div
      className={`flex items-center gap-3 px-4 py-3 ${
        isSelectionMode ? "bg-gray-50" : "hover:bg-gray-50 active:bg-gray-100"
      } transition-colors`}
    >
      {isSelectionMode && (
        <button
          onClick={() => toggleChatSelection(chat.id)}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
            selectedChats.includes(chat.id)
              ? "bg-[#1DAB61] border-[#1DAB61]"
              : "border-[#CCCCCC]"
          }`}
        >
          {selectedChats.includes(chat.id) && (
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
        </button>
      )}

      <Link
        to={`/chat/${chat.id}`}
        className="flex items-center gap-3 flex-1"
        onClick={(e) => {
          if (isSelectionMode) {
            e.preventDefault();
            toggleChatSelection(chat.id);
          }
        }}
      >
        <div className="relative">
          <div className="w-[52px] h-[52px] rounded-full overflow-hidden bg-gray-300">
            <img
              src={chat.avatar}
              alt={chat.name}
              className="w-full h-full object-cover opacity-70"
              onError={(e) => {
                e.currentTarget.src =
                  "https://api.builder.io/api/v1/image/assets/placeholder-avatar";
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
                <circle cx="9" cy="7" r="4" stroke="white" strokeWidth="1.5" />
                <path
                  d="M23 11L20 8L17 11"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 8V16"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-[17px] text-[#667781] truncate">
              {chat.name}
            </h3>
            <span className="text-[13px] text-[#999999] flex-shrink-0">
              {chat.time}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-[15px] text-[#999999] truncate flex-1">
              {chat.lastMessage}
            </p>

            {chat.unreadCount && (
              <div className="ml-2 bg-[#667781] text-white text-[12px] font-medium px-2 py-1 rounded-full min-w-[20px] flex items-center justify-center">
                {chat.unreadCount > 99 ? "99+" : chat.unreadCount}
              </div>
            )}
          </div>

          <p className="text-[13px] text-[#CCCCCC] mt-1">
            Archived {chat.archivedAt}
          </p>
        </div>
      </Link>

      {!isSelectionMode && (
        <button
          onClick={() => {
            setSelectedChats([chat.id]);
            setIsSelectionMode(true);
          }}
          className="p-2 rounded-full hover:bg-gray-200 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="5" r="1" fill="#667781" />
            <circle cx="12" cy="12" r="1" fill="#667781" />
            <circle cx="12" cy="19" r="1" fill="#667781" />
          </svg>
        </button>
      )}
    </div>
  );

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
            <h1 className="text-[20px] font-semibold text-black">
              {isSelectionMode
                ? `${selectedChats.length} selected`
                : "Archived"}
            </h1>
            {!isSelectionMode && filteredChats.length > 0 && (
              <p className="text-[14px] text-[#667781]">
                {filteredChats.length} archived chats
              </p>
            )}
          </div>
        </div>

        {isSelectionMode ? (
          <div className="flex items-center gap-2">
            <button
              onClick={handleUnarchive}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              title="Unarchive"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 8V21H3V8"
                  stroke="#1DAB61"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 3H23L21 8H3L1 3Z"
                  stroke="#1DAB61"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 12L14 16L10 20"
                  stroke="#1DAB61"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              onClick={handleDelete}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              title="Delete"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 6H5H21"
                  stroke="#F44336"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6"
                  stroke="#F44336"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              onClick={() => {
                setIsSelectionMode(false);
                setSelectedChats([]);
              }}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="#667781"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate("/search")}
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
        )}
      </div>

      {/* Search Bar */}
      {!isSelectionMode && (
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
              placeholder="Search archived chats"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F0F2F5] rounded-lg pl-10 pr-4 py-2 text-[16px] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#1DAB61]"
            />
          </div>
        </div>
      )}

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.length > 0 ? (
          <div>
            {!isSelectionMode && (
              <div className="px-4 py-3 bg-[#FFF3E0] border-b border-[#FFE0B2]">
                <div className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                      stroke="#FF9800"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="text-[14px] text-[#E65100] leading-relaxed">
                    These chats are archived. Tap to unarchive them.
                  </p>
                </div>
              </div>
            )}

            {filteredChats.map((chat) => (
              <ArchivedChatItem key={chat.id} chat={chat} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-8">
            <div className="w-24 h-24 bg-[#F0F2F5] rounded-full flex items-center justify-center mb-4">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 8V21H3V8"
                  stroke="#667781"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 3H23L21 8H3L1 3Z"
                  stroke="#667781"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 12H14"
                  stroke="#667781"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="text-[20px] font-medium text-[#667781] mb-2">
              {searchQuery ? "No archived chats found" : "No archived chats"}
            </h3>
            <p className="text-[16px] text-[#667781] text-center leading-relaxed">
              {searchQuery
                ? "Try searching for something else"
                : "Swipe down on any chat in your main chat list to archive it"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
