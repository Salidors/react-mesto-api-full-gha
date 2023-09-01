import React, { useCallback, useEffect, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import api from "../utils/Api";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { authApiUrl } from "../utils/constants";
import { clearToken, getToken, setToken } from "../utils/storage";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();
  const [tooltipStatus, setTooltipStatus] = useState();
  const { pathname } = useLocation();

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const [selectedCard, setSelectedCard] = useState(null);

  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: "",
  });

  const [cards, setCards] = useState([]);

  const handleAddInfoTooltip = () => {
    setIsAddPlacePopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setTooltipStatus();
  };

  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    selectedCard;

  useEffect(() => {
    if (isOpen) {
      const handleEscClose = (event) => {
        if (event.code === "Escape") {
          closeAllPopups();
        }
      };
      document.addEventListener("keydown", handleEscClose);

      return () => {
        document.removeEventListener("keydown", handleEscClose);
      };
    }
  }, [isOpen]);

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  useEffect(() => {
    if (isAuth)
      api
        .getProfile()
        .then((userData) =>
          setCurrentUser((state) => ({ ...state, ...userData }))
        )
        .catch((error) => {
          console.error(error);
        });
  }, [isAuth]);

  useEffect(() => {
    if (isAuth)
      api
        .getInitialCards()
        .then((cards) => {
          setCards(cards);
        })
        .catch((error) => {
          console.error(error);
        });
  }, [isAuth]);

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    if (isLiked)
      api
        .deleteLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((error) => {
          console.error(error);
        });
    else
      api
        .addLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((error) => {
          console.error(error);
        });
  };
  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUpdateUser = (data) => {
    api
      .setProfile(data)
      .then((result) => {
        setCurrentUser((state) => ({ ...state, ...result }));
        closeAllPopups();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUpdateAvatar = (data) => {
    api
      .setAvatar(data)
      .then((result) => {
        setCurrentUser((state) => ({ ...state, ...result }));
        closeAllPopups();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleAddPlaceSubmit = (data) => {
    api
      .addCard(data)
      .then((result) => {
        setCards((state) => [result, ...state]);
        closeAllPopups();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const validateToken = useCallback(
    (token) => {
      fetch(`${authApiUrl}/users/me`, {
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (!res.ok) {
            setTooltipStatus("error");
            throw new Error(res.statusText);
          }
          return res.json();
        })
        .then(({ data }) => {
          setCurrentUser((state) => ({ ...state, ...data }));
          setIsAuth(true);
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
          clearToken();
        });
    },
    [navigate]
  );

  useEffect(() => {
    const token = getToken();
    if (token) validateToken(token);
  }, [validateToken]);

  useEffect(() => {
    if (pathname === "/sign-out") {
      clearToken();
      window.location.href = "/sign-in";
    }
  }, [pathname, navigate]);

  const handleOnSignIn = useCallback(
    (email, password) => {
      fetch(`${authApiUrl}/signin`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
        .then((res) => res.json())
        .then(({ token }) => {
          setIsAuth(true);
          setToken(token);
          navigate("/");
        })
        .catch((error) => console.error(error));
    },
    [navigate]
  );

  const handleOnSignUp = useCallback(
    (email, password) => {
      fetch(`${authApiUrl}/signup`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
        .then((res) => {
          if (!res.ok) throw Error(res.statusText);
          return res.json();
        })
        .then(() => {
          setTooltipStatus("success");
          navigate("/sign-in");
        })
        .catch((error) => {
          console.error(error);
          setTooltipStatus("error");
        });
    },
    [navigate]
  );

  return (
    <CurrentUserContext.Provider value={{ currentUser, isAuth }}>
      <div>
        <Header email={currentUser.email} />
        {tooltipStatus && (
          <InfoTooltip status={tooltipStatus} onClose={closeAllPopups} />
        )}
        <Routes>
          <Route
            path="sign-up"
            element={<Register onRegister={handleOnSignUp} />}
          />
          <Route path="sign-in" element={<Login onLogin={handleOnSignIn} />} />
          <Route path="sign-out" />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Main
                  onAvatarClick={handleEditAvatarClick}
                  onProfileClick={handleEditProfileClick}
                  onPlaceClick={handleAddPlaceClick}
                  onSelectedCard={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  cards={cards}
                  onTooltipClick={handleAddInfoTooltip}
                />
                <Footer />
                <PopupWithForm
                  title="Вы уверены?"
                  name="deletePopup"
                  buttonText="Да"
                />
                <EditAvatarPopup
                  onUpdateAvatar={handleUpdateAvatar}
                  isOpen={isEditAvatarPopupOpen}
                  onClose={closeAllPopups}
                />

                <EditProfilePopup
                  onUpdateUser={handleUpdateUser}
                  isOpen={isEditProfilePopupOpen}
                  onClose={closeAllPopups}
                />

                <AddPlacePopup
                  onAddPlace={handleAddPlaceSubmit}
                  isOpen={isAddPlacePopupOpen}
                  onClose={closeAllPopups}
                />
                <ImagePopup card={selectedCard} onClose={closeAllPopups} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
