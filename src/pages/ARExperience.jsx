import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoArrowBackOutline } from "react-icons/io5";
import MindAREscadaria from '../mindar-experiences/MindAREscadaria.jsx'; // 👈 Import it directly here
import MindARConvite from '../mindar-experiences/MindARConvite.jsx'; // 👈 Import it directly here
import './ARExperience.css';

// 1. Create a registry map of your experiences
const EXPERIENCES = {
  escadaria: MindAREscadaria,
  convite: MindARConvite,
  // Add more entries here later as you grow:
  // sala_azul: MindARSalaAzul, 
};

function ARExperience() {
  const navigate = useNavigate();
  const location = useLocation();

  // 2. Read the safe string ID from the state safely
  const { experienceId } = location.state || {};

  const handleTap = (e) => {
    console.log('tapped entity:', e.target);
  };

  // 3. Resolve the actual component based on the key
  const TargetComponent = EXPERIENCES[experienceId];

  return (
    <div className="ar-experience-page">
      <button className="ar-back-btn" onClick={() => navigate(-1)}>
        <IoArrowBackOutline /> Voltar
      </button>
      <div className="ar-viewer-container">
        {/* 4. Render dynamically if found, or gracefully handle an empty state */}
        {TargetComponent ? (
          <TargetComponent onTap={handleTap} />
        ) : (
          <p style={{ color: 'white', padding: '20px' }}>Experiência não encontrada.</p>
        )}
      </div>
    </div>
  );
}

export default ARExperience;