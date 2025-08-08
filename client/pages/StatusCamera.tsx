import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBar from '../components/StatusBar';

export default function StatusCamera() {
  const navigate = useNavigate();
  const [captureMode, setCaptureMode] = useState<'photo' | 'video' | 'text'>('photo');
  const [isRecording, setIsRecording] = useState(false);
  const [textStatus, setTextStatus] = useState('');
  const [selectedColor, setSelectedColor] = useState('#1DAB61');
  const [selectedFont, setSelectedFont] = useState(0);

  const backgroundColors = [
    '#1DAB61', '#FF6B6B', '#4ECDC4', '#45B7D1', 
    '#96CEB4', '#FECA57', '#FF9FF3', '#54A0FF',
    '#5F27CD', '#00D2D3', '#FF9F43', '#EE5A24'
  ];

  const fonts = [
    'font-sans',
    'font-serif', 
    'font-mono',
    'font-bold'
  ];

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const capturePhoto = () => {
    console.log('Status photo captured');
    navigate('/');
  };

  const publishTextStatus = () => {
    if (textStatus.trim()) {
      console.log('Text status published:', textStatus);
      navigate('/');
    }
  };

  return (
    <div className="w-full max-w-[393px] h-screen flex flex-col bg-black relative overflow-hidden">
      <StatusBar />

      {/* Top Controls */}
      <div className="flex items-center justify-between px-4 py-4 absolute top-12 left-0 right-0 z-10">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 rounded-full bg-black/30 hover:bg-black/40 transition-colors"
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

        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full bg-black/30 hover:bg-black/40 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="2"/>
              <path d="M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22" stroke="white" strokeWidth="2"/>
            </svg>
          </button>

          <button className="p-2 rounded-full bg-black/30 hover:bg-black/40 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M23 7L16 12L23 17V7Z" stroke="white" strokeWidth="2"/>
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2" stroke="white" strokeWidth="2"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 relative">
        {captureMode === 'text' ? (
          // Text Status Editor
          <div 
            className="w-full h-full flex items-center justify-center p-8 transition-colors duration-300"
            style={{ backgroundColor: selectedColor }}
          >
            <textarea
              value={textStatus}
              onChange={(e) => setTextStatus(e.target.value)}
              placeholder="Type a status..."
              className={`w-full bg-transparent text-white text-center text-[24px] placeholder-white/70 border-none outline-none resize-none ${fonts[selectedFont]}`}
              style={{ textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}
              maxLength={250}
              rows={6}
            />
          </div>
        ) : (
          // Camera Preview
          <div className="w-full h-full relative bg-gray-900">
            {/* Camera preview placeholder */}
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
              <div className="text-center">
                <div className="w-24 h-24 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M23 19C23 20.1046 22.1046 21 21 21H3C1.89543 21 1 20.1046 1 19V8C1 6.89543 1.89543 6 3 6H7L9 3H15L17 6H21C22.1046 6 23 6.89543 23 8V19Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="12" cy="13" r="4" stroke="white" strokeWidth="2"/>
                  </svg>
                </div>
                <p className="text-white text-[16px]">Status Camera</p>
                <p className="text-white/60 text-[14px]">Capture photos and videos for your status</p>
              </div>
            </div>

            {/* Recording indicator */}
            {isRecording && (
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-500 px-3 py-1 rounded-full">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                <span className="text-white text-[14px] font-medium">REC</span>
              </div>
            )}

            {/* Timer for stories */}
            <div className="absolute top-4 right-4 bg-black/50 px-3 py-1 rounded-full">
              <span className="text-white text-[14px] font-medium">24h</span>
            </div>
          </div>
        )}

        {/* Text Status Controls */}
        {captureMode === 'text' && (
          <div className="absolute bottom-20 left-0 right-0">
            {/* Color Picker */}
            <div className="px-4 mb-4">
              <div className="flex justify-center">
                <div className="flex gap-2 bg-black/30 rounded-full p-2">
                  {backgroundColors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 ${
                        selectedColor === color ? 'border-white' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Font Selector */}
            <div className="px-4">
              <div className="flex justify-center">
                <div className="flex gap-2 bg-black/30 rounded-full p-2">
                  {fonts.map((font, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedFont(index)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-[16px] ${font} ${
                        selectedFont === index ? 'bg-white/20' : ''
                      }`}
                    >
                      Aa
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Controls */}
      <div className="px-4 py-6 bg-black">
        {/* Mode Selector */}
        <div className="flex items-center justify-center mb-6">
          <div className="flex bg-black/50 rounded-full p-1">
            <button
              onClick={() => setCaptureMode('photo')}
              className={`px-3 py-2 rounded-full text-[14px] font-medium transition-colors ${
                captureMode === 'photo' ? 'bg-white text-black' : 'text-white'
              }`}
            >
              Photo
            </button>
            <button
              onClick={() => setCaptureMode('video')}
              className={`px-3 py-2 rounded-full text-[14px] font-medium transition-colors ${
                captureMode === 'video' ? 'bg-white text-black' : 'text-white'
              }`}
            >
              Video
            </button>
            <button
              onClick={() => setCaptureMode('text')}
              className={`px-3 py-2 rounded-full text-[14px] font-medium transition-colors ${
                captureMode === 'text' ? 'bg-white text-black' : 'text-white'
              }`}
            >
              Text
            </button>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between">
          <button className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="white" strokeWidth="2"/>
              <circle cx="8.5" cy="8.5" r="1.5" stroke="white" strokeWidth="2"/>
              <polyline points="21,15 16,10 5,21" stroke="white" strokeWidth="2"/>
            </svg>
          </button>

          {/* Capture/Publish Button */}
          {captureMode === 'text' ? (
            <button
              onClick={publishTextStatus}
              disabled={!textStatus.trim()}
              className={`px-8 py-4 rounded-full text-white font-medium transition-all ${
                textStatus.trim() 
                  ? 'bg-[#1DAB61] hover:bg-[#169954]' 
                  : 'bg-gray-600 cursor-not-allowed'
              }`}
            >
              Share Status
            </button>
          ) : captureMode === 'photo' ? (
            <button
              onClick={capturePhoto}
              className="w-20 h-20 bg-white rounded-full border-4 border-gray-300 hover:scale-110 transition-transform active:scale-95"
            >
              <div className="w-full h-full bg-white rounded-full"></div>
            </button>
          ) : (
            <button
              onClick={toggleRecording}
              className={`w-20 h-20 rounded-full border-4 border-gray-300 hover:scale-110 transition-all active:scale-95 ${
                isRecording ? 'bg-red-500' : 'bg-white'
              }`}
            >
              <div className={`w-full h-full flex items-center justify-center transition-all ${
                isRecording ? 'rounded-lg scale-50' : 'rounded-full'
              } ${isRecording ? 'bg-white' : 'bg-red-500'}`}>
              </div>
            </button>
          )}

          <button className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="white" strokeWidth="2"/>
              <circle cx="12" cy="7" r="4" stroke="white" strokeWidth="2"/>
            </svg>
          </button>
        </div>

        {/* Status Text */}
        <div className="text-center mt-4">
          {captureMode === 'text' ? (
            <p className="text-white/60 text-[14px]">
              {textStatus.length}/250 characters
            </p>
          ) : (
            <p className="text-white/60 text-[14px]">
              {captureMode === 'photo' ? 'Tap to capture for status' : isRecording ? 'Recording status...' : 'Hold to record status'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
