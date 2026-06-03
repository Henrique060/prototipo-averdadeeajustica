// ARExperience.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoArrowBackOutline } from "react-icons/io5";
import MindARViewer from '../mindar-viewer';
import './ARExperience.css';

function ARExperience() {
  const navigate = useNavigate();
  const location = useLocation();

  const { targetSrc, assets, entities } = location.state || {};

  const handleTap = (e) => {
    console.log('tapped entity:', e.target);
    // add custom logic here per experience if needed
  };

  return (
    <div className="ar-experience-page">
      <button className="ar-back-btn" onClick={() => navigate(-1)}>
        <IoArrowBackOutline /> Voltar
      </button>
      <div className="ar-viewer-container">
        <MindARViewer
          targetSrc={targetSrc || "/markers/terreiro-militar-marker.mind"}
          assets={assets || []}
          entities={entities || []}
          onTap={handleTap}
        />
      </div>
    </div>
  );
}

export default ARExperience;