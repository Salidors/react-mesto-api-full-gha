import React from "react";

const InfoTooltip = ({ status, onClose }) => {
  return (
    <section
      className="popup popup_opened popup_type_popup"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="popup__container">
        <button className="popup__close link" type="button" onClick={onClose} />

        <div
          className={`popup__button popup__img ${
            status === "error" ? "popup__img_type_block" : "popup__img_type_ok"
          } `}
        ></div>
        <h2 className="popup__title popup__title_toggle_text">
          {status === "success"
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте еще раз"}
        </h2>
      </div>
    </section>
  );
};
export default InfoTooltip;
