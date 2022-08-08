const { Pool } = require('pg');

const pool = new Pool({
  host: '172.17.0.3',
  port: 5432,
  user: 'marlon',
  password: '',
  datebase: 'mande_db',
});

module.exports = pool;
