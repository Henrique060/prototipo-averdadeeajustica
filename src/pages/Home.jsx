import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import HeroButton from '../components/HeroButton';

function Home() {

  const [isOpen, setIsOpen] = useState(false);

  const handleToggleMenu = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleDocumentClick = () => {
      setIsOpen(false);
    };
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  return (
    <div className="home-wrapper">

      {/* MOBILE / PORTRAIT VERSION */}
      <section className="hero-landing hero-mobile">
        <div className="button-container">
          <HeroButton onClick={handleToggleMenu} label="Entrar" className="hero-btn" />
          
          <div className={`popup-menu ${isOpen ? 'open' : ''}`} id="popupMenu">
            <a className="btn-iniciar" href="/escadaria">Iniciar</a>
            <a className="btn-sobre" href="/thesis-project-page">Sobre</a>
          </div>
        </div>
      </section>

      {/* DESKTOP / LANDSCAPE VERSION */}
      <section className="hero-desktop">

        <div className="hero-left"></div>

        <div className="hero-right">
          <h1 className="hero-right-header">Aceda às experiências no seu telemóvel</h1>

          <img
            src="/images/qrcode.webp"
            alt="QR Code"
            className="qr-code"
          />

          <p className="hero-right-description">
            Se estiver a utilizar um tablet, coloque na orientação vertical
          </p>

          <button className="hero-btn" onClick={handleToggleMenu}>
            Entrar
          </button>
          
        </div>

      </section>

    </div>
  );
}

export default Home;