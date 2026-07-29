import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Tutorial from './pages/Tutorial';
import QuadroTerreiroPaco from './pages/QuadroTerreiroPaco';
import Map from './pages/Map';
import QuadroAR from './pages/QuadroAR';
import DJoao from './pages/DJoao';
import ListaExperiencias from './pages/ListaExperiencias';
import FiguraConvite from './pages/FiguraConvite';
import Escadaria from './pages/Escadaria';
import QuadroEscombros from './pages/QuadroEscombros';
import GravuraMarques from './pages/GravuraMarques';
import ORetorno from './pages/ORetorno';
import LencoSaudade from './pages/LencoSaudade';
import BustoRepublica from './pages/BustoRepublica';
import Descobrimentos from './pages/Descobrimentos';
import Soberania from './pages/Soberania';
import Jardim from './pages/Jardim';
import ARExperience from './pages/ARExperience';
import ChromaPage from './pages/ChromaPage';
import ThesisProjectPage from './pages/ThesisProjectPage';
import Catalogo from './pages/Catalogo';
import VideoARExperience from './videoar-experiences/VideoARExperience';
import FonteAgua from './pages/FonteAgua';
import Terramoto from './pages/Terramoto';
import QuadroTerreiroPaco2 from './pages/QuadroTerreiroPaco2';
import Monumento from './pages/Monumento';
import MonumentoQuestionario from './pages/MonumentoQuestionario';
import DJoseMusicos from './pages/DJoseMusicos';
import FinalPage from './pages/FinalPage';
import './App.css';
import SoberaniaCatalogo from './pages/SoberaniaCatalogo';


function SplashScreen({ onDone }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 1500); // show for 2.5s
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="splash-screen">
      <img src="/images/miratecnica.webp" alt="logo-splash" className="splash-logo" />
    </div>
  );
}

function App() {

  const [showSplash, setShowSplash] = useState(() => {
    return !sessionStorage.getItem('splashShown');
  });

  return (
    <>
      {showSplash ? (
        <SplashScreen onDone={() => {
          sessionStorage.setItem('splashShown', 'true');
          setShowSplash(false);
        }} />
      ) : (
        <Router>
          <Routes>
            <Route path="/quadro-ar" element={<QuadroAR />} />
            <Route path="/" element={<Home />} />
            <Route path="/tutorial" element={<Tutorial />} />
            <Route path="/map" element={<Map />} />
            <Route path="/listaexperiencias" element={<ListaExperiencias />} />
            <Route path="/figura-convite" element={<FiguraConvite />} />
            <Route path="/quadro-escombros" element={<QuadroEscombros />} />
            <Route path="/gravura-marques" element={<GravuraMarques />} />
            <Route path="/o-retorno" element={<ORetorno />} />
            <Route path="/lenco-saudade" element={<LencoSaudade />} />
            <Route path="/busto-republica" element={<BustoRepublica />} />
            <Route path="/escadaria" element={<Escadaria />} />
            <Route path="/quadro-terreiro-paco" element={<QuadroTerreiroPaco />} />
            <Route path="/quadro-terreiro-paco-2" element={<QuadroTerreiroPaco2 />} />
            <Route path="/djoao" element={<DJoao />} />
            <Route path="/descobrimentos" element={<Descobrimentos />} />
            <Route path="/soberania" element={<Soberania />} />
            <Route path="/jardim" element={<Jardim />} />
            <Route path="/ar-experience" element={<ARExperience />} />
            <Route path="/chroma-page" element={<ChromaPage />} />
            <Route path="/thesis-project-page" element={<ThesisProjectPage />} />
            <Route path="/video-ar-experience" element={<VideoARExperience />} />
            <Route path="/fonte-agua" element={<FonteAgua />} />
            <Route path="/terramoto" element={<Terramoto />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/monumento" element={<Monumento />} />
            <Route path="/musicos" element={<DJoseMusicos />} />
            <Route path="/monumento-questionario" element={<MonumentoQuestionario />} />
            <Route path="/final-page" element={<FinalPage />} />
            <Route path="/soberania-catalogo" element={<SoberaniaCatalogo />} />
          </Routes>
        </Router>
      )}
    </>
  );
}

export default App;