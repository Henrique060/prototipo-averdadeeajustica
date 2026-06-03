import React from 'react';
import ChromaKeyVideo from "../components/ChromaKeyTest";
import "./ChromaPage.css";

function ChromaPage() {
  return (
    <div className="fullscreen-container">
      {/* BACKGROUND CAMERA (Flipped to portrait dimensions for mobile layout) */}
      <div className="video-layer background-camera">
        <ChromaKeyVideo
          camera
          facingMode="environment"
          width={360}  /* Swapped for mobile portrait */
          height={640} /* Swapped for mobile portrait */
        />
      </div>

      {/* FOREGROUND KEYED ASSET */}
      <div className="video-layer foreground-asset">
        <ChromaKeyVideo
          src="/videos/burocracia-ckey.mp4"
          keyColor={{ r: 168, g: 25, b: 29 }}
          tolerance={80}
          width={360}
          height={640}
        />
      </div>
    </div>
  );
}

export default ChromaPage;