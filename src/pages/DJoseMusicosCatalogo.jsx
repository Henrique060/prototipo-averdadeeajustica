import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import LogoHeader from "../components/LogoHeader";
import ModelViewerPopUp from "../components/ModelViewerPopUp";
import NavBarExperience_2 from "../components/NavBarExperience_2";
import PageHeader from "../components/PageHeader";
import { IoArrowBackOutline } from "react-icons/io5";
import NextExperience from "../components/NextExperience";
import { IoEnterOutline } from "react-icons/io5";

import './Catalogo.css';


const experiencias = [
  {
    sala: 'Sala 24 - Reconstrução Pombalina',
    titulo: 'A Estátua da Praça',
    image: '/images/djose.webp',
    popup: {
      headerName: 'A Estátua da Praça',
      modelViewerSrc: '/models/djoseMusicosSmall.glb',

    },
  },

  
];

function DJoseMusicosCatalogo() {
    const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [popupData, setPopupData] = useState(null);

  //preload ao asset modelo
  useEffect(() => {
    // Preload the models in the background as soon as the page loads
    experiencias.forEach((exp) => {
      if (exp.popup && exp.popup.modelViewerSrc) {
        // Fetching it automatically stores it in the browser's HTTP cache
        fetch(exp.popup.modelViewerSrc).catch((err) => 
          console.warn("Background preload failed:", err)
        );
      }
    });
  }, []);

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
                    <PageHeader title="A Estátua da Praça" />
                </div>
            </div>
        </div>
      

      <div className="experience-list-container">

        <div className="map-content-img">
          <img className="map-content-img-inner-img" src="/images/djosemusicostutorial.webp" alt="Map" />
        </div>

        <br />
        <div className="experience-list-text-container">
          <p className="experiencie-list-text">
            Abra a gaveta, conforme mostrado na figura. Apontando o telemóvel para a mesma, siga as instruções apresentadas no ecrã de modo a visualizar o modelo, inserido no ambiente.
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
              <IoEnterOutline size={24} style={{ color: '#EA562E' }}/>
              </div>
            </li>
          ))}
        </ul>

        {isPopUpVisible && popupData && (
          <ModelViewerPopUp
          continueFlag = {false}
            {...popupData}
            onClose={() => setIsPopUpVisible(false)}
            poster={"/images/musicosPoster.webp"}
          />
        )}
      </div>

      <NextExperience routeTo={'/lenco-saudade'}/>
    </div>
  );
}

export default DJoseMusicosCatalogo;
