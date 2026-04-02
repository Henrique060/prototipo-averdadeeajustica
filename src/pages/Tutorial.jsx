import React from 'react';
import { Link } from 'react-router-dom';
import './Tutorial.css';
import PageHeader from '../components/PageHeader';
import NavBar from '../components/NavBar';
import LogoHeader from '../components/LogoHeader';

function Tutorial() {
  return (
    <div className="page-wrapper">
      <LogoHeader />
      <PageHeader title="Como funcionam as experiências?" />

      <h3 className="tutorial-description">Esta é uma breve descrição sobre como as experiências funcionam.</h3>

      

      <div className="tutorial-container">
        {/* Row 1: Image Left, Text Right */}

        <div className="tutorial-title">
          <p>Experiências com <b>Quadros</b></p>
        </div>

        <div className="tutorial-row">
          <div className="tutorial-image">
            <img src="/images/mobile-phone.png" alt="Phone" />
          </div>
          <div className="tutorial-text">
            <p>This is a description of the first image, aligned to the right.</p>
          </div>
        </div>

        <div className="tutorial-title">
          <p>Experiências com <b>Peças</b></p>
        </div>

        {/* Row 2: Text Left, Image Right */}
        <div className="tutorial-row reverse">
          <div className="tutorial-image">
            <img src="/images/mobile-phone.png" alt="Phone" />
          </div>
          <div className="tutorial-text">
            <p>This is a description of the second image, aligned to the left.</p>
          </div>
        </div>

        <div className="tutorial-title">
          <p>Experiências com <b>Marcadores</b></p>
        </div>

        <div className="tutorial-row">
          <div className="tutorial-image">
            <img src="/images/mobile-phone.png" alt="Phone" />
          </div>
          <div className="tutorial-text">
            <p>This is a description of the first image, aligned to the right.</p>
          </div>
        </div>

      </div>

      <NavBar />
    </div>
  );
}

export default Tutorial;