import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // We will move your CSS here

function Home() {
  return (
    <div className="home-wrapper">
      

      <main className="home-main">
        {/* React handles custom elements like <model-viewer> automatically */}

        <div className="container-flex">
        <div className="container-flex-item-3">
          <a className="btn" href="/tutorial">Iniciar</a>
        </div>
      </div>

      </main>
    </div>
  );
}

export default Home;