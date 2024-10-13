const getFileIntoBase64 = (file) => {
  return `data:image/jpeg;base64,${file}`;
};

export default getFileIntoBase64;
