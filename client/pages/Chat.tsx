import React from 'react';
import StatusBar from '../components/StatusBar';

interface MessageBubbleProps {
  type: 'friend' | 'me';
  messageType?: 'text' | 'voice' | 'quote' | 'location';
  message: string;
  time: string;
  isRead?: boolean;
  hasReaction?: boolean;
  reaction?: string;
  quotedMessage?: {
    author: string;
    text: string;
  };
  showTail?: boolean;
  paddingBottom?: boolean;
  sidePadding?: boolean;
  voiceDuration?: string;
  locationImage?: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  type,
  messageType = 'text',
  message,
  time,
  isRead = false,
  hasReaction = false,
  reaction,
  quotedMessage,
  showTail = true,
  paddingBottom = false,
  sidePadding = true,
  voiceDuration,
  locationImage
}) => {
  const isMe = type === 'me';
  const bubbleColor = isMe ? 'bg-[#D0FECF]' : 'bg-white';
  
  const CheckMark = () => (
    <div className="w-[17px] h-[17px] relative">
      <svg className="w-[14px] h-[9px] absolute left-[1px] top-[4px] fill-[#007BFC]" viewBox="0 0 15 11">
        <path d="M9.62236 1.08254C9.87838 0.870234 10.257 0.859742 10.5267 1.07571C10.7965 1.29231 10.8685 1.66525 10.7161 1.96145L10.638 2.08254L4.45342 9.78762C4.32619 9.94613 4.13681 10.043 3.93388 10.0542C3.73103 10.0652 3.53269 9.98881 3.38896 9.84524L0.888962 7.34622C0.60943 7.06669 0.609452 6.61306 0.888962 6.33352C1.16842 6.05423 1.62118 6.05429 1.90068 6.33352L3.83623 8.26809L9.5208 1.18704L9.62236 1.08254ZM13.7093 1.08254C13.9655 0.870255 14.3439 0.860271 14.6136 1.07668C14.8831 1.29324 14.9541 1.66443 14.802 1.96047L14.7239 2.08157L8.53935 9.78665C8.41206 9.94524 8.22287 10.0421 8.01982 10.0532C7.8168 10.0643 7.61867 9.98901 7.4749 9.84524L6.4749 8.84622L6.3831 8.73293C6.20001 8.45522 6.23062 8.078 6.4749 7.83352C6.75436 7.55425 7.2081 7.55333 7.4876 7.83254L7.92217 8.26809L13.6067 1.18606L13.7093 1.08254Z" />
      </svg>
    </div>
  );

  const Tail = ({ type }: { type: 'friend' | 'me' }) => {
    if (type === 'friend') {
      return (
        <svg className="w-[15px] h-[18px] absolute -left-[7.5px] bottom-0" viewBox="0 0 16 20">
          <path d="M8 4.83984L8 0.839844H15.5V14.8398C11.8406 18.0926 4.87479 18.7003 2.40001 18.8138C2.09291 18.8279 1.93536 18.4419 2.15211 18.2239C3.7998 16.5668 8 11.6726 8 4.83984Z" fill="white"/>
        </svg>
      );
    } else {
      return (
        <svg className="w-[15px] h-[18px] absolute -right-[7.5px] bottom-0" viewBox="0 0 16 19">
          <path d="M8 4.33984L8 0.339844H0.5V14.3398C4.15938 17.5926 11.1252 18.2003 13.6 18.3138C13.9071 18.3279 14.0646 17.9419 13.8479 17.7239C12.2002 16.0668 8 11.1726 8 4.33984Z" fill="#D0FECF"/>
        </svg>
      );
    }
  };

  const VoiceWaveform = () => {
    const bars = [8, 14, 16, 15, 24, 20, 15, 18, 12, 15, 18, 10, 8, 6, 24, 20, 12, 18, 14, 10, 4, 15, 18, 10, 14, 8, 12, 15, 18, 20, 12, 16, 10, 6, 8, 12, 18, 10];
    
    return (
      <div className="flex items-center gap-[2px] w-[161px] h-6">
        {bars.map((height, index) => (
          <div
            key={index}
            className="flex-1 bg-black/20 rounded-[10px]"
            style={{ height: `${height}px` }}
          />
        ))}
        <div className="w-3 h-3 bg-[#007BFC] rounded-full -ml-[5px] mt-[6px]" />
      </div>
    );
  };

  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} px-4 ${isMe ? '' : 'pl-2'}`}>
      <div className="flex flex-col items-start gap-[-4px] max-w-[287px]">
        <div className={`flex ${isMe ? 'justify-end' : 'justify-start items-end gap-2'}`}>
          {!isMe && (
            <div className="pl-2">
              <div className="w-[45px] h-[45px] rounded-full border border-black/10 bg-gray-300" />
            </div>
          )}
          
          <div className={`relative flex flex-col min-w-[88px] max-w-[287px] p-[10px] rounded-xl border border-black/[0.06] ${bubbleColor}`}>
            {showTail && <Tail type={type} />}
            
            {messageType === 'voice' && (
              <div className="flex items-start gap-4">
                <div className="flex items-center gap-[10px]">
                  <div className="w-[45px] h-[45px] rounded-full border border-black/10 bg-gray-300" />
                  <div className="w-6 h-6 bg-blue-500 rounded-full" />
                </div>
                <div className="flex flex-col gap-2 flex-1 pt-[5.5px]">
                  <div className="flex items-center gap-[18px]">
                    <div className="w-6 h-6 bg-blue-500 rounded-full" />
                    <VoiceWaveform />
                  </div>
                  <div className="flex justify-between items-center pl-9">
                    <span className="text-black/50 text-[11px] tracking-[0.55px]">{voiceDuration || '0:25'}</span>
                    <div className="flex items-center gap-[2px]">
                      <span className="text-black/50 text-[11px] tracking-[0.55px]">{time}</span>
                      {isMe && isRead && <CheckMark />}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {messageType === 'quote' && quotedMessage && (
              <>
                <div className="flex min-w-[88px] max-w-[275px] bg-black/[0.04] rounded-lg mb-1">
                  <div className="w-1 bg-[#D42A66] rounded-l-lg" />
                  <div className="flex flex-col gap-[2px] p-[9px] flex-1">
                    <div className="text-[#D42A66] text-[14px] font-semibold leading-[19px] tracking-[-0.14px]">
                      {quotedMessage.author}
                    </div>
                    <div className="text-[#232626] text-[12px] leading-4 line-clamp-3">
                      {quotedMessage.text}
                    </div>
                  </div>
                </div>
                <div className="flex items-start px-[6px] pt-[3px]">
                  <div className="max-w-[267px] text-[#0A0A0A] text-[16px] leading-[21px] tracking-[-0.205px]">
                    {message}
                  </div>
                  {sidePadding && <div className="w-[60px] self-stretch" />}
                </div>
              </>
            )}
            
            {messageType === 'location' && (
              <div className="flex flex-col w-[279px]">
                <img 
                  src={locationImage || "https://cdn.builder.io/api/v1/image/assets%2F58a45ac74f684c229db5d48c4fd195ba%2Fafb5fb3d8aab422e9236c17c8380e530?format=webp&width=800"}
                  alt="Map location"
                  className="w-[279px] h-[157px] rounded-lg object-cover"
                />
                <div className="absolute bottom-0 right-0 w-[176px] h-[37px] bg-gradient-to-t from-black/53 to-transparent rounded-br-lg">
                  <div className="absolute right-[5px] top-[20px] flex items-center gap-[2px]">
                    <span className="text-white text-[11px] tracking-[0.55px]">{time}</span>
                  </div>
                </div>
              </div>
            )}
            
            {messageType === 'text' && (
              <>
                <div className="flex items-start">
                  <div className="max-w-[267px] text-[#0A0A0A] text-[16px] leading-[21px] tracking-[-0.205px]">
                    {message}
                  </div>
                  {sidePadding && <div className="w-[43px] h-[21px]" />}
                </div>
                {paddingBottom && <div className="w-[68px] h-[15px]" />}
              </>
            )}
            
            {messageType !== 'voice' && messageType !== 'location' && (
              <div className="flex justify-end items-center gap-[2px] -mr-[8px] -mb-[3px]">
                <span className="text-black/50 text-[11px] tracking-[0.55px]">{time}</span>
                {isMe && isRead && <CheckMark />}
              </div>
            )}
          </div>
        </div>
        
        {hasReaction && reaction && (
          <div className={`flex ${isMe ? 'pr-[10px]' : 'pl-[18px]'} mt-[-4px]`}>
            <div className="flex items-center h-[24.5px] px-[9px] py-[4px] bg-white border border-[#F0E9DF] rounded-[13px] shadow-sm">
              <span className="text-[16px] tracking-[4.8px]">{reaction}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const DateSeparator: React.FC<{ date: string }> = ({ date }) => (
  <div className="flex justify-center items-center py-6 px-0">
    <div className="flex min-w-[100px] px-[14px] py-[3px] justify-center items-center bg-white border border-black/[0.06] rounded-lg">
      <span className="text-[#0A0A0A] text-[12px] font-semibold text-center">{date}</span>
    </div>
  </div>
);

export default function Chat() {
  return (
    <div className="flex flex-col w-full max-w-[393px] h-screen bg-[#F5F2EB] mx-auto relative overflow-hidden">
      {/* Status Bar */}
      <StatusBar />
      
      {/* Contact Header */}
      <div className="flex w-full h-[98px] px-[22px] pr-0 flex-col justify-end items-end relative z-10">
        <div className="absolute inset-0 bg-[rgba(245,242,235,0.8)] backdrop-blur-[25px]" />
        <div className="flex justify-between items-center w-full relative">
          <div className="flex w-[272px] items-center gap-[-1px]">
            {/* Back Button */}
            <svg className="w-8 h-8 flex-shrink-0" viewBox="0 0 32 32">
              <path d="M18.5 24L10.5 16L18.5 8" stroke="#0A0A0A" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            
            {/* Chat Number */}
            <div className="flex w-[31px] pr-1 items-center flex-shrink-0 self-stretch">
              <span className="flex-1 text-[#0A0A0A] text-[17px] font-medium tracking-[-0.336px] line-clamp-1">1</span>
            </div>
            
            {/* Contact Info */}
            <div className="flex items-center gap-[10px] flex-1">
              <div className="flex w-9 h-9 justify-center items-center rounded-[18px] relative">
                <div className="w-9 h-9 rounded-[18px] border border-black/10 bg-gray-300 absolute" />
              </div>
              <div className="flex flex-col items-start gap-[-0.5px] flex-1">
                <div className="flex items-center gap-[3px] self-stretch">
                  <span className="max-w-[145px] text-[#0A0A0A] text-[16px] font-semibold tracking-[-0.32px] line-clamp-1">
                    Emmett "Doc" Brown
                  </span>
                </div>
                <span className="text-black/50 text-[12px] tracking-[-0.12px] line-clamp-1 self-stretch">
                  tap here for contact info
                </span>
              </div>
            </div>
          </div>
          
          {/* Call Buttons */}
          <div className="flex pb-[2px] items-start gap-4">
            <div className="w-8 h-8">
              <svg className="w-[26px] h-[17px] absolute left-[3px] top-[8px] fill-[#0A0A0A]" viewBox="0 0 26 18">
                <path fillRule="evenodd" clipRule="evenodd" d="M3.49995 0.700195C1.67741 0.700195 0.199951 2.17766 0.199951 4.0002V14.0002C0.199951 15.8227 1.67741 17.3002 3.49995 17.3002H16C17.8226 17.3002 19.3 15.8227 19.3 14.0002V12.0266L22.8181 15.0895C23.9828 16.1036 25.8 15.2763 25.8 13.7319L25.8 4.26852C25.8 2.72414 23.9829 1.89685 22.8181 2.91093L19.3 5.9738V4.0002C19.3 2.17766 17.8226 0.700195 16 0.700195H3.49995ZM19.3 8.09521V9.9052L23.8687 13.8828C23.9981 13.9954 24.2 13.9035 24.2 13.7319L24.2 4.26852C24.2 4.09692 23.9981 4.005 23.8687 4.11767L19.3 8.09521ZM1.79995 4.0002C1.79995 3.06131 2.56107 2.3002 3.49995 2.3002H16C16.9389 2.3002 17.7 3.06131 17.7 4.0002V14.0002C17.7 14.9391 16.9389 15.7002 16 15.7002H3.49995C2.56107 15.7002 1.79995 14.9391 1.79995 14.0002V4.0002Z"/>
              </svg>
            </div>
            <div className="w-8 h-8">
              <svg className="w-5 h-5 absolute left-[6px] top-[6px] fill-[#0A0A0A]" viewBox="0 0 21 21">
                <path d="M15.7676 20.1555C12.8452 20.1555 9.2666 18.3303 5.9751 15.0388C2.66309 11.7268 0.858398 8.15846 0.858398 5.22584C0.858398 3.45192 1.34033 2.27272 2.50928 1.22682C2.59131 1.15504 2.67334 1.08326 2.76562 1.00123C3.45264 0.385998 4.12939 0.0886352 4.77539 0.0988891C5.51367 0.109143 6.20068 0.529553 6.83643 1.44215L8.90771 4.42604C9.54346 5.33864 9.61523 6.42555 8.75391 7.28688L7.97461 8.07643C7.73877 8.31227 7.72852 8.50709 7.86182 8.74293C8.27197 9.38893 9.04102 10.2708 9.84082 11.0603C10.5996 11.8191 11.7173 12.7932 12.271 13.1419C12.4966 13.2854 12.7017 13.2752 12.9375 13.0393L13.7271 12.2498C14.5884 11.3987 15.665 11.4705 16.5879 12.1062L19.5718 14.1775C20.4844 14.8132 20.915 15.5003 20.915 16.2385C20.915 16.8845 20.6279 17.5613 20.0127 18.2483C19.9409 18.3303 19.8589 18.4226 19.7769 18.5047C18.7412 19.6736 17.562 20.1555 15.7676 20.1555Z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Chat Messages */}
      <div className="flex-1 flex flex-col justify-end pb-2 gap-3 relative overflow-y-auto">
        {/* Background */}
        <div className="absolute inset-0 bg-[#F5F2EB]" />
        
        <div className="flex flex-col gap-3 relative">
          <DateSeparator date="Yesterday" />
          
          <MessageBubble
            type="me"
            messageType="voice"
            message=""
            time="22:30"
            isRead={true}
            hasReaction={true}
            reaction="👍"
            voiceDuration="0:25"
          />
          
          <DateSeparator date="Today" />
          
          <MessageBubble
            type="friend"
            message="Marty?"
            time="08:21"
          />
          
          <MessageBubble
            type="me"
            message="Hey, hey, Doc, where are you?"
            time="08:21"
            isRead={true}
            paddingBottom={true}
          />
          
          <div className="flex flex-col gap-[3.33px]">
            <MessageBubble
              type="friend"
              message="Thank God I found you."
              time="08:21"
              showTail={false}
            />
            
            <MessageBubble
              type="friend"
              message="Listen, can you meet me at Twin Pines Mall tonight at 1:15? I've made a major breakthrough... I'll need your assistance."
              time="08:21"
            />
          </div>
          
          <MessageBubble
            type="me"
            message="Wait a minute, wait a minute. 1:15 in the morning?"
            time="08:21"
            isRead={true}
          />
          
          <MessageBubble
            type="friend"
            messageType="quote"
            message="Yes. In the morning."
            time="08:21"
            hasReaction={true}
            reaction="😫"
            quotedMessage={{
              author: "You",
              text: "Wait a minute, wait a minute. 1:15 in the morning?"
            }}
          />
          
          <MessageBubble
            type="me"
            message="What's goin' on? Where have you been all week?"
            time="08:22"
            isRead={true}
          />
          
          <MessageBubble
            type="friend"
            message="Working."
            time="08:22"
            hasReaction={true}
            reaction="👍"
          />
          
          <MessageBubble
            type="me"
            message="Where's Einstein, is he with you? 🐶"
            time="08:22"
            isRead={true}
            paddingBottom={true}
          />
          
          <MessageBubble
            type="friend"
            message="Yeah, he's right here."
            time="08:22"
          />
          
          <MessageBubble
            type="me"
            message="You know, Doc, you left your equipment on all week."
            time="08:22"
            isRead={true}
          />
          
          <div className="flex flex-col gap-[3.33px]">
            <MessageBubble
              type="friend"
              message="My equipment, that reminds me, Marty, you better not hook up to the amplifier..."
              time="08:22"
              showTail={false}
              sidePadding={false}
            />
            
            <MessageBubble
              type="friend"
              message="There's a slight possibility for overload ⛔️"
              time="08:23"
              sidePadding={false}
            />
          </div>
          
          <MessageBubble
            type="me"
            message="Yeah, I'll keep that in mind...."
            time="08:23"
            isRead={true}
          />
          
          <MessageBubble
            type="friend"
            message="Good, I'll see you tonight. Don't forget, now, 1:15 a.m., Twin Pines Mall."
            time="08:23"
          />
          
          <MessageBubble
            type="me"
            message="Right."
            time="08:24"
            isRead={true}
            paddingBottom={true}
          />
          
          <div className="flex flex-col gap-[3.33px]">
            <MessageBubble
              type="friend"
              message="❤❤❤️"
              time="08:24"
              showTail={false}
            />
            
            <MessageBubble
              type="friend"
              messageType="location"
              message=""
              time="08:24"
              locationImage="https://cdn.builder.io/api/v1/image/assets%2F58a45ac74f684c229db5d48c4fd195ba%2Fafb5fb3d8aab422e9236c17c8380e530?format=webp&width=800"
            />
          </div>
        </div>
      </div>
      
      {/* Input Bar */}
      <div className="flex w-full flex-col items-center relative">
        <div className="w-full h-[77px] bg-[rgba(245,242,235,0.8)] backdrop-blur-[25px]" />
        <div className="absolute inset-0 flex px-[7px] py-[5.5px] items-center gap-2">
          {/* Plus Button */}
          <div className="w-8 h-8">
            <svg className="w-5 h-5 absolute left-[6px] top-[6px] fill-[#0A0A0A]" viewBox="0 0 20 21">
              <path fillRule="evenodd" clipRule="evenodd" d="M10.9 1.5001C10.9 1.00304 10.497 0.600098 9.99998 0.600098C9.50292 0.600098 9.09998 1.00304 9.09998 1.5001V9.6001H0.999975C0.502918 9.6001 0.0999756 10.003 0.0999756 10.5001C0.0999756 10.9972 0.502918 11.4001 0.999975 11.4001H9.09998V19.5001C9.09998 19.9972 9.50292 20.4001 9.99998 20.4001C10.497 20.4001 10.9 19.9972 10.9 19.5001V11.4001H19C19.497 11.4001 19.9 10.9972 19.9 10.5001C19.9 10.003 19.497 9.6001 19 9.6001H10.9V1.5001Z"/>
            </svg>
          </div>
          
          {/* Input Field */}
          <div className="flex px-[10px] py-[3px] items-end gap-4 flex-1 bg-white border border-[#B2B2B2] rounded-[15px]">
            <div className="flex pb-[3px] items-end gap-[-6px] flex-1">
              <input 
                type="text"
                className="max-h-[105px] flex-1 text-[#0A0A0A] text-[16px] leading-[21px] tracking-[-0.32px] bg-transparent outline-none"
                placeholder=""
              />
            </div>
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M11.6155 2.89991L13.9359 2.89991C14.4593 2.8999 14.7592 2.8999 15.0179 2.92026C18.2543 3.17497 20.825 5.7456 21.0797 8.98208C21.1 9.24075 21.1 9.54062 21.1 10.0641V10.1375C21.1 10.9379 21.1 11.377 21.0704 11.7531C20.6999 16.4607 16.9609 20.1998 12.2532 20.5703C11.8771 20.5999 11.438 20.5999 10.6376 20.5999H10.2524C9.5543 20.5999 9.15436 20.5999 8.81015 20.5638C5.71097 20.238 3.26192 17.789 2.93619 14.6898C2.90001 14.3456 2.90002 13.9457 2.90003 13.2477L2.90003 11.6154C2.89993 9.64928 2.89987 8.52143 3.18423 7.58403C3.8241 5.47466 5.47478 3.82397 7.58415 3.1841C8.52155 2.89975 9.6494 2.89981 11.6155 2.89991Z" fill="#0A0A0A"/>
            </svg>
          </div>
          
          {/* Camera and Mic */}
          <div className="flex pl-[6px] items-start gap-[7px]">
            <div className="w-8 h-8">
              <svg className="w-6 h-[18px] absolute left-1 top-[6px] fill-[#0A0A0A]" viewBox="0 0 24 19">
                <path fillRule="evenodd" clipRule="evenodd" d="M8.3302 1.58112C8.80515 1.02227 9.50156 0.700195 10.235 0.700195H13.762C14.4954 0.700195 15.1918 1.02228 15.6668 1.58112L16.3484 2.38312C16.5193 2.58427 16.77 2.7002 17.034 2.7002H20.7499C22.4344 2.7002 23.7999 4.06573 23.7999 5.7502V15.7502C23.7999 17.4347 22.4344 18.8002 20.75 18.8002H3.24995C1.56548 18.8002 0.199951 17.4347 0.199951 15.7502V5.7502C0.199951 4.06573 1.56548 2.7002 3.24995 2.7002H6.96302C7.227 2.7002 7.47766 2.58427 7.64861 2.38312L8.3302 1.58112Z"/>
              </svg>
            </div>
            <div className="w-8 h-8">
              <div className="w-4 h-[23px] absolute left-2 top-1 fill-[#0A0A0A]">
                <div className="w-[7px] h-[15px] border-[1.6px] border-black rounded-[7px] absolute left-1 top-[1px]" />
                <div className="w-[2px] h-[5px] bg-[#D9D9D9] rounded absolute left-[7px] top-[18px]" />
              </div>
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
