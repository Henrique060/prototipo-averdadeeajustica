import React from 'react';
import { Link } from 'react-router-dom';
import './StartButton.css';

function StartButton({to, label, children, className = "", onClick}) {
  return (
    <Link className={`start-btn ${className}`} to={to} onClick={onClick}>
      {label}
      {children}
    </Link>
  );
}

export default StartButton;
