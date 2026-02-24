import { UploadedFile } from '../types';

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const processFile = async (file: File): Promise<UploadedFile> => {
  const base64 = await fileToBase64(file);
  return {
    file,
    previewUrl: URL.createObjectURL(file),
    base64,
  };
};

export const cleanBase64ForApi = (dataUrl: string): string => {
  // Removes "data:image/png;base64," prefix
  return dataUrl.split(',')[1];
};