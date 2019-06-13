/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
import Joi from '@hapi/joi';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { signUnSchema, users } from '../models/user';
import { getPublicProfile } from '../utils/user_utils';

const { secret } = process.env;

export const signup = (req, res) => {
  Joi.validate(req.body, signUnSchema, { convert: true }).then(() => {
    const { email, password } = req.body;
    let { is_admin } = req.body;
    if (!is_admin) is_admin = 'false';
    const foundUser = users.find(user => user.email === email);
    if (!foundUser) {
      req.body.is_admin = is_admin;
      req.body.id = users.length + 1;
      req.body.password = bcrypt.hashSync(password, 8);
      req.body.confirm_password = bcrypt.hashSync(password, 8);
      const token = jwt.sign({ email, is_admin }, secret, { expiresIn: '3h' });
      users.push(req.body);
      const user = getPublicProfile(req.body);
      res.status(201).send({ data: user, token });
    } else res.status(422).send('Already signed up user');
  }).catch((e) => {
    res.status(422).send(e);
  });
};

export const signin = async (req, res) => {
  const { email, password, isAdmin } = req.body;
  const foundUser = users.find(user => user.email === email);
  if (!foundUser) {
    return res.status(422).send({ error: 'Invalid email address' });
  }
  // eslint-disable-next-line no-shadow
  bcrypt.compare(password, foundUser.password, (err, result) => {
    if (err) res.status(404).send('Incorrect credentials');
    else if (!result) res.status(404).send('Incorrect credentials');
    else {
      const token = jwt.sign({ email, isAdmin }, secret, { expiresIn: '3h' });
      res.status(200).send({ data: getPublicProfile(foundUser), token });
    }
  });
};

export const getMe = (req, res) => {
  res.send(getPublicProfile(req.user));
};
