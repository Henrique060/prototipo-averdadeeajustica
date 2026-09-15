import React from 'react';
import ExperiencePageComponent from '../components/ExperiencePageComponent.jsx';

function QuadroTerreiroPaco() {
  return (
    <ExperiencePageComponent
      imageSrc="/images/terreiropaco.webp"
      imageAlt="Quadro Terreiro Paco"
      titleMain="O Chafariz de Apolo"
      titleSide="Sala 21 - Cidade no séc. XVII"
      description="A praça,
                    um palco majestoso
                    banhado pelo Tejo.
                    Alegoria viva e vivida da cidade:
                    do que a cidade foi,
                    do que quiseram que ela fosse.
                    Mas de quem é ela?
                    "
      buttonTo="/quadro-ar"
      mapImgSrc="/images/mapa-museu-21.webp"
      experienceId="terreiro1"

      noMindARJS={true}
      navigateRoute={"/terreirocatalogo"}
      buttonLabel="Escolher Experiência"
    />
  );
}

export default QuadroTerreiroPaco;