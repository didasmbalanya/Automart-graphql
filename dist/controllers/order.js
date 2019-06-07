"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOrderById = exports.updateOrder = exports.postOrder = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _order = require("../models/order");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable linebreak-style */

/* eslint-disable consistent-return */
var postOrder = function postOrder(req, res) {
  _joi["default"].validate(req.body, _order.purchaseOrderSchema).then(function () {
    var order = req.body;
    order.id = _order.orders.length + 1;
    order.car_id = req.body.id; // temporary values

    order.created_on = Date();
    order.status = 'pending';
    order.buyer = 1; // temporary

    if (!order.price_offered) order.price_offered = req.body.price;

    _order.orders.push(order);

    res.status(201).send(order);
  })["catch"](function (e) {
    if (e.details[0].message) {
      res.status(422).send(e.details[0].message);
    } else {
      res.status(404).send('Invalid post request');
    }
  });
};

exports.postOrder = postOrder;

var updateOrder = function updateOrder(req, res) {
  if (req.query.price) {
    var id = req.params.id;
    var price = req.query.price;

    var foundOrder = _order.orders.find(function (order) {
      return order.id.toString() === id;
    });

    if (foundOrder) {
      var orderIndex = _order.orders.indexOf(foundOrder);

      _order.orders[orderIndex].new_price_offered = price;
      var order = _order.orders[orderIndex];
      res.status(204).send(order);
    }
  }
};

exports.updateOrder = updateOrder;

var getOrderById = function getOrderById(req, res) {
  var id = req.params.id;

  var foundOrder = _order.orders.find(function (order) {
    return order.id.toString() === id;
  });

  if (foundOrder) return res.status(200).send(foundOrder);
  res.status(404).send('order Id not found');
};

exports.getOrderById = getOrderById;