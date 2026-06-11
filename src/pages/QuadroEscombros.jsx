import React from 'react';
import ExperiencePageComponent from '../components/ExperiencePageComponent.jsx';

function QuadroEscombros() {
  return (
    <ExperiencePageComponent
      imageSrc="/images/quadro-escombros.webp"
      imageAlt="Escombros-Nª Sr.ª da Estrela"
      titleMain="Nª Sr.ª da Estrela"
      titleSide="Sala 23 - Terramoto de 1755"
      description="Texto que irá descrever a alegoria e experiência desejada.
        Deverá também este texto descrever ligeiramente o que se quer que o user faça.
        Mais informações sobre a experiência podem ser adicionadas aqui - falar com equipa."
      buttonTo="/quadro-ar"
      buttonLabel="Iniciar Experiência"
      mapImgSrc="/images/mapa-museu-23.webp"
      experienceId="nsraestrela"
    />
  );
}

export default QuadroEscombros;