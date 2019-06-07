"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signin = exports.signup = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _user = require("../models/user");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable linebreak-style */

/* eslint-disable consistent-return */
var signup = function signup(req, res) {
  _joi["default"].validate(req.body, _user.signUnSchema).then(function () {
    var _req$body = req.body,
        email = _req$body.email,
        password = _req$body.password;

    var foundUser = _user.users.find(function (user) {
      return user.email === email;
    });

    if (foundUser) {
      return res.status(422).send('already signed up with email address');
    }

    req.body.id = _user.users.length + 1;
    req.body.password = _bcrypt["default"].hashSync(password, 8);
    req.body.confirm_password = _bcrypt["default"].hashSync(password, 8);

    var token = _jsonwebtoken["default"].sign({
      id: req.body.id
    }, 'mysecret');

    var user = req.body;

    _user.users.push(req.body);

    res.status(201).send({
      user: user,
      token: token
    });
  })["catch"](function (e) {
    res.status(422).send(e.details[0].message);
  });
};

exports.signup = signup;

var signin = function signin(req, res) {
  var _req$body2 = req.body,
      email = _req$body2.email,
      password = _req$body2.password;

  var foundUser = _user.users.find(function (user) {
    return user.email === email;
  });

  if (!foundUser) {
    return res.status(422).send('Invalid email address');
  }

  if (_bcrypt["default"].compare(password, foundUser.password)) {
    res.status(200).send(foundUser);
  } else {
    res.status(404).send('nothing');
  }
};

exports.signin = signin;