import React, { useRef, useState } from 'react';
import ChromaKeyVideo from "../components/ChromaKeyTest";
import "./ChromaPage.css";

function ChromaPage() {
  const [started, setStarted] = useState(false);

  return (
    <div className="fullscreen-container">

      {/* BACKGROUND */}
      <div className="video-layer background-camera">
        <ChromaKeyVideo
          camera
          facingMode="environment"
          width={360}
          height={640}
        />
      </div>

      {/* FOREGROUND */}
      <div className="video-layer foreground-asset">
        {started && (
          <div className="video-frame">
            <ChromaKeyVideo
              src="/videos/burocracia-ckey.mp4"
              keyColor={{ r: 168, g: 25, b: 29 }}
              tolerance={80}
              width={360}
              height={640}
            />
          </div>
        )}
      </div>

      {/* UI OVERLAY */}
      <div className="ui-overlay">
        {!started ? (
          <button className="start-btn" onClick={() => setStarted(true)}>
            Start Video
          </button>
        ) : (
          <button className="stop-btn" onClick={() => setStarted(false)}>
            Stop
          </button>
        )}
      </div>

    </div>
  );
}

export default ChromaPage;