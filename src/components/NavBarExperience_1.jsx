import React from 'react';
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
import './NavBar.css';

const NavBarExperience_1 = () => {

  
  const navigate = useNavigate();
  const location = useLocation();

  const routes = ["/tutorial", "/map", "/quadro-terreiro-paco"];

  const currentIndex = routes.indexOf(location.pathname);

  const goNext = () => {

  };

  const goBack = () => {
    if (currentIndex > 0) {
      navigate(routes[currentIndex - 1]);
    }
  };

  return (
    <nav className="nav-container">

      {/* Center Pill */}
      <div className="main-pill">
        <NavLink to="/" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <div className="icon-text-container">
            <GoHome size={18} />
            <p className="ic-text">Home</p>
          </div>
        </NavLink>
        <NavLink to="/tutorial" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <div className="icon-text-container">
            <IoAlertCircleOutline size={18} />
            <p className="ic-text">Tutorial</p>
          </div>
        </NavLink>
        <NavLink to="/listaexperiencias" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <div className="icon-text-container">
            <IoMapOutline size={18} />
            <p className="ic-text">Mapa</p>
          </div>
        </NavLink>
      </div>

        <NavLink to="/djoao" className="square-start-btn">
        <div className="icon-text-container">
          <GrFormNextLink size={18} />
          <p className="ic-text-start">Próximo</p>
        </div>
      </NavLink>
    </nav>
  );
};

export default NavBarExperience_1;