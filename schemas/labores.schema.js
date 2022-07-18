const Joi=require("joi");

const id=Joi.string().uuid();

const nameLabor=Joi.string().min(3).max(15);

const unitLabor=Joi.number().integer();
const priceLabor=Joi.number().integer().min(10);

const createLaborsSchema=Joi.object({
    nameLabor:nameLabor.required(),
    unitLabor:unitLabor.required(),
    priceLabor:priceLabor.required()
});

const updateLaborsSchema=Joi.object({
    nameLabor:nameLabor,
    unitLabor:unitLabor,
    priceLabor:priceLabor
})

const getLaborsSchema=Joi.object({
    id:id.required(),
})

module.exports={createLaborsSchema,updateLaborsSchema,getLaborsSchema}