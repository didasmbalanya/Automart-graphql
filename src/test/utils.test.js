/* eslint-disable linebreak-style */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import chai from 'chai';
import {
  findCar, findMinPrice, findMaxPrice, findByStatus,
} from '../utils/car_utils';

chai.should();

const cars = [
  {
    car1: 'car one', id: 1, price: 200, status: 'sold',
  },
  {
    car2: 'car two', id: 2, price: 100, status: 'available',
  },
];

describe('CAR utils tests', () => {
  it('should return an abject if it finds a car', (done) => {
    const result = findCar(1, cars);
    result.should.be.an('object');
    done();
  });

  it('should return false if it does not finds a car', (done) => {
    const result = findCar(10, cars);
    result.should.be.a('boolean');
    result.should.be.false;
    done();
  });

  it('should return a list of cars with price higher than min', () => {
    const minCars = findMinPrice(150, cars);
    minCars.length.should.equal(1);
  });

  it('should return a list of cars with price lower than min', () => {
    const maxCars = findMaxPrice(150, cars);
    maxCars.length.should.equal(1);
  });

  it('should return a list of cars with status given', () => {
    const statusCar = findByStatus('sold', cars);
    statusCar.length.should.equal(1);
  });
});
