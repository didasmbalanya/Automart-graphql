"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addNewUser = exports.findUserByEmail = exports.signUnSchema = exports.users = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _db_config = _interopRequireDefault(require("../../config/db_config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_dotenv["default"].config();

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

var findUserByEmail =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(userEmail) {
    var userData;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _db_config["default"].query("SELECT * FROM users WHERE email='".concat(userEmail, "'"));

          case 2:
            userData = _context.sent;

            if (!(userData.rows.length === 0)) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", false);

          case 5:
            return _context.abrupt("return", userData.rows[0]);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function findUserByEmail(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.findUserByEmail = findUserByEmail;

var addNewUser =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(params) {
    var result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            result = _db_config["default"].query("INSERT INTO users (\n    first_name,\n    last_name,\n    email,\n    address,\n    password) VALUES ($1 $2 $3 $4 $5) returning *;", params);
            return _context2.abrupt("return", result);

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function addNewUser(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.addNewUser = addNewUser;