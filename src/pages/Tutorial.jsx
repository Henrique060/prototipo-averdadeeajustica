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

      <h3 className="tutorial-description">
        Deverá fazer, somente, uso do seu telemóvel para observar as experiências em ação.
        <br />
        Para tal, <b>deverá permitir o acesso à câmara e ao microfone</b>, quando pedido.
      </h3>

      <div className="tutorial-container">

        {/* Row 1: Quadros */}
        <div className="tutorial-title">
          <p>Experiências com <b>Quadros</b></p>
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
            headerName="Experiências com Quadros"
            onClose={() => setActivePopUp(null)}
            imgSrc="/images/terreiropaco.webp"
            description="lorem ipsum"
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
            headerName="Experiências com Peças"
            onClose={() => setActivePopUp(null)}
            imgSrc="/images/soberania.webp"
            description="lorem ipsum"
          />
        )}

       

      </div>

      <NavBar />
    </div>
  );
}

export default Tutorial;