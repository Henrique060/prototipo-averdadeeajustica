import React, { useEffect, useRef } from 'react';

export default function MindARViewer({ targetSrc, assets = [], entities = [], onTap }) {
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
      mindar-image={`imageTargetSrc: ${targetSrc}; autoStart: false; uiLoading: no; uiError: no; uiScanning: no;`}
      color-space="sRGB"
      embedded
      renderer="colorManagement: true, physicallyCorrectLights"
      vr-mode-ui="enabled: false"
      device-orientation-permission-ui="enabled: false"
    >
      <a-assets>
        {assets.map((asset) =>
          asset.type === 'img' ? (
            <img key={asset.id} id={asset.id} src={asset.src} />
          ) : (
            <a-asset-item key={asset.id} id={asset.id} src={asset.src} />
          )
        )}
      </a-assets>

      <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

      <a-entity mindar-image-target="targetIndex: 0">
        {entities.map((entity, i) => {
          if (entity.type === 'plane') return (
            <a-plane
              key={i}
              src={entity.src}
              position={entity.position || "0 0 0"}
              height={entity.height || "1"}
              width={entity.width || "1"}
              rotation={entity.rotation || "0 0 0"}
            />
          );
          if (entity.type === 'gltf') return (
            <a-gltf-model
              key={i}
              src={entity.src}
              position={entity.position || "0 0 0"}
              scale={entity.scale || "1 1 1"}
              rotation={entity.rotation || "0 0 0"}
              animation={entity.animation || ""}
            />
          );
          if (entity.type === 'video') return (
            <a-video
              key={i}
              src={entity.src}
              position={entity.position || "0 0 0"}
              width={entity.width || "1"}
              height={entity.height || "1"}
              rotation={entity.rotation || "0 0 0"}
            />
          );
          return null;
        })}
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