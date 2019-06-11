"use strict";

require("babel-polyfill");

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../index"));

var _car = require("../models/car");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable linebreak-style */

/* eslint-disable no-undef */
_index["default"].use(_chaiHttp["default"]);

_chai["default"].should();

describe('Cars', function () {
  describe('/GET car requests', function () {
    it('should all cars stored in our dataset', function (done) {
      _chai["default"].request(_index["default"]).get('/api/v1/car').end(function (err, res) {
        if (err) err.should.have.status(404);else {
          res.should.have.status(200);
          res.body.should.be.an('array');
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
  });
});