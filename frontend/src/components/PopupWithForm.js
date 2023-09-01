function PopupWithForm({
  isOpen,
  onClose,
  name,
  title,
  buttonText,
  children,
  onSubmit,
}) {
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

        <form className="popup__filler" onSubmit={onSubmit} name={name}>
          {children}
          <button
            className="popup__save
            popup__button
            link
            popup__button_disabled"
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
