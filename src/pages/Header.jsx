import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const checkAuthStatus = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/login/success`, {
        method: 'GET',
        credentials: 'include',
      });
        
      if (response.ok) {
        const data = await response.json();

        if (data.user) {
          setIsAuthenticated(true);
          navigate('/dashboard');
        }
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error checking authentication status:', error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const handleLogin = () => {
    window.open(`${import.meta.env.VITE_SERVER_URL}/auth/google`, '_self');
  };

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (!confirmLogout) {
      return;
    }
    try {
      await fetch(`${import.meta.env.VITE_SERVER_URL}/logout`, {
        method: 'GET',
        credentials: 'include',
      });
      setIsAuthenticated(false);
      navigate('/');
    } catch (error) {
      throw new Error("Error Logging Out");
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-container">
          <Link to="/" className="logo">
            Xeno Mini CRM & Campaign Management App
          </Link>
        </div>
        <nav className="nav-links">
          {isAuthenticated && (
            <>
              <Link to="/dashboard" className="nav-button">
                Dashboard
              </Link>
              <Link to="/customers" className="nav-button">
                Customers
              </Link>
              <Link to="/orders" className="nav-button">
                Orders
              </Link>
              <Link to="/audience" className="nav-button">
                Audience
              </Link>
              <Link to="/campaign" className="nav-button">
                Campaign
              </Link>
              <Link to="/messages" className="nav-button">
                Message
              </Link>
            </>
          )}
        </nav>
        <div className="auth-button">
          {isAuthenticated ? (
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <button className="login-btn" onClick={handleLogin}>
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
