const Joi = require('joi');

const id = Joi.string().uuid();

const nameservice = Joi.string().min(3).max(15);
const fecha = Joi.string().min(5);
const observacion = Joi.string().min(0);
const valor_Servicio = Joi.number().integer().min(10);
const estado_service = Joi.boolean();
const califica = Joi.number().integer();

const createServiciosSchema = Joi.object({
  fecha: fecha.required(),
  valor_Servicio: valor_Servicio.required(),
  observacion: observacion.required(),
  estado_service: estado_service.required(),
  califica: califica.required(),
});

const updateServiciosSchema = Joi.object({
  nameservice: nameservice,
  fecha: fecha,
  valor_Servicio: valor_Servicio,
  observacion: observacion,
  estado_service: estado_service,
  califica: califica,
});

const getServiciosSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createServiciosSchema,
  updateServiciosSchema,
  getServiciosSchema,
};
