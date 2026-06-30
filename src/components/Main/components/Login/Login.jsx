import { Link } from "react-router-dom";
import { useState } from "react";
import Logo from "../../../../../images/logo.png";
import "../../../../../blocks/login.css";

const Login = ({ handleLogin }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(data);
  };

  return (
    <div className="login">
      <p className="login__welcome">Inicia Sesión</p>
      <form className="login__form" onSubmit={handleSubmit}>
        <label htmlFor="email">Correo electrónico</label>
        <input
          id="email"
          required
          name="email"
          type="email"
          value={data.email}
          onChange={handleChange}
        />
        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          required
          name="password"
          type="password"
          value={data.password}
          onChange={handleChange}
        />
        <div className="login__button-container">
          <button type="submit" className="login__link">
            Inicia sesión
          </button>
        </div>
      </form>

      <div className="login__signup">
        <p>¿Aún no eres miembro?</p>
        <Link to="/signup" className="signup__link">
          Regístrate aquí
        </Link>
      </div>
    </div>
  );
};

export default Login;
