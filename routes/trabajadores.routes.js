const express = require("express");
const TrabajadoresService = require("./../services/trabajadores.service")

const router = express.Router();
const service = new TrabajadoresService();
const errorHandlerValidator = require("./../middlware/validator");
const { createTrabajadorSchema, updateTrabajadorSchema, getTrabajadorSchema}= require("./../schemas/trabajadores.schema")


router.get("/", async (req, res) => {

    const products = await service.finde();
    res.json(products);
});

router.get("/:id",
    errorHandlerValidator(getTrabajadorSchema, "params"),
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
errorHandlerValidator(createTrabajadorSchema,"body"),
async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);

})

router.patch("/:id",
errorHandlerValidator(getTrabajadorSchema,"params"),
errorHandlerValidator(updateTrabajadorSchema,"body"),
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