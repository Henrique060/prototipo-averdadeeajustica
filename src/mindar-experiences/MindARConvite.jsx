import React, { useEffect, useRef } from 'react';

export default function MindARConvite({ onTap }) {
  const sceneRef = useRef(null);

  useEffect(() => {
    const loadScripts = async () => {
      await loadScript('https://aframe.io/releases/1.5.0/aframe.min.js');
      await loadScript('https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-image-aframe.prod.js');

      const sceneEl = sceneRef.current;
      const arSystem = sceneEl.systems["mindar-image-system"];
      sceneEl.addEventListener('renderstart', () => {
        arSystem.start();
      });

      // Optional tap interaction
      if (onTap) {
        sceneEl.addEventListener('click', onTap);
      }
    };

    loadScripts();

    return () => {
      const arSystem = sceneRef.current?.systems["mindar-image-system"];
      arSystem?.stop();
    };
  }, []);

  return (
    <a-scene
      ref={sceneRef}
      mindar-image={`imageTargetSrc: ${"/markers/convite.mind"}; autoStart: false; uiLoading: no; uiError: no; uiScanning: no;`}
      color-space="sRGB"
      embedded
      renderer="colorManagement: true, physicallyCorrectLights"
      vr-mode-ui="enabled: false"
      device-orientation-permission-ui="enabled: false"
    >
      <a-assets>
        <video id="videoAsset" src="/videos/burocracia-ckey.mp4" preload="auto" loop="true"></video>
      </a-assets>

      <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

        <a-entity mindar-image-target="targetIndex:0">
            <a-video 
                id="video"
                src="#videoAsset"
                position="0 0 0.1"
                rotation="0 0 0"
                width="1.5"
                height="1"
                visible="true"
            ></a-video>
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