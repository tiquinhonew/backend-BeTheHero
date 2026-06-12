const knex = require('knex');
const path = require('path');
const configuration = require('../../knexfile');

const config = process.env.NODE_ENV === 'production'
  ? configuration.production
  : configuration.development;

// Ajuste para garantir que o caminho do SQLite seja absoluto na Vercel
if (config.client === 'sqlite3') {
  config.connection.filename = path.resolve(__dirname, 'db.sqlite');
}

const connection = knex(config);

module.exports = connection;