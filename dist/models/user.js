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
  email: 'didasmbalanya@gmail.com',
  first_name: 'ObiOne',
  last_name: 'Kanobi',
  password: '$2b$08$WxQL5DwbwUzxORZcJCDsWuJA5CJmUcrjoaq4V.VfK3W9RVTCUrd0u',
  // obionekanobi
  address: 'Azgrad',
  is_admin: 'false'
}];
exports.users = users;

var signUnSchema = _joi["default"].object().keys({
  first_name: _joi["default"].string().min(2).max(30).required().trim(),
  last_name: _joi["default"].string().min(2).max(30).required().trim(),
  email: _joi["default"].string().email().required(),
  is_admin: _joi["default"]["boolean"]()["default"](false).valid([true, false]),
  password: _joi["default"].string().min(7).required().strict().regex(/^[a-zA-Z0-9]{7,30}$/),
  confirm_password: _joi["default"].string().valid(_joi["default"].ref('password')).required().strict()
});

exports.signUnSchema = signUnSchema;