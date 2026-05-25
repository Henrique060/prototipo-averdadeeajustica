import React from "react";
import './LearnMorePopUp.css';
import { IoIosClose } from "react-icons/io";


function LearnMorePopUp({ headerName, onClose, imgSrc, description}) {
  return (
    <div className="pop-up-overlay" onClick={onClose}>
      <div className="pop-up" onClick={(e) => e.stopPropagation()}>
        <div className="pop-up-header">
          <h2>{headerName}</h2>
          <button className="pop-up-close" onClick={onClose}><IoIosClose size={24} /></button>
        </div>
        <div className="learn-more-pop-up-content-img-div">
          <img src={imgSrc} alt="Map" />
        </div>
        <p className="learn-more-pop-up-content-description-text">{description}</p>
      </div>
    </div>
  );
}

export default LearnMorePopUp;