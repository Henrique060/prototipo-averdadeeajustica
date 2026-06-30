import React from "react";
import { FaQuestion } from "react-icons/fa";


import './MapPopUpBtn.css';

function HelpPopUpBtn({ onClick, text, className="map-popup-btn" }) {
  return (
    <button className={className} onClick={onClick}>
      <FaQuestion size={18} />
    </button>
  );
}

export default HelpPopUpBtn;
