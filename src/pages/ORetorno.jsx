import React from 'react';
import ExperiencePageComponent from '../components/ExperiencePageComponent.jsx';

function ORetorno() {
  return (
    <ExperiencePageComponent
      imageSrc="/images/lenco-retorno.webp"
      imageAlt="O Retorno"
      titleMain="O Retorno"
      titleSide="Sala 26 - Cidade no tempo de D. Maria I"
      description="Texto que irá descrever a alegoria e experiência desejada.
        Deverá também este texto descrever ligeiramente o que se quer que o user faça.
        Mais informações sobre a experiência podem ser adicionadas aqui - falar com equipa."
      buttonTo="/quadro-ar"
      buttonLabel="Iniciar Experiência"
      mapImgSrc="/images/mapa-museu-26.webp"
      experienceId="oretorno"
    />
  );
}

export default ORetorno;