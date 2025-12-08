// telegram-bot/src/commands/helpCommand.js

module.exports = {
  /**
   * /help
   */
  execute(bot, msg) {
    const chatId = msg.chat.id;

    const helpText = `
📋 *Доступные команды:*

/start   - Приветственное сообщение и описание
/help    - Список команд

/settext Текст
Изменить текст на сайте.
Пример:
\`/settext Добро пожаловать на наш сайт!\`

/gettext
Показать текущий текст, который видит пользователь на сайте.
    `;

    bot.sendMessage(chatId, helpText, { parse_mode: 'Markdown' });
  },
};
