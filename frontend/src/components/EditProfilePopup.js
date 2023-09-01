import { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const { currentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }
  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="formEditPopup"
      buttonText="Сохранить"
      placeholder="Введите ФИО"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_subtitle_name"
        name="name-edit"
        type="text"
        placeholder="Введите ФИО"
        required
        minLength="2"
        maxLength="40"
        value={name}
        onChange={handleChangeName}
      />
      <span id="name-edit-error" className="popup__error"></span>
      <input
        className="popup__input popup__input_subtitle_info"
        name="info-edit"
        type="text"
        placeholder="Род деятельности"
        required
        minLength="2"
        maxLength="200"
        value={description}
        onChange={handleChangeDescription}
      />
      <span id="info-edit-error" className="popup__error"></span>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
