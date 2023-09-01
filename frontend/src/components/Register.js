import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";

const Register = ({ onRegister }) => {
  const [email, setEmail] = useState("nina.abramova@gmail.com");
  const handleOnEmailChange = useCallback((event) => {
    setEmail(event.currentTarget.value);
  }, []);

  const [password, setPassword] = useState("123");
  const handleOnPasswordChange = useCallback((event) => {
    setPassword(event.currentTarget.value);
  }, []);

  return (
    <form
      className="auth__container"
      onSubmit={(event) => {
        event.preventDefault();
        onRegister(email, password);
      }}
    >
      <h1 className="auth__title">Регистрация</h1>
      <input
        className="popup__input popup__input_subtitle_name auth__input"
        name="name-edit"
        type="email"
        placeholder="Email"
        required
        minLength="4"
        maxLength="40"
        value={email}
        onChange={handleOnEmailChange}
      />
      <span id="name-edit-error" className="popup__error"></span>
      <input
        className="popup__input popup__input_subtitle_info auth__input"
        name="info-edit"
        type="password"
        placeholder="Пароль"
        required
        minLength="6"
        maxLength="20"
        value={password}
        onChange={handleOnPasswordChange}
      />
      <span id="password-edit-error" className="password__error"></span>

      <button
        className="popup__save
          popup__button
          link
          auth__button"
        name="registration"
        type="submit"
      >
        Зарегистрироваться
        {/*buttonText*/}
      </button>

      <Link className="auth__link link " to="/sign-in">
        Уже зарегистрированы? Войти
      </Link>
    </form>
  );
};
export default Register;
