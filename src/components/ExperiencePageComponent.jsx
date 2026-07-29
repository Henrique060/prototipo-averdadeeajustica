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


function ExperiencePageComponent({ imageSrc, imageAlt, titleMain, titleSide, description, buttonLabel, mapImgSrc, experienceId,
  noMindARJS = false, navigateRoute = null
}) {
  const [showPopUp, setShowPopUp] = useState(false);
  const navigate = useNavigate(); // hook instance

  
  //Navegação nas Routes para back btn
  let inactiveColor = "#A0A0A0";
  let btnActiveColor = "#003C72";
  const routes = ["/escadaria", "/quadro-terreiro-paco-2", "/quadro-terreiro-paco", "/figura-convite", 
                  "/djoao", "/fonte-agua", "/quadro-escombros", "/terramoto", "/gravura-marques", "/musicos",
                  "/lenco-saudade", "/o-retorno", "/busto-republica",
                  "/soberania", "/jardim"
  ];
  const currentIndex = routes.findIndex(r => location.pathname.endsWith(r));
  const goBack = () => { //navegar back nas routes para back btn
    if (currentIndex > 0) {
      navigate(routes[currentIndex - 1]);
    }
  };

  //Para conseguir identificar a experiência AR
  const handleStartExperience = () => {
    navigate('/ar-experience', {
      state: {
        experienceId: experienceId
      }
    });
  };

  const handleStartChromaKeyExperience = () => {
    navigate('/chroma-page');
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
            <button className="title-btn-back-btn"
                    onClick={goBack}
                    style={{color:currentIndex === 0? inactiveColor:btnActiveColor }}>
              <IoArrowBackOutline />
            </button>
            <p className="title-side">{titleSide}</p>
          </div>
          <p className="title-main">{titleMain}</p>
        </div>
        
        <div className="quadro-container-img-wrapper">
          <img className="quadro-container-img" src={imageSrc} alt={imageAlt} />
        </div>
        
        
        <div className="quadro-container-text-wrapper">
          <p className="quadro-container-text">{description}</p>
        </div>
        
          {/* Replaced old local state button logic with navigation trigger */}
          {!noMindARJS ? (
            <div className="quadro-container-button-wrapper">
              <button className="quadro-container-button"onClick={handleStartExperience}>{buttonLabel}</button>
            </div>
          ) : (
            <div className="quadro-container-button-wrapper">
              <button className="quadro-container-button" onClick={() => navigate(navigateRoute)}>Escolher Experiência</button>
            </div>
          )}
          
      </div>
      <NavBarExperience_2 />
    </div>
  );
}

export default ExperiencePageComponent;