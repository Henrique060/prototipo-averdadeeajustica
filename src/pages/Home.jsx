import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // We will move your CSS here

function Home() {
  return (
    <div className="home-wrapper">
      <section className="hero">
        
        <Link className="hero-btn" to="/tutorial">
          Iniciar Experiência
        </Link>

      </section>
    </div>
  );
}

export default Home;