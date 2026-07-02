import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import CurrentUserContext from "../contexts/CurrentUserContext";

import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";

import api from "../utils/api";
import Popup from "../components/Main/components/popup/Popup";
import Card from "./Main/components/Card/Card";
import NewCard from "./Main/components/popup/NewCard/NewCard";
import Login from "./Main/components/Login/Login";
import Register from "./Main/components/Register/Register";

import * as auth from "../utils/auth";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [popup, setPopup] = useState(null);

  const [cards, setCards] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  const handleRegistration = ({ email, password }) => {
    return auth
      .register(email, password)
      .then(() => {
        console.log("Registration successful");
        navigate("/signin");
      })
      .catch(console.error);
  };

  const handleLogin = ({ email, password }) => {
    console.log("hanndleLogin está ocurriendo");
    if (!email || !password) {
      return;
    }

    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          return auth.login();
        }
      })
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);

        const redirectPath = location.state?.from?.pathname || "/";
        navigate(redirectPath);
      })
      .catch((error) => {
        console.error(error);
        alert(
          "Error en el inicio de sesión. Por favor, verifica tus credenciales.",
        );
      });
  };

  const handleLogout = () => {
    return auth
      .logout()
      .then(() => {
        console.log("User logged out successfully");
        navigate("/signin");
      })
      .catch(console.error);
  };

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  useEffect(() => {
    api.getUserData().then((data) => {
      setCurrentUser(data);
    });
  }, []);

  const handleUpdateUser = (data) => {
    api.patchUserData(data).then((newData) => {
      setCurrentUser(newData);
      handleClosePopup();
    });
  };

  function handleUpdateAvatar(data) {
    api.patchAvatar(data).then((newData) => {
      setCurrentUser(newData);
      handleClosePopup();
    });
  }

  async function handleCardLike(card) {
    const isLiked = card.isLiked;
    await api
      .likeCard(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard,
          ),
        );
      })
      .catch((error) => console.error(error));
  }

  async function handleCardDelete(card) {
    await api
      .deleteCardData(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((currentCard) => currentCard._id !== card._id),
        );
        handleClosePopup();
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    api.getInitialCards().then((data) => {
      setCards(data);
    });
  }, []);

  function confirmationCardDelete() {
    handleOpenPopup();
    handleCardDelete();
  }

  async function handleAddPlaceSubmit(data) {
    await api.postCardData(data).then((newCard) => {
      setCards([newCard, ...cards]);
      handleClosePopup();
    });
  }

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        handleUpdateUser,
        handleUpdateAvatar,
        handleCardDelete,
        handleAddPlaceSubmit,
      }}
    >
      <div className="page__content">
        <Header
          currentUser={currentUser}
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
        />
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Main
                  onOpenPopup={handleOpenPopup}
                  onClosePopup={handleClosePopup}
                  popup={popup}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={confirmationCardDelete}
                />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
          <Route path="/signin" element={<Login handleLogin={handleLogin} />} />
          <Route
            path="/signup"
            element={<Register handleRegistration={handleRegistration} />}
          />
        </Routes>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
