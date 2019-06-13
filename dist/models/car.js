"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.carSchema = exports.cars = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable linebreak-style */
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