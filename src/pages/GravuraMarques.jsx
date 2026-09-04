import React from 'react';
import ExperiencePageComponent from '../components/ExperiencePageComponent.jsx';

function GravuraMarques() {
  return (
    <ExperiencePageComponent
      imageSrc="/images/alegoriaMarques.webp"
      imageAlt="Alegoria ao Marques"
      titleMain="Teatro de Papel"
      titleSide="Sala 24 - Reconstrução Pombalina"
      description="Eis o homem que reconstruiu a praça,
                  Que mudou a cidade,
                  Que fez a sua vontade.

                  Eis aquele ambíguo personagem,
                  Com génio e vaidade —
                  Génio no feitio e na genialidade.

                  Eis o homem autoproclamado e representado,
                  Como se de uma tragédia grega tirado.
                  Uma vida cheia de páthos e deixa:
                  Um Olimpo olisiponense de modernidade,
                  O seu legado.

                  Eis que deixo à vossa consideração:
                  Entrai neste teatro de papel.
                  Entre linhas,
                  Entre imagens,
                  Contam-se outras visões da história...
"
      buttonTo="/quadro-ar"
      buttonLabel="Iniciar Experiência"
      mapImgSrc="/images/mapa-museu-24.webp"
      experienceId="sebastiao"
    />
  );
}

export default GravuraMarques;