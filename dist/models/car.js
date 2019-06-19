"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCarsMinMax = exports.getCarsBy = exports.addNewCar = exports.carSchema = exports.cars = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _db_config = _interopRequireDefault(require("../../config/db_config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var cars = [{
  id: 1,
  owner: 1,
  // user id
  created_on: 'DateTime',
  state: 'new',
  // new,used
  status: 'available',
  // sold,available - default is available
  price: 150,
  manufacturer: 'Mazda',
  model: 'es1',
  body_type: 'van' // car, truck, trailer, van, etc

}];
exports.cars = cars;

var carSchema = _joi["default"].object().keys({
  state: _joi["default"].string().valid(['new', 'used']).required().trim(),
  status: _joi["default"].string().valid(['sold', 'available'])["default"]('available').trim(),
  price: _joi["default"].number().min(1).max(100000000000).required(),
  manufacturer: _joi["default"].string().trim(),
  model: _joi["default"].string().required().trim(),
  body_type: _joi["default"].string().required().trim()
});

exports.carSchema = carSchema;

var addNewCar =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(values) {
    var result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _db_config["default"].query("INSERT INTO cars(\n    owner,\n    state,\n    status,\n    price,\n    manufacturer,\n    model,\n    body_type) VALUES($1,$2,$3,$4,$5,$6,$7) returning *", values);

          case 2:
            result = _context.sent;
            return _context.abrupt("return", result);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function addNewCar(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.addNewCar = addNewCar;

var getCarsBy =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(key, value) {
    var result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _db_config["default"].query("SELECT * FROM cars WHERE ".concat(key, "='").concat(value, "'"));

          case 2:
            result = _context2.sent;

            if (!(result.rows.length === 0)) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", []);

          case 5:
            return _context2.abrupt("return", result.rows);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getCarsBy(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getCarsBy = getCarsBy;

var getCarsMinMax =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(minPrice, maxPrice) {
    var result;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _db_config["default"].query("SELECT * FROM cars WHERE status='available' AND price>='".concat(minPrice, "' AND price<='").concat(maxPrice, "'"));

          case 2:
            result = _context3.sent;

            if (!(result.rows.length === 0)) {
              _context3.next = 5;
              break;
            }

            return _context3.abrupt("return", []);

          case 5:
            return _context3.abrupt("return", result.rows);

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getCarsMinMax(_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getCarsMinMax = getCarsMinMax;