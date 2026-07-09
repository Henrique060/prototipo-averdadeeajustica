import React, { useEffect, useRef, useState } from "react";
import LearnMorePopUp from '../components/LearnMorePopUp';
import HelpPopUpBtn from '../components/HelpPopUpBtn';
import LogoHeader from '../components/LogoHeader';
import './MindAR.css';

export default function MindARBustoRepublica({ onTap }) {
  const sceneRef = useRef(null);
  const [showPopUp, setShowPopUp] = useState(true);
  const [targetVisible, setTargetVisible] = useState(false);

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

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <div className="header-container-mindar">
        <LogoHeader />
        <HelpPopUpBtn
          className="help-btn-mindar"
          onClick={() => setShowPopUp(true)}
        />

        {showPopUp && (
          <LearnMorePopUp
            headerName={"Como interagir na experiência?"}
            onClose={() => setShowPopUp(false)}
            imgSrc="/images/sala21-2.webp"
            description="Aponte a câmara para o seu rosto para ver a interação com o busto."
          />
        )}
      </div>

      <a-scene 
        ref={sceneRef} // IMPORTANT: Added ref here so React can find the scene
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

        {/* In face tracking, active camera should normally stay active="false" as MindAR controls it */}
        <a-camera active="false" position="0 0 0"></a-camera>
        
        <a-entity mindar-face-target="anchorIndex:168">


             <a-gltf-model
                src="#bustoRepublica"
                position="0 0.3 0"
                scale="2.5 1.5 2.5">
                </a-gltf-model> 

           



        </a-entity>
      </a-scene>
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