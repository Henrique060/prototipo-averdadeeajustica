import React, { useState } from 'react';
import './Tutorial.css';
import PageHeader from '../components/PageHeader';
import NavBar from '../components/NavBar';
import LogoHeader from '../components/LogoHeader';
import LearnMorePopUp from '../components/LearnMorePopUp';

function Tutorial() {
  const [activePopUp, setActivePopUp] = useState(null);

  return (
    <div className="page-wrapper">
      <LogoHeader />
      <PageHeader title="Como funcionam as experiências?" />

      <div className="tutorial-wrapper">
      <h3 className="tutorial-description">
        Deverá fazer, somente, uso do seu telemóvel para observar as experiências em ação.
        <br />
        Para tal, <b>deverá permitir o acesso à câmara e ao microfone</b>, quando pedido.
        <br />
        Sinta-se livre para se aproximar das experiências e observar de diferentes perspetivas.
      </h3>

      <div className="tutorial-container">

        {/* Row 1: Quadros */}
        <div className="tutorial-title">
          <p>Experiências com <b>Imagens</b></p>
        </div>
        <div className="tutorial-row">
          <div className="tutorial-image">
            <img className="tutorial-image-painting" src="/images/terreiropaco.webp" alt="Quadros" />
          </div>
          <div className="tutorial-text">
            <p>
              Alinhe os quadros com a sua câmara para visualizar novo conteúdo, dentro dos mesmos.
              <br />
              <button className="project-container-learn-more" onClick={() => setActivePopUp('quadros')}>
                Saiba Mais
              </button>
            </p>
          </div>
        </div>
        {activePopUp === 'quadros' && (
          <LearnMorePopUp
            headerName="Experiências com Imagens"
            onClose={() => setActivePopUp(null)}
            imgSrc="/images/markerlesstutorial.webp"
            descriptionHeader="Como interagir?"
            description="Ao iniciar a experiência, siga as instruções que aparecem no ecrã.
            Dirija-se ao quadro ou imagem, respetiva à experiência, aponte a câmara do telemóvel e observe a experiência na sua totalidade.
            Por vezes, surgirão botões com sugestões de interação. Toque e observe as mudanças no cenário."
          />
        )}

        {/* Row 2: Peças */}
        <div className="tutorial-title">
          <p>Experiências <b>Tridimensionais</b></p>
        </div>
        <div className="tutorial-row reverse">
          <div className="tutorial-image">
            <img className="tutorial-image-items" src="/images/soberania.webp" alt="Peças" />
          </div>
          <div className="tutorial-text">
            <p>
              Manuseie, mova e manipule itens para melhor compreendê-los.
              <br />
              <button className="project-container-learn-more" onClick={() => setActivePopUp('pecas')}>
                Saiba Mais
              </button>
            </p>
          </div>
        </div>
        {activePopUp === 'pecas' && (
          <LearnMorePopUp
            headerName="Experiências Tridimensionais"
            onClose={() => setActivePopUp(null)}
            imgSrc="/images/modelviewertutorial.webp"
            descriptionHeader="Como interagir?"
            description="Estas experiências diferenciam-se das anteriores pelo facto de não precisarem de ter um telemóvel a apontar para um quadro ou imagem, continuamente.
            Seguindo as instruções no ecrã, aponte a câmara para o chão, de modo a digitalizar o ambiente à sua volta.
            O modelo tridimensional irá aparecer à sua frente, podendo observá-lo, rodar, aumentar ou diminuir, de modo a compreendê-lo em maior detalhe."
          />
        )}

       

      </div>
    </div>
      <NavBar />
      
    </div>
  );
}

export default Tutorial;