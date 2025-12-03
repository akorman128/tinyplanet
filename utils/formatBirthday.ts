export const formatBirthday = (birthday: string | undefined) => {
  if (!birthday) return "Not set";
  const date = new Date(birthday);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};
