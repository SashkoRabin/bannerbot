const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const router = express.Router();

const DATA_PATH = path.join(__dirname, '..', 'data', 'site_data.json');

router.get('/get', async (req, res) => {
  try {
    const data = await fs.readFile(DATA_PATH, 'utf8');
    res.json(JSON.parse(data));
  } catch {
    res.json({ text: 'Текст не задан' });
  }
});

router.post('/set', async (req, res) => {
  const { text } = req.body;
  await fs.writeFile(DATA_PATH, JSON.stringify({ text }));
  res.json({ ok: true });
});

module.exports = router;
