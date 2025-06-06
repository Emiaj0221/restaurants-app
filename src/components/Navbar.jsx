import React from 'react'
import { FaUtensils } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <FaUtensils className="logo-icon" />
          <span>Directorio de Restaurantes</span>
        </Link>
        
        <div className="navbar-links">
          <Link to="/" className="nav-link">Inicio</Link>
          <Link to="/new" className="nav-link">Nuevo</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
