const Joi = require('joi');

const id = Joi.string().uuid();
const idUsuario = Joi.string().uuid();

const tajerta = Joi.string().min(3).max(15);

const price = Joi.number().integer().min(10);
const image = Joi.string().uri();

const createClienteSchema = Joi.object({
  image: image.required(),
  medioPago: tajerta.required(),
  price: price.required(),
  idUsuario: idUsuario.required(),
});

const updateClienteSchema = Joi.object({
  image: image.required(),
  medioPago: tajerta.required(),
  price: price.required(),
});

const getClienteSchema = Joi.object({
  id: id.required(),
});

module.exports = { createClienteSchema, updateClienteSchema, getClienteSchema };
