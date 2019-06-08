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

export const changeProperty = (req, res) => {
  const { id } = req.params;
  const { status, price } = req.query;
  const foundCar = findCar(id);

  if (!foundCar) {
    return res.status(404).send('Car not found');
  }
  if (!price) {
    if (status.toLowerCase() === 'sold' || status.toLowerCase() === 'available') {
      const carIndex = cars.indexOf(foundCar);
      cars[carIndex].status = status.toLowerCase();
      res.status(200).send(cars[carIndex]);
    } else {
      return res.status(422).send('Invalid request');
    }
  } else {
    const carIndex = cars.indexOf(foundCar);
    cars[carIndex].price = price;
    return res.status(200).send(cars[carIndex]);
  }
};

export const getCarById = (req, res) => {
  const { id } = req.params;
  const foundCar = findCar(id, res);
  if (foundCar) res.status(200).send(foundCar);
  else res.status(404).send('Car not found');
};

export const deleteCar = (req, res) => {
  const { id } = req.params;
  const foundCar = findCar(id);
  if (!foundCar) return res.status(404).send('Car add not found');
  const carIndex = cars.indexOf(foundCar);
  cars.splice(carIndex, 1);
  return res.status(200).send('“Car Ad successfully deleted');
};

export const getCars = (req, res) => {
  if (cars.length === 0) return res.send('No cars in the database');
  const queries = req.query.keys();
  switch (queries) {
    case []
  }
};
