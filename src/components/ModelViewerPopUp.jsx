'use client';

import React, { useEffect, useState } from "react";
import './ModelViewerPopUp.css';

function ModelViewerPopUp({ headerName, onClose, onProceed, modelViewerSrc, description, poster=null, arButtonEnabled = true, continueFlag = true, paragraph="Aguarde que o modelo 3D acima acabe de carregar antes de entrar na experiência"}) {
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
        <div className="mv-overlay" onClick={onClose}>
            <div className="mv-popup" onClick={(e) => e.stopPropagation()}>
                <div className="mv-header">
                    <h2>{headerName}</h2>
                    <button className="pop-up-close-btn" onClick={onClose}>Fechar</button>
                </div>
                <div className="mv-viewer-wrapper">
                    {scriptLoaded ? (
                        <model-viewer
                            src={modelViewerSrc}
                            shadow-intensity="1"
                            camera-controls
                            touch-action="pan-y"
                            ar
                            ar-modes="scene-viewer quick-look"
                            poster={poster}
                        >
                        
                        {arButtonEnabled && (
                            <button className="mv-ar-btn" slot="ar-button">
                                Entre na experiência
                            </button>
                        )}
                            
                        </model-viewer>
                    ) : (
                        <div className="mv-loading">
                            <p>Carregando...</p>
                        </div>
                    )}
                </div>
                {description && (
                    <p className="mv-description">{description}</p>
                )}

                <p className="mv-description">
                    {paragraph}
                </p>

                {/* NEW: Button to proceed to the next form / page */}
                <div className="mv-footer" style={{ marginTop: '20px', textAlign: 'center' }}>
                    {continueFlag && <button 
                        className="mv-proceed-btn" 
                        onClick={onProceed}
                        style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#E4D7C4', color: '#000' }}
                    >
                        Sim, pretendo continuar
                    </button>}
                    
                </div>
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