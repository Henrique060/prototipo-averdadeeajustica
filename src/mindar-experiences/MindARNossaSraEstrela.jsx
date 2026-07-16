import React, { useEffect, useRef, useState } from 'react';
import LearnMorePopUp from '../components/LearnMorePopUp';
import HelpPopUpBtn from '../components/HelpPopUpBtn';
import LogoHeader from '../components/LogoHeader';
import { useMindARLifecycle } from '../hooks/UseMindARLifecycle';
import BackButton from '../components/BackButton';
import './MindAR.css';

export default function MindARNossaSraEstrela({ onTap }) {
  const sceneRef = useRef(null);
  const [showPopUp, setShowPopUp] = useState(true);

  // Tracks if the MindAR image target is physically found by the camera
  const [targetVisible, setTargetVisible] = useState(false);
  
  // Tracks whether the user clicked the translation button to spawn the model
  const [isTranslated, setIsTranslated] = useState(false);

  useMindARLifecycle(sceneRef);

  const [textPhase, setTextPhase] = useState('hidden'); 
      const hasRunSequence = useRef(false);
    
      const runTextSequence = () => {
        if (hasRunSequence.current) return;
        hasRunSequence.current = true;
    
        setTextPhase('text1-in');
    
        setTimeout(() => {
          setTextPhase('text1-out');
        }, 4000);
    
        setTimeout(() => {
          setTextPhase('text2-in');
        }, 5200);
    
        setTimeout(() => {
          setTextPhase('text2-out');
        }, 8500);
    
        setTimeout(() => {
          setTextPhase('done');
        }, 9500);
      };
    
      const handleClosePopUp = () => {
        setShowPopUp(false);
        runTextSequence(); 
      };



  useEffect(() => {
    let isMounted = true;

    const loadScripts = async () => {
      await loadScript('https://aframe.io/releases/1.5.0/aframe.min.js');
      await loadScript('https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-image-aframe.prod.js');
      await loadScript("https://unpkg.com/aframe-look-at-component@0.8.0/dist/aframe-look-at-component.min.js");

      
      try {
        await loadScript('https://unpkg.com/aframe-troika-text/dist/aframe-troika-text.min.js');
      } catch (err) {
        console.warn("Troika text failed to latch onto AFRAME engine lifecycle safely:", err);
      }

      if (!isMounted) return;

      const sceneEl = sceneRef.current;
      if (!sceneEl) return;

      const startAR = () => {
        const arSystem = sceneEl.systems["mindar-image-system"];
        if (arSystem && !arSystem.started) {
          arSystem.start();
        }
      };

      if (sceneEl.hasLoaded || sceneEl.renderStarted) {
        startAR();
      } else {
        sceneEl.addEventListener('renderstart', startAR, { once: true });
      }

      if (onTap) {
        sceneEl.addEventListener('click', onTap);
      }
      
      // Target event listeners need to be attached carefully after AFRAME element bindings finish
      const target = sceneEl.querySelector("[mindar-image-target]");
      
      const handleTargetFound = () => setTargetVisible(true);
      const handleTargetLost = () => {
        setTargetVisible(false);
        // Optional: Reset translation if tracking is lost, or keep it true if preferred
        // setIsTranslated(false); 
      };

      if (target) {
        target.addEventListener("targetFound", handleTargetFound);
        target.addEventListener("targetLost", handleTargetLost);
      }
    };

    loadScripts();

    return () => {
      isMounted = false;
      const arSystem = sceneRef.current?.systems["mindar-image-system"];
      if (arSystem?.started) {
        arSystem.stop();
      }
      if (onTap && sceneRef.current) {
        sceneRef.current.removeEventListener('click', onTap);
      }
    };
  }, [onTap]);

  const text1Opacity = textPhase === 'text1-in' ? 1 : 0;
  const text2Opacity = textPhase === 'text2-in' ? 1 : 0;
  const textVisible = textPhase !== 'hidden' && textPhase !== 'done';

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <div className="header-container-mindar">
        <BackButton />
        <LogoHeader/>
        <HelpPopUpBtn className="help-btn-mindar" onClick={() => setShowPopUp(true)}/>
        {showPopUp &&
          <LearnMorePopUp
            headerName={"Como interagir na experiência?"}
            onClose={handleClosePopUp}
            imgSrc="/images/sala23.webp"
            description="
            Procure o quadro de Nª Srª da Estrela, apontando a câmara para o mesmo.
            Conseguirá ver em detalhe a mensagem transmitida nesta obra."/>
        }
      </div>

      {targetVisible && !isTranslated && (
        <button
          onClick={() => setIsTranslated(true)}
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
          <b>Toque aqui</b> para traduzir o quadro
        </button>
      )}

      <a-scene
        ref={sceneRef}
        mindar-image="imageTargetSrc: /markers/estrela.mind; filterMinCF:0.0001; filterBeta:0.001; autoStart: false; uiLoading: no; uiError: no; uiScanning: no;"
        color-space="sRGB"
        embedded
        renderer="colorManagement: true;"
        vr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: false"
      >
        <a-assets>
          <img id="nsraestrela" src="/images/nsraestrela.webp" crossorigin="anonymous" alt="target asset" />
        </a-assets>
        
        <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

        <a-entity mindar-image-target="targetIndex:0">
          <a-plane 
            src="#nsraestrela"
            position="0 0.2 0.01"
            rotation="0 0 0"
            /* Scale reacts to React state dynamically */
            scale={isTranslated ? "1.5 1.5 1.5" : "0 0 0"}
            width="1"
            height="0.75"
            look-at="[camera]"
          ></a-plane>
        </a-entity>
      </a-scene>

      {textVisible && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 10 }}>
          <p style={{ position: 'absolute', margin: 0, padding: '0 1.5rem', textAlign: 'center', fontFamily: "'Palatino Linotype', Georgia, serif", fontSize: 'clamp(2rem, 5vw, 2.5rem)', fontWeight:'600', fontStyle: 'italic', color: '#f5e9c8', textShadow: '0 2px 12px rgba(0,0,0,0.85)', opacity: text1Opacity, transition: 'opacity 1000ms ease-in-out', maxWidth: '80vw' }}>
            Estrela
          </p>
          <p style={{ position: 'absolute', margin: 0, padding: '0 1.5rem', textAlign: 'center', fontFamily: "'Palatino Linotype', Georgia, serif", fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight:'600', fontStyle: 'italic', color: '#f0dfa8', textShadow: '0 2px 12px rgba(0,0,0,0.85)', opacity: text2Opacity, transition: 'opacity 1000ms ease-in-out', maxWidth: '80vw' }}>
            Tradução??
          </p>
        </div>
      )}
    </div>
  );
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve(); return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}