"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateOrder = exports.getOrderById = exports.postOrder = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _order = require("../models/order");

var _car = require("../models/car");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var postOrder = function postOrder(req, res) {
  _joi["default"].validate(req.body, _order.purchaseOrderSchema).then(
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var order, carAva, data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            order = req.body;
            _context.next = 3;
            return (0, _car.getCarId)(order.car_id);

          case 3:
            carAva = _context.sent;

            if (carAva) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.status(404).send({
              error: 'Car not found'
            }));

          case 6:
            if (!carAva) {
              _context.next = 19;
              break;
            }

            order.buyer = req.user.id;

            if (!(carAva.owner.toString() === order.buyer.toString())) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", res.status(422).send({
              status: 422,
              error: 'cannot buy your own car'
            }));

          case 10:
            if (!(carAva.status === 'sold')) {
              _context.next = 12;
              break;
            }

            return _context.abrupt("return", res.status(404).send({
              error: 'car already sold'
            }));

          case 12:
            order.status = 'pending';
            _context.next = 15;
            return (0, _order.createOrder)([order.buyer, order.car_id, order.price_offered, order.status]);

          case 15:
            data = _context.sent;
            res.status(201).send({
              status: 201,
              data: data.rows[0]
            });
            _context.next = 20;
            break;

          case 19:
            throw Error('car not found');

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })))["catch"](function (e) {
    res.status(404).send({
      status: 422,
      err: 'Invalid post request',
      e: e
    });
  });
};

exports.postOrder = postOrder;

var getOrderById =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var id, foundOrder;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = req.params.id;
            _context2.next = 3;
            return (0, _order.orderId)(id);

          case 3:
            foundOrder = _context2.sent;
            if (foundOrder) res.status(200).send({
              status: 200,
              data: foundOrder.rows[0]
            });else res.status(404).send({
              status: 404,
              error: 'Not found'
            });

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getOrderById(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getOrderById = getOrderById;

var updateOrder =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    var id, price, purchaseOrder, result;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!req.query.price) {
              _context3.next = 16;
              break;
            }

            id = req.params.id;
            price = req.query.price;
            _context3.next = 5;
            return (0, _order.orderId)(id);

          case 5:
            purchaseOrder = _context3.sent;

            if (purchaseOrder) {
              _context3.next = 8;
              break;
            }

            return _context3.abrupt("return", res.status(404).send({
              status: 404,
              error: 'Purchase order not found'
            }));

          case 8:
            if (!(purchaseOrder.buyer.toString() === req.user.id.toString())) {
              _context3.next = 15;
              break;
            }

            _context3.next = 11;
            return (0, _order.updatePOPriceId)(id, price);

          case 11:
            result = _context3.sent;
            res.status(200).send({
              status: 200,
              data: result.rows[0]
            });
            _context3.next = 16;
            break;

          case 15:
            res.status(403).send({
              status: 403,
              error: 'not allowed'
            });

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function updateOrder(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();

exports.updateOrder = updateOrder;