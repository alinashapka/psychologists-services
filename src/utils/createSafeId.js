export const createSafeId = (name) => {
  return name
    .replace(/\./g, "") // Remove periods
    .replace(/\#/g, "") // Remove #
    .replace(/\$/g, "") // Remove $
    .replace(/\[/g, "") // Remove [
    .replace(/\]/g, "") // Remove ]
    .replace(/\s+/g, "_") // Replace spaces with underscore
    .trim();
};
