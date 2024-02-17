import {ChangeEvent, useState} from "react";


export const useUploadImageToFormatBase64 = () => {
  const [base64, setBase64String] = useState<string | null>(null);
  const handleImageFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = reader.result as string;
      const base64WithoutPrefix = base64String.split(',')[1];
      setBase64String(base64WithoutPrefix);
    };
  };

  return {base64, handleImageFileChange};

}