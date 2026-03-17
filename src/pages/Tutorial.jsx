import React from 'react';
import { Link } from 'react-router-dom';
import './Tutorial.css'; // We will move your CSS here

function Tutorial() {
  return (
    <div className="home-wrapper">
      <header className='tutorial-header'>
        <div className="header-container">
          <h2>Como funciona <br/> A Verdade  e a <br/> J-u-s-t-i-c-a?</h2>
          <nav>
            <input type="checkbox" id="check" />
            <label htmlFor="check" className="checkbtn">
              <i className="fas fa-bars"></i>
            </label>
            <div className="nav-mobile">
              <a href="#">Home</a>
              <a href="#">Tutorial</a>
              <a href="#">Soberania</a>
              <a href="#">Sufrágio</a>
              <a href="#">Monumento</a>
            </div>
          </nav>
        </div>
      </header>

      <main className="home-main">
      
       <section className='observe-interact-exp-section'>
        <div className='interactive-exp-container'>
          <div className='interactive-exp-header'>
            <h2>Observe as peças</h2>
          </div>
          <div className='interactive-exp-content'>
            <img className='img-interactive' src="/images/pcomercio.jpeg" alt='Descrição da imagem' />
          </div>
          <div className='interactive-exp-description'>
            <p>Descrição da observação com as peças.</p>
          </div>
        </div>

        
        <div className='interactive-exp-container'>
          <div className='interactive-exp-header'>
            <h2>Interaja com as peças</h2>
          </div>
          <div className='interactive-exp-content'>
            <img className='img-interactive' src="/images/pcomercio.jpeg" alt='Descrição da imagem' />
          </div>
          <div className='interactive-exp-description'>
            <p>Descrição da interação com as peças.</p>
          </div>
        </div>
       </section>
       
       <section className='buttons-section'>
        <div className="button-row">
            <Link className="btn btn-secondary" to="/">
            Anterior
            </Link>
            <Link className="btn btn-secondary" to="/mindar">
            Seguinte
            </Link>
        </div>
        </section>

      </main>

      <footer>
        &copy; 2026 Henrique Matos 64369 FCUL
      </footer>
    </div>
  );
}

export default Tutorial;