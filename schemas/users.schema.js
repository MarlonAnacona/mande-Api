const Joi = require('joi');

const id = Joi.string().uuid();
const nombre = Joi.string().min(3).max(15);
const apellido = Joi.string().min(3).max(15);
const tipoDocumento = Joi.string().min(2);
const numeroDocumento = Joi.number().integer();
const genero = Joi.string().min(1);
const telefono = Joi.string().min(5);
const email = Joi.string().email();
const password = Joi.string().min(8);
const direccion = Joi.string().min(5);

const createUserSchema = Joi.object({
  tipoDocumento: tipoDocumento.required(),
  numeroDocumento: numeroDocumento.required(),
  nombre: nombre.required(),
  apellido: apellido.required(),
  email: email.required(),
  telefono: telefono.required(),
  genero: genero.required(),
  password: password.required(),
  direccion: direccion.required(),
});

const updateUserSchema = Joi.object({
  nombre: nombre.required(),
  genero: genero.required(),
  telefono: telefono.required,
  email: email.required(),
  password: password.required(),
  direccion: direccion.required(),
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema };
