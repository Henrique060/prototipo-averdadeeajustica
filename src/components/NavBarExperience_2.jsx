import React from 'react';
import {useState} from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  IoMapOutline,
  IoListOutline,
  IoArrowBackOutline,
  IoArrowForwardOutline,
  IoHelpCircleOutline,
  IoAlertCircleOutline
} from "react-icons/io5";
import { GoHome } from "react-icons/go";
import { VscDebugStart } from "react-icons/vsc";
import { GrFormNextLink } from "react-icons/gr";
import { GrFormPreviousLink } from "react-icons/gr";
import './NavBar2.css';

const NavBarExperience_2 = () => {

  let inactiveColor = "#A0A0A0";
  let btnActiveColor = "#003C72";

  const navigate = useNavigate();
  const location = useLocation();

  const routes = ["/escadaria", "/quadro-terreiro-paco", "/quadro-terreiro-paco-2", "/figura-convite", 
                  "/djoao", "/fonte-agua", "/quadro-escombros", "/terramoto", "/gravura-marques",
                  "/d-maria", "/lenco-saudade", "/busto-republica",
                  "/descobrimentos", "/soberania", "/jardim"
  ];

  //const currentIndex = routes.indexOf(location.pathname);
  const currentIndex = routes.findIndex(r => location.pathname.endsWith(r));

  const goNext = () => {
    if (currentIndex < routes.length - 1) {
      navigate(routes[currentIndex + 1]);
    }
  };

  const goBack = () => {
    if (currentIndex > 0) {
      navigate(routes[currentIndex - 1]);
    }
  };

  return (
    <nav className="nav-container-2">

      {/* Center Pill */}
      <div className="main-pill-2">
        <NavLink to="/listaexperiencias" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <div className="icon-text-container">
            <IoMapOutline size={18} />
          </div>
        </NavLink>
      </div>

      <div className="back-forward-buttons">
        <button
          onClick={goNext}
          className="square-forward-btn"
          disabled={currentIndex >= routes.length - 1}
          style={{ color: currentIndex >= routes.length - 1 ? inactiveColor : btnActiveColor }}
        >
          <div className="icon-text-container">
            <GrFormNextLink size={24} />
          </div>
        </button>
      </div>
    </nav>
  );
};

export default NavBarExperience_2;