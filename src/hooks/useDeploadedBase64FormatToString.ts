import {useEffect, useState} from "react";


export const useDeploadedBase64FormatToString = (base64String: string) => {
  const [deploadedFromBase64, setDeploadedFromBase64] = useState<string>();

  useEffect(()=>{
    if (!base64String) return;

    const binaryString = atob(base64String);
    const length = binaryString.length;
    const bytes = new Uint8Array(length);

    for (let i = 0; i < length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    const blob = new Blob([bytes], { type: 'image/jpeg' });

    const imageUrl = URL.createObjectURL(blob);
    setDeploadedFromBase64(imageUrl);
  },[base64String])


  return {deploadedFromBase64}
}