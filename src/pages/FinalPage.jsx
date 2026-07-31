import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import LogoHeader from '../components/LogoHeader';
import LearnMorePopUp from '../components/LearnMorePopUp';
import { IoArrowBackOutline } from "react-icons/io5";
import '@google/model-viewer'; // Add this line!
import './FinalPage.css';
import { useNavigate } from 'react-router-dom';

const handleNextButton = () => {
    return
}

function FinalPage () {
    let navigate = useNavigate();
    return (
     <div className="page-wrapper">
      <LogoHeader />
        <div className="quadro-container">
            <div className="title-wrapper">
                <div className="title-btn-wrapper">
                    <button className="title-btn-back-btn" onClick={() => window.history.back()}>
                        <IoArrowBackOutline />
                    </button>
                    <PageHeader title={"Monumento à Justiça"} />
                </div>
    
                    <div className="model-viewer-div">
                        <model-viewer src="/models/monumentoajustica.glb" shadow-intensity="1" ar 
                        ar-modes="scene-viewer quick-look"touch-action="pan-y">
                            <br />
                            <button className="mv-ar-btn" slot="ar-button">
                                Coloque no jardim
                            </button>
                            <br />
                        </model-viewer>
                    </div>

                    <p className="experience-title-question">Monumento à Justiça finalizado!</p>
                    <p className="experiencie-list-text">
                    Veja como ficou o seu monumento. O monumento é o resultado das suas convicções sobre a Justiça.
                    </p>
                    <br/>
                    <p className="experiencie-list-text">
                    Dentro do monumento está uma mesa, coloque o objeto, dentro dos presentes, que acha que mais apropriado estar em cima da mesma.
                    </p>
                    
            </div>
        </div>
        <div className="quadro-container-button-wrapper">
          {/* Replaced old local state button logic with navigation trigger */}
          <button className="final-container-button"onClick={() => navigate("/thesis-project-page")}>Terminar Visita</button>
        </div>
    </div>
    );
}

export default FinalPage;