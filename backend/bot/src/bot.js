require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8514479825:AAEoIaxZPskKt8KPcyi-HYAawJVtecRULFg';
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

const helpCommand = require('./commands/helpCommand');
const getTextCommand = require('./commands/getTextCommand');
const setTextCommand = require('./commands/setTextCommand');

console.log('🤖 Telegram бот запущен!');

bot.onText(/\/start/, (msg) => {
  helpCommand.execute(bot, msg);
});

bot.onText(/\/help/, (msg) => {
  helpCommand.execute(bot, msg);
});

bot.onText(/\/gettext/, (msg) => {
  getTextCommand.execute(bot, msg);
});

bot.onText(/\/settext (.+)/, (msg, match) => {
  setTextCommand.execute(bot, msg, match);
});
