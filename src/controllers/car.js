/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
/* eslint-disable consistent-return */
import Joi from '@hapi/joi';
import { cars, carSchema } from '../models/car';
import {
  findCar, findByStatus, findMaxPrice, findMinPrice,
} from '../utils/car_utils';


export const postCar = (req, res) => {
  Joi.validate(req.body, carSchema).then(async () => {
    const car = req.body;
    car.id = cars.length + 1;
    car.owner = req.user.id;
    car.created_on = Date();
    cars.push(car);
    await res.status(201).send(car);
  }).catch((e) => {
    if (e.details[0].message) {
      res.status(422).send(e.details[0].message);
    } else {
      res.status(404).send('Invalid post request');
    }
  });
};

export const changeProperty = (req, res) => {
  const { id } = req.params;
  const { status, price } = req.query;
  const foundCar = findCar(id, cars);

  if (!foundCar) {
    return res.status(404).send('Car not found');
  }
  if (!price) {
    if (status.toLowerCase() === 'sold' || status.toLowerCase() === 'available') {
      const carIndex = cars.indexOf(foundCar);
      cars[carIndex].status = status.toLowerCase();
      res.status(204).send(cars[carIndex]);
    } else {
      return res.status(422).send('Invalid request');
    }
  } else {
    const carIndex = cars.indexOf(foundCar);
    cars[carIndex].price = price;
    return res.status(204).send(cars[carIndex]);
  }
};

export const getCarById = async (req, res) => {
  try {
    const { id } = req.params;
    const foundCarId = findCar(id, cars);
    await res.status(200).send(foundCarId);
  } catch (e) {
    res.status(404).send('Car not found');
  }
};

export const deleteCar = (req, res) => {
  const { id } = req.params;
  const foundCar = findCar(id, cars);
  if (!foundCar) return res.status(404).send('Car add not found');
  if (foundCar.owner === req.user.id || req.user.is_admin === 'true') {
    const carIndex = cars.indexOf(foundCar);
    cars.splice(carIndex, 1);
    res.status(200).send('“Car Ad successfully deleted');
  } else res.status(405).send('not authorized to delete car');
};

export const getCars = (req, res) => {
  const { min_price, max_price, status } = req.query;
  if (cars.length === 0) return res.send('No cars in the database');
  if (min_price && max_price && status === 'available') {
    const avaCars = findByStatus(status, cars);
    const avaCarsMinPrice = findMinPrice(min_price, avaCars);
    const avaMinMaxCars = findMaxPrice(max_price, avaCarsMinPrice);
    if (avaMinMaxCars.length > 0) return res.status(200).send(avaMinMaxCars);
    return res.status(404).send('No car with specified filters found');
  }
  if (status) {
    const avaCars = findByStatus(status, cars);
    res.status(200).send(avaCars);
  } else {
    res.status(200).send(cars);
  }
};
