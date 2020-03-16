import Joi from '@hapi/joi';
import dotenv from 'dotenv';
import pool from '../../config/db_config';

dotenv.config();

export const signUnSchema = Joi.object({
  first_name: Joi.string()
    .min(2)
    .max(30)
    .required()
    .trim(),
  last_name: Joi.string()
    .min(2)
    .max(30)
    .required()
    .trim(),
  email: Joi.string()
    .email()
    .required(),
  address: Joi.string(),
  phone_number: Joi.string()
    .trim(),
  nationality: Joi.string()
    .trim(),
  password: Joi.string()
    .min(7)
    .required()
    .strict()
    .regex(/^[a-zA-Z0-9]{7,30}$/),
});

export const addNewUser = async (params) => {
  const result = await pool.query(
    `INSERT INTO users (
    first_name,
    last_name,
    email,
    phone_number,
    nationality,
    address,
    password) VALUES ($1,$2,$3,$4,$5,$6,$7) returning *;`,
    params,
  );
  const val = result.rows.length > 0 ? result.rows[0] : result;
  return val;
};
