/* eslint-disable linebreak-style */
const express = require('express');
const getUsers = require('../controllers/user');

const router = new express.Router();

router.get('/users', getUsers);

module.exports = router;
