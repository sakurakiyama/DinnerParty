import { Buffer } from 'buffer';
import imageCompression from 'browser-image-compression';

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

export const convertToBase64 = (photos: string[]) => {
  const base64Photos = photos.map((photo) => {
    const base64 = Buffer.from(photo).toString('base64');
    return `data:image/jpeg;base64,${base64}`;
  });
  return base64Photos;
};

export const validateDrop = async (
  file: File,
  setErrorMessage: (value: React.SetStateAction<string>) => void
) => {
  const type = file.type;
  const KBSize = convertToKB(file.size);
  const MBSize = convertToMB(file.size);

  if (type !== 'image/png' && type !== 'image/jpeg') {
    setErrorMessage(
      'Invalid file format. Please upload a photo in PNG or JPEG format.'
    );
    return { valid: false };
  } else if (KBSize < 50) {
    setErrorMessage(
      'Photo size is too small. Please upload a photo larger than 50KB.'
    );
    return { valid: false };
  } else if (MBSize > 10) {
    setErrorMessage(
      'Photo size exceeds the maximum limit. Please upload a photo less than 10MB.'
    );
    return { valid: false };
  } else {
    setErrorMessage('');
    return { valid: true };
  }
};

export const readAsDataURL = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    } catch (error) {
      reject(error);
    }
  });
};

export const processValid = async (files: File[]) => {
  const compressedFiles: string[] = await Promise.all(
    files.map(async (file) => {
      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(file, options);
      return readAsDataURL(compressedFile);
    })
  );
  return compressedFiles;
};
