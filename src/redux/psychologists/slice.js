import { createSlice } from "@reduxjs/toolkit";
import { fetchPsychologists } from "./operations";
import { handlePending, handleError } from "../../utils/reduxUtils";

const initialState = {
  items: [],
  currentPsych: null,
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
    setCurrentPsych: (state, action) => {
      state.currentPsych = action.payload;
    },
    clearCurrentPsych: (state) => {
      state.currentPsych = null;
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

export const { loadMore, setCurrentPsych, clearCurrentPsych } =
  psychologistsSlice.actions;
export default psychologistsSlice.reducer;
