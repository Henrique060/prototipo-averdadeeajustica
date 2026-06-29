import React from 'react';
import ExperiencePageComponent from '../components/ExperiencePageComponent.jsx';

function QuadroTerreiroPaco() {
  return (
    <ExperiencePageComponent
      imageSrc="/images/terreiropaco.webp"
      imageAlt="Quadro Terreiro Paco"
      titleMain="Terreiro do Paço"
      titleSide="Sala 21 - Cidade no séc. XVII"
      description="Texto que irá descrever a alegoria e experiência desejada.
        Deverá também este texto descrever ligeiramente o que se quer que o user faça.
        Mais informações sobre a experiência podem ser adicionadas aqui - falar com equipa."
      buttonTo="/quadro-ar"
      buttonLabel="Iniciar Experiência"
      mapImgSrc="/images/mapa-museu-21.webp"
      experienceId="terreiro1"
    />
  );
}

export default QuadroTerreiroPaco;