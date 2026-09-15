import React, { useState } from 'react';

export default function PoemOverlay({ stanzas, onDismiss }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < stanzas.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Dismiss the overlay if they click next on the final stanza
      onDismiss();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 10,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      pointerEvents: 'auto',
      boxSizing: 'border-box'
    }}>
      {/* Dismiss X Button */}
      <button 
        onClick={onDismiss} 
        style={{ 
          position: 'absolute', top: '7rem', right: '2rem', background: 'transparent', 
          color: '#f5e9c8', border: 'none', fontSize: '2.5rem', cursor: 'pointer', opacity: 0.8 
        }}
      >✕</button>

      {/* Centered Grid Container */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '3rem 1fr 3rem',
        gap: '1.5rem', 
        alignItems: 'center', 
        width: '100%', 
        padding: '0 1rem',
        boxSizing: 'border-box'
      }}>
        {/* Prev Arrow */}
        <button 
          onClick={handlePrev} 
          style={{ 
            background: 'transparent', 
            color: currentIndex > 0 ? '#f5e9c8' : 'transparent', 
            border: 'none', 
            fontSize: '4rem', 
            pointerEvents: currentIndex > 0 ? 'auto' : 'none', 
            cursor: 'pointer',
            justifySelf: 'start'
          }}
        >‹</button>

        {/* Poem Text */}
        <p style={{ 
          margin: 0, 
          padding: '0 0.5rem', 
          textAlign: 'center', 
          fontFamily: "'Palatino Linotype', Georgia, serif", 
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', 
          fontWeight: '600', 
          fontStyle: 'italic', 
          color: '#f5e9c8', 
          textShadow: '0 2px 12px rgba(0,0,0,0.85)', 
          whiteSpace: 'pre-wrap', 
          lineHeight: '1.4',
          justifySelf: 'center',
          width: '100%'
        }}>
          {stanzas[currentIndex]}
        </p>

        {/* Next Arrow */}
        <button 
          onClick={handleNext} 
          style={{ 
            background: 'transparent', 
            color: '#f5e9c8', 
            border: 'none', 
            fontSize: '4rem', 
            cursor: 'pointer',
            justifySelf: 'end'
          }}
        >›</button>
      </div>
    </div>
  );
}