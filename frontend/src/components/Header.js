import React from "react";
import headerLogo from "../image/Vector_logo.svg";
import { useLocation, Link } from "react-router-dom";

function Header({ email }) {
  const { pathname } = useLocation();
  return (
    <header className="header">
      <div className=" header__container">
        <img className="header__logo" src={headerLogo} alt="Логотип Место" />
        {pathname === "/sign-in" && (
          <Link className="header__enter" to="/sign-up">
            Регистрация
          </Link>
        )}
        {pathname === "/sign-up" && (
          <Link className="header__enter" to="/sign-in">
            Войти
          </Link>
        )}
        {email && (
          <p>
            {email}{" "}
            <Link className="header__enter" to="/sign-out">
              Выйти
            </Link>
          </p>
        )}
      </div>
    </header>
  );
}

export default Header;
