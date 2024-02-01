export const decodeImage = (base64String: string) => {
  const binaryString = atob(base64String);
  const length = binaryString.length;
  const bytes = new Uint8Array(length);

  for (let i = 0; i < length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  const blob = new Blob([bytes], { type: 'image/jpeg' });

  const imageUrl = URL.createObjectURL(blob);

  return imageUrl;
};