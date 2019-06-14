/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
/* eslint-disable consistent-return */
import Joi from '@hapi/joi';
import { cars, carSchema } from '../models/car';
import {
  findCar, findByStatus, findMaxPrice, findMinPrice,
} from '../utils/car_utils';


export const postCar = (req, res) => {
  req.body.manufacturer = req.body.manufacturer.trim();
  req.body.model = req.body.model.trim();
  req.body.body_type = req.body.body_type.trim();
  req.body.status = req.body.status.trim();
  req.body.state = req.body.state.trim();
  req.body.price = req.body.price.trim();
  Joi.validate(req.body, carSchema).then(async () => {
    const car = req.body;
    car.id = cars.length + 1;
    car.owner = req.user.id;
    car.created_on = Date();
    cars.push(car);
    await res.status(201).send({ data: car });
  }).catch((e) => {
    if (e.details[0].message) {
      res.status(422).send({ error: e.details[0].message });
    } else {
      res.status(404).send({ error: 'Invalid post request' });
    }
  });
};

export const changeProperty = (req, res) => {
  const { id } = req.params;
  const { status, price } = req.query;
  const foundCar = findCar(id, cars);
  if (!foundCar) {
    return res.status(404).send({ error: 'Car not found' });
  }
  if (foundCar.owner.toString() !== req.user.id.toString()) return res.status(403).send({ error: 'not allowed' });
  if (!price) {
    if (status.toLowerCase() === 'sold' || status.toLowerCase() === 'available') {
      const carIndex = cars.indexOf(foundCar);
      cars[carIndex].status = status.toLowerCase();
      res.status(200).send(cars[carIndex]);
    } else {
      return res.status(422).send({ error: 'Invalid request' });
    }
  } else {
    const carIndex = cars.indexOf(foundCar);
    cars[carIndex].price = price;
    return res.status(200).send({ data: cars[carIndex] });
  }
};

export const getCarById = async (req, res) => {
  try {
    const { id } = req.params;
    const foundCarId = findCar(id, cars);
    if (foundCarId) res.status(200).send({ data: foundCarId });
    else throw new Error();
  } catch (e) {
    res.status(404).send({ error: 'Car not found' });
  }
};

export const deleteCar = (req, res) => {
  const { id } = req.params;
  const foundCar = findCar(id, cars);
  if (!foundCar) return res.status(404).send({ error: 'Car add not found' });
  if (foundCar.owner.toString() === req.user.id.toString() || req.user.is_admin === 'true') {
    const carIndex = cars.indexOf(foundCar);
    cars.splice(carIndex, 1);
    res.status(200).send({ message: 'Car Ad successfully deleted' });
  } else res.status(403).send({ error: 'not authorized to delete car' });
};

export const getCars = (req, res) => {
  const { min_price, max_price, status } = req.query;
  if (cars.length === 0) return res.send({ data: cars });
  if (min_price && max_price && status === 'available') {
    const avaCars = findByStatus(status, cars);
    const avaCarsMinPrice = findMinPrice(min_price, avaCars);
    const avaMinMaxCars = findMaxPrice(max_price, avaCarsMinPrice);
    if (avaMinMaxCars.length > 0) return res.status(200).send({ data: avaMinMaxCars });
    return res.status(404).send({ data: 'No car with specified filters found' });
  }
  if (status) {
    const avaCars = findByStatus(status, cars);
    if (avaCars.length > 0) res.status(200).send({ data: avaCars });
    else res.status(404).send({ error: 'No car with specified filters found' });
  } else {
    res.status(200).send({ data: cars });
  }
};
