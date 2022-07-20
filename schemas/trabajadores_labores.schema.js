const Joi=require("joi");

const id=Joi.string().uuid();
const idUsuario=Joi.string().uuid();
const idTrabajador=Joi.string().uuid();


const createTrabajadoresLaboresSchema=Joi.object({
    idTrabajador: idTrabajador.required(),
    idUsuario: idUsuario.required(),

});

const updateTrabajadoresLaboresSchema=Joi.object({
    
})

const getTrabajadoresLaboresSchema=Joi.object({
    id:id.required(),
})

module.exports={ createTrabajadoresLaboresSchema, updateTrabajadoresLaboresSchema, getTrabajadoresLaboresSchema}