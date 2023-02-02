const express = require('express');
const laboresService = require('./../services/labores.services');

const router = express.Router();
const labores = new laboresService();
const errorHandlerValidator = require('./../middlware/validator');
const {
  createLaborsSchema,
  updateLaborsSchema,
  getLaborsSchema,
} = require('./../schemas/labores.schema');

router.get('/', async (req, res) => {
  const labors = await labores.finde();
  res.json(labors);
});

router.get(
  '/:id',
  errorHandlerValidator(getLaborsSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const labores = await labores.findOne(id);
      res.json(labores);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  errorHandlerValidator(createLaborsSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newLabor = await labores.create(body);
    res.status(201).json(newLabor);
  }
);

router.patch(
  '/:id',
  errorHandlerValidator(getLaborsSchema, 'params'),
  errorHandlerValidator(updateLaborsSchema, 'body'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const labor = await labores.update(id, body);
      res.json(labor);
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });
    }
  }
);

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const rsa = await labores.delete(id);
  res.json(rsa);
});

module.exports = router;
