import React, { useEffect, useRef } from 'react';

export default function ChromaKeyVideo({
  src = null,
  camera = false,
  facingMode = 'environment',
  keyColor = { r: 0, g: 177, b: 64 },
  keyColor2 = null,
  tolerance = 80,
  tolerance2 = null,
  width = 640,
  height = 360,
  style = {},
}) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    let running = true;

    function colorDist(data, i, color) {
      const dr = data[i] - color.r;
      const dg = data[i + 1] - color.g;
      const db = data[i + 2] - color.b;
      return Math.sqrt(dr * dr + dg * dg + db * db);
    }

    function resizeCanvasToDisplaySize() {
      const rect = canvas.getBoundingClientRect();

      const dpr = window.devicePixelRatio || 1;

      const displayWidth = Math.round(rect.width * dpr);
      const displayHeight = Math.round(rect.height * dpr);

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
      }

      return { displayWidth, displayHeight };
    }

    function processFrame() {
      if (!running) return;
      if (video.readyState < 2) {
        rafRef.current = requestAnimationFrame(processFrame);
        return;
      }

      const { displayWidth, displayHeight } = resizeCanvasToDisplaySize();

      ctx.drawImage(video, 0, 0, displayWidth, displayHeight);

      const frame = ctx.getImageData(0, 0, displayWidth, displayHeight);
      const data = frame.data;

      const tol2 = tolerance2 ?? tolerance;

      // OPTIMIZATION: cache loop length
      const len = data.length;

      for (let i = 0; i < len; i += 4) {
        const match1 = colorDist(data, i, keyColor) < tolerance;
        const match2 =
          keyColor2 && colorDist(data, i, keyColor2) < tol2;

        if (match1 || match2) {
          data[i + 3] = 0;
        }
      }

      ctx.putImageData(frame, 0, 0);

      rafRef.current = requestAnimationFrame(processFrame);
    }

    async function init() {
      if (camera) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: {
              facingMode,
              width: { ideal: width },
              height: { ideal: height },
            },
            audio: false,
          });

          streamRef.current = stream;
          video.srcObject = stream;
          await video.play();
        } catch (err) {
          console.error('Camera error:', err);
          return;
        }
      } else if (src) {
        video.src = src;
        video.crossOrigin = 'anonymous';
        video.loop = true;
        video.muted = true;
        await video.play();
      }

      rafRef.current = requestAnimationFrame(processFrame);
    }

    init();

    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);

      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
      }
    };
  }, [camera, src, facingMode, keyColor, keyColor2, tolerance, tolerance2, width, height]);

  return (
    <>
      <video
        ref={videoRef}
        style={{ display: 'none' }}
        playsInline
        muted
      />

      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          objectFit: 'contain',
          ...style,
        }}
      />
    </>
  );
}