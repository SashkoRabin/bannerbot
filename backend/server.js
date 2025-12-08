// backend/server.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');


// ПОРТ ДЛЯ ФРОНТА
const PORT = process.env.PORT || 5000;

// Путь к файлу с текстом, который меняет бот
// (здесь я считаю, что bot.js лежит в telegram-bot/src/bot.js)
const DATA_PATH = path.join(__dirname, '..', 'telegram-bot', 'src', 'site_data.json');

// Данные для уведомления в Telegram о заявке
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8514479825:AAEoIaxZPskKt8KPcyi-HYAawJVtecRULFg';
const ADMIN_CHAT_ID = process.env.ADMIN_CHAT_ID || '-1003210397989';

const app = express();

app.use(cors());
app.use(express.json());

/**
 * GET /api/text/get
 * Фронт берёт отсюда текст для баннера
 */
app.get('/api/text/get', async (req, res) => {
  try {
    const data = await fs.readFile(DATA_PATH, 'utf8');
    const parsed = JSON.parse(data);
    const text =
      parsed.dynamicText ||
      'Добро пожаловать! Заполните форму ниже для отправки заявки.';
    res.json({ text });
  } catch (err) {
    // Если файла нет — отдаём дефолтный текст
    res.json({
      text: 'Добро пожаловать! Заполните форму ниже для отправки заявки.',
    });
  }
});

/**
 * POST /api/form/submit
 * Фронт отправляет сюда заявку (ФИО, телефон, ИНН).
 * Здесь мы просто шлём уведомление в Telegram.
 */
app.post('/api/form/submit', async (req, res) => {
  const { phone, fullName, inn } = req.body || {};

  console.log('📨 Новая заявка с фронта:', { fullName, phone, inn });

  const text =
    `🆕 Новая заявка с сайта:\n\n` +
    `👤 ФИО: ${fullName || '-'}\n` +
    `📞 Телефон: ${phone || '-'}\n` +
    `🧾 Комментарий: ${inn || '-'}`;

  try {
    const tgRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: ADMIN_CHAT_ID,
        text,
      }),
    });

    const tgBody = await tgRes.text();
    console.log('🔔 Telegram response status:', tgRes.status);
    console.log('🔔 Telegram response body:', tgBody);

    res.json({ ok: true });
  } catch (err) {
    console.error('❌ Ошибка при отправке сообщения в Telegram:', err);
    res.status(500).json({ ok: false, error: 'telegram_failed' });
  }
});


app.listen(PORT, () => {
  console.log(`✅ Backend запущен на порту ${PORT}`);
});
