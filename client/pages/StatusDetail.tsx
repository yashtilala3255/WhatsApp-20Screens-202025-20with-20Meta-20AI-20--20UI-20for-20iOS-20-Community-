import { Link, useNavigate } from "react-router-dom";
import StatusBar from "../components/StatusBar";

export default function StatusDetail() {
  const navigate = useNavigate();

  return (
    <div className="w-[393px] mx-auto h-screen flex flex-col bg-black relative overflow-hidden">
      {/* Background blurred image */}
      <div 
        className="absolute inset-0 bg-cover bg-center filter blur-[28px]"
        style={{
          backgroundImage: "url('https://api.builder.io/api/v1/image/assets/TEMP/2f74a7b374d94e89d563d84ba3c9febd0fc2b66c?width=2242')",
          width: '1121px',
          height: '1592px',
          left: '-364px',
          bottom: '-387px'
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
            <button onClick={() => navigate(-1)} className="w-8 h-8 flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M18.5 24L10.5 16L18.5 8" stroke="white" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
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
          <div className="text-black font-bold text-[28px] leading-none" style={{ fontFamily: 'Comic Sans MS, -apple-system, Roboto, Helvetica, sans-serif' }}>
            30 years ago...
          </div>
        </div>
      </div>

      {/* Input bar */}
      <div className="flex flex-col items-center gap-[7px] relative z-10">
        <div className="flex items-end gap-2 px-1 py-[5.5px] w-full">
          <div className="flex items-center gap-4 flex-1 h-10 px-[13px] bg-white/22 rounded-[20px]">
            <div className="flex items-end gap-[-6px] flex-1 pb-[2px]">
              <div className="text-white text-[16px] leading-none max-h-[105px] flex-1">
                Reply
              </div>
            </div>
          </div>
          
          <Link 
            to="/status/1/react"
            className="w-10 h-10 bg-white/22 rounded-[20px] flex items-center justify-center"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M1.25 10.0388C1.25 6.20645 3.88066 3.5 7.38822 3.5C9.39099 3.5 11.0365 4.46349 12 5.91415C12.9851 4.45267 14.609 3.5 16.6118 3.5C20.1193 3.5 22.75 6.20645 22.75 10.0388C22.75 14.6506 18.8852 19.1866 12.7903 23.0838C12.5521 23.2246 12.2273 23.3761 12 23.3761C11.7727 23.3761 11.4479 23.2246 11.2205 23.0838C5.1148 19.1866 1.25 14.6506 1.25 10.0388Z" stroke="white" strokeWidth="1.5"/>
            </svg>
          </Link>
        </div>
        
        {/* Home indicator */}
        <div className="py-[21px] pb-2 w-full flex justify-center">
          <div className="w-[140px] h-[5px] bg-black rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
