import React from 'react';
import ExperiencePageComponent from '../components/ExperiencePageComponent.jsx';

function QuadroEscombros() {
  return (
    <ExperiencePageComponent
      imageSrc="/images/quadro-escombros.webp"
      imageAlt="Escombros-Nª Sr.ª da Estrela"
      titleMain="Aos Sobreviventes"
      titleSide="Sala 23 - Terramoto de 1755"
      description="- Sobreviventes, o que vos resta?
Definharem, lentamente, pela colossal
destruição,
miséria 
e morte?

Traduz-se a voz de ontem para o dia de hoje: 

Alguns, transcendem a razão, 
com as mãos ao alto em
agradecimento,
Louvor,
e glória.
"
      buttonTo="/quadro-ar"
      buttonLabel="Iniciar Experiência"
      mapImgSrc="/images/mapa-museu-23.webp"
      experienceId="nsraestrela"
    />
  );
}

export default QuadroEscombros;