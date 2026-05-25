import React from 'react';
import ExperiencePageComponent from '../components/ExperiencePageComponent.jsx';

function FiguraConvite() {
  return (
    <ExperiencePageComponent
      imageSrc="/images/salaconvite.webp"
      imageAlt="Sala Convite"
      titleMain="Figuras de Convite"
      titleSide="Sala de Convite"
      description="Texto que irá descrever a alegoria e experiência desejada.
        Deverá também este texto descrever ligeiramente o que se quer que o user faça.
        Mais informações sobre a experiência podem ser adicionadas aqui - falar com equipa."
      buttonTo="/quadro-ar"
      buttonLabel="Iniciar Experiência"
      mapImgSrc="/images/mapa-museu-convite.webp"
    />
  );
}

export default FiguraConvite;