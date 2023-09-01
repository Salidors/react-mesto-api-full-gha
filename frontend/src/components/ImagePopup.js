function ImagePopup(props) {
  return (
    <section
      id="formImagePopup"
      onClick={(event) => {
        if (event.target === event.currentTarget) props.onClose();
      }}
      className={`popup popup-large ${props.card ? "popup_opened" : ""} `}
    >
      <div className="popup-large__container">
        <button
          className="popup__close link"
          type="button"
          onClick={props.onClose}
        ></button>
        <img
          src={props.card?.link}
          alt={props.card?.name}
          className="popup-large__image"
        />
        <h2 className="popup-large__title">{props.card?.name}</h2>
      </div>
    </section>
  );
}
export default ImagePopup;
