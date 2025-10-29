import { createSlice } from "@reduxjs/toolkit";
import { fetchPsychologists } from "./operations";
import { handlePending, handleError } from "../../utils/reduxUtils";

const initialState = {
  items: [],
  displayedCount: 3,
  isLoading: false,
  error: null,
};

const psychologistsSlice = createSlice({
  name: "psychologists",
  initialState,
  reducers: {
    loadMore: (state) => {
      state.displayedCount += 3;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPsychologists.pending, handlePending)
      .addCase(fetchPsychologists.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchPsychologists.rejected, handleError);
  },
});

export default psychologistsSlice.reducer;
