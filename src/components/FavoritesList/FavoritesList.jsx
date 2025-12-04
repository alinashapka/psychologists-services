import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import { fetchPsychologists } from "../../redux/psychologists/operations";
import { fetchFavorites } from "../../redux/favorites/operations";
import {
  selectFavoritePsychologists,
  selectFavoritesLoading,
  selectDisplayedCount,
} from "../../redux/favorites/selectors";
import PsychCard from "../../components/PsychCard/PsychCard";
import Loader from "../../components/Loader/Loader";
import Filters from "../Filters/Filters";
import { loadMore } from "../../redux/favorites/slice";
import css from "./FavoritesList.module.css";

function FavoritesList() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const favoritePsychologists = useSelector(selectFavoritePsychologists);
  const isLoading = useSelector(selectFavoritesLoading);
  const displayedCount = useSelector(selectDisplayedCount);

  const [activeFilter, setActiveFilter] = useState("a-to-z");

  useEffect(() => {
    dispatch(fetchPsychologists());

    if (user) dispatch(fetchFavorites(user.uid));
  }, [dispatch, user]);

  const getFilteredPsychologists = () => {
    const filtered = [...favoritePsychologists];

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

  if (isLoading) {
    return (
      <div className={css.loader}>
        <Loader />
      </div>
    );
  }

  if (favoritePsychologists.length === 0) {
    return (
      <div className={css.messageContainer}>
        <p>No favorites yet. Add some psychologists to your favorites!</p>
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
            <li key={psych.name} className={css.item}>
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

        {isLoading && favoritePsychologists.length > 0 && (
          <div className={css.loader}>
            <Loader />
          </div>
        )}

        {!isLoading && hasMore && favoritePsychologists.length > 0 && (
          <button className={css.button} onClick={handleLoadMore}>
            Load more
          </button>
        )}
      </div>
    </div>
  );
}

export default FavoritesList;
