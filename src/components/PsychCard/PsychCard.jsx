import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Icon from "../Icon/Icon";
import Modal from "../Modal/Modal";
import MakeAppForm from "../MakeAppForm/MakeAppForm";
import {
  setCurrentPsych,
  clearCurrentPsych,
} from "../../redux/psychologists/slice";
import { ref, set, get } from "firebase/database";
import { database } from "../../services/firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import { toast } from "react-toastify";
import { createSafeId } from "../../utils/createSafeId";
import { addFavorite, removeFavorite } from "../../redux/favorites/slice";
import css from "./PsychCard.module.css";

function PsychCard({
  about,
  avatar_url,
  experience,
  initial_consultation,
  license,
  name,
  price_per_hour,
  rating,
  reviews = [],
  specialization,
}) {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  const [isExpanded, setIsExpanded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const safeId = createSafeId(name);

  useEffect(() => {
    const checkIfFavorite = async () => {
      if (!user || !user.uid) return;

      try {
        const favoriteRef = ref(database, `favorites/${user.uid}/${safeId}`);
        const snapshot = await get(favoriteRef);

        if (snapshot.exists()) {
          setIsFavorite(true);
        } else {
          setIsFavorite(false);
        }
      } catch (error) {
        console.error("Error checking favorite:", error);
      }
    };
    checkIfFavorite();
  }, [user, safeId]);

  const toggleFavorite = async () => {
    if (!user || !user.uid) {
      toast.error("Please log in to add favorites");
      return;
    }

    try {
      const favoriteRef = ref(database, `favorites/${user.uid}/${safeId}`);

      if (isFavorite) {
        await set(favoriteRef, null);
        dispatch(removeFavorite(name));
        setIsFavorite(false);
      } else {
        await set(favoriteRef, { name });
        dispatch(addFavorite(name));
        setIsFavorite(true);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const openModal = () => {
    dispatch(setCurrentPsych(name));
    setIsOpen(true);
  };

  const closeModal = () => {
    dispatch(clearCurrentPsych());
    setIsOpen(false);
  };

  return (
    <>
      <div className={css.card}>
        <div className={css.avatarWrapper}>
          <img src={avatar_url} alt={name} className={css.avatar} />
        </div>

        <div className={css.info}>
          <p className={css.label}>Psychologist</p>
          <h2 className={css.name}>{name}</h2>

          <ul className={css.details}>
            <li className={css.text}>
              Experience: <span className={css.accent}>{experience}</span>
            </li>
            <li className={css.text}>
              License: <span className={css.accent}>{license}</span>
            </li>
            <li className={css.text}>
              Specialization:{" "}
              <span className={css.accent}>{specialization}</span>
            </li>
            <li className={css.text}>
              Initial consultation:{" "}
              <span className={css.accent}>{initial_consultation}</span>
            </li>
          </ul>

          <p className={css.about}>{about}</p>

          {!isExpanded && (
            <button className={css.readMoreBtn} onClick={toggleReadMore}>
              Read more
            </button>
          )}

          {/* Reviews shown only when expanded */}
          {isExpanded && reviews.length > 0 && (
            <div className={css.reviewsContainer}>
              <ul className={css.list}>
                {reviews.map((review, index) => (
                  <li key={index} className={css.item}>
                    <div className={css.reviewHeader}>
                      <span className={css.reviewerInitial}>
                        {review.reviewer.charAt(0)}
                      </span>
                      <div>
                        <p className={css.reviewerName}>{review.reviewer}</p>
                        <p className={css.reviewRating}>
                          <Icon className={css.star} id="star" size={16} />{" "}
                          {review.rating.toFixed(1)}
                        </p>
                      </div>
                    </div>
                    <p className={css.reviewComment}>{review.comment}</p>
                  </li>
                ))}
              </ul>
              <button onClick={openModal} className={css.appointmentBtn}>
                Make an appointment
              </button>
            </div>
          )}
        </div>

        <div className={css.meta}>
          <p className={css.rating}>
            {" "}
            <Icon className={css.star} id="star" size={16} /> Rating: {rating}
          </p>
          <span className={css.line}>│</span>
          <p className={css.price}>
            Price / 1 hour:{" "}
            <span className={css.priceAmount}>${price_per_hour}</span>
          </p>
          <button className={css.favoriteBtn} onClick={toggleFavorite}>
            <Icon
              className={isFavorite ? css.heartFilled : css.heart}
              id="heart"
              size={26}
            />
          </button>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <MakeAppForm onSuccess={closeModal} />
      </Modal>
    </>
  );
}

export default PsychCard;
