import { NavLink, Outlet } from "react-router-dom";
import Logo from "../Logo/Logo";
import clsx from "clsx";
import css from "./Layout.module.css";

function Layout() {
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

          <NavLink to="/" className={buildLinkClass}>
            Home
          </NavLink>
          <NavLink to="/psychologists" className={buildLinkClass}>
            Psychologists
          </NavLink>
          <NavLink to="/favorites" className={buildLinkClass}>
            Favorites
          </NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
