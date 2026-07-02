import logo from "../../../images/logo.png";
import { useLocation, Link } from "react-router-dom";

function Header({ isLoggedIn, onLogout, currentUser }) {
  const location = useLocation();

  const whoIsTheUser = () => {
    if (isLoggedIn) {
      return (
        <>
          <p className="header__user">{currentUser}</p>
          <button onClick={onLogout} className="header__logout">
            Cerrar sesión
          </button>
        </>
      );
    }

    if (location.pathname === "/signin") {
      return (
        <Link to="/signup" className="header__link">
          Regístrate
        </Link>
      );
    }

    if (location.pathname === "/signup") {
      return (
        <Link to="/signin" className="header__link">
          Iniciar sesión
        </Link>
      );
    }

    return null;
  };

  return (
    <header className="header page__section">
      <img
        src={logo}
        alt="Around the México logo"
        className="logo header__logo"
      />
      {whoIsTheUser()}
    </header>
  );
}

export default Header;
