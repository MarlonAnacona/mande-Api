const Joi = require('joi');

const id = Joi.number().integer();
const idUsuario = Joi.string().uuid();

const tajerta = Joi.string().min(3).max(15);

const CantidadEstrellas = Joi.number().integer().min(10);
const image = Joi.string().uri();
const imageDocumento = Joi.string().uri();
const disponibilidad = Joi.boolean();

const createTrabajadorSchema = Joi.object({
  image: image.required(),
  imageDocumento: imageDocumento.required(),
  CantidadEstrellas: CantidadEstrellas.required(),
  disponibilidad: disponibilidad.required(),
  idUsuario: idUsuario.required(),
});

const updateTrabajadorSchema = Joi.object({
  image: image.required(),
  imageDocumento: imageDocumento.required(),
  CantidadEstrellas: CantidadEstrellas.required(),
  disponibilidad: disponibilidad.required(),
});

const getTrabajadorSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createTrabajadorSchema,
  updateTrabajadorSchema,
  getTrabajadorSchema,
};
