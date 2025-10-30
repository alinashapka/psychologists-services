import { useState } from "react";
import Icon from "../Icon/Icon";
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
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
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
            Specialization: <span className={css.accent}>{specialization}</span>
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
                        {review.rating}
                      </p>
                    </div>
                  </div>
                  <p className={css.reviewComment}>{review.comment}</p>
                </li>
              ))}
            </ul>
            <button className={css.appointmentBtn}>Make an appointment</button>
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
        <button className={css.favoriteBtn}>
          <Icon className={css.heart} id="heart" size={26} />
        </button>
      </div>
    </div>
  );
}

export default PsychCard;
