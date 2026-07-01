import React from 'react';
import ExperiencePageComponent from '../components/ExperiencePageComponent.jsx';

function FonteAgua() {
  return (
    <ExperiencePageComponent
      imageSrc="/images/fonteagua.webp"
      imageAlt="Fonte"
      titleMain="Fonte de Água"
      titleSide="Sala 22 - Cidade Joanina"
      description={`Texto que irá descrever a alegoria e experiência desejada.
        Deverá também este texto descrever ligeiramente o que se quer que o user faça.
        Mais informações sobre a experiência podem ser adicionadas aqui - falar com equipa.
                    `}
      buttonTo="/quadro-ar"
      buttonLabel="Iniciar Experiência"
      mapImgSrc="/images/mapa-museu.webp"
      experienceId="fonteagua" 
    />
  );
}

export default FonteAgua;