import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <Link to="/">GreenCart</Link>
        </div>

        {/* Hamburger Icon */}
        <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
          <span className={isOpen ? "bar open" : "bar"}></span>
          <span className={isOpen ? "bar open" : "bar"}></span>
          <span className={isOpen ? "bar open" : "bar"}></span>
        </div>

        {/* Nav Links */}
        <ul className={isOpen ? "nav-menu active" : "nav-menu"}>
          {isLoggedIn ? (
            <>
              <li>
                <Link to="/" onClick={() => setIsOpen(false)}>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/drivers" onClick={() => setIsOpen(false)}>
                  Drivers
                </Link>
              </li>
              <li>
                <Link to="/routes" onClick={() => setIsOpen(false)}>
                  Routes
                </Link>
              </li>
              <li>
                <Link to="/orders" onClick={() => setIsOpen(false)}>
                  Orders
                </Link>
              </li>
              <li>
                <Link to="/simulation" onClick={() => setIsOpen(false)}>
                  Simulation
                </Link>
              </li>
              <li>
                <button
                  className="logout-btn"
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" onClick={() => setIsOpen(false)}>
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
