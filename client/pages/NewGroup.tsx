import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StatusBar from "../components/StatusBar";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

interface Contact {
  id: string;
  name: string;
  phone: string;
  avatar: string;
  isSelected: boolean;
}

const mockContacts: Contact[] = [
  {
    id: "1",
    name: "Marty McFly",
    phone: "+1 555-0123",
    avatar:
      "https://api.builder.io/api/v1/image/assets/TEMP/7a8c2c85?width=116",
    isSelected: false,
  },
  {
    id: "2",
    name: "Doc Brown",
    phone: "+1 555-0124",
    avatar:
      "https://api.builder.io/api/v1/image/assets/TEMP/4c4a5af127d840b7402719dbbfdd77f20d2b99a7?width=116",
    isSelected: false,
  },
  {
    id: "3",
    name: "Jennifer Parker",
    phone: "+1 555-0125",
    avatar:
      "https://api.builder.io/api/v1/image/assets/TEMP/2f74a7b374d94e89d563d84ba3c9febd0fc2b66c?width=116",
    isSelected: false,
  },
  {
    id: "4",
    name: "George McFly",
    phone: "+1 555-0127",
    avatar:
      "https://api.builder.io/api/v1/image/assets/TEMP/george-avatar?width=116",
    isSelected: false,
  },
  {
    id: "5",
    name: "Lorraine Baines",
    phone: "+1 555-0128",
    avatar:
      "https://api.builder.io/api/v1/image/assets/TEMP/lorraine-avatar?width=116",
    isSelected: false,
  },
];

export default function NewGroup() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"participants" | "details">("participants");
  const [contacts, setContacts] = useState<Contact[]>(mockContacts);
  const [searchQuery, setSearchQuery] = useState("");
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.phone.includes(searchQuery),
  );

  const selectedContacts = contacts.filter((contact) => contact.isSelected);

  const toggleContactSelection = (contactId: string) => {
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === contactId
          ? { ...contact, isSelected: !contact.isSelected }
          : contact,
      ),
    );
  };

  const handleNext = () => {
    if (selectedContacts.length > 0) {
      setStep("details");
    }
  };

  const handleCreateGroup = () => {
    // TODO: Implement group creation
    console.log("Creating group:", {
      name: groupName,
      description: groupDescription,
      participants: selectedContacts,
    });
    navigate("/chats");
  };

  if (step === "details") {
    return (
      <div className="w-full max-w-[393px] h-screen flex flex-col bg-white relative overflow-hidden">
        <StatusBar />

        {/* Header */}
        <div className="flex items-center gap-4 px-4 py-3 bg-[#1DAB61]">
          <button
            onClick={() => setStep("participants")}
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
          <h1 className="text-[20px] font-semibold text-white">New Group</h1>
        </div>

        {/* Group Details Form */}
        <div className="flex-1 overflow-y-auto">
          {/* Group Photo Section */}
          <div className="flex items-center gap-4 px-4 py-6 border-b border-gray-100">
            <button className="w-16 h-16 bg-[#F0F2F5] rounded-full flex items-center justify-center hover:bg-[#E0E0E0] transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
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
            </button>
            <div className="flex-1">
              <Input
                placeholder="Group name (required)"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="text-[18px] font-medium border-none p-0 focus:ring-0"
              />
            </div>
          </div>

          {/* Group Description */}
          <div className="px-4 py-4 border-b border-gray-100">
            <textarea
              placeholder="Group description (optional)"
              value={groupDescription}
              onChange={(e) => setGroupDescription(e.target.value)}
              className="w-full text-[16px] text-[#667781] border-none p-0 resize-none focus:outline-none"
              rows={3}
            />
          </div>

          {/* Participants */}
          <div>
            <div className="px-4 py-3 bg-[#F0F2F5]">
              <span className="text-[14px] font-medium text-[#667781] uppercase tracking-wide">
                Participants ({selectedContacts.length})
              </span>
            </div>
            {selectedContacts.map((contact) => (
              <div
                key={contact.id}
                className="flex items-center gap-3 px-4 py-3"
              >
                <div className="w-[48px] h-[48px] rounded-full overflow-hidden bg-gray-300">
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
                <div className="flex-1">
                  <h3 className="font-medium text-[17px] text-black">
                    {contact.name}
                  </h3>
                  <p className="text-[15px] text-[#667781]">{contact.phone}</p>
                </div>
                <button
                  onClick={() => toggleContactSelection(contact.id)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M18 6L6 18M6 6L18 18"
                      stroke="#F44336"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Create Button */}
        <div className="p-4 border-t border-gray-100">
          <Button
            onClick={handleCreateGroup}
            disabled={!groupName.trim()}
            className="w-full bg-[#1DAB61] hover:bg-[#169954] text-white h-12 rounded-lg disabled:opacity-50"
          >
            Create Group
          </Button>
        </div>
      </div>
    );
  }

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
        <h1 className="text-[20px] font-semibold text-black">New Group</h1>
        <div className="flex-1"></div>
        {selectedContacts.length > 0 && (
          <button
            onClick={handleNext}
            className="text-[16px] font-medium text-[#1DAB61]"
          >
            Next
          </button>
        )}
      </div>

      {/* Selected Contacts Preview */}
      {selectedContacts.length > 0 && (
        <div className="px-4 py-3 bg-[#F0F2F5] border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-[14px] font-medium text-[#667781]">
              {selectedContacts.length} selected:
            </span>
            <div className="flex-1 flex gap-2 overflow-x-auto">
              {selectedContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-center gap-1 bg-white rounded-full px-2 py-1 flex-shrink-0"
                >
                  <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-300">
                    <img
                      src={contact.avatar}
                      alt={contact.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-[12px] text-black">
                    {contact.name.split(" ")[0]}
                  </span>
                  <button
                    onClick={() => toggleContactSelection(contact.id)}
                    className="w-4 h-4 rounded-full hover:bg-gray-100 flex items-center justify-center"
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
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
              ))}
            </div>
          </div>
        </div>
      )}

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
        <div className="px-4 py-2 bg-[#F0F2F5]">
          <span className="text-[14px] font-medium text-[#667781] uppercase tracking-wide">
            Contacts
          </span>
        </div>

        {filteredContacts.map((contact) => (
          <button
            key={contact.id}
            onClick={() => toggleContactSelection(contact.id)}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
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

            <div className="flex-1 text-left">
              <h3 className="font-semibold text-[17px] text-black">
                {contact.name}
              </h3>
              <p className="text-[15px] text-[#667781]">{contact.phone}</p>
            </div>

            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                contact.isSelected
                  ? "bg-[#1DAB61] border-[#1DAB61]"
                  : "border-[#CCCCCC]"
              }`}
            >
              {contact.isSelected && (
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
              Try searching for something else
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
