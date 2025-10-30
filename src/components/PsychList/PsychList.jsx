import { useDispatch } from "react-redux";
import PsychCard from "../PsychCard/PsychCard";
import Loader from "../Loader/Loader";
import {
  selectPsychologists,
  selectDisplayedCount,
  selectisLoading,
} from "../../redux/psychologists/selectors";
import { loadMore } from "../../redux/psychologists/slice";
import css from "./PsychList.module.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPsychologists } from "../../redux/psychologists/operations";

function PsychList() {
  const psychologists = useSelector(selectPsychologists);
  const displayedCount = useSelector(selectDisplayedCount);
  const isLoading = useSelector(selectisLoading);

  const visiblePsychologists = psychologists.slice(0, displayedCount);
  const hasMore = displayedCount < psychologists.length;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPsychologists());
  }, [dispatch]);

  const handleLoadMore = () => {
    dispatch(loadMore());
  };

  if (isLoading && psychologists.length === 0) {
    return (
      <div className={css.loader}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={css.container}>
      <ul className={css.list}>
        {visiblePsychologists.map((psych) => (
          <li className={css.item} key={psych.id}>
            <PsychCard
              avatar_url={psych.avatar_url}
              name={psych.name}
              experience={psych.experience}
              license={psych.license}
              specialization={psych.specialization}
              initial_consultation={psych.initial_consultation}
              about={psych.about}
              reviews={psych.reviews}
              rating={psych.rating}
              price_per_hour={psych.price_per_hour}
            />
          </li>
        ))}
      </ul>

      {isLoading && psychologists.length > 0 && (
        <div className={css.loadMoreLoader}>
          <Loader />
        </div>
      )}

      {!isLoading && hasMore && psychologists.length > 0 && (
        <button className={css.button} onClick={handleLoadMore}>
          Load more
        </button>
      )}
    </div>
  );
}

export default PsychList;
