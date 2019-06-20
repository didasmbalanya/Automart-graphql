/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable consistent-return */
import Joi from '@hapi/joi';
import {
  carSchema, addNewCar, getBy, getCarId, markSold, getCarsMinMax, updatePriceId, getAllCars, DeleteCarId,
} from '../models/car';

export const postCar = (req, res) => {
  req.body.manufacturer = req.body.manufacturer.trim();
  req.body.model = req.body.model.trim();
  req.body.body_type = req.body.body_type.trim();
  req.body.status = req.body.status.trim();
  req.body.state = req.body.state.trim();
  Joi.validate(req.body, carSchema).then(async () => {
    const car = req.body;
    car.owner = req.user.id;
    const newCar = await addNewCar([car.owner, car.state, car.status, car.price, car.manufacturer, car.model, car.body_type]);
    await res.status(201).send({ status: 201, data: newCar.rows[0] });
  }).catch((e) => {
    if (e) {
      res.status(400).send({ status: 400, error: e });
    } else {
      res.status(400).send({ status: 400, error: 'Bad request' });
    }
  });
};

export const changeProperty = async (req, res) => {
  const { id } = req.params;
  const { status, price } = req.query;
  const foundCar = await getCarId(id);
  if (!foundCar) {
    return res.status(404).send({ status: 404, error: 'Car not found' });
  }
  if (foundCar.owner.toString() !== req.user.id) return res.status(403).send({ status: 403, error: 'not allowed' });
  if (foundCar.status === 'available' && !price) {
    const data = await markSold(id);
    res.status(200).send({ status: 200, data: data.rows[0] });
  } else if (price && !status) {
    const dataNewPrice = await updatePriceId(id, price);
    res.status(200).send({ data: dataNewPrice.rows[0] });
  } else {
    return res.status(422).send({ status: 422, error: 'Invalid request' });
  }
};

export const getCarById = async (req, res) => {
  const { id } = req.params;
  const foundCar = await getCarId(id);
  if (!foundCar) return res.status(404).send({ status: 404, data: 'Car not found' });
  return res.status(200).send({ status: 200, data: foundCar });
};

export const deleteCar = async (req, res) => {
  const { id } = req.params;
  const foundCar = await getCarId(id);
  if (!foundCar) return res.status(404).send({ status: 404, error: 'Car add not found' });
  if (foundCar.owner.toString() === req.user.id.toString() || req.user.is_admin === 'true') {
    const result = await DeleteCarId(id);
    res.status(200).send({ status: 200, message: 'Car Ad successfully deleted', data: result.rows[0] });
  } else res.status(403).send({ status: 403, error: 'not authorized to delete car' });
};

export const getCars = async (req, res) => {
  const { status, max_price, min_price } = req.query;
  try {
    if (status === 'available' && max_price && min_price) {
      const maxMinCars = await getCarsMinMax(min_price, max_price);
      res.status(200).send({ data: maxMinCars });
    } else if (status && status.toLowerCase() === 'available') {
      let avaCars = await getBy('cars', 'status', 'available');
      if (!avaCars) avaCars = [];
      res.status(200).send({ status: 200, data: avaCars });
    } else {
      const allCars = await getAllCars();
      res.status(200).send({ status: 200, data: allCars.rows });
    }
  } catch (e) {
    res.send({ status: 404, error: e });
  }
};
