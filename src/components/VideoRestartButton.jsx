import React from 'react';

export default function VideoRestartButton({ onRestart }) {
  return (
    <div className="video-overlay">
      <button
        onClick={onRestart}
        style={{
          position: "absolute",
          bottom: "50%",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
          padding: "14px 28px",
          border: "none",
          borderRadius: "14px",
          background: "#EA562E",
          color: "#E4D7C4",
          fontSize: "1rem",
          fontWeight: 600,
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
        }}
      >
        Reiniciar Vídeo
      </button>
    </div>
  );
}