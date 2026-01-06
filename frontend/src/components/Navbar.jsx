import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext"; // Import Hook

const Navbar = ({ setShowLogin }) => {
  const { user, logout } = useApp(); // Use Global State
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-icon"><img src="/src/assets/logo.png" alt="Imagify Logo"  class ="logo-img"/></span>
          <span className="logo-text">Imagify</span>
        </Link>

        <div className="nav-links">
          <Link to="/pricing" className="nav-link">Pricing</Link>
          
          {user ? (
            <div className="user-section">
              {/* Credit Display */}
              <div className="credit-badge">
                ⚡ {user.credits} left
              </div>

              <span className="user-greeting">Hi, {user.name}</span>
              <button 
                onClick={() => {
                  logout(); 
                  navigate("/"); 
                }} 
                className="logout-btn"
              >
                Logout
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setShowLogin(true)} 
              className="login-btn"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
