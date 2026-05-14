import React from 'react';
import ExperiencePageComponent from '../components/ExperiencePageComponent.jsx';

function DMaria() {
  return (
    <ExperiencePageComponent
      imageSrc="/images/dmaria.png"
      imageAlt="D.Maria I"
      titleMain="Legado"
      titleSide="D. Maria I"
      description="Texto que irá descrever a alegoria e experiência desejada.
        Deverá também este texto descrever ligeiramente o que se quer que o user faça.
        Mais informações sobre a experiência podem ser adicionadas aqui - falar com equipa."
      buttonTo="/quadro-ar"
      buttonLabel="Iniciar Experiência"
    />
  );
}

export default DMaria;