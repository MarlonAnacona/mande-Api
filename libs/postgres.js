const { Pool } = require('pg');

//const { config } = require('../config/config');

// const USER = encodeURIComponent(config.dbUser);
// const PASSWORD = encodeURIComponent(config.dbPassword);

/*const USER = config.dbUser;
const PASSWORD = config.dbPassword;

const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
console.log('URI ', URI);
const pool = new Pool({ connectionString: URI });*/

/*const pool = new Pool({
  user: 'lrwtdwbckfoeub',
  host: 'ec2-100-26-39-41.compute-1.amazonaws.com',
  port: '5432',

  password: 'd97b9a23753a112472f347c8da47c95fa6bd12eb7f5718eebd46a6c53b319ec0',
  database: 'd299vrgmj27lj3',
  ssl: true,
});
module.exports = pool;
*/

const config = {
  user: 'postgres',
  host: 'localhost',
  password: 'postgres',
  database: 'mydb',
  port: '5432',
};

const pool = new Pool(config);

module.exports = pool;
