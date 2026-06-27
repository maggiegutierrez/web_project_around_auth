class API {
  constructor({ baseURL, headers }) {
    this._baseURL = baseURL;
    this._headers = headers;
  }

  getUserData() {
    return fetch(this._baseURL + `/users/me`, {
      headers: this._headers,
    }).then((res) => {
      if (!res.ok) {
        return Promise.reject(res.status);
      }
      return res.json();
    });
  }

  getInitialCards() {
    return fetch(this._baseURL + `/cards/`, {
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(res.status);
      })
      .catch((err) => {
        console.log(`ERROR HONEY: ${err}`);
      });
  }

  patchUserData(data) {
    return fetch(this._baseURL + `/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => {
      if (!res.ok) {
        return Promise.reject(res.status);
      }
      return res.json();
    });
  }

  patchAvatar(data) {
    return fetch(this._baseURL + `/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(res.status);
        }
        return res.json();
      })
      .catch((err) => {
        console.log(`ERROR HONEY: ${err}`);
      });
  }

  postCardData(data) {
    return fetch(this._baseURL + `/cards/`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(res.status);
      })
      .catch((err) => {
        console.log(`ERROR HONEY: ${err}`);
      });
  }

  deleteCardData(_id) {
    return fetch(this._baseURL + `/cards/` + _id, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(res.status);
    });
  }

  likeCard(cardId, isLiked) {
    return fetch(this._baseURL + `/cards/` + cardId + `/likes`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(res.status);
    });
  }

  /*getWebData() {
    return Promise.all([this.getUserData(), this.getInitialCards()]);
  }*/
}

const api = new API({
  baseURL: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "98bc7c1d-eb51-4075-89db-ccaa5c9b5069",
    "Content-Type": "application/json",
  },
});

export default api;
