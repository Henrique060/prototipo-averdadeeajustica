// mindar-viewer.jsx
import React, { useEffect, useRef } from 'react';

export default function MindARViewer({ targetSrc }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const currentContainer = containerRef.current;
    if (!currentContainer) return;

    // 1. Manually craft a pristine, static HTML A-Frame string
    // This forces the browser to compile the elements in linear order 
    // without React's virtual state picking it apart midway.
    const sceneHTML = `
      <a-scene 
        mindar-image="imageTargetSrc: ${targetSrc}; autoStart: false; uiLoading: yes; uiError: no; uiScanning: yes;" 
        embedded 
        color-space="sRGB" 
        renderer="colorManagement: true; physicallyCorrectLights: true;" 
        vr-mode-ui="enabled: false" 
        device-orientation-permission-ui="enabled: false"
        style="width: 100%; height: 100%; position: absolute; top: 0; left: 0;"
      >
        <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>
        <a-entity mindar-image-target="targetIndex: 0">
          <a-text value="TEST" position="0 0 0" scale="2 2 2" color="red" align="center"></a-text>
        </a-entity>
      </a-scene>
    `;

    // 2. Drop the template into the real browser DOM element
    currentContainer.innerHTML = sceneHTML;

    // 3. Extract the freshly built element pointer to add listeners safely
    const sceneEl = currentContainer.querySelector('a-scene');

    const handleRenderStart = () => {
      const arSystem = sceneEl?.systems?.["mindar-image-system"];
      if (arSystem) {
        console.log("MindAR successfully initialized on physical DOM track.");
        arSystem.start();
      }
    };

    if (sceneEl) {
      sceneEl.addEventListener('renderstart', handleRenderStart);
    }

    // Cleanup: Nuclear teardown
    return () => {
      console.log("Cleaning up AR track elements completely.");
      if (sceneEl) {
        sceneEl.removeEventListener('renderstart', handleRenderStart);
        const arSystem = sceneEl.systems?.["mindar-image-system"];
        if (arSystem && typeof arSystem.stop === 'function') {
          arSystem.stop();
        }
      }

      // Hard-purge active media channels to release camera hardware hooks
      const videoElements = document.querySelectorAll('body > video, .ar-viewer-container video');
      videoElements.forEach((video) => {
        if (video.srcObject) {
          const stream = video.srcObject;
          stream.getTracks().forEach(track => track.stop());
          video.srcObject = null;
        }
        if (video.parentNode) {
          video.parentNode.removeChild(video);
        }
      });

      // Clear out the template wrapper completely
      if (currentContainer) {
        currentContainer.innerHTML = '';
      }
    };
  }, [targetSrc]);

  // Provide a clean container target for the raw injection code above
  return <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative' }} />;
}