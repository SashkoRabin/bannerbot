module.exports = {
  execute(bot, msg) {
    const chatId = msg.chat.id;

    const helpText = `
📋 Команды:
/help
/gettext
/settext Новый текст
    `;

    bot.sendMessage(chatId, helpText);
  },
};
