import React, { useEffect, useRef, useState } from "react";
import LearnMorePopUp from '../components/LearnMorePopUp';
import HelpPopUpBtn from '../components/HelpPopUpBtn';
import LogoHeader from '../components/LogoHeader';
import { useMindARLifecycle } from '../hooks/UseMindARLifecycle';
import BackButton from "../components/BackButton";
import './MindAR.css';

export default function MindARTerreiro1({ onTap }) {
  const sceneRef = useRef(null);
  const videoRef = useRef(null);

  const [showPopUp, setShowPopUp] = useState(true);
  
  const [buttonVisible, setButtonVisible] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [hasWatched, setHasWatched] = useState(false);
  const [isTargetFound, setIsTargetFound] = useState(false);

  useMindARLifecycle(sceneRef);

  const [textPhase, setTextPhase] = useState('hidden'); 
  const hasRunSequence = useRef(false);

  const runTextSequence = () => {
    if (hasRunSequence.current) return;
    hasRunSequence.current = true;

    setTextPhase('text1-in');

    setTimeout(() => {
      setTextPhase('text1-out');
    }, 5000);

    setTimeout(() => {
      setTextPhase('text2-in');
    }, 7000);

    setTimeout(() => {
      setTextPhase('text2-out');
    }, 12000);

    setTimeout(() => {
      setTextPhase('done');
    }, 14000);
  };

  const handleClosePopUp = () => {
    setShowPopUp(false);
    runTextSequence(); 
  };

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

      if (onTap) {
        scene.addEventListener("click", onTap);
      }

      const target = scene.querySelector("[mindar-image-target]");

      const handleTargetFound = () => {
        setIsTargetFound(true);
        setButtonVisible(true);
      };

      const handleTargetLost = () => {
        setIsTargetFound(false);
        setButtonVisible((prev) => {
          if (hasWatched) return true;
          return false;
        });
      };

      target.addEventListener("targetFound", handleTargetFound);
      target.addEventListener("targetLost", handleTargetLost);

      cleanupListeners = () => {
        target.removeEventListener("targetFound", handleTargetFound);
        target.removeEventListener("targetLost", handleTargetLost);

        if (onTap) {
          scene.removeEventListener("click", onTap);
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
  }, [onTap, hasWatched]);

  const text1Opacity = textPhase === 'text1-in' ? 1 : 0;
  const text2Opacity = textPhase === 'text2-in' ? 1 : 0;
  const textVisible = textPhase !== 'hidden' && textPhase !== 'done';

  // --- Video Controls ---
  const startVideo = () => {
    setIsVideoPlaying(true);
    setButtonVisible(false);
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
    setButtonVisible(true);
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

          /* Warning overlay is hidden by default (Landscape) */
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

          /* Show warning ONLY when holding device vertically */
          @media screen and (orientation: portrait) {
            .orientation-warning {
              display: flex; 
            }
          }
        `}
      </style>

      <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
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
                imgSrc="/images/sala21-2.webp"
                description="Dirija-se para a localização central da sala, de frente para a estátua de Nossa Senhora da Pureza, conforme demonstrado na imagem acima. Aponte a câmara ao quadro da esquerda, de modo a conhecer em maior detalhe a obra, através de uma experiência audiovisual."
              />
            )}
          </div>
        )}

        {buttonVisible && !isVideoPlaying && (
          <button
            onClick={startVideo}
            style={{
              position: "absolute",
              bottom: "5.5rem", /* Positions the button slightly above the bottom */
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
            }}
          >
            {hasWatched ? "Ver novamente" : "Viage no tempo"}
          </button>
        )}

        {/* 2D Video Overlay */}
        {isVideoPlaying && (
          <div className="video-overlay-wrapper">
            
            {/* The Orientation Warning Overlay */}
            <div className="orientation-warning">
              <svg className="phone-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                <line x1="12" y1="18" x2="12.01" y2="18"></line>
              </svg>
              <h2 style={{ margin: 0, fontSize: "1.5rem", fontWeight: "600" }}>Rode o seu telemóvel</h2>
              <p style={{ marginTop: "1rem", fontSize: "1.1rem", lineHeight: "1.4" }}>
                Coloque o dispositivo na horizontal para assistir ao vídeo em ecrã inteiro. Disfrute da experiência com o som ligado.
              </p>
              
              {/* Fallback button so they aren't trapped if sensor fails */}
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
              src="/videos/terreiro-video-v2.mp4"
              onEnded={stopVideo}
              playsInline
              webkit-playsinline="true"
              controls={true}
              className="landscape-video"
            />
          </div>
        )}

        <a-scene
          ref={sceneRef}
          mindar-image="imageTargetSrc: /markers/terreiro-paco-target.mind; filterMinCF:0.0001; filterBeta:0.001; autoStart: false; uiLoading: no; uiError: no; uiScanning: no;"
          color-space="sRGB"
          embedded
          renderer="colorManagement: true; physicallyCorrectLights: true"
          vr-mode-ui="enabled: false"
          device-orientation-permission-ui="enabled: false"
        >

          <a-assets>
            <a-asset-item id="fonte" src="/models/fonteapolo1.glb"></a-asset-item>
          </a-assets>
          <a-camera position="0 0 0" look-controls="enabled: false" />
          
          <a-entity mindar-image-target="targetIndex: 0">
            <a-gltf-model
             src="#fonte"
             position="0 0 0.01"
             scale="0.25 0.25 0.25"
             rotation="0 0 0"
            ></a-gltf-model>
          </a-entity>
        </a-scene>

        {textVisible && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 10 }}>
            <p style={{ position: 'absolute', margin: 0, padding: '0 1.5rem', textAlign: 'center', fontFamily: "'Palatino Linotype', Georgia, serif", fontSize: 'clamp(2rem, 5vw, 2.5rem)', fontWeight:'600', fontStyle: 'italic', color: '#f5e9c8', textShadow: '0 2px 12px rgba(0,0,0,0.85)', opacity: text1Opacity, transition: 'opacity 1000ms ease-in-out', maxWidth: '80vw' }}>
              A praça,
              um palco majestoso
              banhado pelo Tejo.
            </p>
            <p style={{ position: 'absolute', margin: 0, padding: '0 1.5rem', textAlign: 'center', fontFamily: "'Palatino Linotype', Georgia, serif", fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight:'600', fontStyle: 'italic', color: '#f0dfa8', textShadow: '0 2px 12px rgba(0,0,0,0.85)', opacity: text2Opacity, transition: 'opacity 1000ms ease-in-out', maxWidth: '80vw' }}>
              Alegoria viva e vivida da cidade:
              do que a cidade foi,
              do que quiseram que ela fosse.
              Mas de quem é ela?
            </p>
          </div>
        )}
      </div>
    </>
  );
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}