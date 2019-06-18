"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.maintenance = exports.auth = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _user = require("../models/user");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable linebreak-style */
var auth = function auth(req, res, next) {
  try {
    var token = req.header('Authorization').replace('Bearer ', '');

    var decoded = _jsonwebtoken["default"].verify(token, process.env.secret);

    var verifiedUser = _user.users.find(function (user) {
      return user.email === decoded.email;
    });

    if (!verifiedUser) {
      throw new Error();
    }

    req.user = verifiedUser;
    next();
  } catch (e) {
    res.status(401).send({
      error: 'Please Authenticate'
    });
  }
};

exports.auth = auth;

var maintenance = function maintenance(req, res) {
  if (req.method) res.status(503).send({
    error: 'Server under Maintenance'
  });
};

exports.maintenance = maintenance;