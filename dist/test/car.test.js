"use strict";

require("babel-polyfill");

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _index = _interopRequireDefault(require("../index"));

var _user = require("../models/user");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_index["default"].use(_chaiHttp["default"]);

_chai["default"].should();

var secret = process.env.secret;
var secondUser = {
  first_name: 'dexter',
  last_name: 'didas',
  email: 'didasopi@yahoo.com',
  address: 'Nairobi',
  password: 'obionekanobi',
  confirm_password: 'obionekanobi'
};
var newCar = {
  state: 'new',
  status: 'available',
  price: 210,
  manufacturer: 'Toyota',
  model: 'Vitz',
  body_type: 'saloon'
};

var token = _jsonwebtoken["default"].sign({
  email: secondUser.email
}, secret, {
  expiresIn: '3h'
});

describe.skip('Cars',
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee3() {
  return regeneratorRuntime.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          before(
          /*#__PURE__*/
          _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee() {
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    it('should be able to add new users', function (done) {
                      _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send(secondUser).end(function (err, res) {
                        if (err) err.should.have.status(404);
                        res.should.have.status(201);
                      });

                      done();
                    });
                    it('should be able to post car if user is logged in', function (done) {
                      _chai["default"].request(_index["default"]).post('/api/v1/car').set('Authorization', "Bearer ".concat(token)).send(newCar).end(function (err, res) {
                        if (err) err.should.have.status(404);else res.should.have.status(201);
                      });

                      done();
                    });

                  case 2:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          })));
          describe.skip('/GET car requests', function () {
            it('should all cars stored in our dataset', function (done) {
              _chai["default"].request(_index["default"]).get('/api/v1/car').end(function (err, res) {
                if (err) err.should.have.status(404);else {
                  res.should.have.status(200);
                }
              });

              done();
            });
            it('should return a car by its ID', function (done) {
              _chai["default"].request(_index["default"]).get('/api/v1/car/1').end(function (err, res) {
                if (err) err.should.have.status(404);else {
                  res.should.have.status(200);
                  res.should.be.an('object');
                }
              });

              done();
            });
            it('should get all cars stored with status available', function (done) {
              _chai["default"].request(_index["default"]).get('/api/v1/car?status=available').end(function (err, res) {
                if (err) err.should.have.status(404);else {
                  res.should.have.status(200);
                }
              });

              done();
            });
            it('should get all cars between given price range', function (done) {
              _chai["default"].request(_index["default"]).get('/api/v1/car?status=available&&min_price=100&&max_price=150').end(function (err, res) {
                if (err) err.should.have.status(404);else {
                  res.should.have.status(200);
                }
              });

              done();
            });
          });
          describe.skip('/POST Car requests', function () {
            it.skip('should not be able to post car if user is not logged in', function (done) {
              _chai["default"].request(_index["default"]).post('/api/v1/car').send(newCar).end(function (err, res) {
                if (err) err.should.have.status(404);else res.should.have.status(401);
              });

              done();
            });
            it('should be able to post car if user is logged in',
            /*#__PURE__*/
            function () {
              var _ref3 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee2(done) {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return (0, _user.addNewUser)(Object.values(storedUser));

                      case 2:
                        _chai["default"].request(_index["default"]).post('/api/v1/car').set('Authorization', "Bearer ".concat(token)).send(newCar).end(function (err, res) {
                          if (err) err.should.have.status(404);else res.should.have.status(201);
                        });

                        done();

                      case 4:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function (_x) {
                return _ref3.apply(this, arguments);
              };
            }());
          });
          describe('/PATCH car requests', function () {
            it('should not be able to update car sale price if user is not logged in', function (done) {
              _chai["default"].request(_index["default"]).patch('/api/v1/car/1?price=10000').end(function (err, res) {
                if (err) err.should.have.status(404);else res.should.have.status(401);
              });

              done();
            });
            it('should be able to update car sale price if user is logged in', function (done) {
              _chai["default"].request(_index["default"]).patch('/api/v1/car/1?price=10000').set('Authorization', "Bearer ".concat(token)).end(function (err, res) {
                if (err) err.should.have.status(404);else res.should.have.status(200);
              });

              done();
            });
            it('should not be able to mark as sold if user is not logged in', function (done) {
              _chai["default"].request(_index["default"]).patch('/api/v1/car/1?status=sold').end(function (err, res) {
                if (err) err.should.have.status(404);else res.should.have.status(401);
              });

              done();
            });
            it('should be able to mark car as sold if user is logged in', function (done) {
              _chai["default"].request(_index["default"]).patch('/api/v1/car/1?status=sold').set('Authorization', "Bearer ".concat(token)).end(function (err, res) {
                if (err) err.should.have.status(404);else res.should.have.status(200);
              });

              done();
            });
          });
          describe('/DELETE car requests', function () {
            it('should not be able to  delete car if user is not logged in or admin', function (done) {
              _chai["default"].request(_index["default"])["delete"]('/api/v1/car/1').end(function (err, res) {
                if (err) err.should.have.status(404);else res.should.have.status(401);
              });

              done();
            }); // admin can delete cars
          });

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  }, _callee3);
})));