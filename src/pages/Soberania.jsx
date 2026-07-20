import React from 'react';
import ExperiencePageComponent from '../components/ExperiencePageComponent.jsx';
import { useNavigate } from "react-router";

function Soberania() {
  let navigate = useNavigate();
  return (
    <div>
    <ExperiencePageComponent
      imageSrc="/images/anaModelo.webp"
      imageAlt="Soberania"
      titleMain="Estátua Soberania"
      titleSide="Sala 28 - Estado Novo"
      description="Texto que irá descrever a alegoria e experiência desejada.
        Deverá também este texto descrever ligeiramente o que se quer que o user faça.
        Mais informações sobre a experiência podem ser adicionadas aqui - falar com equipa."
      buttonLabel="Escolher Experiências"
      mapImgSrc="/images/mapa-museu-28.webp"
      noMindARJS={true}
      navigateRoute={"/soberania-catalogo"}
    />
    
    </div>
  );
}

export default Soberania;