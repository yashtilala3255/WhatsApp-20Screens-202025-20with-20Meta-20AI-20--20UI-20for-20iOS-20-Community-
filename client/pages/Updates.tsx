import { Link } from "react-router-dom";
import StatusBar from "../components/StatusBar";
import TabBar from "../components/TabBar";

export default function Updates() {
  return (
    <div className="w-full max-w-[393px] h-screen flex flex-col bg-white relative overflow-hidden text-rendering-optimized">
      <StatusBar />

      {/* Header with options menu */}
      <div className="flex justify-end items-end px-4 py-2 h-[98px]">
        <button className="w-7 h-7 rounded-full bg-black/5 flex items-center justify-center touch-target hover:bg-black/10 transition-colors">
          <svg width="15" height="3" viewBox="0 0 15 3" fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.5 1.5C3.5 2.32843 2.82843 3 2 3C1.17157 3 0.5 2.32843 0.5 1.5C0.5 0.671573 1.17157 0 2 0C2.82843 0 3.5 0.671573 3.5 1.5ZM8.5 1.5C8.5 2.32843 7.82843 3 7 3C6.17157 3 5.5 2.32843 5.5 1.5C5.5 0.671573 6.17157 0 7 0C7.82843 0 8.5 0.671573 8.5 1.5ZM12 3C12.8284 3 13.5 2.32843 13.5 1.5C13.5 0.671573 12.8284 0 12 0C11.1716 0 10.5 0.671573 10.5 1.5C10.5 2.32843 11.1716 3 12 3Z"
              fill="#0A0A0A"
            />
          </svg>
        </button>
      </div>

      {/* Title */}
      <div className="px-4 pb-2">
        <h1 className="text-[33px] font-bold text-black tracking-[-1.33px] leading-none">
          Updates
        </h1>
      </div>

      {/* Content Container */}
      <div className="flex-1 pt-[18px] pb-[83px] flex flex-col gap-6 custom-scrollbar overflow-y-auto">
        {/* Status Section */}
        <div className="flex flex-col gap-[13px]">
          <div className="px-4 h-[25px] flex items-center">
            <h2 className="text-[18px] font-semibold text-black tracking-[-0.18px]">
              Status
            </h2>
          </div>

          {/* My Status */}
          <button className="flex items-center gap-[9px] pl-[15px] hover:bg-gray-50 active:bg-gray-100 transition-colors">
            <div className="relative">
              <div className="w-[58px] h-[58px] rounded-full border-[0.33px] border-black/10 bg-gray-300 overflow-hidden">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/2f74a7b374d94e89d563d84ba3c9febd0fc2b66c?width=116"
                  alt="My profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-0 -right-0 w-5 h-5 bg-[#1DAB61] rounded-full flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7 1C7 0.447715 6.55228 0 6 0C5.44772 0 5 0.447715 5 1V5H1C0.447715 5 0 5.44772 0 6C0 6.55228 0.447715 7 1 7H5V11C5 11.5523 5.44772 12 6 12C6.55228 12 7 11.5523 7 11V7H11C11.5523 7 12 6.55228 12 6C12 5.44772 11.5523 5 11 5H7V1Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>

            <div className="flex-1 py-[18px] pr-4">
              <div className="flex flex-col gap-[1px] text-left">
                <div className="text-base font-semibold text-black tracking-[-0.32px]">
                  My status
                </div>
                <div className="text-sm text-[#767779] tracking-[-0.14px] leading-[19px]">
                  Add to my status
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 mr-4">
              <button className="w-9 h-9 rounded-full bg-black/5 flex items-center justify-center touch-target hover:bg-black/10 transition-colors">
                <svg width="21" height="17" viewBox="0 0 21 17" fill="none">
                  <path
                    d="M18 14V14C19.1046 14 20 13.1046 20 12V12C20 10.8954 19.1046 10 18 10V10"
                    stroke="#000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M18 10C16.8954 10 16 9.10457 16 8V8C16 6.89543 16.8954 6 18 6V6"
                    stroke="#000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <rect
                    x="1"
                    y="3"
                    width="16"
                    height="11"
                    rx="2"
                    stroke="#000"
                    strokeWidth="1.6"
                  />
                  <circle cx="14" cy="7" r="1" fill="#000" />
                </svg>
              </button>
              <button className="w-9 h-9 rounded-full bg-black/5 flex items-center justify-center touch-target hover:bg-black/10 transition-colors">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M11.5 4L4 11.5L2.5 10"
                    stroke="#000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2"
                    stroke="#000"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          </button>
        </div>

        {/* Recent Updates */}
        <div className="flex flex-col gap-2 pb-4">
          <div className="px-4">
            <h3 className="text-[#767779] text-[16px] font-semibold tracking-[-0.87px] leading-[19px]">
              Recent updates
            </h3>
          </div>

          <div className="flex flex-col">
            <Link
              to="/status/1"
              className="flex items-center gap-[9px] pl-[15px] hover:bg-gray-50 active:bg-gray-100 transition-colors touch-target"
            >
              <div className="w-[58px] h-[58px] rounded-full border-[0.33px] border-black/10 bg-gray-300 overflow-hidden">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/4c4a5af127d840b7402719dbbfdd77f20d2b99a7?width=116"
                  alt="Mr. Strickland"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 py-[18px] pr-4 relative">
                <div className="flex flex-col gap-[1px]">
                  <div className="text-base font-semibold text-black tracking-[-0.32px]">
                    Mr. Strickland
                  </div>
                  <div className="text-sm text-[#767779] tracking-[-0.14px] leading-[19px]">
                    4h ago
                  </div>
                </div>
                <div className="absolute bottom-0 right-4 w-[311px] h-[0.33px] bg-black/20"></div>
              </div>
            </Link>

            <Link
              to="/status/2"
              className="flex items-center gap-[9px] pl-[15px] hover:bg-gray-50 active:bg-gray-100 transition-colors touch-target"
            >
              <div className="w-[58px] h-[58px] rounded-full border-[0.33px] border-black/10 bg-gray-300 overflow-hidden">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/2f74a7b374d94e89d563d84ba3c9febd0fc2b66c?width=116"
                  alt="Jenny"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 py-[18px] pr-4">
                <div className="flex flex-col gap-[1px]">
                  <div className="text-base font-semibold text-black tracking-[-0.32px]">
                    Jenny ❤️
                  </div>
                  <div className="text-sm text-[#767779] tracking-[-0.14px] leading-[19px]">
                    9h ago
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Channels Section */}
        <div className="flex flex-col gap-[13px] h-[191px]">
          <div className="px-4 h-[25px] flex items-center">
            <h2 className="text-[18px] font-semibold text-black tracking-[-0.18px]">
              Channels
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            <div className="px-4">
              <p className="text-sm text-[#767779] tracking-[-0.14px] leading-[19px]">
                Stay updated on topics that matter to you. Find channels to
                follow below.
              </p>
            </div>

            <button className="px-4 flex items-center gap-[10px] hover:bg-gray-50 active:bg-gray-100 transition-colors touch-target">
              <div className="flex-1 text-left text-[#767779] text-[16px] font-semibold tracking-[-0.87px] leading-[19px]">
                Find channels to follow
              </div>
              <svg
                width="5"
                height="9"
                viewBox="0 0 5 9"
                className="transform rotate-90 fill-[#CCC]"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.4243 1.05574C4.65862 1.29006 4.65862 1.66995 4.4243 1.90427L0.4243 5.90427C0.18999 6.13858 -0.18991 6.13858 -0.42423 5.90427L-4.42423 1.90427C-4.65854 1.66995 -4.65854 1.29006 -4.42423 1.05574C-4.18991 0.821426 -3.81001 0.821426 -3.5757 1.05574L0.00004 4.63148L3.57577 1.05574C3.81009 0.821426 4.18999 0.821426 4.4243 1.05574Z"
                  fill="#CCCCCC"
                />
              </svg>
            </button>

            <div className="px-4">
              <button className="bg-[#1DAB61] text-white px-4 py-[9px] rounded-[19px] text-base font-semibold tracking-[-0.32px] hover:bg-[#169954] active:bg-[#138a4a] transition-colors touch-target">
                Explore more
              </button>
            </div>
          </div>
        </div>
      </div>

      <TabBar activeTab="updates" />
    </div>
  );
}
