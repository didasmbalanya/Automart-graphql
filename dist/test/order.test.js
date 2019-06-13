"use strict";

require("babel-polyfill");

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../index"));

var _user = require("./user.test");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable linebreak-style */

/* eslint-disable no-undef */
_chai["default"].use(_chaiHttp["default"]);

_chai["default"].should();

describe('Orders', function () {
  describe('GET order requests', function () {
    it('should not a get order if not authenticated', function (done) {
      _chai["default"].request(_index["default"]).get('/api/v1/order/1').end(function (err, res) {
        if (err) res.should.have.status(404);else res.should.have.status(401);
        done();
      });
    });
    it('should get order if authenticated', function (done) {
      _chai["default"].request(_index["default"]).get('/api/v1/order/1').set('Authorization', "Bearer ".concat(_user.token)).end(function (err, res) {
        if (err) res.should.have.status(404);else res.should.have.status(200);
        done();
      });
    });
  });
  describe('POST order requests', function () {
    it('should not be able to post order if not authenticated', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/order').send({
        car_id: 1,
        price_offered: 3000
      }).end(function (err, res) {
        if (err) res.should.have.status(404);else res.should.have.status(401);
        done();
      });
    });
    it('should not be able to buy their own car if authenticated', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/order').set('Authorization', "Bearer ".concat(_user.token)).send({
        car_id: 1,
        price_offered: 3000
      }).end(function (err, res) {
        if (err) res.should.have.status(404);else res.should.have.status(422);
        done();
      });
    });
  });
  describe('PATCH orders requests', function () {
    it('should be able to update price for a logged in user', function (done) {
      _chai["default"].request(_index["default"]).patch('/api/v1/order/1?price=20000').set('Authorization', "Bearer ".concat(_user.token)).end(function (err, res) {
        if (err) res.should.have.status(404);else res.should.have.status(200);
        done();
      });
    });
  });
});