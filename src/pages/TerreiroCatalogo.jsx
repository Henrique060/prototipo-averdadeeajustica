import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
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
    sala: 'Sala 21 - Cidade no séc. XVII',
    titulo: 'O Chafariz de Apolo',
    image: '/images/terreiro1model.webp',
    popup: {
      headerName: 'O Chafariz de Apolo',
      modelViewerSrc: '/models/terreiro1model.glb',
    },
  },

  {
    sala: 'Sala 21 - Cidade no séc. XVII',
    titulo: '"Terreiro do Paço no século XVII - Dirk Stoop" em detalhe',
    image: '/images/terreiropaco.webp',
    // This card now launches the MindAR experience registered under
    // the 'terreiro2' key in ARExperience.jsx's EXPERIENCES map.
    experienceId: 'terreiro1',
  },
];


function TerreiroCatalogo() {
  const navigate = useNavigate();

  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [popupData, setPopupData] = useState(null);

  // preload ao asset modelo
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
    // If this room has a popup (3D model viewer)
    if (exp.popup) {
      setPopupData(exp.popup);
      setIsPopUpVisible(true);
      return;
    }

    // If this card should open a MindAR experience, navigate to the
    // AR experience route and pass the ID via router state (not the URL),
    // since ARExperience.jsx reads it from location.state.experienceId.
    if (exp.experienceId) {
      navigate('/ar-experience', { state: { experienceId: exp.experienceId } });
      return;
    }

    // Fallback: plain in-app route navigation (kept for any card that
    // just needs to go to a normal, non-AR route).
    if (exp.url) {
      navigate(exp.url);
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
            <PageHeader title="Monumentos Efémero" />
          </div>
        </div>
      </div>

      <div className="experience-list-container">

        <div className="map-content-img">
          <img className="map-content-img-inner-img" src="/images/terreiropaco.webp" alt="Map" />
        </div>

        <br />
        <div className="experience-list-text-container">
          <p className="experiencie-list-text">
            A experiência divide-se em dois momentos: a visualização do modelo do Chafariz de Apolo e a interação com o quadro. <br />
            Percorra ambas as experiências para descobrir a alegoria e história por detrás do quadro.
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
                <IoEnterOutline size={24} style={{ color: '#EA562E' }} />
              </div>
            </li>
          ))}
        </ul>

        {isPopUpVisible && popupData && (
          <ModelViewerPopUp
            continueFlag={false}
            {...popupData}
            onClose={() => setIsPopUpVisible(false)}
          />
        )}
      </div>

      <NextExperience routeTo={'/figura-convite'} />
    </div>
  );
}

export default TerreiroCatalogo;