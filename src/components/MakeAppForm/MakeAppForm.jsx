import { toast } from "react-toastify";
import { useState } from "react";
import { formatPhone } from "../../utils/formatPhone";
import Icon from "../Icon/Icon";
import { useSelector } from "react-redux";
import { selectCurrentPsych } from "../../redux/psychologists/selectors";
import css from "./MakeAppForm.module.css";

function MakeAppForm({ onSuccess }) {
  const psychologist = useSelector(selectCurrentPsych);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    time: null,
    comment: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phoneNumber") {
      setFormData((prev) => ({
        ...prev,
        phoneNumber: formatPhone(value),
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    toast.success("Form sent!");

    setFormData({
      name: "",
      email: "",
      phoneNumber: "",
      time: null,
      comment: "",
    });

    onSuccess();
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

  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const timeSlots = generateTimeSlots();

  const handleTimeSelect = (time) => {
    setFormData((prev) => ({ ...prev, time }));
    setShowTimeDropdown(false);
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
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
        <input
          className={css.input}
          name="name"
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <div className={css.wrapper}>
          <input
            className={css.input}
            type="tel"
            name="phoneNumber"
            placeholder="+380"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
          <div className={css.timeWrapper}>
            <input
              className={css.input}
              type="text"
              name="time"
              placeholder="00:00"
              value={formData.time || ""}
              readOnly
              onClick={() => setShowTimeDropdown(!showTimeDropdown)}
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
          </div>
        </div>
        <input
          className={css.input}
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          className={css.textarea}
          name="comment"
          placeholder="Comment"
          value={formData.comment}
          onChange={handleChange}
        />

        <button className={css.button} type="submit">
          Send
        </button>
      </div>
    </form>
  );
}

export default MakeAppForm;
