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
      titleMain="Soberania"
      titleSide="Sala 28 - Estado Novo"
      description="A soberania,
Vestida de passado,
Carrega consigo narrativas

Reveem-se no seu legado interesses,
As estratégias de aquém e de além
Por vezes (des)unos e divisíveis

A pergunta é sempre a mesma,
Uma chamada à reflexão:

Se a nossa soberania reside no “povo”...

O povo é abstrato
O cidadão é difuso
Espelham o povo que somos?
A cidadã que sou?
"
      mapImgSrc="/images/mapa-museu-28.webp"
      noMindARJS={true}
      navigateRoute={"/soberania-catalogo"}
    />
    
    </div>
  );
}

export default Soberania;