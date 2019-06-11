"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findByStatus = exports.findMaxPrice = exports.findMinPrice = exports.findCar = void 0;

/* eslint-disable linebreak-style */
var findCar = function findCar(id, data) {
  var foundCar = data.find(function (car) {
    return car.id.toString() === id;
  });

  if (!foundCar) {
    return false;
  }

  return foundCar;
};

exports.findCar = findCar;

var findMinPrice = function findMinPrice(price, data) {
  return data.filter(function (car) {
    return parseFloat(car.price, 10) >= parseFloat(price, 10);
  });
};

exports.findMinPrice = findMinPrice;

var findMaxPrice = function findMaxPrice(price, data) {
  return data.filter(function (car) {
    return parseFloat(car.price, 10) <= parseFloat(price, 10);
  });
};

exports.findMaxPrice = findMaxPrice;

var findByStatus = function findByStatus(status, data) {
  return data.filter(function (car) {
    return car.status === status;
  });
};

exports.findByStatus = findByStatus;