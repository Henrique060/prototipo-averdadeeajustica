import React from 'react';
import ExperiencePageComponent from '../components/ExperiencePageComponent.jsx';

function LencoSaudade() {
  return (
    <ExperiencePageComponent
      imageSrc="/images/saudade.webp"
      imageAlt="Saudade e Felicidade"
      titleMain="Saudade"
      titleSide="
      Sala 26 - Guerra Peninsular"
      description="(Tu deixarás cada coisa amada mais caramente) 

À margem,
eis os descalços d’alma,
de lenços brancos,
entre ingleses e franceses:
os portugueses.
Saudosamente revoltos...
De quem é a cidade?
De quem é a praça?
Quem desfila?
A cidade é de quem pode.
A praça é de quem manda.
(suspiram)
"
      buttonTo="/quadro-ar"
      buttonLabel="Iniciar Experiência"
      mapImgSrc="/images/mapa-museu-26.webp"
      experienceId="saudade"
    />
  );
}

export default LencoSaudade;