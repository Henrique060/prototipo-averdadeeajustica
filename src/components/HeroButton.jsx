import React from 'react';
import { Link } from 'react-router-dom';
import './HeroButton.css';

function HeroButton({to, label, children, className = ""}) {
  return (
    <Link className={`hero-btn ${className}`} to={to}>
      {label}
      {children}
    </Link>
  );
}

export default HeroButton;
