"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signUnSchema = exports.users = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable linebreak-style */
var users = [{
  id: '1',
  email: 'obiOneKanobi@gmail.com',
  first_name: 'ObiOne',
  last_name: 'Kanobi',
  password: 'obionekanobi',
  address: 'Azgrad',
  token: 'dummytoken',
  is_admin: 'Boolean'
}];
exports.users = users;
var availableEmails = users.map(function (user) {
  return user.email;
});

var signUnSchema = _joi["default"].object().keys({
  first_name: _joi["default"].string().min(2).max(30).required(),
  last_name: _joi["default"].string().min(2).max(30).required(),
  address: _joi["default"].string().min(2).max(50),
  email: _joi["default"].string().invalid(availableEmails).email({
    minDomainSegments: 2
  }).required(),
  is_admin: _joi["default"]["boolean"]()["default"](false),
  password: _joi["default"].string().min(7).required().strict(),
  confirm_password: _joi["default"].string().valid(_joi["default"].ref('password')).required().strict()
});

exports.signUnSchema = signUnSchema;