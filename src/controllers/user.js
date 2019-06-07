/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
import Joi from '@hapi/joi';
import bcrtypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { signUnSchema, users } from '../models/user';


export const signup = (req, res) => {
  Joi.validate(req.body, signUnSchema).then(() => {
    const { email, password } = req.body;
    const foundUser = users.find(user => user.email === email);
    if (foundUser) {
      return res.status(422).send('already signed up with email address');
    }
    req.body.id = users.length + 1;
    req.body.password = bcrtypt.hashSync(password, 8);
    req.body.confirm_password = bcrtypt.hashSync(password, 8);
    const token = jwt.sign({ id: req.body.id }, 'mysecret');
    const user = req.body;
    users.push(req.body);
    res.status(201).send({ user, token });
  }).catch((e) => {
    res.status(422).send(e.details[0].message);
  });
};

export const signin = (req, res) => {
  const { email, password } = req.body;
  const foundUser = users.find(user => user.email === email);
  if (!foundUser) {
    return res.status(422).send('Invalid email address');
  }

  if (bcrtypt.compare(password, foundUser.password)) {
    res.status(200).send(foundUser);
  } else {
    res.status(404).send('nothing');
  }
};
