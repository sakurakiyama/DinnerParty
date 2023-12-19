export const formatDate = (date: Date) => {
  const utcString = date.toUTCString();
  const month = utcString.split(' ')[2];
  const day = parseInt(utcString.split(' ')[1], 10);

  return month + ' ' + day;
};

export const addGuestServiceFee = (price: number) => {
  const total = price * 0.142;
  return Math.ceil(total) + price;
};
