import React from "react";
import StatusBar from "../components/StatusBar";

const ToggleSwitch: React.FC<{ active?: boolean; onChange?: () => void }> = ({
  active = false,
  onChange,
}) => (
  <div
    className={`flex w-[51px] h-[31px] p-[2px] items-center rounded-full cursor-pointer transition-colors ${
      active ? "bg-[#1DAB61]" : "bg-[#E4E4E6]"
    }`}
    onClick={onChange}
  >
    <div
      className={`w-[27px] h-[27px] rounded-full bg-white shadow-sm transition-transform duration-200 ${
        active ? "translate-x-5" : "translate-x-0"
      }`}
    />
  </div>
);

const SettingsRow: React.FC<{
  icon?: React.ReactNode;
  label: string;
  detail?: string;
  info?: string;
  chevron?: boolean;
  separator?: boolean;
  toggle?: boolean;
  toggleActive?: boolean;
  onToggleChange?: () => void;
  textColor?: string;
}> = ({
  icon,
  label,
  detail,
  info,
  chevron = true,
  separator = true,
  toggle = false,
  toggleActive = false,
  onToggleChange,
  textColor = "text-[#0A0A0A]",
}) => (
  <div className="flex pl-[18px] items-center gap-[18.66px] self-stretch relative">
    {icon && <div className="w-6 h-6">{icon}</div>}
    <div className="flex min-h-[40px] py-[11px] pr-[9px] justify-between items-center flex-1 relative">
      {separator && (
        <div
          className={`absolute bottom-0 left-0 right-0 h-[0.33px] bg-black/20 ${
            info ? "h-[53px]" : "h-[45px]"
          }`}
        />
      )}
      <div className="flex flex-col items-start flex-1">
        <div className={`text-[16px] tracking-[-0.32px] ${textColor}`}>
          {label}
        </div>
        {info && (
          <div className="text-[#767779] text-[11px] self-stretch">{info}</div>
        )}
      </div>
      <div className="flex justify-end items-center gap-2">
        {detail && (
          <span className="text-[#767779] text-[16px] tracking-[-0.32px]">
            {detail}
          </span>
        )}
        {toggle && (
          <ToggleSwitch active={toggleActive} onChange={onToggleChange} />
        )}
        {chevron && !toggle && (
          <svg className="w-6 h-6" viewBox="0 0 24 25">
            <path
              d="M10.5 7.66016L15 12.1602L10.5 16.6602"
              stroke="#CCCCCC"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
    </div>
  </div>
);

export default function ContactInfo() {
  return (
    <div className="flex flex-col w-full max-w-[393px] min-h-screen bg-[#F4F4F4] mx-auto relative">
      {/* Status Bar */}
      <StatusBar />

      {/* Header */}
      <div className="flex w-full h-[98px] px-4 pr-0 justify-between items-end pb-[6px] pt-1">
        {/* Back Button */}
        <svg className="w-8 h-8 flex-shrink-0" viewBox="0 0 32 32">
          <path
            d="M18.5 24L10.5 16L18.5 8"
            stroke="#0A0A0A"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Title */}
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-3">
          <span className="text-[#0A0A0A] text-[17px] font-semibold tracking-[-0.336px]">
            Contact Info
          </span>
        </div>

        {/* Edit Button */}
        <div className="flex py-[6px] justify-end items-center">
          <span className="text-[#0A0A0A] text-[17px] tracking-[-0.336px]">
            Edit
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex px-4 pb-[38px] pt-[18px] flex-col items-center gap-4 self-stretch">
        {/* Contact Info */}
        <div className="flex pt-[6px] flex-col items-center gap-6 self-stretch">
          {/* Profile Section */}
          <div className="flex flex-col items-center gap-3">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F58a45ac74f684c229db5d48c4fd195ba%2F2816e49bd7264019a1a15ef24f645cc5?format=webp&width=800"
              alt="Emmett Doc Brown"
              className="w-[120px] h-[120px] rounded-full border border-black/10 object-cover"
            />
            <div className="flex flex-col items-center gap-[5px]">
              <h1 className="text-[#0A0A0A] text-[27px] font-bold tracking-[-0.938px]">
                Emmett "Doc" Brown
              </h1>
              <span className="text-[#767779] text-[16px] tracking-[-0.32px]">
                +1 323 555 7777
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-start gap-2 self-stretch">
            <div className="flex h-[73px] px-2 py-[14.5px] flex-col items-center gap-[5px] flex-1 bg-white rounded-[10px]">
              <div className="w-6 h-6 fill-[#1DAB61]">
                <svg
                  className="w-[18px] h-[18px] absolute ml-[3px] mt-[3px]"
                  viewBox="0 0 18 18"
                >
                  <circle
                    cx="9"
                    cy="9"
                    r="8"
                    stroke="#1DAB61"
                    strokeWidth="1.5"
                    fill="none"
                  />
                </svg>
              </div>
              <span className="text-[#0A0A0A] text-[14px] leading-[19px] tracking-[-0.14px]">
                Audio
              </span>
            </div>

            <div className="flex h-[73px] px-2 py-[14.5px] flex-col items-center gap-[5px] flex-1 bg-white rounded-[10px]">
              <svg className="w-6 h-6" viewBox="0 0 24 16">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.50103 0.255859C1.84361 0.255859 0.5 1.59947 0.5 3.25689V12.3509C0.5 14.0083 1.84361 15.352 3.50103 15.352H14.8686C16.5261 15.352 17.8697 14.0083 17.8697 12.3509V10.5485L20.7882 13.0894C21.8475 14.0116 23.5 13.2593 23.5 11.8548V3.24878C23.5 1.84432 21.8475 1.09198 20.7882 2.01418L17.8697 4.55511V3.25689C17.8697 1.59947 16.5261 0.255859 14.8686 0.255859H3.50103Z"
                  fill="#1DAB61"
                />
              </svg>
              <span className="text-[#0A0A0A] text-[14px] leading-[19px] tracking-[-0.14px]">
                Video
              </span>
            </div>

            <div className="flex h-[73px] px-2 py-[14.5px] flex-col items-center gap-[5px] flex-1 bg-white rounded-[10px]">
              <svg className="w-6 h-6" viewBox="0 0 25 25">
                <path
                  d="M3.5 10.1714C3.5 14.2246 6.79785 17.5225 10.8511 17.5225C12.4539 17.5225 13.9186 17.0066 15.1254 16.1407L19.6576 20.6821C19.8695 20.894 20.1459 20.9953 20.4406 20.9953C21.067 20.9953 21.5 20.5255 21.5 19.9083C21.5 19.6136 21.3895 19.3464 21.196 19.153L16.6914 14.6207C17.6402 13.3863 18.2021 11.8479 18.2021 10.1714C18.2021 6.11816 14.9043 2.82031 10.8511 2.82031C6.79785 2.82031 3.5 6.11816 3.5 10.1714Z"
                  fill="#1DAB61"
                />
              </svg>
              <span className="text-[#0A0A0A] text-[14px] leading-[19px] tracking-[-0.14px]">
                Search
              </span>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="flex p-4 px-4 flex-col items-start gap-[4.5px] self-stretch bg-white rounded-[10px]">
          <div className="text-[#0A0A0A] text-[16px] tracking-[-0.32px] self-stretch">
            Great Scott! ☢️
          </div>
          <div className="text-[#767779] text-[12px] tracking-[-0.12px] self-stretch">
            18 Mar 1993
          </div>
        </div>

        {/* Settings - Media */}
        <div className="flex flex-col items-start self-stretch bg-white rounded-[10px]">
          <SettingsRow
            icon={
              <svg
                className="w-[21px] h-[17px] fill-[#0A0A0A]"
                viewBox="0 0 22 18"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.299999 3.15996C0.299999 1.66879 1.50883 0.459961 3 0.459961H19C20.4912 0.459961 21.7 1.66879 21.7 3.15996V14.66C21.7 16.1511 20.4912 17.36 19 17.36H3C1.50883 17.36 0.299999 16.1511 0.299999 14.66V3.15996ZM3 1.85996C2.28203 1.85996 1.7 2.44199 1.7 3.15996V13.46L4.08579 11.0742C4.86684 10.2931 6.13316 10.2931 6.91421 11.0742L8.16288 12.3228C8.35161 12.5116 8.65528 12.5188 8.85277 12.3393L12.6403 8.89604C13.4091 8.1971 14.5851 8.20331 15.3466 8.91034L20.3 13.51V3.15996C20.3 2.44199 19.718 1.85996 19 1.85996H3ZM9 6.65996C9 7.76453 8.10457 8.65996 7 8.65996C5.89543 8.65996 5 7.76453 5 6.65996C5 5.55539 5.89543 4.65996 7 4.65996C8.10457 4.65996 9 5.55539 9 6.65996Z"
                />
              </svg>
            }
            label="Media, link and docs"
            detail="76"
          />
          <SettingsRow
            icon={
              <svg className="w-5 h-[19px] fill-[#0A0A0A]" viewBox="0 0 22 20">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.1361 1.18329C10.3721 0.29828 11.628 0.29828 11.864 1.18329L13.4792 7.24052H20.1247C20.9839 7.24052 21.3486 8.3344 20.6612 8.84997L15.681 12.5851L17.3562 18.8669C17.5749 19.6871 16.6348 20.3219 15.9557 19.8126L11 16.0958L6.04428 19.8126C5.36523 20.3219 4.42514 19.6871 4.64385 18.8669L6.31901 12.5851L1.33885 8.84997C0.651425 8.3344 1.01606 7.24052 1.87534 7.24052H8.52079L10.1361 1.18329Z"
                />
              </svg>
            }
            label="Starred messages"
            detail="2"
            separator={false}
          />
        </div>

        {/* Settings - Chat */}
        <div className="flex flex-col items-start self-stretch bg-white rounded-[10px]">
          <SettingsRow
            icon={
              <div className="w-[17px] h-[19px] fill-[#0A0A0A] relative">
                <div className="w-4 h-[15px] border-[1.4px] border-black absolute left-[1px] top-[1px] rounded-sm" />
                <div className="w-1 h-1 bg-black rounded-full absolute left-[6px] top-0" />
              </div>
            }
            label="Notifications"
          />
          <SettingsRow
            icon={
              <svg
                className="w-[22px] h-[18px] fill-[#0A0A0A]"
                viewBox="0 0 22 19"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.45005 9.90985C1.45005 5.73296 5.69222 2.10996 11.25 2.10996C14.0811 2.10996 16.466 2.59991 18.1152 3.41283C19.7751 4.23105 20.55 5.29122 20.55 6.40996C20.55 6.91575 20.3282 7.33923 19.9034 7.75118C19.4629 8.17834 18.8516 8.54584 18.1649 8.92043C18.0387 8.98927 17.9085 9.05901 17.7765 9.12971C17.2297 9.42265 16.6521 9.73214 16.1977 10.0626C15.6445 10.465 15.05 11.0538 15.05 11.91C15.05 12.9542 15.7399 13.6416 16.2017 14.1017L16.2551 14.1549C16.7952 14.6951 17.05 14.9953 17.05 15.41C17.05 15.6327 16.9343 15.8716 16.5455 16.1347C16.1493 16.4028 15.5651 16.6233 14.8756 16.7924C13.506 17.1284 11.9421 17.21 11.25 17.21C8.477 17.21 6.00458 16.4187 4.24318 15.1086C2.48989 13.8046 1.45005 12 1.45005 9.90985Z"
                />
              </svg>
            }
            label="Chat theme"
          />
          <SettingsRow
            icon={
              <svg className="w-4 h-5 fill-[#0A0A0A]" viewBox="0 0 18 22">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.7 1.65996C9.7 1.27336 9.3866 0.959961 9 0.959961C8.6134 0.959961 8.3 1.27336 8.3 1.65996V12.97L5.99497 10.665C5.72161 10.3916 5.27839 10.3916 5.00502 10.665C4.73166 10.9384 4.73166 11.3816 5.00502 11.6549L8.50502 15.1549C8.77839 15.4283 9.22161 15.4283 9.49497 15.1549L12.995 11.6549C13.2683 11.3816 13.2683 10.9384 12.995 10.665C12.7216 10.3916 12.2784 10.3916 12.005 10.665L9.7 12.97V1.65996Z"
                />
              </svg>
            }
            label="Save to Photos"
            detail="Default"
            separator={false}
          />
        </div>

        {/* Settings - Messages */}
        <div className="flex flex-col items-start self-stretch bg-white rounded-[10px]">
          <SettingsRow
            icon={
              <svg
                className="w-[21px] h-[21px] fill-[#0A0A0A]"
                viewBox="0 0 22 22"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.7168 3.87715C5.64843 1.94553 8.26827 0.860352 11 0.860352C11.4418 0.860352 11.8 1.21852 11.8 1.66035C11.8 2.10218 11.4418 2.46035 11 2.46035C8.69262 2.46035 6.47974 3.37696 4.84817 5.00852C3.21661 6.64009 2.3 8.85297 2.3 11.1604C2.3 13.4677 3.2166 15.6806 4.84817 17.3122C6.47974 18.9437 8.69262 19.8604 11 19.8604C11.4418 19.8604 11.8 20.2185 11.8 20.6604C11.8 21.1022 11.4418 21.4604 11 21.4604C8.26827 21.4604 5.64842 20.3752 3.7168 18.4436C1.78518 16.5119 0.700001 13.8921 0.700001 11.1604C0.700001 8.42862 1.78518 5.80878 3.7168 3.87715Z"
                />
              </svg>
            }
            label="Disappearing Messages"
            detail="Off"
          />
          <SettingsRow
            icon={
              <svg className="w-5 h-6 fill-[#0A0A0A]" viewBox="0 0 22 25">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11 0.959961C8.40426 0.959961 6.3 3.06422 6.3 5.65996V6.65996H4.49999C2.45653 6.65996 0.799988 8.31651 0.799988 10.36V17.36C0.799988 19.4034 2.45653 21.06 4.49999 21.06H5.54999V23.86C5.54999 24.124 5.6986 24.3656 5.93429 24.4847C6.16998 24.6038 6.45263 24.5801 6.66523 24.4235L11.1501 21.1188C11.2021 21.0806 11.2651 21.06 11.3286 21.06H17.5C19.5434 21.06 21.2 19.4034 21.2 17.36V10.36C21.2 8.31651 19.5434 6.65996 17.5 6.65996H15.7V5.65996C15.7 3.06422 13.5957 0.959961 11 0.959961Z"
                />
              </svg>
            }
            label="Lock Chat"
            info="Lock and hide this chat on this device."
            toggle={true}
            toggleActive={false}
          />
          <SettingsRow
            icon={
              <svg className="w-[11px] h-4 fill-[#0A0A0A]" viewBox="0 0 12 17">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6 0.459961C3.6804 0.459961 1.8 2.34037 1.8 4.65996V6.9716C0.955365 7.07059 0.299999 7.78874 0.299999 8.65996V15.16C0.299999 16.0988 1.06112 16.86 2 16.86H10C10.9389 16.86 11.7 16.0988 11.7 15.16V8.65996C11.7 7.78874 11.0446 7.07059 10.2 6.9716V4.65996C10.2 2.34037 8.3196 0.459961 6 0.459961Z"
                />
              </svg>
            }
            label="Encryption"
            info="Message and calls are and-to-end encrypted. Tap to verify."
            separator={false}
          />
        </div>

        {/* Settings - Details */}
        <div className="flex flex-col items-start self-stretch bg-white rounded-[10px]">
          <SettingsRow
            icon={
              <svg
                className="w-[19px] h-[19px] fill-[#0A0A0A]"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10 1.85996C5.41604 1.85996 1.7 5.576 1.7 10.16C1.7 12.1661 2.41172 14.006 3.59642 15.4409C4.68379 14.5264 7.14185 13.16 10 13.16C12.8581 13.16 15.3162 14.5264 16.4036 15.4409C17.5883 14.006 18.3 12.1661 18.3 10.16C18.3 5.576 14.584 1.85996 10 1.85996ZM0.299999 10.16C0.299999 4.8028 4.64284 0.459961 10 0.459961C15.3572 0.459961 19.7 4.8028 19.7 10.16C19.7 15.5171 15.3572 19.86 10 19.86C4.64284 19.86 0.299999 15.5171 0.299999 10.16ZM13 8.15996C13 10.093 11.6569 11.66 10 11.66C8.34314 11.66 7 10.093 7 8.15996C7 6.22696 8.34314 4.65996 10 4.65996C11.6569 4.65996 13 6.22696 13 8.15996Z"
                />
              </svg>
            }
            label="Contact Details"
            separator={false}
          />
        </div>

        {/* Groups Section */}
        <div className="flex pt-2 flex-col items-start gap-2 self-stretch">
          <div className="flex px-4 items-center gap-[10px] self-stretch">
            <span className="flex-1 text-[#0A0A0A] text-[16px] font-semibold leading-[19px] tracking-[-0.869px]">
              No Groups in Common
            </span>
          </div>

          <div className="flex flex-col justify-center items-start self-stretch bg-white rounded-[10px]">
            <div className="flex min-h-[49px] pl-4 items-center gap-[13px] self-stretch">
              <div className="flex w-10 h-10 flex-col justify-center items-center bg-black/[0.03] rounded-full">
                <svg className="w-3 h-3 fill-[#0A0A0A]" viewBox="0 0 14 13">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.90001 0.909766C7.90001 0.412709 7.49706 0.00976562 7.00001 0.00976562C6.50295 0.00976562 6.10001 0.412709 6.10001 0.909766V5.25977H1.75001C1.25295 5.25977 0.850006 5.66271 0.850006 6.15977C0.850006 6.65682 1.25295 7.05977 1.75001 7.05977H6.10001V11.4098C6.10001 11.9068 6.50295 12.3098 7.00001 12.3098C7.49706 12.3098 7.90001 11.9068 7.90001 11.4098V7.05977H12.25C12.7471 7.05977 13.15 6.65682 13.15 6.15977C13.15 5.66271 12.7471 5.25977 12.25 5.25977H7.90001V0.909766Z"
                  />
                </svg>
              </div>
              <div className="flex py-[5.5px] pr-[9px] pb-[4.5px] justify-between items-center flex-1 self-stretch relative">
                <div className="absolute bottom-0 left-0 right-0 h-[0.33px] bg-black/20" />
                <span className="text-[#0A0A0A] text-[16px] tracking-[-0.32px]">
                  Create Group with Emmett
                </span>
              </div>
            </div>

            <div className="flex min-h-[49px] pl-4 items-center gap-[13px] self-stretch">
              <svg className="w-10 h-10" viewBox="0 0 40 41">
                <defs>
                  <radialGradient
                    id="groupGradient"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(40 0.660155) rotate(135) scale(56.5685)"
                  >
                    <stop stopColor="#B1B5C0" />
                    <stop offset="1" stopColor="#858992" />
                  </radialGradient>
                </defs>
                <rect
                  y="0.660156"
                  width="40"
                  height="40"
                  rx="20"
                  fill="url(#groupGradient)"
                />
                <path
                  d="M15.2986 20.0622C13.3167 20.0622 11.6347 18.2984 11.6347 16.0165C11.6347 13.789 13.3258 12.0889 15.2986 12.0889C17.2715 12.0889 18.9717 13.8163 18.9626 16.0346C18.9626 18.2984 17.2806 20.0622 15.2986 20.0622ZM25.8086 20.2713C24.0812 20.2713 22.6174 18.7258 22.6174 16.7438C22.6174 14.7982 24.0902 13.3253 25.8086 13.3253C27.5269 13.3253 29.0088 14.8254 28.9997 16.762C28.9997 18.7258 27.536 20.2713 25.8086 20.2713ZM30.818 28.5174H24.0084C24.9721 27.1264 23.9084 24.3807 21.8628 22.7806C22.8629 22.126 24.1721 21.6533 25.8086 21.6533C29.8725 21.6533 32.5 24.6444 32.5 27.1173C32.5 28.0083 32.0454 28.5174 30.818 28.5174ZM20.9718 28.5174H9.63456C8.14353 28.5174 7.62531 28.0629 7.62531 27.2355C7.62531 24.8899 10.5892 21.6714 15.3077 21.6714C20.0172 21.6714 22.9811 24.8899 22.9811 27.2355C22.9811 28.0629 22.4628 28.5174 20.9718 28.5174Z"
                  fill="white"
                />
              </svg>
              <div className="flex py-[5.5px] pr-[9px] pb-[4.5px] justify-between items-center flex-1 self-stretch">
                <div className="flex flex-col items-start flex-1">
                  <span className="text-[#0A0A0A] text-[16px] tracking-[-0.32px]">
                    The time travelers ⏰
                  </span>
                  <span className="text-[#767779] text-[11px] self-stretch line-clamp-1">
                    Titor, Amy, Marty, Donny, James, William, Joseph, You
                  </span>
                </div>
                <svg className="w-6 h-6" viewBox="0 0 24 25">
                  <path
                    d="M10.5 7.66016L15 12.1602L10.5 16.6602"
                    stroke="#CCCCCC"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Action Options */}
        <div className="flex flex-col items-start self-stretch bg-white rounded-[10px]">
          <SettingsRow
            label="Share Contact"
            textColor="text-[#1C8854]"
            chevron={false}
          />
          <SettingsRow
            label="Add to Favourites"
            textColor="text-[#1C8854]"
            chevron={false}
          />
          <SettingsRow
            label="Add to list"
            textColor="text-[#1C8854]"
            chevron={false}
          />
          <SettingsRow
            label="Export Chat"
            textColor="text-[#1C8854]"
            chevron={false}
          />
          <SettingsRow
            label="Clear Chat"
            textColor="text-[#E90039]"
            chevron={false}
            separator={false}
          />
        </div>

        {/* User Options */}
        <div className="flex flex-col items-start self-stretch bg-white rounded-[10px]">
          <SettingsRow
            label='Block Emmett "Doc" Brown'
            textColor="text-[#E90039]"
            chevron={false}
          />
          <SettingsRow
            label='Report Emmett "Doc" Brown'
            textColor="text-[#E90039]"
            chevron={false}
            separator={false}
          />
        </div>
      </div>

      {/* Home Indicator */}
      <div className="flex w-full pt-[21px] pb-2 flex-col items-center gap-[10px]">
        <div className="w-[140px] h-[5px] bg-[#0A0A0A] rounded-full" />
      </div>
    </div>
  );
}
