import React from 'react';
import ExperiencePageComponent from '../components/ExperiencePageComponent.jsx';

function BustoRepublica() {
  return (
    <ExperiencePageComponent
      imageSrc="/images/bustorepublica.png"
      imageAlt="Busto Republica"
      titleMain="Busto da República"
      titleSide="Sala 27 - República"
      description="Texto que irá descrever a alegoria e experiência desejada.
        Deverá também este texto descrever ligeiramente o que se quer que o user faça.
        Mais informações sobre a experiência podem ser adicionadas aqui - falar com equipa."
      buttonTo="/quadro-ar"
      buttonLabel="Iniciar Experiência"
      mapImgSrc="/images/mapa-museu-27.png"
    />
  );
}

export default BustoRepublica;