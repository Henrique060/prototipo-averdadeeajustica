import React, { useEffect, useRef } from 'react';

export default function MindARViewer({ targetSrc }) {
  const sceneRef = useRef(null);

  useEffect(() => {
    const sceneEl = sceneRef.current;

    // Register billboard here, where AFRAME is guaranteed to exist
    if (window.AFRAME && !window.AFRAME.components['billboard']) {
      window.AFRAME.registerComponent('billboard', {
        tick: function () {
          this.el.object3D.lookAt(
            this.el.sceneEl.camera.el.object3D.position
          );
        }
      });
    }

    const handleRenderStart = () => {
      const arSystem = sceneEl.systems["mindar-image-system"];
      if (arSystem) arSystem.start();
    };

    sceneEl.addEventListener('renderstart', handleRenderStart);

    return () => {
      const arSystem = sceneEl.systems["mindar-image-system"];
      if (arSystem) arSystem.stop();
    };
  }, []);

  return (
    <a-scene
      ref={sceneRef}
      mindar-image={`imageTargetSrc: ${targetSrc}; autoStart: false; uiLoading: no; uiError: no; uiScanning: no;`}
      color-space="sRGB"
      embedded
      renderer="colorManagement: true, physicallyCorrectLights"
      vr-mode-ui="enabled: false"
      device-orientation-permission-ui="enabled: false"
    >
      <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

      <a-entity mindar-image-target="targetIndex: 0">
        <a-text value="Lorem Ipsum frase 1" position="0 0.2 0" scale="1 1 1" align="center" color="#FFFFFF" width="2" side="double" billboard></a-text>
        <a-text value="Lorem Ipsum frase 2" position="0 0 0" scale="1 1 1" align="center" color="#FFD700" width="2" side="double" billboard></a-text>
        <a-text value="Lorem Ipsum frase 3" position="0 -0.2 0" scale="1 1 1" align="center" color="#00FFFF" width="2" side="double" billboard></a-text>
      </a-entity>
    </a-scene>
  );
}