const fetch = require('node-fetch');

const ADMIN_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

module.exports = {
  async execute(bot, msg, match) {
    const chatId = msg.chat.id;

    if (chatId.toString() !== ADMIN_CHAT_ID) {
      return bot.sendMessage(chatId, '⛔ Нет прав');
    }

    const newText = match[1];

    try {
      await fetch('http://localhost:5000/api/text/set', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newText }),
      });

      bot.sendMessage(chatId, '✅ Текст обновлён');
    } catch (err) {
      bot.sendMessage(chatId, '❌ Ошибка сервера');
    }
  },
};
