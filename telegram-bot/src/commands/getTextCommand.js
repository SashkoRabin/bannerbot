// telegram-bot/src/commands/getTextCommand.js
const config = require('../config/config');

const API_BASE_URL =
  (config.backend && (config.backend.baseUrl || config.backend.apiUrl)) ||
  process.env.BACKEND_URL ||
  'http://localhost:5000';

module.exports = {
  /**
   * /gettext
   */
  async execute(bot, msg) {
    const chatId = msg.chat.id;

    try {
      const res = await fetch(`${API_BASE_URL}/api/text/get`);

      if (!res.ok) {
        throw new Error(`Backend status: ${res.status}`);
      }

      const data = await res.json();
      const currentText = data.text || 'Текст не найден.';

      bot.sendMessage(
        chatId,
        `📄 *Текущий текст на сайте:*\n\n${currentText}`,
        { parse_mode: 'Markdown' }
      );
    } catch (err) {
      console.error('Ошибка в getTextCommand:', err);
      bot.sendMessage(
        chatId,
        '❌ Не удалось получить текст с сайта. Проверьте, запущен ли backend (порт 5000).'
      );
    }
  },
};
