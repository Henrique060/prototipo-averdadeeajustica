'use client';

import React, { useEffect, useState } from "react";
import './ModelViewerPopUp.css';

function ModelViewerPopUp({ headerName, onClose, modelViewerSrc, description }) {
    const [scriptLoaded, setScriptLoaded] = useState(false);

    useEffect(() => {
        let cancelled = false;
        loadScript('https://ajax.googleapis.com/ajax/libs/model-viewer/4.3.1/model-viewer.min.js')
            .then(() => {
                if (!cancelled) setScriptLoaded(true);
            });
        return () => { cancelled = true; };
    }, []);

    return (
        <div className="pop-up-overlay" onClick={onClose}>
            <div className="pop-up" onClick={(e) => e.stopPropagation()}>
                <div className="pop-up-header">
                    <h2>{headerName}</h2>
                    <button className="pop-up-close-btn" onClick={onClose}>Fechar</button>
                </div>
                <div className="learn-more-pop-up-content-img-div">
                    {scriptLoaded ? (
                        <model-viewer
                            src={modelViewerSrc}
                            shadow-intensity="1"
                            camera-controls
                            touch-action="pan-y"
                            ar
                            camera-orbit="0deg 90deg 4m"
                        ></model-viewer>
                    ) : (
                        <p>Carregando...</p>
                        
                    )}
                </div>
                <button className="model-viewer-start-ar-btn" slot="ar-button">
            Entre na experiência
            </button>
            </div>
        </div>
    );
}

export default ModelViewerPopUp;

function loadScript(src) {
    return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
            resolve();
            return;
        }
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}