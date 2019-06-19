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
            car.owner = req.user.id;
            _context.next = 4;
            return (0, _car.addNewCar)([car.owner, car.state, car.status, car.price, car.manufacturer, car.model, car.body_type]);

          case 4:
            _context.next = 6;
            return res.status(201).send({
              status: 201,
              data: car
            });

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })))["catch"](function (e) {
    if (e) {
      res.status(422).send({
        status: 422,
        error: e
      });
    } else {
      res.status(404).send({
        status: 404,
        error: 'Invalid post request'
      });
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

  if (!foundCar) {
    return res.status(404).send({
      status: 404,
      error: 'Car not found'
    });
  }

  if (foundCar.owner.toString() !== req.user.id.toString()) return res.status(403).send({
    status: 403,
    error: 'not allowed'
  });

  if (!price) {
    if (status.toLowerCase() === 'sold' || status.toLowerCase() === 'available') {
      var carIndex = _car.cars.indexOf(foundCar);

      _car.cars[carIndex].status = status.toLowerCase();
      res.status(200).send({
        status: 200,
        data: _car.cars[carIndex]
      });
    } else {
      return res.status(422).send({
        status: 422,
        error: 'Invalid request'
      });
    }
  } else {
    var _carIndex = _car.cars.indexOf(foundCar);

    _car.cars[_carIndex].price = price;
    return res.status(200).send({
      status: 200,
      data: _car.cars[_carIndex]
    });
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

            res.status(200).send({
              data: foundCarId
            });
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
            res.status(404).send({
              status: 404,
              error: 'Car not found'
            });

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
  if (!foundCar) return res.status(404).send({
    status: 404,
    error: 'Car add not found'
  });

  if (foundCar.owner.toString() === req.user.id.toString() || req.user.is_admin === 'true') {
    var carIndex = _car.cars.indexOf(foundCar);

    _car.cars.splice(carIndex, 1);

    res.status(200).send({
      status: 200,
      message: 'Car Ad successfully deleted'
    });
  } else res.status(403).send({
    status: 403,
    error: 'not authorized to delete car'
  });
};

exports.deleteCar = deleteCar;

var getCars =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    var _req$query2, status, max_price, min_price, maxMinCars, avaCars;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$query2 = req.query, status = _req$query2.status, max_price = _req$query2.max_price, min_price = _req$query2.min_price;

            if (!(status && max_price && min_price)) {
              _context3.next = 8;
              break;
            }

            _context3.next = 4;
            return (0, _car.getCarsMinMax)(min_price, max_price);

          case 4:
            maxMinCars = _context3.sent;
            res.status(200).send(maxMinCars);
            _context3.next = 16;
            break;

          case 8:
            if (!(status && status.toLowerCase() === 'available')) {
              _context3.next = 15;
              break;
            }

            _context3.next = 11;
            return (0, _car.getCarsBy)('status', 'available');

          case 11:
            avaCars = _context3.sent;
            res.status(200).send({
              status: 200,
              data: avaCars
            });
            _context3.next = 16;
            break;

          case 15:
            res.status(404).send({
              status: 404,
              error: 'Invalid query'
            });

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getCars(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getCars = getCars;