import React from 'react';
import ExperiencePageComponent from '../components/ExperiencePageComponent.jsx';

function Descobrimentos() {
  return (
    <ExperiencePageComponent
      imageSrc="/images/sufragio.png"
      imageAlt="Monumento Descobrimentos"
      titleMain="Monumento aos Descobrimentos"
      titleSide="Sala 28 - Estado Novo"
      description="Texto que irá descrever a alegoria e experiência desejada.
        Deverá também este texto descrever ligeiramente o que se quer que o user faça.
        Mais informações sobre a experiência podem ser adicionadas aqui - falar com equipa."
      buttonTo="/quadro-ar"
      buttonLabel="Iniciar Experiência"
      mapImgSrc="/images/mapa-museu-28.png"
    />
  );
}

export default Descobrimentos;