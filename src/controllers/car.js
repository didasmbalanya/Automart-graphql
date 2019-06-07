/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
import Joi from '@hapi/joi';
import { cars, carSchema } from '../models/car';

export const postCar = (req, res) => {
  Joi.validate(req.body, carSchema).then(() => {
    const car = req.body;
    car.id = cars.length + 1;
    car.created_on = Date();
    cars.push(car);
    res.send(car);
  }).catch((e) => {
    if (e.details[0].message) {
      res.status(422).send(e.details[0].message);
    } else {
      res.status(404).send('Invalid post request');
    }
  });
};

export const getCars = (req, res) => {
  if (cars.length >= 1) {
    return res.status(200).send(cars);
  }
  res.send(404).send('cars not found');
};

export const getCarById = (req, res) => {
  const { id } = req.params;
  const foundCar = cars.find(car => car.id.toString() === id);
  if (!foundCar) {
    res.status(404).send('car not found');
  }
  res.status(200).send(foundCar);
};
