import React, { useEffect, useRef, useState } from 'react';
import LearnMorePopUp from '../components/LearnMorePopUp';
import HelpPopUpBtn from '../components/HelpPopUpBtn';
import LogoHeader from '../components/LogoHeader';
import { useMindARLifecycle } from '../hooks/UseMindARLifecycle';
import BackButton from '../components/BackButton';
import './MindAR.css';

export default function MindARTerramoto({ videoSrc = "/videos/terramoto.mov" }) {
  const sceneRef = useRef(null);
  const videoRef = useRef(null);
  const blitCanvasRef = useRef(null);
  const textureCanvasRef = useRef(null);
  const planeRef = useRef(null);

  const [showPopUp, setShowPopUp] = useState(true);

  const [isVideoOver, setIsVideoOver] = useState(false);

  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  

  useMindARLifecycle(sceneRef);

  const [textPhase, setTextPhase] = useState('hidden'); 
      const hasRunSequence = useRef(false);
    
      const runTextSequence = () => {
        if (hasRunSequence.current) return;
        hasRunSequence.current = true;
    
        setTextPhase('text1-in');
    
        setTimeout(() => {
          setTextPhase('text1-out');
        }, 4000);
    
        setTimeout(() => {
          setTextPhase('text2-in');
        }, 5200);
    
        setTimeout(() => {
          setTextPhase('text2-out');
        }, 8500);
    
        setTimeout(() => {
          setTextPhase('done');
          setIsVideoPlaying(true);
        }, 9500);
      };
    
      const handleClosePopUp = () => {
        setShowPopUp(false);
        if(videoRef.current){
          videoRef.current.play().then(() =>{
            videoRef.current.pause();
          }).catch(err=>console.log("Video unlock failed:", err));
        
    }
        runTextSequence(); 
      };

  //use effect para o video começar
  useEffect(() => {
    if(isVideoPlaying && videoRef.current){
      videoRef.current.play().catch(err=>console.error("Delayed play fialed:",err));
    }
  },[isVideoPlaying]);

  useEffect(() => {
    let isMounted = true;
    let callbackId;
    
    // --- CHANGES START HERE ---
    // 1. Keep a reference to the element at the top level of useEffect
    const videoEl = videoRef.current; 

    // 2. Define the frame loop handler up here so it can reference processFrame safely
    const processFrameRef = { current: null };

    // 3. Define event listeners here so both loadScripts and the cleanup block can see them
    const handlePlay = () => {
      if (videoEl && processFrameRef.current) {
        callbackId = videoEl.requestVideoFrameCallback(processFrameRef.current);
      }
    };

    const handleEnded = () => {
      setIsVideoOver(true);
    };
    // --- CHANGES END HERE ---

    const loadScripts = async () => {
      await loadScript('https://aframe.io/releases/1.5.0/aframe.min.js');
      await loadScript('https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-image-aframe.prod.js');

      if (!isMounted) return;

      const sceneEl = sceneRef.current;
      if (!sceneEl) return;

      const startAR = () => {
        const arSystem = sceneEl.systems["mindar-image-system"];
        if (arSystem && !arSystem.started) {
          arSystem.start();
        }
      };

      if (sceneEl.hasLoaded || sceneEl.renderStarted) {
        startAR();
      } else {
        sceneEl.addEventListener('renderstart', startAR);
      }

      // --- CHROMA KEY PROCESSING LOOP ---
      if (!videoEl) return;

      // Assign our actual processing logic to the lifted reference
      processFrameRef.current = (now, metadata) => {
        const blitCanvas = blitCanvasRef.current;
        const textureCanvas = textureCanvasRef.current;
        const aPlane = planeRef.current;
        
        if (!blitCanvas || !textureCanvas || !videoEl) return;

        const blitCtx = blitCanvas.getContext('2d');
        const textureCtx = textureCanvas.getContext('2d');

        const targetWidth = 480; 
        const targetHeight = targetWidth * (metadata.height / metadata.width);

        if (blitCanvas.width !== targetWidth) {
          blitCanvas.width = targetWidth;
          blitCanvas.height = targetHeight;
          textureCanvas.width = targetWidth;
          textureCanvas.height = targetHeight;
        }

        blitCtx.drawImage(videoEl, 0, 0, targetWidth, targetHeight);
        const imageData = blitCtx.getImageData(0, 0, targetWidth, targetHeight);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          
          const targetR = 164, targetG = 223, targetB = 52; 
          const targetR_2 = 47, targetG_2 = 184, targetB_2 = 83;
          
          const distance = Math.sqrt(
            Math.pow(r - targetR, 2) + Math.pow(g - targetG, 2) + Math.pow(b - targetB, 2)
          );
          const distance_2 = Math.sqrt(
            Math.pow(r - targetR_2, 2) + Math.pow(g - targetG_2, 2) + Math.pow(b - targetB_2, 2)
          );

          if (distance < 120) data[i + 3] = 0;
          if (distance_2 < 120) data[i + 3] = 0;
        }

        textureCtx.putImageData(imageData, 0, 0);

        if (aPlane && aPlane.getObject3D('mesh')) {
          const material = aPlane.getObject3D('mesh').material;
          if (material && material.map) {
            material.map.needsUpdate = true;
          }
        }

        callbackId = videoEl.requestVideoFrameCallback(processFrameRef.current);
      };

      // Attaching the listeners we declared above
      videoEl.addEventListener('play', handlePlay);
      videoEl.addEventListener('ended', handleEnded);
      
      
    };

    loadScripts();

    // Now this cleanup return function works flawlessly without throwing an error!
    return () => {
      isMounted = false;
      if (videoEl && callbackId) {
        videoEl.cancelVideoFrameCallback(callbackId);
      }

      videoEl?.removeEventListener('play', handlePlay);
      videoEl?.removeEventListener('ended', handleEnded);

      const arSystem = sceneRef.current?.systems["mindar-image-system"];
      if (arSystem?.started) {
        arSystem.stop();
      }
    };
  }, [videoSrc]);

    const text1Opacity = textPhase === 'text1-in' ? 1 : 0;
  const text2Opacity = textPhase === 'text2-in' ? 1 : 0;
  const textVisible = textPhase !== 'hidden' && textPhase !== 'done';

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <div className="header-container-mindar">
        <BackButton />
        <LogoHeader/>
        <HelpPopUpBtn className="help-btn-mindar" onClick={() => setShowPopUp(true)}/>
        {showPopUp && 
        <LearnMorePopUp 
          headerName={"Como interagir na experiência?"}
          onClose={handleClosePopUp}
          imgSrc="/images/salaconvite.webp"
          description="
          Com a câmara, procure qual das figuras de convite pretende demonstrar a Burocracia na sua glória.
          Mantenha a câmara apontada para observar a experiência na sua totalidade.
          "/>
          }
      </div>
      {/* Hidden processing infrastructure */}
      <video ref={videoRef} src={videoSrc} muted playsInline style={{ display: 'none' }} />
      <canvas ref={blitCanvasRef} style={{ display: 'none' }} />
      <canvas id="chromaTextureCanvas" ref={textureCanvasRef} style={{ display: 'none' }} />

      {isVideoOver && (
      <div className="video-overlay">
        <button
          onClick={() => {
            const video = videoRef.current;
            video.currentTime = 0;
            setIsVideoOver(false);
            video.play();
          }}
          style={{
            position: "absolute",
            bottom: "50%",
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

      <a-scene
        ref={sceneRef}
        mindar-image={`imageTargetSrc: ${"/markers/terramoto-marker.mind"}; filterMinCF:0.0001; filterBeta:0.001; autoStart: false; uiLoading: no; uiError: no; uiScanning: no;`}
        color-space="sRGB"
        embedded
        renderer="colorManagement: true, physicallyCorrectLights"
        vr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: false"
      >
        <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

        <a-entity mindar-image-target="targetIndex:0">            
            {/* Exactly centered, isolated chroma key video plane wrapper */}
            <a-plane 
              ref={planeRef}
              src="#chromaTextureCanvas"
              material="transparent: true; shader: flat;"
              position="0 0 0.05" 
              {...(isVideoPlaying ? { width: "1.5", height: "2" } : { width: "0.0001", height: "0.0001" })}
            ></a-plane>
        </a-entity>
      </a-scene>

      {textVisible && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 10 }}>
          <p style={{ position: 'absolute', margin: 0, padding: '0 1.5rem', textAlign: 'center', fontFamily: "'Palatino Linotype', Georgia, serif", fontSize: 'clamp(2rem, 5vw, 2.5rem)', fontWeight:'600', fontStyle: 'italic', color: '#f5e9c8', textShadow: '0 2px 12px rgba(0,0,0,0.85)', opacity: text1Opacity, transition: 'opacity 1000ms ease-in-out', maxWidth: '80vw' }}>
            Tremor
          </p>
          <p style={{ position: 'absolute', margin: 0, padding: '0 1.5rem', textAlign: 'center', fontFamily: "'Palatino Linotype', Georgia, serif", fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight:'600', fontStyle: 'italic', color: '#f0dfa8', textShadow: '0 2px 12px rgba(0,0,0,0.85)', opacity: text2Opacity, transition: 'opacity 1000ms ease-in-out', maxWidth: '80vw' }}>
            Gente cadê meu oculos
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