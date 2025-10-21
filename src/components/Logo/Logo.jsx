import css from "./Logo.module.css";

function Logo() {
  return (
    <div className={css.logo}>
      <p className={css.text}>
        <span className={css.accent}>psychologists.</span>services
      </p>
    </div>
  );
}

export default Logo;
