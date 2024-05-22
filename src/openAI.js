async function getVisionResult(axios, base64Image, apiKey) {
  // Adapted from Source 0, assuming you have the necessary setup for OpenAI API calls
  const payload = {
    model: "gpt-4o",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "What is in the image?",
          },
          {
            type: "image_url",
            image_url: { url: `data:image/jpeg;base64,${base64Image}` },
          },
        ],
      },
    ],
    max_tokens: 3500,
  };

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };

  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    payload,
    { headers }
  );

  if (response.data.choices && response.data.choices.length > 0) {
    const content = response.data.choices[0].message.content;
    return content;
  } else {
    throw new Error("No response from OpenAI API");
  }
}

module.exports = { getVisionResult };
