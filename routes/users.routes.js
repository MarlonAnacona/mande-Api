const express = require('express');
const usersService = require('./../services/users.service');
const router = express.Router();
const service = new usersService();
const errorHandlerValidator = require('./../middlware/validator');
const { encrypt, compare } = require('./../middlware/encryptaPassword');

const {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
  getloginSchema,
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
  '/login',
  errorHandlerValidator(getloginSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;

      const user = await service.findOne1(body.email);

      if (!user) {
        res.status(404);
        res.send({ error: 'User not found' });
      }
      console.log(body.password);

      console.log(user.rows[0].password);
      const checkPassword = await compare(body.password, user.rows[0].password);

      if (checkPassword) {
        //TODO Contraseña es correct
        res.send(user.rows);
        return;
      }
      if (!checkPassword) {
        res.status(409);
        res.send({
          error: 'Invalid password',
        });
        return;
      }
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/register',
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
