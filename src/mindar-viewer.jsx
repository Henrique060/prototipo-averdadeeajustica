// mindar-viewer.jsx
import React, { useEffect, useRef } from 'react';

export default function MindARViewer({ targetSrc }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const currentContainer = containerRef.current;
    if (!currentContainer) return;

    // FIX: Clean, strict configuration string without loose trailing semicolons or double spaces.
    // Explicitly declaring targetIndex: 0 binds the tracking compiler cleanly.
    const sceneHTML = `
      <a-scene 
        mindar-image="imageTargetSrc: ${targetSrc}; autoStart: false; uiLoading: yes; uiError: no; uiScanning: yes" 
        embedded 
        color-space="sRGB" 
        renderer="colorManagement: true; physicallyCorrectLights: true" 
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

    // Drop clean layout directly into physical DOM execution
    currentContainer.innerHTML = sceneHTML;

    const sceneEl = currentContainer.querySelector('a-scene');

    // Console logs to monitor target tracking states
    const handleTargetFound = () => {
      console.log("🎯 AR Target Match Found! Anchoring 3D Elements...");
    };
    
    const handleTargetLost = () => {
      console.log("❌ AR Target lost tracking viewport.");
    };

    const handleRenderStart = () => {
      const arSystem = sceneEl?.systems?.["mindar-image-system"];
      if (arSystem) {
        console.log("MindAR successfully initialized on physical DOM track.");
        arSystem.start();
        
        // Grab the tracking target and attach event listeners
        const targetEntity = sceneEl.querySelector('[mindar-image-target]');
        if (targetEntity) {
          console.log("Target anchor element located successfully in DOM tree.");
          targetEntity.addEventListener("targetFound", handleTargetFound);
          targetEntity.addEventListener("targetLost", handleTargetLost);
        } else {
          console.error("Critical: Could not find target element matching [mindar-image-target]");
        }
      }
    };

    if (sceneEl) {
      sceneEl.addEventListener('renderstart', handleRenderStart);
    }

    // Comprehensive clean slate removal on route change
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