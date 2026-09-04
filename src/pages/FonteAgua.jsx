import React from 'react';
import ExperiencePageComponent from '../components/ExperiencePageComponent.jsx';

function FonteAgua() {
  return (
    <ExperiencePageComponent
      imageSrc="/images/chafariz-rato.webp"
      imageAlt="Fonte"
      titleMain="Ciclo da Água e do Imposto"
      titleSide="Sala 22 - Cidade Joanina"
      description={`Água e azeite não se misturam,
uma verdade 
cristalina;
E a liberdade com os impostos?

As águas eram livres,
mas as suas caminhadas foram impostas.
As vidas na cidade...
 são impostas?

O eterno equilíbrio
dos quereres
e dos deveres
sobre a cidade, sobre a natureza,
sobre a natureza da cidade.

Fica o magnânimo monumento:
percorre a paisagem,
eis a água que sai de outros menores monumentos.
Brindemos e nos banhemos em seu louvor!
E que se ergam monumentos 
de fazer água,
de cuidar da água,
de cuidar da cidade.

                    `}
      buttonTo="/quadro-ar"
      buttonLabel="Iniciar Experiência"
      mapImgSrc="/images/mapa-museu.webp"
      experienceId="fonteagua" 
    />
  );
}

export default FonteAgua;