// ARExperience.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoArrowBackOutline } from "react-icons/io5";
import MindARViewer from '../mindar-viewer';
import './ARExperience.css';

function ARExperience() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    navigate(-1);
  };

  const targetSrc = location.state?.targetSrc || "/markers/terreiro-militar-marker.mind";

  return (
    <div className="ar-experience-page">
      <button className="ar-back-btn" onClick={handleBack}>
        <IoArrowBackOutline /> Voltar
      </button>
      
      <div className="ar-viewer-container">
        <MindARViewer targetSrc={targetSrc} />
      </div>
    </div>
  );
}

export default ARExperience;