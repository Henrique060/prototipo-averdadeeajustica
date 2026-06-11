import React, { useEffect, useRef } from 'react';

export default function MindARNossaSraEstrela({ onTap }) {
  const sceneRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    const loadScripts = async () => {
      await loadScript('https://aframe.io/releases/1.5.0/aframe.min.js');
      await loadScript('https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-image-aframe.prod.js');
      // LOAD TROIKA TEXT COMPONENT HERE
      await loadScript('https://unpkg.com/aframe-troika-text/dist/aframe-troika-text.min.js');

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
    };
  }, [onTap]);

  const sampleText = "A Nossa Senhora da Estrela:\nGraça oferecida por Leonardo Rodrigues, feita pós terramoto de 1750; Porque, faltando-lhe uma filha de 3 anos, invocando a adorada Senhora, achou depois de 7 horas nas ruínas da sua casa, com uma tão perigosa ferida na cabeça, atribuindo a sua vida à intervenção da Soberana Senhora.";

  return (
    <a-scene
      ref={sceneRef}
      mindar-image={`imageTargetSrc: ${"/markers/nsraestrela-marker.mind"}; autoStart: false; uiLoading: no; uiError: no; uiScanning: no;`}
      color-space="sRGB"
      embedded
      renderer="colorManagement: true, physicallyCorrectLights"
      vr-mode-ui="enabled: false"
      device-orientation-permission-ui="enabled: false"
    >
      <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

        <a-entity mindar-image-target="targetIndex:0">            
            <a-plane 
              id="text-background-panel"
              color="#000000" 
              opacity="0.8" 
              width="1.2" 
              height="1.7" 
              position="0 0 0.05"
              
            ></a-plane>

            {/* SWAPPED OUT <a-text> FOR <a-troika-text> */}
            <a-troika-text 
                id="text-overlay"
                value={sampleText}
                color="#FFFFFF"
                align="center"
                position="0 0 0.1" 
                
                /* Troika sizing configurations */
                font-size="0.05"     
                max-width="1.0"     
                line-height="1.4"  
                
                ></a-troika-text>
        </a-entity>
    </a-scene>
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