const options = {
  // weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

export const formatDate = (date) => {
  const cleanDate = new Date(date);
  return cleanDate?.toLocaleString("nl-BE", options);
};
