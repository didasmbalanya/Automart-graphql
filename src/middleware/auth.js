/* eslint-disable camelcase */
/* eslint-disable prefer-destructuring */
import jwt from 'jsonwebtoken';
import { getBy } from '../models/index';

export const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
      req.isAuth = false;
      return next();
    }
    const decoded = jwt.verify(token, process.env.SECRET);
    if (!decoded) {
      req.isAuth = false;
      next();
    }
    const verifiedUser = await getBy('users', 'email', decoded.email);
    if (!verifiedUser[0]) {
      req.isAuth = false;
      next();
    }
    const { password, created_on, ...user } = verifiedUser[0];
    const userPosts = await getBy('projects', 'owner', verifiedUser[0].id);
    user.posts = userPosts;
    req.user = user;
    req.isAuth = true;
    return next();
  } catch (e) {
    req.isAuth = false;
    return next();
  }
};

export const maintenance = (req, res) => {
  if (req.method) res.status(503).send({ error: 'Server under Maintenance' });
};
