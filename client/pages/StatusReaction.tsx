import { useNavigate } from "react-router-dom";
import StatusBar from "../components/StatusBar";

export default function StatusReaction() {
  const navigate = useNavigate();

  const emojis = [
    { emoji: "😍", label: "love" },
    { emoji: "😂", label: "laugh" },
    { emoji: "😮", label: "surprise" },
    { emoji: "😢", label: "sad" },
    { emoji: "🙏", label: "pray" },
    { emoji: "👏", label: "clap" },
    { emoji: "🎉", label: "party" },
    { emoji: "💯", label: "hundred" },
  ];

  return (
    <div className="w-[393px] mx-auto h-screen flex flex-col bg-black relative overflow-hidden">
      {/* Background blurred image */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-[28px]"
        style={{
          backgroundImage:
            "url('https://api.builder.io/api/v1/image/assets/TEMP/2f74a7b374d94e89d563d84ba3c9febd0fc2b66c?width=2242')",
          width: "1121px",
          height: "1592px",
          left: "-364px",
          bottom: "-387px",
        }}
      ></div>

      <StatusBar />

      {/* Top Contact Header */}
      <div className="flex flex-col justify-end h-[116px] p-1 pb-0 relative z-10">
        {/* Progress bars */}
        <div className="flex items-center gap-[2.66px] px-2 mb-2">
          <div className="flex-1 h-1 bg-white/51 rounded-sm relative">
            <div className="h-full bg-white rounded-sm"></div>
          </div>
          <div className="flex-1 h-1 bg-white/51 rounded-sm"></div>
          <div className="flex-1 h-1 bg-white/51 rounded-sm"></div>
        </div>

        {/* Contact info */}
        <div className="flex items-center gap-6 px-4 pb-0 pl-[6px]">
          <div className="flex items-center gap-1 flex-1">
            <button
              onClick={() => navigate(-1)}
              className="w-8 h-8 flex items-center justify-center"
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path
                  d="M18.5 24L10.5 16L18.5 8"
                  stroke="white"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className="flex items-center gap-3 flex-1">
              <div className="w-9 h-9 rounded-full overflow-hidden">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/4c4a5af127d840b7402719dbbfdd77f20d2b99a7?width=72"
                  alt="Mr. Strickland"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col flex-1">
                <div className="text-white text-[16px] font-semibold tracking-[-0.87px] leading-[19px] max-w-[145px] truncate">
                  Mr. Strickland
                </div>
                <div className="text-white text-[13px] font-semibold tracking-[-0.13px] leading-[15px]">
                  21:43
                </div>
              </div>
            </div>
          </div>

          <div className="w-6 h-6">
            <div className="w-5 h-5 bg-black opacity-20"></div>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="flex-1 pt-[18px] pb-0 flex flex-col items-center gap-6 relative z-10">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/4c4a5af127d840b7402719dbbfdd77f20d2b99a7?width=786"
          alt="Status content"
          className="h-[456px] w-full object-cover"
        />

        <div className="bg-white rounded-[26px] px-5 py-[10px]">
          <div
            className="text-black font-bold text-[28px] leading-none"
            style={{
              fontFamily:
                "Comic Sans MS, -apple-system, Roboto, Helvetica, sans-serif",
            }}
          >
            30 years ago...
          </div>
        </div>
      </div>

      {/* Reaction Overlay */}
      <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center z-20">
        <div className="flex flex-col items-center w-[242px] h-[141px] px-3">
          <div className="text-white text-center text-[16px] font-normal tracking-[-0.205px] leading-[21px] w-[218px] mb-4">
            Tap to Send
          </div>

          <div className="grid grid-cols-4 gap-x-6 gap-y-3 items-center justify-center">
            {emojis.map((item, index) => (
              <button
                key={index}
                onClick={() => navigate(-1)}
                className="text-[36px] leading-[47px] tracking-[-0.72px] hover:scale-110 transition-transform"
              >
                {item.emoji}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Input + Keyboard */}
      <div className="absolute bottom-0 w-full flex flex-col justify-end z-30">
        {/* Input bar with background */}
        <div className="relative">
          <div className="w-full h-[43px] bg-[#F5F2EB]/80 backdrop-blur-[25px]"></div>

          <div className="absolute inset-0 flex items-center gap-2 px-2 py-[5.5px]">
            {/* Plus button */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.9 1.49998C10.9 1.00292 10.497 0.599976 9.99998 0.599976C9.50292 0.599976 9.09998 1.00292 9.09998 1.49998V9.59997H0.999975C0.502918 9.59997 0.0999756 10.0029 0.0999756 10.5C0.0999756 10.997 0.502918 11.4 0.999975 11.4H9.09998V19.5C9.09998 19.997 9.50292 20.4 9.99998 20.4C10.497 20.4 10.9 19.997 10.9 19.5V11.4H19C19.497 11.4 19.9 10.997 19.9 10.5C19.9 10.0029 19.497 9.59998 19 9.59998H10.9V1.49998Z"
                    fill="#0A0A0A"
                  />
                </svg>
              </div>
            </div>

            {/* Input field */}
            <div className="flex items-end gap-4 flex-1 px-[9px] py-[3px] border-[0.33px] border-[#B2B2B2] bg-white rounded-[15px]">
              <div className="flex items-end gap-[-6px] flex-1 pb-[3px]">
                <div className="flex-1"></div>
              </div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.6155 2.90003L13.9359 2.90003C14.4593 2.90003 14.7592 2.90002 15.0179 2.92038C18.2543 3.1751 20.825 5.74572 21.0797 8.9822C21.1 9.24087 21.1 9.54075 21.1 10.0642V10.1376C21.1 10.938 21.1 11.3771 21.0704 11.7532C20.6999 16.4609 16.9609 20.1999 12.2532 20.5704C11.8771 20.6 11.438 20.6 10.6376 20.6H10.2524C9.5543 20.6 9.15436 20.6001 8.81015 20.5639C5.71097 20.2381 3.26192 17.7891 2.93619 14.6899C2.90001 14.3457 2.90002 13.9458 2.90003 13.2478L2.90003 11.6155C2.89993 9.6494 2.89987 8.52155 3.18423 7.58415C3.8241 5.47478 5.47478 3.8241 7.58415 3.18423C8.52155 2.89987 9.6494 2.89993 11.6155 2.90003Z"
                  fill="#0A0A0A"
                />
              </svg>
            </div>

            {/* Icons */}
            <div className="flex items-start gap-[7px] pl-[6px]">
              <div className="w-8 h-8 flex items-center justify-center">
                <svg width="24" height="18" viewBox="0 0 24 18" fill="none">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.3302 1.58094C8.80515 1.02209 9.50156 0.700012 10.235 0.700012H13.762C14.4954 0.700012 15.1918 1.02209 15.6668 1.58094L16.3484 2.38293C16.5193 2.58408 16.77 2.70001 17.034 2.70001H20.7499C22.4344 2.70001 23.7999 4.06554 23.7999 5.75001V15.75C23.7999 17.4345 22.4344 18.8 20.75 18.8H3.24995C1.56548 18.8 0.199951 17.4345 0.199951 15.75V5.75001C0.199951 4.06554 1.56548 2.70001 3.24995 2.70001H6.96302C7.227 2.70001 7.47766 2.58408 7.64861 2.38293L8.3302 1.58094Z"
                    fill="#0A0A0A"
                  />
                </svg>
              </div>
              <div className="w-8 h-8 flex items-center justify-center">
                <svg width="16" height="23" viewBox="0 0 16 23" fill="none">
                  <path
                    d="M8 15C10.2091 15 12 13.2091 12 11V4C12 1.79086 10.2091 0 8 0C5.79086 0 4 1.79086 4 4V11C4 13.2091 5.79086 15 8 15Z"
                    fill="#0A0A0A"
                  />
                  <path d="M7 18V23H9V18H7Z" fill="#0A0A0A" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Keyboard */}
        <div className="bg-gradient-to-b from-[#DEDEDE] via-[#DEDEDE] to-[#DEDEDE] backdrop-blur-[50px] pt-[3px]">
          {/* Autocorrection bar */}
          <div className="px-[1px] py-[3px] h-[39px]">
            <div className="flex items-center gap-[2px] h-[39px]">
              <div className="flex-1 bg-[#EBEDF0] rounded-[4.6px] h-[39px] flex items-center justify-center">
                <span className="text-black text-[17px] font-normal tracking-[-0.43px] leading-[22px]">
                  "The"
                </span>
              </div>
              <div className="px-[2px] h-[25px] flex items-center justify-center">
                <div className="w-[1px] h-full bg-black"></div>
              </div>
              <div className="flex-1 h-[39px] flex items-center justify-center">
                <span className="text-black text-[17px] font-normal tracking-[-0.43px] leading-[22px]">
                  the
                </span>
              </div>
              <div className="px-[2px] h-[25px] flex items-center justify-center">
                <div className="w-[1px] h-full bg-black opacity-10"></div>
              </div>
              <div className="flex-1 h-[39px] flex items-center justify-center">
                <span className="text-black text-[17px] font-normal tracking-[-0.43px] leading-[22px]">
                  to
                </span>
              </div>
            </div>
          </div>

          <div className="h-[5px] opacity-60"></div>

          {/* Keyboard layout */}
          <div className="h-[204px] relative">
            {/* Row 1 */}
            <div className="absolute top-0 left-[3px] flex items-start gap-[6px] w-[387px] h-[42px]">
              {["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"].map(
                (letter) => (
                  <div
                    key={letter}
                    className="flex-1 h-[42px] bg-[#FCFCFE] rounded-[4.6px] shadow-[0_1px_0_0_#898A8D] flex items-center justify-center relative"
                  >
                    <span className="text-black text-[25px] font-normal leading-[28px] absolute -top-[6px]">
                      {letter}
                    </span>
                  </div>
                ),
              )}
            </div>

            {/* Row 2 */}
            <div className="absolute top-[54px] left-[23px] flex items-start gap-[6px] w-[347px] h-[42px]">
              {["a", "s", "d", "f", "g", "h", "j", "k", "l"].map((letter) => (
                <div
                  key={letter}
                  className="flex-1 h-[42px] bg-[#FCFCFE] rounded-[4.6px] shadow-[0_1px_0_0_#898A8D] flex items-center justify-center relative"
                >
                  <span className="text-black text-[25px] font-normal leading-[28px] absolute -top-[6px]">
                    {letter}
                  </span>
                </div>
              ))}
            </div>

            {/* Row 3 */}
            <div className="absolute top-[108px] left-[3px] w-[44px] h-[42px] bg-[#ABB0BA] rounded-[4.6px] shadow-[0_1px_0_0_#898A8D] flex items-center justify-center">
              <span className="text-black text-[20px] font-normal leading-[28px]">
                ⇧
              </span>
            </div>

            <div className="absolute top-[108px] left-[62px] flex items-start gap-[6px] w-[269px] h-[42px]">
              {["z", "x", "c", "v", "b", "n", "m"].map((letter) => (
                <div
                  key={letter}
                  className="flex-1 h-[42px] bg-[#FCFCFE] rounded-[4.6px] shadow-[0_1px_0_0_#898A8D] flex items-center justify-center relative"
                >
                  <span className="text-black text-[25px] font-normal leading-[28px] absolute -top-[6px]">
                    {letter}
                  </span>
                </div>
              ))}
            </div>

            <div className="absolute top-[108px] right-[3px] w-[44px] h-[42px] bg-[#ABB0BA] rounded-[4.6px] shadow-[0_1px_0_0_#898A8D] flex items-center justify-center">
              <span className="text-black text-[20px] font-normal leading-[28px]">
                ⌫
              </span>
            </div>

            {/* Row 4 */}
            <div className="absolute top-[162px] left-[3px] w-[92px] h-[42px] bg-[#ABB0BA] rounded-[4.6px] shadow-[0_1px_0_0_#898A8D] flex items-center justify-center">
              <span className="text-black text-[16px] font-normal tracking-[-0.31px] leading-[21px]">
                ABC
              </span>
            </div>

            <div className="absolute top-[162px] left-[101px] w-[191px] h-[42px] bg-[#FCFCFE] rounded-[4.6px] shadow-[0_1px_0_0_#898A8D] flex items-center justify-center">
              <span className="text-black text-[16px] font-normal tracking-[-0.31px] leading-[21px]">
                space
              </span>
            </div>

            <div className="absolute top-[162px] right-[3px] w-[92px] h-[42px] bg-[#ABB0BA] rounded-[4.6px] shadow-[0_1px_0_0_#898A8D] flex items-center justify-center">
              <span className="text-black text-[16px] font-normal tracking-[-0.31px] leading-[21px]">
                return
              </span>
            </div>
          </div>

          {/* Emoji and Mic */}
          <div className="flex justify-between items-start px-5 pt-[25px] h-[58px]">
            <svg
              width="27"
              height="27"
              viewBox="0 0 27 27"
              fill="none"
              className="fill-[#3C3C43]/80"
            >
              <path
                d="M13.45 18.39C11.34 18.39 9.1 18.09 7.06 17.57C6.68 16.99 6.4 16.37 6.27 15.74C8.42 16.35 10.92 16.77 13.46 16.77C16 16.77 18.5 16.35 20.66 15.74C20.51 16.37 20.24 16.99 19.87 17.57C17.83 18.08 15.59 18.39 13.46 18.39H13.45Z"
                fill="#3C3C43"
                fillOpacity="0.8"
              />
            </svg>

            <div className="text-[#3C3C43]/80 text-[27px] font-normal">🎤</div>
          </div>

          {/* Home Indicator */}
          <div className="flex justify-center py-[21px] pb-2">
            <div className="w-[139px] h-[5px] bg-black rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
