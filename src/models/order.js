import Joi from '@hapi/joi';
import pool from '../../config/db_config';

export const purchaseOrderSchema = Joi.object().keys({
  car_id: Joi.number().required().min(1),
  price_offered: Joi.number().min(1).required(),
});

export const createOrder = async (values) => {
  const newOrder = await pool.query(`INSERT INTO orders(
    buyer,
    car_id,
    price_offered,
    status) VALUES($1,$2,$3,$4) returning *`, values);
  return newOrder;
};

export const updatePOPriceId = async (id, price) => {
  const result = await pool.query(`UPDATE orders SET new_price_offered='${price}' WHERE id='${id}' RETURNING *`);
  return result;
};

export const orderId = async (id) => {
  const result = await pool.query(`SELECT * FROM orders WHERE id='${id}';`);
  if (result.rows.length === 0) return false;
  return result.rows[0];
};
