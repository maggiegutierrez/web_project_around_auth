import { useContext, useRef } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";

export default function NewCard() {
  const nameInputRef = useRef();
  const linkInputRef = useRef();
  const userContext = useContext(CurrentUserContext);
  const onAddPlaceSubmit = userContext.handleAddPlaceSubmit;

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = nameInputRef.current.value;
    const link = linkInputRef.current.value;
    onAddPlaceSubmit({ name, link });
  };

  return (
    <form
      className="popup__form"
      id="new-card-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <input
        id="place-input"
        className="popup__input popup__input_type_card-name"
        name="placeName"
        placeholder="Título"
        minLength="2"
        maxLength="30"
        required
        type="text"
        ref={nameInputRef}
      />
      <span className="place-input-error popup__input-error"></span>
      <input
        id="link-input"
        className="popup__input popup__input_type_url"
        name="link"
        placeholder="Enlace a la imagen"
        required
        type="url"
        ref={linkInputRef}
      />
      <span className="link-input-error popup__input-error"></span>
      <button className="button popup__button" type="submit">
        Crear
      </button>
    </form>
  );
}
