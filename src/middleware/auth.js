/* eslint-disable prefer-destructuring */
import jwt from 'jsonwebtoken';
import { getBy } from '../models/car';

export const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = await jwt.verify(token, process.env.SECRET);
    const verifiedUser = await getBy('users', 'email', decoded.email);
    if (!verifiedUser[0]) {
      throw new Error();
    }
    req.user = verifiedUser[0];
    next();
  } catch (e) {
    res.status(401).send({ status: 401, error: 'Please Authenticate' });
  }
};

export const maintenance = (req, res) => {
  if (req.method) res.status(503).send({ error: 'Server under Maintenance' });
};
