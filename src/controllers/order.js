/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
import Joi from '@hapi/joi';
import { orders, purchaseOrderSchema } from '../models/order';

export const postOrder = (req, res) => {
  Joi.validate(req.body, purchaseOrderSchema).then(() => {
    const order = req.body;
    order.id = orders.length + 1;
    order.car_id = req.body.id;
    order.created_on = Date();
    if (!order.price_offered) order.price_offered = req.body.price;
    orders.push(order);
    res.status(201).send(order);
  }).catch((e) => {
    if (e.details[0].message) {
      res.status(422).send(e.details[0].message);
    } else {
      res.status(404).send('Invalid post request');
    }
  });
};

export const one = 1;
