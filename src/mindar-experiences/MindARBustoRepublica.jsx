import React, { useEffect, useRef, useState } from "react";
import LearnMorePopUp from '../components/LearnMorePopUp';
import HelpPopUpBtn from '../components/HelpPopUpBtn';
import LogoHeader from '../components/LogoHeader';
import BackButton from "../components/BackButton";
import './MindARBusto.css';

export default function MindARBustoRepublica({ onTap }) {
  const sceneRef = useRef(null);
  const [showPopUp, setShowPopUp] = useState(true);
  const [targetVisible, setTargetVisible] = useState(false);

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
    let mounted = true;
    let cleanupListeners = null;

    const init = async () => {
      // 1. Load the correct A-Frame and MIND-AR FACE scripts
      await loadScript("https://aframe.io/releases/1.5.0/aframe.min.js");
      await loadScript("https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-face-aframe.prod.js");

      if (!mounted) return;

      const scene = sceneRef.current;
      if (!scene) return;

      // 2. Start the correct system (mindar-face-system)
      const startAR = () => {
        const system = scene.systems["mindar-face-system"];
        if (system && !system.started) {
          system.start();
        }
      };

      if (scene.hasLoaded || scene.renderStarted) {
        startAR();
      } else {
        scene.addEventListener("renderstart", startAR, { once: true });
      }

      if (onTap) {
        scene.addEventListener("click", onTap);
      }

      // 3. Look for the face target instead of image target
      const target = scene.querySelector("[mindar-face-target]");

      const handleTargetFound = () => {
        setTargetVisible(true);
        console.log("Face found!");
      };

      const handleTargetLost = () => {
        setTargetVisible(false);
        console.log("Face lost!");
      };

      if (target) {
        target.addEventListener("targetFound", handleTargetFound);
        target.addEventListener("targetLost", handleTargetLost);
      }

      cleanupListeners = () => {
        if (target) {
          target.removeEventListener("targetFound", handleTargetFound);
          target.removeEventListener("targetLost", handleTargetLost);
        }
        if (onTap) {
          scene.removeEventListener("click", onTap);
        }
      };
    };

    init();

    return () => {
      mounted = false;
      if (cleanupListeners) cleanupListeners();

      // 4. Clean up the face system properly on unmount
      const system = sceneRef.current?.systems["mindar-face-system"];
      if (system?.started) {
        system.stop();
      }
    };
  }, [onTap]);


  const text1Opacity = textPhase === 'text1-in' ? 1 : 0;
  const text2Opacity = textPhase === 'text2-in' ? 1 : 0;
  const textVisible = textPhase !== 'hidden' && textPhase !== 'done';

  return (
    <div >
      {/* Keep your header OUTSIDE the flipped wrapper so text reads correctly */}
            <div className="header-container-mindar">
            <BackButton />
            <LogoHeader />
            <HelpPopUpBtn className="help-btn-mindar" onClick={() => setShowPopUp(true)} />
            {showPopUp && (
                <LearnMorePopUp
                headerName={"Como interagir na experiência?"}
                onClose={handleClosePopUp}
                imgSrc="/images/bustorepublica.webp"
                description="A experiência faz uso da câmara frontal. 
                Transforme-se na famosa cara da república portuguesa, usando o busto da mesma."
                />
            )}
            </div>

            {/* NEW: Flipped wrapper container solely for the AR tracking view */}
            <div className="ar-viewport-wrapper">
            <a-scene 
  ref={sceneRef}
  mindar-face 
  embedded 
  color-space="sRGB" 
  renderer="colorManagement: true, physicallyCorrectLights" 
  vr-mode-ui="enabled: false" 
  device-orientation-permission-ui="enabled: false"
>
  <a-assets>
    <a-asset-item id="bustoRepublica" src="/models/busto-republica.glb"></a-asset-item>
  </a-assets>

  <a-camera active="false" position="0 0 0"></a-camera>

  {/* MindAR tracks this target anchor */}
  <a-entity mindar-face-target="anchorIndex:168">
    
    {/* NEW: Neutral wrapper entity used strictly to flip the horizontal axis */}
    <a-entity scale="-1 1 1" rotation="0 0 0">
      
      <a-gltf-model
        src="#bustoRepublica"
        position="0 0.3 0"
        scale="2.5 1.5 2.5" 
      >
      </a-gltf-model> 
      
    </a-entity>

  </a-entity>
</a-scene>

{textVisible && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 10 }}>
          <p style={{ position: 'absolute', margin: 0, padding: '0 1.5rem', textAlign: 'center', fontFamily: "'Palatino Linotype', Georgia, serif", fontSize: 'clamp(2rem, 5vw, 2.5rem)', fontWeight:'600', fontStyle: 'italic', color: '#f5e9c8', textShadow: '0 2px 12px rgba(0,0,0,0.85)', opacity: text1Opacity, transition: 'opacity 1000ms ease-in-out', maxWidth: '80vw' }}>
            Cabeça
          </p>
          <p style={{ position: 'absolute', margin: 0, padding: '0 1.5rem', textAlign: 'center', fontFamily: "'Palatino Linotype', Georgia, serif", fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight:'600', fontStyle: 'italic', color: '#f0dfa8', textShadow: '0 2px 12px rgba(0,0,0,0.85)', opacity: text2Opacity, transition: 'opacity 1000ms ease-in-out', maxWidth: '80vw' }}>
            Republicas
          </p>
        </div>
      )}
        </div>
    </div>
  );
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}