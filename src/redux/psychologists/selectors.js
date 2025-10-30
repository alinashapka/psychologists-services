export const selectPsychologists = (state) => state.psychologists.items;
export const selectDisplayedCount = (state) =>
  state.psychologists.displayedCount;
export const selectisLoading = (state) => state.psychologists.isLoading;
export const selectError = (state) => state.psychologists.error;
