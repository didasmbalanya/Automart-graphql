/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
import Joi from '@hapi/joi';
import { orders, purchaseOrderSchema } from '../models/order';

export const postOrder = (req, res) => {
  Joi.validate(req.body, purchaseOrderSchema).then(() => {
    const order = req.body;
    order.id = orders.length + 1;
    order.car_id = req.body.id; // temporary values
    order.created_on = Date();
    order.status = 'pending';
    order.buyer = 1; // temporary
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

export const updateOrder = (req, res) => {
  if (req.query.price) {
    const { id } = req.params;
    const { price } = req.query;
    const foundOrder = orders.find(order => order.id.toString() === id);
    if (foundOrder) {
      const orderIndex = orders.indexOf(foundOrder);
      orders[orderIndex].new_price_offered = price;
      const order = orders[orderIndex];
      res.status(204).send(order);
    }
  }
};

export const getOrderById = (req, res) => {
  const { id } = req.params;
  const foundOrder = orders.find(order => order.id.toString() === id);
  if (foundOrder) return res.status(200).send(foundOrder);
  res.status(404).send('order Id not found');
};
