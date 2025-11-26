import { createSlice } from "@reduxjs/toolkit";
import { fetchFavorites } from "./operations";
import { handleError, handlePending } from "../../utils/reduxUtils";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    favoriteNames: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
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

export default favoritesSlice.reducer;
