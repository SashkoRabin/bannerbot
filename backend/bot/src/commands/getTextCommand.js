const fetch = require('node-fetch');

module.exports = {
  async execute(bot, msg) {
    const chatId = msg.chat.id;

    try {
      const res = await fetch('http://localhost:5000/api/text/get');
      const data = await res.json();

      bot.sendMessage(chatId, `📄 Текущий текст:\n\n${data.text}`);
    } catch (err) {
      bot.sendMessage(chatId, '❌ Ошибка получения текста');
    }
  },
};
