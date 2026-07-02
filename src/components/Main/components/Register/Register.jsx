import { Link } from "react-router-dom";
import { useState } from "react";
import "../../../../../blocks/register.css";

const Register = ({ handleRegistration }) => {
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
    handleRegistration(data);
  };

  return (
    <div className="register">
      <p className="register__tittle">Regístrate</p>
      <form className="register__form" onSubmit={handleSubmit}>
        <label htmlFor="email"></label>
        <input
          className="form__input"
          placeholder="Correo electrónico"
          id="email"
          name="email"
          type="email"
          value={data.email}
          onChange={handleChange}
        />
        <label htmlFor="password"></label>
        <input
          className="form__input"
          placeholder="Contraseña"
          id="password"
          name="password"
          type="password"
          value={data.password}
          onChange={handleChange}
        />
        <button type="submit" className="register__button">
          Regístrate
        </button>
      </form>
      <div className="register__signup">
        <p>¿Ya eres miembro?</p>
        <Link to="/signin" className="register__link">
          Inicia sesión aquí
        </Link>
      </div>
    </div>
  );
};

export default Register;
