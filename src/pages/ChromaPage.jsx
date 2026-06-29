import React, { useState } from 'react';
import ChromaKeyOverlay from '../components/ChromaKeyOverlay';
import "./ChromaPage.css";

function ChromaPage() {
  const [started, setStarted] = useState(false);

  return (
    <div className="page-wrapper">
      
      {/* 9:16 VIDEO STACK */}
      <div className="chroma-page-container">
        
        {/* Layer 1: Background Camera (Bottom) */}
        <div className="video-layer background-camera">
          <ChromaKeyOverlay
            camera
            facingMode="environment"
            width={360}
            height={640}
          />
        </div>

        {/* Layer 2: Foreground Asset (Top) */}
        <div className="video-layer foreground-asset">
          {started && (
            <div className="video-frame">
              <ChromaKeyOverlay
                src="/videos/burocracia-ckey.mp4"
                keyColor={{ r: 168, g: 25, b: 29 }}
                tolerance={80}
                width={360}
                height={640}
              />
            </div>
          )}
        </div>

      </div>

      {/* CONTROLS (Independent and structurally underneath the video stack) */}
      <div className="ui-controls">
        <button 
          className={`action-btn ${started ? 'stop-btn' : 'start-btn'}`} 
          onClick={() => setStarted(!started)}
        >
          {started ? 'Stop' : 'Start Video'}
        </button>
      </div>

    </div>
  );
}

export default ChromaPage;