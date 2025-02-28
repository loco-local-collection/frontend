export const useClipboard = (text) => {
  const copy = () => navigator.clipboard.writeText(text);
  return { copy };
};
