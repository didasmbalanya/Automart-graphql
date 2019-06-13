"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCars = exports.deleteCar = exports.getCarById = exports.changeProperty = exports.postCar = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _car = require("../models/car");

var _car_utils = require("../utils/car_utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var postCar = function postCar(req, res) {
  req.body.manufacturer = req.body.manufacturer.trim();
  req.body.model = req.body.model.trim();
  req.body.body_type = req.body.body_type.trim();
  req.body.status = req.body.status.trim();
  req.body.state = req.body.state.trim();
  req.body.price = req.body.price.trim();

  _joi["default"].validate(req.body, _car.carSchema).then(
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var car;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            car = req.body;
            car.id = _car.cars.length + 1;
            car.owner = req.user.id;
            car.created_on = Date();

            _car.cars.push(car);

            _context.next = 7;
            return res.status(201).send(car);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })))["catch"](function (e) {
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
  var foundCar = (0, _car_utils.findCar)(id, _car.cars);
  if (foundCar.owner.toString() !== req.user.id) return res.status(422).send('not allowed');

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

var getCarById =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var id, foundCarId;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            id = req.params.id;
            foundCarId = (0, _car_utils.findCar)(id, _car.cars);

            if (!foundCarId) {
              _context2.next = 7;
              break;
            }

            res.status(200).send(foundCarId);
            _context2.next = 8;
            break;

          case 7:
            throw new Error();

          case 8:
            _context2.next = 13;
            break;

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](0);
            res.status(404).send('Car not found');

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 10]]);
  }));

  return function getCarById(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getCarById = getCarById;

var deleteCar = function deleteCar(req, res) {
  var id = req.params.id;
  var foundCar = (0, _car_utils.findCar)(id, _car.cars);
  if (!foundCar) return res.status(404).send('Car add not found');

  if (foundCar.owner === req.user.id || req.user.is_admin === 'true') {
    var carIndex = _car.cars.indexOf(foundCar);

    _car.cars.splice(carIndex, 1);

    res.status(200).send('“Car Ad successfully deleted');
  } else res.status(405).send('not authorized to delete car');
};

exports.deleteCar = deleteCar;

var getCars = function getCars(req, res) {
  var _req$query2 = req.query,
      min_price = _req$query2.min_price,
      max_price = _req$query2.max_price,
      status = _req$query2.status;
  if (_car.cars.length === 0) return res.send('No cars in the database');

  if (min_price && max_price && status === 'available') {
    var avaCars = (0, _car_utils.findByStatus)(status, _car.cars);
    var avaCarsMinPrice = (0, _car_utils.findMinPrice)(min_price, avaCars);
    var avaMinMaxCars = (0, _car_utils.findMaxPrice)(max_price, avaCarsMinPrice);
    if (avaMinMaxCars.length > 0) return res.status(200).send(avaMinMaxCars);
    return res.status(404).send('No car with specified filters found');
  }

  if (status) {
    var _avaCars = (0, _car_utils.findByStatus)(status, _car.cars);

    if (_avaCars.length > 0) res.status(200).send(_avaCars);else res.status(404).send('No car with specified filters found');
  } else {
    res.status(200).send(_car.cars);
  }
};

exports.getCars = getCars;