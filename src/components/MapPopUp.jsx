import React from "react";
import './MapPopUp.css';
import { IoIosClose } from "react-icons/io";


function MapPopUp({ headerName, onClose, imgSrc }) {
  return (
    <div className="pop-up-overlay" onClick={onClose}>
      <div className="pop-up" onClick={(e) => e.stopPropagation()}>
        <div className="pop-up-header">
          <h2>{headerName}</h2>
          <button className="pop-up-close" onClick={onClose}><IoIosClose size={24} /></button>
        </div>
        <div className="map-content-img">
          <img src={imgSrc} alt="Map" />
        </div>
        <p className="map-content-description-text">A experiência em execução encontra-se na sala assinalada com o retângulo cor-de-laranja.</p>
      </div>
    </div>
  );
}


export default MapPopUp;