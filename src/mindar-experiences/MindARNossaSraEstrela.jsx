import React, { useEffect, useRef } from 'react';

export default function MindARNossaSraEstrela({ onTap }) {
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
  }, [onTap]);

  // Sample lorem ipsum text string utilizing explicit "\n" for line breaks
  const sampleText = "Lorem ipsum dolor sit amet,\nconsectetur adipiscing elit.\n\nSed do eiusmod tempor\nincididunt ut labore et\ndolore magna aliqua.";

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
      <a-assets></a-assets>

      <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

        {/* Target Index 0: Custom Text Panel with Background */}
        <a-entity mindar-image-target="targetIndex:0">
            <a-gltf-model id="arrow-left-entity-0" src="#arrow-left" scale="1 1 1" position="0 0 0.1" rotation="90 0 0"></a-gltf-model>
            
            {/* 1. Black Plane Background Panel */}
            <a-plane 
              id="text-background-panel"
              color="#000000" 
              opacity="0.8" 
              width="1.2" 
              height="0.8" 
              position="0 0.6 0.01"
            ></a-plane>

            {/* 2. Overlaid Multi-line Text Field (Slightly higher Z-index to avoid Z-fighting) */}
            <a-text 
              id="text-overlay"
              value={sampleText}
              color="#FFFFFF"
              align="center"
              width="1.0"
              position="0 0.6 0.02"
              wrap-count="25"
            ></a-text>
        </a-entity>

        <a-entity mindar-image-target="targetIndex:1">
            <a-gltf-model id="arrow-left-entity-1" src="#arrow-left" scale="1 1 1" position="0 0 0.1" rotation="90 0 0"></a-gltf-model>
        </a-entity>
        
        <a-entity mindar-image-target="targetIndex:2">
            <a-gltf-model id="arrow-right-entity-0" src="#arrow-right" scale="1 1 1" position="0 0 0.1" rotation="90 0 0"></a-gltf-model>
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