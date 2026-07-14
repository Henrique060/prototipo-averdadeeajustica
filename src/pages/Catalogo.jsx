import React, {useState} from "react";
import { Link } from 'react-router-dom';
import LogoHeader from "../components/LogoHeader";
import ModelViewerPopUp from "../components/ModelViewerPopUp";
import NavBarExperience_2 from "../components/NavBarExperience_2";
import PageHeader from "../components/PageHeader";
import { IoArrowBackOutline } from "react-icons/io5";
import './Catalogo.css';


const experiencias = [
  {
    sala: 'Terreiro do Paço',
    titulo: 'Portal para o Terreiro do Paço',
    image: '/images/arco-augusta.webp',
    popup: {
      headerName: 'Alegoria a Sebastião',
      modelViewerSrc: '/models/portalTerreiro.glb',

    },
  },

  {
    sala: 'Terreiro do Paço',
    titulo: 'Chafariz de Apolo',
    image: '/images/apolo.webp',
    popup: {
      headerName: 'Alegoria a Sebastião',
      modelViewerSrc: '/models/teatro-de-papel-beta3.glb',

    },
  },

  {
    sala: 'Alegoria a Sebastião',
    titulo: 'Teatro de Papel',
    image: '/images/teatro-papel.webp',
    popup: {
      headerName: 'Alegoria a Sebastião',
      modelViewerSrc: '/models/teatro-de-papel2.glb',

    },
  }

  
];

function Catalogo() {
    const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [popupData, setPopupData] = useState(null);

  const handleExperienceClick = (exp) => {
    // If this room has a popup
    if (exp.popup) {
      setPopupData(exp.popup);
      setIsPopUpVisible(true);
      return;
    }

    // Optional:
    // if later you want direct navigation for normal rooms
    if (exp.url) {
      window.location.href = exp.url;
    }
  };
  return (
    <div className="page-wrapper">
        <LogoHeader />
        <div className="quadro-container">
            <div className="title-wrapper">
                <div className="title-btn-wrapper">
                    <button className="title-btn-back-btn" onClick={() => window.history.back()}>
                        <IoArrowBackOutline />
                    </button>
                    <PageHeader title="Catálogo de Experiências" />
                </div>
            </div>
        </div>
      

      <div className="experience-list-container">

        <div className="map-content-img">
          <img className="map-content-img-inner-img" src="/images/jardim.webp" alt="Map" />
        </div>

        <div className="experience-list-text-container">
          <p className="experiencie-list-text">
            Selecione abaixo a sala em que se encontra. Poderá, após aceder a uma das salas abaixo, seguir a ordem natural das experiências.
          </p>
        </div>

        <ul className="experience-list">
          {experiencias.map((exp, index) => (
            <li
              key={index}
              className="experience-card"
              onClick={() => handleExperienceClick(exp)}
            >
              <div className="experience-link">

                <div className="experience-info">
                  <span className="experience-room">
                    {exp.sala}
                  </span>

                  <h3>{exp.titulo}</h3>
                </div>

                <div className="experience-image-wrapper">
                  <img
                    src={exp.image}
                    alt={exp.titulo}
                    className="experience-image"
                  />
                </div>

              </div>
            </li>
          ))}
        </ul>

        {isPopUpVisible && popupData && (
          <ModelViewerPopUp
            {...popupData}
            onClose={() => setIsPopUpVisible(false)}
          />
        )}
      </div>
    </div>
  );
}

export default Catalogo;
