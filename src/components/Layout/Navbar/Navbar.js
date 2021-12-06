import React from 'react';
// import {Navbar, Container } from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const NavBar = () => {
    return (
        <nav className="navbar navbar-dark bg-dark">
            <a className="navbar-brand" href="/">THE ACADEMY</a>
        </nav>
    )
}

export default NavBar;