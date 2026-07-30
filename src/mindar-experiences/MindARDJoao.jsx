import React, { useEffect, useRef, useState } from 'react';
import LearnMorePopUp from '../components/LearnMorePopUp';
import HelpPopUpBtn from '../components/HelpPopUpBtn';
import LogoHeader from '../components/LogoHeader';
import { useMindARLifecycle } from '../hooks/UseMindARLifecycle';
import BackButton from '../components/BackButton';
import './MindAR.css';

export default function MindARDJoao({ onTap }) {
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);

  const [isExperienceOver, setExperienceOver] = useState(false);

  const handleEnded = () => {
      setExperienceOver(true);
    };

  const [counter, setCounter] = useState(8);
  const reduceCounterOnTap = () => {
      setCounter(counter => counter - 1)
  }

  
  
  const barrasOuroRef = useRef(null);
  const brincosRef = useRef(null);
  const cetroRef = useRef(null);
  const colarRef = useRef(null);
  const coroaRef = useRef(null);
  const faixaMagnanimoRef = useRef(null);
  const moedasOuroRef = useRef(null);
  const tesouroRef = useRef(null);

  const [showPopUp, setShowPopUp] = useState(true);
  useMindARLifecycle(sceneRef);

  const [modelsVisible, setModelsVisible] = useState(false);
  const modelsVisibleRef = useRef(false); 
  const [textPhase, setTextPhase] = useState('hidden'); 

  const collectedRef = useRef({
    barrasouro: false,
    brincos: false,
    cetro: false,
    colar: false,
    coroa: false,
    faixamagnanimo: false,
    moedasouro: false,
    tesouro: false,
  });
  const finalTextTriggered = useRef(false); 
  const [showFinalText, setShowFinalText] = useState(false);

  useEffect(() => {
    modelsVisibleRef.current = modelsVisible;
  }, [modelsVisible]);

  const hasRunSequence = useRef(false);

  const runTextSequence = () => {
    if (hasRunSequence.current) return;
    hasRunSequence.current = true;

    setTextPhase('text1-in');

    setTimeout(() => {
      setTextPhase('text1-out');
    }, 7000);

    setTimeout(() => {
      setTextPhase('text2-in');
    }, 8000);

    setTimeout(() => {
      setTextPhase('text2-out');
    }, 17500);

    setTimeout(() => {
      setTextPhase('done');
      setModelsVisible(true);
    }, 20000);
  };

  const handleClosePopUp = () => {
    setShowPopUp(false);
    runTextSequence(); 
  };

  // 1. Separate Effect: Handle Tap listener additions cleanly without breaking the core system
  useEffect(() => {
    const sceneEl = sceneRef.current;
    if (sceneEl && onTap) {
      sceneEl.addEventListener('click', onTap);
      return () => sceneEl.removeEventListener('click', onTap);
    }
  }, [onTap]);

  // 2. Core Effect: Handles MindAR loading and Canvas lifecycle safely
  useEffect(() => {
    let canvasEl = null;

    const handleInteraction = (clientX, clientY) => {
      if (!modelsVisibleRef.current) return; 
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

      const meshesBarrasOuro = [];
      const meshesBrincos = [];
      const meshesCetro = [];
      const meshesColar = [];
      const meshesCoroa = [];
      const meshesFaixaMagnanimo = [];
      const meshesMoedasOuro = [];
      const meshesTesouro = [];

      if (barrasOuroRef.current?.object3D) {
        barrasOuroRef.current.object3D.traverse(obj => { if (obj.isMesh) meshesBarrasOuro.push(obj); });
      }
      if (brincosRef.current?.object3D) {
        brincosRef.current.object3D.traverse(obj => { if (obj.isMesh) meshesBrincos.push(obj); });
      }
      if (cetroRef.current?.object3D) {
        cetroRef.current.object3D.traverse(obj => { if (obj.isMesh) meshesCetro.push(obj); });
      }
      if (colarRef.current?.object3D) {
        colarRef.current.object3D.traverse(obj => { if (obj.isMesh) meshesColar.push(obj); });
      }
      if (coroaRef.current?.object3D) {
        coroaRef.current.object3D.traverse(obj => { if (obj.isMesh) meshesCoroa.push(obj); });
      }
      if (faixaMagnanimoRef.current?.object3D) {
        faixaMagnanimoRef.current.object3D.traverse(obj => { if (obj.isMesh) meshesFaixaMagnanimo.push(obj); });
      }
      if (moedasOuroRef.current?.object3D) {
        moedasOuroRef.current.object3D.traverse(obj => { if (obj.isMesh) meshesMoedasOuro.push(obj); });
      }
      if (tesouroRef.current?.object3D) {
        tesouroRef.current.object3D.traverse(obj => { if (obj.isMesh) meshesTesouro.push(obj); });
      }

      const hitsBarrasOuro = raycaster.intersectObjects(meshesBarrasOuro, false);
      const hitsBrincos = raycaster.intersectObjects(meshesBrincos, false);
      const hitsCetro = raycaster.intersectObjects(meshesCetro, false);
      const hitsColar = raycaster.intersectObjects(meshesColar, false);
      const hitsCoroa = raycaster.intersectObjects(meshesCoroa, false);
      const hitsFaixaMagnanimo = raycaster.intersectObjects(meshesFaixaMagnanimo, false);
      const hitsMoedasOuro = raycaster.intersectObjects(meshesMoedasOuro, false);
      const hitsTesouro = raycaster.intersectObjects(meshesTesouro, false);

      const animProps = { property: 'position', to: '0 0 0', dur: 1000, easing: 'easeInOutQuad' };

      if (hitsBarrasOuro.length > 0 && barrasOuroRef.current && !collectedRef.current.barrasouro) {
        barrasOuroRef.current.setAttribute('animation', animProps);
        collectedRef.current.barrasouro = true;
        reduceCounterOnTap();
      }
      if (hitsBrincos.length > 0 && brincosRef.current && !collectedRef.current.brincos) {
        brincosRef.current.setAttribute('animation', animProps);
        collectedRef.current.brincos = true; // Fixed
        reduceCounterOnTap();
      }
      if (hitsCetro.length > 0 && cetroRef.current && !collectedRef.current.cetro) {
        cetroRef.current.setAttribute('animation', animProps);
        collectedRef.current.cetro = true; // Fixed
        reduceCounterOnTap();
      }
      if (hitsColar.length > 0 && colarRef.current && !collectedRef.current.colar) {
        colarRef.current.setAttribute('animation', animProps);
        collectedRef.current.colar = true; // Fixed
        reduceCounterOnTap();
      }
      if (hitsCoroa.length > 0 && coroaRef.current && !collectedRef.current.coroa) {
        coroaRef.current.setAttribute('animation', animProps);
        collectedRef.current.coroa = true; // Fixed
        reduceCounterOnTap();
      }
      if (hitsFaixaMagnanimo.length > 0 && faixaMagnanimoRef.current && !collectedRef.current.faixamagnanimo) {
        faixaMagnanimoRef.current.setAttribute('animation', animProps);
        collectedRef.current.faixamagnanimo = true; // Fixed
        reduceCounterOnTap();
      }
      if (hitsMoedasOuro.length > 0 && moedasOuroRef.current && !collectedRef.current.moedasouro) {
        moedasOuroRef.current.setAttribute('animation', animProps);
        collectedRef.current.moedasouro = true; // Fixed
        reduceCounterOnTap();
      }
      if (hitsTesouro.length > 0 && tesouroRef.current && !collectedRef.current.tesouro) {
        tesouroRef.current.setAttribute('animation', animProps);
        collectedRef.current.tesouro = true; // Fixed
        reduceCounterOnTap();
      }

      const { barrasouro, brincos, cetro, colar, coroa, faixamagnanimo, moedasouro, tesouro } = collectedRef.current;

      if (barrasouro && brincos && cetro && colar && coroa && faixamagnanimo && moedasouro && tesouro && !finalTextTriggered.current) {
        finalTextTriggered.current = true;
        setTimeout(() => { setShowFinalText(true); setExperienceOver(true)}, 1000);
        
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

      const setupCanvasEvents = () => {
        canvasEl = sceneEl.canvas;
        if (canvasEl) {
          canvasEl.addEventListener('touchstart', onTouchStart, { passive: false });
          canvasEl.addEventListener('click', onClick);
        }
      };

      const arSystem = sceneEl.systems["mindar-image-system"];
      
      if (sceneEl.hasLoaded) {
        arSystem.start();
        setupCanvasEvents();
      } else {
        sceneEl.addEventListener('renderstart', () => {
          arSystem.start();
          setupCanvasEvents();
        });
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
  }, []); // Empty dependency array keeps it stable and stops camera feed crashes

  const text1Opacity = textPhase === 'text1-in' ? 1 : 0;
  const text2Opacity = textPhase === 'text2-in' ? 1 : 0;
  const textVisible = textPhase !== 'hidden' && textPhase !== 'done';

  //reset

  const handleRestart = () => {
    // 1. Reset React states
    setCounter(8);
    setExperienceOver(false);
    setShowFinalText(false);
    
    // 2. Reset tracking refs
    finalTextTriggered.current = false;
    collectedRef.current = {
      barrasouro: false,
      brincos: false,
      cetro: false,
      colar: false,
      coroa: false,
      faixamagnanimo: false,
      moedasouro: false,
      tesouro: false,
    };

    // 3. Helper to remove animation and reset position
    const resetEntity = (ref, originalPosition) => {
      if (ref.current) {
        ref.current.removeAttribute('animation');
        ref.current.setAttribute('position', originalPosition);
      }
    };

    // 4. Apply original positions
    resetEntity(barrasOuroRef, '0.2 0.1 0.01');
    resetEntity(brincosRef, '0.3 0.25 0.01');
    resetEntity(cetroRef, '-0.15 -0.25 0.01');
    resetEntity(colarRef, '0.3 -0.2 0.01'); // (Fixed a typo here from 0-.2)
    resetEntity(coroaRef, '0.2 -0.2 0.01');
    resetEntity(faixaMagnanimoRef, '0 -0.25 0.01');
    resetEntity(moedasOuroRef, '0.2 0 0.01');
    resetEntity(tesouroRef, '-0.3 0 0.01');
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div className="header-container-mindar">
        <BackButton />
        <LogoHeader/>
        <HelpPopUpBtn className="help-btn-mindar" onClick={() => setShowPopUp(true)}/>
        {showPopUp && 
          <LearnMorePopUp 
            headerName={"Como interagir na experiência?"}
            onClose={handleClosePopUp}
            imgSrc="/images/djoao.webp"
            description="Procure pelo quadro de D. João V. Aponte a câmara e devolva a riqueza, ao famoso 'Magnânimo', tocando nos objetos que aparecem à sua volta."
          />
        }
      </div>

      {!textVisible && (
        <div className="counter-div">
              <p className="counter-text">Itens em falta: {counter}</p>
        </div>
      )}
      

      <a-scene
        ref={sceneRef}
        mindar-image={`imageTargetSrc: ${"/markers/dJoao-target.mind"}; autoStart: false; uiLoading: no; uiError: no; uiScanning: no;`}
        color-space="sRGB"
        embedded
        renderer="colorManagement: true"
        vr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: false"
      >
        <a-assets>
          <a-asset-item id="barrasouro" src="/models/barrasouro.glb"></a-asset-item>
          <a-asset-item id="brincos" src="/models/brincos.glb"></a-asset-item>
          <a-asset-item id="cetro" src="/models/cetro.glb"></a-asset-item>
          <a-asset-item id="colar" src="/models/colar.glb"></a-asset-item>
          <a-asset-item id="coroa" src="/models/coroa.glb"></a-asset-item>
          <a-asset-item id="faixamagnanimo" src="/models/faixamagnanimo.glb"></a-asset-item>
          <a-asset-item id="moedasouro" src="/models/moedasouro.glb"></a-asset-item>
          <a-asset-item id="tesouro" src="/models/tesouro.glb"></a-asset-item>
        </a-assets>

        <a-camera ref={cameraRef} position="0 0 0" look-controls="enabled: false"></a-camera>

        <a-entity mindar-image-target="targetIndex:0">
          <a-entity
            ref={barrasOuroRef}
            id="barrasouro-entity"
            gltf-model="/models/barrasouro.glb"
            scale={modelsVisible ? ".225 .225 .225" : "0 0 0"}
            rotation="180 90 90"
            position="0.2 0.1 0.01"
          ></a-entity>

          <a-entity
            ref={brincosRef}
            id="brincos-entity"
            gltf-model="/models/brincos.glb"
            scale={modelsVisible ? ".225 .225 .225" : "0 0 0"}
            rotation="180 90 90"
            position="0.3 0.25 0.01"
          ></a-entity>

          <a-entity
            ref={cetroRef}
            id="cetro-entity"
            gltf-model="/models/cetro.glb"
            scale={modelsVisible ? ".225 .225 .225" : "0 0 0"}
            rotation="180 90 90"
            position="-0.15 -0.25 0.01"
          ></a-entity>

          <a-entity
            ref={colarRef}
            id="colar-entity"
            gltf-model="/models/colar.glb"
            scale={modelsVisible ? ".225 .225 .225" : "0 0 0"}
            rotation="180 90 90"
            position="0.3 -0.2 0.01"
          ></a-entity>

          <a-entity
            ref={coroaRef}
            id="coroa-entity"
            gltf-model="/models/coroa.glb"
            scale={modelsVisible ? ".225 .225 .225" : "0 0 0"}
            rotation="180 90 90"
            position="0.2 -0.2 0.01"
          ></a-entity>

          <a-entity
            ref={faixaMagnanimoRef}
            id="faixamagnanimo-entity"
            gltf-model="/models/faixamagnanimo.glb"
            scale={modelsVisible ? ".225 .225 .225" : "0 0 0"}
            rotation="180 90 90"
            position="0 -0.25 0.01"
          ></a-entity>

          <a-entity
            ref={moedasOuroRef}
            id="moedasouro-entity"
            gltf-model="/models/moedasouro.glb"
            scale={modelsVisible ? ".225 .225 .225" : "0 0 0"}
            rotation="180 90 90"
            position="0.2 0 0.01"
          ></a-entity>

          <a-entity
            ref={tesouroRef}
            id="tesouro-entity"
            gltf-model="/models/tesouro.glb"
            scale={modelsVisible ? ".225 .225 .225" : "0 0 0"}
            rotation="180 90 90"
            position="-0.3 0 0.01"
          ></a-entity>
        </a-entity>
      </a-scene>

      {textVisible && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 10 }}>
          <p style={{ position: 'absolute', margin: 0, padding: '0 1.5rem', textAlign: 'center', fontFamily: "'Palatino Linotype', Georgia, serif", fontSize: 'clamp(2rem, 5vw, 2.5rem)', fontWeight:'600', fontStyle: 'italic', color: '#f5e9c8', textShadow: '0 2px 12px rgba(0,0,0,0.85)', opacity: text1Opacity, transition: 'opacity 1000ms ease-in-out', maxWidth: '80vw' }}>
            Magnífico,
            magnânimo.
            Um braço que se vê
            e o outro se esconde.
            (Para que a Justiça ao Sólio real se incline;)
          </p>
          <p style={{ position: 'absolute', margin: 0, padding: '0 1.5rem', textAlign: 'center', fontFamily: "'Palatino Linotype', Georgia, serif", fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight:'600', fontStyle: 'italic', color: '#f0dfa8', textShadow: '0 2px 12px rgba(0,0,0,0.85)', opacity: text2Opacity, transition: 'opacity 1000ms ease-in-out', maxWidth: '80vw' }}>
            Rei de grandes obras,
            grande cultura...
            (E a quem a Fama a Eternidade une)
            O seu próprio bem consome:
            e qual seria
            o néctar que o sacia?
          </p>
        </div>
      )}

      {showFinalText && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 10 }}>
          <p style={{ margin: 0, padding: '0 1.5rem', textAlign: 'center', fontFamily: "'Palatino Linotype', Georgia, serif", fontSize: 'clamp(2rem, 4.5vw, 2.5rem)', fontStyle: 'italic', color: '#f5e9c8', textShadow: '0 2px 12px rgba(0,0,0,0.85)', opacity: showFinalText ? 1 : 0, transition: 'opacity 900ms ease-in-out', maxWidth: '80vw' }}>
            O Quinto do Ouro e dos Diamantes foi pago. Pode prosseguir...
          </p>
        </div>
      )}

      {isExperienceOver && (
      <div className="video-overlay">
        <button
          onClick={
            handleRestart
          }
          style={{
            position: "absolute",
            bottom: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1000,
            padding: "14px 28px",
            border: "none",
            borderRadius: "14px",
            background: "#EA562E",
            color: "#E4D7C4",
            fontSize: "1rem",
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
          }}
        >
          Reiniciar Experiência
        </button>
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