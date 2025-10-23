import css from "./HomePage.module.css";
import { useNavigate } from "react-router-dom";
import Icon from "../../components/Icon/Icon";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className={css.container}>
      <div className={css.textBlock}>
        <h1 className={css.title}>
          The road to the <span className={css.accent}>depths</span> of the
          human soul
        </h1>
        <p className={css.text}>
          We help you to reveal your potential, overcome challenges and find a
          guide in your own life with the help of our experienced psychologists.
        </p>
        <button
          className={css.button}
          onClick={() => navigate("/psychologists")}
        >
          Get Started <span className={css.arrow}>↗</span>
        </button>
      </div>

      <div className={css.imageBlock}>
        <img
          src="/src/assets/hero.jpg"
          className={css.image}
          alt="Psychologist"
        />
        <div className={css.icon1}>
          <div className={css.checkWrap}>
            <Icon className={css.check} id="check" size={30} />
          </div>
          <div className={css.textWrap}>
            <p className={css.checkText}>Experienced psychologists</p>
            <p className={css.checkNumb}>15,000</p>
          </div>
        </div>
        <div className={css.icon2}>
          <Icon className={css.question} id="question" widht={10} height={17} />
        </div>
        <div className={css.icon3}>
          <Icon className={css.users} id="users" size={19.84} />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
