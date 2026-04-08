import React from 'react';
import { Link } from 'react-router-dom';
import './StartButton.css';

function StartButton({to, label, children, className = ""}) {
  return (
    <Link className={`start-btn ${className}`} to={to}>
      {label}
      {children}
    </Link>
  );
}

export default StartButton;
