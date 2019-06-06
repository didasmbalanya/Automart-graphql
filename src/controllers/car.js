/* eslint-disable linebreak-style */
import { cars } from '../models/car';

export const getCars = (req, res) => {
  if (cars.length >= 1) {
    res.status(200).send(cars);
  } else {
    res.send(404).send('cars not found');
  }
};

export const book = 1;
// export const getCarById = (req, res) => {
//   const { id } = req.params;
//   const foundCar = cars.find(car => car.id.toString() === id);
//   if (!foundCar) {
//     res.status(404).send('car not found');
//   }
//   res.status(200).send(foundCar);
// };
