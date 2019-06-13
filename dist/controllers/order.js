"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOrderById = exports.updateOrder = exports.postOrder = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _order = require("../models/order");

var _car = require("../models/car");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable linebreak-style */

/* eslint-disable consistent-return */
var postOrder = function postOrder(req, res) {
  _joi["default"].validate(req.body, _order.purchaseOrderSchema).then(function () {
    var order = req.body;

    var carAva = _car.cars.find(function (car) {
      return car.id === order.car_id;
    });

    if (carAva) {
      order.buyer = req.user.id;
      if (carAva.owner.toString() === order.buyer.toString()) return res.status(422).send('cannot buy your own car');
      order.id = _order.orders.length + 1;
      order.created_on = Date();
      order.status = 'pending';
      if (!order.price_offered) order.price_offered = req.body.price;

      _order.orders.push(order);

      res.status(201).send(order);
    } else throw Error('car not found');
  })["catch"](function (e) {
    res.status(404).send({
      err: 'Invalid post request',
      e: e
    });
  });
};

exports.postOrder = postOrder;

var updateOrder = function updateOrder(req, res) {
  if (req.query.price) {
    var id = req.params.id;
    var price = req.query.price;

    var purchaseOrder = _order.orders.find(function (ord) {
      return ord.id.toString() === id;
    });

    if (purchaseOrder.buyer.toString() === req.user.id) {
      var orderIndex = _order.orders.indexOf(purchaseOrder);

      _order.orders[orderIndex].new_price_offered = price;
      var order = _order.orders[orderIndex];
      res.status(200).send(order);
    } else res.status(404).send({
      error: 'Purchase order not found'
    });
  }
};

exports.updateOrder = updateOrder;

var getOrderById = function getOrderById(req, res) {
  var id = req.params.id;

  var foundOrder = _order.orders.find(function (order) {
    return order.id.toString() === id;
  });

  if (req.user.id.toString() === foundOrder.buyer.toString()) {
    if (foundOrder) return res.status(200).send(foundOrder);
    res.status(404).send('order not found');
  }

  res.status(404).send('order Id not found');
};

exports.getOrderById = getOrderById;