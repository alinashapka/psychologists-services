import { createSelector } from "@reduxjs/toolkit";

export const selectFavoritesLoading = (state) => state.favorites.isLoading;
export const selectDisplayedCount = (state) => state.favorites.displayedCount;
export const selectFavoriteNames = (state) =>
  state.favorites.favoriteNames || [];
export const selectPsychologists = (state) => state.psychologists.items || [];

export const selectFavoritePsychologists = createSelector(
  [selectPsychologists, selectFavoriteNames],
  (psychologists, favoriteNames) => {
    const decoded = favoriteNames.map((name) => decodeURIComponent(name));

    return psychologists.filter((psych) => decoded.includes(psych.name));
  }
);
