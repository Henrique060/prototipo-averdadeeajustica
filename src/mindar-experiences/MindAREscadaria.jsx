import React, { useEffect, useRef } from 'react';

export default function MindAREscadaria({ onTap }) {
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
      mindar-image={`imageTargetSrc: ${"/markers/entrada-markers.mind"}; autoStart: false; uiLoading: no; uiError: no; uiScanning: no;`}
      color-space="sRGB"
      embedded
      renderer="colorManagement: true, physicallyCorrectLights"
      vr-mode-ui="enabled: false"
      device-orientation-permission-ui="enabled: false"
    >
      <a-assets>
        <a-asset-item id="arrow-right" src="/models/right-arrow.glb" crossorigin="anonymous"></a-asset-item>
        <a-asset-item id="arrow-left" src="/models/left-arrow.glb" crossorigin="anonymous"></a-asset-item>
      </a-assets>

      <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

        <a-entity mindar-image-target="targetIndex:0">
            <a-gltf-model id="arrow-left-entity-0" src="#arrow-left"  scale="1 1 1" position="0 0 0.1" rotation="90 0 0"></a-gltf-model>
        </a-entity>
        <a-entity mindar-image-target="targetIndex:1">
            <a-gltf-model id="arrow-left-entity-1" src="#arrow-left"  scale="1 1 1" position="0 0 0.1" rotation="90 0 0"></a-gltf-model>
        </a-entity>
        <a-entity mindar-image-target="targetIndex:2">
            <a-gltf-model id="arrow-right-entity-0" src="#arrow-right"  scale="1 1 1" position="0 0 0.1" rotation="90 0 0"></a-gltf-model>
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