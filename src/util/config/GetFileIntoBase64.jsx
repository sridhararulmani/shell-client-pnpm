const getFileIntoBase64 = (file, fileType) => {
  return `data:${fileType || null};base64,${file || null}`;
};

export default getFileIntoBase64;
