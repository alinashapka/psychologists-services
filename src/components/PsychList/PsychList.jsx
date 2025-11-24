import { useDispatch } from "react-redux";
import PsychCard from "../PsychCard/PsychCard";
import Loader from "../Loader/Loader";
import Filters from "../Filters/Filters";
import {
  selectPsychologists,
  selectDisplayedCount,
  selectisLoading,
} from "../../redux/psychologists/selectors";
import { loadMore } from "../../redux/psychologists/slice";
import css from "./PsychList.module.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchPsychologists } from "../../redux/psychologists/operations";

function PsychList() {
  const psychologists = useSelector(selectPsychologists);
  const displayedCount = useSelector(selectDisplayedCount);
  const isLoading = useSelector(selectisLoading);
  const dispatch = useDispatch();

  const [activeFilter, setActiveFilter] = useState("a-to-z");

  useEffect(() => {
    dispatch(fetchPsychologists());
  }, [dispatch]);

  const getFilteredPsychologists = () => {
    const filtered = [...psychologists];

    switch (activeFilter) {
      case "a-to-z":
        return filtered.sort((a, b) => a.name.localeCompare(b.name));

      case "z-to-a":
        return filtered.sort((a, b) => b.name.localeCompare(a.name));

      case "price-low-high":
        return filtered.sort((a, b) => a.price_per_hour - b.price_per_hour);

      case "price-high-low":
        return filtered.sort((a, b) => b.price_per_hour - a.price_per_hour);

      case "popular-low-high":
        return filtered.sort((a, b) => a.rating - b.rating);

      case "popular-high-low":
        return filtered.sort((a, b) => b.rating - a.rating);

      case "show-all":
      default:
        return filtered;
    }
  };

  const filteredPsychologists = getFilteredPsychologists();
  const visiblePsychologists = filteredPsychologists.slice(0, displayedCount);
  const hasMore = displayedCount < filteredPsychologists.length;

  const handleLoadMore = () => {
    dispatch(loadMore());
  };

  const handleFilterChange = (newFilter) => {
    setActiveFilter(newFilter);
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
      <Filters
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
      />
      <div className={css.listWrapper}>
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
          <div className={css.loader}>
            <Loader />
          </div>
        )}

        {!isLoading && hasMore && psychologists.length > 0 && (
          <button className={css.button} onClick={handleLoadMore}>
            Load more
          </button>
        )}
      </div>
    </div>
  );
}

export default PsychList;
