"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCars = exports.deleteCar = exports.getCarById = exports.changeProperty = exports.postCar = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _car = require("../models/car");

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
    var car, newCar;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            car = req.body;
            car.owner = req.user.id;
            _context.next = 4;
            return (0, _car.addNewCar)([car.owner, car.state, car.status, car.price, car.manufacturer, car.model, car.body_type]);

          case 4:
            newCar = _context.sent;
            _context.next = 7;
            return res.status(201).send({
              status: 201,
              data: newCar.rows[0]
            });

          case 7:
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

var changeProperty =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var id, _req$query, status, price, foundCar, data, dataNewPrice;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = req.params.id;
            _req$query = req.query, status = _req$query.status, price = _req$query.price;
            _context2.next = 4;
            return (0, _car.getCarId)(id);

          case 4:
            foundCar = _context2.sent;

            if (foundCar) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt("return", res.status(404).send({
              status: 404,
              error: 'Car not found'
            }));

          case 7:
            if (!(foundCar.owner.toString() !== req.user.id)) {
              _context2.next = 9;
              break;
            }

            return _context2.abrupt("return", res.status(403).send({
              status: 403,
              error: 'not allowed'
            }));

          case 9:
            if (!(foundCar.status === 'available' && !price)) {
              _context2.next = 16;
              break;
            }

            _context2.next = 12;
            return (0, _car.markSold)(id);

          case 12:
            data = _context2.sent;
            res.status(200).send({
              status: 200,
              data: data.rows[0]
            });
            _context2.next = 24;
            break;

          case 16:
            if (!(price && !status)) {
              _context2.next = 23;
              break;
            }

            _context2.next = 19;
            return (0, _car.updatePriceId)(id, price);

          case 19:
            dataNewPrice = _context2.sent;
            res.status(200).send({
              data: dataNewPrice.rows[0]
            });
            _context2.next = 24;
            break;

          case 23:
            return _context2.abrupt("return", res.status(422).send({
              status: 422,
              error: 'Invalid request'
            }));

          case 24:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function changeProperty(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.changeProperty = changeProperty;

var getCarById =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    var id, foundCar;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = req.params.id;
            _context3.next = 3;
            return (0, _car.getCarId)(id);

          case 3:
            foundCar = _context3.sent;

            if (foundCar) {
              _context3.next = 6;
              break;
            }

            return _context3.abrupt("return", res.status(404).send({
              status: 404,
              data: 'Car not found'
            }));

          case 6:
            return _context3.abrupt("return", res.status(200).send({
              status: 200,
              data: foundCar
            }));

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getCarById(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getCarById = getCarById;

var deleteCar =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(req, res) {
    var id, foundCar, result;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id;
            _context4.next = 3;
            return (0, _car.getCarId)(id);

          case 3:
            foundCar = _context4.sent;

            if (foundCar) {
              _context4.next = 6;
              break;
            }

            return _context4.abrupt("return", res.status(404).send({
              status: 404,
              error: 'Car add not found'
            }));

          case 6:
            if (!(foundCar.owner.toString() === req.user.id.toString() || req.user.is_admin === 'true')) {
              _context4.next = 13;
              break;
            }

            _context4.next = 9;
            return (0, _car.DeleteCarId)(id);

          case 9:
            result = _context4.sent;
            res.status(200).send({
              status: 200,
              message: 'Car Ad successfully deleted',
              data: result.rows[0]
            });
            _context4.next = 14;
            break;

          case 13:
            res.status(403).send({
              status: 403,
              error: 'not authorized to delete car'
            });

          case 14:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function deleteCar(_x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}();

exports.deleteCar = deleteCar;

var getCars =
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(req, res) {
    var _req$query2, status, max_price, min_price, maxMinCars, avaCars, allCars;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _req$query2 = req.query, status = _req$query2.status, max_price = _req$query2.max_price, min_price = _req$query2.min_price;
            _context5.prev = 1;

            if (!(status === 'available' && max_price && min_price)) {
              _context5.next = 9;
              break;
            }

            _context5.next = 5;
            return (0, _car.getCarsMinMax)(min_price, max_price);

          case 5:
            maxMinCars = _context5.sent;
            res.status(200).send({
              data: maxMinCars
            });
            _context5.next = 20;
            break;

          case 9:
            if (!(status && status.toLowerCase() === 'available')) {
              _context5.next = 16;
              break;
            }

            _context5.next = 12;
            return (0, _car.getCarsBy)('status', 'available');

          case 12:
            avaCars = _context5.sent;
            res.status(200).send({
              status: 200,
              data: avaCars
            });
            _context5.next = 20;
            break;

          case 16:
            _context5.next = 18;
            return (0, _car.getAllCars)();

          case 18:
            allCars = _context5.sent;
            res.status(200).send({
              status: 200,
              data: allCars.rows
            });

          case 20:
            _context5.next = 25;
            break;

          case 22:
            _context5.prev = 22;
            _context5.t0 = _context5["catch"](1);
            res.send({
              status: 404,
              error: _context5.t0
            });

          case 25:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 22]]);
  }));

  return function getCars(_x7, _x8) {
    return _ref5.apply(this, arguments);
  };
}();

exports.getCars = getCars;