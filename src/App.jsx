import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Tutorial from './pages/Tutorial';
import Soberania from './pages/Soberania';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        {/* When the URL is "/", show the Home component */}
        <Route path="/" element={<Home />} />
        <Route path="/tutorial" element={<Tutorial />} />
        <Route path="/soberania" element={<Soberania />} />
      </Routes>
    </Router>
  );
}

export default App;