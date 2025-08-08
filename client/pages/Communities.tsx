import StatusBar from "../components/StatusBar";
import TabBar from "../components/TabBar";

export default function Communities() {
  return (
    <div className="w-full max-w-[393px] h-screen flex flex-col bg-white relative overflow-hidden text-rendering-optimized">
      <StatusBar />

      {/* Header with add button only */}
      <div className="flex justify-end items-end px-4 py-2 h-[98px]">
        <button className="w-7 h-7 rounded-full bg-[#1DAB61] flex items-center justify-center touch-target hover:bg-[#169954] transition-colors">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7 1C7 0.447715 6.55228 0 6 0C5.44772 0 5 0.447715 5 1V5H1C0.447715 5 0 5.44772 0 6C0 6.55228 0.447715 7 1 7H5V11C5 11.5523 5.44772 12 6 12C6.55228 12 7 11.5523 7 11V7H11C11.5523 7 12 6.55228 12 6C12 5.44772 11.5523 5 11 5H7V1Z"
              fill="white"
            />
          </svg>
        </button>
      </div>

      {/* Title */}
      <div className="px-4 pb-2">
        <h1 className="text-[33px] font-bold text-black tracking-[-1.33px] leading-none">
          Communities
        </h1>
      </div>

      {/* Content Container */}
      <div className="flex-1 pt-[22px] pb-[83px] px-4 flex flex-col items-center gap-[18px]">
        {/* Illustration */}
        <div className="w-[162px] h-[151px]">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F58a45ac74f684c229db5d48c4fd195ba%2F7e501a19f52c4857a925ed5e9a998f61?format=webp&width=324"
            alt="Communities illustration"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Content Section */}
        <div className="flex flex-col justify-center items-start gap-[10px] w-full">
          {/* Title */}
          <div className="w-full">
            <h2 className="text-[20px] font-normal text-black tracking-[-0.3px] leading-none">
              Stay connected with a community
            </h2>
          </div>

          {/* Description */}
          <div className="w-full">
            <p className="text-base font-normal text-[#767779] tracking-[-0.32px] leading-[21px]">
              Communities bring members together in topic-based groups. Any
              community you're added to will appear here.
            </p>
          </div>

          {/* Link */}
          <button className="flex justify-center items-center gap-[2px] w-full hover:bg-gray-50 active:bg-gray-100 transition-colors touch-target py-2">
            <span className="text-sm font-normal text-[#1DAB61] tracking-[-0.14px] leading-[19px]">
              See example communities
            </span>
            <div className="w-3 h-3 flex items-center justify-center">
              <svg
                width="5"
                height="9"
                viewBox="0 0 5 9"
                fill="none"
                className="fill-[#1DAB61]"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.57573 1.07564C0.810044 0.841324 1.18994 0.841324 1.42426 1.07564L5.42426 5.07564C5.65857 5.30995 5.65857 5.68985 5.42426 5.92417L1.42426 9.92417C1.18994 10.1585 0.810044 10.1585 0.57573 9.92417C0.341415 9.68985 0.341415 9.30995 0.57573 9.07564L4.15147 5.4999L0.57573 1.92417C0.341415 1.68985 0.341415 1.30995 0.57573 1.07564Z"
                  fill="#1DAB61"
                />
              </svg>
            </div>
          </button>

          {/* CTA Button */}
          <div className="pt-[30px] px-2 w-full">
            <button className="flex items-center justify-center gap-[6px] w-full bg-[#1DAB61] rounded-[14px] px-6 py-[10px] hover:bg-[#169954] active:bg-[#138a4a] transition-colors touch-target">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7 1C7 0.447715 6.55228 0 6 0C5.44772 0 5 0.447715 5 1V5H1C0.447715 5 0 5.44772 0 6C0 6.55228 0.447715 7 1 7H5V11C5 11.5523 5.44772 12 6 12C6.55228 12 7 11.5523 7 11V7H11C11.5523 7 12 6.55228 12 6C12 5.44772 11.5523 5 11 5H7V1Z"
                  fill="white"
                />
              </svg>
              <div className="flex items-center justify-center py-[2.5px]">
                <span className="text-base font-semibold text-white tracking-[-0.32px] leading-none">
                  New Community
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <TabBar activeTab="communities" />
    </div>
  );
}
