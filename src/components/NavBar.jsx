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
import { HiOutlineBuildingStorefront } from "react-icons/hi2";
import { GoHome } from "react-icons/go";
import { VscDebugStart } from "react-icons/vsc";
import './NavBar.css';

const NavBar = () => {

  
  const navigate = useNavigate();
  const location = useLocation();

  const routes = ["/tutorial", "/map", "/quadro-terreiro-paco", "/recompensa"];

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
        <NavLink to="/thesis-project-page" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <div className="icon-text-container">
            <GoHome size={18} />
            <p className="ic-text">Projeto</p>
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
            <p className="ic-text">Salas</p>
          </div>
        </NavLink>
        <NavLink to="/recompensa" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <div className="icon-text-container">
            <HiOutlineBuildingStorefront size={18} />
            <p className="ic-text">Souvenirs</p>
          </div>
        </NavLink>
      </div>

        <NavLink to="/escadaria" className="square-start-btn">
        <div className="icon-text-container">
          <VscDebugStart size={18} />
          <p className="ic-text-start">Iniciar</p>
        </div>
      </NavLink>
    </nav>
  );
};

export default NavBar;