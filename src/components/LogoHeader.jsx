import React from 'react';
import { Link } from 'react-router-dom';
import './LogoHeader.css';

function LogoHeader() {
    return (
        <header className="logo-header">
            <Link to="/">
                <img src="/images/small-logo-avj.webp" alt="Logo" />
            </Link>
        </header>
    );
}

export default LogoHeader;