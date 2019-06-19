"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable linebreak-style */

/* eslint-disable no-undef */
// import { createTables, dropTables } from '../../db';
_chai["default"].use(_chaiHttp["default"]);

_chai["default"].should();

var storedUser = {
  first_name: 'dexter',
  last_name: 'didas',
  email: 'didasdexter@gmail.com',
  address: 'Nairobi',
  password: 'obionekanobi',
  confirm_password: 'obionekanobi'
};
var secret = process.env.secret;

var token = _jsonwebtoken["default"].sign({
  email: storedUser.email
}, secret, {
  expiresIn: '3h'
});

describe.skip('Users', function () {
  it('should be able to add new users', function (done) {
    _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send(storedUser).end(function (err, res) {
      if (err) err.should.have.status(404);
      res.should.have.status(201);
    });

    done();
  });
  describe.skip('/GET root page and current logged in user', function () {
    it('should get all the api welcome page', function (done) {
      _chai["default"].request(_index["default"]).get('/').end(function (err, res) {
        res.should.have.status(200);
      });

      done();
    });
    it('should get the currently logged in user after authorization', function (done) {
      _chai["default"].request(_index["default"]).get('/api/v1/auth/users/me').set('Authorization', "Bearer ".concat(token)).end(function (err, res) {
        if (err) res.should.have.status(404);
        res.should.have.status(200);
      });

      done();
    });
  });
  describe('/POST user', function () {
    it.skip('should not be able to create an already signed up user', function (done) {
      _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send(storedUser).end(function (err, res) {
        if (err) err.should.have.status(404);
        res.should.have.status(422);
      });

      done();
    });
    it.skip('should not be able to signin a non registered user', function (done) {
      var newUser = {
        email: 'didasdexter@gmail.com',
        password: 'obionekanobi'
      };

      _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send(newUser).end(function (err, res) {
        if (err) err.should.have.status(404);
        res.should.have.status(404);
      });

      done();
    });
    it.skip('a registered user can not signin with wrong password', function (done) {
      var signInUser = {
        email: 'didasmbalanya@gmail.com',
        password: 'obi1kanobil'
      };

      _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send(signInUser).end(function (err, res) {
        if (err) err.should.have.status(422);
        res.should.have.status(404);
      });

      done();
    });
    it('a registered user can signin with right password', function (done) {
      var usertwo = {
        email: 'didasmbalanya@gmail.com',
        password: 'obionekanobi'
      };

      _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send(usertwo).end(function (err, res) {
        if (err) err.should.have.status(404);
        res.should.have.status(200);
      });

      done();
    });
  });
});