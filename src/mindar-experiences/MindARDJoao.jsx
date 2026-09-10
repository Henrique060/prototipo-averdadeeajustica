import React, { useEffect, useRef, useState } from 'react';
import LearnMorePopUp from '../components/LearnMorePopUp';
import HelpPopUpBtn from '../components/HelpPopUpBtn';
import LogoHeader from '../components/LogoHeader';
import { useMindARLifecycle } from '../hooks/UseMindARLifecycle';
import BackButton from '../components/BackButton';
import './MindAR.css';
 
export default function MindARDJoao({ onTap }) {
const sceneRef = useRef(null);
const cameraRef = useRef(null);
 
const [isExperienceOver, setExperienceOver] = useState(false);
 
const handleEnded = () => {
setExperienceOver(true);
};
 
const [counter, setCounter] = useState(8);
const reduceCounterOnTap = () => {
setCounter(counter => counter - 1)
}
 
const joia1Ref = useRef(null);
const joia2Ref = useRef(null);
const diamantes21Ref = useRef(null);
const diamantes2Ref = useRef(null);
const moedas1Ref = useRef(null);
const moedas2Ref = useRef(null);
const azeiteRef = useRef(null);
const copoRef = useRef(null);
 
const [showPopUp, setShowPopUp] = useState(true);
useMindARLifecycle(sceneRef);
 
const [modelsVisible, setModelsVisible] = useState(false);
const modelsVisibleRef = useRef(false);
const [textPhase, setTextPhase] = useState('hidden');
 
const collectedRef = useRef({
joia1: false,
joia2: false,
diamantes21: false,
diamantes2: false,
moedas1: false,
moedas2: false,
azeite: false,
copo: false,
});
const finalTextTriggered = useRef(false);
const [showFinalText, setShowFinalText] = useState(false);
 
useEffect(() => {
modelsVisibleRef.current = modelsVisible;
}, [modelsVisible]);
 
const hasRunSequence = useRef(false);
 
const runTextSequence = () => {
if (hasRunSequence.current) return;
hasRunSequence.current = true;
 
setTextPhase('text1-in');
 
setTimeout(() => {
setTextPhase('text1-out');
}, 7000);
 
setTimeout(() => {
setTextPhase('text2-in');
}, 8000);
 
setTimeout(() => {
setTextPhase('text2-out');
}, 17500);
 
setTimeout(() => {
setTextPhase('done');
setModelsVisible(true);
}, 20000);
};
 
const handleClosePopUp = () => {
setShowPopUp(false);
runTextSequence();
};
 
// 1. Separate Effect: Handle Tap listener additions cleanly without breaking the core system
useEffect(() => {
const sceneEl = sceneRef.current;
if (sceneEl && onTap) {
sceneEl.addEventListener('click', onTap);
return () => sceneEl.removeEventListener('click', onTap);
}
}, [onTap]);
 
// 2. Core Effect: Handles MindAR loading and Canvas lifecycle safely
useEffect(() => {
let canvasEl = null;
 
const handleInteraction = (clientX, clientY) => {
if (!modelsVisibleRef.current) return;
if (!sceneRef.current || !cameraRef.current) return;
 
const canvas = sceneRef.current.canvas;
if (!canvas) return;
 
const rect = canvas.getBoundingClientRect();
 
const ndc = new window.THREE.Vector2(
((clientX - rect.left) / rect.width) * 2 - 1,
-((clientY - rect.top) / rect.height) * 2 + 1
);
 
const threeCamera = cameraRef.current.getObject3D('camera');
const raycaster = new window.THREE.Raycaster();
raycaster.setFromCamera(ndc, threeCamera);
 
const meshesJoia1 = [];
const meshesJoia2 = [];
const meshesDiamantes21 = [];
const meshesDiamantes2 = [];
const meshesMoedas1 = [];
const meshesMoedas2 = [];
const meshesAzeite = [];
const meshesCopo = [];
 
if (joia1Ref.current?.object3D) {
joia1Ref.current.object3D.traverse(obj => { if (obj.isMesh) meshesJoia1.push(obj); });
}
if (joia2Ref.current?.object3D) {
joia2Ref.current.object3D.traverse(obj => { if (obj.isMesh) meshesJoia2.push(obj); });
}
if (diamantes21Ref.current?.object3D) {
diamantes21Ref.current.object3D.traverse(obj => { if (obj.isMesh) meshesDiamantes21.push(obj); });
}
if (diamantes2Ref.current?.object3D) {
diamantes2Ref.current.object3D.traverse(obj => { if (obj.isMesh) meshesDiamantes2.push(obj); });
}
if (moedas1Ref.current?.object3D) {
moedas1Ref.current.object3D.traverse(obj => { if (obj.isMesh) meshesMoedas1.push(obj); });
}
if (moedas2Ref.current?.object3D) {
moedas2Ref.current.object3D.traverse(obj => { if (obj.isMesh) meshesMoedas2.push(obj); });
}
if (azeiteRef.current?.object3D) {
azeiteRef.current.object3D.traverse(obj => { if (obj.isMesh) meshesAzeite.push(obj); });
}
if (copoRef.current?.object3D) {
copoRef.current.object3D.traverse(obj => { if (obj.isMesh) meshesCopo.push(obj); });
}
 
const hitsJoia1 = raycaster.intersectObjects(meshesJoia1, false);
const hitsJoia2 = raycaster.intersectObjects(meshesJoia2, false);
const hitsDiamantes21 = raycaster.intersectObjects(meshesDiamantes21, false);
const hitsDiamantes2 = raycaster.intersectObjects(meshesDiamantes2, false);
const hitsMoedas1 = raycaster.intersectObjects(meshesMoedas1, false);
const hitsMoedas2 = raycaster.intersectObjects(meshesMoedas2, false);
const hitsAzeite = raycaster.intersectObjects(meshesAzeite, false);
const hitsCopo = raycaster.intersectObjects(meshesCopo, false);
 
const animProps = { property: 'position', to: '0 0.425 0', dur: 1000, easing: 'easeInOutQuad' };
 
if (hitsJoia1.length > 0 && joia1Ref.current && !collectedRef.current.joia1) {
joia1Ref.current.setAttribute('animation', animProps);
collectedRef.current.joia1 = true;
reduceCounterOnTap();
}
if (hitsJoia2.length > 0 && joia2Ref.current && !collectedRef.current.joia2) {
joia2Ref.current.setAttribute('animation', animProps);
collectedRef.current.joia2 = true; // Fixed
reduceCounterOnTap();
}
if (hitsDiamantes21.length > 0 && diamantes21Ref.current && !collectedRef.current.diamantes21) {
diamantes21Ref.current.setAttribute('animation', animProps);
collectedRef.current.diamantes21 = true; // Fixed
reduceCounterOnTap();
}
if (hitsDiamantes2.length > 0 && diamantes2Ref.current && !collectedRef.current.diamantes2) {
diamantes2Ref.current.setAttribute('animation', animProps);
collectedRef.current.diamantes2 = true; // Fixed
reduceCounterOnTap();
}
if (hitsMoedas1.length > 0 && moedas1Ref.current && !collectedRef.current.moedas1) {
moedas1Ref.current.setAttribute('animation', animProps);
collectedRef.current.moedas1 = true; // Fixed
reduceCounterOnTap();
}
if (hitsMoedas2.length > 0 && moedas2Ref.current && !collectedRef.current.moedas2) {
moedas2Ref.current.setAttribute('animation', animProps);
collectedRef.current.moedas2 = true; // Fixed
reduceCounterOnTap();
}
if (hitsAzeite.length > 0 && azeiteRef.current && !collectedRef.current.azeite) {
azeiteRef.current.setAttribute('animation', animProps);
collectedRef.current.azeite = true; // Fixed
reduceCounterOnTap();
}
if (hitsCopo.length > 0 && copoRef.current && !collectedRef.current.copo) {
copoRef.current.setAttribute('animation', animProps);
collectedRef.current.copo = true; // Fixed
reduceCounterOnTap();
}
 
const { joia1, joia2, diamantes21, diamantes2, moedas1, moedas2, azeite, copo } = collectedRef.current;
 
if (joia1 && joia2 && diamantes21 && diamantes2 && moedas1 && moedas2 && azeite && copo && !finalTextTriggered.current) {
finalTextTriggered.current = true;
setTimeout(() => { setShowFinalText(true); setExperienceOver(true)}, 1000);
}
};
 
const onTouchStart = (e) => {
e.preventDefault();
const t = e.touches[0];
handleInteraction(t.clientX, t.clientY);
};
 
const onClick = (e) => {
handleInteraction(e.clientX, e.clientY);
};
 
const loadScripts = async () => {
await loadScript('https://aframe.io/releases/1.5.0/aframe.min.js');
await loadScript('https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-image-aframe.prod.js');
 
const sceneEl = sceneRef.current;
if (!sceneEl) return;
 
const setupCanvasEvents = () => {
canvasEl = sceneEl.canvas;
if (canvasEl) {
canvasEl.addEventListener('touchstart', onTouchStart, { passive: false });
canvasEl.addEventListener('click', onClick);
}
};
 
const arSystem = sceneEl.systems["mindar-image-system"];
if (sceneEl.hasLoaded) {
arSystem.start();
setupCanvasEvents();
} else {
sceneEl.addEventListener('renderstart', () => {
arSystem.start();
setupCanvasEvents();
});
}
};
 
loadScripts();
 
return () => {
const arSystem = sceneRef.current?.systems["mindar-image-system"];
arSystem?.stop();
 
if (canvasEl) {
canvasEl.removeEventListener('touchstart', onTouchStart);
canvasEl.removeEventListener('click', onClick);
}
};
}, []); // Empty dependency array keeps it stable and stops camera feed crashes
 
const text1Opacity = textPhase === 'text1-in' ? 1 : 0;
const text2Opacity = textPhase === 'text2-in' ? 1 : 0;
const textVisible = textPhase !== 'hidden' && textPhase !== 'done';
 
//reset
 
const handleRestart = () => {
// 1. Reset React states
setCounter(8);
setExperienceOver(false);
setShowFinalText(false);
// 2. Reset tracking refs
finalTextTriggered.current = false;
collectedRef.current = {
joia1: false,
joia2: false,
diamantes21: false,
diamantes2: false,
moedas1: false,
moedas2: false,
azeite: false,
copo: false,
};
 
// 3. Helper to remove animation and reset position
const resetEntity = (ref, originalPosition) => {
if (ref.current) {
ref.current.removeAttribute('animation');
ref.current.setAttribute('position', originalPosition);
}
};
 
// 4. Apply original positions
resetEntity(joia1Ref, '0.2 0.1 0.01');
resetEntity(joia2Ref, '0.3 0.25 0.01');
resetEntity(diamantes21Ref, '-0.15 -0.25 0.01');
resetEntity(diamantes2Ref, '0.3 -0.2 0.01'); // (Fixed a typo here from 0-.2)
resetEntity(moedas1Ref, '0.2 -0.2 0.01');
resetEntity(moedas2Ref, '0 -0.25 0.01');
resetEntity(azeiteRef, '0.2 0 0.01');
resetEntity(copoRef, '-0.3 0 0.01');
};
 
return (
<div style={{ position: 'relative', width: '100%', height: '100%' }}>
<div className="header-container-mindar">
<BackButton />
<LogoHeader/>
<HelpPopUpBtn className="help-btn-mindar" onClick={() => setShowPopUp(true)}/>
{showPopUp &&
<LearnMorePopUp
headerName={"Como interagir na experiência?"}
onClose={handleClosePopUp}
imgSrc="/images/djoao.webp"
description="Procure pelo quadro de D. João V. Aponte a câmara e devolva a riqueza, ao famoso 'Magnânimo', tocando nos objetos que aparecem à sua volta."
/>
}
</div>
 
{!textVisible && (
<div className="counter-div">
<p className="counter-text">Itens em falta: {counter}</p>
</div>
)}
 
<a-scene
ref={sceneRef}
mindar-image={`imageTargetSrc: ${"/markers/dJoao-target.mind"}; autoStart: false; uiLoading: no; uiError: no; uiScanning: no;`}
color-space="sRGB"
embedded
renderer="colorManagement: true"
vr-mode-ui="enabled: false"
device-orientation-permission-ui="enabled: false"
>
<a-assets>
<a-asset-item id="joia1" src="/models/joia1.glb"></a-asset-item>
<a-asset-item id="joia2" src="/models/joia2.glb"></a-asset-item>
<a-asset-item id="diamantes21" src="/models/diamantes21.glb"></a-asset-item>
<a-asset-item id="diamantes2" src="/models/diamantes2.glb"></a-asset-item>
<a-asset-item id="moedas1" src="/models/moedas1.glb"></a-asset-item>
<a-asset-item id="moedas2" src="/models/moedas2.glb"></a-asset-item>
<a-asset-item id="azeite" src="/models/azeite.glb"></a-asset-item>
<a-asset-item id="copo" src="/models/copo.glb"></a-asset-item>
</a-assets>
 
<a-camera ref={cameraRef} position="0 0 0" look-controls="enabled: false"></a-camera>
 
<a-entity mindar-image-target="targetIndex:0">
<a-entity
ref={joia1Ref}
id="joia1-entity"
gltf-model="/models/joia1.glb"
scale={modelsVisible ? "1.1 1.1 1.1" : "0 0 0"}
rotation="180 90 90"
position="0.2 0.1 0.01"
></a-entity>
 
<a-entity
ref={joia2Ref}
id="joia2-entity"
gltf-model="/models/joia2.glb"
scale={modelsVisible ? "1.1 1.1 1.1" : "0 0 0"}
rotation="180 90 90"
position="0.3 0.25 0.01"
></a-entity>
 
<a-entity
ref={diamantes21Ref}
id="diamantes21-entity"
gltf-model="/models/diamantes21.glb"
scale={modelsVisible ? "1.1 1.1 1.1" : "0 0 0"}
rotation="180 90 90"
position="-0.3 0.25 0.01"
></a-entity>
 
<a-entity
ref={diamantes2Ref}
id="diamantes2-entity"
gltf-model="/models/diamantes2.glb"
scale={modelsVisible ? "1.1 1.1 1.1" : "0 0 0"}
rotation="180 90 90"
position="0.3 -0.2 0.01"
></a-entity>
 
<a-entity
ref={moedas1Ref}
id="moedas1-entity"
gltf-model="/models/moedas1.glb"
scale={modelsVisible ? "1.1 1.1 1.1" : "0 0 0"}
rotation="180 90 90"
position="0.2 -0.2 0.01"
></a-entity>
 
<a-entity
ref={moedas2Ref}
id="moedas2-entity"
gltf-model="/models/moedas2.glb"
scale={modelsVisible ? "1.1 1.1 1.1" : "0 0 0"}
rotation="180 90 90"
position="0 -0.25 0.01"
></a-entity>
 
<a-entity
ref={azeiteRef}
id="azeite-entity"
gltf-model="/models/azeite.glb"
scale={modelsVisible ? "1.1 1.1 1.1" : "0 0 0"}
rotation="180 90 90"
position="0.2 0 0.01"
></a-entity>
 
<a-entity
ref={copoRef}
id="copo-entity"
gltf-model="/models/copo.glb"
scale={modelsVisible ? "1.1 1.1 1.1" : "0 0 0"}
rotation="180 90 90"
position="-0.35 0.05 0.01"
></a-entity>
</a-entity>
</a-scene>
 
{textVisible && (
<div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 10 }}>
<p style={{ position: 'absolute', margin: 0, padding: '0 1.5rem', textAlign: 'center', fontFamily: "'Palatino Linotype', Georgia, serif", fontSize: 'clamp(2rem, 5vw, 2.5rem)', fontWeight:'600', fontStyle: 'italic', color: '#f5e9c8', textShadow: '0 2px 12px rgba(0,0,0,0.85)', opacity: text1Opacity, transition: 'opacity 1000ms ease-in-out', maxWidth: '80vw' }}>
Magnífico,
magnânimo.
Um braço que se vê
e o outro se esconde.
(Para que a Justiça ao Sólio real se incline;)
</p>
<p style={{ position: 'absolute', margin: 0, padding: '0 1.5rem', textAlign: 'center', fontFamily: "'Palatino Linotype', Georgia, serif", fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight:'600', fontStyle: 'italic', color: '#f0dfa8', textShadow: '0 2px 12px rgba(0,0,0,0.85)', opacity: text2Opacity, transition: 'opacity 1000ms ease-in-out', maxWidth: '80vw' }}>
Rei de grandes obras,
grande cultura...
(E a quem a Fama a Eternidade une)
O seu próprio bem consome:
e qual seria
o néctar que o sacia?
</p>
</div>
)}
 
{showFinalText && (
<div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 10 }}>
<p style={{ margin: 0, padding: '0 1.5rem', textAlign: 'center', fontFamily: "'Palatino Linotype', Georgia, serif", fontSize: 'clamp(2rem, 4.5vw, 2.5rem)', fontStyle: 'italic', color: '#f5e9c8', textShadow: '0 2px 12px rgba(0,0,0,0.85)', opacity: showFinalText ? 1 : 0, transition: 'opacity 900ms ease-in-out', maxWidth: '80vw' }}>
O Quinto do Ouro e dos Diamantes foi pago. Pode prosseguir...
</p>
</div>
)}
 
{isExperienceOver && (
<div className="video-overlay">
<button
onClick={
handleRestart
}
style={{
position: "absolute",
bottom: "20%",
left: "50%",
transform: "translateX(-50%)",
zIndex: 1000,
padding: "14px 28px",
border: "none",
borderRadius: "14px",
background: "#EA562E",
color: "#E4D7C4",
fontSize: "1rem",
fontWeight: 600,
cursor: "pointer",
boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
}}
>
Reiniciar Experiência
</button>
</div>
)}
 
 
</div>
);
}
 
function loadScript(src) {
return new Promise((resolve, reject) => {
if (document.querySelector(`script[src="${src}"]`)) {
resolve(); return;
}
const script = document.createElement('script');
script.src = src;
script.onload = resolve;
script.onerror = reject;
document.head.appendChild(script);
});
}