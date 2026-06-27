import { useState, useContext } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";

export default function EditProfile(props) {
  const userContext = useContext(CurrentUserContext);
  const { currentUser, handleUpdateUser, onUpdateAvatar } = userContext;

  const [name, setName] = useState(userContext.currentUser.name);
  const [description, setDescription] = useState(userContext.currentUser.about);
  const [avatar, setAvatar] = useState(userContext.currentUser.avatar);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    handleUpdateUser({ name, about: description });
  };

  return (
    <form
      className="popup__form"
      id="edit-profile-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <input
        id="name-input"
        className="popup__input popup__input_type_name"
        name="name"
        placeholder="Nombre"
        type="text"
        minLength="2"
        maxLength="40"
        required
        value={name}
        onChange={handleNameChange}
      />
      <span className="name-input-error popup__input-error"></span>
      <input
        id="about-input"
        className="popup__input popup__input_type_about"
        name="about"
        placeholder="Acerca de mí"
        type="text"
        minLength="2"
        maxLength="200"
        required
        value={description}
        onChange={handleDescriptionChange}
      />
      <span className="about-input-error popup__input-error"></span>
      <button className="button popup__button" type="submit">
        Guardar
      </button>
    </form>
  );
}
