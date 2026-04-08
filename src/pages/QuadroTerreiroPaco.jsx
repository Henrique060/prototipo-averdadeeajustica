import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import NavBar from '../components/NavBar';
import LogoHeader from '../components/LogoHeader';
import './QuadroTerreiroPaco.css';
import StartButton from '../components/StartButton';

function QuadroTerreiroPaco() {
    return (
        <div className="page-wrapper">
            <LogoHeader />
            <NavBar />
            
            
            <div className="quadro-container">
                <img className="quadro-container-img" src="/images/terreiropaco.jpeg" alt="Quadro Terreiro Paco" />
                
                <div className="title-wrapper">
                    <p className="title-main">Terreiro</p>
                    <p className="title-side">do Paço</p>
                </div>

                <div className="quadro-container-text-wrapper">
                    <p className="quadro-container-text">
                        Texto que irá descrever a alegoria e experiência desejada.
                        <br/>
                        Deverá também este texto descrever ligeiramente o que se quer que o user faça.
                        <br/>
                        Mais informações sobre a experiência podem ser adicionadas aqui - falar com equipa.
                    </p>
                </div>
                <div className="quadro-container-button-wrapper">
                    <StartButton to="/tutorial" label="Começar" />
                </div>
            </div>
        </div>
    );
}

export default QuadroTerreiroPaco;