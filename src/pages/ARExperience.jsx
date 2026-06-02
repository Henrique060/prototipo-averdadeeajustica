import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoArrowBackOutline } from "react-icons/io5";
import MindARViewer from '../mindar-viewer';
import './ARExperience.css';

function ARExperience() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
  // Small delay lets MindAR cleanup finish before React unmounts
    setTimeout(() => navigate(-1), 100);
  };

  const targetSrc = location.state?.targetSrc || "/markers/terreiro-militar-marker.mind";

  return (
    <div className="page-wrapper">
      <div className="ar-experience-page">
        <button className="ar-back-btn" onClick={handleBack}>
          <IoArrowBackOutline /> Voltar
        </button>
        <MindARViewer targetSrc={targetSrc} />
        
    </div>
  </div>
);

}

export default ARExperience;