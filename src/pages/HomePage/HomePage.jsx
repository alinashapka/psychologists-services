import css from "./HomePage.module.css";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";

function HomePage() {
  return (
    <div className={css.container}>
      <h1>Home Page</h1>
      <RegistrationForm />
    </div>
  );
}

export default HomePage;
