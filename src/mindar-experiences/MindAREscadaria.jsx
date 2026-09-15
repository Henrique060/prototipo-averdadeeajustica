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
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  
  const isInitialRun = useRef(true);

  useMindARLifecycle(sceneRef);

  const handleOpenPopUp = () => {
    setShowPopUp(true);
    if (videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause();
    }
  };

  const handleClosePopUp = () => {
    setShowPopUp(false);

    if (isInitialRun.current) {
      isInitialRun.current = false;
      if (videoRef.current) {
        // unlock autoplay and instantly start the experience
        videoRef.current.play().catch(err => console.log("Video unlock failed:", err));
      }
      setIsVideoPlaying(true);
    } else {
      if (videoRef.current) {
        videoRef.current.play().catch(err => console.error("Resume failed:", err));
      }
    }
  };

  useEffect(() => {
    const sceneEl = sceneRef.current;
    if (sceneEl && onTap) {
      sceneEl.addEventListener('click', onTap);
      return () => sceneEl.removeEventListener('click', onTap);
    }
  }, [onTap]);

  useEffect(() => {
    let isMounted = true;
    let callbackId;

    const sceneEl = sceneRef.current;
    const videoEl = videoRef.current;
    const processFrameRef = { current: null };

    const loadScripts = async () => {
      await loadScript('https://aframe.io/releases/1.5.0/aframe.min.js');
      await loadScript('https://unpkg.com/aframe-look-at-component@0.8.0/dist/aframe-look-at-component.min.js');
      await loadScript('https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-image-aframe.prod.js');

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

      if (!videoEl) return;

      processFrameRef.current = (now, metadata) => {
        const blitCanvas = blitCanvasRef.current;
        const textureCanvas = textureCanvasRef.current;
        const plane = planeRef.current;

        if (!blitCanvas || !textureCanvas || !videoEl) return;

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
        const imageData = blitCtx.getImageData(0, 0, targetWidth, targetHeight);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          const targetR = 102;
          const targetG = 236;
          const targetB = 130;

          const distance = Math.sqrt(
            Math.pow(r - targetR, 2) + Math.pow(g - targetG, 2) + Math.pow(b - targetB, 2)
          );

          if (distance < 60) {
            data[i + 3] = 0;
          }

          const r_2 = data[i];
          const g_2 = data[i + 1];
          const b_2 = data[i + 2];

          const targetR_2 = 42;
          const targetG_2 = 161;
          const targetB_2 = 77;

          const distance_2 = Math.sqrt(
            Math.pow(r_2 - targetR_2, 2) + Math.pow(g_2 - targetG_2, 2) + Math.pow(b_2 - targetB_2, 2)
          );

          if (distance_2 < 100) {
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

        callbackId = videoEl.requestVideoFrameCallback(processFrameRef.current);
      };

      const handlePlay = () => {
        if (videoEl && processFrameRef.current) {
          callbackId = videoEl.requestVideoFrameCallback(processFrameRef.current);
        }
      };

      videoEl.addEventListener("play", handlePlay);
    };

    loadScripts();

    return () => {
      isMounted = false;

      if (videoEl && callbackId) {
        videoEl.cancelVideoFrameCallback(callbackId);
      }

      const arSystem = sceneRef.current?.systems["mindar-image-system"];
      if (arSystem?.started) {
        arSystem.stop();
      }
    };
  }, [videoSrc]);

  useEffect(() => {
    if (isVideoPlaying && videoRef.current) {
      videoRef.current.play().catch(err => console.error("Delayed play failed:", err));
    }
  }, [isVideoPlaying]);


  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <div className="header-container-mindar">
        <BackButton />
        <LogoHeader />
        <HelpPopUpBtn
          className="help-btn-mindar"
          onClick={handleOpenPopUp}
        />

        {showPopUp && (
          <LearnMorePopUp
            headerName={"Como interagir na experiência?"}
            onClose={handleClosePopUp}
            carousel={true}
            imagesSrc={[
              "/images/marker1.webp",
              "/images/marker2.webp",
              "/images/marker3.webp"
            ]}
            description="Suba as escadas e aponte o telemóvel aos azulejos, apresentados nas imagens acima. Siga as instruções das figuras de modo a iniciar a sua jornada nesta experiência no museu."
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
      <canvas id="chromaTextureCanvas" ref={textureCanvasRef} style={{ display: "none" }} />

      <a-scene
        ref={sceneRef}
        mindar-image="
          imageTargetSrc: /markers/escadaria-target3.mind; 
          autoStart: false; 
          uiLoading: no; 
          uiError: no; 
          uiScanning: no;
          filterMinCF: 0.01; 
          filterBeta: 0.01;
          warmupTolerance: 1;
          missTolerance: 4;
        "
        color-space="sRGB"
        embedded
        renderer="colorManagement: true;"
        vr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: false"
      >
        <a-assets>
          <img id="arrow-left-1" src="/images/arrow-left.webp" preload="auto"  crossOrigin="anonymous" />
          <img id="arrow-left-2" src="/images/arrow-left-2.webp" preload="auto"  crossOrigin="anonymous" />
          <img id="arrow-end" src="/images/arrow-end.webp" preload="auto"  crossOrigin="anonymous" />
        </a-assets>

        <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

        <a-entity mindar-image-target="targetIndex:1">
          <a-plane
            src="#arrow-left-1"
            position="0 0.3 0.01"
            look-at="[camera]"
            transparent="true"
            {...(isVideoPlaying ? { width: "1", height: "1" } : { width: "0.0001", height: "0.0001" })}
          ></a-plane>
        </a-entity>

        <a-entity mindar-image-target="targetIndex:2">
          <a-plane
            src="#arrow-left-2"
            position="0 0.3 0.01"
            look-at="[camera]"
            transparent="true"
            {...(isVideoPlaying ? { width: "1", height: "1" } : { width: "0.0001", height: "0.0001" })}
          ></a-plane>
        </a-entity>

        <a-entity mindar-image-target="targetIndex:3">
          <a-plane
            ref={planeRef}
            src="#chromaTextureCanvas"
            material="transparent: true; shader: flat;"
            position="0 0.05 0.01"
            look-at="[camera]"
            {...(isVideoPlaying ? { width: "0.5", height: "1" } : { width: "0.0001", height: "0.0001" })}
          ></a-plane>
        </a-entity>

        <a-entity mindar-image-target="targetIndex:4">
          <a-plane
            src="#arrow-end"
            position="0 0.3 0.01"
            look-at="[camera]"
            transparent="true"
            {...(isVideoPlaying ? { width: "1", height: "1" } : { width: "0.0001", height: "0.0001" })}
          ></a-plane>
        </a-entity>
      </a-scene>
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