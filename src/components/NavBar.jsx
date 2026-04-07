import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  IoMapOutline,
  IoListOutline,
  IoArrowBackOutline,
  IoArrowForwardOutline,
  IoHelpCircleOutline
} from "react-icons/io5";
import './NavBar.css';

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const routes = ["/tutorial", "/map", "/quadro-terreiro-paco"];

  const currentIndex = routes.indexOf(location.pathname);

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
    <nav className="nav-container">
      {/* Left Circle */}
      <button onClick={goBack} className="circle-button">
        <IoArrowBackOutline size={22} />
      </button>

      {/* Center Pill */}
      <div className="main-pill">
        <NavLink to="/tutorial" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <IoHelpCircleOutline size={24} />
        </NavLink>
        <NavLink to="/map" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <IoMapOutline size={24} />
        </NavLink>
        <NavLink to="/quadro-terreiro-paco" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <IoListOutline size={24} />
        </NavLink>
      </div>

      {/* Right Circle */}
      <button onClick={goNext} className="circle-button">
        <IoArrowForwardOutline size={22} />
      </button>
    </nav>
  );
};

export default NavBar;