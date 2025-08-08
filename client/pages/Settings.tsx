import React from "react";
import { useNavigate } from "react-router-dom";
import StatusBar from "../components/StatusBar";
import { TabBar } from "../components/TabBar";

const SettingsRow: React.FC<{
  icon?: React.ReactNode;
  label: string;
  detail?: string;
  separator?: boolean;
  onClick?: () => void;
}> = ({ icon, label, detail, separator = true, onClick }) => (
  <div
    className="flex pl-[18px] items-center gap-[18.66px] self-stretch cursor-pointer"
    onClick={onClick}
  >
    {icon && <div className="w-6 h-6">{icon}</div>}
    <div className="flex min-h-[40px] py-[11px] pr-[9px] justify-between items-center flex-1 relative">
      {separator && (
        <div className="absolute bottom-0 left-0 w-[300px] h-[0.33px] bg-black/20" />
      )}
      <div className="flex flex-col items-start flex-1">
        <span className="text-[#0A0A0A] text-[16px] tracking-[-0.32px]">
          {label}
        </span>
      </div>
      <div className="flex justify-end items-center">
        {detail && (
          <span className="text-[#767779] text-[16px] tracking-[-0.32px] mr-2">
            {detail}
          </span>
        )}
        <svg className="w-6 h-6" viewBox="0 0 24 25">
          <path
            d="M10.5 8L15 12.5L10.5 17"
            stroke="#CCCCCC"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  </div>
);

export default function Settings() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full max-w-[393px] min-h-screen bg-[#F4F4F4] mx-auto relative">
      {/* Status Bar */}
      <StatusBar />

      {/* Header - Empty space for spacing */}
      <div className="w-full h-[98px] px-4 flex justify-end items-end gap-4" />

      {/* Title and Search */}
      <div className="flex w-full px-4 pb-2 pt-[5px] flex-col items-start gap-2">
        <h1 className="text-[#0A0A0A] text-[33px] font-bold tracking-[-1.333px] self-stretch">
          Settings
        </h1>

        {/* Search */}
        <div className="flex pt-[1px] flex-col items-start gap-[10px] self-stretch">
          <div className="flex pb-2 items-center gap-[10px] self-stretch">
            <div className="flex p-[5px] items-center gap-[1px] flex-1 bg-black/[0.03] rounded-[10px]">
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path
                  d="M3 10.8162C3 14.4641 5.96807 17.4321 9.61597 17.4321C11.0585 17.4321 12.3768 16.9679 13.4628 16.1885L17.5419 20.2758C17.7326 20.4665 17.9813 20.5577 18.2466 20.5577C18.8103 20.5577 19.2 20.1349 19.2 19.5794C19.2 19.3141 19.1005 19.0737 18.9264 18.8996L14.8723 14.8206C15.7262 13.7096 16.2319 12.3251 16.2319 10.8162C16.2319 7.16826 13.2639 4.2002 9.61597 4.2002C5.96807 4.2002 3 7.16826 3 10.8162Z"
                  fill="#767779"
                />
              </svg>
              <span className="text-[#767779] text-[16px]">Search</span>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Content */}
      <div className="flex px-4 pb-[38px] flex-col items-start gap-[35px] self-stretch">
        {/* Profile Section */}
        <div className="flex flex-col items-start self-stretch bg-white rounded-[10px]">
          <div className="flex h-[71px] pl-4 items-center gap-3 self-stretch relative">
            <div className="absolute bottom-0 left-0 w-[361px] h-[0.33px] bg-black/20" />
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F58a45ac74f684c229db5d48c4fd195ba%2F34c6ab16fff84d52a2be569c79b00c00?format=webp&width=800"
              alt="Marty McFly"
              className="w-14 h-14 rounded-full border border-black/10 object-cover"
            />
            <div className="flex pr-4 items-center gap-4 flex-1">
              <div className="flex flex-col justify-center items-start gap-[1px] flex-1">
                <h2 className="text-[#0A0A0A] text-[20px] tracking-[-0.3px] self-stretch line-clamp-1">
                  Marty McFly
                </h2>
                <p className="text-[#767779] text-[16px] tracking-[-0.32px] self-stretch line-clamp-1">
                  Nobody calls me chicken! 🐔
                </p>
              </div>
              <div className="flex w-9 h-9 flex-col justify-center items-center bg-black/[0.03] rounded-full">
                <svg className="w-4 h-4 fill-[#0A0A0A]" viewBox="0 0 16 17">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1.91 6.09V2.41H5.59V6.09H1.91ZM0.25 2.25C0.25 1.42157 0.921573 0.75 1.75 0.75H5.75C6.57843 0.75 7.25 1.42157 7.25 2.25V6.25C7.25 7.07843 6.57843 7.75 5.75 7.75H1.75C0.921573 7.75 0.25 7.07843 0.25 6.25V2.25ZM1.9 14.6V10.9H5.6V14.6H1.9ZM0.25 10.75C0.25 9.92157 0.921573 9.25 1.75 9.25H5.75C6.57843 9.25 7.25 9.92157 7.25 10.75V14.75C7.25 15.5784 6.57843 16.25 5.75 16.25H1.75C0.921573 16.25 0.25 15.5784 0.25 14.75V10.75ZM10.4 2.4V6.1H14.1V2.4H10.4ZM10.25 0.75C9.42157 0.75 8.75 1.42157 8.75 2.25V6.25C8.75 7.07843 9.42157 7.75 10.25 7.75H14.25C15.0784 7.75 15.75 7.07843 15.75 6.25V2.25C15.75 1.42157 15.0784 0.75 14.25 0.75H10.25Z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <SettingsRow
            icon={
              <svg
                className="w-[19px] h-[22px] fill-[#0A0A0A]"
                viewBox="0 0 20 22"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.21901 3.70499C8.29085 2.09724 10.1724 1.21837 12.0915 1.4316L12.1616 1.43939C12.6774 1.49671 13.182 1.62974 13.6591 1.83421L14.5291 2.20703C15.5957 2.66418 16.5135 3.41015 17.1791 4.36088C18.4533 6.18129 18.5161 8.58712 17.3384 10.4714L17.2184 10.6634C17.1442 10.5478 17.0921 10.416 17.0683 10.2733L16.9281 9.43197C16.8313 8.85144 16.5875 8.30537 16.2198 7.8458L14.6666 5.90429C14.5422 5.74881 14.3575 5.65365 14.1587 5.64264C13.9599 5.63163 13.7658 5.7058 13.625 5.8466L13.0684 6.40319C12.513 6.95861 11.8506 7.39542 11.1213 7.68714L10.5835 7.90227C10.1908 6.84001 9.3392 5.99462 8.26919 5.60552C5.90311 4.74513 3.3094 6.36494 3.12817 8.9022L3.02691 10.3198C3.00619 10.6099 2.84721 10.8591 2.61719 11.0047C2.54534 10.92 2.46645 10.7989 2.38543 10.6278C2.21286 10.2635 2.08573 9.78609 1.99685 9.28242C1.90917 8.78558 1.86456 8.29801 1.84213 7.93161C1.83097 7.74936 1.82543 7.5993 1.82268 7.49585C1.82131 7.44417 1.82064 7.40425 1.82031 7.3779L1.82003 7.34884L1.82 7.34239L1.82 7.34157L1.82 7.34136L1.82 7.3413C1.82016 5.33656 3.54159 3.7646 5.53814 3.94611L6.5269 4.036C6.80148 4.06096 7.0668 3.93331 7.21901 3.70499Z"
                />
              </svg>
            }
            label="Avatar"
            separator={false}
          />
        </div>

        {/* Settings Section 1 */}
        <div className="flex flex-col items-start self-stretch bg-white rounded-[10px]">
          <SettingsRow
            icon={
              <svg
                className="w-[17px] h-[19px] fill-[#0A0A0A]"
                viewBox="0 0 18 19"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.62002 0C4.00146 0 3.50002 0.501441 3.50002 1.12C3.50002 1.27464 3.62538 1.4 3.78001 1.4H14.22C14.3747 1.4 14.5 1.27464 14.5 1.12C14.5 0.501441 13.9986 0 13.38 0H4.62002ZM2.00002 3.62C2.00002 3.00144 2.50146 2.5 3.12002 2.5H14.88C15.4986 2.5 16 3.00144 16 3.62C16 3.77464 15.8747 3.9 15.72 3.9H2.28001C2.12538 3.9 2.00002 3.77464 2.00002 3.62ZM0.300003 6.9998C0.300003 6.06092 1.06112 5.2998 2 5.2998H16C16.9389 5.2998 17.7 6.06092 17.7 6.9998V16.9998C17.7 17.9387 16.9389 18.6998 16 18.6998H2C1.06112 18.6998 0.300003 17.9387 0.300003 16.9998V6.9998Z"
                />
              </svg>
            }
            label="List"
          />
          <SettingsRow
            icon={
              <svg
                className="w-[19px] h-[18px] fill-[#0A0A0A]"
                viewBox="0 0 20 19"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14.8 3.66039C13.0878 4.59477 11.1261 5.0937 9.52303 5.36463C8.61926 5.51738 7.81187 5.60045 7.2 5.6457V11.8544C7.81187 11.8997 8.61926 11.9828 9.52303 12.1355C11.1261 12.4065 13.0878 12.9054 14.8 13.8398V3.66039Z"
                />
              </svg>
            }
            label="Broadcast messages"
          />
          <SettingsRow
            icon={
              <svg className="w-5 h-[19px] fill-[#0A0A0A]" viewBox="0 0 22 20">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.1361 1.02313C10.3721 0.138123 11.628 0.138123 11.864 1.02313L13.4792 7.08036H20.1247C20.9839 7.08036 21.3486 8.17425 20.6612 8.68982L15.681 12.4249L17.3562 18.7068C17.5749 19.5269 16.6348 20.1618 15.9557 19.6525L11 15.9357L6.04428 19.6525C5.36523 20.1618 4.42514 19.5269 4.64385 18.7068L6.31901 12.4249L1.33885 8.68982C0.651425 8.17425 1.01606 7.08036 1.87534 7.08036H8.52079L10.1361 1.02313Z"
                />
              </svg>
            }
            label="Starred messages"
          />
          <SettingsRow
            icon={
              <svg className="w-6 h-[14px] fill-[#0A0A0A]" viewBox="0 0 24 14">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.1 0.299807L5.07506 0.299806C4.81644 0.299789 4.5818 0.299775 4.3862 0.315756C4.17616 0.332917 3.9503 0.371939 3.72822 0.485096C3.40834 0.64808 3.14827 0.908147 2.98529 1.22802C2.87213 1.45011 2.83311 1.67597 2.81595 1.88601C2.79997 2.08161 2.79998 2.31625 2.8 2.57487L2.8 2.59981V12.0002H1C0.447715 12.0002 0 12.4479 0 13.0002C0 13.5525 0.447715 14.0002 1 14.0002H23C23.5523 14.0002 24 13.5525 24 13.0002C24 12.4479 23.5523 12.0002 23 12.0002H21.2V2.59981V2.5749C21.2 2.31627 21.2 2.08161 21.1841 1.88601C21.1669 1.67597 21.1279 1.45011 21.0147 1.22802C20.8517 0.908147 20.5917 0.64808 20.2718 0.485096C20.0497 0.371939 19.8238 0.332917 19.6138 0.315756C19.4182 0.299775 19.1836 0.299789 18.9249 0.299806L18.9 0.299807H5.1Z"
                />
              </svg>
            }
            label="Linked devices"
            separator={false}
          />
        </div>

        {/* Account Management Section */}
        <div className="flex flex-col items-start self-stretch bg-white rounded-[10px]">
          <SettingsRow
            icon={
              <svg className="w-6 h-6 fill-[#1DAB61]" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                />
              </svg>
            }
            label="Create Account"
            onClick={() => navigate("/register")}
          />
          <SettingsRow
            icon={
              <svg className="w-6 h-6 fill-[#0A0A0A]" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                />
              </svg>
            }
            label="Sign In"
            onClick={() => navigate("/login")}
            separator={false}
          />
        </div>

        {/* Settings Section 2 */}
        <div className="flex flex-col items-start self-stretch bg-white rounded-[10px]">
          <SettingsRow
            icon={
              <svg className="w-3 h-[22px] fill-[#0A0A0A]" viewBox="0 0 12 23">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.60001 6.40008C1.60001 3.96977 3.57017 1.99961 6.00048 1.99961C8.4308 1.99961 10.401 3.96977 10.401 6.40008C10.401 8.41333 9.04838 10.1125 7.20101 10.635C6.89961 10.7202 6.69152 10.9953 6.69152 11.3086V12.4279C6.69152 12.6136 6.76527 12.7916 6.89655 12.9229L8.25629 14.2826L6.43287 16.1061C6.1595 16.3794 6.1595 16.8226 6.43287 17.096L7.8106 18.4737L5.78409 20.6561L4.84577 19.5838V11.1529C4.84577 10.8645 4.66898 10.6057 4.40041 10.5008C2.76009 9.86022 1.60001 8.26476 1.60001 6.40008Z"
                />
              </svg>
            }
            label="Account"
          />
          <SettingsRow
            icon={
              <svg className="w-[11px] h-4 fill-[#0A0A0A]" viewBox="0 0 12 18">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6 0.799805C3.6804 0.799805 1.8 2.68021 1.8 4.9998V7.31145C0.955365 7.41043 0.299999 8.12858 0.299999 8.9998V15.4998C0.299999 16.4387 1.06112 17.1998 2 17.1998H10C10.9389 17.1998 11.7 16.4387 11.7 15.4998V8.9998C11.7 8.12858 11.0446 7.41043 10.2 7.31145V4.9998C10.2 2.68021 8.3196 0.799805 6 0.799805Z"
                />
              </svg>
            }
            label="Privacy"
          />
          <SettingsRow
            icon={
              <svg
                className="w-[21px] h-[19px] fill-[#0A0A0A]"
                viewBox="0 0 22 20"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.40324 3.63333C2.76179 4.82949 1.8001 6.47112 1.8001 8.34768C1.8001 10.4904 3.05714 12.4635 5.1417 13.7888C5.39309 13.9487 5.65605 14.0986 5.92961 14.2378C6.25944 14.4057 6.42408 14.6975 6.49464 14.9597C6.56134 15.2075 6.5571 15.4659 6.5327 15.6882C6.48349 16.1364 6.32708 16.6423 6.16275 17.0855C6.10087 17.2524 6.03548 17.4167 5.97005 17.5735C5.99591 17.5656 6.02209 17.5575 6.04857 17.5491C6.85403 17.2935 7.94054 16.7772 9.02083 15.7294C9.28623 15.472 9.65215 15.3362 10.0273 15.3658C10.3371 15.3902 10.6517 15.4028 10.9702 15.4028C16.2014 15.4028 20.1403 12.0962 20.1403 8.34768C20.1403 6.47112 19.1787 4.82949 17.5372 3.63333C15.8887 2.43205 13.5714 1.6998 10.9702 1.6998C8.36902 1.6998 6.05173 2.43205 4.40324 3.63333Z"
                />
              </svg>
            }
            label="Chats"
          />
          <SettingsRow
            icon={<div className="w-[17px] h-[17px] fill-[#0A0A0A]" />}
            label="Notifications"
          />
          <SettingsRow
            icon={<div className="w-5 h-4 fill-[#0A0A0A]" />}
            label="Storage and data"
            onClick={() => navigate("/storage-settings")}
          />
          <SettingsRow
            icon={
              <svg className="w-5 h-5 fill-[#FFD700]" viewBox="0 0 24 24">
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2" />
              </svg>
            }
            label="Starred Messages"
            onClick={() => navigate("/starred-messages")}
          />
          <SettingsRow
            icon={
              <svg className="w-5 h-5 fill-[#667781]" viewBox="0 0 24 24">
                <path d="M21 8V21H3V8" />
                <path d="M1 3H23L21 8H3L1 3Z" />
                <path d="M10 12H14" />
              </svg>
            }
            label="Archived Chats"
            onClick={() => navigate("/archive")}
            separator={false}
          />
        </div>

        {/* Settings Section 3 */}
        <div className="flex flex-col items-start self-stretch bg-white rounded-[10px]">
          <SettingsRow
            icon={
              <svg
                className="w-[17px] h-[17px] fill-[#0A0A0A]"
                viewBox="0 0 18 19"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.00005 2.1998C4.96837 2.1998 1.70005 5.46813 1.70005 9.4998C1.70005 13.5315 4.96837 16.7998 9.00005 16.7998C13.0317 16.7998 16.3 13.5315 16.3 9.4998C16.3 5.46813 13.0317 2.1998 9.00005 2.1998ZM0.300049 9.4998C0.300049 4.69493 4.19517 0.799805 9.00005 0.799805C13.8049 0.799805 17.7001 4.69493 17.7001 9.4998C17.7001 14.3047 13.8049 18.1998 9.00005 18.1998C4.19517 18.1998 0.300049 14.3047 0.300049 9.4998Z"
                />
              </svg>
            }
            label="Help"
          />
          <SettingsRow
            icon={
              <svg
                className="w-[19px] h-[17px] fill-[#0A0A0A]"
                viewBox="0 0 20 18"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.4763 17.1834L11.4763 17.1833C11.3238 17.2799 11.128 17.3932 10.9144 17.4869C10.7311 17.5672 10.3944 17.6975 10.0006 17.6975C9.60826 17.6975 9.26973 17.5651 9.09344 17.4884C8.8813 17.3961 8.68354 17.2837 8.52501 17.1833L8.51604 17.1777L8.51607 17.1776C6.29516 15.7473 4.37121 14.2864 2.9949 12.6931C1.60101 11.0795 0.710022 9.2593 0.710022 7.15684C0.710022 3.5981 3.242 0.889648 6.58658 0.889648C7.96544 0.889648 9.11666 1.39655 10.0006 2.19249C10.8856 1.39475 12.0367 0.889648 13.4225 0.889648C16.7702 0.889648 19.2913 3.60139 19.2913 7.15684C19.2913 9.2593 18.4003 11.0795 17.0064 12.6931C15.6301 14.2864 13.7061 15.7473 11.4852 17.1776L11.4763 17.1834Z"
                />
              </svg>
            }
            label="Invite a friend"
            separator={false}
          />
        </div>

        {/* Meta Apps Section */}
        <div className="flex flex-col items-start gap-2 self-stretch">
          <div className="flex px-4 items-center gap-[10px] self-stretch">
            <span className="flex-1 text-[#767779] text-[16px] font-semibold leading-[19px] tracking-[-0.869px]">
              Also from Meta
            </span>
          </div>

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
                    d="M0.450001 6.2502C0.450001 3.04694 3.04675 0.450195 6.25 0.450195H15.75C18.9533 0.450195 21.55 3.04694 21.55 6.2502V15.7502C21.55 18.9534 18.9533 21.5502 15.75 21.5502H6.25C3.04675 21.5502 0.450001 18.9534 0.450001 15.7502V6.2502ZM6.25 2.0502C3.9304 2.0502 2.05 3.9306 2.05 6.2502V15.7502C2.05 18.0698 3.9304 19.9502 6.25 19.9502H15.75C18.0696 19.9502 19.95 18.0698 19.95 15.7502V6.2502C19.95 3.9306 18.0696 2.0502 15.75 2.0502H6.25ZM11 7.0502C8.81848 7.0502 7.05 8.81867 7.05 11.0002C7.05 13.1817 8.81848 14.9502 11 14.9502C13.1815 14.9502 14.95 13.1817 14.95 11.0002C14.95 8.81867 13.1815 7.0502 11 7.0502Z"
                  />
                </svg>
              }
              label="Open Instagram"
            />
            <SettingsRow
              icon={
                <svg
                  className="w-[23px] h-[23px] fill-[#0A0A0A]"
                  viewBox="0 0 24 23"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2.3 11.5002C2.3 6.14303 6.64284 1.8002 12 1.8002C17.3572 1.8002 21.7 6.14303 21.7 11.5002C21.7 16.4996 17.9179 20.6156 13.0588 21.1431V14.5757H16.3235L16.4118 11.4978H13.0588V9.27496C13.0588 8.42001 13.2353 7.90704 14.3824 7.90704H16.4118L16.5 5.08569C16.5 5.08569 15.5294 5.0002 14.2941 5.0002C11.1176 5.0002 9.79412 6.88109 9.79412 8.93298V11.4978H7.5V14.5757H9.79412L9.79396 20.9482C5.49963 19.9495 2.3 16.0985 2.3 11.5002Z"
                  />
                </svg>
              }
              label="Open Facebook"
            />
            <SettingsRow
              icon={
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path
                    d="M17.2847 11.1361C17.1896 11.0905 17.093 11.0466 16.9951 11.0046C16.8246 7.86368 15.1084 6.0655 12.2266 6.0471C12.2135 6.04702 12.2005 6.04702 12.1875 6.04702C10.4638 6.04702 9.03022 6.78278 8.14787 8.12162L9.73277 9.20883C10.3919 8.20876 11.4264 7.99557 12.1882 7.99557C12.197 7.99557 12.2059 7.99557 12.2146 7.99565C13.1634 8.0017 13.8795 8.27758 14.3429 8.81559C14.6801 9.20728 14.9057 9.74854 15.0174 10.4316C14.1761 10.2887 13.2663 10.2447 12.2936 10.3005C9.55376 10.4583 7.79234 12.0562 7.91064 14.2767C7.97067 15.403 8.53178 16.3719 9.49053 17.0049C10.3011 17.54 11.3452 17.8017 12.4302 17.7424C13.8631 17.6639 14.9873 17.1172 15.7715 16.1175C16.3671 15.3583 16.7438 14.3745 16.9101 13.1349C17.593 13.5471 18.0991 14.0894 18.3786 14.7414C18.8539 15.8496 18.8816 17.6708 17.3956 19.1555C16.0937 20.4562 14.5287 21.0189 12.1635 21.0362C9.5399 21.0168 7.5557 20.1754 6.26564 18.5354C5.0576 16.9997 4.43327 14.7816 4.40998 11.9426C4.43327 9.10359 5.0576 6.88546 6.26564 5.3498C7.5557 3.70982 9.53986 2.86844 12.1635 2.84894C14.8061 2.86859 16.8249 3.71402 18.1643 5.36191C18.8211 6.17001 19.3163 7.18627 19.6427 8.37118L21.5 7.87565C21.1043 6.41715 20.4817 5.16035 19.6344 4.11805C17.9172 2.00538 15.4058 0.922837 12.1699 0.900391H12.157C8.92768 0.922759 6.44438 2.00942 4.77611 4.13016C3.29158 6.01735 2.52581 8.64325 2.50008 11.9348L2.5 11.9426L2.50008 11.9504C2.52581 15.2419 3.29158 17.8679 4.77611 19.7551C6.44438 21.8758 8.92768 22.9625 12.157 22.9848H12.1699C15.041 22.9649 17.0647 22.2133 18.7318 20.5476C20.913 18.3685 20.8473 15.637 20.1284 13.9602C19.6127 12.7578 18.6293 11.7811 17.2847 11.1361Z"
                    fill="#0A0A0A"
                  />
                </svg>
              }
              label="Open Threads"
              separator={false}
            />
          </div>
        </div>
      </div>

      {/* TabBar */}
      <TabBar />
    </div>
  );
}
