import { createSlice } from "@reduxjs/toolkit";
import { fetchFavorites } from "./operations";
import { handleError, handlePending } from "../../utils/reduxUtils";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    favoriteNames: [],
    displayedCount: 3,
    isLoading: false,
    error: null,
  },
  reducers: {
    loadMore: (state) => {
      state.displayedCount += 3;
    },
    addFavorite(state, action) {
      const name = action.payload;
      if (!state.favoriteNames.includes(name)) {
        state.favoriteNames.push(name);
      }
    },
    removeFavorite(state, action) {
      const name = action.payload;
      state.favoriteNames = state.favoriteNames.filter((fav) => fav !== name);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, handlePending)
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favoriteNames = action.payload;
      })
      .addCase(fetchFavorites.rejected, handleError);
  },
});

export const { loadMore, addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
