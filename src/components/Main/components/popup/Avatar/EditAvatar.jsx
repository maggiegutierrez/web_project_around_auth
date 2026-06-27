import { useRef, useContext } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";

export default function EditAvatar() {
  const inputAvatarRef = useRef();
  const userContext = useContext(CurrentUserContext);
  const onUpdateAvatar = userContext.handleUpdateAvatar;

  const handleSubmit = (event) => {
    event.preventDefault();

    onUpdateAvatar({
      avatar: inputAvatarRef.current.value,
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
        ref={inputAvatarRef}
      />
      <span className="image-change-input-error popup__input-error"></span>
      <button className="button popup__button" type="submit">
        Guardar
      </button>
    </form>
  );
}
