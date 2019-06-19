/* eslint-disable linebreak-style */
import Joi from '@hapi/joi';
import pool from '../../config/db_config';

export const cars = [
  {
    id: 1,
    owner: 1, // user id
    created_on: 'DateTime',
    state: 'new', // new,used
    status: 'available', // sold,available - default is available
    price: 150,
    manufacturer: 'Mazda',
    model: 'es1',
    body_type: 'van', // car, truck, trailer, van, etc
  },

];

export const carSchema = Joi.object().keys({
  state: Joi.string().valid(['new', 'used']).required().trim(),
  status: Joi.string().valid(['sold', 'available']).default('available').trim(),
  price: Joi.number().min(1).max(100000000000)
    .required(),
  manufacturer: Joi.string().trim(),
  model: Joi.string().required().trim(),
  body_type: Joi.string().required().trim(),
});

export const addNewCar = async (values) => {
  const result = await pool.query(`INSERT INTO cars(
    owner,
    created_on,
    state,
    status,
    price,
    manufacturer,
    model,
    body_type) VALUES($1,$2,$3,$4,$5,$6,$7,$8) returning *`, values);
  return result;
};
