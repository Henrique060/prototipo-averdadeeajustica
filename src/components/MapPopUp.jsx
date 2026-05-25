import React from "react";
import './PopUp.css';

function MapPopUp({ headerName, onClose }) {
  return (
    <div className="pop-up-overlay" onClick={onClose}>
      <div className="pop-up" onClick={(e) => e.stopPropagation()}>
        <div className="pop-up-header">
          <h2>{headerName}</h2>
          <button className="pop-up-close" onClick={onClose}>✕</button>
        </div>
        <div className="map-content-img">
          <img src="/images/mapa-museu.png" alt="Map" />
        </div>
      </div>
    </div>
  );
}

export default MapPopUp;