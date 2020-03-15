import Joi from '@hapi/joi';
import pool from '../../config/db_config';

export const carSchema = Joi.object().keys({
  state: Joi.string().required().trim(),
  status: Joi.string().default('available').trim(),
  price: Joi.number().min(1).max(100000000000)
    .required(),
  manufacturer: Joi.string().trim(),
  model: Joi.string().required().trim(),
  body_type: Joi.string().required().trim(),
});

export const addNewCar = async (values) => {
  const result = await pool.query(`INSERT INTO cars(
    owner,
    state,
    status,
    price,
    manufacturer,
    model,
    body_type) VALUES($1,$2,$3,$4,$5,$6,$7) returning *`, values);
  return result;
};

export const getBy = async (table, key, value) => {
  const result = await pool.query(`SELECT * FROM ${table} WHERE ${key}='${value}';`);
  if (result.rows.length === 0) return false;
  return result.rows;
};

export const markSold = async (id) => {
  const result = await pool.query(`UPDATE cars SET status='sold' WHERE id='${id}' RETURNING *`);
  return result;
};

export const getCarId = async (id) => {
  const result = await pool.query(`SELECT * FROM cars WHERE id='${id}'`);
  if (result.rows.length === 0) return false;
  return result.rows[0];
};

export const updatePriceId = async (id, price) => {
  const result = await pool.query(`UPDATE cars SET price='${price}' WHERE id='${id}' RETURNING *`);
  return result;
};

export const getCarsMinMax = async (minPrice, maxPrice) => {
  const result = await pool.query(`SELECT * FROM cars WHERE status='available' AND price>='${minPrice}' AND price<='${maxPrice}'`);
  if (result.rows.length === 0) return [];
  return result.rows;
};

export const getAllCars = async () => {
  const result = await pool.query('SELECT * FROM cars;');
  return result;
};

export const DeleteCarId = async (id) => {
  const result = await pool.query(`DELETE FROM cars WHERE id='${id}' returning *`);
  return result;
};
