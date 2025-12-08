// telegram-bot/src/commands/setTextCommand.js
const config = require('../config/config');

// Попробуем взять базовый URL бекенда из конфига или .env
const API_BASE_URL =
  (config.backend && (config.backend.baseUrl || config.backend.apiUrl)) ||
  process.env.BACKEND_URL ||
  'http://localhost:5000';

module.exports = {
  /**
   * /settext Новый текст
   */
  async execute(bot, msg, match) {
    const chatId = msg.chat.id;

    // Ограничиваем доступ только указанным chatId (админ)
    if (config.telegram.chatId && chatId.toString() !== config.telegram.chatId.toString()) {
      return bot.sendMessage(
        chatId,
        '⛔ У вас нет прав на изменение текста сайта.'
      );
    }

    const newText = (match && match[1] ? match[1] : '').trim();

    if (!newText) {
      return bot.sendMessage(
        chatId,
        '⚠️ Пожалуйста, укажите текст.\n\nПример:\n`/settext Новый текст баннера`',
        { parse_mode: 'Markdown' }
      );
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/text/set`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newText }),
      });

      if (!res.ok) {
        throw new Error(`Backend status: ${res.status}`);
      }

      bot.sendMessage(
        chatId,
        `✅ Текст на сайте успешно обновлён!\n\nНовый текст:\n\n${newText}`
      );
    } catch (err) {
      console.error('Ошибка в setTextCommand:', err);
      bot.sendMessage(
        chatId,
        '❌ Не удалось обновить текст на сайте. Проверьте, запущен ли backend (порт 5000).'
      );
    }
  },
};
