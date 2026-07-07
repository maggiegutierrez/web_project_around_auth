import { useState, useContext } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";

export default function EditAvatar() {
  const [avatar, setAvatar] = useState("");
  const userContext = useContext(CurrentUserContext);
  const onUpdateAvatar = userContext.handleUpdateAvatar;

  const handleSubmit = (event) => {
    event.preventDefault();

    onUpdateAvatar({
      avatar: avatar,
    });
  };

  return (
    <form
      className="popup__form"
      id="edit-profile-image-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <input
        id="image-change-input"
        className="popup__input popup__input_type_image-link"
        name="avatar"
        placeholder="Enlace a la imagen"
        type="url"
        required
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
      />
      <span className="image-change-input-error popup__input-error"></span>
      <button
        className="button popup__button"
        type="submit"
        disabled={!avatar.trim()}
      >
        Guardar
      </button>
    </form>
  );
}
