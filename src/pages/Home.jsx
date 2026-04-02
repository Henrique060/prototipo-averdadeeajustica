import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import HeroButton from '../components/HeroButton';

function Home() {
  return (
    <div className="home-wrapper">

      {/* MOBILE / PORTRAIT VERSION */}
      <section className="hero-landing hero-mobile">
        <HeroButton to="/tutorial" label="Iniciar Experiência" className="hero-btn" />
      </section>

      {/* DESKTOP / LANDSCAPE VERSION */}
      <section className="hero-desktop">

        <div className="hero-left"></div>

        <div className="hero-right">
          <h1 className="hero-right-header">Aceda às experiências no seu telemóvel</h1>

          <img
            src="/images/qrcode.jpeg"
            alt="QR Code"
            className="qr-code"
          />

          <p className="hero-right-description">
            Se estiver a utilizar um tablet, coloque na orientação vertical
          </p>

          <Link className="hero-btn" to="/tutorial">
            Iniciar Experiência
          </Link>
        </div>

      </section>

    </div>
  );
}

export default Home;