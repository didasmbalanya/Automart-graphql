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

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var secret = process.env.secret;

var signup = function signup(req, res) {
  req.body.first_name = req.body.first_name.trim();
  req.body.last_name = req.body.last_name.trim();
  req.body.password = req.body.password.trim();
  req.body.confirm_password = req.body.confirm_password.trim();
  req.body.email = req.body.email.trim();

  _joi["default"].validate(req.body, _user.signUnSchema).then(function () {
    var _req$body = req.body,
        email = _req$body.email,
        password = _req$body.password;
    var is_admin = req.body.is_admin;
    if (!is_admin) is_admin = 'false';

    var foundUser = _user.users.find(function (user) {
      return user.email === email;
    });

    if (!foundUser) {
      req.body.is_admin = is_admin;
      req.body.id = _user.users.length + 1;
      req.body.password = _bcrypt["default"].hashSync(password, 8);
      req.body.confirm_password = _bcrypt["default"].hashSync(password, 8);

      var token = _jsonwebtoken["default"].sign({
        email: email,
        is_admin: is_admin
      }, secret, {
        expiresIn: '3h'
      });

      _user.users.push(req.body);

      var user = (0, _user_utils.getPublicProfile)(req.body);
      res.status(201).send({
        data: user,
        token: token
      });
    } else res.status(422).send('Already signed up user');
  })["catch"](function (e) {
    if (e.isJoi) res.status(422).send(e.details[0].message);else res.status(404).send('Invalid request');
  });
};

exports.signup = signup;

var signin =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body2, email, password, isAdmin, foundUser;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password, isAdmin = _req$body2.isAdmin;
            foundUser = _user.users.find(function (user) {
              return user.email === email;
            });

            if (foundUser) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", res.status(422).send({
              error: 'Invalid email address'
            }));

          case 4:
            // eslint-disable-next-line no-shadow
            _bcrypt["default"].compare(password, foundUser.password, function (err, result) {
              if (err) res.status(404).send('Incorrect credentials');else if (!result) res.status(404).send('Incorrect credentials');else {
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
              }
            });

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function signin(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.signin = signin;

var getMe = function getMe(req, res) {
  res.send((0, _user_utils.getPublicProfile)(req.user));
};

exports.getMe = getMe;