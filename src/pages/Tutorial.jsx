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
        O utilizador deverá fazer, somente, uso do seu telemóvel para observar as experiências em ação.
        <br />
        Para tal, deverá permitir o acesso à câmara e ao microfone, quando pedido.
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
              Alinhe os quadros dentro do visor da câmara e interaja com os elementos presentes.
              <br />
              <button onClick={() => setActivePopUp('quadros')} style={{ color: '#EA562E', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
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
          <p>Experiências com <b>Peças</b></p>
        </div>
        <div className="tutorial-row reverse">
          <div className="tutorial-image">
            <img className="tutorial-image-items" src="/images/soberania.webp" alt="Peças" />
          </div>
          <div className="tutorial-text">
            <p>
              Coloque peças 3D no mundo real, com recurso à câmara, visualizando-as em pormenor.
              <br />
              <button onClick={() => setActivePopUp('pecas')} style={{ color: '#EA562E', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
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

        {/* Row 3: Marcadores */}
        <div className="tutorial-title">
          <p>Experiências com <b>Marcadores</b></p>
        </div>
        <div className="tutorial-row">
          <div className="tutorial-image">
            <img className="tutorial-image-items" src="/images/salaconvite.webp" alt="Marcadores" />
          </div>
          <div className="tutorial-text">
            <p>
              Aponte a câmara para marcadores, expandindo o mundo à sua volta com nova informação e objetos.
              <br />
              <button onClick={() => setActivePopUp('marcadores')} style={{ color: '#EA562E', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                Saiba Mais
              </button>
            </p>
          </div>
        </div>
        {activePopUp === 'marcadores' && (
          <LearnMorePopUp
            headerName="Experiências com Marcadores"
            onClose={() => setActivePopUp(null)}
            imgSrc="/images/salaconvite.webp"
            description="lorem ipsum"
          />
        )}

      </div>

      <NavBar />
    </div>
  );
}

export default Tutorial;