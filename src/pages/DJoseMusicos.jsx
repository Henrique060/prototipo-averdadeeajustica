import React from 'react';
import ExperiencePageComponent from '../components/ExperiencePageComponent.jsx';

function DJoseMusicos() {
  return (
    <ExperiencePageComponent
      imageSrc="/images/djose.webp"
      imageAlt="Musicos de Sao Jorge"
      titleMain="A Estátua da Praça"
      titleSide="Sala 24 - Reconstrução Pombalina"
      description="Depois de enterrar os mortos,
Antes da terraplanagem sentimental,
Foi a praça a primeira pedra angular da modernidade.

A racionalidade dos traçados
Que foi Forçada a ferro e fogo.
A praça ainda não tinha identidade.

Surge então
(Orgulhosamente só)
Rei,o rei, el Rei D. José!

O rigor Magnânimo afasta a festa,
Lisboa não celebra, ainda chora
em austeridade.

A vida dos vivos faz-se.
Já não há chafariz na praça,
Nem a música dos pretos de São Jorge.

E se José for substituído por Jorge?
E se o homem não estiver orgulhosamente só?

Celebrar a vida dos que a perderam,
Pela música de escravos,
uma oportunidade
para celebrar comunidades.



Dar a cara pela República
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
      mapImgSrc="/images/mapa-museu-24.webp"
      experienceId="musicos"
    />
  );
}

export default DJoseMusicos;