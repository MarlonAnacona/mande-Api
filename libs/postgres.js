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
  user: 'sfgibrahvvzmaz',
  host: 'ec2-3-224-184-9.compute-1.amazonaws.com',
  password: '99ef1449f3caa03596a716ebd20bb7dab0267fa87fd8e2c84ab160be0399ada5',
  database: 'd1nn7uejkbv3ds',
  port: '5432',
  ssl: {
    rejectUnauthorized: false,
  },
};

const pool = new Pool(config);

module.exports = pool;
