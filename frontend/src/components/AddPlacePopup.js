import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name: title,
      link: image,
    });
  }

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    setTitle("");
    setImage("");
  }, [props.isOpen]);

  function handleChangeTitle(e) {
    setTitle(e.target.value);
  }
  function handleChangeImage(e) {
    setImage(e.target.value);
  }
  return (
    <PopupWithForm
      title="Новое место"
      name="formAddPopup"
      buttonText="Сохранить"
      placeholder="Название"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_subtitle_name"
        name="name-card"
        type="text"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        onChange={handleChangeTitle}
        value={title}
      />
      <span id="name-card-error" className="popup__error"></span>
      <input
        className="popup__input popup__input_subtitle_info"
        name="link-card"
        type="url"
        placeholder="Ссылка на картинку"
        required
        value={image}
        onChange={handleChangeImage}
      />
      <span id="link-card-error" className="popup__error"></span>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
