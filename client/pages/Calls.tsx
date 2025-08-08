import StatusBar from "../components/StatusBar";
import TabBar from "../components/TabBar";

export default function Calls() {
  const callsData = [
    {
      id: 1,
      name: "Daddy",
      type: "outgoing",
      time: "14:01",
      profileImage:
        "https://api.builder.io/api/v1/image/assets/TEMP/4c4a5af127d840b7402719dbbfdd77f20d2b99a7?width=80",
    },
    {
      id: 2,
      name: "Daddy",
      type: "missed",
      time: "14:00",
      profileImage:
        "https://api.builder.io/api/v1/image/assets/TEMP/4c4a5af127d840b7402719dbbfdd77f20d2b99a7?width=80",
    },
    {
      id: 3,
      name: "Daddy",
      type: "outgoing",
      time: "Yesterday",
      profileImage:
        "https://api.builder.io/api/v1/image/assets/TEMP/4c4a5af127d840b7402719dbbfdd77f20d2b99a7?width=80",
    },
    {
      id: 4,
      name: "Jenny ❤️",
      type: "outgoing",
      time: "15/10/85",
      profileImage:
        "https://api.builder.io/api/v1/image/assets/TEMP/2f74a7b374d94e89d563d84ba3c9febd0fc2b66c?width=80",
    },
    {
      id: 5,
      name: "Jenny ❤️",
      type: "missed",
      time: "11/10/85",
      profileImage:
        "https://api.builder.io/api/v1/image/assets/TEMP/2f74a7b374d94e89d563d84ba3c9febd0fc2b66c?width=80",
    },
    {
      id: 6,
      name: 'Emmett "Doc" Brown',
      type: "outgoing",
      time: "02/09/85",
      profileImage:
        "https://cdn.builder.io/api/v1/image/assets%2F58a45ac74f684c229db5d48c4fd195ba%2Fe7a05b7034734d20a462b690bddc15f7?format=webp&width=80",
    },
  ];

  const CallIcon = ({ type }: { type: string }) => {
    const isOutgoing = type === "outgoing";

    if (isOutgoing) {
      return (
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          className="fill-[#767779]"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.73575 5.89571C8.50144 6.13002 8.50144 6.50992 8.73575 6.74424C8.97007 6.97855 9.34997 6.97855 9.58428 6.74424L13.56 2.7685V5.31997C13.56 5.65134 13.8286 5.91997 14.16 5.91997C14.4914 5.91997 14.76 5.65134 14.76 5.31997V1.31997C14.76 0.9886 14.4914 0.719971 14.16 0.719971H10.16C9.82865 0.719971 9.56002 0.988599 9.56002 1.31997C9.56002 1.65134 9.82865 1.91997 10.16 1.91997L12.7115 1.91997L8.73575 5.89571ZM0.660004 4.31432C0.660004 6.45033 2.27145 9.01952 4.3529 11.1032C6.4269 13.1795 9.01566 14.8151 11.1568 14.8151C12.1266 14.8151 12.9697 14.479 13.6486 13.7396C14.029 13.3363 14.32 12.8135 14.32 12.3132C14.32 11.9547 14.1783 11.6111 13.8202 11.3572L11.5373 9.75144C11.2314 9.53485 10.9554 9.41535 10.6868 9.41535C10.3585 9.41535 10.0452 9.5946 9.69455 9.93068L9.14994 10.4609C9.07534 10.5431 8.97089 10.573 8.87391 10.573C8.76946 10.573 8.66502 10.5356 8.58295 10.4983C8.14279 10.2668 7.34453 9.63194 6.58356 8.87015C5.83006 8.10835 5.17355 7.31669 4.9572 6.8611C4.91989 6.77895 4.88259 6.68186 4.88259 6.59224C4.88259 6.49514 4.91243 6.40552 4.9945 6.32337L5.52419 5.76322C5.85245 5.40473 6.03149 5.09105 6.03149 4.76244C6.03149 4.49357 5.91959 4.21723 5.69578 3.90355L4.13655 1.68539C3.86798 1.31943 3.50242 1.15512 3.10702 1.15512C2.62955 1.15512 2.1297 1.38665 1.68954 1.81236C0.973341 2.50693 0.660004 3.36582 0.660004 4.31432Z"
            fill="#767779"
          />
        </svg>
      );
    } else {
      return (
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          className="fill-[#767779]"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.5838 0.566047C14.3788 0.361011 14.0628 0.335104 13.8299 0.488899L13.7362 0.566047L9.75962 4.54261V1.98988C9.75962 1.6585 9.49138 1.39027 9.16001 1.39027C8.82864 1.39027 8.5604 1.6585 8.5604 1.98988V5.98987C8.5604 6.32125 8.82864 6.58948 9.16001 6.58948H13.16L13.2811 6.57777C13.5544 6.52176 13.7596 6.27977 13.7596 5.98987C13.7596 5.69998 13.5544 5.45799 13.2811 5.40198L13.16 5.39027H10.6073L14.5838 1.4137L14.661 1.31995C14.8148 1.08706 14.7889 0.771083 14.5838 0.566047ZM0.660004 3.98402C0.660004 6.12003 2.27145 8.68921 4.3529 10.7729C6.4269 12.8492 9.01566 14.4848 11.1568 14.4848C12.1266 14.4848 12.9697 14.1487 13.6486 13.4093C14.029 13.006 14.32 12.4832 14.32 11.9828C14.32 11.6244 14.1783 11.2808 13.8202 11.0269L11.5373 9.42113C11.2314 9.20454 10.9554 9.08505 10.6868 9.08505C10.3585 9.08505 10.0452 9.26429 9.69455 9.60038L9.14994 10.1306C9.07534 10.2128 8.97089 10.2427 8.87391 10.2427C8.76946 10.2427 8.66502 10.2053 8.58295 10.168C8.14279 9.93646 7.34453 9.30163 6.58356 8.53984C5.83006 7.77805 5.17355 6.98638 4.9572 6.5308C4.91989 6.44864 4.88259 6.35155 4.88259 6.26193C4.88259 6.16484 4.91243 6.07522 4.9945 5.99306L5.52419 5.43292C5.85245 5.07443 6.03149 4.76075 6.03149 4.43213C6.03149 4.16326 5.91959 3.88693 5.69578 3.57325L4.13655 1.35508C3.86798 0.989125 3.50242 0.824816 3.10702 0.824816C2.62955 0.824816 2.1297 1.05634 1.68954 1.48205C0.973341 2.17663 0.660004 3.03551 0.660004 3.98402Z"
            fill="#767779"
          />
        </svg>
      );
    }
  };

  return (
    <div className="w-full max-w-[393px] h-screen flex flex-col bg-white relative overflow-hidden text-rendering-optimized">
      <StatusBar />

      {/* Header with options and add button */}
      <div className="flex justify-between items-end px-4 py-2 h-[98px] gap-4">
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

        <div className="flex-1"></div>

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
          Calls
        </h1>
      </div>

      {/* Content Container */}
      <div className="flex-1 pt-[22px] pb-[83px] flex flex-col gap-8 custom-scrollbar overflow-y-auto">
        {/* Favourites Section */}
        <div className="flex flex-col gap-4">
          <div className="px-4 h-[25px] flex items-center">
            <h2 className="text-[18px] font-semibold text-black tracking-[-0.18px]">
              Favourites
            </h2>
          </div>

          <button className="flex items-center gap-4 px-4 hover:bg-gray-50 active:bg-gray-100 transition-colors touch-target">
            <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7 1C7 0.447715 6.55228 0 6 0C5.44772 0 5 0.447715 5 1V5H1C0.447715 5 0 5.44772 0 6C0 6.55228 0.447715 7 1 7H5V11C5 11.5523 5.44772 12 6 12C6.55228 12 7 11.5523 7 11V7H11C11.5523 7 12 6.55228 12 6C12 5.44772 11.5523 5 11 5H7V1Z"
                  fill="#0A0A0A"
                />
              </svg>
            </div>
            <span className="text-[16px] text-black tracking-[-0.205px] leading-[21px]">
              Add favourite
            </span>
          </button>
        </div>

        {/* Recent Calls Section */}
        <div className="flex flex-col gap-2">
          <div className="px-4 h-[25px] flex items-center">
            <h2 className="text-[18px] font-semibold text-black tracking-[-0.18px]">
              Recent
            </h2>
          </div>

          <div className="flex flex-col">
            {callsData.map((call, index) => (
              <button
                key={call.id}
                className="flex items-start gap-4 pl-4 hover:bg-gray-50 active:bg-gray-100 transition-colors touch-target relative"
                style={{ height: "56.66px" }}
              >
                {/* Avatar */}
                <div className="pt-[9.66px]">
                  <div className="w-10 h-10 rounded-full border-[0.33px] border-black/10 bg-gray-300 overflow-hidden">
                    <img
                      src={call.profileImage}
                      alt={call.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-[10px] pr-4 pb-0 flex items-start gap-2">
                  <div className="flex-1 flex flex-col gap-[1.5px]">
                    <div
                      className={`text-base font-normal tracking-[-0.32px] leading-none truncate text-left ${
                        call.type === "missed" ? "text-[#E90039]" : "text-black"
                      }`}
                    >
                      {call.name}
                    </div>
                    <div className="flex items-center gap-[4.5px]">
                      <div className="w-4 h-4 flex items-center justify-center">
                        <CallIcon type={call.type} />
                      </div>
                      <span className="text-sm text-[#767779] tracking-[-0.14px] leading-[19px] capitalize">
                        {call.type}
                      </span>
                    </div>
                  </div>

                  {/* Right side */}
                  <div className="flex items-center gap-[14px] py-[6.33px]">
                    <span className="text-sm text-[#767779] tracking-[-0.14px] leading-[19px] text-right">
                      {call.time}
                    </span>
                    <div className="w-[26px] h-[26px] flex items-center justify-center">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        className="fill-black"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2ZM0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10ZM9 9L10 9V13H8.5C8.22386 13 8 13.2239 8 13.5C8 13.7761 8.22386 14 8.5 14H11.5C11.7761 14 12 13.7761 12 13.5C12 13.2239 11.7761 13 11.5 13H11V8.5C11 8.36739 10.9473 8.24021 10.8536 8.14645C10.7598 8.05268 10.6326 8 10.5 8H10H9C8.72386 8 8.5 8.22386 8.5 8.5C8.5 8.77614 8.72386 9 9 9ZM10 6.5C10.5523 6.5 11 6.05228 11 5.5C11 4.94772 10.5523 4.5 10 4.5C9.44772 4.5 9 4.94772 9 5.5C9 6.05228 9.44772 6.5 10 6.5Z"
                          fill="#0A0A0A"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Separator */}
                {index < callsData.length - 1 && (
                  <div
                    className="absolute bottom-0 right-4 h-[0.33px] bg-black/20"
                    style={{ width: "320px" }}
                  ></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Encryption notice */}
      <div className="flex items-center justify-center gap-1 px-4 py-1">
        <div className="w-3 h-3 flex items-center justify-center">
          <div className="w-[9px] h-3 relative">
            <div className="w-[9px] h-[7px] bg-[#767779] rounded-sm absolute left-0 top-[5px]"></div>
          </div>
        </div>
        <div className="flex items-center gap-[2px] text-[11px] text-center">
          <span className="text-[#767779]">Your personal</span>
          <span className="text-[#767779]">calls</span>
          <span className="text-[#767779]">are</span>
          <span className="text-[#1DAB61]">end-to-end encrypted</span>
        </div>
      </div>

      <TabBar activeTab="calls" />
    </div>
  );
}
