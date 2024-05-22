const dotenv = require("dotenv");
const openAI = require("openai");
const { getFilePath } = require("./src/getFilePath");
const { convertToBase64 } = require("./src/convertToBase64");
const axios = require("axios");
const TelegramBot = require("node-telegram-bot-api");
const { getVisionResult } = require("./src/openAI");

dotenv.config();

// const openai = new OpenAI();

const token = process.env.BOT_TOKEN;
const apiKey = process.env.API_KEY;

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Please send a photo.");
});

bot.on("photo", async (msg) => {
  const { photo } = msg;
  const { file_id } = photo[photo.length - 1];

  const filePath = await getFilePath(axios, file_id, token);
  const base64Buffer = await convertToBase64(axios, filePath, token);
  const apiResult = await getVisionResult(axios, base64Buffer, apiKey);
  // console.log(apiResult);
  // console.log(file_id);
});
