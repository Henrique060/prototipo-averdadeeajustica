// mindar-viewer.jsx
import React, { useEffect, useRef } from "react";

export default function MindARViewer({ targetSrc }) {
  const containerRef = useRef(null);

  useEffect(() => {
    let sceneEl = null;
    let targetEntity = null;
    let arSystem = null;

    const container = containerRef.current;
    if (!container) return;

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
        <a-camera position="0 0 0" look-controls="enabled:false"></a-camera>

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
      console.error("Failed to create A-Frame scene");
      return;
    }

    const onTargetFound = () => {
      console.log("🎯 TARGET FOUND");
    };

    const onTargetLost = () => {
      console.log("❌ TARGET LOST");
    };

    const onSceneLoaded = () => {
      console.log("✅ Scene loaded");

      arSystem = sceneEl.systems?.["mindar-image-system"];

      if (!arSystem) {
        console.error("❌ MindAR system not found");
        return;
      }

      console.log("✅ MindAR system initialized");

      targetEntity = sceneEl.querySelector("[mindar-image-target]");

      if (!targetEntity) {
        console.error("❌ Target entity not found");
        return;
      }

      targetEntity.addEventListener("targetFound", onTargetFound);
      targetEntity.addEventListener("targetLost", onTargetLost);

      console.log("✅ Target listeners attached");
    };

    if (sceneEl.hasLoaded) {
      onSceneLoaded();
    } else {
      sceneEl.addEventListener("loaded", onSceneLoaded, { once: true });
    }

    return () => {
      try {
        if (targetEntity) {
          targetEntity.removeEventListener("targetFound", onTargetFound);
          targetEntity.removeEventListener("targetLost", onTargetLost);
        }

        if (arSystem && typeof arSystem.stop === "function") {
          arSystem.stop();
        }

        if (container) {
          container.innerHTML = "";
        }
      } catch (err) {
        console.error("Cleanup error:", err);
      }
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