export const formatPrice = (price) =>
  price.toLocaleString("nl-BE", {
    style: "currency",
    currency: "EUR",
  });
