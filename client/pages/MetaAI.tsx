import React from 'react';
import { StatusBar } from '../components/StatusBar';

export default function MetaAI() {
  return (
    <div className="flex flex-col w-full max-w-[393px] h-screen bg-[#F5F2EB] mx-auto relative overflow-hidden">
      {/* Status Bar */}
      <StatusBar />
      
      {/* Header */}
      <div className="flex w-full h-[98px] px-4 flex-col justify-end items-end relative z-10">
        <div className="flex pr-[61px] items-center self-stretch">
          <div className="flex items-center gap-[-1px] flex-1">
            {/* Back Button */}
            <svg className="w-8 h-8" viewBox="0 0 32 32">
              <path d="M18.5 24L10.5 16L18.5 8" stroke="#0A0A0A" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            
            {/* Chat Number */}
            <div className="flex w-[31px] pr-1 items-center self-stretch">
              <span className="flex-1 text-[#0A0A0A] text-[17px] font-medium tracking-[-0.336px] line-clamp-1">1</span>
            </div>
            
            {/* Contact Info */}
            <div className="flex h-9 pt-1 justify-center items-center gap-[10px] flex-1">
              <div className="flex flex-col items-start gap-[-0.5px]">
                <div className="flex items-center gap-[3px] self-stretch">
                  <span className="max-w-[145px] text-[#0A0A0A] text-[16px] font-semibold tracking-[-0.32px] line-clamp-1">
                    Meta AI
                  </span>
                  <div className="w-[15px] h-[15px] relative">
                    <svg className="w-[15px] h-[14px] absolute fill-[#007BFC]" viewBox="0 0 15 16">
                      <path fillRule="evenodd" clipRule="evenodd" d="M7.82577 1.02987C7.6384 0.868951 7.36161 0.868951 7.17424 1.02987L6.16606 1.89571C6.04552 1.99923 5.88296 2.0393 5.72813 2.00365L4.43305 1.70551C4.19236 1.6501 3.94727 1.77873 3.85615 2.00829L3.36583 3.24348C3.30721 3.39116 3.18188 3.50219 3.02822 3.54258L1.74293 3.88044C1.50406 3.94323 1.34683 4.17102 1.37282 4.41663L1.51268 5.73821C1.52941 5.89621 1.47004 6.05276 1.35274 6.15994L0.371686 7.05641C0.18936 7.22301 0.155997 7.49778 0.293153 7.70318L1.03116 8.80838C1.1194 8.94051 1.13958 9.10672 1.08553 9.25613L0.633457 10.5058C0.549441 10.7381 0.647591 10.9969 0.864491 11.115L2.03158 11.7507C2.17111 11.8266 2.26622 11.9644 2.2878 12.1219L2.46827 13.4385C2.50181 13.6832 2.70899 13.8667 2.95594 13.8705L4.28474 13.891C4.44361 13.8934 4.59186 13.9712 4.68412 14.1006L5.4558 15.1826C5.59921 15.3836 5.86796 15.4499 6.08839 15.3385L7.27449 14.7391C7.41629 14.6674 7.58372 14.6674 7.72553 14.7391L8.91162 15.3385C9.13206 15.4499 9.4008 15.3836 9.54422 15.1826L10.3159 14.1006C10.4082 13.9712 10.5564 13.8934 10.7153 13.891L12.0441 13.8705C12.291 13.8667 12.4982 13.6832 12.5317 13.4385L12.7122 12.1218C12.7338 11.9644 12.8289 11.8266 12.9684 11.7507L14.1355 11.115C14.3524 10.9969 14.4506 10.7381 14.3666 10.5058L13.9145 9.25613C13.8604 9.10672 13.8806 8.94051 13.9688 8.80838L14.7069 7.70318C14.844 7.49778 14.8107 7.22301 14.6283 7.05641L13.6473 6.15994C13.53 6.05276 13.4706 5.89621 13.4873 5.73821L13.6272 4.41663C13.6532 4.17102 13.496 3.94323 13.2571 3.88044L11.9718 3.54258C11.8181 3.50218 11.6928 3.39116 11.6342 3.24348L11.1439 2.00829C11.0527 1.77873 10.8077 1.6501 10.567 1.70551L9.27188 2.00365C9.11705 2.0393 8.95449 1.99923 8.83395 1.89571L7.82577 1.02987ZM11.0202 6.77027C11.2155 6.57501 11.2155 6.25843 11.0202 6.06317C10.825 5.86791 10.5084 5.86791 10.3131 6.06317L6.66667 9.70961L4.85356 7.8965C4.6583 7.70124 4.34171 7.70124 4.14645 7.8965C3.95119 8.09176 3.95119 8.40835 4.14645 8.60361L6.31312 10.7703C6.40689 10.864 6.53406 10.9167 6.66667 10.9167C6.79928 10.9167 6.92646 10.864 7.02023 10.7703L11.0202 6.77027Z" fill="#007BFC"/>
                    </svg>
                  </div>
                </div>
                <span className="text-black/50 text-[12px] tracking-[-0.12px] self-stretch">
                  with Llama 3.2
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex flex-1 pt-10 pb-2 flex-col items-center gap-3 self-stretch relative">
        <div className="flex px-8 flex-col items-center gap-[14px] self-stretch">
          {/* Meta AI Logo */}
          <div className="w-[106px] h-[106px] relative">
            <svg className="w-[106px] h-[106px] absolute" viewBox="0 0 107 106">
              <defs>
                <filter id="filter0_i" x="0.5" y="0" width="106" height="106" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                  <feOffset/>
                  <feGaussianBlur stdDeviation="3.33"/>
                  <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                  <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
                  <feBlend mode="overlay" in2="shape" result="effect1_innerShadow"/>
                </filter>
                <linearGradient id="metaGradient" x1="106.5" y1="0" x2="0.500013" y2="106" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#EFA3E4"/>
                  <stop offset="0.202701" stopColor="#F082D8"/>
                  <stop offset="0.397979" stopColor="#036BE4"/>
                  <stop offset="0.598849" stopColor="#036BE4"/>
                  <stop offset="0.818009" stopColor="#65F9C2"/>
                  <stop offset="1" stopColor="#B5F5E2"/>
                </linearGradient>
              </defs>
              <g filter="url(#filter0_i)">
                <path fillRule="evenodd" clipRule="evenodd" d="M53.5 106C82.7711 106 106.5 82.2711 106.5 53C106.5 23.7289 82.7711 0 53.5 0C24.2289 0 0.5 23.7289 0.5 53C0.5 82.2711 24.2289 106 53.5 106ZM53.5 89.6667C73.7504 89.6667 90.1666 73.2504 90.1666 53C90.1666 32.7495 73.7504 16.3333 53.5 16.3333C33.2495 16.3333 16.8333 32.7495 16.8333 53C16.8333 73.2504 33.2495 89.6667 53.5 89.6667Z" fill="url(#metaGradient)"/>
              </g>
            </svg>
          </div>
          
          {/* Content */}
          <div className="flex flex-col items-center gap-5 self-stretch">
            <h1 className="text-[#0A0A0A] text-[27px] tracking-[-0.402px]">
              Ask Meta AI anything
            </h1>
            
            <div className="self-stretch text-center text-[14px] leading-[19px] tracking-[-0.14px]">
              <span className="text-[#767779]">
                Meta AI is an optional service from Meta that uses AI models to provide responses. Meta AI can only o read messages people share with it. Meta can't read any other messages in your personal chats, as your personal messages remain end-to-end encrypted. Don't share information, including sensitive topics, about others or yourself that you don't want the AI to retain and use, Meta shares information with select{' '}
              </span>
              <span className="text-[#007BFC] cursor-pointer hover:underline">partners</span>
              <span className="text-[#767779]">
                {' '}so Meta AI can offer relevant responses. Messages are generated by AI. Some may be inaccurate or inappropriate.
              </span>
              
              <br /><br />
              
              <span className="text-[#767779]">
                Your interactions with AIs won't be used to improve{' '}
              </span>
              <span className="text-[#007BFC] cursor-pointer hover:underline">AI at Meta</span>
              <span className="text-[#767779]">. Learn more about </span>
              <span className="text-[#007BFC] cursor-pointer hover:underline">Meta's Privacy Policy</span>
              <span className="text-[#767779]"> and your </span>
              <span className="text-[#007BFC] cursor-pointer hover:underline">rights</span>
              <span className="text-[#767779]">.</span>
              
              <br /><br />
              
              <span className="text-[#767779]">
                Your use of WhatsApp is covered by{' '}
              </span>
              <span className="text-[#007BFC] cursor-pointer hover:underline">WhatsApp's Privacy Policy</span>
              <span className="text-[#767779]">. By using Meta AI, you agree to Meta's </span>
              <span className="text-[#007BFC] cursor-pointer hover:underline">AI terms</span>
              <span className="text-[#767779]">. </span>
              <span className="text-[#007BFC] cursor-pointer hover:underline">Learn more</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Input Bar */}
      <div className="flex w-full flex-col items-center">
        <div className="flex px-5 py-[9.5px] pb-[6.5px] items-end gap-2 self-stretch">
          <div className="flex h-[42px] px-[13px] py-2 items-center gap-4 flex-1 bg-white rounded-[22px] backdrop-blur-[20px]">
            <div className="flex pb-[2px] items-end gap-[-6px] flex-1">
              <input 
                type="text"
                className="max-h-[105px] flex-1 text-[#959394] text-[16px] bg-transparent outline-none placeholder-[#959394]"
                placeholder="Message"
              />
            </div>
          </div>
        </div>
        
        {/* Home Indicator */}
        <div className="flex pt-[21px] pb-2 flex-col items-center gap-[10px] self-stretch">
          <div className="w-[140px] h-[5px] bg-[#0A0A0A] rounded-full" />
        </div>
      </div>
    </div>
  );
}
