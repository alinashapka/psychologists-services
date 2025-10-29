import { useState } from "react";
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
      <img src={avatar_url} alt={name} className={css.avatar} />

      <div className={css.info}>
        <span className={css.label}>Psychologist</span>
        <h2 className={css.name}>{name}</h2>

        <div className={css.details}>
          <p>
            Experience: <span className={css.accent}>{experience}</span>
          </p>
          <p className={css.text}>
            License: <span className={css.accent}>{license}</span>
          </p>
          <p className={css.text}>
            Specialization: <span className={css.accent}>{specialization}</span>
          </p>
          <p className={css.text}>
            Initial consultation:{" "}
            <span className={css.accent}>{initial_consultation}</span>
          </p>
        </div>

        <p className={css.about}>{about}</p>

        <button className={css.readMoreBtn} onClick={toggleReadMore}>
          {isExpanded ? "Show less" : "Read more"}
        </button>

        {/* Reviews shown only when expanded */}
        {isExpanded && reviews.length > 0 && (
          <div className={css.reviews}>
            {reviews.map((review, index) => (
              <div key={index} className={css.review}>
                <div className={css.reviewHeader}>
                  <span className={css.reviewerInitial}>
                    {review.reviewer.charAt(0)}
                  </span>
                  <div>
                    <p className={css.reviewerName}>{review.reviewer}</p>
                    <p className={css.rating}>⭐ {review.rating}</p>
                  </div>
                </div>
                <p className={css.reviewComment}>{review.comment}</p>
              </div>
            ))}
          </div>
        )}

        <button className={css.appointmentBtn}>Make an appointment</button>
      </div>

      <div className={css.meta}>
        <p className={css.rating}>⭐ Rating: {rating}</p>
        <p className={css.price}>
          Price / 1 hour:{" "}
          <span className={css.priceAmount}>${price_per_hour}</span>
        </p>
        <button className={css.favoriteBtn}>❤️</button>
      </div>
    </div>
  );
}

export default PsychCard;
