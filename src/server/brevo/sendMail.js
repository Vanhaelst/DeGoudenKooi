export const sendMail = async (obj) => {
  const result = await fetch("/api/brevo/sendMail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });
  return result.json();
};
