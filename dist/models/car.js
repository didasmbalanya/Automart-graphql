"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteCarId = exports.getAllCars = exports.getCarsMinMax = exports.updatePriceId = exports.getCarId = exports.markSold = exports.getCarsBy = exports.addNewCar = exports.carSchema = exports.cars = void 0;

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

var markSold =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(id) {
    var result;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _db_config["default"].query("UPDATE cars SET status='sold' WHERE id='".concat(id, "' RETURNING *"));

          case 2:
            result = _context3.sent;
            return _context3.abrupt("return", result);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function markSold(_x4) {
    return _ref3.apply(this, arguments);
  };
}();

exports.markSold = markSold;

var getCarId =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(id) {
    var result;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _db_config["default"].query("SELECT * FROM cars WHERE id='".concat(id, "'"));

          case 2:
            result = _context4.sent;

            if (!(result.rows.length === 0)) {
              _context4.next = 5;
              break;
            }

            return _context4.abrupt("return", false);

          case 5:
            return _context4.abrupt("return", result.rows[0]);

          case 6:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function getCarId(_x5) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getCarId = getCarId;

var updatePriceId =
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(id, price) {
    var result;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _db_config["default"].query("UPDATE cars SET price='".concat(price, "' WHERE id='").concat(id, "' RETURNING *"));

          case 2:
            result = _context5.sent;
            return _context5.abrupt("return", result);

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function updatePriceId(_x6, _x7) {
    return _ref5.apply(this, arguments);
  };
}();

exports.updatePriceId = updatePriceId;

var getCarsMinMax =
/*#__PURE__*/
function () {
  var _ref6 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(minPrice, maxPrice) {
    var result;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _db_config["default"].query("SELECT * FROM cars WHERE status='available' AND price>='".concat(minPrice, "' AND price<='").concat(maxPrice, "'"));

          case 2:
            result = _context6.sent;

            if (!(result.rows.length === 0)) {
              _context6.next = 5;
              break;
            }

            return _context6.abrupt("return", []);

          case 5:
            return _context6.abrupt("return", result.rows);

          case 6:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function getCarsMinMax(_x8, _x9) {
    return _ref6.apply(this, arguments);
  };
}();

exports.getCarsMinMax = getCarsMinMax;

var getAllCars =
/*#__PURE__*/
function () {
  var _ref7 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7() {
    var result;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _db_config["default"].query('SELECT * FROM cars;');

          case 2:
            result = _context7.sent;
            return _context7.abrupt("return", result);

          case 4:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function getAllCars() {
    return _ref7.apply(this, arguments);
  };
}();

exports.getAllCars = getAllCars;

var DeleteCarId =
/*#__PURE__*/
function () {
  var _ref8 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee8(id) {
    var result;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return _db_config["default"].query("DELETE FROM cars WHERE id='".concat(id, "' returning *"));

          case 2:
            result = _context8.sent;
            return _context8.abrupt("return", result);

          case 4:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function DeleteCarId(_x10) {
    return _ref8.apply(this, arguments);
  };
}();

exports.DeleteCarId = DeleteCarId;