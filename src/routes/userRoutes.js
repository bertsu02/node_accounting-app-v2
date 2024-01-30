'use strict';

const express = require('express');
const userServices = require('../services/userServices');

const userRoutes = (users) => {
  const router = express.Router();

  router.post('/', (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send();
    }

    const newUser = userServices.createUser(users, name);

    res.status(201).json(newUser);
  });

  router.get('/', (req, res) => {
    res.status(200).json(users);
  });

  router.get('/:id', (req, res) => {
    const user = userServices.getUserById(users, req.params.id);

    if (!user) {
      return res.status(404).send();
    }

    res.status(200).json(user);
  });

  router.patch('/:id', (req, res) => {
    const updatedUser = userServices
      .updateUser(users, req.params.id, req.body.name);

    if (!updatedUser) {
      return res.status(404).send({ message: 'Not found' });
    }

    res.status(200).json(updatedUser);
  });

  router.delete('/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const deleted = userServices.deleteUser(users, userId);

    if (deleted === null) {
      return res.status(404).send();
    }

    res.status(204).send();
  });

  return router;
};

module.exports = userRoutes;