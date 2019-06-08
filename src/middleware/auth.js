/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
import jwt from 'jsonwebtoken';
import { users } from '../models/user';

export const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.secret);
    const verifiedUser = users.find(user => user.email === decoded.email);
    if (!verifiedUser) {
      throw new Error();
    }
    req.user = verifiedUser;
    next();
  } catch (e) {
    res.status(401).send({ error: 'Please Authenticate' });
  }
};

export const maintenance = async (req, res, next) => {
  if (req.method) res.status(503).send('Server under Maintenance');
};
