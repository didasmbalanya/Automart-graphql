/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
import Joi from '@hapi/joi';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { signUnSchema, users, findUserByEmail } from '../models/user';
import { getPublicProfile } from '../utils/user_utils';

const { secret } = process.env;


export const signup = async (req, res) => {
  req.body.first_name = req.body.first_name.trim();
  req.body.last_name = req.body.last_name.trim();
  req.body.password = req.body.password.trim();
  req.body.confirm_password = req.body.confirm_password.trim();
  req.body.email = req.body.email.trim();
  Joi.validate(req.body, signUnSchema).then(() => {
    const { email, password } = req.body;
    let { is_admin } = req.body;
    if (!is_admin) is_admin = 'false';
    const foundUser = users.find(user => user.email === req.body.email);
    if (!foundUser) {
      req.body.is_admin = is_admin;
      req.body.id = users.length + 1;
      req.body.password = bcrypt.hashSync(password, 8);
      req.body.confirm_password = bcrypt.hashSync(password, 8);
      const token = jwt.sign({ email, is_admin }, secret, { expiresIn: '3h' });
      users.push(req.body);
      const user = getPublicProfile(req.body);
      res.status(201).send({ data: user, token });
    } else res.status(422).send({ error: 'Already signed up user' });
  }).catch((e) => {
    if (e.isJoi) res.status(422).send({ error: e.details[0].message });
    else res.status(404).send({ error: 'Invalid request' });
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
    if (err) res.status(404).send({ error: 'Incorrect credentials' });
    else if (!result) res.status(404).send({ error: 'Incorrect credentials' });
    else {
      const token = jwt.sign({ email, isAdmin }, secret, { expiresIn: '3h' });
      res.status(200).send({ data: getPublicProfile(foundUser), token });
    }
  });
};

export const getMe = (req, res) => {
  res.send({ data: getPublicProfile(req.user) });
};
