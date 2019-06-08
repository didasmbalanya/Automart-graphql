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
    order.buyer = req.user.id; // temporary
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

    const PurchaseOrder = orders.find(ord => (ord.id.toString() === id));
    if (PurchaseOrder.buyer === req.user.id) {
      const orderIndex = orders.indexOf(PurchaseOrder);
      orders[orderIndex].new_price_offered = price;
      const order = orders[orderIndex];
      res.status(204).send(order);
    } else res.status(404).send({ error: 'Purchase order not found' });
  }
};

export const getOrderById = (req, res) => {
  const { id } = req.params;
  const foundOrder = orders.find(order => order.id.toString() === id);
  if (foundOrder) return res.status(200).send(foundOrder);
  res.status(404).send('order Id not found');
};
