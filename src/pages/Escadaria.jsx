import React from 'react';
import ExperiencePageComponent from '../components/ExperiencePageComponent.jsx';
import MindAREscadaria from '../mindar-experiences/MindAREscadaria.jsx';

function Escadaria() {
  return (
    <ExperiencePageComponent
      imageSrc="/images/escadaria.webp"
      imageAlt="Introdução"
      titleMain="Prólogo"
      titleSide="Escadaria"
      description={`Por teu bem querer, eu penso e discirno: 
                    que tu me sigas, e eu serei tua guia. 
                    - Eu sou Beatriz. 
                    Levar-te-ei daqui para lugar incerto; 
                    verás obras que não me deram respostas, 
                    mas me fizeram pensar.
                    (levando-te pela mão)
                    partilharei contigo,
                    os meus questionamentos,
                    atravessando de um passado para outro.
                    E depois deste caminho, perguntar-te-ei:
                    Que futuro almejas?
                    `}
      buttonTo="/quadro-ar"
      buttonLabel="Iniciar Experiência"
      mapImgSrc="/images/mapa-museu.webp"
      experienceId="escadaria" 
    />
  );
}

export default Escadaria;