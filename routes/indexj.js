 // const express = require('express');
const productsRouter = require('./products.routes');
const servicio = require('./servicios');
const usersRouter = require('./users.routes');
const laboresRouters = require('./labores');
const clienteRouters = require('./cliente.routes');

const trabjadoresRouters = require('./trabajadores.routes');

const trabajadoresLaboresRouters = require('./trabajadores_labores.routes');

function routerApi(app) {
  // const router = express.Router();
  app.use('/products', productsRouter);
  app.use('/users', usersRouter);
  app.use('/servicios', servicio);
  app.use('/labores', laboresRouters);
  app.use('/trabajadores', trabjadoresRouters);
  app.use('/cliente', clienteRouters);
  app.use('/trabajadores-labores', trabajadoresLaboresRouters);
}

module.exports = routerApi;
