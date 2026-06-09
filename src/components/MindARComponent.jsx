import React, { useEffect, useRef } from 'react';

export default function MindARComponent({ targetSrc, assets = [], entities = [], onTap }) {
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
      renderer="colorManagement: true"
      vr-mode-ui="enabled: false"
      device-orientation-permission-ui="enabled: false"
    >
      <a-assets>
        {assets
          // CRITICAL: Filter out any asset objects that do not have a valid src path
          .filter(asset => asset && asset.src) 
          .map((asset) => {
            if (asset.type === 'img') return <img key={asset.id} id={asset.id} src={asset.src} />;
            if (asset.type === 'video') return <video key={asset.id} id={asset.id} src={asset.src} crossOrigin="anonymous" loop muted playsInline />;
            if (asset.type === 'audio') return <audio key={asset.id} id={asset.id} src={asset.src} />;
            return <a-asset-item key={asset.id} id={asset.id} src={asset.src} />;
          })}
      </a-assets>

      <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

      <a-entity mindar-image-target="targetIndex: 0">
        {entities
          // Only map elements that actually have a loaded asset source
          .filter(entity => entity.src && !entity.src.includes('#undefined') && !entity.src.includes('#null'))
          .map((entity, i) => {
            if (entity.type === 'plane') return (
              <a-plane
                key={i}
                src={entity.src}
                position={entity.position || "0 0 0.1"}
                height={entity.height || "1"}
                width={entity.width || "1"}
                rotation={entity.rotation || "0 0 0"}
              />
            );
            // FIXED: Matches your type definition 'model' from ExperiencePageComponent
            if (entity.type === 'gltf' || entity.type === 'glb' || entity.type === 'model') return (
              <a-gltf-model
                key={i}
                src={entity.src}
                position={entity.position || "0 0 0.1"}
                scale={entity.scale || "1 1 1"}
                rotation={entity.rotation || "0 0 0"}
                animation={entity.animation || ""}
              />
            );
            if (entity.type === 'video') return (
              <a-video
                key={i}
                src={entity.src}
                position={entity.position || "0 0 0.1"}
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