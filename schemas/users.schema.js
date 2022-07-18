const Joi = require('joi');

const id = Joi.string().uuid();
const name=Joi.string().min(3).max(15);
const tipoDocumento= Joi.string().min(2);
const numeroDocumento=Joi.number().integer();
const sex= Joi.string().min(1);
const celphone=Joi.number().integer().min(10);
const email = Joi.string().email();
const password = Joi.string().min(8);
const addres = Joi.string().min(5);

const createUserSchema = Joi.object({
  tipoDocumento: tipoDocumento.required(),
  numeroDocumento: numeroDocumento.required(),
  name: name.required(),
  sex: sex.required(),
  celphone: celphone.required(),
  email: email.required(),
  password: password.required(),
  addres: addres.required()
});

const updateUserSchema = Joi.object({
    name: name.required(),
    sex: sex.required(),
    celphone: celphone.required,
    email: email.required(),
    password: password.required(),
    addres: addres.required()
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = {createUserSchema,updateUserSchema,getUserSchema};