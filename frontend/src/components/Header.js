import React from 'react'
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
export default function Header() {
    return (
        <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container">
    <NavLink className="navbar-brand" to="/">Proshop</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link text-white" to="/cart"> <i className="fas fa-shopping-cart"></i> Cart</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link text-white" to="/login"> <i className="fas fa-user"></i> Sign in</NavLink>
        </li>
      </ul>
    </div>
  </div>
</nav>
        </div>
    )
}
