import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import StatusBar from "../components/StatusBar";

interface SearchResult {
  id: string;
  type: "chat" | "contact" | "message";
  title: string;
  subtitle: string;
  avatar?: string;
  chatId?: string;
  timestamp?: string;
  messagePreview?: string;
}

const mockSearchResults: SearchResult[] = [
  {
    id: "1",
    type: "chat",
    title: "Marty McFly",
    subtitle: "Great Scott! We need to get back to 1985!",
    avatar:
      "https://api.builder.io/api/v1/image/assets/TEMP/7a8c2c85?width=116",
    chatId: "1",
  },
  {
    id: "2",
    type: "contact",
    title: "Doc Brown",
    subtitle: "+1 555-0124",
    avatar:
      "https://api.builder.io/api/v1/image/assets/TEMP/4c4a5af127d840b7402719dbbfdd77f20d2b99a7?width=116",
    chatId: "2",
  },
  {
    id: "3",
    type: "message",
    title: "Jennifer Parker",
    subtitle: "In Jennifer Parker",
    avatar:
      "https://api.builder.io/api/v1/image/assets/TEMP/2f74a7b374d94e89d563d84ba3c9febd0fc2b66c?width=116",
    chatId: "3",
    timestamp: "2:30 PM",
    messagePreview: "Are we still on for tonight? I was thinking we could...",
  },
  {
    id: "4",
    type: "message",
    title: "Hill Valley High School",
    subtitle: "In Hill Valley High School group",
    avatar:
      "https://api.builder.io/api/v1/image/assets/TEMP/school-avatar?width=116",
    chatId: "8",
    timestamp: "Yesterday",
    messagePreview:
      "Welcome to the class of 1985! Please review the upcoming...",
  },
];

export default function Search() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState([
    "Great Scott",
    "DeLorean",
    "1985",
    "Jennifer",
  ]);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (searchQuery.trim()) {
      setIsSearching(true);
      // Simulate search delay
      const timer = setTimeout(() => {
        const filtered = mockSearchResults.filter(
          (result) =>
            result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            result.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
            result.messagePreview
              ?.toLowerCase()
              .includes(searchQuery.toLowerCase()),
        );
        setSearchResults(filtered);
        setIsSearching(false);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Add to recent searches if not already there
    if (query.trim() && !recentSearches.includes(query)) {
      setRecentSearches((prev) => [query, ...prev.slice(0, 9)]);
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case "chat":
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.60565 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47086C20.0052 6.94694 20.885 8.91568 21 11V11.5Z"
              stroke="#1DAB61"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      case "contact":
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
              stroke="#667781"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="12" cy="7" r="4" stroke="#667781" strokeWidth="2" />
          </svg>
        );
      case "message":
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 18V12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12V18"
              stroke="#667781"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21 19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H18C17.4696 21 16.9609 20.7893 16.5858 20.4142C16.2107 20.0391 16 19.5304 16 19V16C16 15.4696 16.2107 14.9609 16.5858 14.5858C16.9609 14.2107 17.4696 14 18 14H21V19Z"
              stroke="#667781"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H6C6.53043 21 7.03914 20.7893 7.41421 20.4142C7.78929 20.0391 8 19.5304 8 19V16C8 15.4696 7.78929 14.9609 7.41421 14.5858C7.03914 14.2107 6.53043 14 6 14H3V19Z"
              stroke="#667781"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      default:
        return null;
    }
  };

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
        <h1 className="text-[20px] font-semibold text-black">Search</h1>
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
            placeholder="Search chats and messages"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#F0F2F5] rounded-lg pl-10 pr-4 py-3 text-[16px] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#1DAB61]"
            autoFocus
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-200 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="#667781"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {!searchQuery.trim() && (
          <div>
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div>
                <div className="flex items-center justify-between px-4 py-3 bg-[#F0F2F5]">
                  <span className="text-[14px] font-medium text-[#667781] uppercase tracking-wide">
                    Recent Searches
                  </span>
                  <button
                    onClick={clearRecentSearches}
                    className="text-[14px] text-[#1DAB61] font-medium"
                  >
                    Clear All
                  </button>
                </div>
                <div className="px-4 py-2">
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearch(search)}
                        className="px-3 py-2 bg-[#F0F2F5] rounded-full text-[14px] text-[#667781] hover:bg-[#E3F2FD] transition-colors"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Search Tips */}
            <div className="px-4 py-8">
              <div className="text-center">
                <div className="w-24 h-24 bg-[#F0F2F5] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                      stroke="#667781"
                      strokeWidth="2"
                    />
                    <path
                      d="M21 21L16.65 16.65"
                      stroke="#667781"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <h3 className="text-[18px] font-medium text-[#667781] mb-2">
                  Search WhatsApp
                </h3>
                <p className="text-[14px] text-[#667781] leading-relaxed">
                  Find messages, contacts, and chats quickly
                </p>
              </div>
            </div>
          </div>
        )}

        {searchQuery.trim() && isSearching && (
          <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 border-2 border-[#1DAB61] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {searchQuery.trim() && !isSearching && (
          <div>
            {searchResults.length > 0 ? (
              <div>
                <div className="px-4 py-2 bg-[#F0F2F5]">
                  <span className="text-[14px] font-medium text-[#667781] uppercase tracking-wide">
                    Results ({searchResults.length})
                  </span>
                </div>
                {searchResults.map((result) => (
                  <Link
                    key={result.id}
                    to={
                      result.chatId
                        ? `/chat/${result.chatId}`
                        : `/contact/${result.id}`
                    }
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 active:bg-gray-100 transition-colors"
                  >
                    <div className="relative">
                      {result.avatar ? (
                        <div className="w-[52px] h-[52px] rounded-full overflow-hidden bg-gray-300">
                          <img
                            src={result.avatar}
                            alt={result.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://api.builder.io/api/v1/image/assets/placeholder-avatar";
                            }}
                          />
                        </div>
                      ) : (
                        <div className="w-[52px] h-[52px] rounded-full bg-[#F0F2F5] flex items-center justify-center">
                          {getResultIcon(result.type)}
                        </div>
                      )}
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center border border-gray-200">
                        {getResultIcon(result.type)}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-[17px] text-black truncate">
                          {result.title}
                        </h3>
                        {result.timestamp && (
                          <span className="text-[13px] text-[#667781] flex-shrink-0 ml-2">
                            {result.timestamp}
                          </span>
                        )}
                      </div>
                      <p className="text-[15px] text-[#667781] truncate">
                        {result.messagePreview || result.subtitle}
                      </p>
                      {result.type === "message" && result.subtitle && (
                        <p className="text-[13px] text-[#1DAB61] truncate">
                          {result.subtitle}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 px-8">
                <div className="w-24 h-24 bg-[#F0F2F5] rounded-full flex items-center justify-center mb-4">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                      stroke="#667781"
                      strokeWidth="2"
                    />
                    <path
                      d="M21 21L16.65 16.65"
                      stroke="#667781"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <h3 className="text-[20px] font-medium text-[#667781] mb-2">
                  No results found
                </h3>
                <p className="text-[16px] text-[#667781] text-center leading-relaxed">
                  Try searching for something else or check your spelling
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
