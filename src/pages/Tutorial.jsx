import React from 'react';
import { Link } from 'react-router-dom';
import './Tutorial.css';
import PageHeader from '../components/PageHeader';
import NavBar from '../components/NavBar';
import LogoHeader from '../components/LogoHeader';
import { IoHelpCircleOutline } from "react-icons/io5";



function Tutorial() {
  return (
    <div className="page-wrapper">
      <LogoHeader />
      <PageHeader title="Como funcionam as experiências?" />

      <h3 className="tutorial-description">
        O utilizador deverá fazer, somente, uso do seu telemóvel para observar as experiências em ação.
        <br/>
        Para tal, deverá permitir o acesso à câmara e ao microfone, quando pedido.
        </h3>

      

      <div className="tutorial-container">
        {/* Row 1: Image Left, Text Right */}

        <div className="tutorial-title">
          <p>Experiências com <b>Quadros</b></p>
        </div>

        <div className="tutorial-row">
          <div className="tutorial-image">
            <img className="tutorial-image-painting" src="/images/sufragio.jpg" alt="Phone" />
          </div>
          <div className="tutorial-text">
            <p>Alinhe os quadros dentro do visor da câmara e interaja com os elementos presentes. 
              <br/>
              <Link style={{ color: '#EA562E' }} to="/"> Saiba Mais</Link></p>
          </div>
        </div>

        <div className="tutorial-title">
          <p>Experiências com <b>Peças</b></p>
        </div>

        {/* Row 2: Text Left, Image Right */}
        <div className="tutorial-row reverse">
          <div className="tutorial-image">
            <img className="tutorial-image-items" src="/images/djose1.png" alt="Phone" />
          </div>
          <div className="tutorial-text">
            <p>Coloque peças 3D no mundo real, com recurso à câmara, visualizando-as em pormenor.
              <br/>
              <Link style={{ color: '#EA562E' }} to="/"> Saiba Mais</Link>
            </p>
          </div>
        </div>

        <div className="tutorial-title">
          <p>Experiências com <b>Marcadores</b></p>
        </div>

        <div className="tutorial-row">
          <div className="tutorial-image">
            <img className="tutorial-image-items" src="/images/qrcode.jpeg" alt="Phone" />
          </div>
          <div className="tutorial-text">
            <p>Aponte a câmara para marcadores, expandindo o mundo à sua volta com nova informação e objetos.
              <br/>
              <Link style={{ color: '#EA562E' }} to="/"> Saiba Mais</Link>
            </p>
          </div>
        </div>

      </div>

      <NavBar />
    </div>
  );
}

export default Tutorial;