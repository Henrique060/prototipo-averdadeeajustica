import { useEffect } from "react";

export function useMindARLifecycle(sceneRef) { //hooks para remover o MindAR e impedir stacking
  useEffect(() => {
    return () => {
      const sceneEl = sceneRef.current;
      const arSystem = sceneEl?.systems?.["mindar-image-system"];
      if (arSystem) {
        if (arSystem.started) arSystem.stop();
        const mindVideo = arSystem.video;
        if (mindVideo?.srcObject) {
          mindVideo.srcObject.getTracks().forEach(t => t.stop());
        }
      }
      if (sceneEl?.renderer) {
        sceneEl.renderer.dispose();
        sceneEl.renderer.forceContextLoss();
      }
      document
        .querySelectorAll('video.mindar-video, canvas.mindar-canvas')
        .forEach(el => el.remove());
      if (sceneEl?.parentNode) sceneEl.parentNode.removeChild(sceneEl);
    };
  }, [sceneRef]);
}