export const getBackgroundColor = (backgroundColor) => {
  switch (backgroundColor) {
    case "lightGray":
      return "bg-lightGray-500";
    case "darkGray":
      return "bg-darkGray-500";
    case "primary":
      return "bg-primary-500";
    case "secondary":
      return "bg-secondary-500";
    case "white":
    default:
      return "bg-white";
  }
};