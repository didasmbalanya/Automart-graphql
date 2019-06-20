/* eslint-disable no-restricted-globals */
/* eslint-disable radix */
/* eslint-disable max-len */
/* eslint-disable consistent-return */
import Joi from '@hapi/joi';
import {
  purchaseOrderSchema, createOrder, orderId, updatePOPriceId,
} from '../models/order';
import { getCarId } from '../models/car';

export const postOrder = (req, res) => {
  Joi.validate(req.body, purchaseOrderSchema).then(async () => {
    const order = req.body;
    const carAva = await getCarId(order.car_id);
    if (!carAva) return res.status(404).send({ error: 'Car not found' });
    if (carAva) {
      order.buyer = req.user.id;
      if (carAva.owner.toString() === order.buyer.toString()) return res.status(422).send({ status: 422, error: 'cannot buy your own car' });
      if (carAva.status === 'sold') return res.status(404).send({ error: 'car already sold' });
      order.status = 'pending';
      const data = await createOrder([order.buyer, order.car_id, order.price_offered, order.status]);
      res.status(201).send({ status: 201, data: data.rows[0] });
    } else throw Error('car not found');
  }).catch((e) => {
    if (e) res.status(404).send({ status: 400, error: 'Bad request' });
  });
};
export const getOrderById = async (req, res) => {
  const { id } = req.params;
  if (isNaN(id) === true) return res.status(400).send({ status: 400, error: 'Bad Request' });
  const foundOrder = await orderId(id);
  if (foundOrder) res.status(200).send({ status: 200, data: foundOrder });
  else res.status(404).send({ status: 404, error: 'Not found' });
};

export const updateOrder = async (req, res) => {
  if (req.query.price) {
    const { id } = req.params;
    const { price } = req.query;

    const purchaseOrder = await orderId(id);
    if (!purchaseOrder) return res.status(404).send({ status: 404, error: 'Purchase order not found' });
    if (purchaseOrder.buyer.toString() === req.user.id.toString()) {
      const result = await updatePOPriceId(id, price);
      res.status(200).send({ status: 200, data: result.rows[0] });
    } else res.status(403).send({ status: 403, error: 'not allowed' });
  }
};
