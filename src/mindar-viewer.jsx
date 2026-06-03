import React, { useEffect, useRef } from "react";

export default function MindARViewer({ targetSrc }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let sceneEl;
    let targetEntity;
    let arSystem;

    const onTargetFound = () => {
      console.log("🎯 TARGET FOUND");
    };

    const onTargetLost = () => {
      console.log("❌ TARGET LOST");
    };

    const onARReady = () => {
      console.log("🚀 AR READY");
    };

    const onARError = (e) => {
      console.error("💥 AR ERROR", e);
    };

    container.innerHTML = `
      <a-scene
        mindar-image="imageTargetSrc: ${targetSrc}; uiLoading: yes; uiError: yes; uiScanning: yes"
        embedded
        color-space="sRGB"
        renderer="colorManagement: true; physicallyCorrectLights: true"
        vr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: false"
        style="width:100%;height:100%;position:absolute;top:0;left:0;"
      >
        <a-camera active="false" position="0 0 0"></a-camera>

        <a-entity mindar-image-target="targetIndex: 0">
          <a-box
            position="0 0 0"
            width="0.5"
            height="0.5"
            depth="0.5"
            color="red"
          ></a-box>
        </a-entity>
      </a-scene>
    `;

    sceneEl = container.querySelector("a-scene");

    if (!sceneEl) {
      console.error("❌ Failed to create scene");
      return;
    }

    sceneEl.addEventListener("arReady", onARReady);
    sceneEl.addEventListener("arError", onARError);

    const onSceneLoaded = () => {
      console.log("✅ Scene loaded");

      arSystem = sceneEl.systems?.["mindar-image-system"];

      if (!arSystem) {
        console.error("❌ MindAR system missing");
        return;
      }

      console.log("✅ MindAR system initialized");
      console.log("MindAR system:", arSystem);

      targetEntity = sceneEl.querySelector("[mindar-image-target]");

      if (!targetEntity) {
        console.error("❌ Target entity missing");
        return;
      }

      targetEntity.addEventListener("targetFound", onTargetFound);
      targetEntity.addEventListener("targetLost", onTargetLost);

      console.log("✅ Target listeners attached");

      setTimeout(() => {
        console.log("========== MINDAR DEBUG ==========");
        console.log("Target source:", targetSrc);
        console.log("System:", arSystem);
        console.log("Video:", arSystem.video);
        console.log("Controller:", arSystem.controller);
        console.log("Scene:", sceneEl);
        console.log("=================================");
      }, 5000);
    };

    if (sceneEl.hasLoaded) {
      onSceneLoaded();
    } else {
      sceneEl.addEventListener("loaded", onSceneLoaded, { once: true });
    }

    return () => {
      if (targetEntity) {
        targetEntity.removeEventListener("targetFound", onTargetFound);
        targetEntity.removeEventListener("targetLost", onTargetLost);
      }

      if (sceneEl) {
        sceneEl.removeEventListener("arReady", onARReady);
        sceneEl.removeEventListener("arError", onARError);
      }

      if (arSystem?.stop) {
        arSystem.stop();
      }

      container.innerHTML = "";
    };
  }, [targetSrc]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    />
  );
}