import React from 'react';
import { Link } from "react-router-dom";
import './header.css';

export const Header: React.FC = () => {

    return <div className="header-container">
        <div className="menu-item">
            <Link to='/photos'>Photos</Link>
        </div>
        <div className="menu-item">
            <Link to='/posts'>Posts</Link>
        </div>
        <div className="menu-item">
            <Link to='/form'>Form</Link>
        </div>
        <div className="menu-item">
            <Link to='/login'>Login</Link>
        </div>
    </div>
}
