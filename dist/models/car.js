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
  price: 'Float',
  manufacturer: 'String',
  model: 'String',
  body_type: 'String' // car, truck, trailer, van, etc

}];
exports.cars = cars;

var carSchema = _joi["default"].object().keys({
  state: _joi["default"].string().valid(['new', 'used']).required(),
  status: _joi["default"].string().valid(['sold', 'available'])["default"]('available'),
  price: _joi["default"].number().min(1).max(100000000000).required(),
  manufacturer: _joi["default"].string(),
  model: _joi["default"].string().required(),
  body_type: _joi["default"].string().required()
});

exports.carSchema = carSchema;