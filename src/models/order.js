/* eslint-disable linebreak-style */
import Joi from '@hapi/joi';

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
  price_offered: Joi.number().min(1).required(),
  status: Joi.string().valid(['pending', 'accepted', 'rejected']),
});
