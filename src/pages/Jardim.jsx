import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Add this
import LogoHeader from '../components/LogoHeader.jsx';
import NavBarExperience_2 from '../components/NavBarExperience_2.jsx';
import MapPopUp from '../components/MapPopUp.jsx';
import MapPopUpBtn from '../components/MapPopUpBtn.jsx';
import { IoArrowBackOutline } from "react-icons/io5";

function Jardim() {
  const [showPopUp, setShowPopUp] = useState(false);
  const navigate = useNavigate(); // Add hook instance

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
            <p className="title-side">{"Jardim"}</p>
          </div>
          <p className="title-main">{"Lisboa no Jardim"}</p>
        </div>
        
        <img className="quadro-container-img" src="/images/jardim.webp" alt={"Jardim"} />
        
        <div className="quadro-container-text-wrapper">
          <p className="quadro-container-text">{"Lorem Ipsum"}</p>
        </div>
        
        <div className="quadro-container-button-wrapper">
          {/* Replaced old local state button logic with navigation trigger */}
          <button className="quadro-container-button" onClick={() => navigate("/")} >{"Monumento à Justiça"}</button>
          <button className="quadro-container-button" onClick={() => navigate("/catalogo")}>{"Catálogo"}</button>
        </div>
      </div>
      <NavBarExperience_2 />
    </div>
    
  );
}

export default Jardim;