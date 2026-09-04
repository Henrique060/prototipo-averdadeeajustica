import React from 'react';
import ExperiencePageComponent from '../components/ExperiencePageComponent.jsx';

function Terramoto() {
  return (
    <ExperiencePageComponent
      imageSrc="/images/terramoto.webp"
      imageAlt="Terramoto Ana"
      titleMain="Um Terremoto"
      titleSide="Sala 23 - Terramoto de 1755"
      description="A memória pública não esconde,
mas também não lembra 
a dor,
a tristeza,
o cataclismo...
Recordar ou esquecer?
A cidade, afinal, é da natureza,
que se impôs e deixou o aviso:
a cidade é dela.
A praça é dela.

Somos parte dela.
Voltará ela a lembrar-nos
da sua soberania?
Caso caia (novamente)
o Carmo e Trindade...
Escreverão poemas e monumentos
em nossa memória?
Em memória de nós?

"
      buttonTo="/quadro-ar"
      buttonLabel="Iniciar Experiência"
      mapImgSrc="/images/mapa-museu-23.webp"
      experienceId="terramoto"
    />
  );
}

export default Terramoto;