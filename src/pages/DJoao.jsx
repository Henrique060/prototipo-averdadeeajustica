import React from "react";
import { Link } from 'react-router-dom';
import ExperiencePageComponent from "../components/ExperiencePageComponent";

function DJoao() {
  return (
    <ExperiencePageComponent
      imageSrc="/images/djoao.webp"
      imageAlt="D. João V"
      titleMain="D.João V"
      titleSide="Sala 22 - Cidade Joanina"
      description={`Magnífico, 
                magnânimo. 
                Um braço que se vê 
                e o outro se esconde. 
                (Para que a Justiça ao Sólio real se incline;) 
                Rei de grandes obras, 
                grande cultura... 
                (E a quem a Fama a Eternidade une) 
                O seu próprio bem consome: 
                e qual seria 
                o néctar que o sacia?`}
      buttonTo="/quadro-ar"
      buttonLabel="Iniciar Experiência"
      mapImgSrc="/images/mapa-museu-22.webp"
      experienceId="djoao"
    />
  );
}

export default DJoao;
