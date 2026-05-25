import React from 'react';
import ExperiencePageComponent from '../components/ExperiencePageComponent.jsx';

function GravuraMarques() {
  return (
    <ExperiencePageComponent
      imageSrc="/images/alegoriaMarques.png"
      imageAlt="Alegoria ao Marques"
      titleMain="Alegoria a Sebastião"
      titleSide="Sala 24 - Reconstrução Pombalina"
      description="Texto que irá descrever a alegoria e experiência desejada.
        Deverá também este texto descrever ligeiramente o que se quer que o user faça.
        Mais informações sobre a experiência podem ser adicionadas aqui - falar com equipa."
      buttonTo="/quadro-ar"
      buttonLabel="Iniciar Experiência"
      mapImgSrc="/images/mapa-museu-24.png"
    />
  );
}

export default GravuraMarques;