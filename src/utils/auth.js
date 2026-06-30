export const BASE_URL = "https://se-register-api.en.tripleten-services.com/v1";
const TOKEN_KEY = "jwt";

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      email: email,
    }),
  }).then((res) => {
    return res.ok
      ? res.json()
      : Promise.reject(`Error en el registro ${res.status}`);
  });
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      email: email,
    }),
  })
    .then((res) => {
      return res.ok
        ? res.json()
        : Promise.reject(`Error en el inicio de sesión ${res.status}`);
    })
    .then((data) => {
      return localStorage.setItem(TOKEN_KEY, data.token);
    });
};

export const login = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
    },
  }).then((res) => {
    return res.ok
      ? res.json()
      : Promise.reject(`Error al reconocer al usuario  ${res.status}`);
  });
};

export const logout = () => {
  return localStorage.removeItem(TOKEN_KEY);
};
