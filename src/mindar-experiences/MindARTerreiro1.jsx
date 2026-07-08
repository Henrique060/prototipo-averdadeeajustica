import React, { useEffect, useRef, useState } from "react";
import LearnMorePopUp from '../components/LearnMorePopUp';
import HelpPopUpBtn from '../components/HelpPopUpBtn';
import LogoHeader from '../components/LogoHeader';
import { useMindARLifecycle } from '../hooks/UseMindARLifecycle';
import './MindAR.css';

export default function MindARTerreiro1({ onTap }) {
  const sceneRef = useRef(null);
  const videoRef = useRef(null);
  const videoPlaneRef = useRef(null);

  const [showPopUp, setShowPopUp] = useState(true);

  useMindARLifecycle(sceneRef);

  useEffect(() => {
    let mounted = true;
    let cleanupListeners = null;
    let animationFrameId = null;

    const init = async () => {
      // 1. Ensure scripts are fully appended and executed
      await loadScript("https://aframe.io/releases/1.5.0/aframe.min.js");
      await loadScript("https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-image-aframe.prod.js");
      await loadScript('https://unpkg.com/aframe-look-at-component@0.8.0/dist/aframe-look-at-component.min.js');

      if (!mounted) return;

      const scene = sceneRef.current;
      const video = videoRef.current;
      const videoPlane = videoPlaneRef.current;
      
      if (!scene || !video || !videoPlane) return;

      // 2. Safely initialize and start MindAR System
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

      // 3. Find the Target Entity
      const target = scene.querySelector("[mindar-image-target]");

      // Pre-load the HTML5 video layer explicitly
      video.load();

      // Continuous loop running while target is found to sync the video data onto the WebGL mesh
      const syncVideoTexture = () => {
        if (!mounted) return;
        
        const mesh = videoPlane.getObject3D("mesh");
        if (mesh?.material?.map) {
          mesh.material.map.needsUpdate = true;
        }
        animationFrameId = requestAnimationFrame(syncVideoTexture);
      };

      const playVideo = async () => {
        try {
          video.currentTime = 0;
          await video.play();
          
          // Start the frame update loop
          syncVideoTexture();
        } catch (e) {
          console.error("Video play interrupted or delayed by browser auto-play policy:", e);
        }
      };

      const pauseVideo = () => {
        video.pause();
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
      };

      // 4. Attach event hooks securely
      target.addEventListener("targetFound", playVideo);
      target.addEventListener("targetLost", pauseVideo);

      cleanupListeners = () => {
        target.removeEventListener("targetFound", playVideo);
        target.removeEventListener("targetLost", pauseVideo);
        if (onTap) {
          scene.removeEventListener("click", onTap);
        }
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
      };
    };

    init();

    return () => {
      mounted = false;

      if (cleanupListeners) {
        cleanupListeners();
      }

      const system = sceneRef.current?.systems["mindar-image-system"];
      if (system?.started) {
        system.stop();
      }
    };
  }, [onTap]);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <div className="header-container-mindar">
        <LogoHeader />
        <HelpPopUpBtn className="help-btn-mindar" onClick={() => setShowPopUp(true)} />
        {showPopUp &&
          <LearnMorePopUp
            headerName={"Como interagir na experiência?"}
            onClose={() => setShowPopUp(false)}
            imgSrc="/images/sala21-2.webp"
            description="
          Dirija-se para a localização central da sala, de frente para a Santa, conforme demonstrado na imagem acima.
          Aponte a câmara ao quadro da esquerda, de modo a conhecer em maior detalhe a obra, através de uma experiência audiovisual."
          />
        }
      </div>

      <a-scene
        ref={sceneRef}
        mindar-image="imageTargetSrc: /markers/terreiro-paco-target.mind; autoStart: false; uiLoading: no; uiError: no; uiScanning: no;"
        color-space="sRGB"
        embedded
        renderer="colorManagement: true; physicallyCorrectLights: true"
        vr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: false"
      >
        {/* Fixed: Assets nested cleanly inside <a-assets> so A-Frame populates internal texture references */}
        <a-assets>
          <video
            ref={videoRef}
            id="videoAsset"
            src="/videos/terreiro-video.mp4"
            preload="auto"
            muted
            loop
            playsInline
            webkit-playsinline="true"
            style={{ display: "none" }}
          />
        </a-assets>

        <a-camera position="0 0 0" look-controls="enabled: false" />

        <a-entity mindar-image-target="targetIndex: 0">
          <a-video
            ref={videoPlaneRef}
            id="video"
            src="#videoAsset"
            position="0 0.5 0"
            width="1.5"
            height="1"
            look-at="[camera]"
          />
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