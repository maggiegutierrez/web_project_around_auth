export const BASE_URL = "http://localhost:3000/";

export const register = (username, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: "somepassword",
      email: "email@email.com",
    }),
  }).then((res) => {
    return res.ok
      ? res.json({
          data: {
            email: "email@email.com",
            _id: "5f5204c577488bcaa8b7bdf2",
          },
        })
      : Promise.reject(`Error: ${res.status}`);
  });
};

export const authorize = (identifier, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ identifier, password }),
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`MAX Error: ${res.status}`);
  });
};
