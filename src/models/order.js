/* eslint-disable linebreak-style */
import Joi from '@hapi/joi';

export const orders = [
  {
    id: 1,
    buyer: 1, // user id
    car_id: 1,
    price: 'Float', // price offered
    status: 'String', // [pending, accepted, or rejected]
  },
];

export const purchaseOrderSchema = Joi.object().keys({
  first_name: Joi.string().min(2).max(30).required(),
  price: Joi.number().min(1).required(),
  price_offered: Joi.number().min(1).required(),
});
