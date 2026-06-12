require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());

// Rota de saúde para testar se o servidor está no ar
app.get('/status', (req, res) => {
  return res.json({ status: 'ok', env: process.env.NODE_ENV });
});

app.use(routes);

// Tratamento de erros básico para logs da Vercel
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 3333;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

module.exports = app;