require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const textRoutes = require('./routes/text.routes');
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8514479825:AAEoIaxZPskKt8KPcyi-HYAawJVtecRULFg';
const ADMIN_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '-1003210397989';
require('./bot/src/bot'); // ⬅️ ЗАПУСК ТГ БОТА

const app = express();

app.use(cors());
app.use(express.json());

const frontendPath = path.join(__dirname, '../frontend/build');
app.use(express.static(frontendPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

app.post('/api/form/submit', async (req, res) => {
  const { phone, fullName, inn } = req.body || {}; 
  const text = `🆕 Новая заявка с сайта:\n\n + 👤 ФИО: ${fullName || '-'}\n + 📞 Телефон: ${phone || '-'}\n + 🧾 Комментарий: ${inn || '-'}`; 
  try { 
    const tgRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, 
      { method: 'POST', headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify({ chat_id: ADMIN_CHAT_ID, text, }), }); 
    res.json({ ok: true }); 
  } catch (err) { 
    console.error('❌ Ошибка при отправке сообщения в Telegram:', err); 
    res.status(500).json({ ok: false, error: 'telegram_failed' }); 
  }
});

app.use('/api/text', textRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Backend запущен: ${PORT}`));
