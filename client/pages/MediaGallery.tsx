import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StatusBar from "../components/StatusBar";

interface MediaItem {
  id: string;
  type: "photo" | "video" | "document";
  url: string;
  thumbnail?: string;
  filename?: string;
  size?: string;
  date: string;
  sender: string;
}

const mockMediaItems: MediaItem[] = [
  {
    id: "1",
    type: "photo",
    url: "https://api.builder.io/api/v1/image/assets/TEMP/delorean-photo?width=400",
    date: "Today",
    sender: "Doc Brown",
  },
  {
    id: "2",
    type: "video",
    url: "https://api.builder.io/api/v1/image/assets/TEMP/time-travel-video?width=400",
    thumbnail:
      "https://api.builder.io/api/v1/image/assets/TEMP/video-thumb?width=400",
    date: "Today",
    sender: "Marty McFly",
  },
  {
    id: "3",
    type: "photo",
    url: "https://api.builder.io/api/v1/image/assets/TEMP/hill-valley-photo?width=400",
    date: "Yesterday",
    sender: "Jennifer Parker",
  },
  {
    id: "4",
    type: "document",
    url: "/flux-capacitor-plans.pdf",
    filename: "Flux Capacitor Plans.pdf",
    size: "2.4 MB",
    date: "Yesterday",
    sender: "Doc Brown",
  },
  {
    id: "5",
    type: "photo",
    url: "https://api.builder.io/api/v1/image/assets/TEMP/clock-tower-photo?width=400",
    date: "Monday",
    sender: "George McFly",
  },
  {
    id: "6",
    type: "video",
    url: "https://api.builder.io/api/v1/image/assets/TEMP/skateboard-video?width=400",
    thumbnail:
      "https://api.builder.io/api/v1/image/assets/TEMP/skateboard-thumb?width=400",
    date: "Monday",
    sender: "Marty McFly",
  },
];

export default function MediaGallery() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<"media" | "docs" | "links">(
    "media",
  );
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);

  const mediaItems = mockMediaItems.filter(
    (item) => item.type === "photo" || item.type === "video",
  );
  const documents = mockMediaItems.filter((item) => item.type === "document");

  const toggleItemSelection = (itemId: string) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId],
    );
  };

  const MediaGridItem: React.FC<{ item: MediaItem }> = ({ item }) => (
    <div className="relative aspect-square">
      {isSelectionMode && (
        <button
          onClick={() => toggleItemSelection(item.id)}
          className={`absolute top-2 right-2 w-6 h-6 rounded-full border-2 flex items-center justify-center z-10 ${
            selectedItems.includes(item.id)
              ? "bg-[#1DAB61] border-[#1DAB61]"
              : "bg-white/80 border-white"
          }`}
        >
          {selectedItems.includes(item.id) && (
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

      <div
        className="w-full h-full bg-gray-200 rounded overflow-hidden cursor-pointer"
        onClick={() => {
          if (isSelectionMode) {
            toggleItemSelection(item.id);
          } else {
            // TODO: Open media viewer
          }
        }}
      >
        <img
          src={item.thumbnail || item.url}
          alt=""
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src =
              "https://api.builder.io/api/v1/image/assets/placeholder-media";
          }}
        />

        {item.type === "video" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <polygon points="5,3 19,12 5,21 5,3" fill="white" />
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const DocumentItem: React.FC<{ item: MediaItem }> = ({ item }) => (
    <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors">
      <div className="w-12 h-12 bg-[#1DAB61] rounded-lg flex items-center justify-center flex-shrink-0">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
            stroke="white"
            strokeWidth="2"
          />
          <polyline points="14,2 14,8 20,8" stroke="white" strokeWidth="2" />
        </svg>
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-[17px] text-black truncate">
          {item.filename}
        </h3>
        <p className="text-[15px] text-[#667781]">
          {item.size} • {item.date} • {item.sender}
        </p>
      </div>

      <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 2.58579 20.4142C2.21071 20.0391 2 19.5304 2 19V15"
            stroke="#667781"
            strokeWidth="2"
          />
          <polyline
            points="7,10 12,15 17,10"
            stroke="#667781"
            strokeWidth="2"
          />
          <line
            x1="12"
            y1="15"
            x2="12"
            y2="3"
            stroke="#667781"
            strokeWidth="2"
          />
        </svg>
      </button>
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
          <h1 className="text-[20px] font-semibold text-black">
            {isSelectionMode
              ? `${selectedItems.length} selected`
              : "Media Gallery"}
          </h1>
        </div>

        {isSelectionMode ? (
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 16.5V18.75C3 19.9926 4.00736 21 5.25 21H18.75C19.9926 21 21 19.9926 21 18.75V16.5M16.5 12L12 16.5M12 16.5L7.5 12M12 16.5V3"
                  stroke="#667781"
                  strokeWidth="2"
                />
              </svg>
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 12V12.01M12 12V12.01M20 12V12.01M4 6V6.01M12 6V6.01M20 6V6.01M4 18V18.01M12 18V18.01M20 18V18.01"
                  stroke="#667781"
                  strokeWidth="2"
                />
              </svg>
            </button>
            <button
              onClick={() => {
                setIsSelectionMode(false);
                setSelectedItems([]);
              }}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="#667781"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsSelectionMode(true)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="5" r="1" fill="#667781" />
              <circle cx="12" cy="12" r="1" fill="#667781" />
              <circle cx="12" cy="19" r="1" fill="#667781" />
            </svg>
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex bg-white border-b border-gray-100">
        <button
          onClick={() => setActiveTab("media")}
          className={`flex-1 py-3 text-center text-[16px] font-medium ${
            activeTab === "media"
              ? "text-[#1DAB61] border-b-2 border-[#1DAB61]"
              : "text-[#667781]"
          }`}
        >
          Media ({mediaItems.length})
        </button>
        <button
          onClick={() => setActiveTab("docs")}
          className={`flex-1 py-3 text-center text-[16px] font-medium ${
            activeTab === "docs"
              ? "text-[#1DAB61] border-b-2 border-[#1DAB61]"
              : "text-[#667781]"
          }`}
        >
          Docs ({documents.length})
        </button>
        <button
          onClick={() => setActiveTab("links")}
          className={`flex-1 py-3 text-center text-[16px] font-medium ${
            activeTab === "links"
              ? "text-[#1DAB61] border-b-2 border-[#1DAB61]"
              : "text-[#667781]"
          }`}
        >
          Links (3)
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "media" && (
          <div className="p-2">
            <div className="grid grid-cols-3 gap-1">
              {mediaItems.map((item) => (
                <MediaGridItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        )}

        {activeTab === "docs" && (
          <div>
            {documents.map((doc) => (
              <DocumentItem key={doc.id} item={doc} />
            ))}
          </div>
        )}

        {activeTab === "links" && (
          <div className="flex flex-col items-center justify-center py-16 px-8">
            <div className="w-24 h-24 bg-[#F0F2F5] rounded-full flex items-center justify-center mb-4">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <path
                  d="M10 13C10.4295 13.5741 10.9774 14.0491 11.6066 14.3929C12.2357 14.7367 12.9315 14.9411 13.6467 14.9923C14.3618 15.0435 15.0796 14.9403 15.7513 14.6897C16.4231 14.4392 17.0331 14.047 17.54 13.54L20.54 10.54C21.4508 9.59695 21.9548 8.33394 21.9434 7.02296C21.932 5.71198 21.4061 4.45791 20.4791 3.53087C19.5521 2.60383 18.298 2.07799 16.987 2.0666C15.676 2.0552 14.413 2.55918 13.47 3.47L11.75 5.18"
                  stroke="#667781"
                  strokeWidth="2"
                />
                <path
                  d="M14 11C13.5705 10.4259 13.0226 9.95085 12.3934 9.60706C11.7643 9.26327 11.0685 9.05885 10.3533 9.00769C9.63819 8.95653 8.92037 9.05971 8.24860 9.31026C7.57682 9.56081 6.96687 9.95301 6.46 10.46L3.46 13.46C2.54918 14.403 2.04520 15.6661 2.05660 16.977C2.06799 18.288 2.59383 19.5421 3.52087 20.4691C4.44791 21.3962 5.70198 21.922 7.01296 21.9334C8.32394 21.9448 9.58695 21.4408 10.53 20.53L12.24 18.82"
                  stroke="#667781"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <h3 className="text-[20px] font-medium text-[#667781] mb-2">
              No links yet
            </h3>
            <p className="text-[16px] text-[#667781] text-center leading-relaxed">
              Links shared in this chat will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
