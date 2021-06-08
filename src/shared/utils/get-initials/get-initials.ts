export const getIntials = (firstName: string, lastName: string): string => {
  return firstName[0].toUpperCase() + lastName[0].toUpperCase();
};
