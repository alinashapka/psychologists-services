import { NavLink } from "react-router-dom";
import { useState } from "react";
import Logo from "../Logo/Logo";
import clsx from "clsx";
import css from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors";
import { logoutUser } from "../../redux/auth/operations";
import Modal from "../Modal/Modal";
import LoginForm from "../LoginForm/LoginForm";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import Icon from "../Icon/Icon";

function Header() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  // Modal state: null | 'login' | 'register'
  const [activeModal, setActiveModal] = useState(null);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const buildLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

  const openLoginModal = () => setActiveModal("login");
  const openRegisterModal = () => setActiveModal("register");
  const closeModal = () => setActiveModal(null);

  return (
    <>
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
                    <div className={css.iconWrap}>
                      <Icon id="user" size={24} className={css.icon} />
                    </div>
                    <span className={css.username}>
                      {user?.name || user?.email || "User"}
                    </span>
                  </div>
                  <button className={css.logoutBtn} onClick={handleLogout}>
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <button className={css.loginBtn} onClick={openLoginModal}>
                    Log In
                  </button>
                  <button
                    className={css.registerBtn}
                    onClick={openRegisterModal}
                  >
                    Registration
                  </button>
                </>
              )}
            </div>
          </nav>
        </header>
      </div>

      {/* Modals */}
      <Modal isOpen={activeModal === "login"} onClose={closeModal}>
        <LoginForm onSuccess={closeModal} />
      </Modal>

      <Modal isOpen={activeModal === "register"} onClose={closeModal}>
        <RegistrationForm onSuccess={closeModal} />
      </Modal>
    </>
  );
}

export default Header;
