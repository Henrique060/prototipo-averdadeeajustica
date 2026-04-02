import React from 'react';
import { NavLink } from 'react-router-dom';
import { IoHomeOutline, IoBookOutline, IoMapOutline, IoListOutline, IoArrowBackOutline, IoArrowForwardOutline } from "react-icons/io5";
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="bottom-nav">
      <NavLink to="/" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
        <IoArrowBackOutline size={24} />
      </NavLink>
      
      <NavLink to="/tutorial" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
        <IoBookOutline size={24} />
      </NavLink>
      
      <NavLink to="/map" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
        <IoMapOutline size={24} />
      </NavLink>
      
      <NavLink to="/list" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
        <IoListOutline size={24} />
      </NavLink>
      
      {/* For 'Back', you might want to use a button or a specific route */}
      <NavLink to="/settings" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
        
        <IoArrowForwardOutline size={24} />
      </NavLink>
    </nav>
  );
};

export default NavBar;