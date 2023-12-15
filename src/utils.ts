export const formatDate = (date: Date) => {
  const utcString = date.toUTCString();
  const month = utcString.split(' ')[2];
  const day = parseInt(utcString.split(' ')[1], 10);

  return month + ' ' + day;
};
