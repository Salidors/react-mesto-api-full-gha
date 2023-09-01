import { useState, useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const ref = useRef();
  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar(ref.current.value);
  }

  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    setAvatar("");
  }, [props.isOpen]);

  function handleChangeAvatar(e) {
    setAvatar(e.target.value);
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="formPopupAvatar"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_subtitle_info"
        name="link-avatar"
        type="url"
        placeholder="Ссылка на картинку"
        required
        ref={ref}
        value={avatar}
        onChange={handleChangeAvatar}
      />
      <span id="link-avatar-error" className="popup__error"></span>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
