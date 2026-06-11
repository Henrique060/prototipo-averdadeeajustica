import React from 'react';
import ExperiencePageComponent from '../components/ExperiencePageComponent.jsx';

function Jardim() {
  return (
    <ExperiencePageComponent
      imageSrc="/images/jardim.webp"
      imageAlt="Jardim"
      titleMain="Jardim do Museu"
      titleSide="Experiências no Jardim"
      description="Experiencie o Monumento à Justiça, o Teatro de Papel e o Portal para o Terreiro do Paço"
      buttonLabel="Iniciar Experiência"
      mapImgSrc="/images/mapa-jardim.webp"
      targetImg="/images/jardim-target.webp"
      assets={[
        
      ]}
    />
  );
}

export default Jardim;