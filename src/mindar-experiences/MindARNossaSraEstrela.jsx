import React, { useEffect, useRef, useState } from 'react';

import LearnMorePopUp from '../components/LearnMorePopUp';

import HelpPopUpBtn from '../components/HelpPopUpBtn';

import LogoHeader from '../components/LogoHeader';

import { useMindARLifecycle } from '../hooks/UseMindARLifecycle';

import './MindAR.css';



export default function MindARNossaSraEstrela({ onTap }) {

const sceneRef = useRef(null);

const [showPopUp, setShowPopUp] = useState(true);



useMindARLifecycle(sceneRef);



useEffect(() => {

let isMounted = true;



const loadScripts = async () => {

await loadScript('https://aframe.io/releases/1.5.0/aframe.min.js');

await loadScript('https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-image-aframe.prod.js');

// LOAD TROIKA TEXT COMPONENT HERE

await loadScript('https://unpkg.com/aframe-troika-text/dist/aframe-troika-text.min.js');



if (!isMounted) return;



const sceneEl = sceneRef.current;

if (!sceneEl) return;



const startAR = () => {

const arSystem = sceneEl.systems["mindar-image-system"];

if (arSystem && !arSystem.started) {

arSystem.start();

}

};



if (sceneEl.hasLoaded || sceneEl.renderStarted) {

startAR();

} else {

sceneEl.addEventListener('renderstart', startAR);

}



if (onTap) {

sceneEl.addEventListener('click', onTap);

}

};



loadScripts();



return () => {

isMounted = false;

const arSystem = sceneRef.current?.systems["mindar-image-system"];

if (arSystem?.started) {

arSystem.stop();

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

imgSrc="/images/sala23.webp"

description="

Procure o quadro de Nª Srª da Estrela, apontando a câmara para o mesmo.

Conseguirá ver em detalhe a mensagem transmitida nesta obra."/>

}

</div>


<a-scene

ref={sceneRef}

mindar-image={`imageTargetSrc: ${"/markers/estrela.mind"}; autoStart: false; uiLoading: no; uiError: no; uiScanning: no;`}

color-space="sRGB"

embedded

renderer="colorManagement: true, physicallyCorrectLights"

vr-mode-ui="enabled: false"

device-orientation-permission-ui="enabled: false"

>



<a-assets>

<img id="nsraestrela" src="/images/nsraestrela.webp"></img>

</a-assets>

<a-camera position="0 0 0" look-controls="enabled: false"></a-camera>



<a-entity mindar-image-target="targetIndex:0">

<a-plane src="#nsraestrela"

position="0 1 0.05"

width="2"

height="3"

></a-plane>

</a-entity>

</a-scene>

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