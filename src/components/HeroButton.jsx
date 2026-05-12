import React from 'react';
import { Link } from 'react-router-dom';
import './HeroButton.css';

function HeroButton({to, label, children, className = "", onClick}) {
  return (
    <Link className={`hero-btn ${className}`} to={to} onClick={onClick}>
      {label}
      {children}
    </Link>
  );
}

export default HeroButton;
