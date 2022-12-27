const { Pool } = require('pg');

/*Cambiar direcciones, crear un database en oracle*/
const config = {
  user: /*Usuario en oracle*/ 'sfgibrahvvzmaz',
  host: /*HOST EN LA DB*/ 'ec2-3-224-184-9.compute-1.amazonaws.com',
  password:
    /*contraseña de la bd*/ '99ef1449f3caa03596a716ebd20bb7dab0267fa87fd8e2c84ab160be0399ada5',
  database: /*Nombre de la bd*/ 'd1nn7uejkbv3ds',
  port: '5432',
  ssl: {
    rejectUnauthorized: false,
  },
};

const pool = new Pool(config);

module.exports = pool;
