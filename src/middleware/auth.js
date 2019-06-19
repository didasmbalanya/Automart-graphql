/* eslint-disable linebreak-style */
import jwt from 'jsonwebtoken';
import { findUserByEmail } from '../models/user';

export const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = await jwt.verify(token, process.env.secret);
    const verifiedUser = await findUserByEmail(decoded.email);
    if (!verifiedUser) {
      throw new Error();
    }
    req.user = verifiedUser;
    next();
  } catch (e) {
    res.status(401).send({ error: 'Please Authenticate' });
  }
};

export const maintenance = (req, res) => {
  if (req.method) res.status(503).send({ error: 'Server under Maintenance' });
};
