import { Buffer } from 'buffer';

export const formatDate = (date: Date) => {
  const utcString = date.toUTCString();
  const month = utcString.split(' ')[2];
  const day = parseInt(utcString.split(' ')[1], 10);

  return month + ' ' + day;
};

export const getGuestServiceFee = (price: number) => {
  const total = price * 0.142;
  return Math.ceil(total);
};

export const getHostServiceFee = (price: number) => {
  const fee = price * 0.03;
  return Math.ceil(fee);
};

export const isAlphaWithSpacesAndAccents = (inputValue: string) => {
  const pattern = /^[\p{L}\s]+$/u;
  return pattern.test(inputValue);
};

export const isAlphaWithSpacesAccentsAndNumbers = (inputValue: string) => {
  const pattern = /^[\p{L}\d\s]+$/u;
  return pattern.test(inputValue);
};

export const isBlankString = (inputValue: string) => {
  return inputValue.trim().length === 0;
};

export const convertToMB = (size: number) => {
  return size / (1024 * 1024);
};

export const convertToKB = (size: number) => {
  return size / 1024;
};

export const convertToBase64 = (photos: Buffer[]) => {
  const base64Photos = photos.map((photo) => {
    const base64 = Buffer.from(photo).toString('base64');
    return `data:image/jpeg;base64,${base64}`;
  });
  return base64Photos;
};
