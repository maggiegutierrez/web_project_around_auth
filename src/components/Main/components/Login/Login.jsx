import { Link } from "react-router-dom";
import { useState } from "react";
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
      <p className="login__tittle">Inicia Sesión</p>
      <form className="login__form" onSubmit={handleSubmit}>
        <label htmlFor="email"></label>
        <input
          className="form__input"
          id="email"
          required
          placeholder="Correo electrónico"
          name="email"
          type="email"
          value={data.email}
          onChange={handleChange}
        />
        <label htmlFor="password"></label>
        <input
          className="form__input"
          id="password"
          required
          placeholder="Contraseña"
          name="password"
          type="password"
          value={data.password}
          onChange={handleChange}
        />
        <button type="submit" className="login__button">
          Inicia sesión
        </button>
      </form>

      <div className="login__signin">
        <p>¿Aún no eres miembro?</p>
        <Link to="/signup" className="signin__link">
          Regístrate aquí
        </Link>
      </div>
    </div>
  );
};

export default Login;
