import React from "react";
import { Link } from 'react-router-dom';
import ExperiencePageComponent from "../components/ExperiencePageComponent";

function DJoao() {
  return (
    <ExperiencePageComponent
      imageSrc="/images/djoao.jpeg"
      imageAlt="D. João V"
      titleMain="D.João V"
      titleSide="A Riqueza"
      description="Texto que irá descrever a alegoria e experiência desejada.
        Deverá também este texto descrever ligeiramente o que se quer que o user faça.
        Mais informações sobre a experiência podem ser adicionadas aqui - falar com equipa."
      buttonTo="/quadro-ar"
      buttonLabel="Iniciar Experiência"
    />
  );
}

export default DJoao;
