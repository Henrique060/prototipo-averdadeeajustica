import React from 'react';
import {useState} from 'react';
import LogoHeader from './LogoHeader';
import NavBarExperience from './NavBarExperience_1';
import StartButton from './StartButton';
import './ExperiencePageComponent.css';
import NavBarExperience_2 from './NavBarExperience_2';
import MapPopUpBtn from './MapPopUpBtn';
import MapPopUp from './MapPopUp';
import { IoArrowBackOutline } from "react-icons/io5";

import MindARViewer from '../mindar-viewer';

function ExperiencePageComponent({ imageSrc, imageAlt, titleMain, titleSide, description, buttonTo, buttonLabel, mapImgSrc }) {
  //for pop up handling
  const [showPopUp, setShowPopUp] = useState(false);
  const [started, setStarted] = useState(null);

  return (
    <div className="page-wrapper">
      <div className="header-container">
        <LogoHeader />
        <MapPopUpBtn text="Salas" onClick={() => setShowPopUp(true)} />
        {showPopUp && (
        <MapPopUp
          headerName="Mapa de Salas"
          onClose={() => setShowPopUp(false)}
          imgSrc={mapImgSrc}
        />
        )}
      </div>
      
      <div className="quadro-container">
          <div className="title-wrapper">
            <div className="title-btn-wrapper">
              <button className="title-btn-back-btn" onClick={() => window.history.back()}><IoArrowBackOutline /></button>
              <p className="title-side">{titleSide}</p>
            </div>
            <p className="title-main">{titleMain}</p>
          </div>
        <img className="quadro-container-img" src={imageSrc} alt={imageAlt} />
        <div className="quadro-container-text-wrapper">
          <p className="quadro-container-text">{description}</p>
        </div>
        <div className="quadro-container-button-wrapper">
          {started === null && <button onClick={() => {setStarted('aframe')}}>{buttonLabel}</button>}
          {started !== null && <button onClick={() => {setStarted(null)}}>Stop</button>}
        </div>
        {started === 'aframe' && (
          <div className="container">
            <MindARViewer targetSrc="/markers/terreiro-militar-marker.mind" />
            
          </div>
        )}
      </div>
      <NavBarExperience_2 />
    </div>
  );
}

export default ExperiencePageComponent;