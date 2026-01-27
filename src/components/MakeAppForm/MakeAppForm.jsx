import { toast } from "react-toastify";
import { useState } from "react";
import { formatPhone } from "../../utils/formatPhone";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Icon from "../Icon/Icon";
import { useSelector } from "react-redux";
import { selectCurrentPsych } from "../../redux/psychologists/selectors";
import css from "./MakeAppForm.module.css";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .min(13, "Phone number must be at least 13 characters"),
  time: yup.string().required("Please select a time"),
  comment: yup.string(),
});

function MakeAppForm({ onSuccess }) {
  const psychologist = useSelector(selectCurrentPsych);

  const [showTimeDropdown, setShowTimeDropdown] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      time: "",
      comment: "",
    },
  });

  const phoneNumber = watch("phoneNumber");
  const time = watch("time");

  const handlePhoneChange = (e) => {
    const formatted = formatPhone(e.target.value);
    setValue("phoneNumber", formatted);
  };

  const generateTimeSlots = () => {
    const times = [];
    for (let h = 9; h <= 18; h++) {
      for (let m = 0; m < 60; m += 30) {
        if (h === 18 && m > 0) break;
        const hh = h.toString().padStart(2, "0");
        const mm = m.toString().padStart(2, "0");
        times.push(`${hh}:${mm}`);
      }
    }
    return times;
  };

  const timeSlots = generateTimeSlots();

  const handleTimeSelect = (slot) => {
    setValue("time", slot);
    setShowTimeDropdown(false);
  };

  const onSubmit = (data) => {
    toast.success("Form sent!");
    reset();
    onSuccess();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={css.title}>
        Make an appointment
        <br />
        with a psychologist
      </h2>
      <p className={css.text}>
        You are on the verge of changing your life for the better. Fill out the
        short form below to book your personal appointment with a professional
        psychologist. We guarantee confidentiality and respect for your privacy.
      </p>

      {psychologist && (
        <div className={css.psychologistCard}>
          <img
            src={psychologist.avatar_url}
            alt={psychologist.name}
            className={css.psychologistAvatar}
          />
          <div className={css.psychologistInfo}>
            <p className={css.psychologistLabel}>Your psychologist</p>
            <p className={css.psychologistName}>{psychologist.name}</p>
          </div>
        </div>
      )}

      <div className={css.container}>
        <div>
          <input
            className={css.input}
            type="text"
            placeholder="Name"
            {...register("name")}
          />
          {errors.name && <p className={css.error}>{errors.name.message}</p>}
        </div>
        <div className={css.wrapper}>
          <div>
            <input
              className={css.inputNumb}
              type="tel"
              placeholder="+380"
              value={phoneNumber}
              onChange={handlePhoneChange}
            />
            {errors.phoneNumber && (
              <p className={css.error}>{errors.phoneNumber.message}</p>
            )}
          </div>
          <div className={css.timeWrapper}>
            <input
              className={css.input}
              type="text"
              placeholder="00:00"
              value={time}
              readOnly
              onClick={() => setShowTimeDropdown(!showTimeDropdown)}
              {...register("time")}
            />

            <Icon className={css.icon} id="clock" size={20} />

            {showTimeDropdown && (
              <div className={css.dropdown}>
                <p className={css.dropdownTitle}>Meeting time</p>
                {timeSlots.map((slot) => (
                  <div
                    key={slot}
                    className={css.dropdownItem}
                    onClick={() => handleTimeSelect(slot)}
                  >
                    {slot}
                  </div>
                ))}
              </div>
            )}
            {errors.time && <p className={css.error}>{errors.time.message}</p>}
          </div>
        </div>
        <div>
          <input
            className={css.input}
            type="email"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && <p className={css.error}>{errors.email.message}</p>}
        </div>

        <div>
          <textarea
            className={css.textarea}
            placeholder="Comment"
            {...register("comment")}
          />
        </div>

        <button className={css.button} type="submit">
          Send
        </button>
      </div>
    </form>
  );
}

export default MakeAppForm;
