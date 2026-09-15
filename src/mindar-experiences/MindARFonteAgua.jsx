import React, { useEffect, useRef, useState } from 'react';
import LearnMorePopUp from '../components/LearnMorePopUp';
import HelpPopUpBtn from '../components/HelpPopUpBtn';
import LogoHeader from '../components/LogoHeader';
import { useMindARLifecycle } from '../hooks/UseMindARLifecycle';
import BackButton from '../components/BackButton';
import './MindAR.css';

export default function MindARFonteAgua({ videoSrc = "/videos/cicloAguaImposto.mp4" }) {
  const sceneRef = useRef(null);
  const videoRef = useRef(null);

  const [showPopUp, setShowPopUp] = useState(true);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [hasWatched, setHasWatched] = useState(false);
  const [isTargetFound, setIsTargetFound] = useState(false);

  useMindARLifecycle(sceneRef);

  const handleClosePopUp = () => {
    setShowPopUp(false);
  };

  // AR initialization & Target tracking
  useEffect(() => {
    let mounted = true;
    let cleanupListeners = null;

    const init = async () => {
      await loadScript("https://aframe.io/releases/1.5.0/aframe.min.js");
      await loadScript("https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-image-aframe.prod.js");

      if (!mounted) return;

      const scene = sceneRef.current;
      if (!scene) return;

      const startAR = () => {
        const system = scene.systems["mindar-image-system"];
        if (system && !system.started) {
          system.start();
        }
      };

      if (scene.hasLoaded || scene.renderStarted) {
        startAR();
      } else {
        scene.addEventListener("renderstart", startAR, { once: true });
      }

      const target = scene.querySelector("[mindar-image-target]");

      const handleTargetFound = () => setIsTargetFound(true);
      const handleTargetLost = () => setIsTargetFound(false);

      if (target) {
        target.addEventListener("targetFound", handleTargetFound);
        target.addEventListener("targetLost", handleTargetLost);
      }

      cleanupListeners = () => {
        if (target) {
          target.removeEventListener("targetFound", handleTargetFound);
          target.removeEventListener("targetLost", handleTargetLost);
        }
      };
    };

    init();

    return () => {
      mounted = false;
      if (cleanupListeners) cleanupListeners();
      const system = sceneRef.current?.systems["mindar-image-system"];
      if (system?.started) {
        system.stop();
      }
    };
  }, []);

  // Strict Button Visibility Logic (No poem dependency)
  useEffect(() => {
    if (isVideoPlaying || showPopUp) {
      setButtonVisible(false); // Despawn when video is active or popup is open
      return;
    }

    if (isTargetFound) {
      setButtonVisible(true);
    } else {
      setButtonVisible(hasWatched);
    }
  }, [isTargetFound, hasWatched, isVideoPlaying, showPopUp]);

  // Video Controls
  const startVideo = () => {
    setIsVideoPlaying(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(e => console.error("Video play failed", e));
    }
  };

  const stopVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsVideoPlaying(false);
    setHasWatched(true);
  };

  return (
    <>
      <style>
        {`
          .video-overlay-wrapper {
            position: fixed;
            inset: 0;
            z-index: 2000;
            background-color: #000;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
          }
          .landscape-video {
            width: 100vw;
            height: 100vh;
            object-fit: contain;
          }
          .close-video-btn {
            position: absolute;
            top: 2rem;
            right: 2rem;
            z-index: 2010;
            background: rgba(255,255,255,0.2);
            color: #fff;
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            font-size: 1.5rem;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .orientation-warning {
            display: none; 
            position: absolute;
            inset: 0;
            background-color: rgba(0, 0, 0, 0.95);
            z-index: 2020;
            color: #E4D8C4;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 2rem;
            font-family: "'Palatino Linotype', Georgia, serif";
          }
          .phone-icon {
            width: 80px;
            height: 80px;
            margin-bottom: 1.5rem;
            animation: rotatePhone 2.5s infinite ease-in-out;
            color: #EA562E;
          }
          @keyframes rotatePhone {
            0% { transform: rotate(0deg); }
            50% { transform: rotate(-90deg); }
            100% { transform: rotate(-90deg); }
          }
          @media screen and (orientation: portrait) {
            .orientation-warning {
              display: flex; 
            }
          }
        `}
      </style>

      <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
        {!isVideoPlaying && (
          <div className="header-container-mindar">
            <BackButton />
            <LogoHeader />
            <HelpPopUpBtn
              className="help-btn-mindar"
              onClick={() => setShowPopUp(true)}
            />

            {showPopUp && (
              <LearnMorePopUp
                headerName={"Como interagir na experiência?"}
                onClose={handleClosePopUp}
                imgSrc="/images/chafariz-rato.webp"
                description="Com a câmara, procure pelo quadro que representa a planta do chafariz do Rato, observando uma experiência audiovisual."
              />
            )}
          </div>
        )}

        {/* Start / Replay Video Button */}
        {buttonVisible && !isVideoPlaying && (
          <button
            onClick={startVideo}
            style={{
              position: "absolute",
              bottom: "5.5rem",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 1000,
              padding: "14px 28px",
              border: "none",
              borderRadius: "999px",
              background: "#EA562E",
              color: "#E4D8C4",
              fontSize: "1.25rem",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
            }}
          >
            {hasWatched ? "Ver novamente" : "Veja o Ciclo da Água e do Imposto"}
          </button>
        )}

        {/* Video Overlay Layer */}
        {isVideoPlaying && (
          <div className="video-overlay-wrapper">
            <div className="orientation-warning">
              <svg className="phone-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                <line x1="12" y1="18" x2="12.01" y2="18"></line>
              </svg>
              <h2 style={{ margin: 0, fontSize: "1.5rem", fontWeight: "600" }}>Desbloqueie a orientação do ecrã e Rode o seu dispositivo</h2>
              <p style={{ marginTop: "1rem", fontSize: "1.1rem", lineHeight: "1.4" }}>
                Certifique-se que tem o bloqueio de orientação do ecrã desligado e coloque o dispositivo na horizontal para assistir ao vídeo em ecrã inteiro. Disfrute da experiência com o som ligado.
              </p>
              
              <button 
                onClick={stopVideo} 
                style={{
                  marginTop: "2rem",
                  padding: "10px 20px",
                  background: "transparent",
                  border: "1px solid #E4D8C4",
                  color: "#E4D8C4",
                  borderRadius: "999px",
                  cursor: "pointer"
                }}
              >
                Voltar à câmara
              </button>
            </div>

            <button className="close-video-btn" onClick={stopVideo}>✕</button>
            <video
              ref={videoRef}
              src={videoSrc}
              onEnded={stopVideo}
              playsInline
              webkit-playsinline="true"
              controls={true}
              className="landscape-video"
            />
          </div>
        )}

        {/* Main AR Scene */}
        <a-scene
          ref={sceneRef}
          mindar-image="imageTargetSrc: /markers/fonteaguamarker.mind; filterMinCF:0.01; filterBeta:0.01; autoStart: false; uiLoading: no; uiError: no; uiScanning: no; warmupTolerance: 1; missTolerance: 4;"
          color-space="sRGB"
          embedded
          renderer="colorManagement: true, physicallyCorrectLights"
          vr-mode-ui="enabled: false"
          device-orientation-permission-ui="enabled: false"
        >
          <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>
          
          <a-assets>
            <img id="fonteAgua" src="/images/cicloAguaImposto.png" />
          </a-assets>

          <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>
          
          <a-entity mindar-image-target="targetIndex:0">
            <a-image src="#fonteAgua" position="0 0 0" height="3" width="3" material="transparent: true"></a-image>
          </a-entity>
        </a-scene>
      </div>
    </>
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