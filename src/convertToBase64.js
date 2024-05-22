async function convertToBase64(axios, filePath, token) {
  const response = await axios.get(
    `https://api.telegram.org/file/bot${token}/${filePath}`,
    { responseType: "arraybuffer" }
  );
  return Buffer.from(response.data, "binary").toString("base64");
}

module.exports = { convertToBase64 };
