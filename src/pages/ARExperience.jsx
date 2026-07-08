import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoArrowForwardOutline } from "react-icons/io5";
import MindAREscadaria from '../mindar-experiences/MindAREscadaria.jsx'; // 👈 Import it directly here
import MindARConvite from '../mindar-experiences/MindARConvite.jsx'; // 👈 Import it directly here
import MindARDJoao from '../mindar-experiences/MindARDJoao.jsx'; // 👈 Import it directly here
import MindARNossaSraEstrela from '../mindar-experiences/MindARNossaSraEstrela.jsx';
import './ARExperience.css';
import VideoARExperience from '../videoar-experiences/VideoARExperience.jsx';
import MindARFonteAgua from '../mindar-experiences/MindARFonteAgua.jsx';
import MindARSaudade from '../mindar-experiences/MindARSaudade.jsx';
import MindARTerramoto from '../mindar-experiences/MindARTerramoto.jsx'; 
import MindARTerreiro2 from '../mindar-experiences/MindARTerreiro2.jsx';
import MindARTerreiro1 from '../mindar-experiences/MindARTerreiro1.jsx';
import MindARSoberania from '../mindar-experiences/MindARSoberania.jsx';
import MindARSebastião from '../mindar-experiences/MindARSebastião.jsx';

// 1. Create a registry map of your experiences
const EXPERIENCES = {
  escadaria: MindAREscadaria,
  terreiro1: MindARTerreiro1,
  terreiro2: MindARTerreiro2,
  convite: MindARConvite,
  djoao: MindARDJoao,
  nsraestrela: MindARNossaSraEstrela,
  dmaria: VideoARExperience,
  fonteagua: MindARFonteAgua,
  saudade: MindARSaudade,
  terramoto: MindARTerramoto,
  soberania: MindARSoberania,
  sebastiao: MindARSebastião
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

  // navegar em frente
  const currentExperienceIndex = Object.keys(EXPERIENCES).indexOf(experienceId);
  const nextIndex = (currentExperienceIndex + 1) % Object.keys(EXPERIENCES).length;
  const nextExperienceId = Object.keys(EXPERIENCES)[nextIndex];

  const handleNext = () => {
      // Navigate to the same component structure, but updating the state ID
      navigate('/ar-experience', { state: { experienceId: nextExperienceId } });
    };

  return (
    <div className="ar-experience-page">
      <button className="ar-back-btn" onClick={handleNext}>
        <IoArrowForwardOutline /> Próxima Experiência
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