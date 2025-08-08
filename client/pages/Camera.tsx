import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import StatusBar from "../components/StatusBar";

export default function Camera() {
  const navigate = useNavigate();
  const [cameraMode, setCameraMode] = useState<"photo" | "video">("photo");
  const [isRecording, setIsRecording] = useState(false);
  const [flashMode, setFlashMode] = useState<"off" | "on" | "auto">("auto");
  const [cameraFacing, setCameraFacing] = useState<"front" | "back">("back");
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // TODO: Implement video recording
  };

  const capturePhoto = () => {
    // TODO: Implement photo capture
    console.log("Photo captured");
  };

  const toggleCamera = () => {
    setCameraFacing((prev) => (prev === "front" ? "back" : "front"));
    // TODO: Switch camera
  };

  const getFlashIcon = () => {
    switch (flashMode) {
      case "off":
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M17 10H20L11 21V14H8L17 3V10Z"
              stroke="white"
              strokeWidth="2"
            />
            <path d="M3 3L21 21" stroke="white" strokeWidth="2" />
          </svg>
        );
      case "on":
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M17 10H20L11 21V14H8L17 3V10Z"
              stroke="white"
              strokeWidth="2"
              fill="white"
            />
          </svg>
        );
      case "auto":
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M17 10H20L11 21V14H8L17 3V10Z"
              stroke="white"
              strokeWidth="2"
            />
            <text x="12" y="6" textAnchor="middle" fill="white" fontSize="8">
              A
            </text>
          </svg>
        );
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

        <div className="flex items-center gap-4">
          <button
            onClick={() =>
              setFlashMode((prev) => {
                const modes: ("off" | "on" | "auto")[] = ["off", "auto", "on"];
                const currentIndex = modes.indexOf(prev);
                return modes[(currentIndex + 1) % modes.length];
              })
            }
            className="p-2 rounded-full bg-black/30 hover:bg-black/40 transition-colors"
          >
            {getFlashIcon()}
          </button>

          <button
            onClick={toggleCamera}
            className="p-2 rounded-full bg-black/30 hover:bg-black/40 transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M17 14V12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12V14"
                stroke="white"
                strokeWidth="2"
              />
              <path
                d="M17 14H19C20.1046 14 21 14.8954 21 16V18C21 19.1046 20.1046 20 19 20H17V14Z"
                stroke="white"
                strokeWidth="2"
              />
              <path
                d="M7 14H5C3.89543 14 3 14.8954 3 16V18C3 19.1046 3.89543 20 5 20H7V14Z"
                stroke="white"
                strokeWidth="2"
              />
              <path d="M12 7V4" stroke="white" strokeWidth="2" />
              <path d="M8 4H16" stroke="white" strokeWidth="2" />
            </svg>
          </button>
        </div>
      </div>

      {/* Camera Preview */}
      <div className="flex-1 relative bg-gray-900">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
          playsInline
        />

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
                <circle cx="12" cy="13" r="4" stroke="white" strokeWidth="2" />
              </svg>
            </div>
            <p className="text-white text-[16px]">Camera preview</p>
            <p className="text-white/60 text-[14px]">
              Enable camera access to see live preview
            </p>
          </div>
        </div>

        {/* Recording indicator */}
        {isRecording && (
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-500 px-3 py-1 rounded-full">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            <span className="text-white text-[14px] font-medium">REC</span>
          </div>
        )}

        {/* Grid lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-full h-full grid grid-cols-3 grid-rows-3 opacity-30">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="border border-white/20"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="px-4 py-6 bg-black">
        {/* Mode Selector */}
        <div className="flex items-center justify-center mb-6">
          <div className="flex bg-black/50 rounded-full p-1">
            <button
              onClick={() => setCameraMode("photo")}
              className={`px-4 py-2 rounded-full text-[16px] font-medium transition-colors ${
                cameraMode === "photo" ? "bg-white text-black" : "text-white"
              }`}
            >
              Photo
            </button>
            <button
              onClick={() => setCameraMode("video")}
              className={`px-4 py-2 rounded-full text-[16px] font-medium transition-colors ${
                cameraMode === "video" ? "bg-white text-black" : "text-white"
              }`}
            >
              Video
            </button>
          </div>
        </div>

        {/* Capture Controls */}
        <div className="flex items-center justify-between">
          <button className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="2"
                ry="2"
                stroke="white"
                strokeWidth="2"
              />
              <circle
                cx="8.5"
                cy="8.5"
                r="1.5"
                stroke="white"
                strokeWidth="2"
              />
              <polyline
                points="21,15 16,10 5,21"
                stroke="white"
                strokeWidth="2"
              />
            </svg>
          </button>

          {/* Capture Button */}
          {cameraMode === "photo" ? (
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
                isRecording ? "bg-red-500" : "bg-white"
              }`}
            >
              <div
                className={`w-full h-full flex items-center justify-center transition-all ${
                  isRecording ? "rounded-lg scale-50" : "rounded-full"
                } ${isRecording ? "bg-white" : "bg-red-500"}`}
              ></div>
            </button>
          )}

          <button className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="2" />
              <path
                d="M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22"
                stroke="white"
                strokeWidth="2"
              />
            </svg>
          </button>
        </div>

        {/* Status Text */}
        <div className="text-center mt-4">
          <p className="text-white/60 text-[14px]">
            {cameraMode === "photo"
              ? "Tap to capture"
              : isRecording
                ? "Recording..."
                : "Hold to record"}
          </p>
        </div>
      </div>
    </div>
  );
}
