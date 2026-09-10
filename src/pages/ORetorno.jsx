import React from 'react';
import ExperiencePageComponent from '../components/ExperiencePageComponent.jsx';

function ORetorno() {
  return (
    <ExperiencePageComponent
      imageSrc="/images/lenco-retorno.webp"
      imageAlt="Um Caminho para a Justiça (souvenir)"
      titleMain="Um Caminho para a Justiça (souvenir)"
      titleSide="Sala 26 - Cidade no tempo de D. Maria I"
      description="Mesmo por motivos nem sempre nobres,
Lançados pela fama e pela vitória,
Os que querem equilibrar a balança
da vontade de uns à custa de todos,
Para uma versão de quase todos por todos,
Onde todos ainda sejam alguns,
Merecem certa glória,
Mesmo assim é uma vitória.
"
      buttonTo="/quadro-ar"
      buttonLabel="Iniciar Experiência"
      mapImgSrc="/images/mapa-museu-26.webp"
      experienceId="oretorno"
    />
  );
}

export default ORetorno;