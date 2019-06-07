"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.purchaseOrderSchema = exports.orders = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable linebreak-style */
var orders = [{
  id: 1,
  buyer: 1,
  // user id
  car_id: 1,
  price: 'Float',
  // price offered
  status: 'String' // [pending, accepted, or rejected]

}];
exports.orders = orders;

var purchaseOrderSchema = _joi["default"].object().keys({
  price: _joi["default"].number().min(1).required(),
  price_offered: _joi["default"].number().min(1).required(),
  status: _joi["default"].string().valid(['pending', 'accepted', 'rejected'])
});

exports.purchaseOrderSchema = purchaseOrderSchema;