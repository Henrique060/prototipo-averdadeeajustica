import React from 'react';
import { Link } from 'react-router-dom';
import './Tutorial.css';
import PageHeader from '../components/PageHeader';
import NavBar from '../components/NavBar';

function Tutorial() {
  return (
    <div className="home-wrapper">
      <PageHeader title="Como funciona A VERDADE e a J-U-S-T-I-Ç-A?" />
      <NavBar />
    </div>
  );
}

export default Tutorial;