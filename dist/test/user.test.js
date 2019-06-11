"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable linebreak-style */

/* eslint-disable no-undef */
_chai["default"].use(_chaiHttp["default"]);

_chai["default"].should(); // parent Block


describe('Users', function () {
  // test GET route
  describe('/GET api-root page', function () {
    it('should get all the api welcome page', function (done) {
      _chai["default"].request(_index["default"]).get('/').end(function (err, res) {
        res.should.have.status(200);
        done();
      });
    });
  });
});