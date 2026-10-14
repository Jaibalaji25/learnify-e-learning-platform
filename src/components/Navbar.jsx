import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { BookOpen, Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo" onClick={closeMenu}>
          <span className="logo-icon">
            <BookOpen size={25} />
          </span>
          <span>Learnify</span>
        </Link>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>

        <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
          <NavLink to="/" end onClick={closeMenu}>
            Home
          </NavLink>

          <NavLink to="/courses" onClick={closeMenu}>
            Courses
          </NavLink>

          <NavLink to="/my-learning" onClick={closeMenu}>
            My Learning
          </NavLink>

          <div className="nav-auth">
            <Link to="/login" className="login-link" onClick={closeMenu}>
              Login
            </Link>

            <Link to="/register" className="register-btn" onClick={closeMenu}>
              Sign Up
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
