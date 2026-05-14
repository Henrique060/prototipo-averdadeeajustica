import React from 'react';
import LogoHeader from './LogoHeader';
import NavBarExperience from './NavBarExperience_1';
import StartButton from './StartButton';
import './ExperiencePageComponent.css';
import NavBarExperience_2 from './NavBarExperience_2';

function ExperiencePageComponent({ imageSrc, imageAlt, titleMain, titleSide, description, buttonTo, buttonLabel }) {
  return (
    <div className="page-wrapper">
      <LogoHeader />
      <div className="quadro-container">
        <img className="quadro-container-img" src={imageSrc} alt={imageAlt} />
        <div className="title-wrapper">
          <p className="title-main">{titleMain}</p>
          <p className="title-side">{titleSide}</p>
        </div>
        <div className="quadro-container-text-wrapper">
          <p className="quadro-container-text">{description}</p>
        </div>
        <div className="quadro-container-button-wrapper">
          <StartButton to={buttonTo} label={buttonLabel} />
        </div>
      </div>
      <NavBarExperience_2 />
    </div>
  );
}

export default ExperiencePageComponent;