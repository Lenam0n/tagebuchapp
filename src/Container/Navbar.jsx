import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ currentPage, setCurrentPage, toggleSidebar, isOpen, setIsOpen, handleLogout }) => {
  const handleLinkClick = (page) => {
    setCurrentPage(page);
    setIsOpen(false); // Close sidebar after clicking a link
  };

  return (
    <div>
      <nav className={`navbar ${isOpen ? 'open' : ''}`}>
        <div className="navbar-logo">
          <Link to="/" onClick={() => handleLinkClick('Positivity')}>
            <img
              src={"https://picsum.photos/130/130"}
              alt="Logo"
            />
          </Link>
        </div>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link
              to="/analysis"
              onClick={() => handleLinkClick('Analysis')}
              className={`navbar-link ${currentPage === 'Analysis' ? 'active' : ''}`}
            >
              Analysis
            </Link>
          </li>
          <li className="navbar-item">
            <Link
              to="/weekend"
              onClick={() => handleLinkClick('Weekend')}
              className={`navbar-link ${currentPage === 'Weekend' ? 'active' : ''}`}
            >
              Weekend Diary
            </Link>
          </li>
          <li className="navbar-item">
            <Link
              to="/positivity"
              onClick={() => handleLinkClick('Positivity')}
              className={`navbar-link ${currentPage === 'Positivity' ? 'active' : ''}`}
            >
              Positivity Diary
            </Link>
          </li>
          <li className="navbar-item">
            <Link
              to="/login"
              onClick={() => {
                handleLogout();
                handleLinkClick('Login');
              }}
              className="navbar-link"
            >
              Logout
            </Link>
          </li>
        </ul>
      </nav>
      {/* Sidebar Toggle Button */}
      <div
        className={`sidebar-toggle ${isOpen ? 'open' : ''}`}
        onClick={toggleSidebar}
        style={{ left: isOpen ? '250px' : '40px' }} // Adjust based on navbar width
      >
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </div>
  );
};

export default Navbar;