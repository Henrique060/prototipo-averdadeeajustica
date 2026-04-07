import React from 'react';
import { Link } from 'react-router-dom';
import './Map.css';
import PageHeader from '../components/PageHeader';
import NavBar from '../components/NavBar';
import LogoHeader from '../components/LogoHeader';
import Grid from '@mui/material/Grid';
import HeroButton from '../components/HeroButton';

const Map = () => {
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
          <p>A experiência começa na sala XX (marcada a vermelho).
            <br />
            Siga a ordem das salas para experienciar a visita na sua totalidade. 
            <br />
            Toque nas salas do mapa para verificar as experiências disponíveis, sem que se perca.
          </p>
        </div>
        <div className="map-content-btn">
          <Link style={{ color: '#EA562E', fontWeight: 'bold', fontSize: '1.5rem' , fontFamily:'Montserrat'}} to="/quadro-terreiro-paco">
            Iniciar Visita
          </Link>
        </div>
      </Grid>
    </Grid>

    </div>
  );
};

export default Map;
