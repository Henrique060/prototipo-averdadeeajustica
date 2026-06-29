import React from 'react';
import ExperiencePageComponent from '../components/ExperiencePageComponent.jsx';

function FonteAgua() {
  return (
    <ExperiencePageComponent
      imageSrc="/images/fonteagua.webp"
      imageAlt="Fonte"
      titleMain="Fonte de Água"
      titleSide="Sala 22 - Cidade Joanina"
      description={`Lorem Ipsum
                    `}
      buttonTo="/quadro-ar"
      buttonLabel="Iniciar Experiência"
      mapImgSrc="/images/mapa-museu.webp"
      experienceId="fonteagua" 
    />
  );
}

export default FonteAgua;