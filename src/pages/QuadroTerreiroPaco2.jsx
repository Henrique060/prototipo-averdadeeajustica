import React from 'react';
import ExperiencePageComponent from '../components/ExperiencePageComponent.jsx';

function QuadroTerreiroPaco2() {
  return (
    <ExperiencePageComponent
      imageSrc="/images/terreiro-militar.webp"
      imageAlt="Quadro Terreiro Paco Militar"
      titleMain="Terreiro do Paço (cont.)"
      titleSide="Sala 21 - Cidade no séc. XVII"
      description="A praça,
                    ópera do poder.
                    Constrói e comemora,
                    também de forma efémera,
                    os seus ritos,
                    os seus tratados,
                    ... endeusa pessoas.
                    Bom seria que cada um de nós
                    pudesse edificar monumentos efémeros:
                    os arcos dos nossos triunfos,
                    os obeliscos dos valores e amores,
                    celebrar a nossa vida
                    na monumentalidade humana.
                    "
      buttonTo="/quadro-ar"
      buttonLabel="Iniciar Experiência"
      mapImgSrc="/images/mapa-museu-21.webp"    
      experienceId="terreiro2"
    />
  );
}

export default QuadroTerreiroPaco2;