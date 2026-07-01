import React, { useState } from 'react';
import LogoHeader from '../components/LogoHeader.jsx';
import NavBarExperience_2 from '../components/NavBarExperience_2.jsx';
import MapPopUp from '../components/MapPopUp.jsx';
import MapPopUpBtn from '../components/MapPopUpBtn.jsx';
import { IoArrowBackOutline } from "react-icons/io5";
import PopUp from '../components/PopUp.jsx';

function Jardim() {
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [popupData, setPopupData] = useState(null);
  const [showPopUp, setShowPopUp] = useState(false);

  const mapImgSrc = "/images/mapa.webp";

  const experiencePopup = {
    headerName: 'Experiências no Jardim',
    listOfItems: [
      'Monumento à J-u-s-t-i-ç-a',
      'Outras Experiências',
    ],
    listOfURLs: [
      '/monumento',
      '/catalogo',
    ],
  };

  const handleExperienceClick = () => {
    setPopupData(experiencePopup);
    setIsPopUpVisible(true);
  };

  return (
    <div className="page-wrapper">
      <div className="header-container">
        <LogoHeader />

        <MapPopUpBtn
          text="Salas"
          onClick={() => setShowPopUp(true)}
        />

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
            <button
              className="title-btn-back-btn"
              onClick={() => window.history.back()}
            >
              <IoArrowBackOutline />
            </button>

            <p className="title-side">Jardim</p>
          </div>

          <p className="title-main">Lisboa no Jardim</p>
        </div>

        <div className="quadro-container-img-wrapper">
          <img
            className="quadro-container-img"
            src="/images/jardim.webp"
            alt="Jardim"
          />
        </div>
        

        <div className="quadro-container-text-wrapper">
          <p className="quadro-container-text">
            Texto que irá descrever a alegoria e experiência desejada.
        Deverá também este texto descrever ligeiramente o que se quer que o user faça.
        Mais informações sobre a experiência podem ser adicionadas aqui - falar com equipa.
          </p>
        </div>

        <div className="quadro-container-button-wrapper">
          <button
            className="quadro-container-button"
            onClick={handleExperienceClick}
          >
            Selecionar Experiência
          </button>
        </div>
      </div>

      <NavBarExperience_2 />

      {isPopUpVisible && popupData && (
        <PopUp
          {...popupData}
          onClose={() => {
            setIsPopUpVisible(false);
            setPopupData(null);
          }}
        />
      )}
    </div>
  );
}

export default Jardim;