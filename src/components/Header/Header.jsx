import { NavLink } from "react-router-dom";
import { useState } from "react";
import Logo from "../Logo/Logo";
import clsx from "clsx";
import css from "./Header.module.css";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors";

function Header() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  const buildLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

  return (
    <div className={css.container}>
      <header className={css.header}>
        <nav className={css.nav}>
          <NavLink to="/" className={css.logo}>
            <Logo />
          </NavLink>
          <div className={css.navList}>
            <NavLink to="/" className={buildLinkClass}>
              Home
            </NavLink>
            <NavLink to="/psychologists" className={buildLinkClass}>
              Psychologists
            </NavLink>
            {isLoggedIn && (
              <NavLink to="/favorites" className={buildLinkClass}>
                Favorites
              </NavLink>
            )}
          </div>
          <div className={css.authWrapper}>
            {isLoggedIn ? (
              <>
                <div className={css.userInfo}>
                  <span className={css.icon}>👤</span>
                  <span className={css.username}>
                    {user?.displayName || user?.email || "User"}
                  </span>
                </div>
                <button className={css.logoutBtn}>Log out</button>
              </>
            ) : (
              <>
                <button className={css.loginBtn}>Log In</button>
                <button className={css.registerBtn}>Registration</button>
              </>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Header;
