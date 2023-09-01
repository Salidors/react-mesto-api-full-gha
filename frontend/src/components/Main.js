import React, { useContext } from "react";
import editButton from "../image/Edit_Button.svg";
import profileButton from "../image/profile_button.svg";
import Card from "../components/Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main(props) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <main className="main main_type_pos">
      <section className="profile profile_type_pos">
        <div className="profile__container">
          <div className="profile__avatar-container">
            <button
              className="profile__avatar profile__button-avatar link"
              type="button"
              onClick={props.onAvatarClick}
            >
              <img
                src={editButton}
                alt="Иконка карандаш"
                className="profile__button-avatar profile__button-avatar_pencil"
              />
            </button>
            <img
              className="profile__avatar"
              src={currentUser.avatar}
              alt="Жак-Ив Кусто"
              id="popupAvatar"
            />
          </div>
          <div className="profile__info">
            <div className="profile__info-container">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                className="profile__button link"
                type="button"
                onClick={props.onProfileClick}
              >
                <img
                  src={editButton}
                  alt="Иконка карандаш"
                  className="profile__button-pencil"
                />
              </button>
            </div>
            <p className="profile__title">{currentUser.about}</p>
          </div>
        </div>

        <button
          className="profile__add-button link"
          type="button"
          onClick={props.onPlaceClick}
        >
          <img
            className="profile__add-img"
            src={profileButton}
            alt="Кнопка с плюсом"
          />
        </button>
      </section>

      <section className="cards" aria-label="Фото">
        <ul className="cards__list">
          {props.cards.map((card) => (
            <Card
              card={card}
              onClick={props.onSelectedCard}
              onLike={props.onCardLike}
              onDelete={props.onCardDelete}
              key={card._id}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
