import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import { useEffect, useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/api";
import Popup from "../components/Main/components/popup/Popup";
import Card from "./Main/components/Card/Card";
import NewCard from "./Main/components/popup/NewCard/NewCard";
function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [popup, setPopup] = useState(null);

  const [cards, setCards] = useState([]);

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
        <Header />
        <Main
          onOpenPopup={handleOpenPopup}
          onClosePopup={handleClosePopup}
          popup={popup}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={confirmationCardDelete}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
