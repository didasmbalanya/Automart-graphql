/* eslint-disable linebreak-style */
import Joi from '@hapi/joi';
import { users, signUnSchema } from '../models/user';

export const signup = (req, res) => {
  Joi.validate(req.body, signUnSchema).then(() => {
    const isAdmin = req.body.is_admin || false;
    const id = users.length + 1;
    req.body.id = id;
    req.body.is_admin = isAdmin;
    users.push(req.body);
    res.status(201).send(req.body);
  }).catch((e) => {
    res.status(422).send(e.details[0].message);
  });
};

export const signin = (req, res) => {
  const { email, password } = req.body;
  const foundUser = users.find(user => user.email === email);
  if (foundUser.password === password) {
    res.status(200).send(foundUser);
  } else {
    res.status(404).send('nothing');
  }
};
