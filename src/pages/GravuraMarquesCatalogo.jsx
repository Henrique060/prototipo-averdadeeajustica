import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import LogoHeader from "../components/LogoHeader";
import ModelViewerPopUp from "../components/ModelViewerPopUp";
import NavBarExperience_2 from "../components/NavBarExperience_2";
import PageHeader from "../components/PageHeader";
import { IoArrowBackOutline } from "react-icons/io5";
import NextExperience from "../components/NextExperience";
import './Catalogo.css';


const experiencias = [
  {
    sala: 'Sala 24 - Reconstrução Pombalina',
    titulo: 'Teatro de Papel',
    image: '/images/alegoriaMarques.webp',
    popup: {
      headerName: 'Teatro de Papel',
      modelViewerSrc: '/models/teatro-de-papelSmall.glb',

    },
  },
];

//preload ao asset modelo
  useEffect(() => {
    experiencias.forEach((exp) => {
      if (exp.popup && exp.popup.modelViewerSrc) {
        // 1. Log that loading has started
        console.log(`[Preload] Loading started for: ${exp.popup.modelViewerSrc}`);
        
        fetch(exp.popup.modelViewerSrc)
          .then((response) => {
            if (response.ok) {
              // 2. Log that loading has successfully finished
              console.log(`[Preload] Loading complete for: ${exp.popup.modelViewerSrc}`);
            } else {
              console.error(`[Preload] Error loading model. Status: ${response.status}`);
            }
          })
          .catch((err) => 
            console.warn("[Preload] Background preload failed:", err)
          );
      }
    });
  }, []);

function GravuraMarquesCatalogo() {
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
                    <PageHeader title="Teatro de Papel" />
                </div>
            </div>
        </div>
      

      <div className="experience-list-container">

        <div className="map-content-img">
          <img className="map-content-img-inner-img" src="/images/alegoriaMarques.webp" alt="Map" />
        </div>

        <br />
        <div className="experience-list-text-container">
          <p className="experiencie-list-text">
            Aponte o dispositivo móvel para o quadro e siga as instruções apresentadas no ecrã de modo a visualizar o modelo, inserido no ambiente.
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
          continueFlag = {false}
            {...popupData}
            onClose={() => setIsPopUpVisible(false)}
          />
        )}
      </div>

      <NextExperience routeTo={'/musicos'}/>
    </div>
  );
}

export default GravuraMarquesCatalogo;
