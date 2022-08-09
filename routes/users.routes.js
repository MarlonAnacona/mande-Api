const express = require('express');
const usersService = require('./../services/users.service');

const router = express.Router();
const service = new usersService();
const errorHandlerValidator = require('./../middlware/validator');
const {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
} = require('./../schemas/users.schema');

router.get('/', async (req, res, next) => {
  try {
    const user = await service.finde();
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  errorHandlerValidator(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.findOne(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  errorHandlerValidator(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUser = await service.create(body);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  errorHandlerValidator(getUserSchema, 'params'),
  errorHandlerValidator(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const user = await service.update(id, body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await service.delete(id);
    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
