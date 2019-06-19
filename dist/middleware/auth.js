"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.maintenance = exports.auth = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _user = require("../models/user");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var auth =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res, next) {
    var token, decoded, verifiedUser;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            token = req.header('Authorization').replace('Bearer ', '');
            _context.next = 4;
            return _jsonwebtoken["default"].verify(token, process.env.secret);

          case 4:
            decoded = _context.sent;
            _context.next = 7;
            return (0, _user.findUserByEmail)(decoded.email);

          case 7:
            verifiedUser = _context.sent;

            if (verifiedUser) {
              _context.next = 10;
              break;
            }

            throw new Error();

          case 10:
            req.user = verifiedUser;
            next();
            _context.next = 17;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](0);
            res.status(401).send({
              error: 'Please Authenticate'
            });

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 14]]);
  }));

  return function auth(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.auth = auth;

var maintenance = function maintenance(req, res) {
  if (req.method) res.status(503).send({
    error: 'Server under Maintenance'
  });
};

exports.maintenance = maintenance;