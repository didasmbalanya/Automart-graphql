"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMe = exports.signin = exports.signup = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _user = require("../models/user");

var _user_utils = require("../utils/user_utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable linebreak-style */

/* eslint-disable no-param-reassign */

/* eslint-disable consistent-return */
var secret = process.env.secret;

var signup = function signup(req, res) {
  _joi["default"].validate(req.body, _user.signUnSchema).then(function () {
    var _req$body = req.body,
        email = _req$body.email,
        password = _req$body.password;

    var foundUser = _user.users.find(function (user) {
      return user.email === email;
    });

    if (foundUser) {
      return res.status(422).send({
        error: 'already signed up with email address'
      });
    }

    req.body.id = _user.users.length + 1;
    req.body.password = _bcrypt["default"].hashSync(password, 8);
    req.body.confirm_password = _bcrypt["default"].hashSync(password, 8);
    req.body.isAdmin = 'false';

    var token = _jsonwebtoken["default"].sign({
      email: email,
      admin: req.body.isAdmin
    }, secret, {
      expiresIn: '3h'
    });

    _user.users.push(req.body);

    var user = (0, _user_utils.getPublicProfile)(req.body);
    res.status(201).send({
      data: user,
      token: token
    });
  })["catch"](function (e) {
    res.status(422).send(e);
  });
};

exports.signup = signup;

var signin = function signin(req, res) {
  var _req$body2 = req.body,
      email = _req$body2.email,
      password = _req$body2.password,
      isAdmin = _req$body2.isAdmin;

  var foundUser = _user.users.find(function (user) {
    return user.email === email;
  });

  if (!foundUser) {
    return res.status(422).send({
      error: 'Invalid email address'
    });
  }

  _bcrypt["default"].compare(password, foundUser.password).then(function () {
    var token = _jsonwebtoken["default"].sign({
      email: email,
      isAdmin: isAdmin
    }, secret, {
      expiresIn: '3h'
    });

    res.status(200).send({
      data: (0, _user_utils.getPublicProfile)(foundUser),
      token: token
    });
  })["catch"](function (e) {
    return res.status(404).send({
      error: 'Wrong credintals',
      e: e
    });
  });
};

exports.signin = signin;

var getMe = function getMe(req, res) {
  res.send((0, _user_utils.getPublicProfile)(req.user));
};

exports.getMe = getMe;