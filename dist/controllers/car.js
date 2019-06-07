"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCars = exports.deleteCar = exports.getCarById = exports.changeProperty = exports.postCar = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _car = require("../models/car");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable linebreak-style */

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
  if (_car.cars.length >= 1) {
    return res.status(200).send(_car.cars);
  }

  res.send(404).send('cars not found');
};

exports.getCars = getCars;