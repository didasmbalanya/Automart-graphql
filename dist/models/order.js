"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.orderId = exports.updatePOPriceId = exports.createOrder = exports.purchaseOrderSchema = exports.orders = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _db_config = _interopRequireDefault(require("../../config/db_config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var orders = [{
  id: 1,
  buyer: 1,
  // user id
  car_id: 1,
  price: 200,
  // price offered
  status: 'Pending' // [pending, accepted, or rejected]

}];
exports.orders = orders;

var purchaseOrderSchema = _joi["default"].object().keys({
  car_id: _joi["default"].number().required().min(1),
  price_offered: _joi["default"].number().min(1).required()
});

exports.purchaseOrderSchema = purchaseOrderSchema;

var createOrder =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(values) {
    var newOrder;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _db_config["default"].query("INSERT INTO orders(\n    buyer,\n    car_id,\n    price_offered,\n    status) VALUES($1,$2,$3,$4) returning *", values);

          case 2:
            newOrder = _context.sent;
            return _context.abrupt("return", newOrder);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createOrder(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.createOrder = createOrder;

var updatePOPriceId =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(id, price) {
    var result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _db_config["default"].query("UPDATE orders SET new_price_offered='".concat(price, "' WHERE id='").concat(id, "' RETURNING *"));

          case 2:
            result = _context2.sent;
            return _context2.abrupt("return", result);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function updatePOPriceId(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

exports.updatePOPriceId = updatePOPriceId;

var orderId =
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
            return _db_config["default"].query("SELECT * FROM orders WHERE id='".concat(id, "'"));

          case 2:
            result = _context3.sent;

            if (!(result.rows.length === 0)) {
              _context3.next = 5;
              break;
            }

            return _context3.abrupt("return", false);

          case 5:
            return _context3.abrupt("return", result.rows[0]);

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function orderId(_x4) {
    return _ref3.apply(this, arguments);
  };
}();

exports.orderId = orderId;