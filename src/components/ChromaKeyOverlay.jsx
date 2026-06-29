import React, { useEffect, useRef, useState } from 'react';

function ChromaKeyOverlay({ videoSrc }) {
  const videoRef = useRef(null);
  const webcamRef = useRef(null);
  const blitCanvasRef = useRef(null);
  const displayCanvasRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // 1. Initialize Webcam
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
        .then((stream) => {
          if (webcamRef.current) {
            webcamRef.current.srcObject = stream;
          }
        })
        .catch((err) => console.error("Error accessing webcam:", err));
    }

    // 2. Setup Chroma Key Processing loop
    const videoEl = videoRef.current;
    if (!videoEl) return;

    let callbackId;

    const processFrame = (now, metadata) => {
      const blitCanvas = blitCanvasRef.current;
      const displayCanvas = displayCanvasRef.current;
      
      if (!blitCanvas || !displayCanvas || !videoEl) return;

      const blitCtx = blitCanvas.getContext('2d');
      const displayCtx = displayCanvas.getContext('2d');

      // Set downsampled resolutions matching video aspect ratio
      const targetWidth = 480; 
      const targetHeight = targetWidth * (metadata.height / metadata.width);

      if (blitCanvas.width !== targetWidth) {
        blitCanvas.width = targetWidth;
        blitCanvas.height = targetHeight;
        displayCanvas.width = targetWidth;
        displayCanvas.height = targetHeight;
      }

      // Draw the current video frame to the hidden blit canvas
      blitCtx.drawImage(videoEl, 0, 0, targetWidth, targetHeight);
      const imageData = blitCtx.getImageData(0, 0, targetWidth, targetHeight);
      const data = imageData.data;

      // Chrome Key loop processing (removes Green)
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Green Screen Threshold configuration
        if (g > 110 && r < 90 && b < 100) {
          data[i + 3] = 0; // Make pixel fully transparent
        }
      }

      // Paint transparent frame onto visible display canvas
      displayCtx.putImageData(imageData, 0, 0);

      // Loop
      callbackId = videoEl.requestVideoFrameCallback(processFrame);
    };

    // Trigger frame updates when video plays
    const handlePlay = () => {
      callbackId = videoEl.requestVideoFrameCallback(processFrame);
    };

    videoEl.addEventListener('play', handlePlay);

    return () => {
      if (videoEl) {
        videoEl.removeEventListener('play', handlePlay);
        if (callbackId) videoEl.cancelVideoFrameCallback(callbackId);
      }
    };
  }, [videoSrc]); // Triggers reload when target video source changes

  return (
    <div className="chroma-container" style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      
      {/* 1. Live Background Webcam Feed */}
      <video
        ref={webcamRef}
        autoPlay
        playsInline
        muted
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 1
        }}
      />

      {/* 2. Hidden Green Screen Video Element */}
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        loop
        playsInline
        muted
        style={{ display: 'none' }}
      />

      {/* 3. Hidden Scratchpad Canvas */}
      <canvas ref={blitCanvasRef} style={{ display: 'none' }} />

      {/* 4. Transformed Transparent Output Overlay */}
      <canvas
        ref={displayCanvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          zIndex: 2,
          pointerEvents: 'none' // Allows clicking elements through the overlay
        }}
      />
    </div>
  );
}

export default ChromaKeyOverlay;