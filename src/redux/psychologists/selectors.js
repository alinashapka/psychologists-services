export const selectPsychologists = (state) => state.psychologists.items;
export const selectCurrentPsych = (state) => {
  const name = state.psychologists.currentPsych;
  if (!name) return null;
  return state.psychologists.items.find((p) => p.name === name);
};
export const selectDisplayedCount = (state) =>
  state.psychologists.displayedCount;
export const selectisLoading = (state) => state.psychologists.isLoading;
export const selectError = (state) => state.psychologists.error;
