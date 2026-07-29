import React, { useState } from "react";
import './LearnMorePopUp.css';
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

function LearnMorePopUp({
  headerName,
  onClose,
  imgSrc,
  imagesSrc = [],
  carousel = false,
  description,
  descriptionHeader = "Leia atentamente..."
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fall back to [imgSrc] if carousel is false or imagesSrc is empty
  const imageList = carousel && imagesSrc.length > 0 ? imagesSrc : [imgSrc];

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
          <button className="pop-up-close-btn" onClick={onClose}>Fechar</button>
        </div>

        <div className="learn-more-pop-up-content-img-div">
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

        <p className="learn-more-pop-up-content-description-text-header">{descriptionHeader}</p>
        <br />
        <p className="learn-more-pop-up-content-description-text">{description}</p>
      </div>
    </div>
  );
}

export default LearnMorePopUp;