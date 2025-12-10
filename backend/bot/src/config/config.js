module.exports = {
  telegram: {
    botToken: process.env.TELEGRAM_BOT_TOKEN || '8514479825:AAEoIaxZPskKt8KPcyi-HYAawJVtecRULFg',
    chatId: process.env.TELEGRAM_CHAT_ID || '3210397989'
  },
  api: {
    url: process.env.API_URL || 'http://localhost:5000/api'
  }
};