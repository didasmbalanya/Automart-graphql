/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable consistent-return */
import Joi from '@hapi/joi';
import dotenv from 'dotenv';
import pool from '../../config/db_config';

dotenv.config();
export const users = [
  {
    id: '1',
    email: 'didasmbalanya@gmail.com',
    first_name: 'ObiOne',
    last_name: 'Kanobi',
    password: '$2b$08$WxQL5DwbwUzxORZcJCDsWuJA5CJmUcrjoaq4V.VfK3W9RVTCUrd0u', // obionekanobi
    address: 'Azgrad',
    is_admin: 'false',
  },
/* token-eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJlbWFpbCI6ImRpZGFzbWJhbGFueWFAZ21haWwuY29tIiwiaWF0IjoxNTYwMzMwNTkyLCJleHAiOjE1NjAzNDEzOTJ9.
DhngbDVqaiHgAKGnCID3rcrpWl6CDZJxNkPVUjI1WSk
*/
];

export const signUnSchema = Joi.object().keys({
  first_name: Joi.string().min(2).max(30).required()
    .trim(),
  last_name: Joi.string().min(2).max(30).required()
    .trim(),
  email: Joi.string().email().required(),
  is_admin: Joi.boolean().default(false).valid([true, false]),
  password: Joi.string().min(7).required().strict()
    .regex(/^[a-zA-Z0-9]{7,30}$/),
  confirm_password: Joi.string().valid(Joi.ref('password')).required().strict(),
});

export const findUserByEmail = async (userEmail) => {
  const userData = await pool.query(`SELECT * FROM users WHERE email='${userEmail}'`);
  await pool.end();
  if (userData.rows.length === 0) return false;
  return userData.rows[0];
};

export const addNewUser = async (params) => {
  const result = pool.query(`INSERT INTO users (
    first_name,
    last_name,
    email,
    address,
    password) VALUES ($1 $2 $3 $4 $5) returning *;`, params);
  return result;
};
