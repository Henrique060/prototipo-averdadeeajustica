import React from 'react';
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
import DMaria from './pages/DMaria';
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
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        {/* When the URL is "/", show the Home component */}
        <Route path="/quadro-ar" element={<QuadroAR />} />
        <Route path="/" element={<Home />} />
        <Route path="/tutorial" element={<Tutorial />} />
        <Route path="/map" element={<Map />} />
        <Route path="/listaexperiencias" element={<ListaExperiencias />} />
        <Route path="/figura-convite" element={<FiguraConvite />} />
        <Route path="/quadro-escombros" element={<QuadroEscombros />} />
        <Route path="/gravura-marques" element={<GravuraMarques />} />
        <Route path="/d-maria" element={<DMaria />} />
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
      </Routes>
    </Router>
  );
}

export default App;