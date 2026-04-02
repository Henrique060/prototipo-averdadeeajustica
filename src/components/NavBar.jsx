import React from 'react';
import { NavLink } from 'react-router-dom';
import { IoHomeOutline, IoBookOutline, IoMapOutline, IoListOutline, IoArrowBackOutline, IoArrowForwardOutline, IoHelpCircleOutline} from "react-icons/io5";
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="nav-container">
      {/* Left Circle */}
      <NavLink to={-1} className="circle-button">
        <IoArrowBackOutline size={22} />
      </NavLink>

      {/* Center Pill */}
      <div className="main-pill">
        <NavLink to="/tutorial" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <IoHelpCircleOutline size={24} />
        </NavLink>
        <NavLink to="/map" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <IoMapOutline size={24} />
        </NavLink>
        <NavLink to="/list" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <IoListOutline size={24} />
        </NavLink>
      </div>

      {/* Right Circle */}
      <NavLink to="/quadro-terreiro-paco" className="circle-button">
        <IoArrowForwardOutline size={22} />
      </NavLink>
    </nav>
  );
};

export default NavBar;