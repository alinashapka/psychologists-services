import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { registerUser } from "../../redux/auth/operations";
import css from "./RegistrationForm.module.css";

const schema = yup
  .object({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  })
  .required();

function RegistrationForm() {
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
      registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      })
    );
    console.log("Form submitted:", data);
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={css.title}>Registration</h2>
      <p>X</p>
      <p className={css.text}>
        Thank you for your interest in our platform! In order to register, we
        need some information. Please provide us with the following information.
      </p>
      <div className={css.container}>
        <div className={css.wrapper}>
          <input
            className={css.input}
            type="text"
            placeholder="Name"
            {...register("name")}
          />{" "}
          {errors.name && <p>{errors.name.message}</p>}
        </div>
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
        Sign Up
      </button>
    </form>
  );
}

export default RegistrationForm;
