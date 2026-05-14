import React from 'react';
import ExperiencePageComponent from '../components/ExperiencePageComponent.jsx';

function Escadaria() {
  return (
    <ExperiencePageComponent
      imageSrc="/images/escadaria.jpeg"
      imageAlt="Introdução"
      titleMain="Introdução"
      titleSide="Escadaria"
      description="Texto que irá descrever a alegoria e experiência desejada.
        Deverá também este texto descrever ligeiramente o que se quer que o user faça.
        Mais informações sobre a experiência podem ser adicionadas aqui - falar com equipa."
      buttonTo="/quadro-ar"
      buttonLabel="Iniciar Experiência"
    />
  );
}

export default Escadaria;