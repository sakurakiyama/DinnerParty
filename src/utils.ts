export const formatDate = (date: Date) => {
  const month = date.toLocaleString('default', { month: 'short' });
  const day = date.getDate();
  return month + ' ' + day;
};
