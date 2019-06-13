"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.token = exports.storedUser = void 0;

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable linebreak-style */

/* eslint-disable no-undef */
_chai["default"].use(_chaiHttp["default"]);

_chai["default"].should();

var storedUser = {
  email: 'didasmbalanya@gmail.com',
  first_name: 'Strfgfging',
  last_name: 'didsda',
  password: 'passjijij',
  confirm_password: 'passjijij',
  is_admin: 'false'
};
exports.storedUser = storedUser;
var secret = process.env.secret;

var token = _jsonwebtoken["default"].sign({
  email: storedUser.email,
  is_admin: storedUser.is_admin
}, secret, {
  expiresIn: '3h'
}); // parent Block


exports.token = token;
describe('Users', function () {
  // test GET route
  describe('/GET root page and current logged in user', function () {
    it('should get all the api welcome page', function (done) {
      _chai["default"].request(_index["default"]).get('/').end(function (err, res) {
        res.should.have.status(200);
        done();
      });
    });
    it('should get the currently logged in user after authorization', function (done) {
      _chai["default"].request(_index["default"]).get('/api/v1/auth/users/me').set('Authorization', "Bearer ".concat(token)).end(function (err, res) {
        if (err) res.should.have.status(404);
        res.should.have.status(200);
        done();
      });
    });
  });
  describe('/POST user', function () {
    it('should not be able to create an already signed up user', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send(storedUser).end(function (err, res) {
        if (err) err.should.have.status(404);
        res.should.have.status(422);
        done();
      });
    });
    it('should be able to add new users', function (done) {
      storedUser.email = 'didasdexter@gmail.com';

      _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send(storedUser).end(function (err, res) {
        if (err) err.should.have.status(404);
        res.should.have.status(201);
        done();
      });
    });
    it('should not be able to signin a non registered user', function (done) {
      var newUser = {
        email: 'didassexter@gmaiil.com',
        password: 'obionekanobi'
      };

      _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send(newUser).end(function (err, res) {
        if (err) err.should.have.status(404);
        res.should.have.status(422);
        done();
      });
    });
    it('a registered user can not signin with wrong password', function (done) {
      var signInUser = {
        email: 'didasmbalanya@gmail.com',
        password: 'lobionekanobi'
      };

      _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send(signInUser).end(function (err, res) {
        if (err) err.should.have.status(422);
        res.should.have.status(404);
        done();
      });
    });
    it('a registered user can signin with right password', function (done) {
      var usertwo = {
        email: 'didasmbalanya@gmail.com',
        password: 'obionekanobi'
      };

      _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send(usertwo).end(function (err, res) {
        if (err) err.should.have.status(422);
        res.should.have.status(200);
        done();
      });
    });
  });
});