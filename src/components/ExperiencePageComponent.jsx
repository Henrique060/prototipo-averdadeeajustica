import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Add this
import LogoHeader from './LogoHeader';
import NavBarExperience from './NavBarExperience_1';
import StartButton from './StartButton';
import './ExperiencePageComponent.css';
import NavBarExperience_2 from './NavBarExperience_2';
import MapPopUpBtn from './MapPopUpBtn';
import MapPopUp from './MapPopUp';
import { IoArrowBackOutline } from "react-icons/io5";

// NOTE: MindARViewer import is removed from here since it's moved to the new page!

function ExperiencePageComponent({ imageSrc, imageAlt, titleMain, titleSide, description, buttonLabel, mapImgSrc }) {
  const [showPopUp, setShowPopUp] = useState(false);
  const navigate = useNavigate(); // Add hook instance

  const handleStartExperience = () => {
    navigate('/ar-experience', {
      state: {
        targetSrc: "/markers/terreiro-militar-marker.mind",
        assets: [
          { id: "card", type: "img", src: "/images/jardim.webp" },
        ],
        entities: [
          {
            type: "plane",
            src: "#card",
            position: "0 0 0",
            height: "0.552",
            width: "1",
          }
        ]
      }
    });
  };

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
            <button className="title-btn-back-btn" onClick={() => window.history.back()}>
              <IoArrowBackOutline />
            </button>
            <p className="title-side">{titleSide}</p>
          </div>
          <p className="title-main">{titleMain}</p>
        </div>
        
        <img className="quadro-container-img" src={imageSrc} alt={imageAlt} />
        
        <div className="quadro-container-text-wrapper">
          <p className="quadro-container-text">{description}</p>
        </div>
        
        <div className="quadro-container-button-wrapper">
          {/* Replaced old local state button logic with navigation trigger */}
          <button onClick={handleStartExperience}>{buttonLabel}</button>
        </div>
      </div>
      <NavBarExperience_2 />
    </div>
  );
}

export default ExperiencePageComponent;