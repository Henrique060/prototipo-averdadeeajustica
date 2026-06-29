import React, {useState} from "react";
import { Link } from 'react-router-dom';
import LogoHeader from "../components/LogoHeader";
import PopUp from "../components/PopUp";
import NavBarExperience_2 from "../components/NavBarExperience_2";
import PageHeader from "../components/PageHeader";
import { IoArrowBackOutline } from "react-icons/io5";


function Catalogo() {
    const [isPopUpVisible, setIsPopUpVisible] = useState(false);
    const [popupData, setPopupData] = useState(null);

    const experiencias = [
  {
    sala: 'Terreiro do Paço',
    titulo: 'Portal para o Terreiro do Paço',
    image: '/images/portal-terreiro-1.jpeg',
    url: '/escadaria',
  },

  {
    sala: 'Terreiro do Paço',
    titulo: 'Chafariz de Apolo',
    image: '/images/portal-terreiro-1.jpeg',
    url: '/escadaria',
  },

  {
    sala: 'Alegoria a Sebastião',
    titulo: 'Teatro de Papel',
    image: '/images/teatro-papel-1.jpeg',

    popup: {
      headerName: 'Alegoria a Sebastião',

      listOfItems: [
        'Terreiro do Paço Militar',
        'Terreiro do Paço Civil',
      ],

      listOfURLs: [
        '/quadro-terreiro-paco',
        '/quadro-terreiro-paco',
      ],
    },
  }

  
];

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
          <img src="/images/jardim.webp" alt="Map" />
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
          <PopUp
            {...popupData}
            onClose={() => setIsPopUpVisible(false)}
          />
        )}
      </div>
    </div>
  );
}

export default Catalogo;
