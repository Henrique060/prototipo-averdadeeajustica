import React from 'react';
import ExperiencePageComponent from '../components/ExperiencePageComponent.jsx';
import MindARConvite from '../mindar-experiences/MindARConvite.jsx';

function FiguraConvite() {
  return (
    <ExperiencePageComponent
      imageSrc="/images/salaconvite.webp"
      imageAlt="Sala Convite"
      titleMain="Alegoria da Burocracia"
      titleSide="Sala de Convite"
      description="A convite do poder,
                    é pesada engrenagem.
                    Sem monumentos,
                    sem celebrações,
                    músculo da mão que julga.
                    Ainda hoje conhecemos
                    a sua encapsulada descendência.
                    "
      buttonTo="/quadro-ar"
      buttonLabel="Iniciar Experiência"
      mapImgSrc="/images/mapa-museu-convite.webp"
      experienceId="convite"
    />
  );
}

export default FiguraConvite;