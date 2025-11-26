export const selectFavoriteNames = (state) => state.favorites.FavoriteNames;
export const selectFavoritesLoading = (state) => state.favorites.isLoading;
export const selectFavoritePsychologists = (state) => {
  const allPsychologists = state.psychologists.items;
  const favoriteNames = state.favorites.favoriteNames;

  return allPsychologists.filter((psych) => favoriteNames.includes(psych.name));
};
