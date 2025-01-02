export const fileToByteArray = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(new Uint8Array(reader.result));
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};

export const byteArrayToImageUrl = (byteArray, mimeType = "image/jpeg") => {
  const blob = new Blob([new Uint8Array(byteArray)], { type: mimeType });
  const url = URL.createObjectURL(blob);
  return url;
};