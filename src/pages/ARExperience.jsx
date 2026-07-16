import React, { use } from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoArrowForwardOutline } from "react-icons/io5";
import MindAREscadaria from '../mindar-experiences/MindAREscadaria.jsx'; 
import MindARConvite from '../mindar-experiences/MindARConvite.jsx'; 
import MindARDJoao from '../mindar-experiences/MindARDJoao.jsx'; 
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
import MindARBustoRepublica from '../mindar-experiences/MindARBustoRepublica.jsx';

// 1. Create a registry map of your experiences (Fine to keep outside)
const EXPERIENCES = {
  escadaria: MindAREscadaria,
  terreiro1: MindARTerreiro1,
  terreiro2: MindARTerreiro2,
  convite: MindARConvite,
  djoao: MindARDJoao,
  nsraestrela: MindARNossaSraEstrela,
  oretorno: VideoARExperience,
  fonteagua: MindARFonteAgua,
  saudade: MindARSaudade,
  terramoto: MindARTerramoto,
  soberania: MindARSoberania,
  sebastiao: MindARSebastião,
  bustorepublica: MindARBustoRepublica,
};

function ARExperience() {
  // 👇 FIXED: Moved Hooks inside the component function
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBtn(true); // Explicitly set to true after 10s
    }, 10000);

    return () => clearTimeout(timer); // Cleanup timer if user leaves early
  }, []); // Empty dependency array ensures this runs once on mount

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
      {showBtn && (
        <button className="ar-back-btn" onClick={handleNext}>
          <IoArrowForwardOutline /> Próxima Experiência
        </button>
      )}
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