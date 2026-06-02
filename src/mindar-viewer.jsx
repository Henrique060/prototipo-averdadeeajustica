// mindar-viewer.jsx
import React, { useEffect, useRef } from 'react';

export default function MindARViewer({ targetSrc }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const currentContainer = containerRef.current;
    if (!currentContainer) return;

    // FIX: Using explicit string assignment for targetIndex: 0 
    // We also swap a-text for a highly-visible a-text setup with a colored background block
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
          <a-text 
            value="TARGET DETECTED" 
            position="0 0 0.1" 
            scale="1.5 1.5 1.5" 
            color="#FF0000" 
            align="center"
            baseline="center"
            geometry="primitive: plane; width: 2; height: 0.4" 
            material="color: #000000; opacity: 0.8; shader: flat"
          ></a-text>
        </a-entity>
      </a-scene>
    `;

    currentContainer.innerHTML = sceneHTML;

    const sceneEl = currentContainer.querySelector('a-scene');

    // Setup detection logging to prove your compiled target is anchoring
    const handleTargetFound = () => {
      console.log("🎯 AR Marker successfully found and matched!");
    };
    
    const handleTargetLost = () => {
      console.log("❌ AR Marker lost tracking viewport.");
    };

    const handleRenderStart = () => {
      const arSystem = sceneEl?.systems?.["mindar-image-system"];
      if (arSystem) {
        console.log("MindAR successfully initialized on physical DOM track.");
        arSystem.start();
        
        // Listen to tracking events directly via the target entity pointer
        const targetEntity = sceneEl.querySelector('[mindar-image-target]');
        if (targetEntity) {
          targetEntity.addEventListener("targetFound", handleTargetFound);
          targetEntity.addEventListener("targetLost", handleTargetLost);
        }
      }
    };

    if (sceneEl) {
      sceneEl.addEventListener('renderstart', handleRenderStart);
    }

    // Cleanup
    return () => {
      if (sceneEl) {
        sceneEl.removeEventListener('renderstart', handleRenderStart);
        const targetEntity = sceneEl.querySelector('[mindar-image-target]');
        if (targetEntity) {
          targetEntity.removeEventListener("targetFound", handleTargetFound);
          targetEntity.removeEventListener("targetLost", handleTargetLost);
        }
        
        const arSystem = sceneEl.systems?.["mindar-image-system"];
        if (arSystem && typeof arSystem.stop === 'function') {
          arSystem.stop();
        }
      }

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

      if (currentContainer) {
        currentContainer.innerHTML = '';
      }
    };
  }, [targetSrc]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative' }} />;
}