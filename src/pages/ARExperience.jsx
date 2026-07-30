import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoArrowForwardOutline } from "react-icons/io5";

import MindAREscadaria from '../mindar-experiences/MindAREscadaria.jsx'; 
import MindARConvite from '../mindar-experiences/MindARConvite.jsx'; 
import MindARDJoao from '../mindar-experiences/MindARDJoao.jsx'; 
import MindARNossaSraEstrela from '../mindar-experiences/MindARNossaSraEstrela.jsx';
import VideoARExperience from '../videoar-experiences/VideoARExperience.jsx';
import MindARFonteAgua from '../mindar-experiences/MindARFonteAgua.jsx';
import MindARSaudade from '../mindar-experiences/MindARSaudade.jsx';
import MindARTerramoto from '../mindar-experiences/MindARTerramoto.jsx'; 
import MindARTerreiro2 from '../mindar-experiences/MindARTerreiro2.jsx';
import MindARTerreiro1 from '../mindar-experiences/MindARTerreiro1.jsx';
import MindARSoberania from '../mindar-experiences/MindARSoberania.jsx';
import MindARSebastião from '../mindar-experiences/MindARSebastião.jsx';
import MindARBustoRepublica from '../mindar-experiences/MindARBustoRepublica.jsx';
import MindARMusicos from '../mindar-experiences/MindARMusicos.jsx';
import './ARExperience.css';

// 1. Create a registry map of your experiences
const EXPERIENCES = {
  escadaria: MindAREscadaria,
  terreiro1: MindARTerreiro1,
  terreiro2: MindARTerreiro2,
  convite: MindARConvite,
  djoao: MindARDJoao,
  fonteagua: MindARFonteAgua,
  nsraestrela: MindARNossaSraEstrela,
  terramoto: MindARTerramoto,
  sebastiao: MindARSebastião,
  saudade: MindARSaudade,
  oretorno: VideoARExperience,
  bustorepublica: MindARBustoRepublica,
  soberania: MindARSoberania,
  musicos: MindARMusicos
};

// 2. Map each experience ID to the NEXT page route
const NEXT_ROUTES = {
  escadaria: "/quadro-terreiro-paco-2",
  terreiro2: "/quadro-terreiro-paco1",
  terreiro1: "/figura-convite",
  convite: "/djoao",
  djoao: "/fonte-agua",
  fonteagua: "/quadro-escombros",
  nsraestrela: "/terramoto",         // Verify if 'nsraestrela' is the ID for 'quadro-escombros'
  terramoto: "/gravura-marques",
  musicos: "/musicos",
  sebastiao: "/lenco-saudade",       // Verify if 'sebastiao' is the ID for 'gravura-marques'
  saudade: "/o-retorno",
  oretorno: "/busto-republica",
  bustorepublica: "/soberania",
  soberania: "/jardim"
};

function ARExperience() {
  const [showBtn, setShowBtn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Read the string ID from the state safely
  const { experienceId } = location.state || {};

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBtn(true); 
    }, 40000);

    return () => clearTimeout(timer); 
  }, []); 

  const handleTap = (e) => {
    console.log('tapped entity:', e.target);
  };

  // Resolve the actual component based on the key
  const TargetComponent = EXPERIENCES[experienceId];

  // 3. Navigate directly to the route of the next stop
  const handleNext = () => {
    const nextRoute = NEXT_ROUTES[experienceId];
    
    if (nextRoute) {
      navigate(nextRoute);
    } else {
      // Fallback in case there is no next route mapped or it's the end of the tour
      navigate('/listaexperiencias');
    }
  };

  return (
    <div className="ar-experience-page">
      {showBtn && (
        <button className="ar-back-btn" onClick={handleNext}>
          <IoArrowForwardOutline style={{ marginRight: '8px' }} /> Próxima Experiência
        </button>
      )}
      
      <div className="ar-viewer-container">
        {TargetComponent ? (
          <TargetComponent onTap={handleTap} />
        ) : (
          <p style={{ color: 'white', padding: '20px', zIndex: 10 }}>Experiência não encontrada.</p>
        )}
      </div>
    </div>
  );
}

export default ARExperience;