import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // We will move your CSS here

function Home() {
  return (
    <div className="home-wrapper">
      <header>
        <h1>Exposições em WebAR</h1>
      </header>

      <main className="home-main">
        {/* React handles custom elements like <model-viewer> automatically */}
        <model-viewer 
          src="/models/monumentoJustica.glb" // Ensure this is in your public/models folder
          camera-controls
          ar
          ar-modes="webxr scene-viewer quick-look"
        >
          <button 
            slot="ar-button" 
            style={{
              backgroundColor: 'white', 
              borderRadius: '4px', 
              border: 'none', 
              position: 'absolute', 
              top: '16px', 
              right: '16px', 
              padding: '10px', 
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
          >
            👋 Exponha na sua sala!
          </button>
        </model-viewer>

        <div className="description">
          <p>Estátua 'Soberania'. Exposição do Mundo Português, Lisboa, 1940. Feita por Leopoldo de Almeida.</p>
        </div>

        <div className="button-container">
          {/* Link replaces <a href="..."> to stay within the React App */}
          <Link className="btn btn-secondary" to="/mindar">
            Experiência com marcador
          </Link>
        </div>
      </main>

      <footer>
        &copy; 2026 Henrique Matos 64369 FCUL
      </footer>
    </div>
  );
}

export default Home;