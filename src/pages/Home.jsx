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
        </div>
      </div>

      <section className='buttons-section'>
        <div className="button-row">
            <Link className="btnNavEmpty" to="/">
            </Link>
            <Link className="btnNav btnNav-secondary" to="/tutorial">
              <img src="/icons/front-arrow.svg" alt="Seguinte" />
              
            </Link>
        </div>
        </section>

          
      </main>
    </div>
  );
}

export default Home;