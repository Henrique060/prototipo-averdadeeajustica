import React from 'react';
import ExperiencePageComponent from '../components/ExperiencePageComponent.jsx';

function DJoseMusicos() {
  return (
    <ExperiencePageComponent
      imageSrc="/images/djose.webp"
      imageAlt="Musicos de Sao Jorge"
      titleMain="Músicos de São Jorge"
      titleSide="Sala 24 - Reconstrução Pombalina"
      description="Texto que irá descrever a alegoria e experiência desejada.
        Deverá também este texto descrever ligeiramente o que se quer que o user faça.
        Mais informações sobre a experiência podem ser adicionadas aqui - falar com equipa."
      buttonTo="/quadro-ar"
      buttonLabel="Iniciar Experiência"
      mapImgSrc="/images/mapa-museu-24.webp"
      experienceId="musicos"
    />
  );
}

export default DJoseMusicos;