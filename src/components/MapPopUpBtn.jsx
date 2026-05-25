import React from "react";
import { MdNotListedLocation } from "react-icons/md";

import './MapPopUpBtn.css';

function MapPopUpBtn({ onClick, text }) {
  return (
    <button className="map-popup-btn" onClick={onClick}>
      <MdNotListedLocation size={18} />
    </button>
  );
}

export default MapPopUpBtn;
