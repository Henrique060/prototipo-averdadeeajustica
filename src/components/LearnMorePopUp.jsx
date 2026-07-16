import React from "react";
import './LearnMorePopUp.css';
import { IoCloseOutline } from "react-icons/io5";


function LearnMorePopUp({ headerName, onClose, imgSrc, description}) {
  return (
    <div className="pop-up-overlay" onClick={onClose}>
      <div className="pop-up" onClick={(e) => e.stopPropagation()}>
        <div className="pop-up-header">
          <h2>{headerName}</h2>
          <button className="pop-up-close-btn" onClick={onClose}>Fechar</button>
        </div>
        <div className="learn-more-pop-up-content-img-div">
          <img src={imgSrc} alt="Map" />
        </div>
        <p className="learn-more-pop-up-content-description-text-header">Leia atentamente...</p>
        <br/>
        <p className="learn-more-pop-up-content-description-text">{description}</p>
      </div>
    </div>
  );
}

export default LearnMorePopUp;