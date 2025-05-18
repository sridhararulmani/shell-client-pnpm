import React from "react";

export const fileToByteArray = React.memo((file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(new Uint8Array(reader.result));
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
});

export const byteArrayToImageUrl = React.memo((byteArray, mimeType = "image/jpeg") => {
  const blob = new Blob([new Uint8Array(byteArray)], { type: mimeType });
  const url = URL.createObjectURL(blob);
  return url;
});