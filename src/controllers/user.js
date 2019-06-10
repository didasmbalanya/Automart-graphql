/* eslint-disable linebreak-style */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
import Joi from '@hapi/joi';
import bcrtypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { signUnSchema, users } from '../models/user';
import { getPublicProfile } from '../utils/user_utils';

const { secret } = process.env;

export const signup = (req, res) => {
  Joi.validate(req.body, signUnSchema).then(() => {
    const { email, password } = req.body;
    const foundUser = users.find(user => user.email === email);
    if (foundUser) {
      return res.status(422).send({ error: 'already signed up with email address' });
    }
    req.body.id = users.length + 1;
    req.body.password = bcrtypt.hashSync(password, 8);
    req.body.confirm_password = bcrtypt.hashSync(password, 8);
    req.body.isAdmin = 'false';
    const token = jwt.sign({ email, admin: req.body.isAdmin }, secret, { expiresIn: '3h' });
    users.push(req.body);
    const user = getPublicProfile(req.body);
    res.status(201).send({ data: user, token });
  }).catch((e) => {
    res.status(422).send(e);
  });
};

export const signin = (req, res) => {
  const { email, password, isAdmin } = req.body;
  const foundUser = users.find(user => user.email === email);
  if (!foundUser) {
    return res.status(422).send({ error: 'Invalid email address' });
  }

  bcrtypt.compare(password, foundUser.password).then(() => {
    const token = jwt.sign({ email, isAdmin }, secret, { expiresIn: '3h' });
    res.status(200).send({ data: getPublicProfile(foundUser), token });
  }).catch(e => res.status(404).send({ error: 'Wrong credintals', e }));
};

export const getMe = (req, res) => {
  res.send(getPublicProfile(req.user));
};
