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

var signup =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            req.body.first_name = req.body.first_name.trim();
            req.body.last_name = req.body.last_name.trim();
            req.body.password = req.body.password.trim();
            req.body.confirm_password = req.body.confirm_password.trim();
            req.body.email = req.body.email.trim();

            _joi["default"].validate(req.body, _user.signUnSchema).then(
            /*#__PURE__*/
            _asyncToGenerator(
            /*#__PURE__*/
            regeneratorRuntime.mark(function _callee() {
              var _req$body, first_name, last_name, email, address, password, is_admin, foundUser, token, values, user;

              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _req$body = req.body, first_name = _req$body.first_name, last_name = _req$body.last_name, email = _req$body.email, address = _req$body.address, password = _req$body.password, is_admin = _req$body.is_admin;
                      _context.next = 3;
                      return (0, _user.findUserByEmail)(req.body.email);

                    case 3:
                      foundUser = _context.sent;

                      if (foundUser) {
                        _context.next = 16;
                        break;
                      }

                      req.body.password = _bcrypt["default"].hashSync(password, 8);
                      req.body.confirm_password = _bcrypt["default"].hashSync(password, 8);
                      token = _jsonwebtoken["default"].sign({
                        email: email
                      }, secret, {
                        expiresIn: '3h'
                      });
                      req.body.is_admin = 'false';
                      values = [first_name, last_name, email, address, req.body.password, req.body.is_admin];
                      _context.next = 12;
                      return (0, _user.addNewUser)(values);

                    case 12:
                      user = (0, _user_utils.getPublicProfile)(req.body);
                      res.status(201).send({
                        status: 201,
                        data: user,
                        token: token
                      });
                      _context.next = 17;
                      break;

                    case 16:
                      res.status(422).send({
                        status: 422,
                        error: 'Already signed up user'
                      });

                    case 17:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee);
            })))["catch"](function (e) {
              if (e.isJoi) res.status(422).send({
                status: 422,
                error: e.details[0].message
              });else res.status(404).send({
                status: 404,
                error: 'Invalid request'
              });
            });

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function signup(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.signup = signup;

var signin =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    var _req$body2, email, password, foundUser;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
            _context3.next = 3;
            return (0, _user.findUserByEmail)(email);

          case 3:
            foundUser = _context3.sent;

            if (!foundUser) {
              _context3.next = 8;
              break;
            }

            // eslint-disable-next-line no-shadow
            _bcrypt["default"].compare(password, foundUser.password, function (err, result) {
              if (err) res.status(422).send({
                status: 422,
                error: 'Incorrect credentials'
              });else if (!result) return res.status(404).send({
                status: 404,
                error: 'Incorrect credentials'
              });else {
                var token = _jsonwebtoken["default"].sign({
                  email: email
                }, secret, {
                  expiresIn: '3h'
                });

                res.status(200).send({
                  status: 200,
                  data: (0, _user_utils.getPublicProfile)(foundUser),
                  token: token
                });
              }
            });

            _context3.next = 9;
            break;

          case 8:
            return _context3.abrupt("return", res.status(404).send({
              status: 404,
              error: 'Email not registred'
            }));

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function signin(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();

exports.signin = signin;

var getMe = function getMe(req, res) {
  res.send({
    status: 200,
    data: (0, _user_utils.getPublicProfile)(req.user)
  });
};

exports.getMe = getMe;