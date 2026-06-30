import React, { useEffect, useRef, useState } from 'react';
import LearnMorePopUp from '../components/LearnMorePopUp';
import HelpPopUpBtn from '../components/HelpPopUpBtn';
import LogoHeader from '../components/LogoHeader';
import './MindAR.css';

export default function MindARDJoao({ onTap }) {
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const gemRef = useRef(null);
  const silverRef = useRef(null);
  const goldRef = useRef(null);

  const [showPopUp, setShowPopUp] = useState(true);

  // Track whether the intro text sequence has finished
  const [modelsVisible, setModelsVisible] = useState(false);
  const [textPhase, setTextPhase] = useState('hidden'); // 'hidden' | 'text1-in' | 'text1-out' | 'text2-in' | 'text2-out' | 'done'

  // Guards against the intro text sequence running more than once
  const hasRunSequence = useRef(false);

  // Run the text intro sequence once — triggered after the popup closes for the first time
  const runTextSequence = () => {
    if (hasRunSequence.current) return;
    hasRunSequence.current = true;

    // Phase 1: fade in text 1
    setTextPhase('text1-in');

    setTimeout(() => {
      // Phase 2: fade out text 1
      setTextPhase('text1-out');
    }, 2800);

    setTimeout(() => {
      // Phase 3: fade in text 2
      setTextPhase('text2-in');
    }, 3800);

    setTimeout(() => {
      // Phase 4: fade out text 2
      setTextPhase('text2-out');
    }, 6600);

    setTimeout(() => {
      // Phase 5: done — show models
      setTextPhase('done');
      setModelsVisible(true);
    }, 7600);
  };

  const handleClosePopUp = () => {
    setShowPopUp(false);
    runTextSequence(); // no-op if it has already run once
  };

  useEffect(() => {
    let canvasEl = null;

    const handleInteraction = (clientX, clientY) => {
      if (!modelsVisible) return; // ignore taps during text sequence
      if (!sceneRef.current || !cameraRef.current) return;

      const canvas = sceneRef.current.canvas;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();

      const ndc = new window.THREE.Vector2(
        ((clientX - rect.left) / rect.width) * 2 - 1,
        -((clientY - rect.top) / rect.height) * 2 + 1
      );

      const threeCamera = cameraRef.current.getObject3D('camera');
      const raycaster = new window.THREE.Raycaster();
      raycaster.setFromCamera(ndc, threeCamera);

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

    const onTouchStart = (e) => {
      e.preventDefault();
      const t = e.touches[0];
      handleInteraction(t.clientX, t.clientY);
    };

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

        canvasEl = sceneEl.canvas;
        if (canvasEl) {
          canvasEl.addEventListener('touchstart', onTouchStart, { passive: false });
          canvasEl.addEventListener('click', onClick);
        }
      });

      if (onTap) {
        sceneEl.addEventListener('click', onTap);
      }
    };

    loadScripts();

    return () => {
      const arSystem = sceneRef.current?.systems["mindar-image-system"];
      arSystem?.stop();

      if (canvasEl) {
        canvasEl.removeEventListener('touchstart', onTouchStart);
        canvasEl.removeEventListener('click', onClick);
      }
    };
  }, [onTap]);

  // Derive opacity and visibility from phase
  const text1Opacity =
    textPhase === 'text1-in' ? 1 :
    textPhase === 'text1-out' ? 0 : 0;

  const text2Opacity =
    textPhase === 'text2-in' ? 1 :
    textPhase === 'text2-out' ? 0 : 0;

  const textVisible = textPhase !== 'hidden' && textPhase !== 'done';

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div className="header-container-mindar">
        <LogoHeader/>
        <HelpPopUpBtn className="help-btn-mindar" onClick={() => setShowPopUp(true)}/>
        {showPopUp && 
        <LearnMorePopUp 
          headerName={"Como interagir na experiência?"}
          onClose={handleClosePopUp}
          imgSrc="/images/djoao.webp"
          description="
          Procure pelo quadro de D. João V.
          Aponte a câmara e devolva a riqueza, ao famoso 'Magnânimo', que se encontra à sua volta."/>
          }
      </div>
      {/* AR Scene */}
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
          {/* Models are hidden via scale until text sequence finishes */}
          <a-entity
            ref={gemRef}
            id="gem-entity"
            gltf-model="/models/gema.glb"
            scale={modelsVisible ? ".5 .5 .5" : "0 0 0"}
            position="1 0 0"
          ></a-entity>

          <a-entity
            ref={silverRef}
            id="silver-entity"
            gltf-model="/models/prata.glb"
            scale={modelsVisible ? ".5 .5 .5" : "0 0 0"}
            position="0 1 0"
          ></a-entity>

          <a-entity
            ref={goldRef}
            id="gold-entity"
            gltf-model="/models/ouro.glb"
            scale={modelsVisible ? ".5 .5 .5" : "0 0 0"}
            position="-1 0 0"
          ></a-entity>
        </a-entity>
      </a-scene>

      {/* Overlay text — rendered in HTML on top of the canvas */}
      {textVisible && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            zIndex: 10,
          }}
        >
          {/* Text 1 */}
          <p
            style={{
              position: 'absolute',
              margin: 0,
              padding: '0 1.5rem',
              textAlign: 'center',
              fontFamily: "'Palatino Linotype', Palatino, 'Book Antiqua', Georgia, serif",
              fontSize: 'clamp(2rem, 5vw, 2.5rem)',
              fontStyle: 'italic',
              color: '#f5e9c8',
              textShadow: '0 2px 12px rgba(0,0,0,0.85), 0 0 40px rgba(0,0,0,0.6)',
              letterSpacing: '0.04em',
              lineHeight: 1.5,
              opacity: text1Opacity,
              transition: 'opacity 900ms ease-in-out',
              maxWidth: '80vw',
            }}
          >
            Fecit potentiam in brachio suo
          </p>

          {/* Text 2 */}
          <p
            style={{
              position: 'absolute',
              margin: 0,
              padding: '0 1.5rem',
              textAlign: 'center',
              fontFamily: "'Palatino Linotype', Palatino, 'Book Antiqua', Georgia, serif",
              fontSize: 'clamp(2rem, 4vw, 2.5rem)',
              color: '#f0dfa8',
              textShadow: '0 2px 12px rgba(0,0,0,0.85), 0 0 40px rgba(0,0,0,0.6)',
              letterSpacing: '0.03em',
              lineHeight: 1.6,
              opacity: text2Opacity,
              transition: 'opacity 900ms ease-in-out',
              maxWidth: '80vw',
            }}
          >
            Com o seu braço, a sua força era demonstrada
          </p>
        </div>
      )}
    </div>
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