/**
 * Get initials from a full name.
 * Returns the first letter of the first name and last name.
 * If only one name is provided, returns just the first letter.
 */
export const getInitials = (name: string): string => {
  const names = name.trim().split(" ");
  if (names.length === 1) {
    return names[0].charAt(0).toUpperCase();
  }
  return (
    names[0].charAt(0).toUpperCase() +
    names[names.length - 1].charAt(0).toUpperCase()
  );
};
