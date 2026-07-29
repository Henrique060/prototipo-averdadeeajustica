import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import LogoHeader from '../components/LogoHeader';
import LearnMorePopUp from '../components/LearnMorePopUp';
import { IoArrowBackOutline } from "react-icons/io5";
import '@google/model-viewer'; // Add this line!
import './Monumento.css';
import { useNavigate } from 'react-router-dom';

const handleNextButton = () => {
    return
}

function Monumento () {
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
                        <model-viewer src="/models/monumentoajustica.glb" shadow-intensity="1" auto-rotate></model-viewer>
                    </div>

                    <p className="experience-title-question">E se pudesse criar um Monumento à Justiça?</p>
                    <p className="experiencie-list-text">
                        Esse monumento, um espaço simbólico que pode ser “habitado” tem como objetivo representar a uma visão particular do conceito de Justiça. 
                        Esta construção parte de uma estrutura, pois a nossa visão da Justiça é desde já uma construção cultural que adquirimos ao longo dos anos da qual adaptamos e fazemos “nossa” à “nossa” maneira.
                        Escolha a resposta que mais se aproxima das suas ideias sobre o que deveria ser o conceito de Justiça e a relação do mesmo com a realidade.
                    </p>
            </div>
        </div>
        <div className="quadro-container-button-wrapper">
          {/* Replaced old local state button logic with navigation trigger */}
          <button className="quadro-container-button"onClick={() => navigate("/monumento-questionario")}>Vamos começar?</button>
        </div>
    </div>
    );
}

export default Monumento;