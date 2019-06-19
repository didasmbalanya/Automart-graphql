/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable consistent-return */
import Joi from '@hapi/joi';
import { cars, carSchema, addNewCar } from '../models/car';
import {
  findCar, findByStatus, findMaxPrice, findMinPrice,
} from '../utils/car_utils';


export const postCar = (req, res) => {
  req.body.manufacturer = req.body.manufacturer.trim();
  req.body.model = req.body.model.trim();
  req.body.body_type = req.body.body_type.trim();
  req.body.status = req.body.status.trim();
  req.body.state = req.body.state.trim();
  Joi.validate(req.body, carSchema).then(async () => {
    const car = req.body;
    car.owner = req.user.id;
    await addNewCar([car.owner, car.created_on, car.state, car.status, car.price, car.manufacturer, car.model, car.body_type]);
    await res.status(201).send({ status: 201, data: car });
  }).catch((e) => {
    if (e) {
      res.status(422).send({ status: 422, error: e });
    } else {
      res.status(404).send({ status: 404, error: 'Invalid post request' });
    }
  });
};

export const changeProperty = (req, res) => {
  const { id } = req.params;
  const { status, price } = req.query;
  const foundCar = findCar(id, cars);
  if (!foundCar) {
    return res.status(404).send({ status: 404, error: 'Car not found' });
  }
  if (foundCar.owner.toString() !== req.user.id.toString()) return res.status(403).send({ status: 403, error: 'not allowed' });
  if (!price) {
    if (status.toLowerCase() === 'sold' || status.toLowerCase() === 'available') {
      const carIndex = cars.indexOf(foundCar);
      cars[carIndex].status = status.toLowerCase();
      res.status(200).send({ status: 200, data: cars[carIndex] });
    } else {
      return res.status(422).send({ status: 422, error: 'Invalid request' });
    }
  } else {
    const carIndex = cars.indexOf(foundCar);
    cars[carIndex].price = price;
    return res.status(200).send({ status: 200, data: cars[carIndex] });
  }
};

export const getCarById = async (req, res) => {
  try {
    const { id } = req.params;
    const foundCarId = findCar(id, cars);
    if (foundCarId) res.status(200).send({ data: foundCarId });
    else throw new Error();
  } catch (e) {
    res.status(404).send({ status: 404, error: 'Car not found' });
  }
};

export const deleteCar = (req, res) => {
  const { id } = req.params;
  const foundCar = findCar(id, cars);
  if (!foundCar) return res.status(404).send({ status: 404, error: 'Car add not found' });
  if (foundCar.owner.toString() === req.user.id.toString() || req.user.is_admin === 'true') {
    const carIndex = cars.indexOf(foundCar);
    cars.splice(carIndex, 1);
    res.status(200).send({ status: 200, message: 'Car Ad successfully deleted' });
  } else res.status(403).send({ status: 403, error: 'not authorized to delete car' });
};

export const getCars = (req, res) => {
  const { min_price, max_price, status } = req.query;
  if (cars.length === 0) return res.send({ status: 200, data: cars });
  if (min_price && max_price && status === 'available') {
    const avaCars = findByStatus(status, cars);
    const avaCarsMinPrice = findMinPrice(min_price, avaCars);
    const avaMinMaxCars = findMaxPrice(max_price, avaCarsMinPrice);
    if (avaMinMaxCars.length > 0) return res.status(200).send({ status: 200, data: avaMinMaxCars });
    return res.status(404).send({ status: 404, data: 'No car with specified filters found' });
  }
  if (status) {
    const avaCars = findByStatus(status, cars);
    if (avaCars.length > 0) res.status(200).send({ status: 200, data: avaCars });
    else res.status(404).send({ status: 404, error: 'No car with specified filters found' });
  } else {
    res.status(200).send({ status: 200, data: cars });
  }
};
