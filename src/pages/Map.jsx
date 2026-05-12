import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Map.css';
import PageHeader from '../components/PageHeader';
import NavBar from '../components/NavBar';
import LogoHeader from '../components/LogoHeader';
import Grid from '@mui/material/Grid';
import PopUp from '../components/PopUp';
import HeroButton from '../components/HeroButton';

const Map = () => {
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);

  const popUpDataExperienceRooms = {
    listOfItems: ["D. João V", "Sala 2", "Sala 3"],
    listOfURLs: ["/djoao", "/experiencia2", "/experiencia3"],
    headerName: "Lista de Experiências"
  };

  return (
    <div className="page-wrapper">
      <LogoHeader />
      <PageHeader title="Mapa das Experiências" />
      <NavBar />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <div className="map-content-img">
            <img src="/images/mapa-museu.png" alt="Map" />
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
        <div className="map-content-text">
          <p> As experiência seguem um rumo natural de exploração, sala a sala, na disposição estabelecida pelo museu.<br />
          Começar-se-à a visita pela escadaria, atravessando as salas por ordem, desde a <b>sala 21</b> até à <b>sala 31</b>.<br />
          De modo a facilitar a exploração, caso necessário, o vistante poderá sempre voltar atrás através do <Link to="/map" style={{ color: '#EA562E' }}> menu de experiências</Link> ou aceder ao próprio do botão na barra de navegação.
          </p>
        </div>

        <div className="map-description-section">
          <div className="map-description-image">
            <img src="./images/escadaria.jpeg" alt="Escadaria do Palácio Pimenta" />
          </div>

          <div className="map-description-text">
            <h3>Escadaria do Palácio Pimenta</h3>
            <p>
              Começando na icónica escadaria, esta sala oferece a visão inicial da experiência
              relativamente à exploração das alegorias. Seguindo o rumo apresentado no mapa acima, o visitante será guiado através das indicações
              contadas na história presente.
            </p>
            <HeroButton to="/quadro-terreiro-paco">
            Iniciar
          </HeroButton>
          </div>
        </div>

        {/* Both buttons in one row */}
        <div className="map-content-buttons">
          <HeroButton onClick={() => setIsPopUpVisible(true)}>
            Ver Experiências
          </HeroButton>
        </div>

        {isPopUpVisible && (
          <PopUp
            {...popUpDataExperienceRooms}
            onClose={() => setIsPopUpVisible(false)}
          />
        )}
      </Grid>
      </Grid>
    </div>
  );
};

export default Map;