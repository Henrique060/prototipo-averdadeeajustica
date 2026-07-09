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
  const [targetVisible, setTargetVisible] = useState(false);

  const playVideoRef = useRef(() => {});
  const pauseVideoRef = useRef(() => {});

  useMindARLifecycle(sceneRef);

  useEffect(() => {
    let mounted = true;
    let cleanupListeners = null;
    let animationFrameId = null;

    const init = async () => {
      await loadScript("https://aframe.io/releases/1.5.0/aframe.min.js");
      await loadScript("https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-image-aframe.prod.js");
      await loadScript("https://unpkg.com/aframe-look-at-component@0.8.0/dist/aframe-look-at-component.min.js");

      if (!mounted) return;

      const scene = sceneRef.current;
      const video = videoRef.current;
      const videoPlane = videoPlaneRef.current;

      if (!scene || !video || !videoPlane) return;

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

      video.load();

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
          syncVideoTexture();
        } catch (e) {
          console.error(e);
        }
      };

      const pauseVideo = () => {
        video.pause();

        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
      };

      playVideoRef.current = playVideo;
      pauseVideoRef.current = pauseVideo;

      const handleTargetFound = () => {
        setTargetVisible(true);
      };

      const handleTargetLost = () => {
        setTargetVisible(false);
        pauseVideo();
      };

      target.addEventListener("targetFound", handleTargetFound);
      target.addEventListener("targetLost", handleTargetLost);

      cleanupListeners = () => {
        target.removeEventListener("targetFound", handleTargetFound);
        target.removeEventListener("targetLost", handleTargetLost);

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

      if (cleanupListeners) cleanupListeners();

      const system = sceneRef.current?.systems["mindar-image-system"];
      if (system?.started) {
        system.stop();
      }
    };
  }, [onTap]);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <div className="header-container-mindar">
        <LogoHeader />
        <HelpPopUpBtn
          className="help-btn-mindar"
          onClick={() => setShowPopUp(true)}
        />

        {showPopUp && (
          <LearnMorePopUp
            headerName={"Como interagir na experiência?"}
            onClose={() => setShowPopUp(false)}
            imgSrc="/images/sala21-2.webp"
            description="
          Dirija-se para a localização central da sala, de frente para a Santa, conforme demonstrado na imagem acima.
          Aponte a câmara ao quadro da esquerda, de modo a conhecer em maior detalhe a obra, através de uma experiência audiovisual."
          />
        )}
      </div>

      {targetVisible && (
        <button
          onClick={() => playVideoRef.current()}
          style={{
            position: "absolute",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1000,
            padding: "14px 28px",
            border: "none",
            borderRadius: "999px",
            background: "#ffffff",
            color: "#000",
            fontSize: "1rem",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Veja o vídeo
        </button>
      )}

      <a-scene
        ref={sceneRef}
        mindar-image="imageTargetSrc: /markers/terreiro-paco-target.mind; autoStart: false; uiLoading: no; uiError: no; uiScanning: no;"
        color-space="sRGB"
        embedded
        renderer="colorManagement: true; physicallyCorrectLights: true"
        vr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: false"
      >
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