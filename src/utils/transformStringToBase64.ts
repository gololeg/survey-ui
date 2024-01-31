import {ChangeEvent} from "react";

const toBase64 = (file: File | null): Promise<string | null> => {
  return new Promise((resolve) => {
    if (!file) {
      resolve(null);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = reader.result as string;
      const base64WithoutPrefix = base64String.split(',')[1];
      resolve(base64WithoutPrefix);
    };
  });
};

export const handleFileChange = async (event: ChangeEvent<HTMLInputElement>, state: (base64:string | null) => void) => {
  const file = event.target.files?.[0] as File;
  const base64 = await toBase64(file);
  state(base64);
};