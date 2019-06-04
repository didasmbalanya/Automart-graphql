/* eslint-disable linebreak-style */
const users = require('../models/user');

const getAllUsers = (req, res) => {
  try {
    res.status(200).send(users);
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = getAllUsers;
