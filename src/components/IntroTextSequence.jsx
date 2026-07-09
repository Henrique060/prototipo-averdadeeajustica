import React, { useEffect, useState, useRef } from 'react';

export default function IntroTextSequence({ 
  text1, 
  text2, 
  isActive, 
  onSequenceComplete 
}) {
  const [textPhase, setTextPhase] = useState('hidden'); // 'hidden' | 'text1-in' | 'text1-out' | 'text2-in' | 'text2-out' | 'done'
  const hasRunSequence = useRef(false);

  useEffect(() => {
    // Only run when active (e.g., after the welcome popup closes)
    if (!isActive || hasRunSequence.current) return;
    hasRunSequence.current = true;

    // Phase 1: fade in text 1
    setTextPhase('text1-in');

    const t1 = setTimeout(() => setTextPhase('text1-out'), 2800);
    const t2 = setTimeout(() => setTextPhase('text2-in'), 3800);
    const t3 = setTimeout(() => setTextPhase('text2-out'), 6600);
    const t4 = setTimeout(() => {
      setTextPhase('done');
      if (onSequenceComplete) onSequenceComplete();
    }, 7600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [isActive, onSequenceComplete]);

  // Derive opacity from phase
  const text1Opacity = textPhase === 'text1-in' ? 1 : 0;
  const text2Opacity = textPhase === 'text2-in' ? 1 : 0;
  const textVisible = textPhase !== 'hidden' && textPhase !== 'done';

  if (!textVisible) return null;

  // Shared text styling configuration
  const baseTextStyle = {
    position: 'absolute',
    margin: 0,
    padding: '0 1.5rem',
    textAlign: 'center',
    fontFamily: "'Palatino Linotype', Palatino, 'Book Antiqua', Georgia, serif",
    textShadow: '0 2px 12px rgba(0,0,0,0.85), 0 0 40px rgba(0,0,0,0.6)',
    letterSpacing: '0.04em',
    lineHeight: 1.5,
    transition: 'opacity 900ms ease-in-out',
    maxWidth: '80vw',
  };

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        zIndex: 10,
      }}
    >
      {/* Text 1 */}
      <p
        style={{
          ...baseTextStyle,
          fontSize: 'clamp(2rem, 5vw, 2.5rem)',
          fontStyle: 'italic',
          color: '#f5e9c8',
          opacity: text1Opacity,
        }}
      >
        {text1}
      </p>

      {/* Text 2 */}
      <p
        style={{
          ...baseTextStyle,
          fontSize: 'clamp(2rem, 4vw, 2.5rem)',
          color: '#f0dfa8',
          opacity: text2Opacity,
        }}
      >
        {text2}
      </p>
    </div>
  );
}