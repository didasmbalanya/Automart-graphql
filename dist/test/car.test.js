"use strict";

require("babel-polyfill");

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../index"));

var _user = require("./user.test");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable linebreak-style */

/* eslint-disable no-undef */
_index["default"].use(_chaiHttp["default"]);

_chai["default"].should();

var newCar = {
  state: 'new',
  status: 'available',
  price: '210',
  manufacturer: 'Toyota',
  model: 'Vitz',
  body_type: 'saloon'
};
describe('Cars', function () {
  describe('/GET car requests', function () {
    it('should all cars stored in our dataset', function (done) {
      _chai["default"].request(_index["default"]).get('/api/v1/car').end(function (err, res) {
        if (err) err.should.have.status(404);else {
          res.should.have.status(200);
        }
        done();
      });
    });
    it('should return a car by its ID', function (done) {
      _chai["default"].request(_index["default"]).get('/api/v1/car/1').end(function (err, res) {
        if (err) err.should.have.status(404);else {
          res.should.have.status(200);
          res.should.be.an('object');
        }
        done();
      });
    });
    it('should get all cars stored with status available', function (done) {
      _chai["default"].request(_index["default"]).get('/api/v1/car?status=available').end(function (err, res) {
        if (err) err.should.have.status(404);else {
          res.should.have.status(200);
        }
        done();
      });
    });
    it('should get all cars between given price range', function (done) {
      _chai["default"].request(_index["default"]).get('/api/v1/car?status=available&&min_price=100&&max_price=150').end(function (err, res) {
        if (err) err.should.have.status(404);else {
          res.should.have.status(200);
        }
        done();
      });
    });
  });
  describe('/POST Car requests', function () {
    it('should not be able to post car if user is not logged in', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/car').send(newCar).end(function (err, res) {
        if (err) err.should.have.status(404);else res.should.have.status(401);
        done();
      });
    });
    it('should be able to post car if user is logged in', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/car').set('Authorization', "Bearer ".concat(_user.token)).send(newCar).end(function (err, res) {
        if (err) err.should.have.status(404);else res.should.have.status(201);
        done();
      });
    });
  });
  describe('/PATCH car requests', function () {
    it('should not be able to update car sale price if user is not logged in', function (done) {
      _chai["default"].request(_index["default"]).patch('/api/v1/car/1?price=10000').end(function (err, res) {
        if (err) err.should.have.status(404);else res.should.have.status(401);
        done();
      });
    });
    it('should be able to update car sale price if user is logged in', function (done) {
      _chai["default"].request(_index["default"]).patch('/api/v1/car/1?price=10000').set('Authorization', "Bearer ".concat(_user.token)).end(function (err, res) {
        if (err) err.should.have.status(404);else res.should.have.status(200);
        done();
      });
    });
    it('should not be able to mark as sold if user is not logged in', function (done) {
      _chai["default"].request(_index["default"]).patch('/api/v1/car/1?status=sold').end(function (err, res) {
        if (err) err.should.have.status(404);else res.should.have.status(401);
        done();
      });
    });
    it('should be able to mark car as sold if user is logged in', function (done) {
      _chai["default"].request(_index["default"]).patch('/api/v1/car/1?status=sold').set('Authorization', "Bearer ".concat(_user.token)).end(function (err, res) {
        if (err) err.should.have.status(404);else res.should.have.status(200);
        done();
      });
    });
  });
  describe('/DELETE car requests', function () {
    it('should not be able to  delete car if user is not logged in or admin', function (done) {
      _chai["default"].request(_index["default"])["delete"]('/api/v1/car/1').end(function (err, res) {
        if (err) err.should.have.status(404);else res.should.have.status(401);
        done();
      });
    }); // admin can delete cars
  });
});