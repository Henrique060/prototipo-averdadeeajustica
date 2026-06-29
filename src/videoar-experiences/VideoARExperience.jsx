import React, { useState } from 'react';
import ChromaKeyOverlay from '../components/ChromaKeyOverlay';

function VideoARExperience() {
  const [currentOverlay, setCurrentOverlay] = useState('/videos/character1.mp4');

  return (
    <div>
      {/* Simply passing the changing state variable updates the overlay automatically */}
      <ChromaKeyOverlay videoSrc={currentOverlay} />

      {/* Interface buttons to test changing overlays */}
      <div style={{ position: 'absolute', bottom: '20px', zIndex: 10, width: '100%', textAlign: 'center' }}>
        <button onClick={() => setCurrentOverlay('/videos/fonte-ciclo-agua.mp4')}>Effect 1</button>
      </div>
    </div>
  );
}

export default VideoARExperience;