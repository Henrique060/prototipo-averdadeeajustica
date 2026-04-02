import React from 'react';
import { Link } from 'react-router-dom';
import './Tutorial.css';
import PageHeader from '../components/PageHeader';
import NavBar from '../components/NavBar';

const Map = () => {
  return (
    <div className="map-container">
      <PageHeader title="Map" />
      <NavBar />
    </div>
  );
};

export default Map;
