
import { NavLink } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

function Header() {
  const { theme, toggleTheme } = useAppContext();

  return (
    <header className="site-header">
      <NavLink to="/" className="brand">
        <svg
          className="brand-logo"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M12 2H35L25 15H36L12 38L17 22H5L12 2Z"
            fill="#8B5CF6"
          />
        </svg>

        <span>CineGrid <span className="brand-subtitle">— Movie Dashboard</span></span>
      </NavLink>

      <nav className="site-nav">
        <NavLink to="/" end className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }>
          Home
        </NavLink>

        <NavLink to="/about" className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }>
          About
        </NavLink>
      </nav>

      <button
        type="button"
        className="theme-toggle"
        onClick={toggleTheme}
      >
        {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
      </button>
    </header>
  );
}

export default Header;
