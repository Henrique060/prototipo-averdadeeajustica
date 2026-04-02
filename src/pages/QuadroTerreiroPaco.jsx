import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import NavBar from '../components/NavBar';
import LogoHeader from '../components/LogoHeader';
import './QuadroTerreiroPaco.css';

function QuadroTerreiroPaco() {
    return (
        <div className="page-wrapper">
            <LogoHeader />
            <PageHeader title="Experiência de AR" />
            <NavBar />
        </div>
    );
}

export default QuadroTerreiroPaco;