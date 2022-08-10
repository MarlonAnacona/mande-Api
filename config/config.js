// require('dotenv').config();

// const config = {
//   env: process.env.NODE_ENV || 'dev',
//   port: process.env.PORT || 3000,
//   dbUser: process.env.DB_USER,
//   dbPassword: process.env.DB_PASSWORD,
//   dbHost: process.env.DB_HOST,
//   dbName: process.env.DB_NAME,
//   dbPort: process.env.DB_PORT,
// };

const config = {
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 5432,
  dbUser: 'marlon',
  dbPassword: 'admin123',
  dbHost: '172.18.0.2',
  dbName: 'mande_db',
  dbPort: '5432',
};

// PORT = 3000;
// DB_USER = "marlon";
// DB_PASSWORD = "admin123";
// DB_HOST = "localhost";
// DB_NAME = "mande_db";
// DB_PORT = "5432";

module.exports = { config };
