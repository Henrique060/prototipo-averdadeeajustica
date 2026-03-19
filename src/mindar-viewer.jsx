import React, { useEffect, useRef } from 'react';

export default () => {
  const sceneRef = useRef(null);

  useEffect(() => {
    const sceneEl = sceneRef.current;
    if (!sceneEl) return;
    const arSystem = sceneEl.systems && sceneEl.systems["mindar-image-system"];
    if (!arSystem) return;

    const onRenderStart = () => {
      try { arSystem.start(); } catch (e) { /* ignore */ }
    };
    sceneEl.addEventListener('renderstart', onRenderStart);
    return () => {
      sceneEl.removeEventListener('renderstart', onRenderStart);
      try { arSystem.stop(); } catch (e) { /* ignore */ }
    };
  }, []);

  return (
    <div className="mindar-wrapper">
      <div id="overlay">
        <button id="startButton">Click to Start AR &amp; Video</button>
      </div>

      <a-scene
        ref={sceneRef}
        mindar-image="imageTargetSrc: /markers/panfletoVasoSufr.mind;"
        color-space="sRGB"
        renderer="colorManagement: true, physicallyCorrectLights"
        vr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: false"
      >
        <a-assets>
          <a-asset-item id="avatarModel" src="/models/estatualisboa.glb"></a-asset-item>
          <a-asset-item id="vaseModel" src="/models/vase.glb"></a-asset-item>
          <a-asset-item id="stopSign" src="/models/stopsign.glb"></a-asset-item>
          <video
            id="video"
            autoPlay
            loop="true"
            muted
            playsInline
            webkit-playsinline="true"
            src="/sufragioFemme.mp4"
          />
        </a-assets>

        <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

        <a-entity mindar-image-target="targetIndex: 0">
          <a-gltf-model
            rotation="0 -70 0"
            position="0 -0.5 0.1"
            scale="0.03 0.03 0.03"
            src="#avatarModel"
            animation="property: position; to: 0 -0.5 0.1; dur: 1000; easing: easeInOutQuad; loop: true; dir: alternate"
          ></a-gltf-model>
        </a-entity>

        <a-entity mindar-image-target="targetIndex: 2">
          <a-gltf-model rotation="90 0 0" position="0 0 0" scale="1.5 1.5 1.5" src="#vaseModel"></a-gltf-model>
        </a-entity>

        <a-entity mindar-image-target="targetIndex: 3">
          <a-video src="#video" width="1" height="1" position="0 0 0" rotation="0 0 0"></a-video>
          <a-gltf-model src="#stopSign" position="0.9 0 0" rotation="0 30 0" scale="0.5 0.5 0.5"></a-gltf-model>
          <a-gltf-model src="#stopSign" position="-0.9 0 0" rotation="0 150 0" scale="0.5 0.5 0.5"></a-gltf-model>
        </a-entity>
      </a-scene>

      
    </div>
  );
}