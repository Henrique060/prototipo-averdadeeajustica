import React, { useEffect, useRef } from 'react';

export default function MindARDJoao({ onTap }) {
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const gemRef = useRef(null);
  const silverRef = useRef(null);
  const goldRef = useRef(null);

  useEffect(() => {
    let canvasEl = null;

    const handleInteraction = (clientX, clientY) => {
      if (!sceneRef.current || !cameraRef.current) return;
      
      const canvas = sceneRef.current.canvas;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();

      // Normalised device coordinates
      const ndc = new window.THREE.Vector2(
        ((clientX - rect.left) / rect.width) * 2 - 1,
        -((clientY - rect.top) / rect.height) * 2 + 1
      );

      const threeCamera = cameraRef.current.getObject3D('camera');
      const raycaster = new window.THREE.Raycaster();
      raycaster.setFromCamera(ndc, threeCamera);

      // Collect meshes inside components safely via their refs
      const meshesGem = [];
      const meshesSilver = [];
      const meshesGold = [];

      if (gemRef.current?.object3D) {
        gemRef.current.object3D.traverse(obj => { if (obj.isMesh) meshesGem.push(obj); });
      }
      if (silverRef.current?.object3D) {
        silverRef.current.object3D.traverse(obj => { if (obj.isMesh) meshesSilver.push(obj); });
      }
      if (goldRef.current?.object3D) {
        goldRef.current.object3D.traverse(obj => { if (obj.isMesh) meshesGold.push(obj); });
      }

      // Safeguard against models not fully loaded yet
      if (meshesGem.length === 0 || meshesSilver.length === 0 || meshesGold.length === 0) return;

      const hitsGems = raycaster.intersectObjects(meshesGem, false);
      const hitsSilvers = raycaster.intersectObjects(meshesSilver, false);
      const hitsGolds = raycaster.intersectObjects(meshesGold, false);

      if (hitsGems.length > 0 && gemRef.current) {
        gemRef.current.setAttribute('animation', {
          property: 'position',
          to: '0 0.1 0',
          dur: 1000,
          easing: 'easeInOutQuad'
        });
      }

      if (hitsSilvers.length > 0 && silverRef.current) {
        silverRef.current.setAttribute('animation', {
          property: 'position',
          to: '0.15 0.3 0',
          dur: 1000,
          easing: 'easeInOutQuad'
        });
      }

      if (hitsGolds.length > 0 && goldRef.current) {
        goldRef.current.setAttribute('animation', {
          property: 'position',
          to: '-0.2 -0.3 0',
          dur: 1000,
          easing: 'easeInOutQuad'
        });
      }
    };

    // Touch event wrapper
    const onTouchStart = (e) => {
      e.preventDefault();
      const t = e.touches[0];
      handleInteraction(t.clientX, t.clientY);
    };

    // Click event wrapper
    const onClick = (e) => {
      handleInteraction(e.clientX, e.clientY);
    };

    const loadScripts = async () => {
      await loadScript('https://aframe.io/releases/1.5.0/aframe.min.js');
      await loadScript('https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-image-aframe.prod.js');

      const sceneEl = sceneRef.current;
      if (!sceneEl) return;

      const arSystem = sceneEl.systems["mindar-image-system"];
      
      sceneEl.addEventListener('renderstart', () => {
        arSystem.start();
        
        // Once rendering starts, canvas is guaranteed to exist
        canvasEl = sceneEl.canvas;
        if (canvasEl) {
          canvasEl.addEventListener('touchstart', onTouchStart, { passive: false });
          canvasEl.addEventListener('click', onClick);
        }
      });

      // Pass event trigger upwards to parent architecture if present
      if (onTap) {
        sceneEl.addEventListener('click', onTap);
      }
    };

    loadScripts();

    // Clean up event listeners and systems on unmount
    return () => {
      const arSystem = sceneRef.current?.systems["mindar-image-system"];
      arSystem?.stop();

      if (canvasEl) {
        canvasEl.removeEventListener('touchstart', onTouchStart);
        canvasEl.removeEventListener('click', onClick);
      }
    };
  }, [onTap]);

  return (
    <a-scene
      ref={sceneRef}
      mindar-image={`imageTargetSrc: ${"/markers/dJoao-target.mind"}; autoStart: false; uiLoading: no; uiError: no; uiScanning: no;`}
      color-space="sRGB"
      embedded
      renderer="colorManagement: true, physicallyCorrectLights"
      vr-mode-ui="enabled: false"
      device-orientation-permission-ui="enabled: false"
    >
      <a-assets>
        <a-asset-item id="gem" src="/models/gema.glb"></a-asset-item>
        <a-asset-item id="silver" src="/models/prata.glb"></a-asset-item>
        <a-asset-item id="gold" src="/models/ouro.glb"></a-asset-item>
      </a-assets>

      <a-camera ref={cameraRef} position="0 0 0" look-controls="enabled: false"></a-camera>

      <a-entity mindar-image-target="targetIndex:0">
        <a-entity 
          ref={gemRef} 
          id="gem-entity" 
          gltf-model="#gem" 
          scale=".5 .5 .5" 
          position="1 0 0"
        ></a-entity>
        
        <a-entity 
          ref={silverRef} 
          id="silver-entity" 
          gltf-model="#silver" 
          scale=".5 .5 .5" 
          position="0 1 0"
        ></a-entity>
        
        <a-entity 
          ref={goldRef} 
          id="gold-entity" 
          gltf-model="#gold" 
          scale=".5 .5 .5" 
          position="-1 0 0"
        ></a-entity>
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