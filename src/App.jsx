import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Tutorial from './pages/Tutorial';
import QuadroTerreiroPaco from './pages/QuadroTerreiroPaco';
import Map from './pages/Map';
import QuadroAR from './pages/QuadroAR';
import DJoao from './pages/DJoao';
import ListaExperiencias from './pages/ListaExperiencias';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        {/* When the URL is "/", show the Home component */}
        <Route path="/" element={<Home />} />
        <Route path="/tutorial" element={<Tutorial />} />
        <Route path="/map" element={<Map />} />
        <Route path="/quadro-terreiro-paco" element={<QuadroTerreiroPaco />} />
        <Route path="/quadro-ar" element={<QuadroAR />} />
        <Route path="/djoao" element={<DJoao />} />
        <Route path="/listaexperiencias" element={<ListaExperiencias />} />
      </Routes>
    </Router>
  );
}

export default App;