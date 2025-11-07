export const formatPhoneNumber = (phone: string) => {
  return `+1${phone.replace(/[^0-9]/g, "")}`;
};
