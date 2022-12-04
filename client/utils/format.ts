export const capitalizeString = (text: string) => {
  return `${text.at(0)?.toUpperCase()}${text.slice(1)}`;
};
