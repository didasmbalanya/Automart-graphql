/* eslint-disable linebreak-style */
import Joi from '@hapi/joi';
import dotenv from 'dotenv';
import pool from '../../config/db_config';

dotenv.config();

export const signUnSchema = Joi.object().keys({
  first_name: Joi.string().min(2).max(30).required()
    .trim(),
  last_name: Joi.string().min(2).max(30).required()
    .trim(),
  email: Joi.string().email().required(),
  address: Joi.string(),
  password: Joi.string().min(7).required().strict()
    .regex(/^[a-zA-Z0-9]{7,30}$/),
  confirm_password: Joi.string().valid(Joi.ref('password')).required().strict(),
});

export const addNewUser = async (params) => {
  const result = pool.query(`INSERT INTO users (
    first_name,
    last_name,
    email,
    address,
    password) VALUES ($1,$2,$3,$4,$5) returning *;`, params);
  return result;
};
