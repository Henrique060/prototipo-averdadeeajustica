import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-wrapper">

      {/* MOBILE / PORTRAIT VERSION */}
      <section className="hero hero-mobile">
        <Link className="hero-btn" to="/tutorial">
          Iniciar Experiência
        </Link>
      </section>

      {/* DESKTOP / LANDSCAPE VERSION */}
      <section className="hero-desktop">

        <div className="hero-left"></div>

        <div className="hero-right">
          <h1>Aceda à experiência no seu telemóvel</h1>

          <img
            src="/images/qrcode.jpeg"
            alt="QR Code"
            className="qr-code"
          />

          <p>
            Se estiver a usar um tablet, coloque na orientação vertical
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