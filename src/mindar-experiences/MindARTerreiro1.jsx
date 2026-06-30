import React, { useEffect, useRef, useState } from "react";
import LearnMorePopUp from '../components/LearnMorePopUp';
import HelpPopUpBtn from '../components/HelpPopUpBtn';
import LogoHeader from '../components/LogoHeader';
import './MindAR.css';

export default function MindARTerreiro1({ onTap }) {
  const sceneRef = useRef(null);

  const [showPopUp, setShowPopUp] = useState(true);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      await loadScript("https://aframe.io/releases/1.5.0/aframe.min.js");
      await loadScript("https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-image-aframe.prod.js");

      if (!mounted) return;

      const scene = sceneRef.current;
      if (!scene) return;

      const start = () => {
        const system = scene.systems["mindar-image-system"];
        if (system && !system.started) {
          system.start();
        }
      };

      if (scene.hasLoaded || scene.renderStarted) {
        start();
      } else {
        scene.addEventListener("renderstart", start, { once: true });
      }

      if (onTap) {
        scene.addEventListener("click", onTap);
      }

      const target = scene.querySelector("[mindar-image-target]");
      const video = scene.querySelector("#videoAsset");
      const videoPlane = scene.querySelector("#video");

      const playVideo = async () => {
        try {
          video.currentTime = 0;
          await video.play();

          const mesh = videoPlane.getObject3D("mesh");
          if (mesh?.material?.map) {
            mesh.material.map.needsUpdate = true;
          }
        } catch (e) {
          console.error(e);
        }
      };

      const pauseVideo = () => {
        video.pause();
      };

      target.addEventListener("targetFound", playVideo);
      target.addEventListener("targetLost", pauseVideo);

      return () => {
        target.removeEventListener("targetFound", playVideo);
        target.removeEventListener("targetLost", pauseVideo);
      };
    };

    const cleanupPromise = init();

    return () => {
      mounted = false;

      cleanupPromise.then((cleanup) => {
        if (cleanup) cleanup();
      });

      const system = sceneRef.current?.systems["mindar-image-system"];
      if (system?.started) {
        system.stop();
      }
    };
  }, [onTap]);

  return (
    <div>
        <div className="header-container-mindar">
        <LogoHeader/>
        <HelpPopUpBtn className="help-btn-mindar" onClick={() => setShowPopUp(true)}/>
        {showPopUp && 
        <LearnMorePopUp 
          headerName={"Como interagir na experiência?"}
          onClose={() => setShowPopUp(false)}
          imgSrc="/images/terreiropaco.webp"
          description="
          Aponte a câmara ao quadro demonstrado acima, de modo a conhecer em maior detalhe a obra, através de uma experiência audiovisual."/>
          }
      </div>
    
    <a-scene
      ref={sceneRef}
      mindar-image={`imageTargetSrc: /markers/terreiro-paco-target.mind; autoStart: false; uiLoading: no; uiError: no; uiScanning: no;`}
      color-space="sRGB"
      embedded
      renderer="colorManagement: true; physicallyCorrectLights: true"
      vr-mode-ui="enabled: false"
      device-orientation-permission-ui="enabled: false"
    >
      <a-assets>
        <video
          id="videoAsset"
          src="/videos/terreiro-video.mp4"
          preload="auto"
          muted
          playsInline
          webkit-playsinline="true"
          crossOrigin="anonymous"
        />
      </a-assets>

      <a-camera position="0 0 0" look-controls="enabled: false" />

      <a-entity mindar-image-target="targetIndex: 0">
        <a-video
          id="video"
          src="#videoAsset"
          position="0 0 0.15"
          width="1.5"
          height="1"
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