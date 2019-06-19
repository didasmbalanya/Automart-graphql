/* eslint-disable linebreak-style */
import Joi from '@hapi/joi';
import pool from '../../config/db_config';

export const orders = [
  {
    id: 1,
    buyer: 1, // user id
    car_id: 1,
    price: 200, // price offered
    status: 'Pending', // [pending, accepted, or rejected]
  },
];

export const purchaseOrderSchema = Joi.object().keys({
  car_id: Joi.number().required().min(1),
  amount: Joi.number().min(1).required(),
  status: Joi.string().valid(['pending', 'accepted', 'rejected']),
});

export const createOrder = async (values) => {
  const newOrder = await pool.query(`INSERT INTO orders(
    buyer,
    car_id,
    amount,
    status) VALUES($1,$2,$3,$4) returning *`, values);
  return newOrder;
};
