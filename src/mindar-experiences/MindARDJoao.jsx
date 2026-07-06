import React, { useEffect, useRef, useState } from 'react';
import LearnMorePopUp from '../components/LearnMorePopUp';
import HelpPopUpBtn from '../components/HelpPopUpBtn';
import LogoHeader from '../components/LogoHeader';
import { useMindARLifecycle } from '../hooks/UseMindARLifecycle';
import './MindAR.css';

export default function MindARDJoao({ onTap }) {
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const gemRef = useRef(null);
  const coinRef = useRef(null);
  const goldRef = useRef(null);

  const [showPopUp, setShowPopUp] = useState(true);
  useMindARLifecycle(sceneRef);

  // Track whether the intro text sequence has finished
  const [modelsVisible, setModelsVisible] = useState(false);
  const modelsVisibleRef = useRef(false); // mirrors modelsVisible so the tap handler always reads the live value
  const [textPhase, setTextPhase] = useState('hidden'); // 'hidden' | 'text1-in' | 'text1-out' | 'text2-in' | 'text2-out' | 'done'

  // Track which models have been collected/moved, and whether the final text has shown
  const collectedRef = useRef({ gem: false, coin: false, gold: false });
  const finalTextTriggered = useRef(false); // guard so the final text only fires once
  const [showFinalText, setShowFinalText] = useState(false);

  // Keep modelsVisibleRef in sync with modelsVisible — fixes stale-closure bug in handleInteraction
  useEffect(() => {
    modelsVisibleRef.current = modelsVisible;
  }, [modelsVisible]);

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
      if (!modelsVisibleRef.current) return; // ignore taps during text sequence — reads LIVE value
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
      const meshesCoin = [];
      const meshesGold = [];

      if (gemRef.current?.object3D) {
        gemRef.current.object3D.traverse(obj => { if (obj.isMesh) meshesGem.push(obj); });
      }
      if (coinRef.current?.object3D) {
        coinRef.current.object3D.traverse(obj => { if (obj.isMesh) meshesCoin.push(obj); });
      }
      if (goldRef.current?.object3D) {
        goldRef.current.object3D.traverse(obj => { if (obj.isMesh) meshesGold.push(obj); });
      }

      if (meshesGem.length === 0 || meshesCoin.length === 0 || meshesGold.length === 0) return;

      const hitsGems = raycaster.intersectObjects(meshesGem, false);
      const hitsCoin = raycaster.intersectObjects(meshesCoin, false);
      const hitsGolds = raycaster.intersectObjects(meshesGold, false);

      if (hitsGems.length > 0 && gemRef.current) {
        gemRef.current.setAttribute('animation', {
          property: 'position',
          to: '.5 0.1 0',
          dur: 1000,
          easing: 'easeInOutQuad'
        });
        collectedRef.current.gem = true;
      }

      if (hitsCoin.length > 0 && coinRef.current) {
        coinRef.current.setAttribute('animation', {
          property: 'position',
          to: '-0.25 0 0',
          dur: 1000,
          easing: 'easeInOutQuad'
        });
        collectedRef.current.coin = true;
      }

      if (hitsGolds.length > 0 && goldRef.current) {
        goldRef.current.setAttribute('animation', {
          property: 'position',
          to: '0.3 -0.25 0',
          dur: 1000,
          easing: 'easeInOutQuad'
        });
        collectedRef.current.gold = true;
      }

      // Check if all three models have now been collected
      const { gem, coin, gold } = collectedRef.current;
      if (gem && coin && gold && !finalTextTriggered.current) {
        finalTextTriggered.current = true;
        // wait for the move animation (1000ms) to finish before showing the final text
        setTimeout(() => {
          setShowFinalText(true);
        }, 1000);
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
          <a-asset-item id="gem" src="/models/grupoJoias.glb"></a-asset-item>
          <a-asset-item id="coin" src="/models/grupoMoedas.glb"></a-asset-item>
          <a-asset-item id="gold" src="/models/grupoOuro.glb"></a-asset-item>
        </a-assets>

        <a-camera ref={cameraRef} position="0 0 0" look-controls="enabled: false"></a-camera>

        <a-entity mindar-image-target="targetIndex:0">
          {/* Models are hidden via scale until text sequence finishes */}
          <a-entity
            ref={gemRef}
            id="gem-entity"
            gltf-model="/models/grupoJoias.glb"
            scale={modelsVisible ? ".1 .1 .1" : "0 0 0"}
            rotation= "90 0 0"
            position=".75 .75 0"
          ></a-entity>

          <a-entity
            ref={coinRef}
            id="coin-entity"
            gltf-model="/models/grupoMoedas.glb"
            scale={modelsVisible ? ".1 .1 .1" : "0 0 0"}
            rotation= "90 0 0"
            position="0 0 0"
          ></a-entity>

          <a-entity
            ref={goldRef}
            id="gold-entity"
            gltf-model="/models/grupoOuro.glb"
            scale={modelsVisible ? ".1 .1 .1" : "0 0 0"}
            rotation= "90 0 0"
            position="-.5 0 0"
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

      {/* Final text — shown once all three models have been collected/moved */}
      {showFinalText && (
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
          <p
            style={{
              margin: 0,
              padding: '0 1.5rem',
              textAlign: 'center',
              fontFamily: "'Palatino Linotype', Palatino, 'Book Antiqua', Georgia, serif",
              fontSize: 'clamp(2rem, 4.5vw, 2.5rem)',
              fontStyle: 'italic',
              color: '#f5e9c8',
              textShadow: '0 2px 12px rgba(0,0,0,0.85), 0 0 40px rgba(0,0,0,0.6)',
              letterSpacing: '0.04em',
              lineHeight: 1.5,
              opacity: showFinalText ? 1 : 0,
              transition: 'opacity 900ms ease-in-out',
              maxWidth: '80vw',
            }}
          >
            O Quinto do Ouro foi pago. Pode prosseguir...
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