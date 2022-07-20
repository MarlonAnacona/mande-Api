const express = require("express");
const trabajadores_labores = require("./../services/trabajadores_labores.service")

const router = express.Router();
const service = new trabajadores_labores();
const errorHandlerValidator = require("./../middlware/validator");
const { createTrabajadoresLaboresSchema, updateTrabajadoresLaboresSchema, getTrabajadoresLaboresSchema} = require("./../schemas/trabajadores_labores.schema")


router.get("/", async (req, res) => {

    const products = await service.finde();
    res.json(products);
});

router.get("/:id",
    errorHandlerValidator(getTrabajadoresLaboresSchema, "params"),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const product = await service.findOne(id);
            res.json(product);
        } catch (error) {
            next(error)
        }

    });


router.post("/", 
errorHandlerValidator(createTrabajadoresLaboresSchema,"body"),
async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);

})

router.patch("/:id",
errorHandlerValidator(getTrabajadoresLaboresSchema,"params"),
errorHandlerValidator(updateTrabajadoresLaboresSchema,"body"),
async (req, res) => {

    try {
        const { id } = req.params;
        const body = req.body;
        const product = await service.update(id, body);
        res.json(product);
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

})



router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const rsa = await service.delete(id);
    res.json(rsa)
})



module.exports =router;