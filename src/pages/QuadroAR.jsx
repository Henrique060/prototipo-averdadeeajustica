import React, { useEffect, useRef, useState } from 'react';

const QuadroAR = () => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(true);

  useEffect(() => {
    // We register a custom A-Frame component to handle the click/tap logic
    // This avoids the "null object3D" error because A-Frame manages the lifecycle
    if (!window.AFRAME.components['tap-toggle']) {
      window.AFRAME.registerComponent('tap-toggle', {
        schema: {
          targetModel: { type: 'selector' },
          vaseModel: { type: 'selector' }
        },
        init: function () {
          const data = this.data;
          let active = false;

          this.el.addEventListener('click', () => {
            // Only trigger if the marker is actually visible (tracked)
            if (!this.el.object3D.visible) return;

            active = !active;
            if (active) {
              data.targetModel.setAttribute('visible', false);
              data.vaseModel.setAttribute('visible', true);
              data.vaseModel.setAttribute('animation', {
                property: 'scale',
                from: '0 0 0',
                to: '0.8 0.8 0.8',
                dur: 300,
                easing: 'easeOutBack'
              });
            } else {
              data.targetModel.setAttribute('visible', true);
              data.vaseModel.setAttribute('visible', false);
            }
          });
        }
      });
    }
  }, []);

  const handleStartAR = () => {
    setIsOverlayVisible(false);
  };

  return (
    <div className="ar-wrapper" style={{ width: '100vw', height: '100vh' }}>
      {isOverlayVisible && (
        <div id="overlay" style={overlayStyle}>
          <button onClick={handleStartAR} style={buttonStyle}>Start AR</button>
        </div>
      )}

      <a-scene 
        mindar-image="imageTargetSrc: /markers/targets.mind; maxTrack: 3"
        vr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: false"
        renderer="colorManagement: true"
        embedded
        style={{ width: '100%', height: '100%' }}
      >
        <a-assets>
          <a-asset-item id="m1" src="/models/numberMark1.glb"></a-asset-item>
          <a-asset-item id="m2" src="/models/numberMark2.glb"></a-asset-item>
          <a-asset-item id="m3" src="/models/numberMark3.glb"></a-asset-item>
          <a-asset-item id="vase" src="/models/vase.glb"></a-asset-item>
        </a-assets>

        {/* The cursor="rayOrigin: mouse" allows us to use simple 'click' events on entities */}
        <a-camera position="0 0 0" look-controls="enabled: false">
          <a-entity cursor="fuse: false; rayOrigin: mouse;" raycaster="objects: .clickable"></a-entity>
        </a-camera>

        {/* MARKER 1 */}
        <a-entity 
          mindar-image-target="targetIndex: 0" 
          id="marker1" 
          className="clickable"
          tap-toggle="targetModel: #model1; vaseModel: #vase1"
        >
          <a-gltf-model id="model1" src="#m1" scale="0.5 0.5 0.5"></a-gltf-model>
          <a-gltf-model id="vase1" src="#vase" visible="false" scale="0.8 0.8 0.8"></a-gltf-model>
        </a-entity>

        {/* MARKER 2 */}
        <a-entity 
          mindar-image-target="targetIndex: 1" 
          id="marker2" 
          className="clickable"
          tap-toggle="targetModel: #model2; vaseModel: #vase2"
        >
          <a-gltf-model id="model2" src="#m2" scale="0.5 0.5 0.5"></a-gltf-model>
          <a-gltf-model id="vase2" src="#vase" visible="false" scale="0.8 0.8 0.8"></a-gltf-model>
        </a-entity>

        {/* MARKER 3 */}
        <a-entity 
          mindar-image-target="targetIndex: 2" 
          id="marker3" 
          className="clickable"
          tap-toggle="targetModel: #model3; vaseModel: #vase3"
        >
          <a-gltf-model id="model3" src="#m3" scale="0.5 0.5 0.5"></a-gltf-model>
          <a-gltf-model id="vase3" src="#vase" visible="false" scale="0.8 0.8 0.8"></a-gltf-model>
        </a-entity>

      </a-scene>
    </div>
  );
};

// Styles
const overlayStyle = {
  position: 'fixed',
  top: 0, left: 0,
  width: '100%', height: '100%',
  background: 'rgba(0,0,0,0.8)',
  zIndex: 9999,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

};

const buttonStyle = {
  padding: '12px 24px',
  fontSize: '1.2rem',
  cursor: 'pointer'
};

export default QuadroAR;