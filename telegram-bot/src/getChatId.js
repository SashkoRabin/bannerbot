// telegram-bot/src/getChatId.js
require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8514479...RULFg'; // тот же токен, что в backend

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

console.log('✅ Бот для получения chat_id запущен.');
console.log('Напишите ЛЮБОЕ сообщение в нужную группу, где добавлен этот бот.');

bot.on('message', (msg) => {
  console.log('👀 msg.chat =', msg.chat);
  console.log('👉 chat.id =', msg.chat.id);
});
