import React, { useState } from 'react';
import './Tutorial.css';
import PageHeader from '../components/PageHeader';
import LogoHeader from '../components/LogoHeader';
import LearnMorePopUp from '../components/LearnMorePopUp';
import { IoArrowBackOutline } from "react-icons/io5";
import './Catalogo.css';


function Monumento () {
    return (
     <div className="page-wrapper">
      <LogoHeader />
        <div className="quadro-container">
            <div className="title-wrapper">
                <div className="title-btn-wrapper">
                    <button className="title-btn-back-btn" onClick={() => window.history.back()}>
                        <IoArrowBackOutline />
                    </button>
                    <PageHeader title="Monumento à J-u-s-t-i-ç-a" />
                </div>
            </div>
        </div>
    </div>
    );
}

export default Monumento;