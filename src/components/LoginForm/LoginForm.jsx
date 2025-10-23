import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { loginUser } from "../../redux/auth/operations";
import css from "./LoginForm.module.css";

const schema = yup
  .object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  })
  .required();

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(
      loginUser({
        email: data.email,
        password: data.password,
      })
    );
    console.log("Form submitted:", data);
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={css.title}>Log In</h2>
      <p>X</p>
      <p className={css.text}>
        Welcome back! Please enter your credentials to access your account and
        continue your search for a psychologist.
      </p>
      <div className={css.container}>
        <div className={css.wrapper}>
          <input
            className={css.input}
            type="email"
            placeholder="Email"
            {...register("email")}
          />{" "}
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className={css.wrapper}>
          <input
            className={css.input}
            type="password"
            placeholder="Password"
            {...register("password")}
          />{" "}
          {errors.password && <p>{errors.password.message}</p>}
        </div>
      </div>
      <button className={css.button} type="submit">
        Log In
      </button>
    </form>
  );
}

export default LoginForm;
