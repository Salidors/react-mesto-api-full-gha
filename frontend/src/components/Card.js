import Trash from "../image/Trash.svg";
import CurrentUserContext from "../contexts/CurrentUserContext";
import React, { useContext } from "react";

function Card(props) {
  const { currentUser } = useContext(CurrentUserContext);
  const isOwn = props.card.owner === currentUser._id;
  const isLiked = props.card.likes.some((_id) => _id === currentUser._id);
  const cardLikeButtonClassName = `card__like link ${
    isLiked ? "card__like_black_heart" : ""
  }`;

  return (
    <li className="card list__item">
      {isOwn && (
        <img
          className="card__trash link"
          src={Trash}
          alt="Иконка удаление карточки"
          onClick={() => props.onDelete(props.card)}
        />
      )}
      <img
        src={props.card.link}
        alt={props.card.name}
        className="card__image"
        onClick={() => props.onClick(props.card)}
      />
      <div className="card__item">
        <h2 className="card__title item__text">{props.card.name}</h2>
        <div className="card__like_counter-btn">
          <button
            type="button"
            className={`${cardLikeButtonClassName}`}
            onClick={() => props.onLike(props.card)}
          ></button>
          <p className="card__like_counter">{props.card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
