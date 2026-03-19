import React , {useState} from 'react';
import { Link } from 'react-router-dom';
import './Experiences.css'; // We will move your CSS here
import MindARViewer from '../mindar-viewer';

function Soberania() {
    const [started, setStarted] = useState(null);

    return (
        <div className="App">
        <h1>Example React component with <a href="https://github.com/hiukim/mind-ar-js" target="_blank">MindAR</a></h1>

        <div className="control-buttons">
            {started === null && <button onClick={() => {setStarted('aframe')}}>Start AFRAME version</button>}
            {started !== null && <button onClick={() => {setStarted(null)}}>Stop</button>}
        </div>

        {started === 'aframe' && (
            <div className="container">
            <MindARViewer/>
            <video></video>
            </div>
        )}
        </div>
  );
}

export default Soberania;