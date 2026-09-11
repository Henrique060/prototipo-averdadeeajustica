import React, {useState} from "react";
import { Link, useNavigate } from 'react-router-dom';
import LogoHeader from "../components/LogoHeader";
import ModelViewerPopUp from "../components/ModelViewerPopUp";
import NavBarExperience_2 from "../components/NavBarExperience_2";
import PageHeader from "../components/PageHeader";
import { IoArrowBackOutline } from "react-icons/io5";
import './Catalogo.css';
import NavBar from "../components/NavBar";
import { IoEnterOutline } from "react-icons/io5";


const experiencias = [
  
  {
    sala: 'Terreiro do Paço',
    titulo: 'Estátua dos Músicos de São Jorge',
    image: '/images/musicosdjose.webp',
    popup: {
      headerName: 'Estátua dos Músicos de São Jorge',
      modelViewerSrc: '/models/praca.glb',

    },
  },

  {
    sala: 'Alegoria a Sebastião',
    titulo: 'Teatro de Papel',
    image: '/images/teatro-papel.webp',
    popup: {
      headerName: 'Alegoria a Sebastião',
      modelViewerSrc: '/models/teatro-de-papelv3.glb',

    },
  },

  

  
];

function Recompensa() {
    const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [popupData, setPopupData] = useState(null);

  const navigate = useNavigate();

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
                <PageHeader title="Souvenirs" />
            </div>
        </div>

      <div className="experience-list-container">
        <div className="map-content-img">
          <img className="map-content-img-inner-img" src="/images/terreirodopaco.webp" alt="Map" />
        </div>

        <br/>
        <div className="experience-list-text-container">
          <p className="experiencie-list-text" style={{ fontStyle: 'italic', lineHeight: '1.5', fontSynthesis: 'style' }}>
            Vê a nossa cidade,<br />
            quão grande é a nossa praça!<br />
            Interrogas-te como podes vê-la?<br />
            <br /> {/* <-- Add an extra <br /> if you want a blank space/paragraph break here */}
            Desce deste lugar,<br />
            vai para campo aberto.<br />
            Pois todas as coisas guardam entre si uma ordem<br />
            que transforma a realidade,<br />
            imersiva.<br />
            <br />
            Entre teatros de papel<br />
            e monumentos,<br />
            ela, que tão distante quanto parecia,<br />
            permite vislumbrar a Verdade e a Justiça.
          </p>
        </div>

        <ul className="experience-list">
          {experiencias.map((exp, index) => (
            <li
              key={index}
              className="experience-card"
              onClick={() => handleExperienceClick(exp)}>
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
            {...popupData}
            onClose={() => setIsPopUpVisible(false)}
            continueFlag={false}
          />
        )}
      </div>

        <NavBar/>
        
    </div>
    
    
  );
}

export default Recompensa;
