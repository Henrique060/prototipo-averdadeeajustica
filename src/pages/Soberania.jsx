import React , {useState} from 'react';
import { Link } from 'react-router-dom';
import './Experiences.css'; // We will move your CSS here
import MindARViewer from '../mindar-viewer';

function Soberania() {
    const [started, setStarted] = useState(null);

    return (
        <div className="home-wrapper">
            <header>
                <h2>Estátua Soberania</h2>
                <p>Explore a interatividade da Estátua Soberania em AR.</p>
            </header>
        

        <div className="control-buttons">
            {started === null && <button class="btn" onClick={() => {setStarted('aframe')}}>Begin AR Experience</button>}
            {started !== null && <button class="btn" onClick={() => {setStarted(null)}}>Stop</button>}
        </div>

        <div className="video-container">
            {started === 'aframe' && (
                <div className="cameraContainer">
                    <MindARViewer/>
                    <video 
                        id="mindar-video"
                        className="videoAR"
                        autoPlay
                        playsInline
                        muted
                    ></video>
                </div>
            )}
        </div>

        <section className='buttons-section'>
                <div className="button-row">
                    <Link className="btnNav btnNav-secondary" to="/Tutorial">
                      <img src="/icons/back-arrow.svg" alt="Voltar" />
                      
                    </Link>
                    <Link className="btnNav btnNav-secondary" to="/soberania">
                      <img src="/icons/front-arrow.svg" alt="Seguinte" />
                      
                    </Link>
                </div>
                </section>

        </div>
        
  )
}

export default Soberania;