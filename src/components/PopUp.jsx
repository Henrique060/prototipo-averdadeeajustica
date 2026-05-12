import React from "react";
import './PopUp.css';

function PopUp({ listOfItems, listOfURLs, headerName, onClose }) {
  return (
    <div className="pop-up-overlay" onClick={onClose}>
      <div className="pop-up" onClick={(e) => e.stopPropagation()}>
        <div className="pop-up-header">
          <h2>{headerName}</h2>
          <button className="pop-up-close" onClick={onClose}>✕</button>
        </div>
        <ul>
          {listOfItems.map((item, index) => (
            <li key={index}>
              <a href={listOfURLs[index]}>{item}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PopUp;