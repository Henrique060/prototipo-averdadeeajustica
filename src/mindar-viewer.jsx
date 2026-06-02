// mindar-viewer.jsx
import React, { useEffect, useRef } from 'react';

export default function MindARViewer({ targetSrc }) {
  const sceneRef = useRef(null);

  useEffect(() => {
    const sceneEl = sceneRef.current;
    let arSystem = null;

    const handleRenderStart = () => {
      arSystem = sceneEl?.systems?.["mindar-image-system"];
      if (arSystem) {
        console.log("Starting MindAR System with target:", targetSrc);
        arSystem.start(); // Manual start matched to template rules
      }
    };

    if (sceneEl) {
      sceneEl.addEventListener('renderstart', handleRenderStart);
    }

    return () => {
      if (sceneEl) {
        sceneEl.removeEventListener('renderstart', handleRenderStart);
      }
      if (arSystem && typeof arSystem.stop === 'function') {
        console.log("Stopping MindAR System:", targetSrc);
        arSystem.stop();
      }
    };
  }, [targetSrc]);

  // Notice autoStart: false. This gives React time to safely mount the elements 
  // before the camera stream begins.
  const config = `imageTargetSrc: ${targetSrc}; autoStart: false; uiLoading: yes; uiError: yes; uiScanning: yes;`;

  return (
    <a-scene
      ref={sceneRef}
      mindar-image={config}
      embedded
      color-space="sRGB"
      renderer="colorManagement: true; physicallyCorrectLights: true;"
      vr-mode-ui="enabled: false"
      device-orientation-permission-ui="enabled: false"
    >
      <a-camera position="0 0 0" look-controls="enabled: false" />

      <a-entity mindar-image-target="targetIndex: 0">
        <a-text value="TEST" position="0 0 0" scale="2 2 2" color="red" align="center" />
      </a-entity>
    </a-scene>
  );
}