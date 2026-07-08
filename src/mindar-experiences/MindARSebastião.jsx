import React, { useEffect, useRef, useState } from 'react';
import LearnMorePopUp from '../components/LearnMorePopUp';
import HelpPopUpBtn from '../components/HelpPopUpBtn';
import LogoHeader from '../components/LogoHeader';
import { useMindARLifecycle } from '../hooks/UseMindARLifecycle';
import './MindAR.css';

export default function MindARSebastião({ onTap }) {
  const sceneRef = useRef(null);
  const [showPopUp, setShowPopUp] = useState(true);

  useMindARLifecycle(sceneRef);

  useEffect(() => {
    let isMounted = true;

    const loadScripts = async () => {
      // 1. Core structural components loaded sequentially
      await loadScript('https://aframe.io/releases/1.5.0/aframe.min.js');
      await loadScript('https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-image-aframe.prod.js');
      
      // Safe fallback load wrapper for Troika text to prevent blocking core AR setup
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

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <div className="header-container-mindar">
        <LogoHeader/>
        <HelpPopUpBtn className="help-btn-mindar" onClick={() => setShowPopUp(true)}/>
        {showPopUp &&
          <LearnMorePopUp
            headerName={"Como interagir na experiência?"}
            onClose={() => setShowPopUp(false)}
            imgSrc="/images/sala23.webp"
            description="
            Procure o quadro de Nª Srª da Estrela, apontando a câmara para o mesmo.
            Conseguirá ver em detalhe a mensagem transmitida nesta obra."/>
        }
      </div>

      <a-scene
        ref={sceneRef}
        mindar-image="imageTargetSrc: /markers/alegoria-target.mind; autoStart: false; uiLoading: no; uiError: no; uiScanning: no;"
        color-space="sRGB"
        embedded
        renderer="colorManagement: true;" // Fixed comma syntax bug
        vr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: false"
      >
        <a-assets>
          {/* Note: Crossorigin attribute ensures canvas WebGL readback doesn't fail */}
            	<a-asset-item id="sebastiao" src="/models/teatro-de-papel-beta3.glb"></a-asset-item>
        </a-assets>
        
        <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

        <a-entity mindar-image-target="targetIndex:0">
            <a-gltf-model
             src="#sebastiao"
             position="0 0 -0.05"
             scale="0.05 0.05 0.05"
             rotation="90 0 0"
            ></a-gltf-model>
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