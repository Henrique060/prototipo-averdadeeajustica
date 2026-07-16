import React, { useEffect, useRef, useState } from 'react';
import LearnMorePopUp from '../components/LearnMorePopUp';
import HelpPopUpBtn from '../components/HelpPopUpBtn';
import LogoHeader from '../components/LogoHeader';
import { useMindARLifecycle } from '../hooks/UseMindARLifecycle';
import './MindAR.css';
import BackButton from '../components/BackButton';

export default function MindAREscadaria({
  onTap,
  videoSrc = "/videos/ana-escadaria.mov",
}) {
  const sceneRef = useRef(null);

  const videoRef = useRef(null);
  const blitCanvasRef = useRef(null);
  const textureCanvasRef = useRef(null);
  const planeRef = useRef(null);

  const [showPopUp, setShowPopUp] = useState(true);
  const [showFinalText, setShowFinalText] = useState(false);

  const detectedTargetsRef = useRef({
    0: false,
    1: false,
    2: false,
    3: false,
  });

  useMindARLifecycle(sceneRef);

  useEffect(() => {
    let isMounted = true;
    let callbackId;

    const sceneEl = sceneRef.current;

    


    const onTargetLost = () => {};

    const loadScripts = async () => {
      await loadScript('https://aframe.io/releases/1.5.0/aframe.min.js');
      await loadScript('https://unpkg.com/aframe-look-at-component@0.8.0/dist/aframe-look-at-component.min.js');
      await loadScript('https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-image-aframe.prod.js');

      await loadScript('https://unpkg.com/aframe-look-at-component@0.8.0/dist/aframe-look-at-component.min.js');

      if (!isMounted || !sceneEl) return;

      const startAR = () => {
        const arSystem = sceneEl.systems["mindar-image-system"];
        if (arSystem && !arSystem.started) {
          arSystem.start();
        }
      };

      if (sceneEl.hasLoaded || sceneEl.renderStarted) {
        startAR();
      } else {
        sceneEl.addEventListener("renderstart", startAR, { once: true });
      }

      if (onTap) {
        sceneEl.addEventListener("click", onTap);
      }

      // ---------------- CHROMA KEY ----------------

      const videoEl = videoRef.current;
      if (!videoEl) return;

      const processFrame = (now, metadata) => {
        const blitCanvas = blitCanvasRef.current;
        const textureCanvas = textureCanvasRef.current;
        const plane = planeRef.current;

        if (!blitCanvas || !textureCanvas || !videoRef) return;

        const blitCtx = blitCanvas.getContext("2d");
        const textureCtx = textureCanvas.getContext("2d");

        const targetWidth = 480;
        const targetHeight = targetWidth * (metadata.height / metadata.width);

        if (blitCanvas.width !== targetWidth) {
          blitCanvas.width = targetWidth;
          blitCanvas.height = targetHeight;
          textureCanvas.width = targetWidth;
          textureCanvas.height = targetHeight;
        }

        blitCtx.drawImage(videoEl, 0, 0, targetWidth, targetHeight);

        const imageData = blitCtx.getImageData(
          0,
          0,
          targetWidth,
          targetHeight
        );

        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          const targetR = 106;
          const targetG = 238;
          const targetB = 127;

          const distance = Math.sqrt(
            Math.pow(r - targetR, 2) +
              Math.pow(g - targetG, 2) +
              Math.pow(b - targetB, 2)
          );

          if (distance < 180) {
            data[i + 3] = 0;
          }
        }

        textureCtx.putImageData(imageData, 0, 0);

        if (plane && plane.getObject3D("mesh")) {
          const material = plane.getObject3D("mesh").material;
          if (material && material.map) {
            material.map.needsUpdate = true;
          }
        }

        callbackId = videoEl.requestVideoFrameCallback(processFrame);
      };

      const handlePlay = () => {
        callbackId = videoEl.requestVideoFrameCallback(processFrame);
      };

      videoEl.addEventListener("play", handlePlay);

      if (videoEl.paused) {
        videoEl
          .play()
          .catch((err) =>
            console.log("Awaiting manual user interaction trigger context", err)
          );
      }
    };

    loadScripts();

    return () => {
      isMounted = false;

      if (videoRef.current && callbackId) {
        videoRef.current.cancelVideoFrameCallback(callbackId);
      }

      const arSystem = sceneRef.current?.systems["mindar-image-system"];

      if (arSystem?.started) {
        arSystem.stop();
      }

  
    };
  }, [onTap, videoSrc]);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
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
            onClose={() => setShowPopUp(false)}
            imgSrc="/images/escadaria.webp"
            description="
          Suba as escadas e aponte o telemóvel aos azulejos.
          Siga as instruções das figuras de modo a iniciar a sua jornada nesta experiência no museu."
          />
        )}
      </div>

      <video
        ref={videoRef}
        src={videoSrc}
        loop
        muted
        playsInline
        style={{ display: "none" }}
      />

      <canvas ref={blitCanvasRef} style={{ display: "none" }} />

      <canvas
        id="chromaTextureCanvas"
        ref={textureCanvasRef}
        style={{ display: "none" }}
      />

      <a-scene
        ref={sceneRef}
        mindar-image="
          imageTargetSrc: /markers/escadaria-target2.mind; 
          autoStart: false; 
          uiLoading: no; 
          uiError: no; 
          uiScanning: no;
          filterMinCF: 0.1; 
          filterBeta: 10;
          warmupTolerance: 1;
          missTolerance: 3;
        "
        color-space="sRGB"
        embedded
        renderer="colorManagement: true;"
        vr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: false"
      >
        <a-assets>
          <img
            id="miratecnica"
            src="/images/miratecnica.png"
            crossOrigin='anonymous'
            look-at="[camera]"
          />
          <img
            id="arrow-left-1"
            src="/images/arrow-left.webp"
            crossOrigin="anonymous"
          />
          <img
            id="arrow-left-2"
            src="/images/arrow-left-2.webp"
            crossOrigin="anonymous"
          />
          <img
            id="arrow-end"
            src="/images/arrow-end.png"
            crossOrigin="anonymous"
          />
        </a-assets>

        <a-camera
          position="0 0 0"
          look-controls="enabled: false"
        ></a-camera>

        <a-entity mindar-image-target="targetIndex:0">
          <a-plane
            src="#miratecnica"
            position="0 0.2 0.01"
            width="2"
            height="2"
            transparent="true"
          ></a-plane>
        </a-entity>

        <a-entity mindar-image-target="targetIndex:1">
          <a-plane
            src="#arrow-left-1"
            position="0 0.5 0.01"
            width="2"
            height="2"
            look-at="[camera]"
            transparent="true"
          ></a-plane>
        </a-entity>

        <a-entity mindar-image-target="targetIndex:2">
          <a-plane
            src="#arrow-left-2"
            position="0 0.5 0.01"
            width="2"
            height="2"
            look-at="[camera]"
            transparent="true"
          ></a-plane>
        </a-entity>

        <a-entity mindar-image-target="targetIndex:3">
          <a-plane
            ref={planeRef}
            src="#chromaTextureCanvas"
            material="transparent: true; shader: flat;"
            position="0 0.25 0.01"
            width="1"
            height="2"
            look-at="[camera]"
          ></a-plane>
        </a-entity>

        <a-entity mindar-image-target="targetIndex:4">
          <a-plane
            src="#arrow-end"
            position="0 0.5 0.01"
            width="2"
            height="2"
            look-at="[camera]"
            transparent="true"
          ></a-plane>
        </a-entity>
      </a-scene>

      {showFinalText && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
            zIndex: 10,
          }}
        >
          <p
            style={{
              margin: 0,
              padding: "0 1.5rem",
              textAlign: "center",
              fontFamily:
                "'Palatino Linotype', Palatino, 'Book Antiqua', Georgia, serif",
              fontSize: "clamp(2rem, 4.5vw, 2.5rem)",
              fontStyle: "italic",
              color: "#f5e9c8",
              textShadow:
                "0 2px 12px rgba(0,0,0,0.85), 0 0 40px rgba(0,0,0,0.6)",
              letterSpacing: "0.04em",
              lineHeight: 1.5,
              opacity: showFinalText ? 1 : 0,
              transition: "opacity 900ms ease-in-out",
              maxWidth: "80vw",
            }}
          >
            Entre pela porta e delicie-se com A Verdade e a J-u-s-t-i-ç-a...
          </p>
        </div>
      )}
    </div>
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