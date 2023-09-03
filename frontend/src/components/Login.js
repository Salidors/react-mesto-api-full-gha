import React, { useCallback, useState } from "react";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("user3@gmail.com");
  const handleOnEmailChange = useCallback((event) => {
    setEmail(event.currentTarget.value);
  }, []);

  const [password, setPassword] = useState("1");
  const handleOnPasswordChange = useCallback((event) => {
    setPassword(event.currentTarget.value);
  }, []);

  return (
    <form
      className="auth__container"
      onSubmit={(event) => {
        event.preventDefault();
        onLogin(email, password);
      }}
    >
      <h2 className="auth__title">Вход</h2>
      <input
        className="popup__input popup__input_subtitle_name auth__input"
        name="name-edit"
        type="email"
        placeholder="Email"
        required
        value={email}
        onChange={handleOnEmailChange}
        autoComplete="username"
      />
      <span id="name-edit-error" className="popup__error"></span>
      <input
        className="popup__input popup__input_subtitle_info auth__input"
        name="info-edit"
        type="password"
        placeholder="Пароль"
        required
        value={password}
        onChange={handleOnPasswordChange}
        autoComplete="current-password"
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
        Войти
        {/*buttonText*/}
      </button>
    </form>
  );
};

export default Login;
