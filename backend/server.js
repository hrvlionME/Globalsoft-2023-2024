require('dotenv').config({ path: './config/.env' });

const express = require('express');
const app = express();
const PORT = process.env.BACKEND_PORT || 4000;

const db = require('./config/db');

app.get('/', (req, res) => {
  res.send('Pozdrav svijete');
});

app.get('/test', (req, res) => {
  const sql = 'SELECT * FROM test';
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.listen(PORT, () => {
  console.log('Server pokrenut');
});
