/* eslint-disable prefer-destructuring */
/* eslint-disable camelcase */
/* eslint-disable consistent-return */
import Joi from '@hapi/joi';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { signUnSchema, addNewUser } from '../models/user';
import { getBy } from '../models/index';
import { getPublicProfile } from '../utils/user_utils';

const { SECRET } = process.env;


export const signup = async (req, res) => {
  Joi.validate(req.body, signUnSchema).then(async () => {
    req.body.first_name = req.body.first_name.trim();
    req.body.last_name = req.body.last_name.trim();
    req.body.password = req.body.password.trim();
    req.body.confirm_password = req.body.confirm_password.trim();
    req.body.email = req.body.email.trim();
    const {
      first_name, last_name, email, address, password,
    } = req.body;
    let foundUser = await getBy('users', 'email', req.body.email);
    if (!foundUser) {
      foundUser = foundUser[0];
      req.body.password = bcrypt.hashSync(password, 8);
      req.body.confirm_password = bcrypt.hashSync(password, 8);
      const token = jwt.sign({ email }, SECRET, { expiresIn: '3h' });
      req.body.is_admin = 'false';
      const values = [first_name, last_name, email, address, req.body.password];
      const result = await addNewUser(values);
      const user = getPublicProfile(result.rows[0]);
      res.status(201).send({ status: 201, data: user, token });
    } else res.status(409).send({ status: 409, error: 'Already signed up user' });
  }).catch((e) => {
    if (e.isJoi) res.status(400).send({ status: 400, error: e.details[0].message });
    else res.status(404).send({ status: 404, error: 'Invalid request' });
  });
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  let foundUser = await getBy('users', 'email', email);
  if (foundUser) {
    foundUser = foundUser[0];
    bcrypt.compare(password, foundUser.password, (err, result) => {
      if (err) res.status(401).send({ status: 401, error: 'Incorrect credentials' });
      else if (!result) return res.status(401).send({ status: 401, error: 'Incorrect credentials' });
      else {
        const token = jwt.sign({ email }, SECRET, { expiresIn: '3h' });
        res.status(200).send({ status: 200, data: getPublicProfile(foundUser), token });
      }
    });
  } else return res.status(404).send({ status: 404, error: 'Email not registred' });
};

export const getMe = (req, res) => {
  res.send({ status: 200, data: getPublicProfile(req.user) });
};
