import React, { useEffect, useRef } from 'react';


export default function MindARViewer({ targetSrc }) {
  const sceneRef = useRef(null);

  useEffect(() => {
    const sceneEl = sceneRef.current;

    const arSystem = sceneEl.systems["mindar-image-system"];

    sceneEl.addEventListener("loaded", () => {
      console.log("A-Frame loaded");
      console.log("systems:", sceneEl.systems);
    });

    return () => {
      arSystem?.stop();
    };
  }, []);

  const config =
    `imageTargetSrc: ${targetSrc}; autoStart: true; uiLoading: yes; uiError: yes; uiScanning: yes;`;

  // mindar-viewer.jsx
  return (
    <a-scene
      ref={sceneRef}
      mindar-image={config}
      embedded                  
      vr-mode-ui="enabled: false"
      device-orientation-permission-ui="enabled: false"
    >
      <a-camera position="0 0 0" look-controls="enabled: false" />

      <a-entity mindar-image-target="targetIndex: 0">
        <a-text value="TEST" position="0 0 0" scale="2 2 2" color="red" />
      </a-entity>
    </a-scene>
  );
}