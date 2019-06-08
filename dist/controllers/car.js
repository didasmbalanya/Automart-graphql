"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCars = exports.deleteCar = exports.getCarById = exports.changeProperty = exports.postCar = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _car = require("../models/car");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable linebreak-style */

/* eslint-disable camelcase */

/* eslint-disable consistent-return */
var findCar = function findCar(id) {
  var foundCar = _car.cars.find(function (car) {
    return car.id.toString() === id;
  });

  if (!foundCar) {
    return false;
  }

  return foundCar;
};

var findMinPrice = function findMinPrice(price, list) {
  return list.filter(function (car) {
    return parseFloat(car.price, 10) >= parseFloat(price, 10);
  });
};

var findMaxPrice = function findMaxPrice(price, list) {
  return list.filter(function (car) {
    return parseFloat(car.price, 10) <= parseFloat(price, 10);
  });
};

var findByStatus = function findByStatus(status) {
  return _car.cars.filter(function (car) {
    return car.status === status;
  });
};

var postCar = function postCar(req, res) {
  _joi["default"].validate(req.body, _car.carSchema).then(function () {
    var car = req.body;
    car.id = _car.cars.length + 1;
    car.created_on = Date();

    _car.cars.push(car);

    res.send(car);
  })["catch"](function (e) {
    if (e.details[0].message) {
      res.status(422).send(e.details[0].message);
    } else {
      res.status(404).send('Invalid post request');
    }
  });
};

exports.postCar = postCar;

var changeProperty = function changeProperty(req, res) {
  var id = req.params.id;
  var _req$query = req.query,
      status = _req$query.status,
      price = _req$query.price;
  var foundCar = findCar(id);

  if (!foundCar) {
    return res.status(404).send('Car not found');
  }

  if (!price) {
    if (status.toLowerCase() === 'sold' || status.toLowerCase() === 'available') {
      var carIndex = _car.cars.indexOf(foundCar);

      _car.cars[carIndex].status = status.toLowerCase();
      res.status(200).send(_car.cars[carIndex]);
    } else {
      return res.status(422).send('Invalid request');
    }
  } else {
    var _carIndex = _car.cars.indexOf(foundCar);

    _car.cars[_carIndex].price = price;
    return res.status(200).send(_car.cars[_carIndex]);
  }
};

exports.changeProperty = changeProperty;

var getCarById = function getCarById(req, res) {
  var id = req.params.id;
  var foundCar = findCar(id, res);
  if (foundCar) res.status(200).send(foundCar);else res.status(404).send('Car not found');
};

exports.getCarById = getCarById;

var deleteCar = function deleteCar(req, res) {
  var id = req.params.id;
  var foundCar = findCar(id);
  if (!foundCar) return res.status(404).send('Car add not found');

  var carIndex = _car.cars.indexOf(foundCar);

  _car.cars.splice(carIndex, 1);

  return res.status(200).send('“Car Ad successfully deleted');
};

exports.deleteCar = deleteCar;

var getCars = function getCars(req, res) {
  var _req$query2 = req.query,
      min_price = _req$query2.min_price,
      max_price = _req$query2.max_price,
      status = _req$query2.status;
  if (_car.cars.length === 0) return res.send('No cars in the database');

  if (min_price && max_price && status === 'available') {
    var avaCars = findByStatus(status);
    var avaCarsMinPrice = findMinPrice(min_price, avaCars);
    var avaMinMaxCars = findMaxPrice(max_price, avaCarsMinPrice);
    if (avaMinMaxCars.length > 0) res.status(200).send(avaMinMaxCars);else res.status(404).send('No car with specified filters found');
  } else {
    res.status(404).send('not found');
  }
};

exports.getCars = getCars;