async function getFilePath(axios, fileId, token) {
  const response = await axios.get(
    `https://api.telegram.org/bot${token}/getFile`,
    {
      params: {
        file_id: fileId,
      },
    }
  );
  return response.data.result.file_path;
}

module.exports = { getFilePath };
