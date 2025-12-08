// Установите зависимости: npm install node-telegram-bot-api dotenv

require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

// Токен из .env файла
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8514479825:AAEoIaxZPskKt8KPcyi-HYAawJVtecRULFg';
const ADMIN_CHAT_ID = '3210397989'; // ID группы для админа

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

console.log('🤖 Telegram бот запущен!');

// Команда /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  console.log('👀 msg.chat =', msg.chat);     // <--- добавили
  console.log('👉 chat.id =', msg.chat.id);   // <--- добавили
  const welcomeMessage = `
👋 Добро пожаловать!

Доступные команды:

📝 /settext - Изменить текст на сайте
📖 /gettext - Показать текущий текст
ℹ️ /help - Показать список команд

Для изменения текста просто отправьте команду /settext, а затем новый текст.
  `;
  
  bot.sendMessage(chatId, welcomeMessage);
});

// Команда /help
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  
  const helpMessage = `
📚 Список команд:

/settext <текст> - Изменить текст на сайте
Пример: /settext Новый приветственный текст для пользователей

/gettext - Показать текущий текст на сайте

/help - Показать это сообщение
  `;
  
  bot.sendMessage(chatId, helpMessage);
});

// Команда /settext для изменения текста на сайте
bot.onText(/\/settext (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const newText = match[1];
  
  try {
    // Здесь вы будете сохранять текст в вашу базу данных или хранилище
    // Для примера используем простой файл или API
    
    // В реальном проекте вы можете использовать:
    // - Firebase Realtime Database
    // - MongoDB
    // - PostgreSQL
    // - Redis
    // - Или файл на сервере
    
    // Пример с использованием файла:
    const fs = require('fs').promises;
    const dataPath = './site_data.json';
    
    await fs.writeFile(dataPath, JSON.stringify({ dynamicText: newText }));
    
    bot.sendMessage(chatId, `✅ Текст успешно обновлен!\n\n📄 Новый текст:\n"${newText}"`);
    
    console.log(`Текст обновлен: ${newText}`);
  } catch (error) {
    console.error('Ошибка при обновлении текста:', error);
    bot.sendMessage(chatId, '❌ Произошла ошибка при обновлении текста. Попробуйте еще раз.');
  }
});

bot.onText(/\/banner/, async (msg) => {
  const chatId = msg.chat.id;

  const BANNER_IMAGE_URL = 'https://vizitok.by/wp-content/uploads/2025/04/3q1wg3jys9vwzamcin5qezdlnyfxaybujgn3ssj4.webp'; // ссылка на картинку
  const TARGET_URL = 'https://sexa.net/'; // ссылка, куда ведёт реклама

  const caption = `
🔥 *Специальное предложение!*

Оставьте заявку прямо сейчас и получите консультацию бесплатно!
  `;

  await bot.sendPhoto(chatId, BANNER_IMAGE_URL, {
    caption,
    parse_mode: 'Markdown',
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: '🔗 Перейти на сайт',
            url: TARGET_URL,
          },
        ],
      ],
    },
  });
});

// Команда /gettext для получения текущего текста
bot.onText(/\/gettext/, async (msg) => {
  const chatId = msg.chat.id;
  
  try {
    const fs = require('fs').promises;
    const dataPath = './site_data.json';
    
    const data = await fs.readFile(dataPath, 'utf8');
    const parsed = JSON.parse(data);
    
    bot.sendMessage(chatId, `📄 Текущий текст на сайте:\n\n"${parsed.dynamicText}"`);
  } catch (error) {
    bot.sendMessage(chatId, '📄 Текст еще не был установлен.');
  }
});

// Обработка всех входящих сообщений (заявки)
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  
  // Проверяем, что это не команда
  if (!msg.text || msg.text.startsWith('/')) {
    return;
  }
  
  // Если сообщение не команда, отправляем подсказку
  if (chatId !== parseInt(ADMIN_CHAT_ID)) {
    bot.sendMessage(chatId, 'Используйте команду /help для просмотра доступных команд');
  }
});

// Обработка ошибок
bot.on('polling_error', (error) => {
  console.error('Polling error:', error);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Остановка бота...');
  bot.stopPolling();
  process.exit(0);
});