
const express = require("express");
const servicioService = require("./../services/servicios.service");

const router = express.Router();
const servicios = new servicioService();
const errorHandlerValidator = require("./../middlware/validator");
const {createServiciosSchema, updateServiciosSchema, getServiciosSchema} = require("./../schemas/servicios.schema")


router.get("/", async (req, res) => {

    const labors = await servicios.finde();
    res.json(labors);
});

router.get("/:id",
    errorHandlerValidator(getServiciosSchema, "params"),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const labores = await labores.findOne(id);
            res.json(labores);
        } catch (error) {
            next(error)
        }

    });


router.post("/", 
errorHandlerValidator(createServiciosSchema,"body"),
async (req, res) => {
    const body = req.body;
    const newLabor = await servicios.create(body);
    res.status(201).json(newLabor);

})

router.patch("/:id",
errorHandlerValidator(getServiciosSchema,"params"),
errorHandlerValidator(updateServiciosSchema,"body"),
async (req, res) => {

    try {
        const { id } = req.params;
        const body = req.body;
        const labor = await servicios.update(id, body);
        res.json(labor);
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

})



router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const rsa = await servicios.delete(id);
    res.json(rsa)
})



module.exports =router;