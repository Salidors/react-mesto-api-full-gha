import { useState } from "react";

function PopupWithForm({
  isOpen,
  onClose,
  name,
  title,
  buttonText,
  children,
  onSubmit,
}) {
  const [isValid, setIsValid] = useState(false);

  return (
    <section
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className={`popup popup_type_popup ${isOpen ? "popup_opened" : ""} `}
      id={name}
    >
      <div className="popup__container">
        <button className="popup__close link" type="button" onClick={onClose} />
        <h2 className="popup__title">{title}</h2>

        <form
          className="popup__filler"
          onSubmit={onSubmit}
          name={name}
          onChange={(event) => {
            setIsValid(event.currentTarget.checkValidity());
          }}
        >
          {children}
          <button
            className={`popup__save
            popup__button
            link
            ${isValid ? "" : "popup__button_disabled"}`}
            name="save"
            type="submit"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}
export default PopupWithForm;
