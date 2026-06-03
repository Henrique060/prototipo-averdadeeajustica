import React from 'react';
import ChromaKeyVideo from "../components/ChromaKeyTest";
import "./ChromaPage.css"; // Import the mobile fullscreen CSS

function ChromaPage() {
  return (
    <div className="fullscreen-container">
      {/* LAYER 1: The live camera background feed (No chroma-keying needed here) */}
      <div className="video-layer background-camera">
        <ChromaKeyVideo
          camera
          facingMode="environment"
          width={640}
          height={360}
        />
      </div>

      {/* LAYER 2: The foreground green-screen asset keyed on top */}
      <div className="video-layer foreground-asset">
        <ChromaKeyVideo
          src="/videos/burocracia-ckey.mp4" // Replace with your asset path
          keyColor={{ r: 168, g: 25, b: 29 }}
          tolerance={80}
          width={640}
          height={360}
        />
      </div>
    </div>
  );
}

export default ChromaPage;