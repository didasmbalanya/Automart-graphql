/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
import Joi from '@hapi/joi';
import { cars, carSchema } from '../models/car';

const findCar = (id) => {
  const foundCar = cars.find(car => car.id.toString() === id);
  if (!foundCar) {
    return false;
  }
  return foundCar;
};

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

export const changeStatus = (req, res) => {
  const { id, status } = req.params;
  const foundCar = findCar(id);
  if (!foundCar) {
    return res.status(404).send('Car not found');
  }
  if (status.toLowerCase() === 'sold' || status.toLowerCase() === 'available') {
    const carIndex = cars.indexOf(foundCar);
    cars[carIndex].status = status.toLowerCase();
    res.send(cars[carIndex]);
  } else {
    res.status(422).send('Invalid request');
  }
};

export const updatePrice = () => {

};

export const getCars = (req, res) => {
  if (cars.length >= 1) {
    return res.status(200).send(cars);
  }
  res.send(404).send('cars not found');
};

export const getCarById = (req, res) => {
  const { id } = req.params;
  const foundCar = findCar(id, res);
  if (foundCar) res.status(200).send(foundCar);
  else res.status(404).send('Car not found');
};
