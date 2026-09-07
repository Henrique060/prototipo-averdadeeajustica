import React from 'react';
import ExperiencePageComponent from '../components/ExperiencePageComponent.jsx';

function BustoRepublica() {
  return (
    <ExperiencePageComponent
      imageSrc="/images/bustorepublica.webp"
      imageAlt="Busto Republica"
      titleMain="Busto da República"
      titleSide="Sala 27 - República"
      description="Dar a cara pela República
Quem és tu?

A quem pertences?
Soberano de ti mesmo,
Da tua carne e pensamentos.

Em ti há liberdade?
Em ti habita a Justiça?
E se te pedir
Para dares o teu corpo aos ideais?

Encarnarias a democracia?
Serias capaz de ser República?
"
      buttonTo="/quadro-ar"
      buttonLabel="Iniciar Experiência"
      mapImgSrc="/images/mapa-museu-27.webp"
      experienceId="bustorepublica"
    />
  );
}

export default BustoRepublica;