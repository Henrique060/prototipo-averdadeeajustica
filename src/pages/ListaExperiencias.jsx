import React, { useState } from 'react';
import './ListaExperiencias.css';
import PageHeader from '../components/PageHeader';
import LogoHeader from '../components/LogoHeader';
import NavBar from '../components/NavBar';
import PopUp from '../components/PopUp';

const experiencias = [
  {
    sala: 'Entrada',
    titulo: 'Escadaria Principal',
    image: '/images/escadaria.jpeg',
    url: '/escadaria',
  },

  {
    sala: 'Sala 21',
    titulo: 'Cidade no século XVII',
    image: '/images/sala21.jpeg',

    popup: {
      headerName: 'Sala 21 - Experiências',

      listOfItems: [
        'Terreiro do Paço Militar',
        'Terreiro do Paço Civil',
      ],

      listOfURLs: [
        '/quadro-terreiro-paco',
        '/quadro-terreiro-paco',
      ],
    },
  },

  {
    sala: 'Sala 22',
    titulo: 'Cidade joanina (1707-1750)',
    image: '/images/sala22.jpeg',
    popup: {
      headerName: 'Sala 22 - Cidade joanina',

      listOfItems: [
        'D. João V - A Riqueza',
        'A fonte de água',
      ],

      listOfURLs: [
        '/djoao',
        '/a-fonte-de-agua',
      ],
    },
  },

  {
    sala: 'Sala 23',
    titulo: 'Terramoto de 1755',
    image: '/images/sala23.jpeg',
    url: '/sala23',
  },

  {
    sala: 'Sala 24',
    titulo: 'Reconstrução pombalina / Escravatura',
    image: '/images/sala24.jpeg',
    url: '/sala24',
  },

  {
    sala: 'Sala 25',
    titulo: 'Inquisição',
    image: '/images/sala26.jpeg',
    url: '/sala25',
  },

  {
    sala: 'Sala 26',
    titulo: 'Cidade no tempo de D. Maria I / Guerra Peninsular',
    image: '/images/sala26.jpeg',
    url: '/sala26',
  },

  {
    sala: 'Sala 27',
    titulo: 'Cidade oitocentista / República',
    image: '/images/sala27.jpeg',
    url: '/sala27',
  },

  {
    sala: 'Salas 28 & 29',
    titulo: 'Estado Novo (1933 - 1974)',
    image: '/images/sala28.jpeg',
    url: '/sala28',
  },

  {
    sala: 'Sala 30',
    titulo: 'Cidade contemporânea (1974 - 1998)',
    image: '/images/sala30.jpeg',
    url: '/sala30',
  },

  {
    sala: 'Sala 31',
    titulo: 'Exposição Mundial de 1998',
    image: '/images/sala31.jpeg',
    url: '/sala31',
  },
];

const ListaExperiencias = () => {
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
      <PageHeader title="Lista de Experiências" />
      <NavBar />

      <div className="experience-list-container">

        <div className="map-content-img">
          <img src="/images/mapa-museu.png" alt="Map" />
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
};

export default ListaExperiencias;