
const express = require("express");
const productService = require("./../services/product.service")

const router = express.Router();
const service = new productService();
const errorHandlerValidator = require("./../middlware/validator");
const { createProductSchema, updateProductSchema, getProductSchema } = require("./../schemas/product.schema")


router.get("/", async (req, res) => {

    const products = await service.finde();
    res.json(products);
});

router.get("/:id",
    errorHandlerValidator(getProductSchema, "params"),
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
errorHandlerValidator(createProductSchema,"body"),
async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);

})

router.patch("/:id",
errorHandlerValidator(getProductSchema,"params"),
errorHandlerValidator(updateProductSchema,"body"),
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