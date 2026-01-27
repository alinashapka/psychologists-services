import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { loginUser } from "../../redux/auth/operations";
import { toast } from "react-toastify";
import css from "./LoginForm.module.css";
import Icon from "../Icon/Icon";

const schema = yup
  .object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  })
  .required();

function LoginForm({ onSuccess }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prevPass) => !prevPass);
  };

  const onSubmit = async (data) => {
    try {
      await dispatch(
        loginUser({
          email: data.email,
          password: data.password,
        }),
      ).unwrap();
      onSuccess();
      toast.success("Successfully logged in!");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={css.title}>Log In</h2>
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
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password")}
          />{" "}
          <button
            type="button"
            onClick={togglePassword}
            className={css.iconBtn}
          >
            {showPassword ? (
              <Icon id="eye" size={20} className={css.icon} />
            ) : (
              <Icon id="eye-off" size={20} className={css.icon} />
            )}
          </button>
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
