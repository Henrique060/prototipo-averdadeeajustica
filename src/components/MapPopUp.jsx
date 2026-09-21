import React, { useState } from "react";
import './MapPopUp.css';
import { IoIosClose } from "react-icons/io";


function MapPopUp({ 
  headerName, 
  onClose, 
  imgSrc, 
  carousel = false,
  imagesSrc = [],
  textDescr="A experiência em execução encontra-se na sala assinalada com o retângulo cor-de-laranja." }) {

    const [currentIndex, setCurrentIndex] = useState(0);
    
      // Fall back to [imgSrc] if carousel is false or imagesSrc is empty
      const imageList =
        carousel && Array.isArray(imagesSrc) && imagesSrc.length > 0
          ? imagesSrc
          : [imgSrc ?? (typeof imagesSrc === "string" ? imagesSrc : undefined)].filter(Boolean);
    
      const handlePrev = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev === 0 ? imageList.length - 1 : prev - 1));
      };
    
      const handleNext = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev === imageList.length - 1 ? 0 : prev + 1));
      };
    
      const handleDotClick = (index, e) => {
        e.stopPropagation();
        setCurrentIndex(index);
      };

  return (
    <div className="pop-up-overlay" onClick={onClose}>
      <div className="pop-up" onClick={(e) => e.stopPropagation()}>
        <div className="pop-up-header">
          <h2>{headerName}</h2>
          <button className="pop-up-close" onClick={onClose}><IoIosClose size={24} /></button>
        </div>
        <div className="map-content-img">
          <img
            src={imageList[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
          />

          {carousel && imageList.length > 1 && (
            <>
              <button
                type="button"
                className="carousel-btn prev"
                onClick={handlePrev}
                aria-label="Imagem anterior"
              >
                {"<"}
              </button>

              <button
                type="button"
                className="carousel-btn next"
                onClick={handleNext}
                aria-label="Próxima imagem"
              >
                {">"}
              </button>

              <div className="carousel-dots">
                {imageList.map((_, idx) => (
                  <span
                    key={idx}
                    className={`carousel-dot ${idx === currentIndex ? "active" : ""}`}
                    onClick={(e) => handleDotClick(idx, e)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        <p className="map-content-description-text">{textDescr}</p>
      </div>
    </div>
  );
}


export default MapPopUp;