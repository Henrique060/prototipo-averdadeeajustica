import React from 'react';
import ExperiencePageComponent from '../components/ExperiencePageComponent.jsx';

function Terramoto() {
  return (
    <ExperiencePageComponent
      imageSrc="/images/terramoto.webp"
      imageAlt="Terramoto Ana"
      titleMain="Terramoto"
      titleSide="Sala 23 - Terramoto de 1755"
      description="Texto que irá descrever a alegoria e experiência desejada.
        Deverá também este texto descrever ligeiramente o que se quer que o user faça.
        Mais informações sobre a experiência podem ser adicionadas aqui - falar com equipa."
      buttonTo="/quadro-ar"
      buttonLabel="Iniciar Experiência"
      mapImgSrc="/images/mapa-museu-23.webp"
      experienceId="terramoto"
    />
  );
}

export default Terramoto;