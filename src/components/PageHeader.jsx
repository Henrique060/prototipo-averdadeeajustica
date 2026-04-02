import React from 'react';
import { Link } from 'react-router-dom';
import './PageHeader.css';

function PageHeader({title, className=""}){
    return(
        <header className={`page-header ${className}`}>
            <h2>{title}</h2>
        </header>
    );
}

export default PageHeader;