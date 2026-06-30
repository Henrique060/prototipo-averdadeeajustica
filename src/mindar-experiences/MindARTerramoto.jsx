import React, { useEffect, useRef, useState } from 'react';
import LearnMorePopUp from '../components/LearnMorePopUp';
import HelpPopUpBtn from '../components/HelpPopUpBtn';
import LogoHeader from '../components/LogoHeader';
import './MindAr.css';

export default function MindARTerramoto({ videoSrc = "/videos/terramoto.mov" }) {
  const sceneRef = useRef(null);
  const videoRef = useRef(null);
  const blitCanvasRef = useRef(null);
  const textureCanvasRef = useRef(null);
  const planeRef = useRef(null);

  const [showPopUp, setShowPopUp] = useState(true);

  useEffect(() => {
    let isMounted = true;
    let callbackId;

    const loadScripts = async () => {
      await loadScript('https://aframe.io/releases/1.5.0/aframe.min.js');
      await loadScript('https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-image-aframe.prod.js');

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
        sceneEl.addEventListener('renderstart', startAR);
      }

      // --- CHROMA KEY PROCESSING LOOP ---
      const videoEl = videoRef.current;
      if (!videoEl) return;

      const processFrame = (now, metadata) => {
        const blitCanvas = blitCanvasRef.current;
        const textureCanvas = textureCanvasRef.current;
        const aPlane = planeRef.current;
        
        if (!blitCanvas || !textureCanvas || !videoEl) return;

        const blitCtx = blitCanvas.getContext('2d');
        const textureCtx = textureCanvas.getContext('2d');

        const targetWidth = 480; 
        const targetHeight = targetWidth * (metadata.height / metadata.width);

        if (blitCanvas.width !== targetWidth) {
          blitCanvas.width = targetWidth;
          blitCanvas.height = targetHeight;
          textureCanvas.width = targetWidth;
          textureCanvas.height = targetHeight;
        }

        // 1. Process Chroma Key (Remove Green background)
        blitCtx.drawImage(videoEl, 0, 0, targetWidth, targetHeight);
        const imageData = blitCtx.getImageData(0, 0, targetWidth, targetHeight);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          
          // Alternative formula for smoother results
            const targetR = 0, targetG = 177, targetB = 64; // The exact green color code of your screen
            const distance = Math.sqrt(
            Math.pow(r - targetR, 2) + 
            Math.pow(g - targetG, 2) + 
            Math.pow(b - targetB, 2)
            );

            if (distance < 120) { // Adjust '120' to find the sweet spot
            data[i + 3] = 0;
            }
        }

        textureCtx.putImageData(imageData, 0, 0);

        // 2. Refresh the active A-Frame 3D dynamic texture context
        if (aPlane && aPlane.getObject3D('mesh')) {
          const material = aPlane.getObject3D('mesh').material;
          if (material && material.map) {
            material.map.needsUpdate = true;
          }
        }

        callbackId = videoEl.requestVideoFrameCallback(processFrame);
      };

      const handlePlay = () => {
        callbackId = videoEl.requestVideoFrameCallback(processFrame);
      };

      videoEl.addEventListener('play', handlePlay);
      
      if (videoEl.paused) {
        videoEl.play().catch(err => console.log("Awaiting manual user interaction trigger context", err));
      }
    };

    loadScripts();

    return () => {
      isMounted = false;
      if (videoRef.current && callbackId) {
        videoRef.current.cancelVideoFrameCallback(callbackId);
      }
      const arSystem = sceneRef.current?.systems["mindar-image-system"];
      if (arSystem?.started) {
        arSystem.stop();
      }
    };
  }, [videoSrc]);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <div className="header-container-mindar">
        <LogoHeader/>
        <HelpPopUpBtn className="help-btn-mindar" onClick={() => setShowPopUp(true)}/>
        {showPopUp && 
        <LearnMorePopUp 
          headerName={"Como interagir na experiência?"}
          onClose={() => setShowPopUp(false)}
          imgSrc="/images/terramoto.webp"
          description="
         Procure nesta sala, onde se encontra o painel de azulejo demonstrado. 
         Encontrando, aponte a câmara para o mesmo, de modo a observar a experiência."/>
          }
      </div>
      {/* Hidden processing infrastructure */}
      <video ref={videoRef} src={videoSrc} loop muted playsInline style={{ display: 'none' }} />
      <canvas ref={blitCanvasRef} style={{ display: 'none' }} />
      <canvas id="chromaTextureCanvas" ref={textureCanvasRef} style={{ display: 'none' }} />

      <a-scene
        ref={sceneRef}
        mindar-image={`imageTargetSrc: ${"/markers/terramoto-marker.mind"}; autoStart: false; uiLoading: no; uiError: no; uiScanning: no;`}
        color-space="sRGB"
        embedded
        renderer="colorManagement: true, physicallyCorrectLights"
        vr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: false"
      >
        <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

        <a-entity mindar-image-target="targetIndex:0">            
            {/* Exactly centered, isolated chroma key video plane wrapper */}
            <a-plane 
              ref={planeRef}
              src="#chromaTextureCanvas"
              material="transparent: true; shader: flat;"
              position="0 -0.1 0" 
              width="1" 
              height="1.5"
            ></a-plane>
        </a-entity>
      </a-scene>
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