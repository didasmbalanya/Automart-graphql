"use strict";

require("babel-polyfill");

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable linebreak-style */

/* eslint-disable no-undef */
_chai["default"].use(_chaiHttp["default"]);

_chai["default"].should();

describe('Orders', function () {
  describe('GET order api', function () {
    it('should get a specific users po', function (done) {
      _chai["default"].request(_index["default"]).get('/api/v1/order/1').end(function (err, res) {
        if (err) res.should.have.status(404);else if (res.error) res.should.have.status(401);else {
          res.should.have.status(200);
          res.body.should.be.an('object');
        }
        done();
      });
    });
  });
});